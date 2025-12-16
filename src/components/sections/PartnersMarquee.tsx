"use client";

// Placeholder Logo (Ganti dengan Image Sanity nanti)
const PARTNERS = ["Venue A", "Organizer B", "Florist C", "Catering D", "Venue E", "Organizer F"];

export default function PartnersMarquee() {
  return (
    <section className="py-20 bg-lumiere-base border-t border-lumiere-dark/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h3 className="text-gold-shine text-xs font-bold uppercase tracking-[0.3em]">Official Partners</h3>
      </div>
      
      {/* Infinite Slider Wrapper */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {/* Render 2x agar looping halus */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
            <span key={i} className="text-4xl md:text-6xl font-serif text-lumiere-dark/20 uppercase hover:text-lumiere-gold/50 transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
      
      {/* Tambahkan ini di globals.css nanti:
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
      */}
    </section>
  );
}