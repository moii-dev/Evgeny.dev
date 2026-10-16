import { t } from '../i18n';
import React, { useState, useCallback, useRef } from 'react';
import { HeroBackground } from './HeroBackground';

interface Props {
  onOpenProjects: () => void;
  onOpenAbout: () => void;
  projectCount: number;
  techCount: number;
}

export const Hero: React.FC<Props> = ({
  onOpenProjects,
  onOpenAbout,
  projectCount,
  techCount,
}) => {
  const [mousePos, setMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);
  const handleMouseLeave = useCallback(() => setMousePos({ x: null, y: null }), []);
  const portraitUrl = `${import.meta.env.BASE_URL}assets/my-photo.webp`;
  const portraitSrcSet = `${import.meta.env.BASE_URL}assets/my-photo-640.webp 640w, ${import.meta.env.BASE_URL}assets/my-photo-960.webp 960w, ${portraitUrl} 1098w`;
  return (
    <section id="home" className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Huge Light-Gray Rounded Container matching Reference */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#ebebec] border border-neutral-300/70 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xs"
      >
        <HeroBackground mouseX={mousePos.x} mouseY={mousePos.y} />
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[560px] lg:min-h-[620px]">
          
          {/* Left Column: Editorial Headline & Copy & Stats */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
            <div>
              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] leading-[1.04] tracking-[-0.02em] font-normal text-neutral-950 mb-6">
                <span>{t("Building Digital")}</span>
                <br />
                <span className="text-[#9ca3af]">{t("Experiences.")}</span>
              </h1>

              {/* Description */}
              <p className="text-neutral-600 text-base sm:text-lg max-w-lg leading-relaxed mb-8 font-normal">{t("I build thoughtful applications, modern interfaces and digital products that make complex things feel simple.")}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-12">
                <button
                  onClick={onOpenProjects}
                  data-magnetic
                  className="px-6 py-3 rounded-full bg-neutral-950 hover:bg-black text-white text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >{t("Explore projects")}</button>
                <button
                  onClick={onOpenAbout}
                  data-magnetic
                  className="px-6 py-3 rounded-full bg-[#dedede] hover:bg-[#d4d4d4] text-neutral-900 text-sm font-medium transition-all duration-200 border border-neutral-300/40"
                >{t("About me")}</button>
              </div>
            </div>

            {/* Bottom 3 Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-300/50">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  {projectCount > 0 ? `${projectCount}+` : '10+'}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">{t("Projects built")}</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  {techCount > 0 ? `${techCount}+` : '5+'}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">{t("Technologies")}</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  ∞
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">{t("Ideas to explore")}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Monochrome Developer Portrait with Floating Status Card */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full flex items-end justify-center overflow-hidden bg-[#e0e0e0]">
            {/* Developer Portrait Image */}
            <img
              src={portraitUrl}
              srcSet={portraitSrcSet}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
              width={1098}
              height={1433}
              fetchPriority="high"
              decoding="async"
              alt={t("Evgeny - Developer Portrait")}
              className="w-full h-full object-cover object-top transition-all duration-700 grayscale contrast-105 brightness-95"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
