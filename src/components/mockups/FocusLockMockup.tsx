import React from 'react';

export const FocusLockMockup: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#22242a] via-[#141519] to-[#0b0c0e] rounded-[22px] overflow-hidden flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Modern Desktop Dashboard Mockup */}
      <div className="relative w-full max-w-[480px] bg-[#15161b] rounded-2xl border border-[#323540] shadow-[0_30px_60px_rgba(0,0,0,0.85)] p-3.5 flex flex-col justify-between overflow-hidden">
        {/* Window Chrome / Titlebar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[9px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="font-semibold text-white ml-2 text-[10px]">FocusLock</span>
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 font-mono">MV3</span>
          </div>
          <span className="text-[8px] text-neutral-500">Active protection: ON</span>
        </div>

        {/* 3-Column Dashboard Body */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left Mini Sidebar (3 cols) */}
          <div className="col-span-3 space-y-1 text-[8px] text-neutral-400 pr-1 border-r border-white/5 hidden sm:block">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-md text-white font-medium">
              <span>⏱️</span>
              <span>Timer</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:text-white">
              <span>📊</span>
              <span>Statistics</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:text-white">
              <span>🛡️</span>
              <span>Blocking</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:text-white">
              <span>⚙️</span>
              <span>Settings</span>
            </div>
          </div>

          {/* Center Main Circular Timer (5 cols on sm, 6 on mobile) */}
          <div className="col-span-7 sm:col-span-5 flex flex-col items-center justify-center p-2 bg-[#101115] rounded-xl border border-white/5">
            <span className="text-[8px] uppercase tracking-wider text-neutral-400 mb-1">Focus Session</span>

            {/* Circular Timer Display */}
            <div className="relative w-24 h-24 flex items-center justify-center my-1">
              {/* Outer SVG ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#252732" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="6"
                  strokeDasharray="264"
                  strokeDashoffset="66"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight font-mono">25:00</span>
              </div>
            </div>

            {/* Start Button */}
            <button className="px-4 py-0.5 bg-white text-black font-semibold rounded-full text-[9px] shadow hover:bg-neutral-200 transition-colors">
              Start
            </button>

            {/* Mode switch */}
            <div className="flex items-center gap-1 text-[7px] text-neutral-400 mt-2">
              <span className="text-white font-medium">Pomodoro</span>
              <span>•</span>
              <span>Short Break</span>
              <span>•</span>
              <span>Long Break</span>
            </div>
          </div>

          {/* Right Productivity Stats & Chart (4 cols on sm, 5 on mobile) */}
          <div className="col-span-5 sm:col-span-4 flex flex-col justify-between p-2 bg-[#101115] rounded-xl border border-white/5">
            <div>
              <div className="flex items-center justify-between text-[8px] text-neutral-400 mb-1.5">
                <span className="font-semibold text-white">Today</span>
                <span>🔥</span>
              </div>

              {/* Stat Chips */}
              <div className="space-y-1 text-[7px]">
                <div className="flex justify-between items-center bg-white/5 px-1.5 py-0.5 rounded">
                  <span className="text-neutral-400">Sessions</span>
                  <span className="font-semibold text-white">4</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-1.5 py-0.5 rounded">
                  <span className="text-neutral-400">Focus time</span>
                  <span className="font-semibold text-white">2h 15m</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-1.5 py-0.5 rounded">
                  <span className="text-neutral-400">Productivity</span>
                  <span className="font-semibold text-emerald-400">89%</span>
                </div>
              </div>
            </div>

            {/* Mini Bar Chart */}
            <div className="mt-2 pt-1 border-t border-white/5">
              <div className="flex items-end justify-between h-9 px-1 gap-1">
                <div className="w-1.5 bg-white/20 rounded-t h-[40%]" />
                <div className="w-1.5 bg-white/30 rounded-t h-[65%]" />
                <div className="w-1.5 bg-white/40 rounded-t h-[90%]" />
                <div className="w-1.5 bg-rose-500 rounded-t h-[100%]" />
                <div className="w-1.5 bg-white/30 rounded-t h-[50%]" />
                <div className="w-1.5 bg-white/10 rounded-t h-[20%]" />
              </div>
              <div className="flex justify-between text-[6px] text-neutral-500 font-mono mt-0.5 px-0.5">
                <span>06</span>
                <span>09</span>
                <span>12</span>
                <span>15</span>
                <span>18</span>
                <span>21</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
