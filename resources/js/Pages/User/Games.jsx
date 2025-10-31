import React, { useState, useEffect } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import { Brain, Heart, Zap, Target, Trophy, Play, RotateCcw, Clock, Mic, Search, User, Gamepad2, Puzzle, Activity, Sparkles, Star, Crown } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Games() {
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameScore, setGameScore] = useState(0);
    const [gameTime, setGameTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

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
            title: 'Memory Match',
            description: 'Latih memori dengan mencocokkan kartu',
            icon: <Brain className="w-12 h-12" />,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
            borderColor: 'border-purple-500/30',
            category: 'Brain Training',
            difficulty: 'Easy',
            rating: 4.5,
            players: '1 Player'
        },
        {
            id: 'reaction',
            title: 'Speed Reflex',
            description: 'Uji kecepatan reaksi Anda',
            icon: <Zap className="w-12 h-12" />,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-400',
            borderColor: 'border-yellow-500/30',
            category: 'Action',
            difficulty: 'Medium',
            rating: 4.2,
            players: '1 Player'
        },
        {
            id: 'breathing',
            title: 'Zen Breathing',
            description: 'Latihan pernapasan relaksasi',
            icon: <Heart className="w-12 h-12" />,
            color: 'from-green-500 to-teal-500',
            bgColor: 'bg-gradient-to-br from-green-400 to-teal-400',
            borderColor: 'border-green-500/30',
            category: 'Wellness',
            difficulty: 'Easy',
            rating: 4.8,
            players: '1 Player'
        },
        {
            id: 'focus',
            title: 'Focus Master',
            description: 'Latihan konsentrasi target',
            icon: <Target className="w-12 h-12" />,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-400',
            borderColor: 'border-blue-500/30',
            category: 'Training',
            difficulty: 'Hard',
            rating: 4.3,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'puzzle',
            title: 'Mind Puzzle',
            description: 'Puzzle logika untuk otak',
            icon: <Puzzle className="w-12 h-12" />,
            color: 'from-indigo-500 to-purple-500',
            bgColor: 'bg-gradient-to-br from-indigo-400 to-purple-400',
            borderColor: 'border-indigo-500/30',
            category: 'Puzzle',
            difficulty: 'Medium',
            rating: 4.6,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'meditation',
            title: 'Peace Garden',
            description: 'Meditasi dan ketenangan',
            icon: <Sparkles className="w-12 h-12" />,
            color: 'from-emerald-500 to-green-500',
            bgColor: 'bg-gradient-to-br from-emerald-400 to-green-400',
            borderColor: 'border-emerald-500/30',
            category: 'Meditation',
            difficulty: 'Easy',
            rating: 4.9,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'math',
            title: 'Number Crunch',
            description: 'Game matematika seru',
            icon: <Activity className="w-12 h-12" />,
            color: 'from-red-500 to-pink-500',
            bgColor: 'bg-gradient-to-br from-red-400 to-pink-400',
            borderColor: 'border-red-500/30',
            category: 'Educational',
            difficulty: 'Medium',
            rating: 4.1,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'stress-relief',
            title: 'Stress Relief Garden',
            description: 'Taman relaksasi interaktif',
            icon: <Heart className="w-12 h-12" />,
            color: 'from-emerald-500 to-green-500',
            bgColor: 'bg-gradient-to-br from-emerald-400 to-green-400',
            borderColor: 'border-emerald-500/30',
            category: 'Wellness',
            difficulty: 'Easy',
            rating: 4.7,
            players: '1 Player',
            isSpecial: true
        },
        {
            id: 'color-therapy',
            title: 'Color Therapy',
            description: 'Terapi warna untuk relaksasi',
            icon: <Sparkles className="w-12 h-12" />,
            color: 'from-pink-500 to-purple-500',
            bgColor: 'bg-gradient-to-br from-pink-400 to-purple-400',
            borderColor: 'border-pink-500/30',
            category: 'Therapy',
            difficulty: 'Easy',
            rating: 4.4,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'sound-healing',
            title: 'Sound Healing',
            description: 'Terapi suara untuk ketenangan',
            icon: <Mic className="w-12 h-12" />,
            color: 'from-teal-500 to-blue-500',
            bgColor: 'bg-gradient-to-br from-teal-400 to-blue-400',
            borderColor: 'border-teal-500/30',
            category: 'Therapy',
            difficulty: 'Easy',
            rating: 4.6,
            players: '1 Player',
            isComingSoon: true
        },
        {
            id: 'mindfulness',
            title: 'Mindfulness',
            description: 'Latihan kesadaran penuh',
            icon: <Brain className="w-12 h-12" />,
            color: 'from-violet-500 to-purple-500',
            bgColor: 'bg-gradient-to-br from-violet-400 to-purple-400',
            borderColor: 'border-violet-500/30',
            category: 'Meditation',
            difficulty: 'Medium',
            rating: 4.8,
            players: '1 Player',
            isComingSoon: true
        },
    ];

    const getThumbnail = (gameId) => {
        switch (gameId) {
            case 'memory':
                return 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop';
            case 'reaction':
                return 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170';
            case 'breathing':
                return 'https://plus.unsplash.com/premium_photo-1674081975816-9fcd2abeec38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074';
            case 'focus':
                return 'https://images.unsplash.com/photo-1504507926084-34cf0b939964?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170';
            case 'puzzle':
                return 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop';
            case 'meditation':
                return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop';
            case 'math':
                return 'https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=1200&auto=format&fit=crop';
            case 'color-therapy':
                return 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop';
            case 'sound-healing':
                return 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop';
            case 'mindfulness':
                return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop';
            default:
                return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop';
        }
    };

    // Filter games berdasarkan kategori dan search
    const filteredGames = games.filter(game => {
        const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get unique categories
    const categories = ['All', ...new Set(games.map(game => game.category))];

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
            case 'puzzle':
            case 'meditation':
            case 'math':
            case 'color-therapy':
            case 'sound-healing':
            case 'mindfulness':
                // Game coming soon - tidak perlu inisialisasi khusus
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
                            <h3 className="text-xl font-semibold text-white">Memory Match</h3>
                            <div className="text-white/70">Moves: {moves}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {memoryCards.map((card) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
                                        flippedCards.includes(card.id) || matchedCards.includes(card.id)
                                            ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg'
                                            : 'bg-slate-700 border-slate-600 hover:border-purple-400 hover:shadow-md'
                                    }`}
                                >
                                    {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
                                        <span className="text-2xl">{card.symbol}</span>
                                    ) : (
                                        <span className="text-2xl text-white/60">?</span>
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
                        <h3 className="text-xl font-semibold text-white">Speed Reflex</h3>
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl p-8">
                            {isWaiting ? (
                                <div className="space-y-4">
                                    <div className="text-white font-medium">Tunggu warna hijau...</div>
                                    <div className="w-32 h-32 bg-red-500 rounded-full mx-auto shadow-lg"></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-white font-medium">Klik sekarang!</div>
                                    <button
                                        onClick={handleReactionClick}
                                        className="w-32 h-32 bg-green-500 hover:bg-green-400 rounded-full mx-auto transition-colors shadow-lg hover:shadow-xl"
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
                        <h3 className="text-xl font-semibold text-white">Zen Breathing</h3>
                        <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl p-8">
                            <div className={`w-48 h-48 rounded-full mx-auto transition-all duration-4000 shadow-lg ${
                                breathingPhase === 'inhale' ? 'bg-green-500 scale-110' :
                                breathingPhase === 'hold' ? 'bg-blue-500 scale-110' :
                                'bg-teal-500 scale-100'
                            }`}></div>
                            <div className="mt-6">
                                <h4 className="text-2xl font-bold text-white mb-2">
                                    {breathingPhase === 'inhale' ? 'Tarik Napas' :
                                     breathingPhase === 'hold' ? 'Tahan' : 'Hembuskan'}
                                </h4>
                                <p className="text-white font-medium">Cycle: {breathingCount}/4</p>
                            </div>
                        </div>
                    </div>
                );

            case 'focus':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Focus Master</h3>
                        <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl p-8">
                            <div className="text-white">
                                <Target className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Game latihan konsentrasi sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'puzzle':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Mind Puzzle</h3>
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl p-8">
                            <div className="text-white">
                                <Puzzle className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Game puzzle logika sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'meditation':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Peace Garden</h3>
                        <div className="bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl p-8">
                            <div className="text-white">
                                <Sparkles className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Garden meditasi interaktif sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'math':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Number Crunch</h3>
                        <div className="bg-gradient-to-br from-red-400 to-pink-400 rounded-xl p-8">
                            <div className="text-white">
                                <Activity className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Game matematika seru sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'color-therapy':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Color Therapy</h3>
                        <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl p-8">
                            <div className="text-white">
                                <Sparkles className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Terapi warna untuk relaksasi sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'sound-healing':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Sound Healing</h3>
                        <div className="bg-gradient-to-br from-teal-400 to-blue-400 rounded-xl p-8">
                            <div className="text-white">
                                <Mic className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Terapi suara untuk ketenangan sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            case 'mindfulness':
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Mindfulness</h3>
                        <div className="bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl p-8">
                            <div className="text-white">
                                <Brain className="w-24 h-24 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">Coming Soon!</h4>
                                <p className="text-white/80">Latihan kesadaran penuh sedang dalam pengembangan</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-semibold text-white">Game Tidak Ditemukan</h3>
                        <div className="bg-slate-700 rounded-xl p-8">
                            <Gamepad2 className="w-24 h-24 mx-auto mb-4 text-white/40" />
                            <h4 className="text-2xl font-bold mb-2 text-white">Oops!</h4>
                            <p className="text-white/70">Game yang Anda cari tidak tersedia</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <LayoutUser>
            <style jsx>{`
                .line-clamp-1 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                .line-clamp-2 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            `}</style>
            <div className="min-h-screen pt-20 pb-12 relative bg-gradient-to-br from-slate-900 via-blue-900 to-black">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/50 to-black/80"></div>
                <div className="container mx-auto px-4 py-8 relative z-10">
                    {/* Search & Filter */}
                    <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 border border-blue-800/30 shadow-2xl backdrop-blur-sm">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200/70" />
                            <input
                                type="text"
                                placeholder="Cari game yang Anda inginkan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-blue-700/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-blue-200/60"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md border border-blue-500/30'
                                            : 'bg-slate-800/60 text-blue-100 border border-blue-700/30 hover:bg-slate-700 hover:text-white'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!selectedGame ? (
                        <>
                            {/* Game Selection Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
                                {filteredGames.map((game) => (
                                    <div
                                        key={game.id}
                                        className={`relative group transform transition-all duration-300 hover:-translate-y-1 ${
                                            game.isSpecial ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                                        }`}
                                    >
                                        {/* Special Badge */}
                                        {game.isSpecial && (
                                            <div className="absolute -top-2 -right-2 z-10">
                                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                                                    <Crown className="w-3 h-3" />
                                                    <span>FEATURED</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Coming Soon Badge */}
                                        {game.isComingSoon && (
                                            <div className="absolute -top-2 -left-2 z-10">
                                                <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 border border-slate-500/50">
                                                    <Clock className="w-3 h-3" />
                                                    <span>COMING SOON</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Game Card - image + bottom panel */}
                                        <div className="rounded-2xl overflow-hidden bg-slate-900/80 border border-blue-800/30 shadow-xl">
                                            {/* Image */}
                                            <div className="h-32 w-full bg-slate-800">
                                                <img src={getThumbnail(game.id)} alt={game.title} className="w-full h-full object-cover" />
                                            </div>
                                            {/* Bottom content */}
                                            <div className="p-4">
                                                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{game.title}</h3>
                                                <p className="text-blue-100 text-xs mb-3 line-clamp-2">{game.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-blue-200 text-xs flex items-center space-x-2">
                                                        <User className="w-3.5 h-3.5" />
                                                        <span>{game.players}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            if (game.isComingSoon) {
                                                                return;
                                                            }
                                                            if (game.id === 'stress-relief') {
                                                                window.location.href = '/games/stress-relief';
                                                            } else {
                                                                startGame(game.id);
                                                            }
                                                        }}
                                                        disabled={game.isComingSoon}
                                                        className={`px-3 py-1.5 text-white text-xs rounded-md border ${
                                                            game.isComingSoon
                                                                ? 'bg-slate-600 text-slate-400 cursor-not-allowed border-slate-500/40'
                                                                : 'bg-blue-600 hover:bg-blue-700 border-blue-500/40'
                                                        }`}
                                                    >
                                                        {game.isComingSoon ? 'Coming Soon' : 'Join'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Difficulty Indicator */}
                                        <div className="absolute bottom-2 right-2">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                game.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                                                game.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                                                'bg-red-500 text-white'
                                            }`}>
                                                {game.difficulty === 'Easy' ? 'E' : game.difficulty === 'Medium' ? 'M' : 'H'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* No Games Found */}
                            {filteredGames.length === 0 && (
                                <div className="text-center py-12">
                                    <Gamepad2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-2">Tidak ada game ditemukan</h3>
                                    <p className="text-white/60">Coba ubah kata kunci pencarian atau kategori filter</p>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Game Content */
                        <div className="max-w-4xl mx-auto">
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 border border-blue-800/30 shadow-2xl backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        onClick={resetGame}
                                        className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        <span>Kembali ke Menu</span>
                                    </button>
                                    <div className="flex items-center space-x-4 text-blue-100">
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
                            <h3 className="text-xl font-semibold text-white mb-4">Riwayat Game Terbaru</h3>
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 border border-blue-800/30 shadow-2xl backdrop-blur-sm">
                                <div className="space-y-3">
                                    {gameHistory.slice(-5).reverse().map((result, index) => (
                                        <div key={index} className="flex justify-between items-center p-4 bg-slate-800/60 border border-blue-700/30 rounded-xl hover:bg-slate-800 transition-colors">
                                            <div>
                                                <span className="text-white font-medium">{games.find(g => g.id === result.game)?.title}</span>
                                                <span className="text-white/60 text-sm ml-2">{result.date}</span>
                                            </div>
                                            <div className="text-blue-300 font-semibold">Score: {result.score}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Game Statistics */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <h3 className="text-xl font-semibold text-white mb-6 text-center">Statistik Game</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30">
                                <div className="text-2xl font-bold text-cyan-400">{games.length}</div>
                                <div className="text-white/70 text-sm">Total Game</div>
                            </div>
                            <div className="p-4 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30">
                                <div className="text-2xl font-bold text-blue-300">{categories.length - 1}</div>
                                <div className="text-white/70 text-sm">Kategori</div>
                            </div>
                            <div className="p-4 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30">
                                <div className="text-2xl font-bold text-emerald-400">{games.filter(g => g.difficulty === 'Easy').length}</div>
                                <div className="text-white/70 text-sm">Game Mudah</div>
                            </div>
                            <div className="p-4 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30">
                                <div className="text-2xl font-bold text-orange-400">{gameHistory.length}</div>
                                <div className="text-white/70 text-sm">Game Dimainkan</div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <h3 className="text-xl font-semibold text-white mb-6 text-center">Manfaat Game untuk Kesehatan Mental</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30 hover:shadow-xl transition-shadow">
                                <Brain className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Meningkatkan Kognitif</h4>
                                <p className="text-white/70 text-sm">Game melatih memori, konsentrasi, dan kemampuan berpikir</p>
                            </div>
                            <div className="p-6 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30 hover:shadow-xl transition-shadow">
                                <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                <h4 className="text-white font-semibold mb-2">Mengurangi Stres</h4>
                                <p className="text-white/70 text-sm">Aktivitas menyenangkan membantu melepaskan ketegangan</p>
                            </div>
                            <div className="p-6 text-center rounded-2xl bg-slate-900/80 border border-blue-800/30 hover:shadow-xl transition-shadow">
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
