import React from "react";
import { Link } from "@inertiajs/react";
import LayoutAdmin from "../../Components/Layout/LayoutAdmin";

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
                    {/* Chart Placeholder */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">User Growth</h3>
                        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-slate-500">Chart akan ditampilkan di sini</p>
                            </div>
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
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
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
                        <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200 group">
                            <div className="text-center">
                                <svg className="w-8 h-8 text-slate-400 group-hover:text-cyan-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-slate-600 font-medium">Pengaturan</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
