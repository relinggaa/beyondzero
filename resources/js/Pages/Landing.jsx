import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./section/HeroSection";
import ServicesSection from "./section/ServicesSection";
import QuotesSection from "./section/QuotesSection";
import DomeGalerySession from "./section/DomeGalerySession";
import NavbarLanding from "../Components/NavbarLanding";

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
                <div ref={quotesRef}>
                    <QuotesSection />
                </div>
                <DomeGalerySession />
                <ServicesSection />
            </div>
        </>
    );
}
