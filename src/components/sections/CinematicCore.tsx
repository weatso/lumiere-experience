"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LumiereButton from "../ui/LumiereButtons";

export default function CinematicCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const invRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- 1. GLOBAL SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

  // NAVBAR LOGIC: Muncul setelah 10% scroll
  const navY = useTransform(smoothProgress, [0.08, 0.15], ["-100%", "0%"]);

  // FRAME LOGIC:
  const frameLeft = useTransform(smoothProgress, [0.02, 0.2], ["60%", "10%"]);
  const frameRotate = useTransform(smoothProgress, [0, 0.2], [-10, 5]);
  const frameOpacity = useTransform(smoothProgress, [0.98, 1], [1, 0]);


  // --- 2. INVITATION LOGIC ---
  const { scrollYProgress: invProgress } = useScroll({ target: invRef, offset: ["start start", "end end"] });
  const invStripY = useTransform(invProgress, [0, 1], ["0%", "-60%"]); 
  const invTextOpacity = useTransform(invProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const invPointerEvents = useTransform(invProgress, (val) => val > 0.05 && val < 0.95 ? "auto" : "none");


  // --- 3. CONTENT LOGIC ---
  const { scrollYProgress: contentProgress } = useScroll({ target: contentRef, offset: ["start start", "end end"] });
  const contentStripY = useTransform(contentProgress, [0, 1], ["0%", "-60%"]);
  const contentTextOpacity = useTransform(contentProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const contentPointerEvents = useTransform(contentProgress, (val) => val > 0.05 && val < 0.95 ? "auto" : "none");


  return (
    <div ref={containerRef} className="relative bg-lumiere-base">

      {/* =========================================================
          LAYER 0: FIXED FRAME (BACKGROUND)
      ========================================================= */}
      <motion.div 
        style={{ opacity: frameOpacity }}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0 overflow-hidden flex items-center"
      >
        <motion.div
          style={{ left: frameLeft, rotateY: frameRotate }}
          // MOBILE: Top 15% (Agak ke atas biar ga ketutup teks hero di bawah)
          className="absolute top-1/2 -translate-y-1/2 w-[260px] md:w-[320px] aspect-[3/4] 
                     perspective-1000 max-md:!left-1/2 max-md:!-translate-x-1/2 max-md:!top-[15%] max-md:!translate-y-0 max-md:!opacity-100 transition-all duration-100"
        >
          <div className="w-full h-full bg-black border-[8px] md:border-[12px] border-black shadow-2xl rounded-sm overflow-hidden relative">
            <div className="w-full h-full relative bg-zinc-900">
               {/* HERO IMAGE STATIC */}
               <motion.div 
                 style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
                 className="absolute inset-0 bg-gradient-to-br from-amber-900 to-black flex items-center justify-center z-30"
               >
                  <span className="text-white/20 text-4xl md:text-6xl font-serif">LUMIERE</span>
               </motion.div>
               {/* INVITATION STRIP */}
               <motion.div 
                  style={{ opacity: useTransform(invProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
                  className="absolute inset-0 z-20"
               >
                  <motion.div style={{ y: invStripY }} className="w-full flex flex-col">
                     {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="w-full aspect-[3/4] bg-[#2d1b1b] flex items-center justify-center border-b border-black/20">
                           <span className="text-white/20">Invite {i}</span>
                        </div>
                     ))}
                  </motion.div>
               </motion.div>
               {/* CONTENT STRIP */}
               <motion.div 
                  style={{ opacity: useTransform(contentProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
                  className="absolute inset-0 z-20"
               >
                   <motion.div style={{ y: contentStripY }} className="w-full flex flex-col">
                     {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="w-full aspect-[3/4] bg-[#1a2d25] flex items-center justify-center border-b border-black/20">
                           <span className="text-white/20">Content {i}</span>
                        </div>
                     ))}
                  </motion.div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>


      {/* =========================================================
          LAYER 1: NAVBAR (FIXED, ANIMATED, RIGHT ALIGNED)
      ========================================================= */}
      <motion.nav 
        style={{ y: navY }} 
        className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 px-6 md:px-12 flex justify-between items-center bg-lumiere-base/95 backdrop-blur-md border-b border-lumiere-gold/20 shadow-sm"
      >
        {/* LOGO KIRI */}
        <h1 className="text-gold-shine font-serif text-lg md:text-2xl font-bold tracking-widest cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            LUMIERE
        </h1>

        {/* MENU KANAN (Desktop Only) */}
        <div className="flex gap-6 items-center">
            <div className="hidden md:flex gap-6 mr-4">
                <LumiereButton variant="navbar" onClick={() => invRef.current?.scrollIntoView({behavior:'smooth'})}>Invitation</LumiereButton>
                <LumiereButton variant="navbar" onClick={() => contentRef.current?.scrollIntoView({behavior:'smooth'})}>Content</LumiereButton>
            </div>
            <LumiereButton variant="hero" className="scale-75 md:scale-90 px-4 md:px-8">Book Date</LumiereButton>
        </div>
      </motion.nav>


      {/* =========================================================
          LAYER 2: FIXED TEXT OVERLAY (INVITATION & CONTENT)
      ========================================================= */}
      
      {/* 2A. INVITATION TEXT */}
      <motion.div 
        style={{ opacity: invTextOpacity, pointerEvents: invPointerEvents as any }}
        className="fixed top-0 left-0 w-full h-screen z-10 flex flex-col justify-end md:justify-center items-center md:items-end px-0 md:px-24 pb-0 md:pb-0"
      >
         <div className="
            w-full md:w-1/2 
            bg-lumiere-base/95 md:bg-lumiere-base/90 backdrop-blur-md 
            p-8 pb-12 md:p-12 
            border-t md:border border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-sm 
            rounded-t-3xl md:rounded-sm
         ">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-lumiere-gold"></div>
                <span className="text-gold-shine text-[10px] md:text-xs font-bold uppercase tracking-widest">The Experience</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-lumiere-dark mb-4 leading-tight">Digital Invitation</h2>
            <p className="text-sm md:text-lg text-lumiere-dark/80 leading-relaxed mb-6">
               Undangan adalah impresi pertama. Desain responsif, elegan, dan abadi.
            </p>
            <div className="flex justify-start">
                <LumiereButton variant="invitation" className="w-full md:w-auto">View Collections</LumiereButton>
            </div>
         </div>
      </motion.div>

      {/* 2B. CONTENT TEXT */}
      <motion.div 
        style={{ opacity: contentTextOpacity, pointerEvents: contentPointerEvents as any }}
        className="fixed top-0 left-0 w-full h-screen z-10 flex flex-col justify-end md:justify-center items-center md:items-end px-0 md:px-24 pb-0 md:pb-0"
      >
         <div className="
            w-full md:w-1/2 
            bg-lumiere-base/95 md:bg-lumiere-base/90 backdrop-blur-md 
            p-8 pb-12 md:p-12 
            border-t md:border border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-sm 
            rounded-t-3xl md:rounded-sm
         ">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-lumiere-gold"></div>
                <span className="text-gold-shine text-[10px] md:text-xs font-bold uppercase tracking-widest">Behind The Scenes</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-lumiere-dark mb-4 leading-tight">Content Creator</h2>
            <p className="text-sm md:text-lg text-lumiere-dark/80 leading-relaxed mb-6">
               Momen candid tak ternilai. Kami mengabadikan tawa dan detail kecil Anda.
            </p>
            <div className="flex justify-start">
                <LumiereButton variant="content" className="w-full md:w-auto">See Portfolio</LumiereButton>
            </div>
         </div>
      </motion.div>


      {/* =========================================================
          LAYER 3: SCROLL TRACKS & HERO SECTION
      ========================================================= */}
      <div className="relative z-0">
        
        {/* HERO SECTION (GLASSMORPHISM BOX ADDED) */}
        <section className="h-screen flex items-center justify-center md:justify-start px-4 md:px-24 relative z-20">
           
           {/* REVISI: BOX GLASSMORPHISM UNTUK JUDUL UTAMA */}
           {/* mt-[35vh] di mobile agar turun di bawah frame, tapi aman karena ada background glass */}
           <div className="
              max-w-xl 
              mt-[35vh] md:mt-0 
              bg-lumiere-base/80 backdrop-blur-md 
              p-8 md:p-12 
              rounded-xl md:rounded-sm 
              border border-white/40 md:border-white/20
              shadow-lg md:shadow-none
              text-center md:text-left
           ">
              <span className="text-gold-shine text-xs md:text-sm uppercase tracking-[0.5em] font-bold block mb-4">Est. 2025</span>
              <h1 className="text-5xl md:text-8xl font-serif text-lumiere-dark font-bold leading-tight mb-6">
                LUMIERE
              </h1>
              <p className="text-lumiere-grey text-base md:text-lg italic max-w-md mx-auto md:mx-0">
                "Illuminating Your Best Moments."
              </p>
           </div>
           
        </section>

        {/* TRACKS */}
        <div ref={invRef} id="invitation" className="h-[400vh] w-full" />
        <div ref={contentRef} id="content" className="h-[400vh] w-full" />
      </div>
      
      <div className="h-[20vh] w-full relative z-10" />

    </div>
  );
}