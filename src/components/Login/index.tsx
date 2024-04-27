// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useApiConfig } from '../../ApiConfigContext';

interface LoginProps {
    partitionId: string;
    onLoginSuccess: (message: string) => void;
    onLoginFail: (error: string) => void;
}

const Login: React.FC<LoginProps> = ({ partitionId, onLoginSuccess, onLoginFail }) => {
    const { apiBaseUrl } = useApiConfig();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiBaseUrl}/login`, {
                username,
                password,
                partitionId
            });
            if (response.status === 200 && response.data) {
                onLoginSuccess(response.data);
            } else {
                onLoginFail("Authentication failed, please try again.");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
