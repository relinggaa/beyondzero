import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import PsikologCard from '../../Components/PsikologCard';
import PsikologModal from '../../Components/PsikologModal';
import { ChevronLeft, ChevronRight, Users, Star } from 'lucide-react';

const PsikologSection = () => {
  const [psikologs, setPsikologs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPsikologs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/psikologs');
        const data = await response.json();
        
        if (data.success) {
          setPsikologs(data.data);
        } else {
          setError('Gagal mengambil data psikolog');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data psikolog');
        console.error('Error fetching psikologs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPsikologs();
  }, []);

  // Calculate number of slides (3 cards per slide)
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(psikologs.length / cardsPerSlide);

  // Group psikologs into slides
  const getPsikologsForSlide = (slideIndex) => {
    const start = slideIndex * cardsPerSlide;
    const end = start + cardsPerSlide;
    return psikologs.slice(start, end);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="psikolog-section ">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Memuat data psikolog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="psikolog-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (psikologs.length === 0) {
    return (
      <div className="psikolog-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-white">Belum ada psikolog yang tersedia.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="psikolog-section pt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-white mr-3" />
            <h2 className="text-4xl font-bold text-white">
              Tim Psikolog Profesional Kami
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Temui tim psikolog berpengalaman yang siap membantu perjalanan kesehatan mental Anda dengan pendekatan yang personal dan profesional.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="stat-card">
            <div className="stat-number">{psikologs.length}+</div>
            <div className="stat-label">Psikolog Profesional</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Klien Terbantu</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Tingkat Kepuasan</div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="carousel-nav carousel-nav-left"
            aria-label="Previous psikolog"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="carousel-nav carousel-nav-right"
            aria-label="Next psikolog"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="carousel-container">
            <motion.div
              className="carousel-track"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="carousel-slide">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getPsikologsForSlide(slideIndex).map((psikolog) => (
                      <PsikologCard key={psikolog.id} psikolog={psikolog} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="carousel-indicators">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

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
              Siap Memulai Perjalanan Kesehatan Mental Anda?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Pilih psikolog yang sesuai dengan kebutuhan Anda dan mulailah konseling profesional untuk kesejahteraan mental yang lebih baik.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button"
              onClick={() => setIsModalOpen(true)}
            >
              Lihat Semua Psikolog
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Modal */}
      <PsikologModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default PsikologSection;
