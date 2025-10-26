import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function LoginAdmin() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-2xl">A</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Admin Login</h2>
                    <p className="mt-2 text-slate-400">Akses panel administrasi FixYou</p>
                </div>

                {/* Login Form */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="Masukkan username admin"
                                required
                            />
                            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="Masukkan password admin"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-600 rounded bg-slate-700"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                                    Ingat saya
                                </label>
                            </div>
                            <Link
                                href="/admin/forgot-password"
                                className="text-sm text-red-400 hover:text-red-300 transition-colors"
                            >
                                Lupa password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Memproses..." : "Masuk sebagai Admin"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            Belum punya akun admin?{" "}
                            <Link
                                href="/admin/register"
                                className="text-red-400 hover:text-red-300 font-medium transition-colors"
                            >
                                Daftar admin
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home & Other Login Options */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
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
                            href="/psikolog/login"
                            className="py-2 px-4 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-cyan-500/50 transition-all duration-200 text-center font-medium flex items-center justify-center space-x-2"
                        >
                            <span>👨‍⚕️ Psikolog</span>
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
