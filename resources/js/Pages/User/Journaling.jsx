import React, { useState } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function Journaling() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJournal, setEditingJournal] = useState(null);
    const [journals, setJournals] = useState([
        {
            id: 1,
            date: "15/10/2025",
            mood: "😊",
            gratitude: "Bersyukur bisa menyelesaikan proyek tepat waktu",
            achievement: "Menyelesaikan laporan bulanan",
            challenge: "Menghadapi deadline yang ketat",
            reflection: "Belajar bahwa komunikasi yang baik sangat penting",
            tomorrowGoal: "Menyiapkan presentasi untuk meeting besok",
            affirmation: "Saya mampu menghadapi tantangan dengan tenang"
        },
        {
            id: 2,
            date: "14/10/2025",
            mood: "😌",
            gratitude: "Bersyukur atas dukungan keluarga",
            achievement: "Berhasil meditasi 10 menit",
            challenge: "Mengatasi kecemasan sebelum presentasi",
            reflection: "Meditasi membantu menenangkan pikiran",
            tomorrowGoal: "Mempersiapkan materi presentasi",
            affirmation: "Saya percaya pada kemampuan diri sendiri"
        }
    ]);
    const [formData, setFormData] = useState({
        date: "",
        mood: "",
        gratitude: "",
        achievement: "",
        challenge: "",
        reflection: "",
        tomorrowGoal: "",
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMoodSelect = (mood) => {
        setFormData(prev => ({
            ...prev,
            mood: mood.emoji
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingJournal) {
            // Edit existing journal
            setJournals(prev => prev.map(journal => 
                journal.id === editingJournal.id 
                    ? { ...journal, ...formData }
                    : journal
            ));
        } else {
            // Create new journal
            const newJournal = {
                id: Date.now(),
                ...formData
            };
            setJournals(prev => [newJournal, ...prev]);
        }
        handleCloseModal();
    };

    const handleEdit = (journal) => {
        setEditingJournal(journal);
        setFormData(journal);
        setIsModalOpen(true);
    };

    const handleDelete = (journalId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) {
            setJournals(prev => prev.filter(journal => journal.id !== journalId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJournal(null);
        setFormData({
            date: "",
            mood: "",
            gratitude: "",
            achievement: "",
            challenge: "",
            reflection: "",
            tomorrowGoal: "",
            affirmation: ""
        });
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <LayoutUser>
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        📝 Journaling
                    </h1>
                    <p className="text-white/70 text-lg">
                        Catat perjalanan harian Anda dan refleksikan pengalaman hidup
                    </p>
                </div>

                {/* Create Journal Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        ✨ Buat Jurnal
                    </button>
                </div>

                {/* Journals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {journals.map((journal) => (
                        <div key={journal.id} className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                            {/* Journal Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{journal.mood}</span>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{journal.date}</h3>
                                        <p className="text-white/60 text-sm">{formatDate(journal.date)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Journal Content */}
                            <div className="space-y-4">
                                {journal.gratitude && (
                                    <div>
                                        <h4 className="text-cyan-400 font-medium text-sm mb-1">🙏 Rasa Syukur</h4>
                                        <p className="text-white/80 text-sm">{journal.gratitude}</p>
                                    </div>
                                )}
                                
                                {journal.achievement && (
                                    <div>
                                        <h4 className="text-green-400 font-medium text-sm mb-1">🏆 Pencapaian</h4>
                                        <p className="text-white/80 text-sm">{journal.achievement}</p>
                                    </div>
                                )}
                                
                                {journal.challenge && (
                                    <div>
                                        <h4 className="text-orange-400 font-medium text-sm mb-1">⚡ Tantangan</h4>
                                        <p className="text-white/80 text-sm">{journal.challenge}</p>
                                    </div>
                                )}
                                
                                {journal.reflection && (
                                    <div>
                                        <h4 className="text-purple-400 font-medium text-sm mb-1">💭 Refleksi</h4>
                                        <p className="text-white/80 text-sm">{journal.reflection}</p>
                                    </div>
                                )}
                                
                                {journal.tomorrowGoal && (
                                    <div>
                                        <h4 className="text-blue-400 font-medium text-sm mb-1">🎯 Tujuan Besok</h4>
                                        <p className="text-white/80 text-sm">{journal.tomorrowGoal}</p>
                                    </div>
                                )}
                                
                                {journal.affirmation && (
                                    <div>
                                        <h4 className="text-pink-400 font-medium text-sm mb-1">✨ Afirmasi</h4>
                                        <p className="text-white/80 text-sm italic">"{journal.affirmation}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={() => handleEdit(journal)}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm font-medium"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(journal.id)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm font-medium border border-slate-600 hover:border-slate-500"
                                >
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {journals.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Belum ada jurnal</h3>
                        <p className="text-white/60">Mulai menulis jurnal pertama Anda untuk merefleksikan hari-hari Anda</p>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-600">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {editingJournal ? 'Edit Jurnal' : 'Buat Jurnal Baru'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-white/60 hover:text-white transition-colors"
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
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Tanggal Jurnal (DD/MM/YYYY)"
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors"
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
                                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                                formData.mood === mood.emoji
                                                    ? 'border-cyan-400 bg-cyan-400/20'
                                                    : 'border-slate-600 hover:border-cyan-400/50'
                                            }`}
                                        >
                                            <div className="text-2xl mb-1">{mood.emoji}</div>
                                            <div className="text-white/70 text-xs">{mood.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gratitude */}
                            <div>
                                <label className="block text-white font-medium mb-2">🙏 Rasa Syukur</label>
                                <textarea
                                    name="gratitude"
                                    value={formData.gratitude}
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
                                    value={formData.achievement}
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
                                    value={formData.challenge}
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
                                    value={formData.reflection}
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
                                    name="tomorrowGoal"
                                    value={formData.tomorrowGoal}
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
                                    value={formData.affirmation}
                                    onChange={handleInputChange}
                                    placeholder="Tuliskan afirmasi positif Anda"
                                    rows={3}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                                >
                                    {editingJournal ? 'Update Jurnal' : 'Simpan Jurnal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </LayoutUser>
    );
}
