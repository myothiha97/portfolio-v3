import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { workExperiences } from '../constants/index';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WorkExperience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.work-label-line', {
        scrollTrigger: { trigger: '.work-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.work-card', {
        scrollTrigger: { trigger: '.work-timeline', start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="work">
      <div className="work-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Experience</span>
        <div className="work-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-10">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light">
          {workExperiences.length} Positions · 3 Companies
        </span>
        <span className="text-white/20 text-[9px] tracking-[0.2em] uppercase font-mono">
          2020 — Present
        </span>
      </div>

      {/* Timeline */}
      <div className="work-timeline relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.08] to-transparent" />

        <div className="flex flex-col gap-2">
          {workExperiences.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isLatest = index === 0;

            return (
              <div
                key={item.id}
                className="work-card relative cursor-pointer group"
                onClick={() => toggleExpand(index)}>
                {/* Timeline node */}
                <div className="absolute left-[18px] sm:left-[22px] top-[26px] z-10">
                  <div
                    className={`rounded-full border transition-all duration-300 ${
                      isLatest
                        ? 'w-[11px] h-[11px] border-white/40 bg-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                        : isExpanded
                          ? 'w-[11px] h-[11px] border-white/30 bg-white/15'
                          : 'w-[9px] h-[9px] border-white/15 bg-white/[0.06] group-hover:border-white/25'
                    }`}
                  />
                </div>

                {/* Card content */}
                <div
                  className={`ml-12 sm:ml-14 border rounded-lg transition-all duration-300 ${
                    isExpanded
                      ? 'border-white/[0.12] bg-white/[0.03]'
                      : 'border-white/[0.06] bg-transparent hover:border-white/[0.10] hover:bg-white/[0.015]'
                  }`}>
                  <div className="px-5 py-4 sm:px-6 sm:py-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-white/85 text-base sm:text-lg font-light truncate">{item.name}</h3>
                          {isLatest && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 border border-green-500/20 rounded text-green-400/70 text-[8px] tracking-[0.15em] uppercase">
                              <span className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-white/50 text-xs sm:text-sm font-light tracking-wide">{item.pos}</p>
                      </div>
                      <span className="flex-shrink-0 text-white/25 text-[10px] tracking-[0.15em] uppercase font-mono mt-1">
                        {item.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-white/45 text-sm font-light leading-relaxed mt-3 group-hover:text-white/55 transition-colors duration-300">
                      {item.title}
                    </p>

                    {/* Expanded content */}
                    {isExpanded && item.highlights && (
                      <div className="mt-5 pt-4 border-t border-white/[0.06]">
                        <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-light mb-3">
                          Key Contributions
                        </p>
                        <ul className="space-y-2.5">
                          {item.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-3">
                              <span className="text-white/20 text-[10px] font-mono mt-[3px] flex-shrink-0">
                                {String(hIdx + 1).padStart(2, '0')}
                              </span>
                              <span className="text-white/55 text-sm font-light leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5 mt-5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 border border-white/[0.08] rounded text-white/35 text-[9px] tracking-[0.1em] uppercase font-light">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expand hint */}
                    <div className="flex items-center justify-end mt-3">
                      <span className="text-white/15 text-[8px] tracking-[0.15em] uppercase font-light group-hover:text-white/25 transition-colors">
                        {isExpanded ? '[ Collapse ]' : '[ Expand ]'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
