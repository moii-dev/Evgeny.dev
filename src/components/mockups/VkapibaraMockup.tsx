import React from 'react';

export const VkapibaraMockup: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#252321] via-[#171615] to-[#0d0c0b] rounded-[22px] overflow-hidden flex items-center justify-center p-4 select-none">
      {/* Background ambient warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Dual Mockup Phones Container */}
      <div className="relative w-full max-w-[440px] h-[250px] sm:h-[280px] flex items-center justify-center">
        {/* Left Phone (angled behind) */}
        <div className="absolute -left-2 sm:left-4 top-4 w-[160px] sm:w-[190px] h-[260px] sm:h-[290px] bg-[#141312] rounded-[28px] border-[3px] border-[#3d3835] shadow-[0_25px_50px_rgba(0,0,0,0.8)] -rotate-6 transform transition-transform duration-500 hover:-rotate-3 overflow-hidden z-10">
          <div className="pt-8 px-3 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🦫</span>
              <span className="text-xs font-semibold text-white/90">Вкапибара</span>
            </div>
            <div className="space-y-1.5 text-[9px] text-neutral-300">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-lg">
                <span>⚙️</span>
                <span>Настройки темы</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400">
                <span>🔒</span>
                <span>Приватность</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400">
                <span>🧩</span>
                <span>Кастомизация UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Phone (Prominent front phone) */}
        <div className="absolute right-0 sm:right-6 top-0 w-[190px] sm:w-[225px] h-[270px] sm:h-[300px] bg-[#11100f] rounded-[30px] border-[3px] border-[#4a4540] shadow-[0_30px_60px_rgba(0,0,0,0.9)] rotate-3 transform transition-transform duration-500 hover:rotate-1 overflow-hidden z-20 flex flex-col justify-between">
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full flex items-center justify-between px-3">
            <span className="text-[8px] text-neutral-400 font-mono">9:41</span>
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          </div>

          {/* Header & Tabs */}
          <div className="pt-8 px-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🦫</span>
                <span className="text-[11px] font-bold text-white tracking-tight">Вкапибара</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-neutral-300">
                👤
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1 text-[8px] overflow-hidden pb-1">
              <span className="px-2 py-0.5 bg-white text-black font-semibold rounded-full">Все</span>
              <span className="px-2 py-0.5 bg-white/10 text-neutral-300 rounded-full">Каналы</span>
              <span className="px-2 py-0.5 bg-white/10 text-neutral-300 rounded-full">Видео</span>
              <span className="px-2 py-0.5 bg-white/10 text-neutral-300 rounded-full">Музыка</span>
            </div>
          </div>

          {/* Capybara Post Card */}
          <div className="px-3 py-1 flex-1">
            <div className="bg-[#1d1b19] rounded-xl border border-white/10 overflow-hidden shadow-inner">
              <div className="relative h-[85px] sm:h-[95px] bg-[#2a2420] flex items-center justify-center overflow-hidden">
                {/* Stylized Capybara Art / Photo representation */}
                <div className="w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent absolute inset-0 z-10" />
                <div className="text-center relative z-20">
                  <span className="text-3xl filter drop-shadow">🦫</span>
                  <div className="text-[9px] font-medium text-amber-200 mt-0.5">Вкапибара Рекомендации</div>
                </div>
              </div>
              <div className="p-2 text-[8px] text-neutral-300 flex items-center justify-between">
                <span>❤️ 2.4k</span>
                <span>💬 184</span>
                <span>↗ Поделиться</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Dock */}
          <div className="px-2 py-1.5 bg-[#161514] border-t border-white/5 flex items-center justify-around text-[7px] text-neutral-400">
            <div className="flex flex-col items-center text-white font-medium">
              <span>🏠</span>
              <span>Главная</span>
            </div>
            <div className="flex flex-col items-center">
              <span>💬</span>
              <span>Чаты</span>
            </div>
            <div className="flex flex-col items-center">
              <span>👤</span>
              <span>Профиль</span>
            </div>
            <div className="flex flex-col items-center">
              <span>▦</span>
              <span>Сервисы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
