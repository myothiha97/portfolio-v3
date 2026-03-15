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
      // ── 1. Section header line draw ──
      gsap.set('.work-label-line', { scaleX: 0 });
      gsap.to('.work-label-line', {
        scrollTrigger: { trigger: '.work-label', start: 'top 88%' },
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
      });

      // ── 2. Status bar fade ──
      gsap.set('.status-bar', { opacity: 0, y: 12 });
      gsap.to('.status-bar', {
        scrollTrigger: { trigger: '.work-label', start: 'top 82%' },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      });

      // ── 3. Timeline progress — scrub-linked glow line ──
      gsap.set('.timeline-progress', { scaleY: 0 });
      gsap.to('.timeline-progress', {
        scrollTrigger: {
          trigger: '.work-timeline',
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
        scaleY: 1,
        ease: 'none',
      });

      // ── 4. Year labels — fade in (no x translation to avoid artifacts) ──
      gsap.utils.toArray<HTMLElement>('.year-marker').forEach((el) => {
        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 86%' },
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      // ── 5. Timeline nodes — pop in with bounce ──
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((el) => {
        gsap.set(el, { scale: 0, opacity: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 86%' },
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(3)',
        });
      });

      // ── 6. Node activation — turn blue when block enters viewport ──
      gsap.utils.toArray<HTMLElement>('.node-dot').forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          borderColor: 'rgba(96, 165, 250, 0.7)',
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
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
          scrollTrigger: { trigger: el, start: 'top 70%' },
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
          scrollTrigger: { trigger: el, start: 'top 86%' },
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
          scrollTrigger: { trigger: el, start: 'top 88%' },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // ── 10. Role blocks — stagger reveal ──
      gsap.utils.toArray<HTMLElement>('.role-block').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // ── 11. Highlights — cascade from left ──
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
      <div className="work-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">
          // Experience
        </span>
        <div className="work-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="status-bar flex items-center justify-between mb-12">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light">
          {totalPositions} Positions · {companyCount} Companies
        </span>
        <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-mono">
          Jan 2020 — Present
        </span>
      </div>

      {/* Timeline */}
      <div className="work-timeline relative">
        {/* Timeline track (subtle background rail) */}
        <div className="absolute left-[calc(3.5rem+19px)] sm:left-[calc(4.5rem+19px)] top-0 bottom-0 w-[2px] bg-white/[0.05] rounded-full" />

        {/* Timeline progress (animated glowing fill — scrub-linked) */}
        <div className="timeline-progress absolute left-[calc(3.5rem+19px)] sm:left-[calc(4.5rem+19px)] top-0 bottom-0 w-[2px] rounded-full origin-top bg-gradient-to-b from-blue-400/50 via-blue-500/25 to-cyan-400/10 shadow-[0_0_8px_rgba(96,165,250,0.2)]" />

        <div className="flex flex-col gap-14">
          {workCompanies.map((company) => {
            const earliestDuration = company.roles[company.roles.length - 1].duration;
            const yearMatch = earliestDuration.match(/\d{4}/);
            const startYear = yearMatch ? yearMatch[0] : '';
            const totalRoles = company.roles.length;

            return (
              <div key={company.id} className="exp-block relative flex">
                {/* ── Year column ── */}
                <div className="year-marker w-14 sm:w-[4.5rem] flex-shrink-0 pt-6">
                  <span className="text-white/40 text-xs sm:text-sm font-mono tracking-widest text-right block pr-4">
                    {startYear}
                  </span>
                </div>

                {/* ── Node column ── */}
                <div className="w-10 flex-shrink-0 flex justify-center pt-[22px] relative">
                  <div className="timeline-node relative">
                    {/* Ripple ring (animated on scroll) */}
                    <div className="node-ripple absolute w-3 h-3 inset-0 rounded-full bg-blue-400/25" />
                    {/* Solid node — starts grey, animates to blue on scroll */}
                    <div className="node-dot relative z-10 w-3 h-3 rounded-full border-2 border-white/25 bg-white/[0.08]" />
                  </div>
                </div>

                {/* ── Connector ── */}
                <div className="w-4 sm:w-6 flex-shrink-0 flex items-start pt-[29px]">
                  <div className="connector-line h-[1px] w-full bg-gradient-to-r from-blue-400/25 to-white/[0.06] origin-left" />
                </div>

                {/* ── Company card ── */}
                <div className="company-card flex-1 rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent overflow-hidden transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_8px_48px_rgba(96,165,250,0.04)]">
                  {/* Company header */}
                  <div className="px-6 sm:px-8 pt-5 pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-white text-lg sm:text-xl font-medium tracking-wide">
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
                      <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-mono mt-2">
                        {totalRoles} Roles · Career Progression
                      </p>
                    )}
                    <div className="mt-3 h-[1px] bg-gradient-to-r from-blue-400/20 via-white/[0.06] to-transparent" />
                  </div>

                  {/* Roles */}
                  {company.roles.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className={`role-block px-6 sm:px-8 py-5 ${rIdx > 0 ? 'border-t border-white/[0.06]' : ''}`}>
                      {/* Role header */}
                      <div className="mb-3">
                        <h4 className="text-white/90 text-base sm:text-lg font-normal tracking-wide mb-1">
                          {role.pos}
                        </h4>
                        <span className="inline-block px-3 py-0.5 bg-white/[0.05] border border-white/[0.1] rounded-full text-white/45 text-[9px] tracking-[0.15em] uppercase font-mono">
                          {role.duration}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="text-white/55 text-sm font-light leading-relaxed mb-5">
                        {role.title}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2.5">
                        {role.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="highlight-item flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-[6px] flex-shrink-0 ring-[2.5px] ring-blue-400/[0.12]" />
                            <span className="text-white/70 text-[13px] font-light leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
