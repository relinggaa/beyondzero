import React, { useRef, useCallback, useState, useEffect } from "react";
import { gsap } from "gsap";
import useEmblaCarousel from "embla-carousel-react";

const services = [
    {
        id: 1,
        title: "Mood Tracker",
        tag: "Pelacakan",
        description: "Catat suasana hati harian dengan skala dan label emosi, tambahkan catatan pemicu, dan lihat tren mingguan/bulanan. Dibantu AI: (1) analisis sentimen dari catatan bebas, (2) pendeteksian pola pemicu/aktivitas yang paling berdampak, (3) peringatan dini saat terdeteksi anomali mood, dan (4) rekomendasi aktivitas self‑care yang dipersonalisasi. Tersedia pengingat harian agar rutinitas konsisten.",
        features: [
            "Grafik tren mingguan & bulanan yang mudah dipahami",
            "Tag pemicu dan aktivitas untuk analisis yang lebih kaya",
            "Insight AI tentang waktu paling rawan/produktif",
            "Rekomendasi self‑care adaptif berdasarkan histori data",
            "Pengingat pintar agar pencatatan konsisten",
        ],
        image: "https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    },
    {
        id: 2,
        title: "Curhat",
        tag: "Dukungan",
        description: "Curhat di ruang aman dan privat. AI NLP membantu: menganalisis nada emosi, merangkum inti masalah, menyarankan langkah kecil berbasis CBT/solusi praktis, dan merekomendasikan materi bacaan atau latihan yang relevan. Anda dapat memberi tag topik (pekerjaan, relasi, studi, keuangan) agar saran semakin kontekstual.",
        features: [
            "Analisis emosi otomatis dari teks curhat",
            "Ringkasan inti masalah agar langkah fokus",
            "Saran CBT praktis yang bisa langsung dicoba",
            "Rekomendasi materi bacaan/latihan terkait topik",
            "Privasi terjaga dengan enkripsi end‑to‑end",
        ],
        image: "https://plus.unsplash.com/premium_photo-1664378616928-dc6842677183?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
        id: 3,
        title: "Journaling",
        tag: "Refleksi",
        description: "Tulis jurnal harian dengan template refleksi. AI Journal Coach mengekstrak tema berulang, menyorot kemenangan kecil, memberi umpan balik gaya bahasa yang lebih welas asih, serta membuat ringkasan mingguan otomatis. Ada prompt adaptif harian, pencarian semantik (temukan entri serupa), dan saran kebiasaan mikro untuk esok hari.",
        features: [
            "Prompt adaptif yang berganti sesuai konteks harian",
            "Pencarian semantik untuk menemukan entri mirip",
            "Ringkasan mingguan otomatis + highlight progres",
            "Saran kebiasaan mikro yang realistis",
            "Lampiran gambar & tag untuk pengelompokan cepat",
        ],
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    },
    {
        id: 4,
        title: "Psikolog",
        tag: "Konsultasi",
        description: "Terhubung dengan psikolog berlisensi untuk asesmen, sesi terjadwal, hingga pendampingan. AI Triage mencocokkan Anda dengan psikolog yang paling relevan (keahlian, bahasa, ketersediaan). Setelah sesi, AI menyiapkan ringkasan poin penting dan to‑do aman secara privat, plus rekomendasi prakerja/pasca‑sesi agar progres lebih terukur.",
        features: [
            "Pencocokan psikolog otomatis berbasis profil kebutuhan",
            "Sesi video terenkripsi + catatan aman",
            "Ringkasan pasca‑sesi otomatis (opsional)",
            "Rencana tindak lanjut dan pengingat terjadwal",
            "Dukungan multi‑bahasa & preferensi topik",
        ],
        image: "https://images.unsplash.com/photo-1517346665566-17b938c7f3ad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
        id: 5,
        title: "Healing",
        tag: "Latihan",
        description: "Ikuti latihan pemulihan seperti pernapasan 4‑7‑8, meditasi terpandu, peregangan ringan, dan mini games mindful. Mesin rekomendasi berbasis AI memilih durasi dan intensitas yang sesuai histori mood, preferensi, dan waktu luang Anda; lengkap dengan tracking manfaat dan saran progres bertahap.",
        features: [
            "Latihan napas, meditasi, peregangan, dan mini games",
            "Rekomendasi adaptif berdasar mood & preferensi",
            "Panduan audio singkat yang mudah diikuti",
            "Tracking manfaat dan durasi latihan",
            "Program bertahap untuk membangun kebiasaan",
        ],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    },
    {
        id: 6,
        title: "Status Booking",
        tag: "Jadwal",
        description: "Pantau semua janji temu psikolog: menunggu konfirmasi, terjadwal, perubahan, hingga riwayat. Asisten penjadwalan AI mengusulkan slot optimal berdasarkan pola energi Anda (dari data mood) dan ketersediaan psikolog, memberi pengingat pintar, serta menyarankan jeda istirahat sebelum/ setelah sesi.",
        features: [
            "Tampilan status lengkap & riwayat sesi",
            "Asisten AI untuk usulan slot optimal",
            "Pengingat pintar via email/notifikasi",
            "Reschedule mudah dan transparan",
            "Unduh ringkasan pertemuan untuk arsip pribadi",
        ],
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
    },
];

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: false,
        inViewThreshold: 0.6,
        speed: 1,
        duration: 20,
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
    });

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !emblaApi) return;

        let isScrolling = false;
        let scrollTimeout = null;

        const handleWheel = (e) => {
            const rect = section.getBoundingClientRect();
            const viewportH = window.innerHeight;

            const isInView = rect.top <= viewportH * 0.5 && rect.bottom >= viewportH * 0.9;
            if (!isInView) return;

            const currentIndex = emblaApi.selectedScrollSnap();
            const lastIndex = emblaApi.slideNodes().length - 1;

        const isVerticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
            if (!isVerticalIntent) return;

            if (isScrolling) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (e.deltaY > 0 && currentIndex < lastIndex) {
                e.preventDefault();
                e.stopPropagation();

                isScrolling = true;
                emblaApi.scrollNext();

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }

            if (e.deltaY < 0 && currentIndex > 0) {
                e.preventDefault();
                e.stopPropagation();

                isScrolling = true;
                emblaApi.scrollPrev();

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }
            
            if (currentIndex === 0 && e.deltaY < 0) {
                return; // Biarkan scroll vertikal halaman
            }

            if (currentIndex === lastIndex && e.deltaY > 0) {
                return; // Biarkan scroll vertikal halaman
            }

            if (currentIndex === lastIndex && e.deltaY < 0) {
                e.preventDefault();
                e.stopPropagation();

                isScrolling = true;
                emblaApi.scrollPrev();

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }

            if (currentIndex === 0 && e.deltaY > 0) {
                e.preventDefault();
                e.stopPropagation();

                isScrolling = true;
                emblaApi.scrollNext();

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 800);

                return;
            }

            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            clearTimeout(scrollTimeout);
        };
    }, [emblaApi]);

    useEffect(() => {
        const carouselContainer = emblaRef.current;
        if (!carouselContainer) return;

        const preventDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        carouselContainer.addEventListener('dragstart', preventDrag);
        carouselContainer.addEventListener('drag', preventDrag);
        carouselContainer.addEventListener('dragend', preventDrag);
        carouselContainer.addEventListener('mousedown', preventDrag);
        carouselContainer.addEventListener('mousemove', preventDrag);
        carouselContainer.addEventListener('mouseup', preventDrag);
        carouselContainer.addEventListener('click', preventDrag);
        carouselContainer.addEventListener('touchstart', preventDrag);
        carouselContainer.addEventListener('touchmove', preventDrag);
        carouselContainer.addEventListener('touchend', preventDrag);
        carouselContainer.addEventListener('contextmenu', preventDrag);
        carouselContainer.addEventListener('selectstart', preventDrag);

        return () => {
            carouselContainer.removeEventListener('dragstart', preventDrag);
            carouselContainer.removeEventListener('drag', preventDrag);
            carouselContainer.removeEventListener('dragend', preventDrag);
            carouselContainer.removeEventListener('mousedown', preventDrag);
            carouselContainer.removeEventListener('mousemove', preventDrag);
            carouselContainer.removeEventListener('mouseup', preventDrag);
            carouselContainer.removeEventListener('click', preventDrag);
            carouselContainer.removeEventListener('touchstart', preventDrag);
            carouselContainer.removeEventListener('touchmove', preventDrag);
            carouselContainer.removeEventListener('touchend', preventDrag);
            carouselContainer.removeEventListener('contextmenu', preventDrag);
            carouselContainer.removeEventListener('selectstart', preventDrag);
        };
    }, [emblaRef]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.set(section, { opacity: 0, y: 30, scale: 0.99 });
        gsap.set(section.querySelector('h2'), { opacity: 0, y: 20, scale: 0.95 });
        gsap.set(section.querySelector('p'), { opacity: 0, y: 15, scale: 0.98 });
        gsap.set(section.querySelectorAll('article'), { 
            opacity: 0, 
            x: -80, 
            rotationY: -10, 
            scale: 0.95,
            filter: "blur(3px)"
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const tl = gsap.timeline({ delay: 0.1 });

                        tl.to(section, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1.2,
                            ease: "power2.out"
                        });

                        tl.to(section.querySelector('h2'), {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.4)"
                        }, "-=0.8");

                        tl.to(section.querySelector('p'), {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        }, "-=0.6");

                        tl.to(section.querySelectorAll('article'), {
                            opacity: 1,
                            x: 0,
                            rotationY: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1,
                            stagger: {
                                amount: 0.6,
                                from: "start"
                            },
                            ease: "power2.out"
                        }, "-=0.4");

                        tl.to(section.querySelectorAll('article'), {
                            y: -10,
                            duration: 0.2,
                            ease: "power2.inOut",
                            yoyo: true,
                            repeat: -1,
                            stagger: 0.3
                        }, "-=0.5");

                        observer.unobserve(section);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="layanan"
            className="py-0 bg-black h-screen w-full overscroll-y-contain flex flex-col justify-center"
        >
            <div className="w-full mx-auto px-4 h-full flex flex-col justify-center">
                <div className="mb-8 text-center">
                    <h2 className="text-white text-3xl font-bold mb-4">Layanan Kami</h2>
                    <p className="text-white/70 text-lg">Jelajahi berbagai fitur untuk mendukung perjalanan kesehatan mental Anda.</p>
                </div>

                <div className="  flex-1 select-none" ref={emblaRef} style={{ touchAction: 'none', userSelect: 'none', pointerEvents: 'none', cursor: 'default' }}>
                    <div className="flex">
                        {services.map((svc) => (
                            <div key={svc.id} className="flex-none w-full px-3">
                                <article className="group h-[60vh] bg-gradient-to-br from-white/10 via-white/6 to-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.8)] transition-all duration-1000 hover:scale-[1.02] hover:border-white/40 backdrop-blur-md relative" style={{ touchAction: 'none', userSelect: 'none', pointerEvents: 'none', cursor: 'default' }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100 animate-pulse"></div>
                                        <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300 animate-pulse"></div>
                                        <div className="absolute bottom-6 left-8 w-1 h-1 bg-white/25 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-500 animate-pulse"></div>
                                        <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-700 animate-pulse"></div>
                                    </div>
                                    
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 blur-xl"></div>
                                    
                                    <div className="relative grid grid-cols-2 gap-8 p-8 h-full z-10">
                                        <div className="flex flex-col h-full">
                                            <div className="inline-block bg-gradient-to-r from-white/15 to-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/30 backdrop-blur-md shadow-lg group-hover:shadow-xl transition-all duration-1000 group-hover:scale-105">
                                                {svc.tag}
                                            </div>
                                            
                                            <h3 className="text-white text-4xl font-bold leading-tight mb-6 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-1000">
                                                {svc.title}
                                            </h3>
                                            
                                            <p className="text-white/75 text-base leading-relaxed mb-6">
                                                {svc.description}
                                            </p>
                                            
                                            {svc.features && (
                                                <div className="flex-1 overflow-auto pr-2">
                                                    <ul className="space-y-3">
                                                        {svc.features.map((f, i) => (
                                                            <li key={i} className="flex items-start text-white/70 text-sm leading-relaxed">
                                                                <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2.5 mr-4 flex-shrink-0 shadow-sm"></div>
                                                                <span className="flex-1">{f}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="self-end">
                                            <div className="relative w-full h-full max-h-[60vh] bg-gradient-to-br from-gray-900/70 to-black/70 rounded-2xl overflow-hidden border border-white/20 group-hover:border-white/40 transition-all duration-1000 shadow-2xl group-hover:shadow-3xl">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                                    className="w-full h-full object-contain block group-hover:scale-105 transition-transform duration-1000" 
                                                />
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                                
                                                <div className="absolute top-4 right-4 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-200 animate-pulse"></div>
                                                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-400 animate-pulse"></div>
                                                <div className="absolute top-1/2 left-2 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-600 animate-pulse"></div>
                                                
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm"></div>
                                            </div>
                                </div>
                                </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}