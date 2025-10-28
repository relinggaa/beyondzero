import React, { useState, useEffect, useRef } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import { Heart, Mic, RotateCcw, ArrowLeft } from "lucide-react";
import backgroundPsikologImage from "../../../img/background_psikolog.png";

export default function StressReliefGame() {
    // Plant states
    const [plantGrowth, setPlantGrowth] = useState(0);
    const [plantStage, setPlantStage] = useState('seed'); // seed, sprout, growing, blooming, mature
    const [screamLevel, setScreamLevel] = useState(0);
    const [screamDuration, setScreamDuration] = useState(0);
    
    // Audio states
    const [isScreaming, setIsScreaming] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [isVoiceDetected, setIsVoiceDetected] = useState(false);
    
    // Web Audio API refs
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const microphoneRef = useRef(null);
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    
    // Game states
    const [gameStarted, setGameStarted] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [totalScreamTime, setTotalScreamTime] = useState(0);
    const [maxIntensity, setMaxIntensity] = useState(0);

    const plantStages = {
        seed: { emoji: '🌱', name: 'Biji', threshold: 0, color: 'text-green-400', description: 'Tanaman baru mulai tumbuh' },
        sprout: { emoji: '🌿', name: 'Tunas', threshold: 15, color: 'text-green-500', description: 'Tunas kecil mulai muncul' },
        growing: { emoji: '🌱', name: 'Tumbuh', threshold: 35, color: 'text-green-600', description: 'Tanaman mulai tumbuh tinggi' },
        blooming: { emoji: '🌸', name: 'Berbunga', threshold: 60, color: 'text-pink-500', description: 'Bunga mulai bermekaran' },
        mature: { emoji: '🌳', name: 'Dewasa', threshold: 85, color: 'text-green-700', description: 'Tanaman mencapai kematangan penuh' }
    };

    // Initialize Web Audio API for microphone access
    const initializeAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                } 
            });
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
            microphone.connect(analyser);
            
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            microphoneRef.current = microphone;
            
            return true;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            return false;
        }
    };

    // Start audio monitoring
    const startAudioMonitoring = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        let lastUpdate = Date.now();
        
        const monitor = () => {
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Calculate average volume
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            const normalizedLevel = Math.min(average / 128, 1) * 100;
            
            setAudioLevel(normalizedLevel);
            
            // Detect voice (threshold for voice detection)
            const voiceThreshold = 15;
            const isVoice = normalizedLevel > voiceThreshold;
            setIsVoiceDetected(isVoice);
            
            if (isVoice) {
                setScreamLevel(normalizedLevel);
                setMaxIntensity(prev => Math.max(prev, normalizedLevel));
                
                // Update scream duration
                const now = Date.now();
                if (startTimeRef.current) {
                    const duration = (now - startTimeRef.current) / 1000;
                    setScreamDuration(duration);
                    setTotalScreamTime(prev => prev + (now - lastUpdate) / 1000);
                } else {
                    startTimeRef.current = now;
                }
                lastUpdate = now;
                
                // Update plant growth based on voice intensity and duration
                updatePlantGrowth(normalizedLevel);
            } else {
                if (startTimeRef.current) {
                    startTimeRef.current = null;
                }
            }
            
            animationFrameRef.current = requestAnimationFrame(monitor);
        };
        
        animationFrameRef.current = requestAnimationFrame(monitor);
    };

    // Stop audio monitoring
    const stopAudioMonitoring = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        
        if (microphoneRef.current) {
            microphoneRef.current.disconnect();
        }
        
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        
        setAudioLevel(0);
        setIsVoiceDetected(false);
        setScreamLevel(0);
        startTimeRef.current = null;
    };

    // Update plant growth based on voice intensity
    const updatePlantGrowth = (intensity) => {
        setPlantGrowth(prev => {
            // Growth rate based on intensity (higher intensity = faster growth)
            const growthRate = Math.min(intensity / 20, 2); // Max 2% per frame
            const newGrowth = Math.min(prev + growthRate, 100);
            
            // Update plant stage based on growth
            const stages = Object.keys(plantStages);
            for (let i = stages.length - 1; i >= 0; i--) {
                const stage = stages[i];
                if (newGrowth >= plantStages[stage].threshold) {
                    if (plantStage !== stage) {
                        setPlantStage(stage);
                        if (!achievements.includes(stage)) {
                            setAchievements(prev => [...prev, stage]);
                        }
                    }
                    break;
                }
            }
            
            return newGrowth;
        });
    };

    const startGame = async () => {
        setGameStarted(true);
        setPlantGrowth(0);
        setPlantStage('seed');
        setScreamDuration(0);
        setScreamLevel(0);
        setAudioLevel(0);
        setIsScreaming(false);
        setAchievements([]);
        setTotalScreamTime(0);
        setMaxIntensity(0);
        
        // Initialize audio
        const audioInitialized = await initializeAudio();
        if (!audioInitialized) {
            alert('Tidak dapat mengakses mikrofon. Pastikan browser mendukung dan izin mikrofon diberikan.');
        }
    };

    const startScreaming = () => {
        if (analyserRef.current && !isScreaming) {
            setIsScreaming(true);
            setIsListening(true);
            startAudioMonitoring();
        }
    };

    const stopScreaming = () => {
            setIsScreaming(false);
        setIsListening(false);
        stopAudioMonitoring();
    };

    const resetGame = () => {
        setGameStarted(false);
        setPlantGrowth(0);
        setPlantStage('seed');
        setScreamDuration(0);
        setScreamLevel(0);
        setAudioLevel(0);
        setIsVoiceDetected(false);
        setIsScreaming(false);
        setIsListening(false);
        setAchievements([]);
        setTotalScreamTime(0);
        setMaxIntensity(0);
        stopAudioMonitoring();
    };

    const goBack = () => {
        window.history.back();
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopAudioMonitoring();
        };
    }, []);

    return (
        <LayoutUser>
            <div 
                className="min-h-screen cursor-gaming pt-20 pb-12 relative"
                style={{
                    backgroundImage: `url(${backgroundPsikologImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(1.4) contrast(1.2)',
                }}
            >
                {/* Navy Blue Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-black/80"></div>
                
                <div className="container mx-auto px-4 py-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <button
                                onClick={goBack}
                                className="mr-4 p-2 text-blue-200 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent flex items-center justify-center">
                                <Heart className="w-8 h-8 mr-3 text-emerald-400" />
                                Stress Relief Garden
                            </h1>
                        </div>
                        <p className="text-blue-100 text-lg">
                            Berteriak untuk menyuburkan tanaman dan melepas stres dengan cara yang sehat
                        </p>
                    </div>

                    {!gameStarted ? (
                        /* Game Start Screen */
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-800/30 shadow-2xl text-center">
                                <div className="space-y-6">
                                    <div className="text-6xl mb-4">🌱</div>
                                    <h2 className="text-2xl font-bold text-white mb-4">
                                        Selamat Datang di Stress Relief Garden
                                    </h2>
                                    <p className="text-blue-100 text-lg mb-6">
                                        Game ini membantu Anda melepas stres dengan cara yang menyenangkan dan sehat. 
                                        Berteriak atau bicara keras untuk menyuburkan tanaman virtual Anda!
                                    </p>
                                    
                                    <div className="bg-gradient-to-r from-slate-800/80 to-blue-900/80 rounded-2xl p-6 mb-6 border border-blue-700/30">
                                        <h3 className="text-white font-semibold mb-4">Cara Bermain:</h3>
                                        <ul className="text-blue-100 text-sm space-y-2 text-left">
                                            <li>• Klik "Mulai Game" untuk memulai</li>
                                            <li>• Klik "Mulai Berteriak!" untuk mengaktifkan mikrofon</li>
                                            <li>• Berteriak atau bicara keras untuk menyuburkan tanaman</li>
                                            <li>• Semakin keras dan lama berteriak, semakin subur tanaman</li>
                                            <li>• Tanaman akan tumbuh dari biji menjadi pohon dewasa</li>
                                            <li>• Ini adalah cara sehat untuk melepas emosi terpendam!</li>
                                        </ul>
                                    </div>

                                    <div className="text-blue-200 text-sm">Pastikan izin mikrofon aktif. Klik Mulai Game lalu tekan tombol Berteriak!</div>

                                    <button
                                        onClick={startGame}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-xl border border-blue-500/30"
                                    >
                                        🌱 Mulai Game
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Game Content - Single Container */
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-800/30 shadow-2xl">
                                {/* Plant Block */}
                                <div className="text-center mb-8">
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
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-4">
                                        {plantStages[plantStage].name}
                                    </h4>
                                    <div className="max-w-md mx-auto">
                                        <div className="w-full bg-slate-800/60 rounded-full h-6 mb-2 border border-blue-700/30">
                                            <div 
                                                className="bg-gradient-to-r from-emerald-400 to-green-500 h-6 rounded-full transition-all duration-500"
                                                style={{ width: `${plantGrowth}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-blue-100 text-lg">Pertumbuhan: {plantGrowth.toFixed(1)}%</p>
                                        <p className="text-blue-200 text-sm mt-1">{plantStages[plantStage].description}</p>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <button
                                            onClick={isScreaming ? stopScreaming : startScreaming}
                                            className={`w-full px-8 py-6 rounded-full font-bold text-xl transition-all duration-300 ${
                                                isScreaming 
                                                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse' 
                                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                                            } text-white flex items-center justify-center space-x-3 shadow-xl border border-blue-500/30`}
                                        >
                                            <Mic className="w-6 h-6" />
                                            <span>
                                                {isScreaming ? '🛑 Berhenti Berteriak' : '🎤 Mulai Berteriak!'}
                                            </span>
                                        </button>
                                        <div className="text-center text-blue-100 text-sm">Level: {audioLevel.toFixed(1)}%</div>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={resetGame}
                                                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg transition-colors border border-blue-700/30"
                                            >
                                                <RotateCcw className="w-5 h-5" />
                                                <span>Reset</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                    {/* Benefits dipindah ke kiri (sidebar) */}
                </div>
            </div>
        </LayoutUser>
    );
}
