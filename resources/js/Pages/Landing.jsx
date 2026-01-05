import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import HeroSection from "./section/HeroSection";
import ServicesSection from "./section/ServicesSection";
import QuotesSection from "./section/QuotesSection";
import DomeGalerySession from "./section/DomeGalerySession";
import PsikologSection from "./section/PsikologSection";
import NavbarLanding from "../Components/NavbarLanding";
import NavbarUser from "../Components/NavbarUser";
import TestimoniSection from "./section/TestimoniSection";
import AboutUsSection from "./section/AboutUsSection";
import Footer from "./section/Footer";
import ProfileCard from "../Components/ProfileCard";
const avatarImg = "/img/relinggaa.png";
const avatarMeguns = "/img/meguns.png";  
const avatarOpung = "/img/Opung.png";
export default function Landing() {
    const [showAlert, setShowAlert] = useState(false);
    const { auth } = usePage().props;

    // Show alert on first visit
    useEffect(() => {
        const hasSeenAlert = localStorage.getItem('fixyou-hosting-alert-seen');
        if (!hasSeenAlert) {
            setTimeout(() => setShowAlert(true), 500);
        }
    }, []);

    const handleCloseAlert = () => {
        setShowAlert(false);
        localStorage.setItem('fixyou-hosting-alert-seen', 'true');
    };

    // Intercept clicks inside landing content when user is logged in
    useEffect(() => {
        if (!auth?.user) return;
        const container = document.querySelector('.landing');
        if (!container) return;

        const handleClick = (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;
            // Skip clicks coming from any nav element
            if (target.closest('nav')) return;
            // Skip if marked to bypass dashboard redirect (e.g., Psikolog CTA)
            if (target.matches('[data-skip-dashboard-redirect]')) return;
            // Skip if anchor explicitly goes to psikolog list
            const href = target.getAttribute && target.getAttribute('href');
            if (href && href.includes('/psikolog')) return;

            e.preventDefault();
            router.visit('/dashboard');
        };

        container.addEventListener('click', handleClick);
        return () => container.removeEventListener('click', handleClick);
    }, [auth?.user]);

    return (
        <>
            {auth?.user ? <NavbarUser /> : <NavbarLanding />}
      
            {/* Hosting Alert Modal */}
            {showAlert && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseAlert}
                    ></div>
                    {/* Alert Dialog */}
                    <div className="relative w-full max-w-md mx-4 transform transition-all duration-200">
                        <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/90 backdrop-blur-md shadow-2xl">
                            <div className="px-6 py-5 border-b border-white/10">
                                <h3 className="text-white text-xl font-semibold">Pemberitahuan</h3>
                            </div>
                            <div className="px-6 py-5">
                                <p className="text-white/90 text-base leading-relaxed">
                                    Kami memohon maaf jika terdapat ketidaksempurnaan dalam tampilan atau fitur yang tersedia. Hal ini disebabkan oleh keterbatasan pada platform hosting yang kami gunakan saat ini. Kami akan terus berusaha meningkatkan kualitas layanan ke depannya.
                                </p>
                            </div>
                            <div className="px-6 py-4 flex items-center justify-end border-t border-white/10">
                                <button
                                    onClick={handleCloseAlert}
                                    className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-white text-black hover:bg-white/90 transition-colors shadow-lg"
                                >
                                    Mengerti
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="landing">
             
                {/* Extra breathing room on mobile below Dome Gallery to avoid overlap */}
                <div id="about-section" className="mt-20 sm:mt-28 md:mt-32 lg:mt-0">
                    <AboutUsSection />
                </div>
                
                {/* Developed By Section */}
                <div className="min-h-screen bg-black py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r  text-white bg-clip-text mb-4">
                            Developed By
                            </h2>
                            <p className="text-white/70 text-lg lg:text-xl max-xl mx-auto">
                                Kami  beyond zero  adalah tim dari Telkom University yang berkomitmen untuk membangun platform kesehatan mental berbasis Artificial Intelligence yang lebih baik untuk semua.
                            </p>
                        </div>

                        {/* Profile Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {/* Developer 1 */}
                            <ProfileCard
                                    name="Relingga Aditya"
                                    title="Full Stack Developer"
                                    handle="relinggaa"
                                    status="Online"
                                    contactText="Contact Me"
                                    avatarUrl={avatarImg}
                                    miniAvatarUrl={avatarImg}
                                    iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384069.png"
                                    showUserInfo={true}
                                    className="landing-compact"
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => auth?.user ? router.visit('/dashboard') : console.log('Contact clicked')}
                                />
                                <ProfileCard
                                    name="Mega Bunawi"
                                    title="System Analyst & Sofware Quality Assurance"
                                    handle="megabunawi"
                                    status="Online"
                                    contactText="Contact Me"
                                    avatarUrl={avatarMeguns}
                                    miniAvatarUrl={avatarMeguns}
                                    iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384069.png"
                                    showUserInfo={true}
                                    className="landing-compact mega-bunawi-card"
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => auth?.user ? router.visit('/dashboard') : console.log('Contact clicked')}
                                />
                                <ProfileCard
                                    name="Rasendriya Abel"
                                    title="AI Engineer & Backend Developer"
                                    handle="RasendriyaAbel"
                                    status="Online"
                                    contactText="Contact Me"
                                    avatarUrl={avatarOpung}
                                    miniAvatarUrl={avatarOpung}
                                    iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384069.png"
                                    showUserInfo={true}
                                    className="landing-compact"
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => auth?.user ? router.visit('/dashboard') : console.log('Contact clicked')}
                                />
                      

                        </div>

                        {/* Footer Text removed as requested */}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
