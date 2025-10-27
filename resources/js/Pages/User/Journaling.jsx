import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useForm, router } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import BookCoverGallery from "../../Components/BookCoverGallery";
import JournalBookModal from "../../Components/JournalBookModal";
import backgroundChat3 from "../../../img/background_chat3.jpg";

export default function Journaling({ journals = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJournal, setEditingJournal] = useState(null);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        title: "",
        date: "",
        mood: "",
        gratitude: "",
        achievement: "",
        challenge: "",
        reflection: "",
        tomorrow_goal: "",
        affirmation: ""
    });

    const moods = [
        { emoji: "😊", label: "Bahagia" },
        { emoji: "😌", label: "Tenang" },
        { emoji: "😰", label: "Cemas" },
        { emoji: "😢", label: "Sedih" },
        { emoji: "😠", label: "Marah" },
        { emoji: "😴", label: "Lelah" },
        { emoji: "🤔", label: "Bingung" },
        { emoji: "😍", label: "Semangat" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleMoodSelect = (mood) => {
        setData('mood', mood.emoji);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingJournal) {
            // Edit existing journal
            put(`/journaling/${editingJournal.id}`, {
                onSuccess: () => {
                    toast.success('Jurnal berhasil diperbarui!');
                    handleCloseModal();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                }
            });
        } else {
            // Create new journal
            post('/journaling', {
                onSuccess: () => {
                    toast.success('Jurnal berhasil dibuat!');
                    handleCloseModal();
                },
                onError: (errors) => {
                    console.error('Create errors:', errors);
                }
            });
        }
    };

    const handleEdit = (journal) => {
        setEditingJournal(journal);
        setData({
            title: journal.title || '',
            date: journal.date,
            mood: journal.mood,
            gratitude: journal.gratitude || '',
            achievement: journal.achievement || '',
            challenge: journal.challenge || '',
            reflection: journal.reflection || '',
            tomorrow_goal: journal.tomorrow_goal || '',
            affirmation: journal.affirmation || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (journalId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) {
            destroy(`/journaling/${journalId}`, {
                onSuccess: () => {
                    toast.success('Jurnal berhasil dihapus!');
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                }
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJournal(null);
        setData({
            title: "",
            date: "",
            mood: "",
            gratitude: "",
            achievement: "",
            challenge: "",
            reflection: "",
            tomorrow_goal: "",
            affirmation: ""
        });
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

    // Filter journals based on search and date filters
    const filteredJournals = useMemo(() => {
        return journals.filter((journal) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const searchFields = [
                    journal.gratitude,
                    journal.achievement,
                    journal.challenge,
                    journal.reflection,
                    journal.tomorrow_goal,
                    journal.affirmation
                ].join(' ').toLowerCase();
                
                if (!searchFields.includes(query)) {
                    return false;
                }
            }

            // Month and Year filter
            if (filterMonth || filterYear) {
                const journalDate = new Date(journal.date);
                const journalMonth = String(journalDate.getMonth() + 1).padStart(2, '0');
                const journalYear = String(journalDate.getFullYear());

                if (filterMonth && journalMonth !== filterMonth) {
                    return false;
                }
                if (filterYear && journalYear !== filterYear) {
                    return false;
                }
            }

            return true;
        });
    }, [journals, searchQuery, filterMonth, filterYear]);

    // Get unique years and months from journals
    const availableMonths = useMemo(() => {
        const months = new Set();
        journals.forEach(journal => {
            const date = new Date(journal.date);
            months.add(String(date.getMonth() + 1).padStart(2, '0'));
        });
        return Array.from(months).sort();
    }, [journals]);

    const availableYears = useMemo(() => {
        const years = new Set();
        journals.forEach(journal => {
            const date = new Date(journal.date);
            years.add(String(date.getFullYear()));
        });
        return Array.from(years).sort((a, b) => b - a);
    }, [journals]);

    return (
        <LayoutUser>
            <div 
                className="min-h-screen cursor-gaming pt-20 pb-12 relative"
                style={{
                    backgroundImage: `url(${backgroundChat3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark Overlay untuk mengurangi brightness background */}
                {/*<div className="absolute inset-0 bg-black/50"></div>*/}
                
                {/* Main Container dengan background hitam opacity 90% */}
                <div className="w-full px-4 lg:px-8 py-8 relative z-10">
                    <div className="bg-black/90 rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl max-w-full">
                {/* Header - Combined Container */}
                <div className="mb-10">
                    <div className="bg-black rounded-3xl p-6 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center gap-4">
                        {/* Title */}
                        <div className="flex items-center space-x-3">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                                <div className="w-8 h-8 bg-black rounded-full"></div>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">
                                Journaling
                            </h1>
                        </div>
                        
                        {/* Divider */}
                        <div className="hidden lg:block w-px h-12 bg-white/20"></div>
                        
                        {/* Description */}
                        <p className="flex-1 text-white/90 text-base lg:text-lg text-center lg:text-left max-w-md">
                            Catat perjalanan harian Anda dan refleksikan pengalaman hidup Anda dengan cara yang bermakna
                        </p>
                        
                        {/* Create Journal Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap"
                        >
                            Buat Jurnal Baru
                        </button>
                    </div>
                </div>

                {/* Search and Filter Section */}
                {journals.length > 0 && (
                    <div className="mb-8 bg-black rounded-2xl p-6 border border-white/20 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari jurnal (gratitude, achievement, reflection, dll)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-colors"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        >
                                            <svg className="w-5 h-5 text-white/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Month Filter */}
                            <div className="md:w-40">
                                <select
                                    value={filterMonth}
                                    onChange={(e) => setFilterMonth(e.target.value)}
                                    className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                                >
                                    <option value="">Semua Bulan</option>
                                    {availableMonths.map((month) => (
                                        <option key={month} value={month}>
                                            {new Date(2024, parseInt(month) - 1).toLocaleDateString('id-ID', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div className="md:w-32">
                                <select
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                    className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                                >
                                    <option value="">Semua Tahun</option>
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* Result Count */}
                        {(searchQuery || filterMonth || filterYear) && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-white text-sm flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    <span>
                                        <span className="text-white font-bold">{filteredJournals.length}</span> jurnal ditemukan
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setFilterMonth("");
                                        setFilterYear("");
                                    }}
                                    className="text-white hover:text-white/80 text-sm font-medium flex items-center space-x-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Reset</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Book Cover Gallery */}
                {filteredJournals.length > 0 && (
                    <div className="min-h-[600px]">
                        <BookCoverGallery 
                            journals={filteredJournals} 
                            onJournalClick={setSelectedJournal}
                        />
                    </div>
                )}

                {/* Empty State */}
                {filteredJournals.length === 0 && journals.length > 0 && (searchQuery || filterMonth || filterYear) && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-black rounded-full mb-6 border border-white/20 shadow-2xl">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                                <div className="w-10 h-10 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Jurnal tidak ditemukan</h3>
                        <p className="text-white text-lg max-w-md mx-auto mb-8 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                            Tidak ada jurnal yang sesuai dengan filter Anda. Coba ubah kata kunci atau filter tanggal Anda.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilterMonth("");
                                setFilterYear("");
                            }}
                            className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg"
                        >
                            Hapus Filter
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {journals.length === 0 && !searchQuery && !filterMonth && !filterYear && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-black rounded-full mb-6 border border-white/20 shadow-2xl">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                                <div className="w-10 h-10 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Belum ada jurnal</h3>
                        <p className="text-white text-lg max-w-md mx-auto mb-8 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">Mulai menulis jurnal pertama Anda untuk merefleksikan perjalanan hidup Anda</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg"
                        >
                            Mulai Menulis
                        </button>
                    </div>
                )}

            {/* Journal Book Modal */}
            {selectedJournal && (
                <JournalBookModal
                    journal={selectedJournal}
                    onClose={() => setSelectedJournal(null)}
                    onEdit={(journal) => {
                        setSelectedJournal(null);
                        handleEdit(journal);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {/* Modal Form - Book Style */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
                    {/* Book Container */}
                    <div className="relative w-full max-w-5xl">
                        {/* Book Shadow */}
                        <div className="absolute -inset-4 bg-black/40 rounded-3xl blur-2xl"></div>
                        
                        {/* Book */}
                        <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-600" style={{
                            transform: 'perspective(1000px) rotateY(-2deg)',
                            transformStyle: 'preserve-3d'
                        }}>
                            {/* Book Pages */}
                            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 min-h-[80vh] max-h-[90vh] overflow-y-auto">
                                {/* Book Binding Indicator */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-slate-600 via-slate-700 to-transparent"></div>
                                
                                {/* Page Content */}
                                <div className="relative p-8 lg:p-12">
                                    {/* Close Button */}
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-4 right-4 text-slate-200 hover:text-white hover:bg-slate-700 p-2 rounded-full transition-all duration-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Book Header */}
                                    <div className="mb-8 text-center border-b-2 border-slate-600 pb-6">
                                        <h2 className="text-4xl font-serif text-white mb-2">
                                            {editingJournal ? 'Edit Jurnal' : 'My Journal'}
                                        </h2>
                                        <p className="text-slate-300 italic text-sm">Bagikan perjalanan Anda hari ini</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Title */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-2 text-sm uppercase tracking-wide">Nama Jurnal</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                onChange={handleInputChange}
                                                placeholder="Tuliskan judul jurnal Anda..."
                                                className="w-full bg-transparent border-b-2 border-slate-500 focus:border-blue-400 px-1 py-2 text-white placeholder-slate-400 focus:outline-none font-serif text-lg transition-colors"
                                                required
                                            />
                                        </div>

                                        {/* Date & Mood Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Date */}
                                            <div>
                                                <label className="block text-slate-300 font-serif font-bold mb-2 text-sm uppercase tracking-wide">Tanggal</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={data.date}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b-2 border-slate-500 focus:border-blue-400 px-1 py-2 text-white focus:outline-none font-serif text-base transition-colors"
                                                    required
                                                />
                                            </div>

                                            {/* Mood */}
                                            <div>
                                                <label className="block text-slate-300 font-serif font-bold mb-2 text-sm uppercase tracking-wide">Mood</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {moods.map((mood) => (
                                                        <button
                                                            key={mood.emoji}
                                                            type="button"
                                                            onClick={() => handleMoodSelect(mood)}
                                                            className={`p-2 rounded border-2 transition-all duration-200 ${
                                                                data.mood === mood.emoji
                                                                    ? 'border-blue-400 bg-slate-700 scale-110 shadow-md'
                                                                    : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700 bg-transparent'
                                                            }`}
                                                        >
                                                            <div className="text-xl">{mood.emoji}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-slate-600 my-8"></div>

                                        {/* Gratitude */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Rasa Syukur</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="gratitude"
                                                    value={data.gratitude}
                                                    onChange={handleInputChange}
                                                    placeholder="Apa yang Anda syukuri hari ini?"
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/* Achievement */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Pencapaian</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="achievement"
                                                    value={data.achievement}
                                                    onChange={handleInputChange}
                                                    placeholder="Apa yang Anda capai hari ini?"
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/* Challenge */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Tantangan</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="challenge"
                                                    value={data.challenge}
                                                    onChange={handleInputChange}
                                                    placeholder="Tantangan terbesar hari ini adalah..."
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/* Reflection */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Refleksi</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="reflection"
                                                    value={data.reflection}
                                                    onChange={handleInputChange}
                                                    placeholder="Apa yang Anda pelajari hari ini?"
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/* Tomorrow Goal */}
                                        <div className="mb-6">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Tujuan untuk Besok</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="tomorrow_goal"
                                                    value={data.tomorrow_goal}
                                                    onChange={handleInputChange}
                                                    placeholder="Apa tujuan Anda untuk besok?"
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/* Affirmation */}
                                        <div className="mb-8">
                                            <label className="block text-slate-300 font-serif font-bold mb-3 text-sm uppercase tracking-wide">Afirmasi Pribadi</label>
                                            <div className="relative bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
                                                <textarea
                                                    name="affirmation"
                                                    value={data.affirmation}
                                                    onChange={handleInputChange}
                                                    placeholder="Tuliskan afirmasi positif Anda..."
                                                    rows={4}
                                                    className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-400 font-serif resize-none leading-6 italic"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Buttons */}
                                        <div className="flex space-x-4 pt-6 border-t-2 border-slate-600">
                                            <button
                                                type="button"
                                                onClick={handleCloseModal}
                                                className="flex-1 bg-transparent hover:bg-slate-700 border-2 border-slate-600 hover:border-slate-400 text-slate-300 py-3 px-6 rounded-lg transition-all duration-200 font-serif font-semibold shadow-sm hover:shadow-md"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-serif font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                            >
                                                {processing ? 'Menyimpan...' : (editingJournal ? 'Perbarui Jurnal' : 'Simpan Jurnal')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
