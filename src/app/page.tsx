"use client";

import CinematicCore from "@/components/sections/CinematicCore";
import PartnersMarquee from "@/components/sections/PartnersMarquee";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <CinematicCore />
      <PartnersMarquee />
      
      {/* Footer Sementara */}
      <footer className="bg-lumiere-dark py-12 text-center">
        <h2 className="text-gold-shine font-serif text-2xl mb-2">LUMIERE EXPERIENCE</h2>
        <p className="text-white/40 text-xs tracking-widest uppercase">© 2025 All Rights Reserved</p>
      </footer>
    </main>
  );
}