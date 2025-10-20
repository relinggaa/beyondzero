import React from "react";
import LiquidEther from "../../Components/LiquidEther";
import NavbarLanding from "../../Components/NavbarLanding";
import TextPressure from "../../Components/TextPressure";
import TextType from "../../Components/TextType";

export default function HeroSection() {
    return (
        <section id="home">
        <div style={{backgroundColor: 'black', height: '100vh', width: '100%', position: 'relative' }}>

            {/* Navbar */}
            <NavbarLanding />
            
            {/* LiquidEther Background */}
            <LiquidEther
                colors={['#FFFFFF', '#F2F2F2', '#E6E6E6']}

                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />
            
            {/* TextPressure Component */}
            <div style={{
                position: 'absolute', 
                top: '40%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 10, 
                textAlign: 'center' 
            }}>
               <TextPressure
                text="Hello!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={320}
                style={{ zIndex: 10 }}
            />  
            </div>

            {/* TextType Component */}
            <div style={{
                position: 'absolute', 
                bottom: '30vh', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 20, 
                color: 'white', 
                fontSize: '2rem', 
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                <TextType 
                    text={[ 
                        "🌟 Selamat datang di ruang aman Anda", 
                        "💚 Mulailah perjalanan kesehatan mental Anda", 
                        "🤝 Kami di sini untuk mendukung Anda setiap langkah" 
                    ]}
                    typingSpeed={75} 
                    pauseDuration={1500} 
                    showCursor={true} 
                    cursorCharacter="|" 
                />
            </div>
        </div>
        </section>
    );
}


