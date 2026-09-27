import { useEffect, useRef, useState, useCallback } from 'react';
import { AuthCard } from './components/AuthCard';
import { Header } from './components/Header';
import { RoomControls } from './components/RoomControls';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { authStorage, logout, refreshAccessToken, fetchRooms } from './services/api';
import type { User, ChatMessage, RoomItem } from './types';
import './App.css';

export function App() {
    const [user, setUser] = useState<User | null>(authStorage.getUser());
    const [isConnected, setIsConnected] = useState(false);
    const [activeRoom, setActiveRoom] = useState<string>(authStorage.getActiveRoom() || '');
    const [roomsList, setRoomsList] = useState<RoomItem[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [statusBanner, setStatusBanner] = useState<string>('');

    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const loadRooms = useCallback(async () => {
        const list = await fetchRooms();
        setRoomsList(list);
    }, []);

    const connectWebSocket = useCallback(async () => {
        let token = authStorage.getAccessToken();
        if (!token) return;

        if (socketRef.current) {
            socketRef.current.close();
        }

        const wsUrl = `ws://localhost:8080?token=${encodeURIComponent(token)}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            setIsConnected(true);
            setStatusBanner('');

            // Restore persistent room if saved in localStorage
            const savedRoom = authStorage.getActiveRoom();
            if (savedRoom) {
                socket.send(JSON.stringify({ type: 'JOIN_ROOM', id: savedRoom }));
            }
        };

        socket.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);

                if (payload.type === 'AUTH_SUCCESS') {
                    setIsConnected(true);
                } else if (payload.type === 'ROOM_CREATED') {
                    setActiveRoom(payload.roomId);
                    authStorage.setActiveRoom(payload.roomId);
                    setMessages([]);
                    setStatusBanner(`Room created: ${payload.roomId}`);
                    loadRooms();
                } else if (payload.type === 'ROOM_JOINED') {
                    setActiveRoom(payload.roomId);
                    authStorage.setActiveRoom(payload.roomId);
                    setMessages(payload.history || []);
                    setStatusBanner(`Joined room: ${payload.roomId}`);
                } else if (payload.type === 'ROOM_LEFT') {
                    setActiveRoom('');
                    authStorage.clearActiveRoom();
                    setMessages([]);
                    setStatusBanner('Left room');
                } else if (payload.type === 'ROOMS_UPDATED') {
                    setRoomsList(payload.rooms || []);
                } else if (payload.type === 'NEW_MESSAGE') {
                    setMessages((prev) => [...prev, payload]);
                } else if (payload.type === 'ROOM_ERROR') {
                    setStatusBanner(`Error: ${payload.message}`);
                }
            } catch (err) {
                console.error('Failed to parse WebSocket message:', err);
            }
        };

        socket.onerror = async () => {
            setIsConnected(false);
        };

        socket.onclose = async (event) => {
            setIsConnected(false);

            if (event.code === 4001 && user) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    reconnectTimeoutRef.current = setTimeout(connectWebSocket, 1000);
                } else {
                    handleLogout();
                }
            }
        };
    }, [user, loadRooms]);

    useEffect(() => {
        if (user) {
            connectWebSocket();
            loadRooms();
        }

        return () => {
            if (socketRef.current) socketRef.current.close();
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        };
    }, [user, connectWebSocket, loadRooms]);

    function handleAuthSuccess(authenticatedUser: User) {
        setUser(authenticatedUser);
    }

    async function handleLogout() {
        await logout();
        if (socketRef.current) socketRef.current.close();
        setUser(null);
        setActiveRoom('');
        authStorage.clearSession();
        setMessages([]);
        setIsConnected(false);
        setStatusBanner('');
    }

    function handleCreateRoom() {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            setStatusBanner('Error: Not connected to chat server');
            return;
        }
        socketRef.current.send(JSON.stringify({ type: 'CREATE_ROOM' }));
    }

    function handleJoinRoom(roomId: string) {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            setStatusBanner('Error: Not connected to chat server');
            return;
        }
        socketRef.current.send(JSON.stringify({ type: 'JOIN_ROOM', id: roomId }));
    }

    function handleLeaveRoom() {
        if (socketRef.current && activeRoom) {
            socketRef.current.send(JSON.stringify({ type: 'LEAVE_ROOM', id: activeRoom }));
        }
    }

    function handleSendMessage(message: string) {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN || !activeRoom) {
            return;
        }
        socketRef.current.send(JSON.stringify({
            type: 'SEND_MESSAGE',
            id: activeRoom,
            message,
        }));
    }

    if (!user) {
        return <AuthCard onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="retro-app-layout">
            <Header
                user={user}
                isConnected={isConnected}
                activeRoom={activeRoom}
                onLogout={handleLogout}
            />

            {statusBanner && (
                <div className="retro-banner">
                    <span>* {statusBanner}</span>
                    <button
                        type="button"
                        className="banner-close"
                        onClick={() => setStatusBanner('')}
                    >
                        ×
                    </button>
                </div>
            )}

            <main className="retro-main-content">
                <aside className="retro-sidebar">
                    <RoomControls
                        activeRoom={activeRoom}
                        roomsList={roomsList}
                        onCreateRoom={handleCreateRoom}
                        onJoinRoom={handleJoinRoom}
                        onLeaveRoom={handleLeaveRoom}
                    />

                    <div className="retro-card system-info-card">
                        <div className="retro-card-header">
                            <span className="retro-card-title">&gt; SYSTEM_STATUS</span>
                        </div>
                        <div className="system-info-body">
                            <div><span className="key">STACK:</span> <span className="val">MERN + WS</span></div>
                            <div><span className="key">STORAGE:</span> <span className="val">PERSISTENT_MONGODB</span></div>
                            <div><span className="key">STATUS:</span> <span className={`val ${isConnected ? 'good' : 'bad'}`}>{isConnected ? 'CONNECTED' : 'OFFLINE'}</span></div>
                        </div>
                    </div>
                </aside>

                <section className="retro-chat-section">
                    <MessageList
                        messages={messages}
                        currentUser={user.username}
                        activeRoom={activeRoom}
                    />

                    <MessageInput
                        disabled={!activeRoom || !isConnected}
                        onSendMessage={handleSendMessage}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;