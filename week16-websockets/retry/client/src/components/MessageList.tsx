import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

interface MessageListProps {
    messages: ChatMessage[];
    currentUser: string;
    activeRoom: string;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    currentUser,
    activeRoom,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function formatTime(dateVal?: string | Date) {
        if (!dateVal) {
            const now = new Date();
            return now.toTimeString().substring(0, 8);
        }
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? '' : d.toTimeString().substring(0, 8);
    }

    if (!activeRoom) {
        return (
            <div className="retro-message-container empty-state">
                <div className="terminal-cursor-prompt">
                    <p className="retro-text-muted">&gt; NO ACTIVE ROOM SELECTED.</p>
                    <p className="retro-text-muted">&gt; PLEASE CREATE OR JOIN A ROOM TO START CHATTING.</p>
                    <span className="blinking-cursor">_</span>
                </div>
            </div>
        );
    }

    return (
        <div className="retro-message-container">
            <div className="terminal-header-bar">
                <span>--- LOGGING CHANNEL: #{activeRoom} ---</span>
                <span>COUNT: {messages.length}</span>
            </div>

            <div className="message-stream">
                {messages.length === 0 ? (
                    <div className="empty-room-notice">
                        <p>&gt; Room established. Waiting for transmissions...</p>
                        <span className="blinking-cursor">_</span>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isSystem = msg.sender === 'SYSTEM';
                        const isMe = msg.sender === currentUser;
                        const text = msg.message || msg.content || '';
                        const time = formatTime(msg.createdAt);

                        if (isSystem) {
                            return (
                                <div key={index} className="msg-row system-msg">
                                    <span className="msg-time">[{time}]</span>
                                    <span className="system-tag">***</span>
                                    <span className="msg-body">{text}</span>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={`msg-row user-msg ${isMe ? 'msg-self' : 'msg-other'}`}
                            >
                                <span className="msg-time">[{time}]</span>
                                <span className={`msg-sender ${isMe ? 'self' : 'other'}`}>
                                    &lt;{isMe ? 'YOU' : msg.sender}&gt;
                                </span>
                                <span className="msg-body">{text}</span>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
