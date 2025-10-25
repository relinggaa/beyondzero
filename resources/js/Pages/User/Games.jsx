import React, { useState, useEffect } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import { Brain, Heart, Zap, Target, Trophy, Play, RotateCcw, Clock, Mic } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Games() {
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameScore, setGameScore] = useState(0);
    const [gameTime, setGameTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);

    // Game states
    const [memoryCards, setMemoryCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    const [reactionTime, setReactionTime] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const [startTime, setStartTime] = useState(0);

    const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale
    const [breathingCount, setBreathingCount] = useState(0);


    const games = [
        {
            id: 'memory',
            title: 'Memory Game',
            description: 'Latih memori Anda dengan mencocokkan kartu',
            icon: <Brain className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30',
            benefits: ['Meningkatkan konsentrasi', 'Melatih memori jangka pendek', 'Mengurangi stres']
        },
        {
            id: 'reaction',
            title: 'Reaction Test',
            description: 'Uji kecepatan reaksi dan fokus Anda',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
            benefits: ['Meningkatkan refleks', 'Melatih fokus', 'Mengurangi kecemasan']
        },
        {
            id: 'breathing',
            title: 'Breathing Exercise',
            description: 'Latihan pernapasan untuk relaksasi',
            icon: <Heart className="w-8 h-8" />,
            color: 'from-green-500 to-teal-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30',
            benefits: ['Mengurangi stres', 'Meningkatkan fokus', 'Menenangkan pikiran']
        },
        {
            id: 'focus',
            title: 'Focus Training',
            description: 'Latihan konsentrasi dengan target bergerak',
            icon: <Target className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            benefits: ['Meningkatkan konsentrasi', 'Melatih kesabaran', 'Mengurangi distraksi']
        },
    ];

    // Memory Game Logic
    const initializeMemoryGame = () => {
        const symbols = ['🎯', '🌟', '💎', '🎨', '🎪', '🎭', '🎨', '🎪', '🎭', '🎯', '🌟', '💎'];
        const shuffled = symbols.sort(() => Math.random() - 0.5);
        setMemoryCards(shuffled.map((symbol, index) => ({ id: index, symbol, isFlipped: false })));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };

    const handleCardClick = (cardId) => {
        if (flippedCards.length >= 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlippedCards;
            const firstCard = memoryCards.find(card => card.id === first);
            const secondCard = memoryCards.find(card => card.id === second);

            if (firstCard.symbol === secondCard.symbol) {
                setMatchedCards([...matchedCards, first, second]);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    // Reaction Test Logic
    const startReactionTest = () => {
        setIsWaiting(true);
        setReactionTime(0);
        const delay = Math.random() * 3000 + 1000; // 1-4 seconds
        setTimeout(() => {
            setIsWaiting(false);
            setStartTime(Date.now());
        }, delay);
    };

    const handleReactionClick = () => {
        if (isWaiting) return;
        if (startTime === 0) {
            setStartTime(Date.now());
            return;
        }
        const reaction = Date.now() - startTime;
        setReactionTime(reaction);
        setIsPlaying(false);
    };

    // Breathing Exercise Logic
    const startBreathingExercise = () => {
        setIsPlaying(true);
        setBreathingCount(0);
        breathingCycle();
    };

    const breathingCycle = () => {
        if (!isPlaying) return;
        
        setBreathingPhase('inhale');
        setTimeout(() => {
            setBreathingPhase('hold');
            setTimeout(() => {
                setBreathingPhase('exhale');
                setTimeout(() => {
                    setBreathingCount(breathingCount + 1);
                    if (breathingCount < 4) {
                        breathingCycle();
                    } else {
                        setIsPlaying(false);
                        setBreathingPhase('inhale');
                        setBreathingCount(0);
                    }
                }, 4000);
            }, 4000);
        }, 4000);
    };

    // Focus Training Logic
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const [targetVisible, setTargetVisible] = useState(false);
    const [focusScore, setFocusScore] = useState(0);


    const startFocusTraining = () => {
        setIsPlaying(true);
        setFocusScore(0);
        moveTarget();
    };

    const moveTarget = () => {
        if (!isPlaying) return;
        
        const newX = Math.random() * 80 + 10;
        const newY = Math.random() * 80 + 10;
        setTargetPosition({ x: newX, y: newY });
        setTargetVisible(true);
        
        setTimeout(() => {
            setTargetVisible(false);
            setTimeout(() => {
                if (isPlaying) moveTarget();
            }, Math.random() * 2000 + 1000);
        }, 2000);
    };

    const handleTargetClick = () => {
        if (targetVisible) {
            setFocusScore(focusScore + 1);
            setTargetVisible(false);
        }
    };



    // Timer effect
    useEffect(() => {
        let interval;
        if (isPlaying && selectedGame === 'reaction') {
            interval = setInterval(() => {
                setGameTime(prev => prev + 1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, selectedGame]);

    const startGame = (gameId) => {
        setSelectedGame(gameId);
        setIsPlaying(true);
        setGameScore(0);
        setGameTime(0);
        
        switch (gameId) {
            case 'memory':
                initializeMemoryGame();
                break;
            case 'reaction':
                startReactionTest();
                break;
            case 'breathing':
                startBreathingExercise();
                break;
            case 'focus':
                startFocusTraining();
                break;
        }
    };

    const resetGame = () => {
        setIsPlaying(false);
        setGameScore(0);
        setGameTime(0);
        setSelectedGame(null);
        setReactionTime(0);
        setIsWaiting(false);
        setStartTime(0);
        setBreathingPhase('inhale');
        setBreathingCount(0);
        setTargetVisible(false);
        setFocusScore(0);
    };

    const saveGameResult = () => {
        const result = {
            game: selectedGame,
            score: gameScore,
            time: gameTime,
            date: new Date().toLocaleString('id-ID')
        };
        setGameHistory([...gameHistory, result]);
    };

    const renderGameContent = () => {
        switch (selectedGame) {
            case 'memory':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-white">Memory Game</h3>
                            <div className="text-white/70">Moves: {moves}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {memoryCards.map((card) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                                        flippedCards.includes(card.id) || matchedCards.includes(card.id)
                                            ? 'bg-white text-black'
                                            : 'bg-slate-700 border-slate-600 hover:border-purple-400'
                                    }`}
                                >
                                    {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
                                        <span className="text-2xl">{card.symbol}</span>
                                    ) : (
                                        <span className="text-2xl">?</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {matchedCards.length === memoryCards.length && (
                            <div className="text-center">
                                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold text-white mb-2">Selamat!</h4>
                                <p className="text-white/70">Anda menyelesaikan game dalam {moves} moves!</p>
                            </div>
                        )}
                    </div>
                );

            case 'reaction':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Reaction Test</h3>
                        <div className="bg-slate-700 rounded-lg p-8">
                            {isWaiting ? (
                                <div className="space-y-4">
                                    <div className="text-white/70">Tunggu warna hijau...</div>
                                    <div className="w-32 h-32 bg-red-500 rounded-full mx-auto"></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-white/70">Klik sekarang!</div>
                                    <button
                                        onClick={handleReactionClick}
                                        className="w-32 h-32 bg-green-500 hover:bg-green-400 rounded-full mx-auto transition-colors"
                                    ></button>
                                </div>
                            )}
                        </div>
                        {reactionTime > 0 && (
                            <div className="text-center">
                                <h4 className="text-xl font-bold text-white">Reaction Time: {reactionTime}ms</h4>
                                <p className="text-white/70">
                                    {reactionTime < 200 ? 'Sangat cepat!' : 
                                     reactionTime < 300 ? 'Cepat!' : 
                                     reactionTime < 500 ? 'Normal' : 'Perlu latihan'}
                                </p>
                            </div>
                        )}
                    </div>
                );

            case 'breathing':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Breathing Exercise</h3>
                        <div className="bg-slate-700 rounded-lg p-8">
                            <div className={`w-48 h-48 rounded-full mx-auto transition-all duration-4000 ${
                                breathingPhase === 'inhale' ? 'bg-green-500 scale-110' :
                                breathingPhase === 'hold' ? 'bg-blue-500 scale-110' :
                                'bg-teal-500 scale-100'
                            }`}></div>
                            <div className="mt-6">
                                <h4 className="text-2xl font-bold text-white mb-2">
                                    {breathingPhase === 'inhale' ? 'Tarik Napas' :
                                     breathingPhase === 'hold' ? 'Tahan' : 'Hembuskan'}
                                </h4>
                                <p className="text-white/70">Cycle: {breathingCount}/4</p>
                            </div>
                        </div>
                    </div>
                );

            case 'focus':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-white">Focus Training</h3>
                            <div className="text-white/70">Score: {focusScore}</div>
                        </div>
                        <div className="relative bg-slate-700 rounded-lg h-96">
                            {targetVisible && (
                                <button
                                    onClick={handleTargetClick}
                                    className="absolute w-8 h-8 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all duration-200"
                                    style={{
                                        left: `${targetPosition.x}%`,
                                        top: `${targetPosition.y}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                ></button>
                            )}
                        </div>
                        <p className="text-white/70 text-center">
                            Klik target kuning yang muncul untuk mendapat poin!
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming mood-tracker-bg pt-20">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center justify-center">
                            <Play className="w-8 h-8 mr-3" />
                            Games Interaktif
                        </h1>
                        <p className="text-white/70 text-lg">
                            Latih kemampuan kognitif dan kesehatan mental Anda dengan game yang menyenangkan
                        </p>
                        
                        {/* Stress Relief Game Link */}
                        <div className="mt-6">
                            <Link
                                href="/games/stress-relief"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                            >
                                <Heart className="w-5 h-5" />
                                <span>Stress Relief Garden</span>
                            </Link>
                        </div>
                    </div>

                    {!selectedGame ? (
                        /* Game Selection */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {games.map((game) => (
                                <div
                                    key={game.id}
                                    className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                                    onClick={() => startGame(game.id)}
                                >
                                    <div className="text-center">
                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-white`}>
                                            {game.icon}
                                        </div>
                                        <h3 className="text-white font-semibold text-lg mb-2">{game.title}</h3>
                                        <p className="text-white/70 text-sm mb-4">{game.description}</p>
                                        <div className="space-y-1">
                                            {game.benefits.map((benefit, index) => (
                                                <div key={index} className="text-cyan-400 text-xs">• {benefit}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Game Content */
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        onClick={resetGame}
                                        className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        <span>Kembali</span>
                                    </button>
                                    <div className="flex items-center space-x-4 text-white/70">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{gameTime}s</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Trophy className="w-4 h-4" />
                                            <span>{gameScore}</span>
                                        </div>
                                    </div>
                                </div>
                                {renderGameContent()}
                            </div>
                        </div>
                    )}

                    {/* Game History */}
                    {gameHistory.length > 0 && (
                        <div className="max-w-4xl mx-auto mt-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Riwayat Game</h3>
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                                <div className="space-y-3">
                                    {gameHistory.slice(-5).reverse().map((result, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-slate-600 rounded-lg">
                                            <div>
                                                <span className="text-white font-medium">{games.find(g => g.id === result.game)?.title}</span>
                                                <span className="text-white/70 text-sm ml-2">{result.date}</span>
                                            </div>
                                            <div className="text-cyan-400 font-semibold">Score: {result.score}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Benefits Section */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <h3 className="text-xl font-semibold text-white mb-6 text-center">Manfaat Game untuk Kesehatan Mental</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Meningkatkan Kognitif</h4>
                                <p className="text-white/70 text-sm">Game melatih memori, konsentrasi, dan kemampuan berpikir</p>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Mengurangi Stres</h4>
                                <p className="text-white/70 text-sm">Aktivitas menyenangkan membantu melepaskan ketegangan</p>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Meningkatkan Mood</h4>
                                <p className="text-white/70 text-sm">Pencapaian dalam game memberikan kepuasan dan kebahagiaan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
