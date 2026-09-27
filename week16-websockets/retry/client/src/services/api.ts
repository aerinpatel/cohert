import type { AuthResponse, User, RoomItem } from '../types';

const API_BASE = 'http://localhost:8080';

const ACCESS_TOKEN_KEY = 'retro_chat_access_token';
const REFRESH_TOKEN_KEY = 'retro_chat_refresh_token';
const USER_KEY = 'retro_chat_user';
const ACTIVE_ROOM_KEY = 'retro_chat_active_room';

export const authStorage = {
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    getUser(): User | null {
        const raw = localStorage.getItem(USER_KEY);
        try {
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },
    getActiveRoom(): string | null {
        return localStorage.getItem(ACTIVE_ROOM_KEY);
    },
    setActiveRoom(roomId: string) {
        localStorage.setItem(ACTIVE_ROOM_KEY, roomId);
    },
    clearActiveRoom() {
        localStorage.removeItem(ACTIVE_ROOM_KEY);
    },
    setSession(data: AuthResponse) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    },
    updateAccessToken(accessToken: string, refreshToken?: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },
    clearSession() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ACTIVE_ROOM_KEY);
    },
};

export async function fetchRooms(): Promise<RoomItem[]> {
    try {
        const res = await fetch(`${API_BASE}/rooms`);
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export async function signup(username: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    authStorage.setSession(data);
    return data;
}

export async function signin(username: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signin failed');

    authStorage.setSession(data);
    return data;
}

export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) return null;

    try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            authStorage.clearSession();
            return null;
        }

        const data = await res.json();
        authStorage.updateAccessToken(data.accessToken, data.refreshToken);
        return data.accessToken;
    } catch {
        authStorage.clearSession();
        return null;
    }
}

export async function logout(): Promise<void> {
    const refreshToken = authStorage.getRefreshToken();
    try {
        if (refreshToken) {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });
        }
    } finally {
        authStorage.clearSession();
    }
}
