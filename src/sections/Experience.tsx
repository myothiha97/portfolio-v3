import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { workCompanies } from '../constants/index';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WorkExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section label line
      gsap.set('.work-label-line', { scaleX: 0 });
      gsap.to('.work-label-line', {
        scrollTrigger: { trigger: '.work-label', start: 'top 88%' },
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      // Vertical timeline line draws as you scroll (scrub)
      gsap.set('.timeline-line', { scaleY: 0 });
      gsap.to('.timeline-line', {
        scrollTrigger: {
          trigger: '.work-timeline',
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1.2,
        },
        scaleY: 1,
        ease: 'none',
      });

      // Year labels — slide in from left
      gsap.utils.toArray<HTMLElement>('.year-label').forEach((el) => {
        gsap.set(el, { opacity: 0, x: -14 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 86%' },
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // Timeline nodes — pop in with back ease
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((el) => {
        gsap.set(el, { scale: 0, opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 86%' },
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: 'back.out(2.5)',
        });
      });

      // Company cards — slide up + fade in
      gsap.utils.toArray<HTMLElement>('.company-block').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 84%' },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        });
      });

      // Highlight bullets — stagger slide in from right
      gsap.utils.toArray<HTMLElement>('.highlight-item').forEach((el) => {
        gsap.set(el, { opacity: 0, x: 14 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    },
    { scope: sectionRef },
  );

  const totalPositions = workCompanies.reduce((acc, c) => acc + c.roles.length, 0);
  const companyCount = workCompanies.filter((c) => c.name !== 'Freelance').length;

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="work">
      {/* Section label */}
      <div className="work-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Experience</span>
        <div className="work-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-10">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light">
          {totalPositions} Positions · {companyCount} Companies
        </span>
        <span className="text-white/20 text-[9px] tracking-[0.2em] uppercase font-mono">Jan 2020 — Present</span>
      </div>

      {/* Timeline */}
      <div className="work-timeline relative">
        {/* Vertical timeline line — scrubbed by scroll */}
        <div className="timeline-line absolute left-[calc(3.5rem+19px)] sm:left-[calc(4rem+19px)] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.15] via-white/[0.08] to-transparent origin-top" />

        <div className="flex flex-col gap-10">
          {workCompanies.map((company) => {
            const earliestDuration = company.roles[company.roles.length - 1].duration;
            const yearMatch = earliestDuration.match(/\d{4}/);
            const startYear = yearMatch ? yearMatch[0] : '';

            return (
              <div key={company.id} className="company-block flex">
                {/* Year column — desktop only */}
                <div className="year-label w-14 sm:w-16 flex-shrink-0 pt-[21px] hidden sm:block">
                  <span className="text-white/20 text-[9px] tracking-[0.15em] font-mono text-right block pr-4">
                    {startYear}
                  </span>
                </div>

                {/* Node column */}
                <div className="w-10 flex-shrink-0 relative pt-[17px] ml-14 sm:ml-0">
                  <div
                    className={`timeline-node rounded-full border ${
                      company.isLatest
                        ? 'w-[11px] h-[11px] border-white/40 bg-white/20 shadow-[0_0_14px_rgba(255,255,255,0.2)]'
                        : 'w-[9px] h-[9px] border-white/20 bg-white/[0.07]'
                    }`}
                  />
                </div>

                {/* Company card */}
                <div className="flex-1 border border-white/[0.08] rounded-lg bg-white/[0.02] overflow-hidden">
                  {/* Company header */}
                  <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-white/80 text-base sm:text-lg font-light">{company.name}</h3>
                    {company.isLatest && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-green-500/20 rounded text-green-400/70 text-[8px] tracking-[0.15em] uppercase">
                        <span className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Roles — stacked with dividers */}
                  <div className="divide-y divide-white/[0.04]">
                    {company.roles.map((role, rIdx) => (
                      <div key={rIdx} className="px-5 sm:px-6 py-5">
                        {/* Role title + duration */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="text-white/65 text-sm sm:text-base font-light tracking-wide">{role.pos}</p>
                          <span className="flex-shrink-0 text-white/25 text-[10px] tracking-[0.15em] uppercase font-mono mt-0.5">
                            {role.duration}
                          </span>
                        </div>

                        {/* Summary */}
                        <p className="text-white/38 text-sm font-light leading-relaxed mb-4">{role.title}</p>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {role.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="highlight-item flex items-start gap-3">
                              <span className="text-white/25 text-xs mt-[3px] flex-shrink-0 font-mono">›</span>
                              <span className="text-white/50 text-sm font-light leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
