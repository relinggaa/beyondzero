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
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                                type="text"
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

                    {/* Back to Welcome */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                            ← Kembali ke halaman utama
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
