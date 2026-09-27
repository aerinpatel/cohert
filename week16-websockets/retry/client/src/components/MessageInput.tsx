import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
    disabled: boolean;
    onSendMessage: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    disabled,
    onSendMessage,
}) => {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    }, [disabled]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = text.trim();
        if (trimmed && !disabled) {
            onSendMessage(trimmed);
            setText('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="retro-message-input-form">
            <div className="prompt-symbol">&gt;</div>
            <input
                ref={inputRef}
                type="text"
                className="retro-terminal-input"
                placeholder={disabled ? 'Join a room to send messages...' : 'Type transmission... (Press Enter to send)'}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={disabled}
            />
            <button
                type="submit"
                className="retro-btn primary-btn send-btn"
                disabled={disabled || !text.trim()}
            >
                [ TRANSMIT ]
            </button>
        </form>
    );
};
