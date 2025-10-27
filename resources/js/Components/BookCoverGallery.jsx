import React from 'react';
import coverBukuImage from '../../img/coverBuku.png';

export default function BookCoverGallery({ journals = [], onJournalClick }) {
    const formatDateShort = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { 
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {journals.map((journal, index) => (
                <button
                    key={journal.id}
                    onClick={() => onJournalClick && onJournalClick(journal)}
                    className="group relative transform transition-all duration-300 hover:scale-110 hover:z-10"
                    style={{
                        perspective: '1000px',
                        transform: `rotateY(${-index * 2}deg) translateZ(${index * 10}px)`
                    }}
                >
                    {/* Book Cover dengan gambar coverBuku.png */}
                    <div 
                        className="relative w-full h-[400px] rounded-lg shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-3xl"
                        style={{
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            backgroundImage: `url(${coverBukuImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* Overlay untuk readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

                        {/* Cover Content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">
                            {/* Icon */}
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-5 shadow-xl backdrop-blur-sm">
                                <span className="text-4xl">{journal.mood}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-serif text-2xl font-bold mb-3 line-clamp-2 px-2 drop-shadow-lg">
                                {journal.title || 'Untitled'}
                            </h3>

                            {/* Date */}
                            <p className="text-white/90 text-sm mb-6 drop-shadow-md">
                                {formatDateShort(journal.date)}
                            </p>

                            {/* Decorative line */}
                            <div className="flex items-center space-x-2 w-24">
                                <div className="flex-1 h-px bg-white/60"></div>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <div className="flex-1 h-px bg-white/60"></div>
                            </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Click hint */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                            Click to read
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}

