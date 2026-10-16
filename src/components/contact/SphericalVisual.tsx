import { usePrefersReducedMotion as useReducedMotion } from '../../hooks/usePrefersReducedMotion';
import React from 'react';
import { motion } from 'motion/react';

export const SphericalVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Deep graphite ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0b0d] via-[#111216] to-[#15161b]" />

      {/* Subtle radial sheen on the right side */}
      <div className="absolute -right-24 -bottom-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(200,210,230,0.02)_40%,transparent_75%)] blur-2xl" />

      {/* Main 3D Spherical Geometry SVG with metallic specular rim lighting */}
      <motion.svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-10%] top-[-10%] w-[120%] h-[120%] object-cover"
        preserveAspectRatio="xMidYMid slice"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: 'easeOut' }}
      >
        <defs>
          {/* Subtle grain/noise filter */}
          <filter id="sphereGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
            <feComposite in2="SourceGraphic" in="glare" operator="over" />
          </filter>

          {/* Upper Sphere Body Gradient */}
          <radialGradient
            id="upperSphereFill"
            cx="75%"
            cy="32%"
            r="60%"
            fx="80%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#2a2c33" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#14151a" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#0d0e12" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0a0a0d" />
          </radialGradient>

          {/* Primary Lower Sphere Body Gradient */}
          <radialGradient
            id="lowerSphereFill"
            cx="85%"
            cy="70%"
            r="65%"
            fx="88%"
            fy="60%"
          >
            <stop offset="0%" stopColor="#25272e" stopOpacity="0.6" />
            <stop offset="35%" stopColor="#16171d" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0e0f14" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#090a0c" />
          </radialGradient>

          {/* Upper Silver Rim Lighting Gradient */}
          <linearGradient id="upperRimGlow" x1="50%" y1="10%" x2="90%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#cbd5e1" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#64748b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0" />
          </linearGradient>

          {/* Lower Silver Rim Lighting Gradient - crisp silver highlight */}
          <linearGradient id="lowerRimGlow" x1="45%" y1="45%" x2="95%" y2="85%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#e2e8f0" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#94a3b8" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#475569" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </linearGradient>

          {/* Soft blur for ambient rim diffusion */}
          <filter id="softRimBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* --- Background Sphere (Upper Right Curvature) --- */}
        <g opacity="0.85">
          {/* Sphere Body */}
          <path
            d="M 460,300 C 470,180 540,90 680,60 C 800,35 880,90 920,200 C 950,290 890,380 770,410 C 640,430 480,380 460,300 Z"
            fill="url(#upperSphereFill)"
          />
          {/* Subtle diffused glow along curve */}
          <path
            d="M 480,260 C 510,160 580,95 700,75 C 780,60 840,90 890,140"
            stroke="url(#upperRimGlow)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#softRimBlur)"
            opacity="0.5"
          />
          {/* Fine crisp rim highlight */}
          <path
            d="M 480,260 C 510,160 580,95 700,75 C 780,60 840,90 890,140"
            stroke="url(#upperRimGlow)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>

        {/* --- Foreground Dominant Sphere (Lower Right Curvature matching Reference) --- */}
        <g>
          {/* Large Obsidian Matte Sphere Body */}
          <path
            d="M 330,580 C 370,410 470,300 640,245 C 770,205 880,240 960,320 C 1000,360 1020,450 1010,560 C 1000,660 700,680 330,580 Z"
            fill="url(#lowerSphereFill)"
          />

          {/* Diffuse soft rim halo */}
          <path
            d="M 345,550 C 390,410 490,310 650,255 C 760,220 860,245 940,305"
            stroke="url(#lowerRimGlow)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#softRimBlur)"
            opacity="0.45"
          />

          {/* Sharp, elegant silver specular rim line */}
          <path
            d="M 345,550 C 390,410 490,310 650,255 C 760,220 860,245 940,305"
            stroke="url(#lowerRimGlow)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Specular crest focal point */}
          <circle
            cx="630"
            cy="260"
            r="1.5"
            fill="#ffffff"
            filter="url(#softRimBlur)"
            opacity="0.8"
          />
        </g>
      </motion.svg>

      {/* Subtle fine border highlight at top of card */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
};
