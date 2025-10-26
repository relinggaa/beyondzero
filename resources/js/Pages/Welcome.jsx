import React from "react";
import { Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-3xl">B</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        FixYou
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Platform Kesehatan Mental
                    </p>
                </div>

                {/* Authentication Buttons */}
                <div className="space-y-4">
                    {/* User Login */}
                    <Link
                        href="/login"
                        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login User
                    </Link>

                    {/* User Register */}
                    <Link
                        href="/register"
                        className="w-full flex items-center justify-center px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Register User
                    </Link>

                        {/* Admin Login */}
                        <Link
                            href="/admin/login"
                            className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Login Admin
                        </Link>

                        {/* Psikolog Login */}
                        <Link
                            href="/psikolog/login"
                            className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Login Psikolog
                        </Link>
                </div>
            </div>
        </div>
    );
}