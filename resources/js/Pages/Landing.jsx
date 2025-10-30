import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./section/HeroSection";
import ServicesSection from "./section/ServicesSection";
import QuotesSection from "./section/QuotesSection";
import DomeGalerySession from "./section/DomeGalerySession";
import PsikologSection from "./section/PsikologSection";
import NavbarLanding from "../Components/NavbarLanding";
import TestimoniSection from "./section/TestimoniSection";
import AboutUsSection from "./section/AboutUsSection";
import Footer from "./section/Footer";
import ProfileCard from "../Components/ProfileCard";
import avatarImg from "../img/relinggaa.png";
import avatarMeguns from "../img/meguns.png";  
import avatarOpung from "../img/opung.png";
export default function Landing() {
    const [showNavbar, setShowNavbar] = useState(false);
    const quotesRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (quotesRef.current) {
                const quotesBottom = quotesRef.current.offsetTop + quotesRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                
                // Show navbar even earlier - when user scrolls past 30% of QuotesSection
                setShowNavbar(scrollPosition > quotesBottom * 0.3);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <NavbarLanding showNavbar={showNavbar} />
            <div className="landing">
                <div ref={quotesRef} id="quotes-section">
                    <QuotesSection />
                </div>
                <DomeGalerySession />
                <div id="services-section">
                    <ServicesSection />
                </div>
                <div id="psikolog-section">
                    <PsikologSection />
                </div>
                <div id="testimoni-section">
                    <TestimoniSection />
                </div>
                <div id="about-section">
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
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => console.log('Contact clicked')}
                                />
                                <ProfileCard
                                    name="Mega Bunawi"
                                    title="System Analyst-Sofware Quality Assurance"
                                    handle="megabunawi"
                                    status="Online"
                                    contactText="Contact Me"
                                    avatarUrl={avatarMeguns}
                                    miniAvatarUrl={avatarMeguns}
                                    iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384069.png"
                                    showUserInfo={true}
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => console.log('Contact clicked')}
                                />
                                <ProfileCard
                                    name="Rasendriya Abel"
                                    title="AI Engineer-Backend Developer"
                                    handle="RasendriyaAbel"
                                    status="Online"
                                    contactText="Contact Me"
                                    avatarUrl={avatarOpung}
                                    miniAvatarUrl={avatarOpung}
                                    iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384069.png"
                                    showUserInfo={true}
                                    enableTilt={true}
                                    enableMobileTilt={false}
                                    onContactClick={() => console.log('Contact clicked')}
                                />
                      

                        </div>

                        {/* Footer Text */}
                        <div className="text-center mt-16">
                            <p className="text-white/60 text-sm">
                                Dibuat dengan ❤️ untuk kesehatan mental yang lebih baik
                            </p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
