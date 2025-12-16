"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "navbar" | "hero" | "invitation" | "content";
  onClick?: () => void;
  className?: string;
}

export default function LumiereButton({ children, variant = "hero", onClick, className = "" }: ButtonProps) {
  
  // 1. NAVBAR BUTTON (Simple, Text Only, Hover Glow)
  if (variant === "navbar") {
    return (
      <button onClick={onClick} className={`text-xs uppercase tracking-widest font-bold text-lumiere-dark/70 hover:text-lumiere-gold transition-colors duration-300 ${className}`}>
        {children}
      </button>
    );
  }

  // 2. HERO CTA (Luxury, Gold Border, Filled Hover)
  if (variant === "hero") {
    return (
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-8 py-3 border border-lumiere-gold text-lumiere-gold hover:bg-lumiere-gold hover:text-white transition-all duration-500 uppercase text-xs tracking-[0.2em] ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  // 3. INVITATION BUTTON (Elegant, Minimalist Dark)
  if (variant === "invitation") {
    return (
      <button onClick={onClick} className={`group relative px-6 py-3 bg-lumiere-dark text-white overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 text-xs uppercase tracking-widest group-hover:text-lumiere-gold transition-colors">
          {children}
        </span>
      </button>
    );
  }

  // 4. CONTENT CREATOR BUTTON (Modern, Outline)
  if (variant === "content") {
    return (
      <button onClick={onClick} className={`px-6 py-3 border border-lumiere-dark text-lumiere-dark hover:bg-lumiere-dark hover:text-white transition-all duration-300 text-xs uppercase tracking-widest ${className}`}>
        {children}
      </button>
    );
  }

  return null;
}