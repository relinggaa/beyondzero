import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Login() {
    const [selectedRole, setSelectedRole] = useState("user");
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                toast.success("Login berhasil!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
            onError: (errors) => {
                toast.error("Email atau password salah!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-400 rounded-full mb-6 shadow-lg">
                        <span className="text-4xl font-bold text-white">F</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Masuk ke Akun Anda</h1>
                    <p className="text-white/70">Selamat datang kembali di FixYou</p>
                </div>

                {/* Role Selection Card */}
                <div className="bg-slate-800 rounded-xl p-6 mb-6">
                    <label className="block text-sm font-medium text-white mb-4">
                        Login Sebagai
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setSelectedRole("user")}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                                selectedRole === "user"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-white text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm font-medium">User</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedRole("admin")}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                                selectedRole === "admin"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-white text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-sm font-medium">Admin</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedRole("psikolog")}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                                selectedRole === "psikolog"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-white text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span className="text-sm font-medium">Psikolog</span>
                        </button>
                    </div>
                    <p className="text-white/60 text-xs mt-4">
                        Kami tampilkan agar mempermudah panitia untuk mencoba fitur yang ada di website kami
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                placeholder="Masukkan username Anda"
                                required
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                placeholder="Masukkan password Anda"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Masuk</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-white/70">
                        Belum punya akun?{" "}
                        <Link
                            href="/register"
                            className="text-white hover:text-gray-300 font-medium transition-colors"
                        >
                            Daftar di sini
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-white/50 text-sm">
                        © 2024 FixYou. Semua hak dilindungi.
                    </p>
                </div>
            </div>
        </div>
    );
}
