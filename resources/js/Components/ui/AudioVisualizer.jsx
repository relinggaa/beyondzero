import React, { useState, useEffect, useRef, useCallback } from 'react';

const AudioVisualizer = ({ 
    isActive = false, 
    intensity = 0, 
    duration = 0,
    className = "",
    style = {},
    noiseThreshold = 30,        // Threshold untuk membedakan noise dan suara
    voiceThreshold = 50,        // Threshold minimum untuk mendeteksi suara
    smoothingFactor = 0.8,      // Faktor smoothing untuk mengurangi noise
    onFilteredLevelChange,     // Callback untuk filtered level
    onVoiceDetected            // Callback untuk voice detection
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const microphoneRef = useRef(null);
    
    const [audioLevel, setAudioLevel] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [isVoiceDetected, setIsVoiceDetected] = useState(false);
    const [filteredLevel, setFilteredLevel] = useState(0);
    const [noiseLevel, setNoiseLevel] = useState(0);
    
    // Voice Activity Detection variables
    const voiceHistoryRef = useRef([]);
    const noiseHistoryRef = useRef([]);
    const lastVoiceTimeRef = useRef(0);

    // Initialize audio context and microphone
    const initializeAudio = useCallback(async () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (!analyserRef.current) {
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;
                analyserRef.current.smoothingTimeConstant = 0.8;
                dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
            }

            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                } 
            });
            
            microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
            microphoneRef.current.connect(analyserRef.current);
            
            setIsListening(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setIsListening(false);
        }
    }, []);

    // Stop audio
    const stopAudio = useCallback(() => {
        if (microphoneRef.current) {
            microphoneRef.current.disconnect();
            microphoneRef.current = null;
        }
        setIsListening(false);
        setIsVoiceDetected(false);
        setFilteredLevel(0);
        setNoiseLevel(0);
    }, []);

    // Noise filtering and voice activity detection
    const processAudioData = useCallback((audioData) => {
        if (!audioData || audioData.length === 0) return { filteredLevel: 0, isVoice: false };

        // Calculate RMS (Root Mean Square) for overall audio level
        const rms = Math.sqrt(audioData.reduce((sum, value) => sum + value * value, 0) / audioData.length);
        
        // Calculate frequency distribution
        const lowFreq = audioData.slice(0, Math.floor(audioData.length * 0.3)).reduce((sum, val) => sum + val, 0) / Math.floor(audioData.length * 0.3);
        const midFreq = audioData.slice(Math.floor(audioData.length * 0.3), Math.floor(audioData.length * 0.7)).reduce((sum, val) => sum + val, 0) / Math.floor(audioData.length * 0.4);
        const highFreq = audioData.slice(Math.floor(audioData.length * 0.7)).reduce((sum, val) => sum + val, 0) / Math.floor(audioData.length * 0.3);

        // Voice characteristics: human voice typically has more energy in mid frequencies
        const voiceScore = (midFreq * 0.6) + (lowFreq * 0.3) + (highFreq * 0.1);
        
        // Update noise history (background noise estimation)
        noiseHistoryRef.current.push(rms);
        if (noiseHistoryRef.current.length > 50) {
            noiseHistoryRef.current.shift();
        }
        
        // Calculate average noise level
        const avgNoise = noiseHistoryRef.current.reduce((sum, val) => sum + val, 0) / noiseHistoryRef.current.length;
        setNoiseLevel(avgNoise);

        // Apply noise gate (only process if above noise threshold)
        const noiseGatedLevel = Math.max(0, rms - avgNoise);
        
        // Apply smoothing to reduce sudden spikes
        const smoothedLevel = (filteredLevel * smoothingFactor) + (noiseGatedLevel * (1 - smoothingFactor));
        
        // Voice Activity Detection
        const isVoice = voiceScore > voiceThreshold && noiseGatedLevel > noiseThreshold;
        
        // Update voice history
        if (isVoice) {
            voiceHistoryRef.current.push(Date.now());
            lastVoiceTimeRef.current = Date.now();
        }
        
        // Keep only recent voice detections (last 2 seconds)
        voiceHistoryRef.current = voiceHistoryRef.current.filter(time => Date.now() - time < 2000);
        
        // Consider voice active if detected within last 500ms
        const voiceActive = (Date.now() - lastVoiceTimeRef.current) < 500;
        
        return {
            filteredLevel: Math.min(smoothedLevel, 100),
            isVoice: voiceActive,
            voiceScore: voiceScore,
            noiseGatedLevel: noiseGatedLevel
        };
    }, [filteredLevel, smoothingFactor, voiceThreshold, noiseThreshold]);

    // Draw visualizer
    const drawVisualizer = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#0f172a'); // slate-900
        gradient.addColorStop(0.5, '#1e293b'); // slate-800
        gradient.addColorStop(1, '#0f172a'); // slate-900
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Get audio data if listening
        let audioData = null;
        let processedData = { filteredLevel: 0, isVoice: false };
        
        if (isListening && analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            audioData = Array.from(dataArrayRef.current);
            
            // Process audio data with noise filtering and voice detection
            processedData = processAudioData(audioData);
            
            // Update states
            setFilteredLevel(processedData.filteredLevel);
            setIsVoiceDetected(processedData.isVoice);
            
            // Calculate average audio level for display
            const average = audioData.reduce((sum, value) => sum + value, 0) / audioData.length;
            setAudioLevel(average);
        }

        // Generate wave data using filtered level
        const effectiveLevel = isVoiceDetected ? processedData.filteredLevel : (intensity || 0);
        const waveData = generateWaveData(effectiveLevel, width, height, audioData);
        
        // Draw multiple wave layers with different effects
        drawWaveLayer(ctx, waveData, height, 0, '#10b981', 0.9, 4, 'main'); // emerald-500
        drawWaveLayer(ctx, waveData, height, 1, '#06b6d4', 0.7, 3, 'secondary'); // cyan-500
        drawWaveLayer(ctx, waveData, height, 2, '#3b82f6', 0.5, 2, 'tertiary'); // blue-500
        drawWaveLayer(ctx, waveData, height, 3, '#8b5cf6', 0.3, 1, 'quaternary'); // violet-500
        drawWaveLayer(ctx, waveData, height, 4, '#ec4899', 0.2, 1, 'quinary'); // pink-500

        // Add glow effect
        addGlowEffect(ctx, waveData, height);

        // Add particles
        drawParticles(ctx, width, height, effectiveLevel);

        // Add frequency bars if audio data available and voice detected
        if (audioData && isVoiceDetected) {
            drawFrequencyBars(ctx, audioData, width, height);
        }

        if (isActive) {
            animationRef.current = requestAnimationFrame(drawVisualizer);
        }
    }, [isActive, intensity, audioLevel, isListening, isVoiceDetected, filteredLevel, processAudioData]);

    const generateWaveData = (intensity, width, height, audioData = null) => {
        const data = [];
        const frequency = 0.02 + (intensity / 100) * 0.03;
        const amplitude = 20 + (intensity / 100) * 40;
        
        for (let x = 0; x < width; x += 2) {
            let y = height / 2;
            
            // Base wave
            y += Math.sin(x * frequency) * amplitude;
            y += Math.sin(x * frequency * 2) * amplitude * 0.5;
            y += Math.sin(x * frequency * 3) * amplitude * 0.3;
            y += Math.sin(x * frequency * 4) * amplitude * 0.2;
            
            // Add audio data influence if available
            if (audioData) {
                const audioIndex = Math.floor((x / width) * audioData.length);
                const audioInfluence = (audioData[audioIndex] || 0) * 0.3;
                y += Math.sin(x * frequency * 5) * audioInfluence;
            }
            
            data.push({ x, y });
        }
        return data;
    };

    const drawWaveLayer = (ctx, waveData, height, layerIndex, color, opacity, lineWidth, type) => {
        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Create gradient for the wave
        const gradient = ctx.createLinearGradient(0, 0, waveData.length, 0);
        gradient.addColorStop(0, '#10b981'); // emerald-500
        gradient.addColorStop(0.2, '#06b6d4'); // cyan-500
        gradient.addColorStop(0.4, '#3b82f6'); // blue-500
        gradient.addColorStop(0.6, '#8b5cf6'); // violet-500
        gradient.addColorStop(0.8, '#ec4899'); // pink-500
        gradient.addColorStop(1, '#f59e0b'); // amber-500

        ctx.strokeStyle = gradient;

        for (let i = 0; i < waveData.length; i++) {
            const point = waveData[i];
            const y = point.y + (layerIndex * 2);
            
            if (i === 0) {
                ctx.moveTo(point.x, y);
            } else {
                ctx.lineTo(point.x, y);
            }
        }
        
        ctx.stroke();
        ctx.globalAlpha = 1;
    };

    const addGlowEffect = (ctx, waveData, height) => {
        // Add glow to the main wave
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;

        ctx.beginPath();
        for (let i = 0; i < waveData.length; i++) {
            const point = waveData[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    };

    const drawParticles = (ctx, width, height, intensity) => {
        const particleCount = Math.floor(intensity / 10) + 5;
        
        for (let i = 0; i < particleCount; i++) {
            const x = (i / particleCount) * width;
            const y = height / 2 + Math.sin(x * 0.01 + Date.now() * 0.001) * 30;
            const size = 1 + Math.random() * 2;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.globalAlpha = 0.6;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    };

    const drawFrequencyBars = (ctx, audioData, width, height) => {
        const barWidth = width / audioData.length;
        const maxBarHeight = height * 0.3;
        
        for (let i = 0; i < audioData.length; i++) {
            const barHeight = (audioData[i] / 255) * maxBarHeight;
            const x = i * barWidth;
            const y = height - barHeight;
            
            // Create gradient for bars
            const gradient = ctx.createLinearGradient(0, y, 0, height);
            gradient.addColorStop(0, '#06b6d4');
            gradient.addColorStop(1, '#10b981');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth - 1, barHeight);
        }
    };

    // Start/stop animation based on isActive
    useEffect(() => {
        if (isActive) {
            drawVisualizer();
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, drawVisualizer]);

    // Handle canvas resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize audio when component mounts
    useEffect(() => {
        if (isActive) {
            initializeAudio();
        } else {
            stopAudio();
        }

        return () => {
            stopAudio();
        };
    }, [isActive, initializeAudio, stopAudio]);

    // Call callbacks when filtered level or voice detection changes
    useEffect(() => {
        if (onFilteredLevelChange) {
            onFilteredLevelChange(filteredLevel);
        }
    }, [filteredLevel, onFilteredLevelChange]);

    useEffect(() => {
        if (onVoiceDetected) {
            onVoiceDetected(isVoiceDetected);
        }
    }, [isVoiceDetected, onVoiceDetected]);

    return (
        <div className={`relative ${className}`} style={style}>
            {/* Intensity and Duration Display */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <div className="text-white/90 text-sm font-medium">
                    Intensitas: {(isVoiceDetected ? filteredLevel : intensity || audioLevel).toFixed(1)}%
                </div>
                <div className="text-white/90 text-sm font-medium">
                    Durasi: {duration.toFixed(1)}s
                </div>
                {isListening && (
                    <div className="text-green-400 text-xs font-medium">
                        🎤 Mikrofon Aktif
                    </div>
                )}
                {isVoiceDetected && (
                    <div className="text-emerald-400 text-xs font-medium animate-pulse">
                        🔊 Suara Terdeteksi
                    </div>
                )}
                {isListening && !isVoiceDetected && (
                    <div className="text-yellow-400 text-xs font-medium">
                        🔇 Menunggu Suara...
                    </div>
                )}
                <div className="text-white/60 text-xs">
                    Noise Level: {noiseLevel.toFixed(1)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4">
                <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                    <div 
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${Math.min(isVoiceDetected ? filteredLevel : intensity || audioLevel, 100)}%` }}
                    ></div>
                </div>
            </div>

            {/* Canvas for Wave Animation */}
            <canvas
                ref={canvasRef}
                className="w-full h-64 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
            />

            {/* Subtle dividers */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-500/30"></div>
            <div className="absolute bottom-1 left-0 right-0 h-px bg-slate-500/20"></div>
        </div>
    );
};

export default AudioVisualizer;
