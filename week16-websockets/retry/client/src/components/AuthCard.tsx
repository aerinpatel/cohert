import React, { useState } from 'react';
import { signup, signin } from '../services/api';
import type { User } from '../types';

interface AuthCardProps {
    onAuthSuccess: (user: User) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ onAuthSuccess }) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signup');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('');
        setIsLoading(true);

        try {
            const data = mode === 'signup'
                ? await signup(username, password)
                : await signin(username, password);

            onAuthSuccess(data.user);
        } catch (err: any) {
            setStatus(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="retro-auth-container">
            <div className="retro-card auth-box">
                <div className="retro-card-header">
                    <span className="retro-card-title">== RETRO_AUTH_TERMINAL ==</span>
                    <span className="retro-dots">● ● ●</span>
                </div>

                <div className="retro-tab-group">
                    <button
                        type="button"
                        className={`retro-tab-btn ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => { setMode('signup'); setStatus(''); }}
                    >
                        [ SIGN UP ]
                    </button>
                    <button
                        type="button"
                        className={`retro-tab-btn ${mode === 'signin' ? 'active' : ''}`}
                        onClick={() => { setMode('signin'); setStatus(''); }}
                    >
                        [ SIGN IN ]
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="retro-form">
                    <div className="input-group">
                        <label htmlFor="username-input">&gt; USERNAME:</label>
                        <input
                            id="username-input"
                            type="text"
                            className="retro-input"
                            placeholder="Enter username (min 3 chars)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password-input">&gt; PASSWORD:</label>
                        <input
                            id="password-input"
                            type="password"
                            className="retro-input"
                            placeholder="Enter password (min 6 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="retro-btn primary-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? '>>> PROCESSING...' : (mode === 'signup' ? '&gt;&gt; CREATE ACCOUNT' : '&gt;&gt; AUTHENTICATE')}
                    </button>
                </form>

                {status && (
                    <div className={`retro-status ${status.includes('successfully') ? 'success' : 'error'}`}>
                        * {status}
                    </div>
                )}

                <div className="retro-card-footer">
                    <small>SECURED WITH JWT ACCESS + REFRESH TOKENS</small>
                </div>
            </div>
        </div>
    );
};
