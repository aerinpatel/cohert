export interface User {
    id: string;
    username: string;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ChatMessage {
    type?: string;
    roomId?: string;
    sender?: string;
    message?: string;
    content?: string;
    createdAt?: string | Date;
}

export interface RoomItem {
    _id?: string;
    roomId: string;
    name?: string;
    createdBy: string;
    createdAt?: string | Date;
}
