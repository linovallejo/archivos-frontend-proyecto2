// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    partitionId: number;
    onLoginSuccess: () => void;
    onLoginFail: (error: string) => void;
}

const Login: React.FC<LoginProps> = ({ partitionId, onLoginSuccess, onLoginFail }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:4000/login`, {
                username,
                password,
                partitionId
            });
            if (response.data.success) {
                onLoginSuccess();
            } else {
                onLoginFail("Authentication failed, please try again.");
            }
        } catch (error: any) {
            onLoginFail(error.response?.data?.message || "Login request failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
