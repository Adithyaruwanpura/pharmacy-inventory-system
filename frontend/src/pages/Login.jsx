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

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'role',
                response.data.user.role
            );

            localStorage.setItem(
                'username',
                response.data.user.username
            );

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
        <div className="min-h-screen bg-linear-to-tr from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden font-sans antialiased">

            {/* AMBIENT BACKGROUND GLOW BLOBS */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10">
                {/* GLASS CONTAINER PANEL */}
                <div className="bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-slate-800/80">

                    {/* BRAND TITLE LOGO HEADER */}
                    <div className="text-center mb-8">
                        <div className="relative w-16 h-16 mx-auto mb-4 group">
                            {/* OUTER GLOWING BOUNDARY RING */}
                            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                            {/* SOLID LOGO BODY CONTAINER */}
                            <div className="relative w-16 h-16 bg-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl tracking-wider">
                                <span className="bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">MT</span>
                            </div>
                        </div>

                        <h1 className="text-2xl font-black text-white tracking-tight">
                            MediTrack System
                        </h1>

                        <p className="text-slate-400 text-xs mt-1.5 font-medium tracking-wide">
                            Authorized personnel access terminal
                        </p>
                    </div>

                    {/* CREDENTIAL ENTRY DISPATCH FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* USERNAME SELECTION CONTAINER */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-0.5">
                                Operator Username
                            </label>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter system handle..."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* PASSWORD ENTRY CONTAINER */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-0.5">
                                Security Passkey
                            </label>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* EXECUTE ENTRANCE CTA */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full relative group overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-950/50 transition-all duration-300"
                            >
                                {/* REFLECT FLASH HIGHLIGHT ON HOVER */}
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                                <span className="relative">Establish Session</span>
                            </button>
                        </div>

                    </form>
                </div>

                {/* SUB-FOOTER RECOGNITION NOTATION */}
                <p className="text-center text-[10px] font-semibold text-slate-600 uppercase tracking-widest mt-6">
                    Protected Cryptographic Node Access
                </p>
            </div>
        </div>
    );
}

export default Login;