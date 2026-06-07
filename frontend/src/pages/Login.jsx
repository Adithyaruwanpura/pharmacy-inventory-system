import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                {
                    username,
                    password
                }
            );

            localStorage.setItem('token', response.data.token);

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            toast.success('Login successful');
            navigate('/dashboard');

        } catch (error) {

            alert('Login failed');

        }
    };

    return (
        <div style={{ padding: '40px' }}>

            <h1>Pharmacy Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;