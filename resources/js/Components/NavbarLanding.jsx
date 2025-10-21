import React, { useState, useEffect } from 'react';

export default function NavbarLanding() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Layanan Kami', href: '/layanan' },
        { name: 'Psikolog', href: '/psikolog' },
        { name: 'About Us', href: '/about' },
        { name: 'Testimoni', href: '/testimoni' }
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pt-4 px-4">
            <nav className={`transition-all duration-300 ${
                isScrolled 
                    ? 'bg-black/80 backdrop-blur-lg border border-white/20' 
                    : 'bg-black/60 backdrop-blur-md border border-white/10'
            }`} style={{
                borderRadius: '50px',
                padding: '8px 24px',
                minWidth: 'fit-content',
                maxWidth: '800px',
                width: 'auto',
                margin: '0 auto'
            }}>
                <div className="flex items-center justify-between h-12 gap-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-white flex items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                <div className="w-4 h-4 bg-black rounded-full"></div>
                            </div>
                            <span>BeyondMind</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white/90 hover:text-white px-3 py-1 text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <a
                            href="/register"
                            className="text-white/90 hover:text-white px-3 py-1 text-sm font-medium transition-colors duration-200"
                        >
                            Sign Up
                        </a>
                        <a
                            href="/login"
                            className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                        >
                            Sign In
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-green-400 focus:outline-none focus:text-green-400 transition-colors duration-200"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 mt-2 z-50">
                        <div className="px-4 py-3 space-y-2 bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white/90 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-2 border-t border-white/10">
                                <div className="flex flex-col space-y-2">
                                    <a
                                        href="/register"
                                        className="text-white/90 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </a>
                                    <a
                                        href="/login"
                                        className="bg-white text-black block px-3 py-2 rounded-full text-base font-medium transition-all duration-200 hover:scale-105 text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
