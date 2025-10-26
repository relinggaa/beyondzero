import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function LoginPsikolog() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        key: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/psikolog/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-3xl">👨‍⚕️</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Login Psikolog
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Masuk ke dashboard psikolog
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Username Field */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                                    placeholder="Masukkan username"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                                )}
                            </div>

                            {/* Key Field */}
                            <div>
                                <label htmlFor="key" className="block text-sm font-medium text-white mb-2">
                                    Access Key
                                </label>
                                <input
                                    id="key"
                                    name="key"
                                    type="password"
                                    value={data.key}
                                    onChange={(e) => setData('key', e.target.value)}
                                    required
                                    maxLength="6"
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                                    placeholder="Masukkan 6 digit key"
                                />
                                {errors.key && (
                                    <p className="mt-1 text-sm text-red-400">{errors.key}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Masuk...' : 'Masuk'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Other Login Options */}
                <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                    <p className="text-sm font-medium text-slate-300 mb-3">Login sebagai:</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <Link
                            href="/login"
                            className="py-2 px-4 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-cyan-500/50 transition-all duration-200 text-center font-medium flex items-center justify-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>👤 User</span>
                        </Link>
                        <Link
                            href="/admin/login"
                            className="py-2 px-4 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-red-500/50 transition-all duration-200 text-center font-medium flex items-center justify-center space-x-2"
                        >
                            <span>🛡️ Admin</span>
                        </Link>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center justify-center space-x-2 text-center text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
