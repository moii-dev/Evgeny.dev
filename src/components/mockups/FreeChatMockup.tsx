import React from 'react';

export const FreeChatMockup: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#22242a] via-[#16171b] to-[#0c0d10] rounded-[22px] overflow-hidden flex items-center justify-center p-4 select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Dual Mockup Phones Container */}
      <div className="relative w-full max-w-[440px] h-[250px] sm:h-[280px] flex items-center justify-center">
        {/* Left Phone (angled slightly behind) */}
        <div className="absolute -left-2 sm:left-4 top-4 w-[160px] sm:w-[190px] h-[260px] sm:h-[290px] bg-[#111215] rounded-[28px] border-[3px] border-[#383a42] shadow-[0_25px_50px_rgba(0,0,0,0.8)] -rotate-6 transform transition-transform duration-500 hover:-rotate-3 overflow-hidden z-10">
          {/* Phone Speaker Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full mr-2" />
            <div className="w-1.5 h-1.5 bg-[#252525] rounded-full" />
          </div>

          <div className="pt-8 px-3 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold">
                E
              </div>
              <span className="text-xs font-semibold tracking-tight text-white/90">FreeChat</span>
            </div>

            {/* Menu items */}
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-lg text-white font-medium">
                <span className="text-[11px]">+</span>
                <span>New Chat</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-neutral-400 hover:text-white rounded-lg">
                <span className="text-[10px]">⚡</span>
                <span>Models (GPT-4o, Claude)</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-neutral-400 rounded-lg">
                <span className="text-[10px]">🕒</span>
                <span>History</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-neutral-400 rounded-lg">
                <span className="text-[10px]">⚙️</span>
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Phone (Prominent front phone) */}
        <div className="absolute right-0 sm:right-6 top-0 w-[185px] sm:w-[220px] h-[270px] sm:h-[300px] bg-[#0d0e12] rounded-[30px] border-[3px] border-[#454854] shadow-[0_30px_60px_rgba(0,0,0,0.9)] rotate-3 transform transition-transform duration-500 hover:rotate-1 overflow-hidden z-20">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full flex items-center justify-between px-3">
            <span className="text-[8px] text-neutral-400 font-mono">9:41</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          {/* Chat Header */}
          <div className="pt-8 px-3 pb-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-neutral-400">←</span>
              <span className="text-[11px] font-semibold text-white">Chat</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
          </div>

          {/* Chat Messages Body */}
          <div className="p-2.5 space-y-2 text-[9px]">
            {/* Assistant Bubble */}
            <div className="max-w-[85%] bg-[#1a1c24] text-neutral-200 p-2 rounded-xl rounded-tl-sm border border-white/5 shadow-sm">
              <p>Hello! How can I help you today?</p>
            </div>

            {/* User Bubble */}
            <div className="max-w-[85%] ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-xl rounded-tr-sm shadow-md">
              <p>Can you help me with this code?</p>
            </div>

            {/* Code Block Response */}
            <div className="max-w-[95%] bg-[#14151a] p-2 rounded-xl border border-indigo-500/20 text-[8px] font-mono text-neutral-300">
              <div className="text-[7px] text-indigo-400 mb-1 font-sans font-semibold">Kotlin</div>
              <code>
                <span className="text-purple-400">fun</span> <span className="text-blue-400">main</span>() &#123;
                <br />
                &nbsp;&nbsp;<span className="text-green-400">println</span>(<span className="text-amber-300">"Hello, World!"</span>)
                <br />
                &#125;
              </code>
            </div>

            {/* Bottom Input Field */}
            <div className="mt-2 pt-1 flex items-center gap-1.5 px-2 py-1.5 bg-[#171821] rounded-full border border-white/10">
              <span className="text-[8px] text-neutral-500 flex-1">Message...</span>
              <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] text-white">
                ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
