"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- DATA KONTEN ---
const SECTIONS = [
  {
    id: "hero",
    type: "intro",
    title: "LUMIERE",
    subtitle: "Est. 2025",
    text: "Illuminating Your Best Moments",
    images: [1, 2, 3] 
  },
  {
    id: "invitation",
    type: "content",
    label: "Our Service",
    title: "Digital Invitation",
    text: "Undangan digital yang dirancang bukan sekadar untuk dibaca, tapi untuk dirasakan. Responsif, interaktif, dan mewah.",
    images: [4, 5, 6, 7] 
  },
  {
    id: "content-creator",
    type: "content",
    label: "Captured Moments",
    title: "Wedding Content Creator",
    text: "Biarkan fotografer utama fokus pada potret formal. Kami hadir untuk menangkap tawa candid dan momen 'behind the scenes' yang intim.",
    images: [8, 9, 10, 11]
  }
];

const ALL_IMAGES = SECTIONS.flatMap(s => s.images.map(img => ({ id: img, sectionId: s.id })));

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  // --- SCROLL PHYSICS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring yang lebih 'berat' untuk kesan benda fisik yang besar
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 80 });

  // 1. LOGIKA POSISI (DARI TENGAH KE KIRI)
  // 0% Scroll: Di Tengah (0vw)
  // 100% Scroll: Pindah ekstrim ke Kiri (-30vw)
  // Ini menjawab request: "Bergeser ke kiri halaman"
  const helixX = useTransform(smoothProgress, [0, 1], ["10vw", "-30vw"]);

  // 2. LOGIKA ROTASI "EKSTRIM" (SPIRAL)
  // RotateY: Memutar strip pada poros vertikal.
  // 0 -> 45deg (Sangat miring) -> 25deg (Menetap miring)
  const helixRotateY = useTransform(smoothProgress, [0, 0.4, 1], [0, 45, 25]);
  
  // RotateZ: Memiringkan strip ke samping (seperti menara pisa)
  const helixRotateZ = useTransform(smoothProgress, [0, 1], [0, -10]);

  // Scale: Zoom in saat dia memutar (mendekat ke wajah user)
  const helixScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 1]);

  // 3. LOGIKA SCROLL VERTIKAL STRIP
  const stripY = useTransform(smoothProgress, [0, 1], ["0%", "-70%"]);

  // 4. NAVBAR
  const navY = useTransform(smoothProgress, [0.05, 0.15], ["-100%", "0%"]);


  return (
    <div ref={containerRef} className="relative bg-lumiere-base min-h-[450vh] overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <motion.nav 
        style={{ y: navY }}
        className="fixed top-0 left-0 right-0 z-50 h-24 flex justify-between items-center px-8 md:px-12 bg-lumiere-base/90 backdrop-blur-md border-b border-lumiere-gold/30"
      >
         <h1 className="text-gold-shine font-serif text-2xl font-bold tracking-[0.2em]">LUMIERE</h1>
         <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-lumiere-dark/70">
            {SECTIONS.filter(s => s.type === 'content').map(s => (
                <span key={s.id} className={activeSection === s.id ? "text-lumiere-gold" : ""}>
                    {s.title}
                </span>
            ))}
             <button className="px-6 py-2 border border-lumiere-gold text-lumiere-gold hover:bg-lumiere-gold hover:text-white transition-all">
                Book Date
            </button>
         </div>
      </motion.nav>


      {/* --- THE HELIX LAYER (Background Sticky) --- */}
      {/* Perspective dibuat lebih kecil (800px) agar efek 3D makin "Nge-pop" / Distorted */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0 perspective-800">
        
        {/* Container Manipulasi 3D */}
        <motion.div 
          style={{ 
            x: helixX,          // Gerak ke Kiri
            rotateY: helixRotateY, // Putaran Ekstrim
            rotateZ: helixRotateZ, // Miring Samping
            scale: helixScale      // Zoom Effect
          }}
          className="relative w-[350px] md:w-[450px] h-[120vh] flex justify-center transform-style-3d origin-center"
        >
             {/* STRIP FILM */}
             <motion.div 
                style={{ y: stripY }}
                className="w-full flex flex-col bg-[#1a1a1a] shadow-2xl border-x-4 border-[#0a0a0a]"
             >
                {/* Sprocket Holes Kiri */}
                <div className="absolute left-1 top-0 bottom-0 w-6 z-20" 
                     style={{backgroundImage: 'radial-gradient(circle, #333 4px, transparent 4.5px)', backgroundSize: '100% 30px', backgroundRepeat: 'repeat-y'}} />
                
                {/* Sprocket Holes Kanan */}
                <div className="absolute right-1 top-0 bottom-0 w-6 z-20" 
                     style={{backgroundImage: 'radial-gradient(circle, #333 4px, transparent 4.5px)', backgroundSize: '100% 30px', backgroundRepeat: 'repeat-y'}} />

                {/* IMAGES */}
                {ALL_IMAGES.map((img, idx) => (
                    <div key={idx} className="relative w-full aspect-[4/5] p-8 pb-0">
                        <div className={`w-full h-full relative overflow-hidden border border-white/10 ${img.id % 2 === 0 ? 'bg-zinc-800' : 'bg-neutral-800'}`}>
                           {/* Placeholder Number */}
                           <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-serif">
                             {img.id}
                           </div>
                           {/* Section Label (Supaya tau ini foto utk section mana) */}
                           <div className="absolute top-4 right-4 bg-lumiere-gold/20 px-2 py-1 text-[10px] uppercase text-lumiere-gold tracking-widest border border-lumiere-gold/30">
                               {img.sectionId}
                           </div>
                        </div>
                    </div>
                ))}
             </motion.div>
             
             {/* Gradient Overlay for Mobile readability */}
             <div className="md:hidden absolute inset-0 bg-lumiere-base/90 z-10" />
        </motion.div>
      </div>


      {/* --- CONTENT LAYER (Foreground) --- */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        
        {SECTIONS.map((section, index) => {
            if (section.type === "intro") {
                return <HeroSection key={section.id} data={section} />;
            }
            return (
                <ContentSection 
                    key={section.id} 
                    data={section} 
                    onVisible={() => setActiveSection(section.id)} 
                />
            );
        })}

        <div className="h-[20vh]" /> {/* Footer Spacer */}
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function HeroSection({ data }: { data: any }) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-6 relative pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-20"
            >
                <span className="text-gold-shine text-sm md:text-base uppercase tracking-[0.6em] font-bold block mb-4">
                    {data.subtitle}
                </span>
                <h1 className="text-6xl md:text-[10rem] leading-none font-serif font-bold text-lumiere-dark mix-blend-multiply">
                    {data.title}
                </h1>
                <p className="text-lumiere-dark/60 italic text-xl mt-6">
                    "{data.text}"
                </p>
            </motion.div>
        </div>
    )
}

function ContentSection({ data, onVisible }: { data: any, onVisible: () => void }) {
    return (
        <motion.div
            onViewportEnter={onVisible}
            // MARGIN PENTING: Trigger sedikit lebih awal agar sync rasanya pas
            viewport={{ margin: "-30% 0px -30% 0px" }} 
            className="min-h-screen flex flex-col justify-center w-full md:w-[50vw] ml-auto px-8 md:px-24 pointer-events-auto"
        >
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Garis Dekorasi Emas */}
                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-lumiere-gold to-transparent opacity-50 hidden md:block" />

                <span className="text-gold-shine text-xs font-bold tracking-widest uppercase mb-4 block">
                    {data.label}
                </span>
                
                <h2 className="text-5xl md:text-7xl font-serif text-lumiere-dark leading-none mb-8">
                    {data.title}
                </h2>
                
                <p className="text-lumiere-dark/80 text-lg leading-relaxed mb-10 max-w-md">
                    {data.text}
                </p>
                
                <button className="px-10 py-4 border border-lumiere-dark text-xs uppercase tracking-[0.2em] hover:bg-lumiere-dark hover:text-white transition-all duration-300">
                    Explore Details
                </button>
            </motion.div>
        </motion.div>
    )
}