import DomeGallery from '../../Components/DomeGallery';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DomeGalerySession.css';

gsap.registerPlugin(ScrollTrigger);

const MotivationSection = () => {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const icon = iconRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const stats = statsRef.current;
    const button = buttonRef.current;

    if (!section) return;

    // Set initial states
    gsap.set([icon, title, description, stats, button], {
      opacity: 0,
      y: 50
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate elements in sequence
    tl.to(icon, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(stats, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .to(button, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.1");

    // Animate individual stat items
    const statItems = stats?.querySelectorAll('.stat-item');
    if (statItems) {
      gsap.fromTo(statItems, 
        { 
          opacity: 0, 
          scale: 0.8,
          rotationY: 45
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Hover animations
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // Icon pulse animation
    if (icon) {
      gsap.to(icon, {
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="motivation-section">
      <div className="motivation-content">
        <div ref={iconRef} className="motivation-icon">
          <div className="heart-icon">💙</div>
        </div>
        <h2 ref={titleRef} className="motivation-title">
          Anda Tidak Sendiri
        </h2>
        <p ref={descriptionRef} className="motivation-description">
          Ribuan orang telah bergabung bersama kami dalam perjalanan menuju kesehatan mental yang lebih baik. 
          Setiap langkah kecil adalah kemajuan yang berarti.
        </p>
        <div ref={statsRef} className="community-stats">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Pengguna Aktif</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Sesi Konseling</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Tingkat Kepuasan</div>
          </div>
        </div>
        <div className="motivation-cta">
          <button ref={buttonRef} className="join-button">
            Bergabung Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-black -mt-32">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-12 gap-8 min-h-[80vh]">
          {/* DomeGallery Section */}
          <div className="col-span-7 flex items-center justify-center">
            <div className="w-full h-full max-w-4xl max-h-4xl flex items-center justify-center">
              <DomeGallery 
                autoRotate={true}
                autoRotateSpeed={0.3}
                grayscale={false}
                openedImageWidth="400px"
                openedImageHeight="500px"
                fit={0.8}
                minRadius={400}
                maxRadius={600}
              />
            </div>
          </div>
          
          {/* Motivation Section */}
          <div className="col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md">
              <MotivationSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}