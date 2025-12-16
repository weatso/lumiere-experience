"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import LumiereButton from "../ui/LumiereButtons";

// DATA SECTIONS
const DATA = [
  {
    id: "invitation",
    subtitle: "The Experience",
    title: "Digital Invitation",
    desc: "Undangan bukan sekadar informasi, tapi impresi pertama. Kami menciptakan pengalaman digital yang responsif, interaktif, dan merefleksikan kemewahan acara Anda.",
    cta: "View Collections",
    imgColor: "bg-[#1a1a1a]" // Nanti ganti Image URL
  },
  {
    id: "content",
    subtitle: "Behind The Scenes",
    title: "Wedding Content Creator",
    desc: "Fokuslah menikmati momen. Tim kami akan menangkap ribuan detail kecil, tawa candid, dan air mata bahagia secara estetik untuk kebutuhan sosial media Anda secara instan.",
    cta: "See Portfolio",
    imgColor: "bg-[#2a2a2a]" // Nanti ganti Image URL
  }
];

export default function CinematicCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"hero" | "invitation" | "content">("hero");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 90 });

  // --- LOGIKA POSISI FRAME (Kanan -> Kiri) ---
  // 0 - 0.15 (Hero): Frame di Kanan (60%)
  // 0.15 - 0.25 (Transisi): Pindah ke Kiri (10%)
  // > 0.25 (Content): Stay di Kiri
  const frameLeftPosition = useTransform(smoothProgress, 
    [0, 0.15, 0.25, 1], 
    ["60%", "60%", "5%", "5%"] 
  );
  
  // Khusus Mobile: Frame selalu di tengah/background, opacity main
  const mobileOpacity = useTransform(smoothProgress, [0, 0.1], [0.3, 0.1]);

  // --- LOGIKA TEKS HERO (Fade Out saat scroll) ---
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const heroPointerEvents = useTransform(smoothProgress, (val) => val > 0.15 ? "none" : "auto");


  return (
    <div ref={containerRef} className="relative bg-lumiere-base min-h-[300vh]">
      
      {/* --- NAVBAR (Fixed) --- */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 md:px-12 flex justify-between items-center bg-lumiere-base/90 backdrop-blur-md border-b border-lumiere-gold/20">
        <h1 className="text-gold-shine font-serif text-2xl font-bold tracking-widest">LUMIERE</h1>
        <div className="hidden md:flex gap-8">
          <LumiereButton variant="navbar" onClick={() => document.getElementById('sec-invitation')?.scrollIntoView({behavior:'smooth'})}>Invitation</LumiereButton>
          <LumiereButton variant="navbar" onClick={() => document.getElementById('sec-content')?.scrollIntoView({behavior:'smooth'})}>Content</LumiereButton>
        </div>
        <LumiereButton variant="hero" className="scale-75 md:scale-90">Book Now</LumiereButton>
      </nav>


      {/* --- MASTER FRAME (Sticky Background) --- */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center overflow-hidden pointer-events-none z-0">
        
        {/* Container Frame yang bergerak Kanan -> Kiri */}
        <motion.div 
          style={{ 
            left: frameLeftPosition, // Desktop Logic
            opacity: 1
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[300px] md:w-[450px] aspect-[3/4] 
                     /* Mobile Override: Selalu tengah & transparan */
                     max-md:!left-1/2 max-md:!-translate-x-1/2 max-md:!opacity-20
                     perspective-1000"
        >
          
          {/* THE FRAME ITSELF */}
          <motion.div 
            animate={{ 
               rotateY: activeSection === 'hero' ? -15 : 10, // Hero miring kiri, Content miring kanan
               scale: activeSection === 'hero' ? 0.9 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full bg-black p-4 shadow-2xl relative border-[8px] border-black rounded-sm"
          >
             {/* Dynamic Image Switcher */}
             <div className="w-full h-full relative overflow-hidden bg-zinc-900">
                <AnimatePresence mode="wait">
                  {/* HERO IMAGE */}
                  {activeSection === 'hero' && (
                    <motion.div 
                      key="hero-img"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-amber-900 to-black flex items-center justify-center"
                    >
                       <span className="text-white/20 text-6xl font-serif">HERO</span>
                    </motion.div>
                  )}

                  {/* INVITATION IMAGE */}
                  {activeSection === 'invitation' && (
                    <motion.div 
                      key="inv-img"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-[#2d1b1b] flex items-center justify-center"
                    >
                       <span className="text-white/20 text-4xl font-serif text-center">WEDDING<br/>INVITE</span>
                    </motion.div>
                  )}

                  {/* CONTENT CREATOR IMAGE */}
                  {activeSection === 'content' && (
                    <motion.div 
                      key="cont-img"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-[#1a2d25] flex items-center justify-center"
                    >
                       <span className="text-white/20 text-4xl font-serif text-center">CONTENT<br/>CREATOR</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlay Noise/Texture for Luxury Feel */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+")'}}></div>
             </div>
          </motion.div>

        </motion.div>
      </div>


      {/* --- SCROLLABLE CONTENT (Foreground) --- */}
      <div className="relative z-10">

        {/* 1. HERO SECTION (Teks di KIRI/TENGAH) */}
        <section 
          className="h-screen flex items-center px-6 md:px-24"
          onMouseEnter={() => setActiveSection('hero')}
        >
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents as any }} 
            className="max-w-2xl"
          >
            <span className="text-gold-shine text-sm uppercase tracking-[0.5em] font-bold">Est. 2025</span>
            <h1 className="text-6xl md:text-8xl font-serif text-lumiere-dark font-bold leading-tight my-6">
              LUMIERE
            </h1>
            <p className="text-lumiere-grey text-lg italic mb-8 max-w-md">
              "Illuminating Your Best Moments."
            </p>
            <LumiereButton variant="hero">Explore Our World</LumiereButton>
          </motion.div>
        </section>

        {/* 2. BUSINESS SECTIONS (Teks di KANAN) */}
        <div className="w-full md:w-1/2 ml-auto px-6 md:px-24 pb-32">
          
          {DATA.map((item) => (
            <motion.div
              id={`sec-${item.id}`} // ID untuk navbar scroll
              key={item.id}
              onViewportEnter={() => setActiveSection(item.id as any)}
              viewport={{ amount: 0.6 }} // Aktif saat 60% teks terlihat
              className="min-h-screen flex flex-col justify-center"
            >
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-lumiere-gold"></div>
                  <span className="text-gold-shine text-xs font-bold uppercase tracking-widest">{item.subtitle}</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-serif text-lumiere-dark mb-8 leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-lumiere-dark/80 text-lg leading-relaxed mb-10">
                  {item.desc}
                </p>

                <LumiereButton variant={item.id === 'invitation' ? 'invitation' : 'content'}>
                  {item.cta}
                </LumiereButton>
              </motion.div>
            </motion.div>
          ))}
        
        </div>

      </div>

    </div>
  );
}