import { t } from '../i18n';
import React, { useState } from 'react';
import { TECH_CATEGORIES, TECH_STACK } from '../data/techStack';
import { Smartphone, Code, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';

export const StackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTech = selectedCategory === 'all'
    ? TECH_STACK
    : TECH_STACK.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'mobile':
        return <Smartphone size={14} />;
      case 'frontend':
        return <Code size={14} />;
      case 'backend':
        return <Server size={14} />;
      case 'database':
        return <Database size={14} />;
      default:
        return <Wrench size={14} />;
    }
  };

  return (
    <section id="stack" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-3">{t("03 / EXPERTISE")}</span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-normal text-neutral-950 mb-4">
            <span>{t("Tools of")}</span>
            <br />
            <span className="text-[#9ca3af]">{t("the trade.")}</span>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">{t("A battle-tested set of languages, frameworks, and developer tools refined across real-world native and web projects.")}</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 rounded-2xl max-w-full">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 sm:px-4 py-1.5 text-xs font-medium rounded-xl transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-xs'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-200'
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tech Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTech.map((tech) => (
          <div
            key={tech.name}
            className="group relative bg-[#f6f6f6] hover:bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-black/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs group-hover:scale-105 transition-transform">
                  {getCategoryIcon(tech.category)}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400">
                  {t(tech.category)}
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-950 tracking-tight mb-1 group-hover:text-black">
                {tech.name}
              </h3>

              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {t(tech.description)}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-neutral-200/50 flex items-center justify-between text-[10px] text-neutral-400">
              <span className="flex items-center gap-1 text-neutral-600 font-medium">
                <CheckCircle2 size={11} className="text-emerald-600" />
                <span>{t("Production active")}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
