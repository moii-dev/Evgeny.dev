import React from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';

interface Props {
  photoUrl: string;
  isMonochrome: boolean;
  onOpenPhotoChange: () => void;
  onOpenProjects: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  projectCount: number;
  techCount: number;
}

export const Hero: React.FC<Props> = ({
  photoUrl,
  isMonochrome,
  onOpenPhotoChange,
  onOpenProjects,
  onOpenAbout,
  onOpenContact,
  projectCount,
  techCount,
}) => {
  return (
    <section id="home" className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Huge Light-Gray Rounded Container matching Reference */}
      <div className="relative bg-[#ebebec] border border-neutral-300/70 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[560px] lg:min-h-[620px]">
          
          {/* Left Column: Editorial Headline & Copy & Stats */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
            <div>
              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] leading-[1.04] tracking-[-0.02em] font-normal text-neutral-950 mb-6">
                <span>Building Digital</span>
                <br />
                <span className="text-[#9ca3af]">Experiences.</span>
              </h1>

              {/* Description */}
              <p className="text-neutral-600 text-base sm:text-lg max-w-lg leading-relaxed mb-8 font-normal">
                I build thoughtful applications, modern interfaces and digital products that make
                complex things feel simple.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-12">
                <button
                  onClick={onOpenProjects}
                  className="px-6 py-3 rounded-full bg-neutral-950 hover:bg-black text-white text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  Explore projects
                </button>
                <button
                  onClick={onOpenAbout}
                  className="px-6 py-3 rounded-full bg-[#dedede] hover:bg-[#d4d4d4] text-neutral-900 text-sm font-medium transition-all duration-200 border border-neutral-300/40"
                >
                  About me
                </button>
              </div>
            </div>

            {/* Bottom 3 Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-300/50">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  {projectCount > 0 ? `${projectCount}+` : '10+'}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                  Projects built
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  {techCount > 0 ? `${techCount}+` : '5+'}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                  Technologies
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight font-sans">
                  ∞
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                  Ideas to explore
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Monochrome Developer Portrait with Floating Status Card */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full flex items-end justify-center overflow-hidden bg-[#e0e0e0]">
            {/* Developer Portrait Image */}
            <img
              src={photoUrl}
              alt="Evgeny - Developer Portrait"
              className={`w-full h-full object-cover object-top transition-all duration-700 ${
                isMonochrome ? 'grayscale contrast-105 brightness-95' : ''
              }`}
            />

            {/* Gradient shadow overlay for badge readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Subtle "Change Photo / Заменить фото" customizer button */}
            <button
              onClick={onOpenPhotoChange}
              title="Personalize or replace portrait photo"
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md border border-white/50 text-[11px] font-medium flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
            >
              <Camera size={13} />
              <span>Change photo</span>
            </button>

            {/* Floating Status Card matching Reference Image */}
            <div className="relative z-20 m-4 sm:m-6 w-full max-w-[340px] bg-black/65 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-0.5">
                    Current status
                  </span>
                  <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight mb-1">
                    Open to new projects
                  </h2>
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-normal">
                    Turning ambitious ideas into reliable digital experiences.
                  </p>
                </div>

                <button
                  onClick={onOpenContact}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-neutral-100 text-black flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 shadow-md"
                  aria-label="Contact Evgeny"
                >
                  <ArrowUpRight size={17} strokeWidth={2.5} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
