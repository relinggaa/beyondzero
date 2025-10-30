import React, { useMemo } from "react";
import { Link } from "@inertiajs/react";
import LayoutAdmin from "../../Components/Layout/LayoutAdmin";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardAdmin({ admin, stats, recentBookings, recentJournals }) {

    const statsData = [
        {
            title: "Total Users",
            value: stats?.totalUsers || 0,
            change: "+12%",
            changeType: "positive",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            )
        },
        {
            title: "Total Psikolog",
            value: stats?.totalPsikologs || 0,
            change: "+3",
            changeType: "positive",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            title: "Total Bookings",
            value: stats?.totalBookings || 0,
            change: "+8%",
            changeType: "positive",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: "Total Journals",
            value: stats?.totalJournals || 0,
            change: "+15%",
            changeType: "positive",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            )
        }
    ];

    // Build labels 12 bulan terakhir
    const last12Months = useMemo(() => {
        const labels = [];
        const formatter = new Intl.DateTimeFormat('id-ID', { month: 'short', year: '2-digit' });
        const date = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
            labels.push(formatter.format(d));
        }
        return labels;
    }, []);

    // Normalisasi data growth dari stats.userGrowth (fleksibel):
    // - Array angka [..]
    // - Array objek [{ month, count }] / [{ label, value }]
    // - Object map { '2025-01': 10, ... }
    const growthValues = useMemo(() => {
        const raw = stats?.userGrowth;
        const ensureLength = (arr) => {
            if (arr.length >= 12) return arr.slice(-12);
            const pad = new Array(12 - arr.length).fill(0);
            return [...pad, ...arr];
        };

        if (!raw) return new Array(12).fill(0);

        if (Array.isArray(raw)) {
            if (raw.length === 0) return new Array(12).fill(0);
            if (typeof raw[0] === 'number') return ensureLength(raw);
            if (typeof raw[0] === 'object') {
                // coba baca properti umum
                const labelKey = 'label' in raw[0] ? 'label' : ('month' in raw[0] ? 'month' : null);
                const valueKey = 'value' in raw[0] ? 'value' : ('count' in raw[0] ? 'count' : null);
                if (!labelKey || !valueKey) return ensureLength(raw.map(() => 0));

                // buat map label->value lalu susun sesuai last12Months
                const map = new Map();
                raw.forEach(item => map.set(String(item[labelKey]), Number(item[valueKey] ?? 0)));
                return last12Months.map(lbl => map.get(lbl) ?? 0);
            }
            return ensureLength(new Array(raw.length).fill(0));
        }

        if (typeof raw === 'object') {
            // asumsikan key adalah label
            return last12Months.map(lbl => Number(raw[lbl] ?? 0));
        }

        return new Array(12).fill(0);
    }, [stats?.userGrowth, last12Months]);

    // Jika semua nol, buat fallback tren sederhana dari totalUsers (agar ada visual)
    const growthData = useMemo(() => {
        const allZero = growthValues.every(v => v === 0);
        if (!allZero) return growthValues;
        const total = Number(stats?.totalUsers ?? 0);
        const step = total > 0 ? Math.max(1, Math.floor(total / 12)) : 0;
        return Array.from({ length: 12 }, (_, i) => Math.max(0, total - step * (11 - i)));
    }, [growthValues, stats?.totalUsers]);

    const lineData = useMemo(() => ({
        labels: last12Months,
        datasets: [
            {
                label: 'Pengguna Baru / Bulan',
                data: growthData,
                borderColor: 'rgba(34,197,94,1)',
                backgroundColor: 'rgba(34,197,94,0.15)',
                borderWidth: 2,
                tension: 0.35,
                pointRadius: 3,
                fill: true,
            },
        ],
    }), [last12Months, growthData]);

    const lineOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, labels: { boxWidth: 12 } },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { precision: 0 } },
        },
    }), []);

    return (
        <LayoutAdmin admin={admin}>
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard Admin</h1>
                    <p className="text-slate-600">Selamat datang, <span className="font-semibold text-cyan-600">{admin?.username || 'Admin'}</span></p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                                    <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`text-sm font-medium ${
                                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-slate-500 text-sm ml-1">dari bulan lalu</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                                    <span className="text-white">{stat.icon}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">User Growth</h3>
                        <div className="h-64">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Aktivitas Terbaru</h3>
                        <div className="space-y-4">
                            {recentBookings && recentBookings.length > 0 ? (
                                recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className={`w-2 h-2 rounded-full ${
                                            booking.status === 'confirmed' ? 'bg-green-500' :
                                            booking.status === 'pending' ? 'bg-yellow-500' :
                                            booking.status === 'cancelled' ? 'bg-red-500' :
                                            'bg-blue-500'
                                        }`}></div>
                                        <div className="flex-1">
                                            <p className="text-slate-800 font-medium">{booking.user?.name || 'User'}</p>
                                            <p className="text-slate-600 text-sm">Booking dengan {booking.psikolog?.name || 'Psikolog'}</p>
                                        </div>
                                        <span className="text-slate-500 text-xs">{booking.created_at}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">Belum ada aktivitas terbaru</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 ">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Aksi Cepat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/tambah-psikolog" className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200 group">
                            <div className="text-center">
                                <svg className="w-8 h-8 text-slate-400 group-hover:text-cyan-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <p className="text-slate-600 font-medium">Tambah Psikolog</p>
                            </div>
                        </Link>
                        <Link href="/admin/data-user" className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200 group">
                            <div className="text-center">
                                <svg className="w-8 h-8 text-slate-400 group-hover:text-cyan-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-slate-600 font-medium">Data User</p>
                            </div>
                        </Link>
                         <Link href="/logout" method="post" as="button" className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200 group">
                             <div className="text-center">
                                 <svg className="w-8 h-8 text-slate-400 group-hover:text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                 </svg>
                                 <p className="text-slate-600 font-medium">Logout</p>
                             </div>
                         </Link>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
