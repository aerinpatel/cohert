import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    isConnected: boolean;
    activeRoom: string;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    user,
    isConnected,
    activeRoom,
    onLogout,
}) => {
    return (
        <header className="retro-header">
            <div className="header-brand">
                <span className="brand-logo">■</span>
                <span className="brand-name">RETRO_MERN_CHAT</span>
                <span className="brand-ver">v1.0</span>
            </div>

            <div className="header-meta">
                <div className="meta-badge user-badge">
                    <span className="meta-label">USER:</span>
                    <span className="meta-val">{user ? user.username : 'ANONYMOUS'}</span>
                </div>

                <div className={`meta-badge status-badge ${isConnected ? 'online' : 'offline'}`}>
                    <span className="status-dot"></span>
                    <span className="meta-val">{isConnected ? 'WS_ONLINE' : 'WS_DISCONNECTED'}</span>
                </div>

                {activeRoom && (
                    <div className="meta-badge room-badge">
                        <span className="meta-label">ROOM:</span>
                        <span className="meta-val highlight">{activeRoom}</span>
                    </div>
                )}

                <button
                    type="button"
                    className="retro-btn danger-btn sm"
                    onClick={onLogout}
                    title="Sign Out"
                >
                    [ LOGOUT ]
                </button>
            </div>
        </header>
    );
};
