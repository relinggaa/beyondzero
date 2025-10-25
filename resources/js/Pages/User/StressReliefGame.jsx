import React, { useState, useEffect } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import AudioVisualizer from "../../Components/ui/AudioVisualizer";
import { Heart, Trophy, Mic, RotateCcw, ArrowLeft, Volume2, Play } from "lucide-react";
import axios from "axios";

export default function StressReliefGame() {
    // Plant states
    const [plantGrowth, setPlantGrowth] = useState(0);
    const [plantStage, setPlantStage] = useState('seed'); // seed, sprout, growing, blooming, mature
    const [screamLevel, setScreamLevel] = useState(0);
    const [screamDuration, setScreamDuration] = useState(0);
    
    // Audio states
    const [isScreaming, setIsScreaming] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [isSupported, setIsSupported] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [filteredAudioLevel, setFilteredAudioLevel] = useState(0);
    const [isVoiceDetected, setIsVoiceDetected] = useState(false);
    
    // Game states
    const [gameStarted, setGameStarted] = useState(false);
    const [achievements, setAchievements] = useState([]);

    const plantStages = {
        seed: { emoji: '🌱', name: 'Biji', threshold: 0, color: 'text-green-400' },
        sprout: { emoji: '🌿', name: 'Tunas', threshold: 20, color: 'text-green-500' },
        growing: { emoji: '🌱', name: 'Tumbuh', threshold: 40, color: 'text-green-600' },
        blooming: { emoji: '🌸', name: 'Berbunga', threshold: 60, color: 'text-pink-500' },
        mature: { emoji: '🌳', name: 'Dewasa', threshold: 80, color: 'text-green-700' }
    };

    // Initialize voice recognition
    const initializeVoiceRecognition = () => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            
            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = 'id-ID';
                
                recognitionInstance.onstart = () => {
                    setIsListening(true);
                    setIsScreaming(true);
                };
                
                recognitionInstance.onresult = (event) => {
                    let finalTranscript = '';
                    let interimTranscript = '';
                    
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }
                    
                    // Calculate scream intensity based on transcript length and volume
                    const intensity = Math.min(finalTranscript.length + interimTranscript.length, 100);
                    setScreamLevel(intensity);
                    setAudioLevel(intensity);
                    
                    // Update plant growth based on scream duration and intensity
                    updatePlantGrowth();
                };
                
                recognitionInstance.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                    setIsScreaming(false);
                };
                
                recognitionInstance.onend = () => {
                    setIsListening(false);
                    setIsScreaming(false);
                };
                
                setRecognition(recognitionInstance);
                setIsSupported(true);
            } else {
                setIsSupported(false);
            }
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setPlantGrowth(0);
        setPlantStage('seed');
        setScreamDuration(0);
        setScreamLevel(0);
        setAudioLevel(0);
        setIsScreaming(false);
        setAchievements([]);
        initializeVoiceRecognition();
    };

    const startScreaming = () => {
        if (recognition && !isListening) {
            recognition.start();
            setIsScreaming(true);
        }
    };

    const stopScreaming = () => {
        if (recognition && isListening) {
            recognition.stop();
            setIsScreaming(false);
        }
    };

    const updatePlantGrowth = () => {
        if (isScreaming && isVoiceDetected) {
            setScreamDuration(prev => prev + 0.1);
            setPlantGrowth(prev => {
                const effectiveLevel = Math.max(screamLevel, filteredAudioLevel);
                const newGrowth = Math.min(prev + (effectiveLevel * 0.1), 100);
                
                // Update plant stage based on growth
                if (newGrowth >= plantStages.mature.threshold) {
                    setPlantStage('mature');
                    if (!achievements.includes('mature')) {
                        setAchievements(prev => [...prev, 'mature']);
                        // Auto-save when reaching mature stage
                        setTimeout(() => saveSession(), 1000);
                    }
                } else if (newGrowth >= plantStages.blooming.threshold) {
                    setPlantStage('blooming');
                    if (!achievements.includes('blooming')) {
                        setAchievements(prev => [...prev, 'blooming']);
                    }
                } else if (newGrowth >= plantStages.growing.threshold) {
                    setPlantStage('growing');
                    if (!achievements.includes('growing')) {
                        setAchievements(prev => [...prev, 'growing']);
                    }
                } else if (newGrowth >= plantStages.sprout.threshold) {
                    setPlantStage('sprout');
                    if (!achievements.includes('sprout')) {
                        setAchievements(prev => [...prev, 'sprout']);
                    }
                }
                
                return newGrowth;
            });
        }
    };

    // Timer for plant growth
    useEffect(() => {
        let interval;
        if (isScreaming) {
            interval = setInterval(() => {
                updatePlantGrowth();
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isScreaming, screamLevel, isVoiceDetected, filteredAudioLevel]);

    const resetGame = () => {
        setGameStarted(false);
        setPlantGrowth(0);
        setPlantStage('seed');
        setScreamDuration(0);
        setScreamLevel(0);
        setAudioLevel(0);
        setFilteredAudioLevel(0);
        setIsVoiceDetected(false);
        setIsScreaming(false);
        setIsListening(false);
        setAchievements([]);
    };

    const goBack = () => {
        window.history.back();
    };

    const saveSession = async () => {
        try {
            const sessionData = {
                duration: screamDuration,
                max_intensity: Math.max(screamLevel, filteredAudioLevel),
                plant_stage: plantStage,
                achievements: achievements
            };

            await axios.post('/api/games/stress-relief/save-session', sessionData);
            console.log('Sesi berhasil disimpan');
        } catch (error) {
            console.error('Error menyimpan sesi:', error);
        }
    };

    const getTips = async () => {
        try {
            const response = await axios.get('/api/games/stress-relief/tips');
            console.log('Tips:', response.data);
        } catch (error) {
            console.error('Error mengambil tips:', error);
        }
    };

    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming mood-tracker-bg pt-20">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <button
                                onClick={goBack}
                                className="mr-4 p-2 text-white/70 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center justify-center">
                                <Heart className="w-8 h-8 mr-3 text-emerald-400" />
                                Stress Relief Garden
                            </h1>
                        </div>
                        <p className="text-white/70 text-lg">
                            Berteriak untuk menyuburkan tanaman dan melepas stres dengan cara yang sehat
                        </p>
                    </div>

                    {!gameStarted ? (
                        /* Game Start Screen */
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-slate-700 rounded-2xl p-8 border border-slate-600 text-center">
                                <div className="space-y-6">
                                    <div className="text-6xl mb-4">🌱</div>
                                    <h2 className="text-2xl font-bold text-white mb-4">
                                        Selamat Datang di Stress Relief Garden
                                    </h2>
                                    <p className="text-white/70 text-lg mb-6">
                                        Game ini membantu Anda melepas stres dengan cara yang menyenangkan dan sehat. 
                                        Berteriak atau bicara keras untuk menyuburkan tanaman virtual Anda!
                                    </p>
                                    
                                    <div className="bg-slate-600 rounded-lg p-6 mb-6">
                                        <h3 className="text-white font-semibold mb-4">Cara Bermain:</h3>
                                        <ul className="text-white/70 text-sm space-y-2 text-left">
                                            <li>• Klik "Mulai Game" untuk memulai</li>
                                            <li>• Klik "Mulai Berteriak!" untuk mengaktifkan mikrofon</li>
                                            <li>• Berteriak atau bicara keras untuk menyuburkan tanaman</li>
                                            <li>• Semakin keras dan lama berteriak, semakin subur tanaman</li>
                                            <li>• Tanaman akan tumbuh dari biji menjadi pohon dewasa</li>
                                            <li>• Ini adalah cara sehat untuk melepas emosi terpendam!</li>
                                        </ul>
                                    </div>

                                    {!isSupported && (
                                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                                            <p className="text-red-400">
                                                ⚠️ Voice recognition tidak didukung di browser ini. 
                                                Silakan gunakan browser modern seperti Chrome atau Edge.
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={startGame}
                                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105"
                                    >
                                        🌱 Mulai Game
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Game Content */
                        <div className="max-w-6xl mx-auto space-y-8">
                            {/* Baris 1: Animasi Tumbuhan */}
                            <div className="bg-slate-700 rounded-2xl p-8 border border-slate-600">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                                        <Heart className="w-6 h-6 mr-3 text-emerald-400" />
                                        Tanaman Stress Relief
                                    </h3>
                                    
                                    {/* Plant Visual */}
                                    <div className="relative inline-block mb-6">
                                        <div className={`text-9xl transition-all duration-1000 ${
                                            isScreaming ? 'scale-110 animate-pulse' : 'scale-100'
                                        } ${plantStages[plantStage].color}`}>
                                            {plantStages[plantStage].emoji}
                                        </div>
                                        {isScreaming && (
                                            <div className="absolute -top-6 -right-6 text-5xl animate-bounce">
                                                🔊
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h4 className="text-3xl font-bold text-white mb-4">
                                        {plantStages[plantStage].name}
                                    </h4>
                                    
                                    <div className="max-w-md mx-auto">
                                        <div className="w-full bg-slate-600 rounded-full h-6 mb-4">
                                            <div 
                                                className="bg-gradient-to-r from-emerald-400 to-green-500 h-6 rounded-full transition-all duration-500"
                                                style={{ width: `${plantGrowth}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-white/70 text-lg">Pertumbuhan: {plantGrowth.toFixed(1)}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Baris 2: Audio Visualizer */}
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-white flex items-center justify-center">
                                        <Volume2 className="w-6 h-6 mr-3" />
                                        Real-Time Audio Visualizer
                                    </h3>
                                    
                                    <AudioVisualizer
                                        intensity={audioLevel}
                                        duration={screamDuration}
                                        isActive={isScreaming}
                                        className="w-full"
                                        onFilteredLevelChange={setFilteredAudioLevel}
                                        onVoiceDetected={setIsVoiceDetected}
                                    />
                                    
                                    <div className="bg-slate-600 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">Tips untuk Hasil Terbaik:</h4>
                                        <ul className="text-white/70 text-sm space-y-1">
                                            <li>• Berteriak dengan volume yang konsisten</li>
                                            <li>• Jangan terlalu dekat dengan mikrofon</li>
                                            <li>• Berteriak dengan emosi yang tulus</li>
                                            <li>• Sistem akan memfilter noise otomatis</li>
                                            <li>• Hanya suara yang jelas yang akan terdeteksi</li>
                                            <li>• Frekuensi tinggi akan menampilkan bar vertikal</li>
                                            <li>• Istirahat sejenak jika merasa lelah</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Baris 3: Mainkan Sekarang */}
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-white flex items-center justify-center">
                                        <Play className="w-6 h-6 mr-3" />
                                        Mainkan Sekarang
                                    </h3>
                                    
                                    {/* Scream Controls */}
                                    <div className="space-y-4">
                                        {!isSupported ? (
                                            <div className="text-center">
                                                <p className="text-red-400 text-lg mb-4">
                                                    Voice recognition tidak didukung di browser ini
                                                </p>
                                                <p className="text-white/70 text-sm">
                                                    Silakan gunakan browser modern seperti Chrome atau Edge
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <button
                                                    onClick={isScreaming ? stopScreaming : startScreaming}
                                                    className={`w-full px-8 py-6 rounded-full font-bold text-xl transition-all duration-300 ${
                                                        isScreaming 
                                                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                                            : 'bg-emerald-500 hover:bg-emerald-600'
                                                    } text-white flex items-center justify-center space-x-3`}
                                                >
                                                    <Mic className="w-6 h-6" />
                                                    <span>
                                                        {isScreaming ? '🛑 Berhenti Berteriak' : '🎤 Mulai Berteriak!'}
                                                    </span>
                                                </button>
                                                
                                                {isScreaming && (
                                                    <div className="grid grid-cols-2 gap-4 text-center">
                                                        <div className="bg-slate-600 rounded-lg p-4">
                                                            <div className="text-white/70 text-sm mb-1">Intensitas</div>
                                                            <div className="text-white text-lg font-semibold">
                                                                {screamLevel.toFixed(1)}%
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-600 rounded-lg p-4">
                                                            <div className="text-white/70 text-sm mb-1">Durasi</div>
                                                            <div className="text-white text-lg font-semibold">
                                                                {screamDuration.toFixed(1)}s
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Game Controls */}
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={resetGame}
                                            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            <span>Reset Game</span>
                                        </button>
                                        <button
                                            onClick={saveSession}
                                            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                                        >
                                            <Trophy className="w-5 h-5" />
                                            <span>Simpan Sesi</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Achievements */}
                            {achievements.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-white mb-4 text-center">Pencapaian!</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {achievements.map((achievement, index) => (
                                            <div key={index} className="bg-slate-700 rounded-lg p-4 border border-slate-600 text-center">
                                                <div className="text-3xl mb-2">
                                                    {plantStages[achievement]?.emoji}
                                                </div>
                                                <div className="text-white font-semibold text-sm">
                                                    {plantStages[achievement]?.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Final Achievement */}
                            {plantStage === 'mature' && (
                                <div className="mt-8 text-center">
                                    <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-8 border border-emerald-500/30">
                                        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                        <h4 className="text-3xl font-bold text-white mb-4">Selamat!</h4>
                                        <p className="text-white/70 text-lg mb-2">
                                            Tanaman Anda telah tumbuh menjadi pohon dewasa!
                                        </p>
                                        <p className="text-emerald-400 font-semibold text-xl">
                                            Stres Anda telah terlepas! 🌳
                                        </p>
                                        <p className="text-white/60 text-sm mt-4">
                                            Durasi total: {screamDuration.toFixed(1)}s | 
                                            Intensitas maksimal: {Math.max(...achievements.map(() => screamLevel)).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Benefits Section */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <h3 className="text-xl font-semibold text-white mb-6 text-center">Manfaat Stress Relief Garden</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Melepas Emosi</h4>
                                <p className="text-white/70 text-sm">Berteriak membantu melepas emosi terpendam dengan cara yang sehat</p>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Volume2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Terapi Suara</h4>
                                <p className="text-white/70 text-sm">Menggunakan suara sebagai media untuk relaksasi dan healing</p>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Pencapaian Positif</h4>
                                <p className="text-white/70 text-sm">Melihat tanaman tumbuh memberikan kepuasan dan motivasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
