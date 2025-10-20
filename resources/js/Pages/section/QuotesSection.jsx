import React from "react";
import ScrollReveal from "../../Components/ScrollReveal";

export default function QuotesSection() {
    return (
        <section className="mt-98" id="quotes">
            <div className="container mx-auto ">
                <ScrollReveal
                    baseOpacity={0.5}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    rotationEnd="top center"
                    wordAnimationEnd="top center"
                >
                    "Kesehatan mental bukanlah tujuan, melainkan perjalanan yang penuh makna. Setiap langkah kecil yang kita ambil untuk merawat diri, setiap momen yang kita dedikasikan untuk memahami emosi, dan setiap upaya yang kita lakukan untuk menjaga keseimbangan jiwa adalah investasi terbaik untuk masa depan yang lebih cerah, bahagia, dan penuh makna. Bersama BeyondMind, mari kita mulai perjalanan transformasi diri menuju versi terbaik dari diri kita sendiri."
                </ScrollReveal>
            </div>
        </section>
    );
}


