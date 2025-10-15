import React from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function Healing() {
    const healingGames = [
        {
            id: 1,
            title: "Meditation Journey",
            description: "Perjalanan meditasi yang menenangkan pikiran dan mengurangi stres. Nikmati pengalaman relaksasi yang mendalam.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            category: "Relaxation",
            duration: "15 min"
        },
        {
            id: 2,
            title: "Breathing Exercise",
            description: "Latihan pernapasan yang membantu mengatur detak jantung dan menciptakan ketenangan batin.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
            category: "Breathing",
            duration: "10 min"
        },
        {
            id: 3,
            title: "Mindful Coloring",
            description: "Aktivitas mewarnai yang meningkatkan fokus dan konsentrasi. Biarkan kreativitas mengalir bebas.",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            category: "Creativity",
            duration: "20 min"
        },
        {
            id: 4,
            title: "Gratitude Journal",
            description: "Tuliskan hal-hal yang Anda syukuri hari ini. Latihan ini membantu meningkatkan mood positif.",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
            category: "Gratitude",
            duration: "5 min"
        },
        {
            id: 5,
            title: "Nature Sounds",
            description: "Dengarkan suara alam yang menenangkan. Hujan, ombak, dan burung berkicau untuk relaksasi.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            category: "Nature",
            duration: "30 min"
        },
        {
            id: 6,
            title: "Yoga Flow",
            description: "Gerakan yoga yang lembut untuk meregangkan tubuh dan menenangkan pikiran. Cocok untuk pemula.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
            category: "Movement",
            duration: "25 min"
        }
    ];

    return (
        <LayoutUser>
            
            <div className="p-4 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        Healing Games
                    </h1>
                    <p className="text-white/70 text-lg">
                        Pilih aktivitas healing yang sesuai dengan kebutuhan Anda
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {healingGames.map((game) => (
                        <div key={game.id} className="group">
                            <div className="bg-slate-700 rounded-2xl overflow-hidden border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                {/* Game Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-slate-800/80 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                                            {game.duration}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            {game.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Game Content */}
                                <div className="p-6">
                                    <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                                        {game.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                                        {game.description}
                                    </p>

                                    {/* Play Button */}
                                    <button className="w-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 font-medium flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Mainkan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Motivational Section */}
                <div className="mt-12 bg-gradient-to-r from-cyan-400/10 to-teal-500/10 rounded-2xl p-8 border border-cyan-400/20">
                    <div className="text-center">
                        <span className="text-6xl mb-4 block">🧘‍♀️</span>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            "Healing adalah perjalanan, bukan destinasi"
                        </h3>
                        <p className="text-white/70 text-lg">
                            Setiap aktivitas healing yang Anda lakukan adalah langkah menuju kesejahteraan mental yang lebih baik.
                        </p>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
