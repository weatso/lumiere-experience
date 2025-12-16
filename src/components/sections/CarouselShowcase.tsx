"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CAROUSEL_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8]; // Lebih banyak item contoh

export default function CarouselShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Efek Parallax Background Judul
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Fungsi Scroll Tombol
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === "left" ? -400 : 400; // Jarak scroll per klik
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-lumiere-dark overflow-hidden">
      
      {/* Header dengan Parallax */}
      <motion.div style={{ y }} className="container mx-auto px-6 mb-12 text-center relative z-10">
        <span className="text-gold-shine text-xs font-bold uppercase tracking-[0.3em] block mb-4">
          Visual Journal
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white">
          Recent Stories
        </h2>
      </motion.div>

      {/* Carousel Container & Controls */}
      <div className="relative w-full group">
        
        {/* BUTTON LEFT */}
        <button 
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-lumiere-base/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-lumiere-gold hover:border-lumiere-gold transition-all md:opacity-0 group-hover:opacity-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>

        {/* BUTTON RIGHT */}
        <button 
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-lumiere-base/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-lumiere-gold hover:border-lumiere-gold transition-all md:opacity-0 group-hover:opacity-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>


        {/* SLIDER TRACK (Scrollable dengan CSS hidden scrollbar) */}
        <div 
          ref={sliderRef}
          className="flex gap-6 pl-6 md:pl-[15vw] pr-6 w-full overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar Firefox/IE
        >
          {/* Hide scrollbar Chrome/Safari/Edge */}
          <style jsx>{`
            div::-webkit-scrollbar {
                display: none;
            }
          `}</style>

          {CAROUSEL_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              // REVISI UKURAN ITEM: md:w-[450px] jadi md:w-[280px]
              className="relative w-[220px] md:w-[280px] aspect-[4/5] bg-neutral-900 overflow-hidden border border-white/10 shrink-0 rounded-sm group/item cursor-pointer"
            >
               {/* Placeholder Image */}
               <div className={`absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-serif ${i%2===0 ? 'bg-zinc-800' : 'bg-neutral-800'}`}>
                 {i + 1}
               </div>
               
               {/* Overlay Text Hover */}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-gold-shine text-[10px] uppercase tracking-widest mb-2">Wedding</span>
                  <span className="text-white text-lg font-serif italic">Romeo & Juliet</span>
               </div>
            </motion.div>
          ))}
          {/* Padding Kanan agar item terakhir tidak mepet */}
          <div className="w-[5vw] shrink-0" />
        </div>
      </div>

      {/* Decorative Line */}
      <div className="w-full h-[1px] bg-white/10 mt-20" />
    </section>
  );
}