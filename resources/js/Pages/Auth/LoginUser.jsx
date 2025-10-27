import React from "react";
import { Link, useForm } from "@inertiajs/react";
import loginVector from "../../../img/loginVector.png";

export default function LoginUser() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `url(${loginVector})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className="max-w-md w-full space-y-3 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-2 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-black rounded-full"></div>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-white mb-1">FixYou</h1>
                    <h2 className="text-xl font-bold text-white">Masuk ke Akun Anda</h2>
                    <p className="mt-1 text-white/70 text-sm">Selamat datang kembali di FixYou</p>
                </div>

                {/* Role Selection */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <label className="block text-xs font-medium text-white/90 mb-2">
                        Login Sebagai
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            disabled
                            className="py-1 px-2 rounded-lg text-xs font-medium bg-white text-black shadow-lg cursor-default"
                        >
                            User
                        </button>
                        <Link
                            href="/admin/login"
                            className="py-1 px-2 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/20 hover:border-white/50 transition-all duration-200 text-center"
                        >
                            Admin
                        </Link>
                        <Link
                            href="/psikolog/login"
                            className="py-1 px-2 rounded-lg text-xs font-medium bg-white/5 text-white border border-white/20 hover:border-white/50 transition-all duration-200 text-center"
                        >
                            Psikolog
                        </Link>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-center mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                            Login sebagai User
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-xs font-medium text-white/90 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
                                placeholder="Masukkan username"
                                required
                            />
                            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-white/90 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
                                placeholder="Masukkan password"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-3 w-3 text-black focus:ring-white/50 border-white/20 rounded bg-white/5"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-white/90">
                                    Ingat saya
                                </label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Lupa password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-white hover:bg-white/90 text-black py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-2 text-center">
                        <p className="text-white/70 text-xs">
                            Belum punya akun?{" "}
                            <Link
                                href="/register"
                                className="text-white hover:text-white/80 font-medium transition-colors"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="text-white/70 hover:text-white transition-colors flex items-center justify-center space-x-1 text-xs"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
