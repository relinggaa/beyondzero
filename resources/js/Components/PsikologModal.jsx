import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, GraduationCap, Clock, Heart, Lightbulb, Search } from 'lucide-react';

const PsikologModal = ({ isOpen, onClose }) => {
  const [psikologs, setPsikologs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPsikologs, setFilteredPsikologs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchPsikologs();
    }
  }, [isOpen]);

  // Filter psikologs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPsikologs(psikologs);
    } else {
      const filtered = psikologs.filter(psikolog => {
        const searchLower = searchTerm.toLowerCase();
        return (
          psikolog.name.toLowerCase().includes(searchLower) ||
          psikolog.description.toLowerCase().includes(searchLower) ||
          psikolog.education.toLowerCase().includes(searchLower) ||
          psikolog.experience.toLowerCase().includes(searchLower) ||
          psikolog.approach.toLowerCase().includes(searchLower) ||
          psikolog.philosophy.toLowerCase().includes(searchLower) ||
          psikolog.expertise.some(skill => 
            skill.toLowerCase().includes(searchLower)
          )
        );
      });
      setFilteredPsikologs(filtered);
    }
  }, [searchTerm, psikologs]);

  const fetchPsikologs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/psikologs');
      const data = await response.json();
      
      if (data.success) {
        setPsikologs(data.data);
        setFilteredPsikologs(data.data);
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

  const PsikologCard = ({ psikolog }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="psikolog-modal-card"
    >
      {/* Image Section */}
      <div className="psikolog-modal-image-container">
        <img 
          src={psikolog.image || '/img/default-psikolog.jpg'} 
          alt={psikolog.name}
          className="psikolog-modal-image"
          onError={(e) => {
            e.target.src = '/img/default-psikolog.jpg';
          }}
        />
        <div className="psikolog-modal-overlay">
          <div className="psikolog-modal-name">{psikolog.name}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="psikolog-modal-content">
        {/* Expertise Tags */}
        <div className="psikolog-modal-expertise">
          {psikolog.expertise?.map((skill, index) => (
            <span key={index} className="expertise-modal-tag">
              {skill}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="psikolog-modal-description">
          {psikolog.description}
        </p>

        {/* Info Grid */}
        <div className="psikolog-modal-info-grid">
          <div className="info-modal-item">
            <GraduationCap className="info-modal-icon" />
            <div className="info-modal-content">
              <span className="info-modal-label">Pendidikan</span>
              <span className="info-modal-value">{psikolog.education}</span>
            </div>
          </div>
          
          <div className="info-modal-item">
            <Clock className="info-modal-icon" />
            <div className="info-modal-content">
              <span className="info-modal-label">Pengalaman</span>
              <span className="info-modal-value">{psikolog.experience}</span>
            </div>
          </div>
          
          <div className="info-modal-item">
            <Heart className="info-modal-icon" />
            <div className="info-modal-content">
              <span className="info-modal-label">Pendekatan</span>
              <span className="info-modal-value">{psikolog.approach}</span>
            </div>
          </div>
          
          <div className="info-modal-item">
            <Lightbulb className="info-modal-icon" />
            <div className="info-modal-content">
              <span className="info-modal-label">Filosofi</span>
              <span className="info-modal-value">{psikolog.philosophy}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="psikolog-modal-button"
        >
          Konsultasi Sekarang
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="psikolog-modal-backdrop"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="psikolog-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="psikolog-modal-content-wrapper"
            >
              {/* Header */}
              <div className="psikolog-modal-header">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">
                    Semua Psikolog Profesional
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="psikolog-modal-close"
                  aria-label="Tutup modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="psikolog-modal-search">
                <div className="search-input-container">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Cari psikolog berdasarkan nama, keahlian, atau pendekatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="search-clear"
                      aria-label="Hapus pencarian"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="search-results-info">
                  <span className="text-sm text-gray-300">
                    {filteredPsikologs.length} dari {psikologs.length} psikolog ditemukan
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="psikolog-modal-body">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <p className="text-white ml-4">Memuat data psikolog...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-400">{error}</p>
                  </div>
                ) : psikologs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white">Belum ada psikolog yang tersedia.</p>
                  </div>
                ) : filteredPsikologs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    </div>
                    <p className="text-white text-lg mb-2">Tidak ada psikolog yang ditemukan</p>
                    <p className="text-gray-400">
                      Coba gunakan kata kunci yang berbeda atau hapus pencarian untuk melihat semua psikolog.
                    </p>
                  </div>
                ) : (
                  <div className="psikolog-modal-grid">
                    {filteredPsikologs.map((psikolog, index) => (
                      <PsikologCard 
                        key={psikolog.id} 
                        psikolog={psikolog}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PsikologModal;
