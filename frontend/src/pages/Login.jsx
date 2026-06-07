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
            toast.error('Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                            MT
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            MediTrack Login
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Sign in to access System
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
                        >
                            Login
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;