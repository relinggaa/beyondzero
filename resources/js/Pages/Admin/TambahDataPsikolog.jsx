import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import LayoutAdmin from "../../Components/Layout/LayoutAdmin";

export default function TambahDataPsikolog({ psikologs, admin }) {
    const [expertiseInput, setExpertiseInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPsikolog, setEditingPsikolog] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter psikologs based on search term
    const filteredPsikologs = psikologs?.filter(psikolog => {
        const matchesName = psikolog.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUsername = psikolog.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExpertise = psikolog.expertise.some(skill => 
            skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesDescription = psikolog.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesName || matchesUsername || matchesExpertise || matchesDescription;
    }) || [];

    const { data, setData, post, processing, errors, transform } = useForm({
        name: "",
        username: "",
        key: "",
        image: null,
        expertise: [],
        description: "",
        education: "",
        experience: "",
        approach: "",
        philosophy: ""
    });

    // Transform data before sending - exclude image if it's a string (existing image)
    transform((data) => {
        if (editingPsikolog && typeof data.image === 'string') {
            const { image, ...rest } = data;
            return rest;
        }
        return data;
    });


    const handleAddExpertise = () => {
        if (expertiseInput.trim() && !data.expertise.includes(expertiseInput.trim())) {
            setData('expertise', [...data.expertise, expertiseInput.trim()]);
            setExpertiseInput("");
        }
    };

    const handleRemoveExpertise = (index) => {
        setData('expertise', data.expertise.filter((_, i) => i !== index));
    };

    const generateRandomKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setData('key', result);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingPsikolog) {
            console.log('Updating psikolog:', editingPsikolog.id, data);
            post(`/admin/psikolog/${editingPsikolog.id}`, {
                onSuccess: () => {
                    console.log('Update successful');
                    toast.success('Data psikolog berhasil diperbarui!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    handleCloseModal();
                },
                onError: (errors) => {
                    console.log('Update errors:', errors);
                    toast.error('Gagal memperbarui data psikolog!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            });
        } else {
            console.log('Creating new psikolog:', data);
            post('/admin/psikolog', {
                onSuccess: () => {
                    console.log('Create successful');
                    toast.success('Data psikolog berhasil ditambahkan!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    handleCloseModal();
                },
                onError: (errors) => {
                    console.log('Create errors:', errors);
                    toast.error('Gagal menambahkan data psikolog!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPsikolog(null);
        setExpertiseInput("");
        setData({
            name: "",
            username: "",
            key: "",
            image: null,
            expertise: [],
            description: "",
            education: "",
            experience: "",
            approach: "",
            philosophy: ""
        });
    };

    const handleEdit = (psikolog) => {
        setEditingPsikolog(psikolog);
        setData({
            name: psikolog.name,
            username: psikolog.username || "",
            key: psikolog.key || "",
            image: psikolog.image,
            expertise: psikolog.expertise,
            description: psikolog.description,
            education: psikolog.education,
            experience: psikolog.experience,
            approach: psikolog.approach,
            philosophy: psikolog.philosophy
        });
        setIsModalOpen(true);
    };

    const handleDelete = (psikologId) => {
        if (confirm('Apakah Anda yakin ingin menghapus data psikolog ini?')) {
            post(`/admin/psikolog/${psikologId}/delete`, {
                onSuccess: () => {
                    toast.success('Data psikolog berhasil dihapus!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
                onError: (errors) => {
                    console.log('Delete errors:', errors);
                    toast.error('Gagal menghapus data psikolog!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            });
        }
    };

    return (
        <LayoutAdmin admin={admin}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                        👨‍⚕️ Data Psikolog
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Kelola data psikolog dan tambahkan psikolog baru ke sistem
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Cari psikolog berdasarkan nama, username, keahlian, atau deskripsi..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Tambah Psikolog</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Psychologists List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredPsikologs && filteredPsikologs.length > 0 ? filteredPsikologs.map((psikolog) => (
                        <div key={psikolog.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-cyan-400/50 transition-all duration-300 shadow-sm">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
                                    <img
                                        src={psikolog.image ? `/storage/${psikolog.image}` : 'https://via.placeholder.com/64x64/06b6d4/ffffff?text=IMG'}
                                        alt={psikolog.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-slate-800 font-semibold text-lg">{psikolog.name}</h3>
                                    <p className="text-cyan-500 text-sm">{psikolog.experience} pengalaman</p>
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{psikolog.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {psikolog.expertise.slice(0, 2).map((expertise, index) => (
                                    <span key={index} className="px-2 py-1 bg-cyan-100 text-cyan-600 text-xs rounded-full">
                                        {expertise}
                                    </span>
                                ))}
                                {psikolog.expertise.length > 2 && (
                                    <span className="px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded-full">
                                        +{psikolog.expertise.length - 2} lainnya
                                    </span>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handleEdit(psikolog)}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(psikolog.id)}
                                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-slate-300"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-slate-500 text-lg py-10">
                            {searchTerm ? (
                                <div>
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Tidak ada hasil ditemukan</h3>
                                    <p className="text-slate-500 mb-4">Tidak ada psikolog yang cocok dengan pencarian "{searchTerm}"</p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="text-cyan-600 hover:text-cyan-700 font-medium"
                                    >
                                        Hapus filter pencarian
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-6xl mb-4">👨‍⚕️</div>
                                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Belum ada data psikolog</h3>
                                    <p className="text-slate-500 mb-4">Mulai tambahkan psikolog pertama ke sistem</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                                    >
                                        Tambah Psikolog Pertama
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {editingPsikolog ? "Edit Data Psikolog" : "Tambah Data Psikolog"}
                                    </h2>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Basic Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Informasi Dasar</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Nama Lengkap *
                                            </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="Dr. Sarah Wijaya, M.Psi., Psikolog"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Username *
                                            </label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={data.username}
                                                        onChange={(e) => setData('username', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="dr_sarah_wijaya"
                                                    />
                                                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Access Key *
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    name="key"
                                                    value={data.key}
                                                    onChange={(e) => setData('key', e.target.value)}
                                                    required
                                                    className="flex-1 px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                    placeholder="ABC123"
                                                    maxLength="6"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={generateRandomKey}
                                                    className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg hover:from-cyan-500 hover:to-teal-600 transition-all duration-200 font-medium"
                                                >
                                                    Generate
                                                </button>
                                            </div>
                                            {errors.key && <p className="text-red-500 text-sm mt-1">{errors.key}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Foto Profil *
                                            </label>
                                            <div className="space-y-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                    required={!editingPsikolog}
                                                    className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                                                />
                                                {data.image && (
                                                    <div className="mt-3">
                                                        <p className="text-sm text-slate-600 mb-2">Preview:</p>
                                                        <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-300">
                                                            <img
                                                                src={typeof data.image === 'string' ? `/storage/${data.image}` : URL.createObjectURL(data.image)}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            {typeof data.image === 'string' ? 'Current image' : data.image.name}
                                                        </p>
                                                    </div>
                                                )}
                                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expertise */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Bidang Keahlian</h3>
                                    <div className="space-y-4">
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={expertiseInput}
                                                onChange={(e) => setExpertiseInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                                                className="flex-1 px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                placeholder="Masukkan bidang keahlian (contoh: Anxiety Disorders)"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddExpertise}
                                                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg hover:from-cyan-500 hover:to-teal-600 transition-all duration-200"
                                            >
                                                Tambah
                                            </button>
                                        </div>
                                        {data.expertise.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {data.expertise.map((expertise, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-100 text-cyan-600"
                                                    >
                                                        {expertise}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveExpertise(index)}
                                                            className="ml-2 text-cyan-600 hover:text-cyan-800"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
                                    </div>
                                </div>

                                {/* Professional Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Informasi Profesional</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Deskripsi Profesional *
                                            </label>
                                                    <textarea
                                                        name="description"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        required
                                                        rows={4}
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="Dr. Sarah adalah psikolog klinis dengan pengalaman 10 tahun dalam menangani gangguan kecemasan dan depresi..."
                                                    />
                                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Pendidikan *
                                            </label>
                                                    <input
                                                        type="text"
                                                        name="education"
                                                        value={data.education}
                                                        onChange={(e) => setData('education', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="S.Psi. Universitas Indonesia, M.Psi. Universitas Gadjah Mada, Psikolog Klinis"
                                                    />
                                                    {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Pengalaman *
                                            </label>
                                                    <input
                                                        type="text"
                                                        name="experience"
                                                        value={data.experience}
                                                        onChange={(e) => setData('experience', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="10 tahun"
                                                    />
                                                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Pendekatan Terapi *
                                            </label>
                                                    <input
                                                        type="text"
                                                        name="approach"
                                                        value={data.approach}
                                                        onChange={(e) => setData('approach', e.target.value)}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="Cognitive Behavioral Therapy (CBT), Mindfulness-based Therapy"
                                                    />
                                                    {errors.approach && <p className="text-red-500 text-sm mt-1">{errors.approach}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Filosofi Profesional *
                                            </label>
                                                    <textarea
                                                        name="philosophy"
                                                        value={data.philosophy}
                                                        onChange={(e) => setData('philosophy', e.target.value)}
                                                        required
                                                        rows={3}
                                                        className="w-full px-4 py-3 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                                        placeholder="Setiap individu memiliki kekuatan untuk berubah dan berkembang. Saya percaya bahwa dengan dukungan yang tepat..."
                                                    />
                                                    {errors.philosophy && <p className="text-red-500 text-sm mt-1">{errors.philosophy}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                        </svg>
                                                        <span>Menyimpan...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>{editingPsikolog ? "Update Data" : "Simpan Data"}</span>
                                                    </>
                                                )}
                                            </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </LayoutAdmin>
    );
}