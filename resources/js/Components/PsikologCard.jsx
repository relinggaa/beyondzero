import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

const PsikologCard = ({ psikolog, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    const pointerX = (x / rect.width) * 100;
    const pointerY = (y / rect.height) * 100;
    
    const pointerFromLeft = x / rect.width;
    const pointerFromTop = y / rect.height;
    const pointerFromCenter = Math.sqrt(
      Math.pow(pointerFromLeft - 0.5, 2) + Math.pow(pointerFromTop - 0.5, 2)
    ) * 2;

    cardRef.current.style.setProperty('--pointer-x', `${pointerX}%`);
    cardRef.current.style.setProperty('--pointer-y', `${pointerY}%`);
    cardRef.current.style.setProperty('--pointer-from-left', pointerFromLeft);
    cardRef.current.style.setProperty('--pointer-from-top', pointerFromTop);
    cardRef.current.style.setProperty('--pointer-from-center', pointerFromCenter);
    cardRef.current.style.setProperty('--rotate-x', `${rotateY}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${rotateX}deg`);
    cardRef.current.style.setProperty('--background-x', `${pointerX}%`);
    cardRef.current.style.setProperty('--background-y', `${pointerY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    
    cardRef.current.style.setProperty('--pointer-x', '50%');
    cardRef.current.style.setProperty('--pointer-y', '50%');
    cardRef.current.style.setProperty('--pointer-from-left', '0.5');
    cardRef.current.style.setProperty('--pointer-from-top', '0.5');
    cardRef.current.style.setProperty('--pointer-from-center', '0');
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
    cardRef.current.style.setProperty('--background-x', '50%');
    cardRef.current.style.setProperty('--background-y', '50%');
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const hashName = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const getGenderFromName = (name) => {
    const n = (name || '').toLowerCase();
    const femaleHints = [
      'sarah', 'aisha', 'lisa', 'mega', 'megan', 'amel', 'amelia', 'siti', 'ayu', 'nisa',
      'nur', 'putri', 'fitri', 'dwi', 'ika', 'rina', 'maria', 'linda'
    ];
    return femaleHints.some((k) => n.includes(k)) ? 'women' : 'men';
  };

  const gender = getGenderFromName(psikolog.name);
  const idx = hashName(psikolog.name) % 90; // 0-89 available
  const placeholderMain = `https://randomuser.me/api/portraits/${gender}/${idx}.jpg`;
  const fallbackMain = `https://source.unsplash.com/300x400/?${gender === 'women' ? 'woman' : 'man'},portrait`;

  const resolveImageSrc = () => {
    if (psikolog.image) {
      if (/^https?:\/\//i.test(psikolog.image)) return psikolog.image;
      return `/storage/${psikolog.image}`;
    }
    return placeholderMain;
  };

  return (
    <div className="pc-card-wrapper" ref={cardRef}>
      <div className="pc-card" onClick={onClick}>
        <div className="pc-inside">
          <div className="pc-shine"></div>
          <div className="pc-glare"></div>
          <div className="pc-avatar-content">
            <img 
              src={resolveImageSrc()}
              alt={psikolog.name}
              className="avatar"
              onError={(e) => { e.currentTarget.src = fallbackMain; }}
            />
          </div>
          {/* Info di bawah foto */}
          <div className="pc-name-area">
            <div className="pc-name-text">{psikolog.name}</div>
            <div className="pc-name-sub">{psikolog.expertise?.[0] || 'Psikolog'}</div>
            <button type="button" className="pc-more-btn" onClick={onClick}>
              Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsikologCard;
