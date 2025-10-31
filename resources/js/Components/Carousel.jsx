import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Brain, BookOpen, MessageCircle, Calendar, Heart } from 'lucide-react';
import React from 'react';
import { gsap } from 'gsap';

import './css/Carousel.css';

const DEFAULT_ITEMS = [
  {
    title: 'Mood Tracker',
    description: 'Platform Mood Tracker kami adalah sistem revolusioner yang menggunakan teknologi Artificial Intelligence dan Machine Learning terdepan untuk memberikan analisis mendalam tentang kondisi mental Anda. Sistem ini tidak hanya mencatat mood harian, tetapi juga menganalisis pola emosional, tren jangka panjang, dan faktor-faktor yang mempengaruhi kesejahteraan mental Anda. Dengan algoritma canggih yang terus belajar dari data Anda, platform ini dapat mendeteksi perubahan mood yang halus, mengidentifikasi pemicu stres, dan memberikan prediksi tentang kondisi mental Anda di masa depan. Fitur-fitur unggulan termasuk pelacakan mood real-time dengan berbagai skala emosi, analisis pola tidur dan aktivitas fisik, integrasi dengan wearable devices, dan dashboard visual yang menampilkan grafik tren emosional. Sistem juga menyediakan reminder personal untuk mencatat mood, notifikasi proaktif saat mendeteksi pola yang tidak sehat, dan rekomendasi aktivitas yang disesuaikan dengan kondisi mental Anda. Dengan teknologi Natural Language Processing, Anda dapat menuliskan perasaan dalam bentuk teks bebas, dan AI akan menganalisis sentimen serta memberikan insight mendalam. Platform ini juga terintegrasi dengan kalender untuk melacak event-event penting yang mempengaruhi mood, memberikan analisis korelasi antara aktivitas dan emosi, serta menyediakan laporan berkala yang dapat dibagikan dengan profesional kesehatan mental. Keamanan data adalah prioritas utama, dengan enkripsi end-to-end dan privasi yang terjaga ketat. Sistem ini juga mendukung berbagai bahasa dan dapat disesuaikan dengan preferensi budaya dan personal Anda. Dengan interface yang intuitif dan responsif, platform dapat digunakan di berbagai perangkat mulai dari smartphone hingga desktop, memastikan aksesibilitas yang optimal untuk semua pengguna.',
    id: 1,
    icon: <Brain className="carousel-icon" />,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Journaling',
    description: 'Platform Journaling kami adalah solusi komprehensif untuk ekspresi diri dan refleksi mental yang dirancang khusus untuk mendukung perjalanan kesehatan mental Anda. Sistem ini menyediakan berbagai template journaling yang terstruktur berdasarkan metode terapi yang terbukti efektif, termasuk Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), dan Mindfulness-Based Stress Reduction (MBSR). Setiap template dirancang untuk membantu Anda mengeksplorasi aspek-aspek berbeda dari kehidupan mental Anda, mulai dari gratitude journaling yang meningkatkan rasa syukur, hingga anxiety journaling yang membantu mengidentifikasi dan mengelola kecemasan. Platform ini dilengkapi dengan fitur analisis emosional yang menggunakan teknologi AI untuk menganalisis tulisan Anda, mendeteksi pola-pola emosional, dan memberikan insight tentang perkembangan mental Anda dari waktu ke waktu. Sistem reminder yang cerdas akan mengingatkan Anda untuk menulis journal secara konsisten, dengan fleksibilitas untuk menyesuaikan frekuensi dan waktu yang sesuai dengan rutinitas Anda. Fitur pencarian dan tagging memungkinkan Anda untuk dengan mudah menemukan entri journal yang relevan, melacak topik-topik yang sering muncul, dan melihat perkembangan pemikiran Anda tentang berbagai aspek kehidupan. Platform juga menyediakan mode offline untuk memastikan Anda dapat menulis kapan saja tanpa koneksi internet, dengan sinkronisasi otomatis saat koneksi tersedia. Untuk meningkatkan pengalaman menulis, tersedia berbagai tema visual yang dapat disesuaikan, font yang mudah dibaca, dan editor yang mendukung rich text formatting. Sistem juga terintegrasi dengan mood tracker untuk memberikan konteks emosional pada tulisan Anda, dan dapat menghasilkan laporan berkala yang menunjukkan perkembangan kemampuan ekspresi diri dan self-reflection Anda. Dengan komunitas yang mendukung, Anda dapat berbagi pengalaman dengan pengguna lain secara anonim, mendapatkan inspirasi dari cerita sukses, dan merasa tidak sendirian dalam perjalanan kesehatan mental Anda.',
    id: 2,
    icon: <BookOpen className="carousel-icon" />,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Chat AI',
    description: 'Chat AI kami adalah asisten virtual kesehatan mental yang revolusioner, dikembangkan dengan teknologi Artificial Intelligence terdepan dan dilatih khusus untuk memberikan dukungan emosional yang empatik dan profesional. Sistem ini menggunakan model bahasa besar yang telah disesuaikan dengan konteks kesehatan mental, dilengkapi dengan pengetahuan mendalam tentang psikologi, terapi, dan teknik coping yang efektif. AI Assistant kami dapat berkomunikasi dalam berbagai bahasa dan dialek, memahami nuansa emosional dalam pesan Anda, dan memberikan respons yang disesuaikan dengan tingkat urgensi dan jenis masalah yang Anda hadapi. Platform ini dilengkapi dengan sistem deteksi krisis yang dapat mengidentifikasi tanda-tanda depresi berat, pikiran bunuh diri, atau situasi darurat lainnya, dan secara otomatis menghubungkan Anda dengan profesional kesehatan mental atau layanan darurat yang sesuai. Chat AI kami tidak hanya memberikan saran umum, tetapi juga dapat melakukan sesi terapi singkat, memberikan teknik relaksasi, dan memandu Anda melalui latihan mindfulness atau breathing exercises. Sistem ini juga dapat melacak pola percakapan Anda, mengidentifikasi topik-topik yang sering muncul, dan memberikan rekomendasi personal untuk meningkatkan kesejahteraan mental Anda. Dengan teknologi Natural Language Understanding yang canggih, AI dapat memahami konteks percakapan yang kompleks, mengingat informasi dari sesi sebelumnya, dan memberikan konsistensi dalam pendekatan terapeutik. Platform ini juga terintegrasi dengan mood tracker dan journaling untuk memberikan dukungan yang lebih personal dan kontekstual. Fitur-fitur unggulan termasuk voice-to-text untuk kemudahan komunikasi, terjemahan real-time untuk pengguna multibahasa, dan kemampuan untuk mengunduh transcript percakapan untuk referensi pribadi. Dengan algoritma pembelajaran yang terus berkembang, AI kami semakin memahami kebutuhan individual Anda dan memberikan respons yang semakin personal dan efektif.',
    id: 3,
    icon: <MessageCircle className="carousel-icon" />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Konseling Psikolog',
    description: 'Platform Konseling Psikolog kami adalah ekosistem komprehensif yang menghubungkan Anda dengan jaringan psikolog profesional terbaik yang telah melalui proses seleksi ketat dan sertifikasi khusus. Sistem ini menyediakan berbagai jenis layanan konseling, mulai dari terapi individual yang mendalam hingga konseling keluarga dan sesi grup yang mendukung. Setiap psikolog dalam jaringan kami memiliki spesialisasi yang berbeda, termasuk terapi kognitif-perilaku, terapi psikoanalisis, terapi humanistik, terapi keluarga sistemik, dan berbagai pendekatan terapeutik lainnya yang disesuaikan dengan kebutuhan spesifik Anda. Platform ini menggunakan sistem matching yang cerdas untuk menghubungkan Anda dengan psikolog yang paling sesuai berdasarkan masalah yang Anda hadapi, preferensi terapeutik, jadwal yang tersedia, dan faktor-faktor personal lainnya. Proses booking dirancang untuk memudahkan Anda, dengan kalender real-time yang menampilkan slot waktu yang tersedia, sistem pembayaran yang aman dan transparan, dan reminder otomatis untuk sesi yang akan datang. Konseling dapat dilakukan secara online melalui video call berkualitas tinggi dengan enkripsi end-to-end, atau secara offline di klinik-klinik partner yang tersebar di berbagai kota. Setiap sesi dilengkapi dengan tools digital seperti whiteboard virtual untuk terapi, sharing screen untuk presentasi materi terapeutik, dan sistem pencatatan yang aman untuk melacak perkembangan terapi. Platform ini juga menyediakan dashboard personal untuk melacak jadwal sesi, melihat catatan terapi (dengan persetujuan psikolog), dan mengakses materi-materi terapeutik yang direkomendasikan. Dengan tim support yang tersedia 24/7, Anda dapat mendapatkan bantuan teknis atau konsultasi darurat kapan saja, memastikan pengalaman konseling yang lancar dan mendukung.',
    id: 4,
    icon: <Calendar className="carousel-icon" />,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Healing & Wellness',
    description: 'Platform Healing & Wellness kami adalah pusat komprehensif untuk pemulihan mental dan peningkatan kesejahteraan holistik yang menggabungkan berbagai teknik terapi, meditasi, dan praktik wellness yang telah terbukti secara ilmiah. Sistem ini menyediakan lebih dari 200 program healing yang berbeda, mulai dari guided meditation dengan berbagai durasi dan tema, breathing exercises yang dapat disesuaikan dengan tingkat kecemasan Anda, hingga mindfulness practices yang dirancang khusus untuk mengatasi stres, trauma, dan berbagai kondisi mental lainnya. Setiap program dikembangkan oleh tim ahli yang terdiri dari psikolog klinis, terapis musik, instruktur yoga dan meditasi, serta spesialis wellness lainnya. Platform ini menggunakan teknologi biofeedback untuk memantau respons fisiologis Anda selama sesi healing, memberikan real-time feedback tentang efektivitas teknik yang digunakan, dan menyesuaikan intensitas program berdasarkan respons tubuh Anda. Sistem juga dilengkapi dengan library musik terapeutik yang luas, termasuk binaural beats untuk relaksasi, nature sounds untuk grounding, dan musik klasik yang telah terbukti meningkatkan mood dan mengurangi kecemasan. Fitur-fitur unggulan termasuk virtual reality meditation untuk pengalaman immersive, aromatherapy guide yang dapat diintegrasikan dengan diffuser smart home, dan program yoga yang dapat disesuaikan dengan tingkat kemampuan fisik Anda. Platform ini juga menyediakan tracking yang mendetail untuk melacak kemajuan healing Anda, termasuk perubahan dalam pola tidur, tingkat stres, dan kesejahteraan mental secara keseluruhan. Sistem reminder yang cerdas akan mengingatkan Anda untuk melakukan sesi healing secara konsisten, dengan fleksibilitas untuk menyesuaikan frekuensi dan waktu yang optimal untuk Anda. Dengan komunitas wellness yang aktif, Anda dapat berbagi pengalaman healing, mendapatkan dukungan dari sesama pengguna, dan merayakan pencapaian bersama dalam perjalanan kesehatan mental Anda.',
    id: 5,
    icon: <Heart className="carousel-icon" />,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 200, damping: 40 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 400,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  showArrows = false,
  onNavigate = null
}) {
  const containerPadding = 16;
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Get container width from parent
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const parentWidth = containerRef.current.parentElement.offsetWidth;
        setContainerWidth(parentWidth || 0);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Responsive width calculation - Use container width if available, otherwise fallback to screen-based calculation
  const getResponsiveWidth = () => {
    if (containerWidth > 0) {
      // Dapatkan parent element yang memiliki padding untuk arrow
      let element = containerRef.current?.parentElement;
      let totalPadding = 0;
      
      // Cari parent dengan padding untuk arrow (biasanya #carousel-wrapper atau parent-nya)
      while (element && element !== document.body) {
        const computedStyle = window.getComputedStyle(element);
        const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
        const paddingRight = parseInt(computedStyle.paddingRight) || 0;
        
        // Jika padding besar (untuk arrow space), kurangi dari width
        if (paddingLeft >= 64 || paddingRight >= 64) {
          totalPadding = paddingLeft + paddingRight;
          break;
        }
        
        element = element.parentElement;
      }
      
      // Untuk desktop, kurangi padding arrow jika ada
      const isDesktop = screenWidth >= 768;
      if (isDesktop && totalPadding > 0) {
        return containerWidth;
      }
      
      return containerWidth;
    }
    // Fallback calculation
    const maxWidth = Math.min(screenWidth - 64, 1200);
    if (screenWidth < 640) return Math.min(screenWidth - 32, 400);
    if (screenWidth < 768) return Math.min(screenWidth - 48, 500);
    if (screenWidth < 1024) return Math.min(screenWidth - 64, 700);
    if (screenWidth < 1280) return Math.min(screenWidth - 80, 900);
    return Math.min(screenWidth - 96, 1200);
  };
  
  const responsiveWidth = getResponsiveWidth();
  const itemWidth = responsiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const carouselRef = useRef(null);
  const itemsRef = useRef([]);
  
  // GSAP Animations - More gentle
  useEffect(() => {
    if (carouselRef.current && itemsRef.current.length > 0) {
      // Initial animation for carousel items - gentler
      gsap.fromTo(itemsRef.current, 
        { 
          opacity: 0, 
          y: 20,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, []);

  // Animation on index change - gentler scaling
  useEffect(() => {
    if (itemsRef.current[currentIndex]) {
      gsap.to(itemsRef.current[currentIndex], {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Reset other items
      itemsRef.current.forEach((item, index) => {
        if (index !== currentIndex) {
          gsap.to(item, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  }, [currentIndex]);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === carouselItems.length - 1 ? (loop ? 0 : prev) : prev + 1));
  }, [carouselItems.length, loop]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? (loop ? items.length - 1 : 0) : prev - 1));
  }, [items.length, loop]);

  // Expose navigation methods via callback
  useEffect(() => {
    if (onNavigate) {
      onNavigate({
        next: handleNext,
        prev: handlePrev
      });
    }
  }, [onNavigate, handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? 'round' : ''}`}
      style={{
        width: '100%',
        maxWidth: '100%',
        position: 'relative',
        ...(round && { height: `${responsiveWidth}px`, borderRadius: '50%' })
      }}>
      <div className="carousel-inner" style={{ overflow: 'hidden' }}>
        <motion.div
          ref={carouselRef}
          className="carousel-track"
          drag="x"
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            x
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationComplete={handleAnimationComplete}>
        {carouselItems.map((item, index) => {
          return (
            <motion.div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className={`carousel-item ${round ? 'round' : ''}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition}>
              <div className="carousel-item-content">
                <div className="carousel-text-section">
                  <div className="carousel-item-title">{item.title}</div>
                  <p className="carousel-item-description">{item.description}</p>
                </div>
                <div className="carousel-image-section">
                  <div className="carousel-image-container">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="carousel-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="carousel-icon-fallback" style={{ display: 'none' }}>
                      <span className="carousel-icon-container">{item.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? 'active' : 'inactive'}`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
