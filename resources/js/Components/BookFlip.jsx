import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function BookFlip({ journals = [], onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Create pages array
    const pages = [];
    
    // Add cover page
    pages.push(
        <div key="cover" className="page bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 border-8 border-slate-600" style={{
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)'
        }}>
            <div className="text-center">
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white/30"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white/30"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-white/30"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-white/30"></div>
                
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-5xl font-serif text-white mb-4">My Journal</h1>
                <p className="text-white/70 text-lg italic">Bagikan perjalanan Anda</p>
                <div className="mt-6 inline-block bg-white/10 border-2 border-white/30 px-4 py-2 rounded-full">
                    <p className="text-white text-sm font-bold">{journals.length} Entri</p>
            </div>
                
                {/* Decorative line */}
                <div className="mt-8 flex items-center justify-center space-x-2">
                    <div className="w-20 h-px bg-white/30"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-20 h-px bg-white/30"></div>
                </div>
                </div>
            </div>
        );

    // Add journal pages - one journal per page
    journals.forEach((journal) => {
        pages.push(
            <div key={journal.id} className="page bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative" style={{
                boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Page number at bottom */}
                <div className="absolute bottom-2 right-4 text-white/30 text-xs font-serif">
                    {pages.length}
                </div>

                <div className="w-full h-full p-8 flex flex-col overflow-y-auto">
                    {/* Header with decorative line */}
                    <div className="mb-4">
                        {/* Decorative horizontal line at top */}
                        <div className="border-t-2 border-white/20 mb-6"></div>
                        
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-white/10 border-2 border-white/30 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">{journal.mood}</span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-white font-serif text-2xl mb-1">{journal.title || 'Untitled'}</h2>
                                <p className="text-white/50 text-xs">{formatDate(journal.date)}</p>
                        </div>
                        </div>

                        {/* Decorative divider */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex-1 h-px bg-white/20"></div>
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <div className="flex-1 h-px bg-white/20"></div>
                    </div>
                </div>

                    {/* Content - All journal fields */}
                    <div className="space-y-3 text-white flex-1">
                                {journal.gratitude && (
                            <div className="bg-white/5 border-l-4 border-blue-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold">Rasa Syukur</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif">{journal.gratitude}</p>
                                    </div>
                                )}
                                {journal.achievement && (
                            <div className="bg-white/5 border-l-4 border-green-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold">Pencapaian</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif">{journal.achievement}</p>
                                    </div>
                                )}
                                {journal.challenge && (
                            <div className="bg-white/5 border-l-4 border-orange-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold">Tantangan</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif">{journal.challenge}</p>
                                    </div>
                                )}
                                {journal.reflection && (
                            <div className="bg-white/5 border-l-4 border-purple-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold">Refleksi</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif">{journal.reflection}</p>
                                    </div>
                                )}
                                {journal.tomorrow_goal && (
                            <div className="bg-white/5 border-l-4 border-cyan-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold">Tujuan Besok</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif">{journal.tomorrow_goal}</p>
                                    </div>
                                )}
                                {journal.affirmation && (
                            <div className="bg-white/5 border-l-4 border-pink-500 p-3 rounded-r">
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-1 font-serif font-bold italic">Afirmasi</h4>
                                <p className="text-white/90 text-xs leading-relaxed font-serif italic">"{journal.affirmation}"</p>
                                    </div>
                                )}
                            </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t border-white/20 mt-4">
                        <button
                            onClick={() => onEdit && onEdit(journal)}
                            className="flex-1 bg-white hover:bg-white/90 text-black py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-xs font-bold"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(journal.id)}
                            className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-xs font-medium"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
                        </div>
        );
    });

    // If no journals, show empty state
    if (journals.length === 0) {
        pages.push(
            <div key="empty" className="page bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-24 h-24 bg-white/10 border-4 border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-serif text-white mb-4">Belum ada jurnal</h2>
                    <p className="text-white/70 italic">Mulai menulis jurnal pertama Anda</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-8 relative">
            {/* Book Shelf/Stand */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[650px] h-[900px] bg-gradient-to-b from-slate-800/20 via-slate-900/10 to-slate-800/20 rounded-3xl blur-3xl opacity-50"></div>
            </div>

            {/* Book Container with Border */}
            <div className="relative">
                {/* Book Shadow Underneath */}
                <div className="absolute inset-0 bg-black/50 blur-3xl rounded-lg transform translate-y-8"></div>
                
                {/* Book Frame */}
                <div className="relative p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border-4 border-slate-600" style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
                    <HTMLFlipBook
                        width={550}
                        height={750}
                        minWidth={300}
                        maxWidth={550}
                        minHeight={400}
                        maxHeight={750}
                        size="stretch"
                        maxShadowOpacity={0.8}
                        showCover={false}
                        flippingTime={600}
                        onFlip={(e) => setCurrentPage(e.data)}
                        className="cursor-pointer"
                        startPage={0}
                        drawShadow={true}
                        mobileScrollSupport={true}
                        clickEventForward={true}
                    >
                        {pages.map((page, index) => (
                            <div key={index}>
                                {page}
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>
            </div>

            {/* Page Indicator */}
            {pages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600 shadow-lg z-10">
                    <span className="text-slate-300 text-sm">
                        Page {currentPage + 1} / {pages.length}
                    </span>
                </div>
            )}

            {/* Reading Light Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-white/5 blur-2xl pointer-events-none"></div>
        </div>
    );
}

