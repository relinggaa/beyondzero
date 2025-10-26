import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useForm, router } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function Journaling({ journals = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJournal, setEditingJournal] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
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
            <div className="min-h-screen cursor-gaming bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
                        📝 Journaling
                    </h1>
                    <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">
                        Catat perjalanan harian Anda dan refleksikan pengalaman hidup Anda dengan cara yang bermakna
                    </p>
                </div>

                {/* Create Journal Button */}
                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl shadow-cyan-500/20 flex items-center space-x-2"
                    >
                        <span className="text-2xl">✨</span>
                        <span>Buat Jurnal Baru</span>
                    </button>
                </div>

                {/* Search and Filter Section */}
                {journals.length > 0 && (
                    <div className="mb-8 bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari jurnal (gratitude, achievement, reflection, dll)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors"
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
                                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
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
                                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
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
                                <div className="text-white/70 text-sm flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                    <span>
                                        <span className="text-cyan-400 font-bold">{filteredJournals.length}</span> jurnal ditemukan
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setFilterMonth("");
                                        setFilterYear("");
                                    }}
                                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-1"
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

                {/* Journals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJournals.map((journal) => (
                        <div key={journal.id} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group">
                            {/* Journal Header */}
                            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                                        <span className="text-2xl">{journal.mood}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{new Date(journal.date).toLocaleDateString('id-ID')}</h3>
                                        <p className="text-white/60 text-xs">{formatDate(journal.date)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Journal Content */}
                            <div className="space-y-3 mb-4">
                                {journal.gratitude && (
                                    <div className="bg-cyan-400/10 rounded-lg p-3 border border-cyan-400/20">
                                        <h4 className="text-cyan-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">🙏</span> Rasa Syukur
                                        </h4>
                                        <p className="text-white/90 text-sm line-clamp-2">{journal.gratitude}</p>
                                    </div>
                                )}
                                
                                {journal.achievement && (
                                    <div className="bg-green-400/10 rounded-lg p-3 border border-green-400/20">
                                        <h4 className="text-green-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">🏆</span> Pencapaian
                                        </h4>
                                        <p className="text-white/90 text-sm line-clamp-2">{journal.achievement}</p>
                                    </div>
                                )}
                                
                                {journal.challenge && (
                                    <div className="bg-orange-400/10 rounded-lg p-3 border border-orange-400/20">
                                        <h4 className="text-orange-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">⚡</span> Tantangan
                                        </h4>
                                        <p className="text-white/90 text-sm line-clamp-2">{journal.challenge}</p>
                                    </div>
                                )}
                                
                                {journal.reflection && (
                                    <div className="bg-purple-400/10 rounded-lg p-3 border border-purple-400/20">
                                        <h4 className="text-purple-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">💭</span> Refleksi
                                        </h4>
                                        <p className="text-white/90 text-sm line-clamp-2">{journal.reflection}</p>
                                    </div>
                                )}
                                
                                {journal.tomorrow_goal && (
                                    <div className="bg-blue-400/10 rounded-lg p-3 border border-blue-400/20">
                                        <h4 className="text-blue-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">🎯</span> Tujuan Besok
                                        </h4>
                                        <p className="text-white/90 text-sm line-clamp-2">{journal.tomorrow_goal}</p>
                                    </div>
                                )}
                                
                                {journal.affirmation && (
                                    <div className="bg-pink-400/10 rounded-lg p-3 border border-pink-400/20">
                                        <h4 className="text-pink-400 font-bold text-xs mb-1 flex items-center">
                                            <span className="mr-1">✨</span> Afirmasi
                                        </h4>
                                        <p className="text-white/90 text-sm italic line-clamp-2">"{journal.affirmation}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-700/50">
                                <button
                                    onClick={() => handleEdit(journal)}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-2.5 px-3 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 flex items-center justify-center space-x-1"
                                >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(journal.id)}
                                    className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-white py-2.5 px-3 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium border border-slate-600 hover:border-slate-500 flex items-center justify-center space-x-1"
                                >
                                    <span>🗑️</span>
                                    <span>Hapus</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredJournals.length === 0 && journals.length > 0 && (searchQuery || filterMonth || filterYear) && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full mb-6">
                            <div className="text-7xl">🔍</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Jurnal tidak ditemukan</h3>
                        <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
                            Tidak ada jurnal yang sesuai dengan filter Anda. Coba ubah kata kunci atau filter tanggal Anda.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilterMonth("");
                                setFilterYear("");
                            }}
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg shadow-cyan-500/20"
                        >
                            Hapus Filter
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {journals.length === 0 && !searchQuery && !filterMonth && !filterYear && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full mb-6">
                            <div className="text-7xl">📝</div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Belum ada jurnal</h3>
                        <p className="text-white/60 text-lg max-w-md mx-auto mb-8">Mulai menulis jurnal pertama Anda untuk merefleksikan perjalanan hidup Anda</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg shadow-cyan-500/20"
                        >
                            ✨ Mulai Menulis
                        </button>
                    </div>
                )}

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {editingJournal ? '✏️ Edit Jurnal' : '✨ Buat Jurnal Baru'}
                                </h2>
                                <p className="text-white/60 text-sm">Bagikan perjalanan Anda hari ini</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-white/60 hover:text-white hover:bg-slate-700 p-2 rounded-full transition-all duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Date */}
                            <div>
                                <label className="block text-white font-medium mb-2">📅 Tanggal</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            {/* Mood */}
                            <div>
                                <label className="block text-white font-medium mb-2">😊 Mood</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {moods.map((mood) => (
                                        <button
                                            key={mood.emoji}
                                            type="button"
                                            onClick={() => handleMoodSelect(mood)}
                                            className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                                data.mood === mood.emoji
                                                    ? 'border-cyan-400 bg-cyan-400/20 scale-105 shadow-lg shadow-cyan-500/20'
                                                    : 'border-slate-600 hover:border-cyan-400/50 hover:scale-105'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{mood.emoji}</div>
                                            <div className="text-white/70 text-xs font-medium">{mood.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gratitude */}
                            <div>
                                <label className="block text-white font-medium mb-2">🙏 Rasa Syukur</label>
                                <textarea
                                    name="gratitude"
                                    value={data.gratitude}
                                    onChange={handleInputChange}
                                    placeholder="Apa yang Anda syukuri hari ini?"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Achievement */}
                            <div>
                                <label className="block text-white font-medium mb-2">🏆 Pencapaian</label>
                                <textarea
                                    name="achievement"
                                    value={data.achievement}
                                    onChange={handleInputChange}
                                    placeholder="Apa yang Anda capai hari ini?"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Challenge */}
                            <div>
                                <label className="block text-white font-medium mb-2">⚡ Tantangan</label>
                                <textarea
                                    name="challenge"
                                    value={data.challenge}
                                    onChange={handleInputChange}
                                    placeholder="Tantangan terbesar hari ini adalah..."
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Reflection */}
                            <div>
                                <label className="block text-white font-medium mb-2">💭 Refleksi</label>
                                <textarea
                                    name="reflection"
                                    value={data.reflection}
                                    onChange={handleInputChange}
                                    placeholder="Apa yang Anda pelajari hari ini?"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Tomorrow Goal */}
                            <div>
                                <label className="block text-white font-medium mb-2">🎯 Tujuan untuk Besok</label>
                                <textarea
                                    name="tomorrow_goal"
                                    value={data.tomorrow_goal}
                                    onChange={handleInputChange}
                                    placeholder="Apa tujuan Anda untuk besok?"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Affirmation */}
                            <div>
                                <label className="block text-white font-medium mb-2">✨ Afirmasi Pribadi</label>
                                <textarea
                                    name="affirmation"
                                    value={data.affirmation}
                                    onChange={handleInputChange}
                                    placeholder="Tuliskan afirmasi positif Anda"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-white py-3 px-6 rounded-xl transition-all duration-200 font-medium border border-slate-600"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                >
                                    {processing ? 'Menyimpan...' : (editingJournal ? '✓ Update Jurnal' : '✓ Simpan Jurnal')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
            </div>
        </LayoutUser>
    );
}
