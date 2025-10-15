import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import LayoutPsikolog from "../../Components/Layout/LayoutPsikolog";

export default function DashboardPsikolog({ psikolog, bookings }) {
    const [activePage, setActivePage] = useState("dashboard");
    
    // Set active page based on current URL
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/psikolog/jadwal')) {
            setActivePage("konseling");
        } else if (currentPath.includes('/psikolog/dashboard')) {
            setActivePage("dashboard");
        } else if (currentPath.includes('/psikolog/profil')) {
            setActivePage("profile");
        }
    }, []);

    // Statistics
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
    const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed').length;
    const completedBookings = bookings.filter(booking => booking.status === 'completed').length;

    // Recent bookings (last 5)
    const recentBookings = bookings.slice(0, 5);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Menunggu Konfirmasi';
            case 'confirmed':
                return 'Dikonfirmasi';
            case 'cancelled':
                return 'Dibatalkan';
            case 'completed':
                return 'Selesai';
            default:
                return status;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (timeString) => {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    // Handle status change
    const handleStatusChange = (bookingId, newStatus) => {
        if (!bookingId || !newStatus) {
            console.error('Error: Data tidak lengkap');
            return;
        }

        console.log('Sending status change request:', { bookingId, newStatus });
        
        router.post(`/psikolog/booking/${bookingId}/status`, {
            status: newStatus
        }, {
            onStart: () => {
                console.log('Request started...');
            },
            onSuccess: (page) => {
                console.log('Status update successful!');
                console.log('Response page:', page);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Update status error:', errors);
                console.error('Gagal mengupdate status. Silakan coba lagi. Error:', errors);
            },
            onFinish: () => {
                console.log('Request finished');
            }
        });
    };

    return (
        <LayoutPsikolog activePage={activePage} setActivePage={setActivePage}>
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Selamat datang, {psikolog.name}!
                    </h1>
                    <p className="text-slate-600">
                        Kelola jadwal konseling dan profil Anda di dashboard ini
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Total Konseling</p>
                                <p className="text-2xl font-bold text-slate-800">{totalBookings}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Menunggu Konfirmasi</p>
                                <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Dikonfirmasi</p>
                                <p className="text-2xl font-bold text-green-600">{confirmedBookings}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">Selesai</p>
                                <p className="text-2xl font-bold text-blue-600">{completedBookings}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800">Jadwal Konseling Terbaru</h2>
                        <p className="text-slate-600 text-sm">5 jadwal konseling terbaru</p>
                    </div>
                    
                    <div className="p-6">
                        {recentBookings.length > 0 ? (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    {booking.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800">{booking.user.name}</h3>
                                                <p className="text-slate-600 text-sm">
                                                    {formatDate(booking.appointment_date)} • {formatTime(booking.appointment_time)}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {booking.session_type === 'online' ? '🌐 Online' : '🏢 Offline'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                                {getStatusText(booking.status)}
                                            </span>
                                            {booking.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg text-sm font-medium hover:from-cyan-500 hover:to-teal-600 transition-all duration-200"
                                                >
                                                    Konfirmasi
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Belum ada jadwal konseling</h3>
                                <p className="text-slate-600">Jadwal konseling akan muncul di sini</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutPsikolog>
    );
}
