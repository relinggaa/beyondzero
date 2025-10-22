import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Clock, Heart, Lightbulb } from 'lucide-react';

const PsikologCard = ({ psikolog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="psikolog-card"
    >
      {/* Image Section */}
      <div className="psikolog-image-container">
        <img 
          src={psikolog.image || '/img/default-psikolog.jpg'} 
          alt={psikolog.name}
          className="psikolog-image"
          onError={(e) => {
            e.target.src = '/img/default-psikolog.jpg';
          }}
        />
        <div className="psikolog-overlay">
          <div className="psikolog-name">{psikolog.name}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="psikolog-content">
        {/* Expertise Tags */}
        <div className="psikolog-expertise">
          {psikolog.expertise?.slice(0, 3).map((skill, index) => (
            <span key={index} className="expertise-tag">
              {skill}
            </span>
          ))}
          {psikolog.expertise?.length > 3 && (
            <span className="expertise-tag more">
              +{psikolog.expertise.length - 3} lainnya
            </span>
          )}
        </div>

        {/* Description */}
        <p className="psikolog-description">
          {psikolog.description?.length > 150 
            ? `${psikolog.description.substring(0, 150)}...` 
            : psikolog.description
          }
        </p>

        {/* Info Grid */}
        <div className="psikolog-info-grid">
          <div className="info-item">
            <GraduationCap className="info-icon" />
            <div className="info-content">
              <span className="info-label">Pendidikan</span>
              <span className="info-value">{psikolog.education}</span>
            </div>
          </div>
          
          <div className="info-item">
            <Clock className="info-icon" />
            <div className="info-content">
              <span className="info-label">Pengalaman</span>
              <span className="info-value">{psikolog.experience}</span>
            </div>
          </div>
          
          <div className="info-item">
            <Heart className="info-icon" />
            <div className="info-content">
              <span className="info-label">Pendekatan</span>
              <span className="info-value">{psikolog.approach}</span>
            </div>
          </div>
          
          <div className="info-item">
            <Lightbulb className="info-icon" />
            <div className="info-content">
              <span className="info-label">Filosofi</span>
              <span className="info-value">{psikolog.philosophy}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="psikolog-button"
        >
          Konsultasi Sekarang
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PsikologCard;
