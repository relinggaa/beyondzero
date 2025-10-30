import Carousel from '../../Components/Carousel'
import React from 'react';
import { motion } from 'motion/react';
import { Brain, Star } from 'lucide-react';

export default function ServicesSection() {
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
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto text-justify">
                        Platform komprehensif untuk mendukung perjalanan kesehatan mental Anda dengan teknologi terdepan dan pendekatan yang personal.
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center w-full"
                >
                    <Carousel
                        baseWidth={1200}
                        autoplay={true}
                        autoplayDelay={8000}
                        pauseOnHover={true}
                        loop={true}
                        round={false}
                    />
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-8 border border-white/10">
                        <Star className="w-12 h-12 text-white mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Temukan Layanan yang Tepat untuk Anda
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-justify">
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