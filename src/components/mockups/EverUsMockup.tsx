import React from 'react';

export const EverUsMockup: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#252528] via-[#18181b] to-[#0f0f12] rounded-[22px] overflow-hidden flex items-center justify-center p-4 select-none">
      {/* Background ambient gentle rose glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,63,94,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Dual Mockup Phones Container */}
      <div className="relative w-full max-w-[440px] h-[250px] sm:h-[280px] flex items-center justify-center">
        {/* Left Phone (Counter Display) */}
        <div className="absolute -left-2 sm:left-4 top-2 w-[170px] sm:w-[200px] h-[265px] sm:h-[295px] bg-[#141416] rounded-[28px] border-[3px] border-[#3f3f46] shadow-[0_25px_50px_rgba(0,0,0,0.85)] -rotate-6 transform transition-transform duration-500 hover:-rotate-3 overflow-hidden z-20 flex flex-col justify-between">
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full flex items-center justify-center">
            <span className="text-[7px] text-neutral-400 font-mono">0:01</span>
          </div>

          {/* Main Counter Body */}
          <div className="pt-8 px-3 text-center flex-1 flex flex-col items-center justify-center">
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium">Мы вместе</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight my-1 flex items-center justify-center gap-1">
              <span>365</span>
              <span className="text-rose-500 text-lg">♥</span>
            </div>
            <span className="text-[8px] text-neutral-400">дней чистой любви</span>

            {/* Little Romantic Waveform / Badge */}
            <div className="mt-4 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] text-neutral-300 flex items-center gap-1.5">
              <span>🗓️</span>
              <span>12 месяцев вместе</span>
            </div>
          </div>

          {/* Bottom Dock with floating heart */}
          <div className="p-2 border-t border-white/5 flex items-center justify-center gap-3">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs shadow-inner">
              ♥
            </div>
          </div>
        </div>

        {/* Right Phone (Moments & Memories Gallery) */}
        <div className="absolute right-0 sm:right-6 top-1 w-[185px] sm:w-[215px] h-[265px] sm:h-[295px] bg-[#18181b] rounded-[30px] border-[3px] border-[#484852] shadow-[0_30px_60px_rgba(0,0,0,0.9)] rotate-3 transform transition-transform duration-500 hover:rotate-1 overflow-hidden z-10 flex flex-col justify-between">
          <div className="pt-8 px-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-white">Наши моменты</span>
              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">
                +
              </div>
            </div>

            {/* Moments Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-16 rounded-xl bg-gradient-to-tr from-amber-700/60 to-rose-600/40 p-1.5 flex flex-col justify-end border border-white/10">
                <span className="text-[7px] font-semibold text-white">Закат на море</span>
                <span className="text-[6px] text-white/70">14 Июня</span>
              </div>
              <div className="h-16 rounded-xl bg-gradient-to-tr from-indigo-700/60 to-purple-600/40 p-1.5 flex flex-col justify-end border border-white/10">
                <span className="text-[7px] font-semibold text-white">Первая поездка</span>
                <span className="text-[6px] text-white/70">28 Августа</span>
              </div>
            </div>

            <div className="mt-2 p-1.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-rose-500/30 flex items-center justify-center text-[10px]">
                📸
              </div>
              <div className="text-[7px] text-neutral-300">
                <div className="font-medium text-white">Годовщина</div>
                <div className="text-neutral-400">Сохранено 42 фото</div>
              </div>
            </div>
          </div>

          <div className="p-2 border-t border-white/5 text-center text-[7px] text-neutral-400">
            EverUs • Private Moments
          </div>
        </div>
      </div>
    </div>
  );
};
