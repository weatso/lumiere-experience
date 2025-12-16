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

  // FRAME LOGIC:
  const frameLeft = useTransform(smoothProgress, [0.02, 0.2], ["60%", "10%"]);
  const frameRotate = useTransform(smoothProgress, [0, 0.2], [-10, 5]);
  const frameOpacity = useTransform(smoothProgress, [0.98, 1], [1, 0]);


  // --- 2. INVITATION LOGIC ---
  const { scrollYProgress: invProgress } = useScroll({ target: invRef, offset: ["start start", "end end"] });
  const invStripY = useTransform(invProgress, [0, 1], ["0%", "-60%"]); 
  // Text Opacity Logic
  const invTextOpacity = useTransform(invProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const invPointerEvents = useTransform(invProgress, (val) => val > 0.05 && val < 0.95 ? "auto" : "none");


  // --- 3. CONTENT LOGIC ---
  const { scrollYProgress: contentProgress } = useScroll({ target: contentRef, offset: ["start start", "end end"] });
  const contentStripY = useTransform(contentProgress, [0, 1], ["0%", "-60%"]);
  // Text Opacity Logic
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
          // REVISI UKURAN & POSISI MOBILE:
          // md:w-[320px] -> Ukuran desktop dikecilkan (80%)
          // max-md:!top-[15%] -> Di mobile naik ke atas
          // max-md:!opacity-100 -> Di mobile jelas terlihat
          className="absolute top-1/2 -translate-y-1/2 w-[280px] md:w-[320px] aspect-[3/4] 
                     perspective-1000 max-md:!left-1/2 max-md:!-translate-x-1/2 max-md:!top-[15%] max-md:!translate-y-0 max-md:!opacity-100 transition-all duration-100"
        >
          <div className="w-full h-full bg-black border-[8px] md:border-[12px] border-black shadow-2xl rounded-sm overflow-hidden relative">
            <div className="w-full h-full relative bg-zinc-900">
               {/* HERO */}
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
          LAYER 1: NAVBAR (FIXED)
      ========================================================= */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 px-6 md:px-12 flex justify-between items-center bg-lumiere-base/90 backdrop-blur-md border-b border-lumiere-gold/20">
        <h1 className="text-gold-shine font-serif text-xl md:text-2xl font-bold tracking-widest">LUMIERE</h1>
        <div className="hidden md:flex gap-8">
           <LumiereButton variant="navbar" onClick={() => invRef.current?.scrollIntoView({behavior:'smooth'})}>Invitation</LumiereButton>
           <LumiereButton variant="navbar" onClick={() => contentRef.current?.scrollIntoView({behavior:'smooth'})}>Content</LumiereButton>
        </div>
        <LumiereButton variant="hero" className="scale-75 md:scale-90">Book Now</LumiereButton>
      </nav>


      {/* =========================================================
          LAYER 2: FIXED TEXT OVERLAY
      ========================================================= */}
      
      {/* 2A. INVITATION TEXT (FIXED) */}
      <motion.div 
        style={{ opacity: invTextOpacity, pointerEvents: invPointerEvents as any }}
        // REVISI MOBILE LAYOUT: justify-end pb-10 (Mobile text di bawah) vs justify-center (Desktop text di tengah)
        className="fixed top-0 left-0 w-full h-screen z-10 flex flex-col justify-end pb-10 md:justify-center items-center md:items-end px-4 md:px-24"
      >
         {/* Box Teks dibatason max-width nya di mobile */}
         <div className="w-full max-w-md md:max-w-none md:w-1/2 bg-lumiere-base/95 backdrop-blur-md p-6 md:p-12 border border-white/50 shadow-xl md:shadow-sm rounded-lg md:rounded-sm">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-lumiere-gold"></div>
                <span className="text-gold-shine text-[10px] md:text-xs font-bold uppercase tracking-widest">The Experience</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-lumiere-dark mb-4 md:mb-6 leading-tight">Digital Invitation</h2>
            <p className="text-sm md:text-lg text-lumiere-dark/80 leading-relaxed mb-6 md:mb-8">
               Undangan yang dirancang untuk dirasakan. Lihat bagaimana desain di frame atas bergerak responsif.
            </p>
            <LumiereButton variant="invitation" className="w-full md:w-auto text-center">View Collections</LumiereButton>
         </div>
      </motion.div>

      {/* 2B. CONTENT TEXT (FIXED) */}
      <motion.div 
        style={{ opacity: contentTextOpacity, pointerEvents: contentPointerEvents as any }}
        // REVISI MOBILE LAYOUT SAMA
        className="fixed top-0 left-0 w-full h-screen z-10 flex flex-col justify-end pb-10 md:justify-center items-center md:items-end px-4 md:px-24"
      >
         <div className="w-full max-w-md md:max-w-none md:w-1/2 bg-lumiere-base/95 backdrop-blur-md p-6 md:p-12 border border-white/50 shadow-xl md:shadow-sm rounded-lg md:rounded-sm">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-lumiere-gold"></div>
                <span className="text-gold-shine text-[10px] md:text-xs font-bold uppercase tracking-widest">Behind The Scenes</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-lumiere-dark mb-4 md:mb-6 leading-tight">Content Creator</h2>
            <p className="text-sm md:text-lg text-lumiere-dark/80 leading-relaxed mb-6 md:mb-8">
               Menangkap ribuan detail candid. Biarkan momen berharga Anda terabadikan secara sinematik.
            </p>
            <LumiereButton variant="content" className="w-full md:w-auto text-center">See Portfolio</LumiereButton>
         </div>
      </motion.div>


      {/* =========================================================
          LAYER 3: SCROLL TRACKS (INVISIBLE)
      ========================================================= */}
      <div className="relative z-0">
        {/* HERO SCROLL AREA */}
        <section className="h-screen flex items-center px-6 md:px-24 relative z-20">
           <div className="max-w-xl mt-20 md:mt-0">
              <span className="text-gold-shine text-xs md:text-sm uppercase tracking-[0.5em] font-bold">Est. 2025</span>
              <h1 className="text-5xl md:text-8xl font-serif text-lumiere-dark font-bold leading-tight my-4 md:my-6">
                LUMIERE
              </h1>
              <p className="text-lumiere-grey text-base md:text-lg italic mb-6 md:mb-8 max-w-md">
                "Illuminating Your Best Moments."
              </p>
           </div>
        </section>
        {/* SCROLL TRACKS */}
        <div ref={invRef} id="invitation" className="h-[400vh] w-full" />
        <div ref={contentRef} id="content" className="h-[400vh] w-full" />
      </div>
      
      <div className="h-[20vh] w-full relative z-10" />

    </div>
  );
}