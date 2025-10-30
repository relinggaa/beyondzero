import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import coverBukuImage from '../../img/coverBuku.png';
import vectorModalBookImage from '../../img/vector_modal_book.png';

export default function JournalBookModal({ journal, onClose, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isOpening, setIsOpening] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    // Close animation after opening
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpening(false);
            setIsAnimating(false);
        }, 800); // Match the animation duration
        return () => clearTimeout(timer);
    }, []);

    // track viewport to adapt book size on mobile
    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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
    
    // Page 1 - Cover with coverBuku.png image
    pages.push(
        <div key="cover" className="page" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }}>
            {/* Cover Image */}
            <img 
                src={coverBukuImage} 
                alt="Book Cover"
                className="w-full h-full object-cover"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
            
            {/* Content Overlay */}
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

    const handleClose = (e) => {
        if (e) {
            e.stopPropagation();
        }
        onClose();
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] ${isOpening ? 'overflow-hidden' : ''}`} 
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e?.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 z-[10000] text-white hover:text-white hover:bg-white/10 p-3 rounded-full transition-all duration-200 cursor-pointer"
                type="button"
                aria-label="Close modal"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Book Only - Centered with zoom-in animation */}
            <div 
                className={`flex ${isMobile ? 'items-start pt-2' : 'items-center'} justify-center h-full transition-all duration-800 ${isOpening ? 'animate-zoomInFromBook' : ''}`}
            >
                {/* Vector Book Illustration - Desktop Left / Mobile Top */}
                <div className="hidden lg:block absolute left-8 z-0 pointer-events-none">
                    <img 
                        src={vectorModalBookImage} 
                        alt="Vector Book"
                        className="max-w-md opacity-80"
                        style={{ maxHeight: '80vh' }}
                    />
                </div>
                <div className="lg:hidden absolute -top-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
                    <img src={vectorModalBookImage} alt="Vector Book" className="w-28 opacity-80" />
                </div>

                <div className={`relative flex flex-col items-center justify-center ${isMobile ? 'mt-2' : 'mt-5'} ${isOpening ? 'animate-openBook' : ''}`}>
                    <HTMLFlipBook
                        width={isMobile ? 260 : 700}
                        height={isMobile ? 460 : 900}
                        minWidth={isMobile ? 240 : 400}
                        maxWidth={isMobile ? 300 : 700}
                        minHeight={isMobile ? 420 : 500}
                        maxHeight={isMobile ? 520 : 900}
                        size="stretch"
                        maxShadowOpacity={0.8}
                        showCover={true}
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

                    {/* Action Buttons */}
                    <div className="mt-8 flex space-x-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onEdit) onEdit(journal);
                            }}
                            className="bg-white hover:bg-white/90 text-black py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg"
                        >
                            Edit Journal
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onDelete) onDelete(journal.id);
                            }}
                            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            Hapus Journal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

