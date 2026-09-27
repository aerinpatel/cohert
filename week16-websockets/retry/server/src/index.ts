import dotenv from 'dotenv';
dotenv.config();

import http from 'node:http';
import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter, { verifyAccessToken } from './authHandler/auth.js';
import { Message } from './models/Message.js';
import { Room } from './models/Room.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://aerinpatel:aerin1213@cluster0.iqpmi.mongodb.net/retro-chat?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL)
    .then(() => console.log(' Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

const wss = new WebSocketServer({ server });
const rooms = new Map<string, Set<WebSocket>>();
const userBySocket = new Map<WebSocket, { userId: string; username: string }>();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET /rooms - List persistent rooms from MongoDB
app.get('/rooms', async (_req, res) => {
    try {
        const roomList = await Room.find().sort({ createdAt: -1 }).limit(30).lean();
        res.json(roomList);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
});

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function parseMessage(raw: unknown) {
    try {
        let payload = '';
        if (typeof raw === 'string') payload = raw;
        else if (Buffer.isBuffer(raw)) payload = raw.toString();
        else if (Array.isArray(raw)) payload = Buffer.concat(raw).toString();
        else if (raw instanceof ArrayBuffer) payload = Buffer.from(raw).toString();
        else payload = String(raw ?? '');
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

function broadcastRoomList() {
    Room.find().sort({ createdAt: -1 }).limit(30).lean().then((roomList) => {
        const payload = JSON.stringify({ type: 'ROOMS_UPDATED', rooms: roomList });
        for (const socket of userBySocket.keys()) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(payload);
            }
        }
    }).catch(() => {});
}

wss.on('connection', (socket, request) => {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const token = url.searchParams.get('token');

    if (!token) {
        socket.close(4001, 'Unauthorized: Token missing');
        return;
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
        socket.close(4001, 'Unauthorized: Invalid or expired token');
        return;
    }

    userBySocket.set(socket, payload);

    socket.send(JSON.stringify({
        type: 'AUTH_SUCCESS',
        username: payload.username,
        userId: payload.userId,
    }));

    socket.on('message', async (data) => {
        const msg = parseMessage(data);
        if (!msg || typeof msg.type !== 'string') return;

        const user = userBySocket.get(socket);
        if (!user) return;

        // 1. CREATE_ROOM (Persisted in MongoDB)
        if (msg.type === 'CREATE_ROOM') {
            const roomId = generateRoomId();

            // Save room permanently to MongoDB
            await Room.findOneAndUpdate(
                { roomId },
                { roomId, createdBy: user.username, createdAt: new Date() },
                { upsert: true, new: true }
            );

            let room = rooms.get(roomId);
            if (!room) {
                room = new Set<WebSocket>();
                rooms.set(roomId, room);
            }
            room.add(socket);

            socket.send(JSON.stringify({
                type: 'ROOM_CREATED',
                roomId,
            }));

            broadcastRoomList();
            return;
        }

        // 2. JOIN_ROOM (Fetch message history from MongoDB)
        if (msg.type === 'JOIN_ROOM') {
            const roomId = String(msg.id || '').trim().toUpperCase();
            if (!roomId) {
                socket.send(JSON.stringify({ type: 'ROOM_ERROR', message: 'Please provide a valid Room ID.' }));
                return;
            }

            // Ensure room exists in MongoDB (or create it permanently)
            await Room.findOneAndUpdate(
                { roomId },
                { $setOnInsert: { roomId, createdBy: user.username, createdAt: new Date() } },
                { upsert: true }
            );

            let room = rooms.get(roomId);
            if (!room) {
                room = new Set<WebSocket>();
                rooms.set(roomId, room);
            }
            room.add(socket);

            // Fetch persistent message history from MongoDB
            const history = await Message.find({ roomId }).sort({ createdAt: 1 }).limit(100).lean();

            socket.send(JSON.stringify({
                type: 'ROOM_JOINED',
                roomId,
                history: history.map(d => ({ sender: d.sender, content: d.content, createdAt: d.createdAt })),
            }));

            // Notify other active room members
            for (const client of room) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'NEW_MESSAGE',
                        roomId,
                        sender: 'SYSTEM',
                        message: `[+] ${user.username} entered the room`,
                        createdAt: new Date(),
                    }));
                }
            }
            return;
        }

        // 3. SEND_MESSAGE (Saved to MongoDB and broadcast)
        if (msg.type === 'SEND_MESSAGE') {
            const roomId = String(msg.id || '').trim().toUpperCase();
            const messageText = typeof msg.message === 'string' ? msg.message.trim() : '';
            if (!roomId || !messageText) return;

            const room = rooms.get(roomId);
            if (!room || !room.has(socket)) {
                socket.send(JSON.stringify({ type: 'ROOM_ERROR', message: 'Join room before sending messages.' }));
                return;
            }

            // Save chat message permanently to MongoDB
            await Message.create({
                roomId,
                sender: user.username,
                content: messageText,
            });

            const broadcastPayload = JSON.stringify({
                type: 'NEW_MESSAGE',
                roomId,
                sender: user.username,
                message: messageText,
                createdAt: new Date(),
            });

            for (const client of room) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(broadcastPayload);
                }
            }
            return;
        }

        // 4. LEAVE_ROOM
        if (msg.type === 'LEAVE_ROOM') {
            const roomId = String(msg.id || '').trim().toUpperCase();
            const room = rooms.get(roomId);

            if (room && room.has(socket)) {
                room.delete(socket);
                socket.send(JSON.stringify({ type: 'ROOM_LEFT', roomId }));

                for (const client of room) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'NEW_MESSAGE',
                            roomId,
                            sender: 'SYSTEM',
                            message: `[-] ${user.username} left the room`,
                            createdAt: new Date(),
                        }));
                    }
                }
                // Room and messages remain stored in MongoDB forever
            }
        }
    });

    socket.on('close', () => {
        const user = userBySocket.get(socket);
        userBySocket.delete(socket);

        for (const [roomId, room] of rooms) {
            if (room.has(socket)) {
                room.delete(socket);
                if (user) {
                    for (const client of room) {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'NEW_MESSAGE',
                                roomId,
                                sender: 'SYSTEM',
                                message: `[-] ${user.username} disconnected`,
                                createdAt: new Date(),
                            }));
                        }
                    }
                }
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(` Retro Chat Server is running on http://localhost:${PORT}`);
});
