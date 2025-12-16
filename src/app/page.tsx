"use client";

import CinematicCore from "@/components/sections/CinematicCore";
import CarouselShowcase from "@/components/sections/CarouselShowcase"; // Import baru
import PartnersMarquee from "@/components/sections/PartnersMarquee";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      
      {/* Hero + Invitation + Content (Ada Framenya) */}
      <CinematicCore />
      
      {/* Saat scroll lewat CinematicCore, Frame akan tertinggal di atas 
          dan user masuk ke area 'Normal' (Carousel) */}
      <CarouselShowcase />
      
      <PartnersMarquee />
      
      <footer className="bg-lumiere-dark py-12 text-center border-t border-white/10">
        <h2 className="text-gold-shine font-serif text-2xl mb-2">LUMIERE EXPERIENCE</h2>
        <p className="text-white/40 text-xs tracking-widest uppercase">© 2025 All Rights Reserved</p>
      </footer>
    </main>
  );
}