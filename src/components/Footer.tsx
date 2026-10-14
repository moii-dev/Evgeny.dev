import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { scrollToSection } from '../hooks/useScrollNavigation';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    scrollToSection('home');
  };

  return (
    <footer className="w-full bg-[#fafaf9] pt-8 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* 1. Upper Bar: Brand lockup & Mission Tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
          {/* Left: Geometric E Monogram & Evgeny.dev */}
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center p-1.5 shadow-2xs">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                <path
                  d="M5 6H19M5 12H15M5 18H19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-[15px] sm:text-base text-neutral-900 tracking-tight">
              Evgeny<span className="text-neutral-400 font-normal">.dev</span>
            </span>
          </div>

          {/* Right: Tagline */}
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Building digital experiences with purpose.
          </p>
        </div>

        {/* 2. Central Hero: Massive Decorative Typography EVGENY.DEV */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-4 sm:py-6 overflow-hidden select-none flex items-center justify-center"
        >
          {/* SVG Text guarantee: Never wraps, responsive 320px to 4K, exact font proportions */}
          <svg
            viewBox="0 0 1200 190"
            className="w-full h-auto max-h-[160px] sm:max-h-[220px] md:max-h-[280px]"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="EVGENY.DEV"
          >
            <defs>
              <linearGradient id="evgenySilverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="74%"
              textAnchor="middle"
              className="font-serif font-normal"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '172px',
                letterSpacing: '0.04em',
              }}
              fill="url(#evgenySilverGradient)"
            >
              EVGENY.DEV
            </text>
          </svg>
        </motion.div>

        {/* 3. Lower Bar: Copyright, Credits & Back to Top */}
        <div className="pt-6 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          {/* Left: Copyright */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <span>© {currentYear} Evgeny.dev. All rights reserved.</span>
          </div>

          {/* Center: Credits */}
          <div className="order-3 md:order-2 text-center">
            <span>Designed &amp; developed by Evgeny.</span>
          </div>

          {/* Right: Back to Top Button */}
          <div className="order-1 md:order-3">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium transition-colors group cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-1 text-neutral-500 group-hover:text-black"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
