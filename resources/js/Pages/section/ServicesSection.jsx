import Carousel from '../../Components/Carousel'
import React from 'react';

export default function ServicesSection() {
    return (
        <div className="w-full py-16 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Layanan Kesehatan Mental Kami
                    </h2>
                    <p className="text-lg text-white max-w-3xl mx-auto">
                        Platform komprehensif untuk mendukung perjalanan kesehatan mental Anda dengan teknologi terdepan dan pendekatan yang personal.
                    </p>
                </div>
                <div className="flex justify-center w-full">
                    <Carousel
                        baseWidth={1200}
                        autoplay={true}
                        autoplayDelay={6000}
                        pauseOnHover={true}
                        loop={true}
                        round={false}
                    />
                </div>
            </div>
        </div>
    )
}