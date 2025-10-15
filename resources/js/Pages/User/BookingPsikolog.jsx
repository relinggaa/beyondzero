import React from "react";
import { useForm, Link } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function BookingPsikolog({ bookings }) {
    const { post } = useForm();

    const handleCancelBooking = (bookingId) => {
        if (window.confirm("Apakah Anda yakin ingin membatalkan jadwal konseling ini?")) {
            post(`/booking-psikolog/${bookingId}/cancel`, {
                onSuccess: () => {
                    alert('Jadwal konseling berhasil dibatalkan.');
                },
                onError: (errors) => {
                    console.error('Cancel errors:', errors);
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'confirmed':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'completed':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            default:
                return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
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

    return (
        <LayoutUser>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Link
                            href="/psikolog"
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Kembali ke Psikolog</span>
                        </Link>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        📅 Jadwal Konseling Saya
                    </h1>
                    <p className="text-white/70 text-lg">
                        Kelola jadwal konseling Anda dengan psikolog
                    </p>
                </div>

                {/* Bookings List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings && bookings.length > 0 ? bookings.map((booking) => (
                        <div key={booking.id} className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300">
                            {/* Booking Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={booking.psikolog.image ? `/storage/${booking.psikolog.image}` : 'https://via.placeholder.com/48x48/06b6d4/ffffff?text=IMG'}
                                        alt={booking.psikolog.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30"
                                    />
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{booking.psikolog.name}</h3>
                                        <p className="text-cyan-400 text-sm">{booking.psikolog.experience} pengalaman</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                    {getStatusText(booking.status)}
                                </span>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📅</span>
                                    <div>
                                        <p className="text-white/80 text-sm">Tanggal</p>
                                        <p className="text-white font-medium">{formatDate(booking.appointment_date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">🕐</span>
                                    <div>
                                        <p className="text-white/80 text-sm">Waktu</p>
                                        <p className="text-white font-medium">{formatTime(booking.appointment_time)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{booking.session_type === 'online' ? '🌐' : '🏢'}</span>
                                    <div>
                                        <p className="text-white/80 text-sm">Tipe Sesi</p>
                                        <p className="text-white font-medium">
                                            {booking.session_type === 'online' ? 'Online (Video Call)' : 'Offline (Bertemu Langsung)'}
                                        </p>
                                    </div>
                                </div>
                                {booking.notes && (
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">📝</span>
                                        <div>
                                            <p className="text-white/80 text-sm">Catatan</p>
                                            <p className="text-white/80 text-sm">{booking.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                {booking.status === 'pending' && (
                                    <button
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium border border-red-500/30 hover:border-red-500/50"
                                    >
                                        🚫 Batalkan
                                    </button>
                                )}
                                {booking.status === 'confirmed' && (
                                    <button
                                        className="flex-1 bg-green-500/20 text-green-300 py-2 px-4 rounded-lg text-sm font-medium border border-green-500/30 cursor-not-allowed"
                                    >
                                        ✅ Terkonfirmasi
                                    </button>
                                )}
                                {booking.status === 'cancelled' && (
                                    <button
                                        className="flex-1 bg-slate-500/20 text-slate-300 py-2 px-4 rounded-lg text-sm font-medium border border-slate-500/30 cursor-not-allowed"
                                    >
                                        ❌ Dibatalkan
                                    </button>
                                )}
                                {booking.status === 'completed' && (
                                    <button
                                        className="flex-1 bg-blue-500/20 text-blue-300 py-2 px-4 rounded-lg text-sm font-medium border border-blue-500/30 cursor-not-allowed"
                                    >
                                        ✅ Selesai
                                    </button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Belum ada jadwal konseling</h3>
                            <p className="text-white/60 mb-6">Mulai buat jadwal konseling dengan psikolog pilihan Anda</p>
                            <a
                                href="/psikolog"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Pilih Psikolog
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </LayoutUser>
    );
}
