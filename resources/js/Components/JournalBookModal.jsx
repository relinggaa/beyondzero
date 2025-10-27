import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import coverBukuImage from '../../img/coverBuku.png';

export default function JournalBookModal({ journal, onClose, onEdit, onDelete }) {
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

    // Get all content fields
    const contentFields = [
        { key: 'gratitude', label: 'Rasa Syukur', color: 'blue-500' },
        { key: 'achievement', label: 'Pencapaian', color: 'green-500' },
        { key: 'challenge', label: 'Tantangan', color: 'orange-500' },
        { key: 'reflection', label: 'Refleksi', color: 'purple-500' },
        { key: 'tomorrow_goal', label: 'Tujuan Besok', color: 'cyan-500' },
        { key: 'affirmation', label: 'Afirmasi', color: 'pink-500' }
    ].filter(field => journal[field.key]);

    // Calculate items per page (roughly 2-3 items per page)
    const itemsPerPage = 2;
    const totalPages = Math.ceil(contentFields.length / itemsPerPage);

    // Create pages for this single journal
    const pages = [];
    
    // Page 1 - Cover with coverBuku.png image only
    pages.push(
        <div key="cover" className="page" style={{
            position: 'relative',
            padding: 0,
            margin: 0
        }}>
            <img 
                src={coverBukuImage} 
                alt="Book Cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    margin: 0,
                    padding: 0
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                    <div className="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm">
                        <span className="text-5xl">{journal.mood}</span>
                    </div>
                    <h1 className="text-6xl font-serif text-white mb-4 drop-shadow-2xl">{journal.title || 'Untitled'}</h1>
                    <p className="text-white/90 text-xl italic drop-shadow-lg">{formatDate(journal.date)}</p>
                </div>
            </div>
        </div>
    );

    // Content pages - split fields across multiple pages
    for (let i = 0; i < totalPages; i++) {
        const fieldsForThisPage = contentFields.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
        
        pages.push(
            <div key={`content-${i}`} className="page" style={{
                position: 'relative',
                backgroundColor: '#0f172a'
            }}>
                
                <div className="w-full h-full p-8 relative overflow-y-auto">
                    <div className="space-y-4">
                        {fieldsForThisPage.map((field) => (
                            <div key={field.key} className={`bg-slate-800/50 border-l-4 border-${field.color} p-4 rounded-r`}>
                                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-2 font-serif font-bold">
                                    {field.label}
                                </h4>
                                <p className="text-white/90 text-sm leading-relaxed font-serif">
                                    {journal[field.key]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 z-50 text-white hover:text-white hover:bg-white/10 p-3 rounded-full transition-all duration-200"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Book Container - Centered */}
            <div className="flex items-center justify-center max-w-[1200px] w-full h-[calc(100vh-120px)] mx-auto mt-20">
                <div className="w-full flex items-center justify-center">
                    <div className="relative w-full h-[550px] flex items-center justify-center max-w-[1400px]">
                        {/* Book Shelf/Stand */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[800px] h-[750px] bg-gradient-to-b from-slate-800/20 via-slate-900/10 to-slate-800/20 rounded-3xl blur-3xl opacity-50"></div>
                        </div>

                        {/* Book Container with Border */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-black/50 blur-3xl rounded-lg transform translate-y-8"></div>
                            
                            <div className="relative p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border-4 border-slate-600" style={{
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}>
                                <HTMLFlipBook
                                    width={700}
                                    height={750}
                                    minWidth={400}
                                    maxWidth={700}
                                    minHeight={500}
                                    maxHeight={750}
                                    size="stretch"
                                    maxShadowOpacity={0.8}
                                    showCover={false}
                                    flippingTime={600}
                                    onFlip={(e) => {
                                        setCurrentPage(e.data);
                                    }}
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
                </div>

                {/* Action Buttons - Outside the book */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                    <button
                        onClick={() => onEdit && onEdit(journal)}
                        className="bg-white hover:bg-white/90 text-black py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg"
                    >
                        Edit Journal
                    </button>
                    <button
                        onClick={() => onDelete && onDelete(journal.id)}
                        className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                    >
                        Hapus Journal
                    </button>
                </div>
            </div>
        </div>
    );
}

