import crypto from 'node:crypto';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'retro_chat_default_access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'retro_chat_default_refresh_secret';

export interface TokenPayload {
    userId: string;
    username: string;
}

export function hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function generateTokens(userId: string, username: string) {
    const accessToken = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId, username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch {
        return null;
    }
}

// POST /auth/signup
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
        const password = typeof req.body?.password === 'string' ? req.body.password : '';

        if (!username || username.length < 3) {
            res.status(400).json({ message: 'Username must be at least 3 characters long.' });
            return;
        }

        if (!password || password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long.' });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: 'Username is already taken.' });
            return;
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const passwordHash = hashPassword(password, salt);

        const user = new User({
            username,
            passwordHash,
            salt,
        });

        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.username);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            message: 'Account created successfully.',
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
});

// POST /auth/signin
router.post('/signin', async (req: Request, res: Response): Promise<void> => {
    try {
        const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
        const password = typeof req.body?.password === 'string' ? req.body.password : '';

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required.' });
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password.' });
            return;
        }

        const computedHash = hashPassword(password, user.salt);
        if (computedHash !== user.passwordHash) {
            res.status(401).json({ message: 'Invalid username or password.' });
            return;
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.username);
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            message: 'Signed in successfully.',
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Internal server error during sign in.' });
    }
});

// POST /auth/refresh
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken || typeof refreshToken !== 'string') {
            res.status(400).json({ message: 'Refresh token is required.' });
            return;
        }

        let decoded: TokenPayload;
        try {
            decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
        } catch {
            res.status(401).json({ message: 'Invalid or expired refresh token.' });
            return;
        }

        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(401).json({ message: 'Session expired or invalidated. Please sign in again.' });
            return;
        }

        const tokens = generateTokens(user._id.toString(), user.username);
        user.refreshToken = tokens.refreshToken;
        await user.save();

        res.json({
            message: 'Token refreshed successfully.',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error) {
        console.error('Refresh error:', error);
        res.status(500).json({ message: 'Internal server error during token refresh.' });
    }
});

// POST /auth/logout
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken && typeof refreshToken === 'string') {
            await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
        }
        res.json({ message: 'Signed out successfully.' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error during sign out.' });
    }
});

export default router;