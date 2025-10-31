import Carousel from '../../Components/Carousel'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Star } from 'lucide-react';

export default function ServicesSection() {
    const [carouselNav, setCarouselNav] = useState({ next: null, prev: null });
    const carouselRef = useRef(null);

    return (
        <div className="w-full py-16 px-4 bg-black pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center mb-4">
                        <Brain className="w-8 h-8 text-white mr-3" />
                        <h2 className="text-4xl font-bold text-white">
                            Layanan Kesehatan Mental Kami
                        </h2>
                    </div>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                        Platform komprehensif untuk mendukung perjalanan kesehatan mental Anda dengan teknologi terdepan dan pendekatan yang personal.
                    </p>
                </motion.div>

                {/* Content Wrapper - Carousel */}
                <div className="w-full mx-auto relative px-4 md:px-0" style={{ overflow: 'visible' }}>
                    {/* Arrows - di luar container */}
                    <button
                        onClick={() => carouselNav.prev?.()}
                        className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-[9999] bg-black hover:bg-gray-900 text-white rounded-full p-3 md:p-5 border-2 border-white/60 shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        aria-label="Previous slide"
                        style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 1,
                            visibility: 'visible',
                            pointerEvents: 'auto'
                        }}
                    >
                        <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button
                        onClick={() => carouselNav.next?.()}
                        className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-[9999] bg-black hover:bg-gray-900 text-white rounded-full p-3 md:p-5 border-2 border-white/60 shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        aria-label="Next slide"
                        style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 1,
                            visibility: 'visible',
                            pointerEvents: 'auto'
                        }}
                    >
                        <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                    
                    {/* Carousel - konten sama lebarnya dengan CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full"
                        style={{ overflow: 'visible', position: 'relative' }}
                        id="carousel-wrapper"
                    >
                        <Carousel
                            ref={carouselRef}
                            baseWidth={1200}
                            autoplay={true}
                            autoplayDelay={8000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                            showArrows={false}
                            onNavigate={setCarouselNav}
                        />
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 w-full mx-auto px-4 md:px-0"
                >
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-8 md:p-10 border border-white/10 text-center">
                        <Star className="w-10 h-10 text-white mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                            Temukan Layanan yang Tepat untuk Anda
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-center leading-relaxed">
                            Jelajahi berbagai layanan kesehatan mental kami yang dirancang khusus untuk mendukung perjalanan kesejahteraan mental Anda.
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/login"
                            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                        >
                            Mulai Sekarang
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}