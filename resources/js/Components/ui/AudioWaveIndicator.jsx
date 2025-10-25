import React, { useState, useEffect, useRef } from 'react';

const AudioWaveIndicator = ({ 
    intensity = 0, 
    duration = 0, 
    isActive = false,
    className = "" 
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);

    // Initialize audio context and analyser
    useEffect(() => {
        if (typeof window !== 'undefined' && window.AudioContext) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = ctx.createAnalyser();
            analyserNode.fftSize = 256;
            analyserNode.smoothingTimeConstant = 0.8;
            
            setAudioContext(ctx);
            setAnalyser(analyserNode);
            setDataArray(new Uint8Array(analyserNode.frequencyBinCount));
        }
    }, []);

    // Draw wave animation
    const drawWave = () => {
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
        gradient.addColorStop(1, '#1e293b'); // slate-800
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Generate wave data based on intensity
        const waveData = generateWaveData(intensity, width, height);
        
        // Draw multiple wave layers
        drawWaveLayer(ctx, waveData, height, 0, '#10b981', 0.8, 3); // emerald-500
        drawWaveLayer(ctx, waveData, height, 1, '#06b6d4', 0.6, 2); // cyan-500
        drawWaveLayer(ctx, waveData, height, 2, '#3b82f6', 0.4, 1); // blue-500
        drawWaveLayer(ctx, waveData, height, 3, '#8b5cf6', 0.3, 1); // violet-500
        drawWaveLayer(ctx, waveData, height, 4, '#ec4899', 0.2, 1); // pink-500

        // Add glow effect
        addGlowEffect(ctx, waveData, height);

        // Add particles
        drawParticles(ctx, width, height, intensity);

        if (isActive) {
            animationRef.current = requestAnimationFrame(drawWave);
        }
    };

    const generateWaveData = (intensity, width, height) => {
        const data = [];
        const frequency = 0.02 + (intensity / 100) * 0.03;
        const amplitude = 20 + (intensity / 100) * 40;
        
        for (let x = 0; x < width; x += 2) {
            const y = height / 2 + 
                Math.sin(x * frequency) * amplitude +
                Math.sin(x * frequency * 2) * amplitude * 0.5 +
                Math.sin(x * frequency * 3) * amplitude * 0.3 +
                Math.sin(x * frequency * 4) * amplitude * 0.2;
            data.push({ x, y });
        }
        return data;
    };

    const drawWaveLayer = (ctx, waveData, height, layerIndex, color, opacity, lineWidth) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
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

    // Start/stop animation based on isActive
    useEffect(() => {
        if (isActive) {
            drawWave();
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
    }, [isActive, intensity]);

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

    return (
        <div className={`relative ${className}`}>
            {/* Intensity and Duration Display */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
                <div className="text-white/90 text-sm font-medium">
                    Intensitas: {intensity.toFixed(1)}%
                </div>
                <div className="text-white/90 text-sm font-medium">
                    Durasi: {duration.toFixed(1)}s
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4">
                <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                    <div 
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${intensity}%` }}
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

export default AudioWaveIndicator;
