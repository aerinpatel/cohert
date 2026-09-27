import React, { useState } from 'react';
import type { RoomItem } from '../types';

interface RoomControlsProps {
    activeRoom: string;
    roomsList: RoomItem[];
    onCreateRoom: () => void;
    onJoinRoom: (roomId: string) => void;
    onLeaveRoom: () => void;
}

export const RoomControls: React.FC<RoomControlsProps> = ({
    activeRoom,
    roomsList,
    onCreateRoom,
    onJoinRoom,
    onLeaveRoom,
}) => {
    const [joinInput, setJoinInput] = useState('');
    const [copied, setCopied] = useState(false);

    function handleJoinSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = joinInput.trim().toUpperCase();
        if (trimmed) {
            onJoinRoom(trimmed);
            setJoinInput('');
        }
    }

    function handleCopy() {
        if (activeRoom) {
            navigator.clipboard.writeText(activeRoom);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <div className="retro-card room-controls-card">
            <div className="retro-card-header">
                <span className="retro-card-title">&gt; ROOM_CHANNELS</span>
            </div>

            <div className="room-controls-body">
                {!activeRoom ? (
                    <div className="room-actions-wrapper">
                        <button
                            type="button"
                            className="retro-btn primary-btn full"
                            onClick={onCreateRoom}
                        >
                            [+] CREATE NEW ROOM
                        </button>

                        <form onSubmit={handleJoinSubmit} className="join-form">
                            <input
                                type="text"
                                className="retro-input"
                                placeholder="ENTER ROOM ID"
                                value={joinInput}
                                onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                            />
                            <button
                                type="submit"
                                className="retro-btn full"
                                disabled={!joinInput.trim()}
                            >
                                [ ENTER ROOM ]
                            </button>
                        </form>

                        {roomsList.length > 0 && (
                            <div className="persistent-rooms-list">
                                <div className="divider-text">-- PERSISTENT ROOMS ({roomsList.length}) --</div>
                                <div className="rooms-scroll-list">
                                    {roomsList.map((r) => (
                                        <button
                                            key={r.roomId}
                                            type="button"
                                            className="retro-room-item-btn"
                                            onClick={() => onJoinRoom(r.roomId)}
                                        >
                                            <span className="room-item-id">#{r.roomId}</span>
                                            <span className="room-item-by">by {r.createdBy}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="active-room-box">
                        <div className="active-room-info">
                            <span className="active-label">&gt; CURRENT CHANNEL:</span>
                            <span className="active-id">{activeRoom}</span>
                            <button
                                type="button"
                                className="retro-btn sm"
                                onClick={handleCopy}
                            >
                                {copied ? '[ COPIED! ]' : '[ COPY ID ]'}
                            </button>
                        </div>

                        <button
                            type="button"
                            className="retro-btn danger-btn sm full"
                            onClick={onLeaveRoom}
                        >
                            [ LEAVE ROOM ]
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
