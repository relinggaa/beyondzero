import React, { useState } from 'react';
import LayoutUser from '../../Components/Layout/LayoutUser';

export default function MLPrediction() {
    const [formData, setFormData] = useState({
        age: '',
        income: '',
        education: 'Bachelor',
        experience: ''
    });
    
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await fetch('/api/ml/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    age: parseInt(formData.age),
                    income: parseFloat(formData.income),
                    education: formData.education,
                    experience: parseInt(formData.experience)
                })
            });

            const data = await response.json();

            if (data.success) {
                setPrediction(data);
            } else {
                setError(data.error || 'Terjadi kesalahan dalam prediksi');
            }
        } catch (err) {
            setError('Tidak dapat terhubung ke server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutUser>
            <div className="p-4 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        AI Prediction Tool
                    </h1>
                    <p className="text-white/70 text-lg">
                        Prediksi menggunakan Machine Learning
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Input */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                        <h2 className="text-2xl font-bold text-white mb-6">Input Data</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Usia
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                                    placeholder="Masukkan usia"
                                    min="1"
                                    max="100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Pendapatan (Rp)
                                </label>
                                <input
                                    type="number"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                                    placeholder="Masukkan pendapatan"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Tingkat Pendidikan
                                </label>
                                <select
                                    name="education"
                                    value={formData.education}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
                                    required
                                >
                                    <option value="High School">High School</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Pengalaman Kerja (Tahun)
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                                    placeholder="Masukkan pengalaman kerja"
                                    min="0"
                                    max="50"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-500 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Memproses...' : 'Prediksi'}
                            </button>
                        </form>
                    </div>

                    {/* Hasil Prediksi */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                        <h2 className="text-2xl font-bold text-white mb-6">Hasil Prediksi</h2>
                        
                        {loading && (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                                <span className="ml-3 text-white">Memproses prediksi...</span>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                <div className="flex items-center">
                                    <span className="text-red-400 text-xl mr-3">⚠️</span>
                                    <div>
                                        <h3 className="text-red-400 font-semibold">Error</h3>
                                        <p className="text-red-300 text-sm">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {prediction && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-cyan-400/10 to-teal-500/10 border border-cyan-400/20 rounded-xl p-6">
                                    <div className="text-center">
                                        <div className="text-4xl mb-4">
                                            {prediction.prediction === 'employed' ? '✅' : '❌'}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {prediction.prediction === 'employed' ? 'Employed' : 'Unemployed'}
                                        </h3>
                                        <p className="text-white/70">
                                            {prediction.prediction === 'employed' 
                                                ? 'Berdasarkan data, kemungkinan besar akan mendapatkan pekerjaan'
                                                : 'Berdasarkan data, perlu meningkatkan kualifikasi'
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-600 rounded-xl p-4">
                                    <h4 className="text-white font-semibold mb-3">Confidence Score</h4>
                                    <div className="flex items-center">
                                        <div className="flex-1 bg-slate-500 rounded-full h-3 mr-3">
                                            <div 
                                                className="bg-gradient-to-r from-cyan-400 to-teal-500 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${prediction.confidence * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-cyan-400 font-semibold">
                                            {(prediction.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-slate-600 rounded-xl p-4">
                                    <h4 className="text-white font-semibold mb-3">Input Data</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-white/70">Usia:</div>
                                        <div className="text-white">{prediction.input_data.age}</div>
                                        <div className="text-white/70">Pendapatan:</div>
                                        <div className="text-white">Rp {prediction.input_data.income.toLocaleString()}</div>
                                        <div className="text-white/70">Pendidikan:</div>
                                        <div className="text-white">{prediction.input_data.education}</div>
                                        <div className="text-white/70">Pengalaman:</div>
                                        <div className="text-white">{prediction.input_data.experience} tahun</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loading && !error && !prediction && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🤖</div>
                                <p className="text-white/60">
                                    Masukkan data di form sebelah kiri untuk mendapatkan prediksi
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 bg-slate-700 rounded-2xl p-6 border border-slate-600">
                    <h3 className="text-xl font-bold text-white mb-4">Tentang AI Prediction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="text-white font-semibold mb-2">Data-Driven</h4>
                            <p className="text-white/60 text-sm">
                                Prediksi berdasarkan analisis data historis menggunakan algoritma Random Forest
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="text-white font-semibold mb-2">Real-time</h4>
                            <p className="text-white/60 text-sm">
                                Hasil prediksi langsung dalam hitungan detik dengan akurasi tinggi
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🎯</div>
                            <h4 className="text-white font-semibold mb-2">Akurat</h4>
                            <p className="text-white/60 text-sm">
                                Model dilatih dengan data berkualitas tinggi untuk hasil yang dapat diandalkan
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
