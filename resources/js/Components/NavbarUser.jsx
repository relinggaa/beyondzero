import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function NavbarUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage().props;

    return (
        <div className="flex justify-center">
            {/* Navbar Container */}
            <nav className="bg-gray-200 rounded-3xl w-full max-w-6xl mx-4 px-4 sm:px-6 py-4">
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
                        className="md:hidden p-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                   
                        <a 
                            href="/" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            Dashboard
                        </a>

                        {/* Tes Psikologi */}
                        <a 
                            href="/moodtracker" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            MoodTracking
                        </a>

                        {/* Tentang Kami */}
                        <a 
                            href="/curhat" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            Curhat
                        </a>

                        {/* List Psikolog */}
                        <a 
                            href="/journaling" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            Journaling
                        </a>
                        <a 
                            href="/psikolog" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            Psikolog
                        </a>
                        <a 
                            href="/healing" 
                            className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 text-sm lg:text-base"
                        >
                            Healing
                        </a>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        {/* Booking Sesi Button */}
                        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors duration-200 font-medium">
                            
                        </button> */}

                        {/* User Info & Logout */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 text-sm">
                                Halo, {auth?.user?.name || 'User'}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full transition-all duration-200 font-bold text-xs lg:text-sm tracking-wide"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-300">
                        <div className="flex flex-col space-y-2 pt-4">
                            <a 
                                href="#" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
                            >
                                Dashboard
                            </a>
                            <a 
                                href="/moodtracker" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
                            >
                                MoodTracking
                            </a>
                            <a 
                                href="/curhat" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
                            >
                                Curhat
                            </a>
                            <a 
                                href="/journaling" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
                            >
                                Journaling
                            </a>
                            <a 
                                href="/healing" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
                            >
                                Healing
                            </a>
                            <a 
                                href="/psikolog" 
                                className="text-gray-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-200 py-2 px-4 rounded-lg"
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
