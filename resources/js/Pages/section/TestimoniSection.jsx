/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import { Marquee } from "../../Components/ui/marquee"
import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Putri",
    username: "@sarahputri",
    body: "Platform ini benar-benar mengubah hidup saya. Konseling online yang sangat membantu dan psikolognya sangat profesional. Terima kasih telah membantu saya mengatasi kecemasan.",
    img: "https://avatar.vercel.sh/sarah",
    rating: 5,
    role: "Mahasiswa"
  },
  {
    name: "Ahmad Rizki",
    username: "@ahmadrizki",
    body: "Sangat mudah digunakan dan efektif. Saya bisa konsultasi kapan saja tanpa harus keluar rumah. Pelayanan yang luar biasa!",
    img: "https://avatar.vercel.sh/ahmad",
    rating: 5,
    role: "Karyawan"
  },
  {
    name: "Maya Sari",
    username: "@mayasari",
    body: "Tim psikolog yang sangat berpengalaman dan pendekatan yang personal. Saya merasa didengarkan dan dipahami. Highly recommended!",
    img: "https://avatar.vercel.sh/maya",
    rating: 5,
    role: "Ibu Rumah Tangga"
  },
  {
    name: "Budi Santoso",
    username: "@budisantoso",
    body: "Platform kesehatan mental terbaik yang pernah saya gunakan. Interface yang user-friendly dan konseling yang sangat membantu.",
    img: "https://avatar.vercel.sh/budi",
    rating: 5,
    role: "Pengusaha"
  },
  {
    name: "Lisa Dewi",
    username: "@lisadewi",
    body: "Sangat membantu dalam mengatasi stress kerja. Psikolognya memberikan solusi yang tepat dan mudah dipahami. Terima kasih!",
    img: "https://avatar.vercel.sh/lisa",
    rating: 5,
    role: "Profesional"
  },
  {
    name: "Rizki Pratama",
    username: "@rizkipratama",
    body: "Pelayanan yang sangat memuaskan. Saya bisa konsultasi dengan nyaman dan mendapatkan bantuan yang tepat untuk masalah mental saya.",
    img: "https://avatar.vercel.sh/rizki",
    rating: 5,
    role: "Freelancer"
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
  role,
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit cursor-pointer overflow-hidden rounded-2xl border p-6 sm:w-80",
        // Black and white glassmorphism
        "bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/40",
        "hover:bg-white/15 transition-all duration-300 hover:scale-105",
        "shadow-lg hover:shadow-white/10"
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-20">
        <Quote className="w-6 h-6 text-white" />
      </div>
      
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-white text-white" />
        ))}
      </div>
      
      {/* User Info */}
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="relative">
          <img 
            className="rounded-full w-12 h-12 border-2 border-white/30" 
            alt={name} 
            src={img} 
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black"></div>
        </div>
        <div className="flex flex-col">
          <figcaption className="text-base font-semibold text-white">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-gray-300">{role}</p>
          <p className="text-xs text-gray-400">{username}</p>
        </div>
      </div>
      
      {/* Testimonial Text */}
      <blockquote className="text-sm text-gray-200 leading-relaxed italic">
        "{body}"
      </blockquote>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </figure>
  )
}

export default function TestimoniSection() {
  return (
    <div className="relative w-full py-20 bg-black overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
            <Star className="w-5 h-5 text-white fill-white" />
            <span className="text-sm font-medium text-white">Testimoni Klien</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Apa Kata Mereka Tentang
            <span className="block text-gray-300">
              Platform Kami?
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ribuan klien telah merasakan manfaat dari layanan kesehatan mental kami. 
            Dengarkan pengalaman mereka yang menginspirasi.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        
        {/* Gradient Fade Effects */}
        <div className="from-black pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
        <div className="from-black pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        
        {/* Side Fade Effects */}
        <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-300">Klien Puas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-300">Rating Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </div>
  )
}
