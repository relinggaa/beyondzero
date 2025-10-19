import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function NavbarUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage().props;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pb-2">
            {/* Navbar Container */}
            <nav className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl w-full max-w-6xl mx-4 px-4 sm:px-6 py-4 shadow-2xl">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-cursive bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent font-bold">
                           BeyondMind
                        </h1>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop Navigation & Actions - Unified */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        {/* Navigation Links */}
                        <a 
                            href="/" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            Dashboard
                        </a>
                        <a 
                            href="/moodtracker" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            MoodTracking
                        </a>
                        <a 
                            href="/curhat" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            Curhat
                        </a>
                        <a 
                            href="/journaling" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            Journaling
                        </a>
                        <a 
                            href="/psikolog" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            Psikolog
                        </a>
                        <a 
                            href="/healing" 
                            className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium"
                        >
                            Healing
                        </a>
                        
                        {/* Separator */}
                        <div className="w-px h-6 bg-slate-600/50 mx-1"></div>
                        
                        {/* User Info & Logout */}
                        <span className="text-slate-300 text-sm font-medium px-2">
                            Halo, {auth?.user?.name || 'User'}
                        </span>
                        <Link
                            href="/logout"
                            method="post"
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-4 lg:px-6 py-2 rounded-full transition-all duration-200 font-semibold text-xs lg:text-sm tracking-wide"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50">
                        <div className="flex flex-col space-y-2 pt-4">
                            <a 
                                href="#" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                Dashboard
                            </a>
                            <a 
                                href="/moodtracker" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                MoodTracking
                            </a>
                            <a 
                                href="/curhat" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                Curhat
                            </a>
                            <a 
                                href="/journaling" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                Journaling
                            </a>
                            <a 
                                href="/healing" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                Healing
                            </a>
                            <a 
                                href="/psikolog" 
                                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                            >
                                Psikolog
                            </a>
                         
                            <button className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-4 py-2 rounded-full transition-all duration-200 font-bold text-sm tracking-wide w-full mt-4">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
