import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { workCompanies } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

const calcDuration = (durationStr: string): string => {
  const parts = durationStr.split(' - ');
  if (parts.length < 2) return '';

  const start = new Date(parts[0].trim());
  const end = parts[1].trim().toLowerCase() === 'present' ? new Date() : new Date(parts[1].trim());

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  if (totalMonths < 1) return '1 month';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} ${months === 1 ? 'month' : 'months'}`;
  if (months === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${months} ${months === 1 ? 'month' : 'months'}`;
};

const WorkExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── 1. Section header line draw ──
      gsap.set('.work-label-line', { scaleX: 0 });
      gsap.to('.work-label-line', {
        scrollTrigger: { trigger: '.work-label', start: 'top 95%' },
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
      });

      // ── 2. Status bar fade ──
      gsap.set('.status-bar', { opacity: 0, y: 12 });
      gsap.to('.status-bar', {
        scrollTrigger: { trigger: '.work-label', start: 'top 92%' },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      });

      // ── 3. Timeline progress — scrub-linked glow line (desktop only) ──
      gsap.set('.timeline-progress', { scaleY: 0 });
      gsap.to('.timeline-progress', {
        scrollTrigger: {
          trigger: '.work-timeline',
          start: 'top 95%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
        scaleY: 1,
        ease: 'none',
      });

      // ── 4. Year labels — fade in ──
      gsap.utils.toArray<HTMLElement>('.year-marker').forEach((el) => {
        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      // ── 5. Timeline nodes — pop in with bounce ──
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((el) => {
        gsap.set(el, { scale: 0, opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(3)',
        });
      });

      // ── 6. Node activation — intensify glow when block enters viewport ──
      gsap.utils.toArray<HTMLElement>('.node-dot').forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          borderColor: 'rgba(96, 165, 250, 0.9)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.2)',
          width: '1rem',
          height: '1rem',
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      // ── 7. Node ripple — expanding ring when node activates ──
      gsap.utils.toArray<HTMLElement>('.node-ripple').forEach((el) => {
        gsap.set(el, { scale: 0.8, opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          scale: 3.5,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onStart: () => {
            gsap.set(el, { opacity: 0.5 });
          },
        });
      });

      // ── 8. Connector lines — draw from left to right ──
      gsap.utils.toArray<HTMLElement>('.connector-line').forEach((el) => {
        gsap.set(el, { scaleX: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          scaleX: 1,
          duration: 0.5,
          delay: 0.1,
          ease: 'power2.inOut',
        });
      });

      // ── 9. Company cards — float up with scale ──
      gsap.utils.toArray<HTMLElement>('.company-card').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 44, scale: 0.97 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // ── 10. Mobile cards — simple fade up ──
      gsap.utils.toArray<HTMLElement>('.mobile-card').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });

      // ── 11. Role blocks — stagger reveal ──
      gsap.utils.toArray<HTMLElement>('.role-block').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 95%' },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // ── 12. Highlights — cascade from left ──
      gsap.utils.toArray<HTMLElement>('.highlight-item').forEach((el) => {
        gsap.set(el, { opacity: 0, x: 16 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          opacity: 1,
          x: 0,
          duration: 0.35,
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
      <div className="work-label flex items-center gap-4 mb-10 sm:mb-16">
        <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-normal">
          // Experience
        </span>
        <div className="work-label-line flex-1 h-[1px] bg-gradient-to-r from-white/55 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="status-bar flex items-center justify-between mb-8 sm:mb-12">
        <span className="text-white/75 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium">
          {totalPositions} Positions · {companyCount} Companies
        </span>
        <span className="text-white/65 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono font-medium">
          Jan 2020 - Present
        </span>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP TIMELINE (hidden on mobile, shown sm+)
          ═══════════════════════════════════════════════ */}
      <div className="work-timeline relative hidden sm:block">
        {/* Timeline track */}
        <div className="absolute left-[calc(4.5rem+19px)] top-0 bottom-0 w-[2px] bg-white/[0.12] rounded-full" />
        {/* Timeline progress */}
        <div className="timeline-progress absolute left-[calc(4.5rem+19px)] top-0 bottom-0 w-[2px] rounded-full origin-top bg-gradient-to-b from-blue-400/90 via-blue-500/60 to-cyan-400/25 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

        <div className="flex flex-col gap-14">
          {workCompanies.map((company) => {
            const totalRoles = company.roles.length;
            const isSingleRole = totalRoles === 1;

            return (
              <div key={company.id} className="flex flex-col">
                {company.roles.map((role, rIdx) => {
                  const isFirst = rIdx === 0;
                  const isLast = rIdx === totalRoles - 1;
                  const yearMatch = role.duration.match(/(\d{4})/);
                  const year = yearMatch ? yearMatch[1] : '';

                  let cardClasses =
                    'border-l border-r border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent';
                  if (isSingleRole) {
                    cardClasses =
                      'company-card rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent overflow-hidden transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_8px_48px_rgba(96,165,250,0.04)]';
                  } else if (isFirst) {
                    cardClasses =
                      'company-card rounded-t-xl border-t border-l border-r border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent overflow-hidden transition-all duration-500';
                  } else if (isLast) {
                    cardClasses += ' rounded-b-xl border-b overflow-hidden transition-all duration-500';
                  } else {
                    cardClasses += ' overflow-hidden transition-all duration-500';
                  }

                  return (
                    <div key={rIdx} className="relative flex">
                      {/* Year column */}
                      <div className="year-marker w-[4.5rem] flex-shrink-0 pt-6">
                        <span className="text-white/45 text-sm font-mono tracking-widest text-right block pr-4">
                          {year}
                        </span>
                      </div>

                      {/* Node column */}
                      <div className="w-10 flex-shrink-0 flex justify-center pt-[22px] relative">
                        <div className="timeline-node relative">
                          <div className="node-ripple absolute w-3 h-3 inset-0 rounded-full bg-blue-400/30" />
                          <div className="node-dot relative z-10 w-3 h-3 rounded-full border-2 border-blue-400/60 bg-blue-500/50" />
                        </div>
                      </div>

                      {/* Connector */}
                      <div className="w-6 flex-shrink-0 flex items-start pt-[29px]">
                        {isFirst && (
                          <div className="connector-line h-[1px] w-full bg-gradient-to-r from-blue-400/70 to-white/[0.15] origin-left" />
                        )}
                      </div>

                      {/* Card */}
                      <div className={`flex-1 ${cardClasses}`}>
                        {isFirst && (
                          <div className="px-8 pt-5 pb-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-white text-xl font-medium tracking-wide">
                                {company.name}
                              </h3>
                              {company.isLatest && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-400/25 rounded-full text-emerald-400/80 text-[8px] tracking-[0.15em] uppercase font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
                                  Current
                                </span>
                              )}
                            </div>
                            {totalRoles > 1 && (
                              <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase font-mono mt-2">
                                {totalRoles} Roles · Career Progression
                              </p>
                            )}
                            <div className="mt-3 h-[1px] bg-gradient-to-r from-blue-400/40 via-white/[0.12] to-transparent" />
                          </div>
                        )}

                        <div className={`role-block px-8 py-5 ${!isFirst ? 'border-t border-white/[0.06]' : ''}`}>
                          <div className="mb-3">
                            <h4 className="text-white/90 text-lg font-normal tracking-wide mb-1">
                              {role.pos}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-block px-3 py-0.5 bg-blue-500/[0.12] border border-blue-400/35 rounded-full text-blue-300/90 text-[9px] tracking-[0.15em] uppercase font-mono font-medium">
                                {role.duration}
                              </span>
                              {calcDuration(role.duration) && (
                                <span className="inline-block px-3 py-0.5 bg-blue-500/[0.12] border border-blue-400/35 rounded-full text-blue-300/90 text-[9px] tracking-[0.15em] uppercase font-mono font-medium">
                                  {calcDuration(role.duration)}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-white/55 text-sm font-light leading-relaxed mb-5">
                            {role.title}
                          </p>
                          <div className="space-y-2.5">
                            {role.highlights.map((highlight, hIdx) => (
                              <div key={hIdx} className="highlight-item flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-[6px] flex-shrink-0 ring-[2.5px] ring-blue-400/[0.15]" />
                                <span className="text-white/70 text-[13px] font-light leading-relaxed">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE LAYOUT (shown on mobile, hidden sm+)
          Clean stacked cards with inline year badges
          ═══════════════════════════════════════════════ */}
      <div className="flex flex-col gap-6 sm:hidden">
        {workCompanies.map((company) => {
          const totalRoles = company.roles.length;

          return (
            <div
              key={company.id}
              className="mobile-card rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent overflow-hidden">
              {/* Company header */}
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="w-2 h-2 rounded-full bg-blue-500/60 flex-shrink-0" />
                  <h3 className="text-white text-base font-medium tracking-wide">
                    {company.name}
                  </h3>
                  {company.isLatest && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-400/25 rounded-full text-emerald-400/80 text-[7px] tracking-[0.12em] uppercase font-medium">
                      <span className="w-1 h-1 rounded-full bg-emerald-400/70 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                {totalRoles > 1 && (
                  <p className="text-white/50 text-[9px] tracking-[0.2em] uppercase font-mono mt-1.5 ml-[18px]">
                    {totalRoles} Roles · Career Progression
                  </p>
                )}
                <div className="mt-3 h-[1px] bg-gradient-to-r from-blue-400/20 via-white/[0.06] to-transparent" />
              </div>

              {/* Roles */}
              {company.roles.map((role, rIdx) => (
                <div
                  key={rIdx}
                  className={`role-block px-4 py-4 ${rIdx > 0 ? 'border-t border-white/[0.06]' : ''}`}>
                  <div className="mb-2.5">
                    <h4 className="text-white/90 text-[15px] font-normal tracking-wide mb-1.5 leading-snug">
                      {role.pos}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block px-2.5 py-0.5 bg-blue-500/[0.12] border border-blue-400/35 rounded-full text-blue-300/90 text-[8px] tracking-[0.12em] uppercase font-mono font-medium">
                        {role.duration}
                      </span>
                      {calcDuration(role.duration) && (
                        <span className="inline-block px-2.5 py-0.5 bg-blue-500/[0.12] border border-blue-400/35 rounded-full text-blue-300/90 text-[8px] tracking-[0.12em] uppercase font-mono font-medium">
                          {calcDuration(role.duration)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-white/55 text-[13px] font-light leading-relaxed mb-4">
                    {role.title}
                  </p>
                  <div className="space-y-2">
                    {role.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="highlight-item flex items-start gap-2.5">
                        <div className="w-1 h-1 rounded-full bg-blue-400/60 mt-[7px] flex-shrink-0 ring-2 ring-blue-400/[0.12]" />
                        <span className="text-white/70 text-[12px] font-light leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExperience;
