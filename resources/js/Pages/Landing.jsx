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
        handleScroll(); // Check initial position
        
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
                <Footer />
            </div>
        </>
    );
}
