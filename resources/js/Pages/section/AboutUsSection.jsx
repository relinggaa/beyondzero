import React from 'react';
import { motion } from 'motion/react';
import { Brain, Bot, Zap, Target, Lightbulb, Shield, Cpu, Database } from 'lucide-react';

export default function AboutUsSection() {
  const aiFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Mood Tracker",
      description: "Teknologi Machine Learning canggih yang menganalisis pola emosional Anda secara real-time dan memberikan prediksi kondisi mental dengan akurasi tinggi."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Chat Assistant",
      description: "Asisten virtual yang dilatih khusus untuk kesehatan mental dengan kemampuan Natural Language Processing untuk memahami konteks emosional."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Algoritma AI yang menganalisis data kesehatan mental untuk memberikan insight mendalam dan rekomendasi personal yang tepat sasaran."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Predictive Therapy",
      description: "Sistem AI yang dapat memprediksi kebutuhan terapi dan mengidentifikasi tanda-tanda awal gangguan mental sebelum berkembang lebih lanjut."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Personalized Insights",
      description: "AI yang belajar dari pola unik Anda untuk memberikan saran terapi yang disesuaikan dengan kebutuhan individual dan preferensi personal."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI-Powered Security",
      description: "Teknologi enkripsi AI dan sistem deteksi anomali untuk melindungi data sensitif dengan tingkat keamanan tertinggi."
    }
  ];

  const stats = [
    { number: "95%", label: "Akurasi AI Prediction" },
    { number: "10,000+", label: "Data Points Analyzed" },
    { number: "24/7", label: "AI Monitoring" },
    { number: "99.9%", label: "Uptime AI Services" }
  ];

  return (
    <div className="relative w-full py-20 bg-black overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Teknologi AI Terdepan</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform Kesehatan Mental
            <span className="block text-gray-300">
              Berbasis Artificial Intelligence
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Kami adalah platform kesehatan mental pertama di Indonesia yang mengintegrasikan teknologi Artificial Intelligence canggih untuk memberikan analisis mendalam, prediksi akurat, dan dukungan personal yang revolusioner bagi perjalanan kesehatan mental Anda.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Teknologi AI yang Kami Gunakan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Innovation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-8 border border-white/10">
            <Lightbulb className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Inovasi AI untuk Masa Depan Kesehatan Mental
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Kami terus mengembangkan teknologi AI terdepan untuk revolusi kesehatan mental. Dengan algoritma pembelajaran mesin yang terus berkembang, 
              kami dapat memberikan prediksi yang lebih akurat, terapi yang lebih personal, dan dukungan yang lebih efektif. 
              Platform kami menggunakan teknologi Natural Language Processing, Computer Vision, dan Predictive Analytics untuk menciptakan 
              pengalaman kesehatan mental yang benar-benar personal dan efektif.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Coba Teknologi AI Kami
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
