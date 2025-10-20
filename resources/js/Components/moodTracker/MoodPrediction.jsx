import React from "react";

export default function MoodPrediction({ mlPrediction }) {
    if (!mlPrediction) return null;

    const getMoodEmoji = (mood) => {
        switch (mood) {
            case 'Amazing': return '🌟';
            case 'Good': return '😊';
            case 'Normal': return '😐';
            case 'Bad': return '😔';
            case 'Awful': return '😢';
            default: return '😐';
        }
    };

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                        {getMoodEmoji(mlPrediction.mood)}
                    </div>
                    <div>
                        <h4 className="text-white font-semibold">AI Mood Analysis</h4>
                        <p className="text-white/70 text-sm">
                            Prediksi: <span className="text-cyan-400 font-medium">{mlPrediction.mood}</span>
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-cyan-400 font-semibold">
                        {(mlPrediction.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-white/60 text-xs">Confidence</div>
                </div>
            </div>
        </div>
    );
}
