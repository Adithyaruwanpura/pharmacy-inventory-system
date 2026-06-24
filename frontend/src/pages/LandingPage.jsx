import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100 selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">

            {/* Top Navigation Bar */}
            <nav className="border-b border-white/5 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
                <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        {/* Custom Logo Container matching image_7b4bc3.png */}
                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center font-extrabold text-sm tracking-tighter border border-white/5 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                            <span className="text-blue-500">M</span>
                            <span className="text-indigo-300">T</span>
                        </div>
                        {/* Brand Name matching image_7b4bc3.png */}
                        <span className="text-xl font-black tracking-tight text-white">
                            MediTrack System
                        </span>
                    </div>

                    <Link
                        to="/login"
                        className="bg-white/10 hover:bg-white hover:text-slate-950 text-white border border-white/10 px-5 py-2 rounded-xl font-semibold transition-all duration-200 shadow-xs"
                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Hero Section */}
            <header className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative">
                {/* Visual Ambient Light Orb */}
                <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Headline and Actions */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Reliable Healthcare & Medicine Analytics
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                            Pharmacy <br />
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                Inventory Management
                            </span>
                        </h1>

                        <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-400 leading-relaxed">
                            Easily manage medicines, coordinate with suppliers, log purchases, track real-time sales transactions, issue invoices, monitor critical expiry alerts, and handle analytics from one clean, centralized dashboard.
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-xl shadow-blue-600/10 text-center hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                            <button
                                className="bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all text-center"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Clean Image Showcase Frame */}
                    <div className="lg:col-span-5 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-emerald-500/5 to-transparent rounded-3xl filter blur-xl" />
                        <div className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 bg-slate-900/40 backdrop-blur-xs">
                            <img
                                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88"
                                alt="Modern pharmacy setting"
                                className="rounded-xl object-cover aspect-4/3 w-full brightness-90 contrast-105"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Matrix Grid Section */}
            <section className="bg-slate-950 border-t border-white/5 py-20 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <h2 className="text-xs uppercase font-bold tracking-widest text-blue-500">Core Architecture</h2>
                        <p className="text-3xl font-extrabold text-white tracking-tight">
                            Engineered for Clinical Precision
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* INVENTORY TRACKING */}
                        <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:border-blue-500/20 group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l-8-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Inventory</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Complete real-time medicine stock management with smart reorder points and instant alert logging.
                            </p>
                        </div>

                        {/* COUNTER SALES */}
                        <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:border-emerald-500/20 group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Sales</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Fast-paced POS billing workflows, print adjustments, and transparent transactional invoice logging.
                            </p>
                        </div>

                        {/* SYSTEM ANALYTICS */}
                        <div className="bg-slate-900/40 p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:border-cyan-500/20 group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Comprehensive audit logs detailing incoming revenues, profit margins, and dynamic reporting.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Professional Footer */}
            <footer className="border-t border-white/5 bg-slate-950 py-10 text-xs text-slate-500">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        © 2026 MediTrack System. Engineered for clinical accuracy.
                    </div>
                    <div className="flex gap-5 text-slate-400">
                        <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Infrastructure</span>
                        <span>•</span>
                        <span className="hover:text-blue-400 cursor-pointer transition-colors">Operational Protocols</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;