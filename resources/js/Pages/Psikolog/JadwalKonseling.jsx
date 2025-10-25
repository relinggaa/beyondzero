import React, { useState, useEffect } from "react";
import { useForm, Link, router } from "@inertiajs/react";
import LayoutPsikolog from "../../Components/Layout/LayoutPsikolog";

export default function JadwalKonseling({ psikolog, bookings }) {
    const [activePage, setActivePage] = useState("konseling");
    
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
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { post, processing } = useForm();

    // Simplified status change handler
    const handleStatusChange = (bookingId, newStatus) => {
        if (!bookingId || !newStatus) {
      
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
                // Close modal and refresh
                setIsModalOpen(false);
                setSelectedBooking(null);
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

    // Simplified modal opener
    const openModal = (booking) => {
        console.log('=== OPENING MODAL ===');
        console.log('Booking data:', booking);
        
        if (!booking?.id) {
            console.error('Error: Data booking tidak valid');
            return;
        }
        
        console.log('Setting selected booking and opening modal...');
        setSelectedBooking(booking);
        setIsModalOpen(true);
        console.log('Modal should be open now');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    // Handler khusus untuk konfirmasi
    const handleConfirm = () => {
   
        
        if (!selectedBooking?.id) {
            console.error('Error: Booking ID tidak ditemukan');
            return;
        }
        
        console.log('Calling handleStatusChange with:', selectedBooking.id, 'confirmed');
        handleStatusChange(selectedBooking.id, 'confirmed');
    };

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

    return (
        <LayoutPsikolog activePage={activePage} setActivePage={setActivePage}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Jadwal Konseling
                    </h1>
                    <p className="text-slate-600">
                        Kelola semua jadwal konseling Anda
                    </p>
                </div>

                {/* Bookings List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {console.log('Bookings render check:', { 
                        bookings: !!bookings, 
                        bookingsLength: bookings?.length,
                        bookingsData: bookings 
                    })}
                    {bookings && bookings.length > 0 ? bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            {/* Booking Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {booking.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-slate-800 font-semibold text-lg">{booking.user.name}</h3>
                                        <p className="text-cyan-500 text-sm">Klien</p>
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
                                        <p className="text-slate-600 text-sm">Tanggal</p>
                                        <p className="text-slate-800 font-medium">{formatDate(booking.appointment_date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">🕐</span>
                                    <div>
                                        <p className="text-slate-600 text-sm">Waktu</p>
                                        <p className="text-slate-800 font-medium">{formatTime(booking.appointment_time)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{booking.session_type === 'online' ? '🌐' : '🏢'}</span>
                                    <div>
                                        <p className="text-slate-600 text-sm">Tipe Sesi</p>
                                        <p className="text-slate-800 font-medium">
                                            {booking.session_type === 'online' ? 'Online (Video Call)' : 'Offline (Bertemu Langsung)'}
                                        </p>
                                    </div>
                                </div>
                                {booking.notes && (
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">📝</span>
                                        <div>
                                            <p className="text-slate-600 text-sm">Catatan Klien</p>
                                            <p className="text-slate-800 text-sm">{booking.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('=== KELOLA BUTTON CLICKED ===');
                                        console.log('Booking data:', booking);
                                        console.log('Booking ID:', booking?.id);
                                        openModal(booking);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
                                >
                                    Kelola
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Belum ada jadwal konseling</h3>
                            <p className="text-slate-600">Jadwal konseling akan muncul di sini</p>
                        </div>
                    )}
                </div>

              

                {/* Status Change Modal */}
                {isModalOpen && selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Kelola Jadwal Konseling
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-2">{selectedBooking.user.name}</h3>
                                <p className="text-slate-600 text-sm">
                                    {formatDate(selectedBooking.appointment_date)} • {formatTime(selectedBooking.appointment_time)}
                                </p>
                                <p className="text-slate-500 text-xs">
                                    {selectedBooking.session_type === 'online' ? '🌐 Online' : '🏢 Offline'}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {console.log('Modal content - selectedBooking status:', selectedBooking?.status)}
                                {selectedBooking.status === 'pending' && (
                                    <>
                                        {console.log('Rendering konfirmasi button')}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                          
                                                handleConfirm();
                                            }}
                                            disabled={processing}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            {processing ? '⏳ Memproses...' : '✅ Konfirmasi Jadwal'}
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                                            disabled={processing}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            ❌ Batalkan Jadwal
                                        </button>
                                    </>
                                )}
                                
                                {selectedBooking.status === 'confirmed' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                                        disabled={processing}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        ✅ Tandai Selesai
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutPsikolog>
    );
}