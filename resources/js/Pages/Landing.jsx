import React from "react";
import HeroSection from "./section/HeroSection";
import ServicesSection from "./section/ServicesSection";
import QuotesSection from "./section/QuotesSection";

export default function Landing() {
    return (
        <>
            <div className="landing">
                <HeroSection />
            
                <QuotesSection />
                <ServicesSection />
            </div>
        </>
    );
}
