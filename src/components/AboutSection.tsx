import React, { useState, useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import {
  WorkspaceVisual,
  MountainVisual,
  GearVisual,
  GeometricStar,
  EditorialQuoteMarks,
} from './about/AboutVisuals';

const EXPLORING_TAGS = [
  { name: 'Artificial Intelligence', desc: 'LLM agents, on-device models, neural embeddings' },
  { name: 'Android Engineering', desc: 'Kotlin, Jetpack Compose, CameraX, Room' },
  { name: 'Creative Coding', desc: 'Canvas rendering, procedural visuals, interactive shaders' },
  { name: 'UI/UX Design', desc: 'Design systems, micro-interactions, editorial typography' },
  { name: 'Web Technologies', desc: 'React 19, TypeScript, Vite, Chrome Extensions MV3' },
];

export const AboutSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mindsetCardRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for Card 2 (Mindset Mountain)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const mountainY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-4%', '4%']
  );

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* 1. SECTION HEADER matching reference composition */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
      >
        <div>
          {/* Section Kicker */}
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-3">
            02 / ABOUT ME
          </span>

          {/* Two-Line Editorial Headline: "Behind the" (black) / "Code." (silver) */}
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[1.03] tracking-tight font-normal mb-4">
            <span className="text-neutral-950 block">Behind the</span>
            <span className="text-[#9ca3af] block">Code.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            A little about who I am, what I create, and what keeps me curious.
          </p>
        </div>

        {/* Right Label & Up-Right Arrow Button */}
        <div className="flex items-center gap-4 self-start md:self-end pt-2 md:pt-0">
          <div className="hidden sm:block w-8 sm:w-12 h-px bg-neutral-300" />
          <span className="text-xs sm:text-sm font-medium text-neutral-700 tracking-tight whitespace-nowrap">
            Developer / Creator / Explorer
          </span>
          <button
            onClick={scrollToContact}
            className="w-11 h-11 rounded-full border border-neutral-300 hover:border-neutral-950 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xs group shrink-0 active:scale-95"
            aria-label="Connect with Evgeny"
            title="Let's build something meaningful"
          >
            <ArrowUpRight
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </motion.div>

      {/* 2. BENTO GRID CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
      >
        {/* =========================================================================
            ROW 1: LEFT CARD (CARD 1 - WHO I AM) ~62% width (col-span-7)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 bg-[#f2f2f3] border border-neutral-300/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xs relative flex flex-col justify-between group min-h-[440px] sm:min-h-[480px]"
        >
          {/* Inner Content Grid: Left Text Column / Right Photo Column */}
          <div className="relative z-10 flex flex-col lg:flex-row h-full">
            {/* Left Column: Text & Editorial Content */}
            <div className="w-full lg:w-[48%] p-6 sm:p-9 lg:p-10 flex flex-col justify-between z-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2 sm:mb-3">
                  01 / WHO I AM
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.08] text-neutral-950 font-normal mb-3 sm:mb-4">
                  Hey, I'm Evgeny.
                </h3>

                <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed mb-6 font-normal">
                  I'm a developer passionate about building meaningful digital products. From
                  Android applications to modern web experiences, I enjoy turning complex ideas into
                  simple, intuitive solutions.
                </p>

                {/* Subtle Horizontal Divider */}
                <div className="w-10 h-px bg-neutral-300 mb-6" />

                {/* Secondary Large Editorial Heading */}
                <div className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.08] font-normal mb-6">
                  <span className="text-neutral-950 block">turning ideas</span>
                  <span className="text-[#9ca3af] block">into reality.</span>
                </div>
              </div>

              {/* Bottom Card Footer: Location Tag */}
              <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium pt-3 border-t border-neutral-300/40">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 fill-neutral-500/20 shrink-0" />
                <span className="tracking-tight">Based in Russia · Building everywhere</span>
              </div>
            </div>

            {/* Right Column: Monochrome Workstation Photograph with Gradient Mask */}
            <div className="w-full lg:w-[52%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 min-h-[260px] lg:min-h-full overflow-hidden">
              <WorkspaceVisual />
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            ROW 1: RIGHT COLUMN STACK (CARD 2 + CARD 3) ~38% width (col-span-5)
           ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 justify-between">
          {/* ---------------------------------------------------------------------
              CARD 2: MINDSET (Dark Card with Mountain Landscape & Parallax)
             --------------------------------------------------------------------- */}
          <motion.div
            ref={mindsetCardRef}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0e0e11] text-white border border-neutral-800 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-sm relative p-6 sm:p-8 flex flex-col justify-between group min-h-[220px] sm:min-h-[235px]"
          >
            {/* Parallax Background Mountain Layer */}
            <motion.div style={{ y: mountainY }} className="absolute inset-0">
              <MountainVisual />
            </motion.div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                  01 / MINDSET
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.08] font-normal text-white mb-2.5">
                  <span>Curiosity is</span>
                  <br />
                  <span className="text-neutral-200">my fuel.</span>
                </h3>

                <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed max-w-[280px] font-normal">
                  I love exploring new technologies, experimenting with ideas, and building things
                  simply because they should exist.
                </p>
              </div>

              {/* Bottom Right Semi-transparent Circular Arrow Button */}
              <div className="flex justify-end pt-3">
                <button
                  onClick={() =>
                    setModalContent(
                      'Curiosity drives every project: from decompiling Android internals to exploring AI architectures, the goal is always deep understanding and elegant craft.'
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                  aria-label="View mindset details"
                  title="Explore mindset"
                >
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------------
              CARD 3: CURRENTLY EXPLORING (Tags + Geometric 8-pointed Star)
             --------------------------------------------------------------------- */}
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f2f2f3] border border-neutral-300/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xs relative p-6 sm:p-7 flex flex-col justify-between group min-h-[195px] sm:min-h-[210px]"
          >
            <div>
              {/* Header with Geometric Star on the Right */}
              <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                    03 / CURRENTLY EXPLORING
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal">
                    Always learning.
                  </h3>
                </div>

                {/* Geometric 8-pointed Star with subtle smooth rotation */}
                <div className="text-neutral-900 transition-transform duration-700 ease-out group-hover:rotate-45 group-hover:scale-110 shrink-0 mt-0.5">
                  <GeometricStar className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </div>

              {/* Interactive Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {EXPLORING_TAGS.map((tag) => {
                  const isSelected = activeTag === tag.name;
                  return (
                    <button
                      key={tag.name}
                      onClick={() => setActiveTag(isSelected ? null : tag.name)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'bg-neutral-950 text-white shadow-sm ring-1 ring-neutral-950'
                          : 'bg-[#e4e5e8] hover:bg-neutral-950 hover:text-white text-neutral-800 border border-neutral-300/40'
                      }`}
                      title={tag.desc}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro tooltip feedback when tag is clicked */}
            {activeTag && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-2 border-t border-neutral-300/50 flex items-center justify-between text-[11px] text-neutral-600 font-medium"
              >
                <span>{EXPLORING_TAGS.find((t) => t.name === activeTag)?.desc}</span>
                <span className="text-neutral-400 font-mono text-[10px]">active focus</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* =========================================================================
            ROW 2: LEFT CARD (CARD 4 - PHILOSOPHY) ~62% width (col-span-7)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 bg-[#f2f2f3] border border-neutral-300/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xs relative p-7 sm:p-9 lg:p-10 flex flex-col justify-between group min-h-[250px] sm:min-h-[270px]"
        >
          {/* Header Row: Label + Centered Decorative Divider Line */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
              02 / PHILOSOPHY
            </span>
            <div className="w-10 sm:w-14 h-px bg-neutral-300/80 mx-auto hidden sm:block" />
            <div className="w-16 hidden sm:block" /> {/* Balancer */}
          </div>

          {/* Center Minimalist Editorial Poster Quote with Quotation Marks */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 my-auto py-5 sm:py-6">
            {/* Open Quote */}
            <div className="shrink-0 -mt-6 sm:-mt-8 opacity-75">
              <EditorialQuoteMarks type="open" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" />
            </div>

            {/* Quote Statement */}
            <div className="text-center px-1 sm:px-4">
              <p className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.18] font-normal text-neutral-950">
                Good software doesn't just work.
                <br />
                <span className="text-neutral-900 font-serif">It feels right.</span>
              </p>
            </div>

            {/* Close Quote */}
            <div className="shrink-0 -mb-6 sm:-mb-8 opacity-75">
              <EditorialQuoteMarks type="close" className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" />
            </div>
          </div>

          {/* Bottom Center Axiom */}
          <div className="text-center pt-2 border-t border-neutral-300/40">
            <p className="text-xs sm:text-[13px] text-neutral-500 tracking-wider font-normal">
              Simplicity. Performance. Attention to detail.
            </p>
          </div>
        </motion.div>

        {/* =========================================================================
            ROW 2: RIGHT CARD (CARD 5 - BEYOND THE SCREEN) ~38% width (col-span-5)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-5 bg-[#f2f2f3] border border-neutral-300/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xs relative group min-h-[250px] sm:min-h-[270px] flex flex-col justify-between"
        >
          {/* Two-Column Layout: Left Content / Right Photo */}
          <div className="relative z-10 flex flex-col sm:flex-row h-full">
            {/* Left Content Column */}
            <div className="w-full sm:w-[50%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between z-10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                  05 / BEYOND THE SCREEN
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal mb-2.5">
                  Beyond the screen.
                </h3>

                <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed max-w-[220px] font-normal">
                  Technology, creativity, music, games, and a constant curiosity about how things
                  work.
                </p>
              </div>

              {/* Bottom Round Arrow Button */}
              <div className="pt-4">
                <button
                  onClick={() =>
                    setModalContent(
                      'Outside of code: mechanical keyboard builds, analogue photography, music production, architecture books, and tinkering with game physics.'
                    )
                  }
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-950 hover:text-white border border-neutral-300/80 shadow-2xs flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                  aria-label="Learn more about interests outside coding"
                  title="Beyond the screen"
                >
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-neutral-900 group-hover/btn:text-white"
                  />
                </button>
              </div>
            </div>

            {/* Right Photo Column: Headphones, Camera, Notebook with Gradient Mask */}
            <div className="w-full sm:w-[50%] sm:absolute sm:right-0 sm:top-0 sm:bottom-0 min-h-[200px] sm:min-h-full overflow-hidden">
              <GearVisual />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightweight Accessible Modal for Card 2 & Card 5 interactive buttons */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Note
            </span>
            <p className="text-neutral-800 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {modalContent}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-5 py-2 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
