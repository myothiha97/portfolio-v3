import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const beyondCards = [
  {
    title: 'Problem Solving',
    desc: 'Approaching every challenge with first-principles thinking, breaking down complex problems into clear, elegant solutions under ambiguity.',
  },
  {
    title: 'Innovation & R&D',
    desc: 'Driven by curiosity to explore emerging technologies, from AI/ML systems to novel architecture patterns that push boundaries.',
  },
  {
    title: 'Lifelong Learning',
    desc: 'Constantly expanding across disciplines, from mechatronics roots to software, systems thinking, and scientific exploration.',
  },
  {
    title: 'Writing & Knowledge Sharing',
    desc: 'Documenting learnings, authoring technical content, and contributing to open-source projects that help the community grow.',
  },
  {
    title: 'Systems Architecture',
    desc: 'Passionate about designing scalable, maintainable systems: modeling data flows, service boundaries, and architecture patterns that stand the test of time.',
  },
  {
    title: 'Exploration & Side Projects',
    desc: 'Building things outside of work is how I stay honest with myself. From systems tools in Go to automation experiments, side projects are where real curiosity lives.',
  },
];

const BeyondCode = () => {
  const [current, setCurrent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container on mount + resize
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = containerWidth > 0 && containerWidth < 640;
  // Desktop: show 3 cards + peek of 4th (3.25 slots)
  // Mobile: show 1 card + peek of 2nd (1.15 slots)
  const peekRatio = isMobile ? 1.15 : 3.35;
  const gap = 20; // px
  const gapCount = Math.floor(peekRatio); // gaps between full cards
  const cardWidth = containerWidth > 0
    ? (containerWidth - gap * gapCount) / peekRatio
    : 0;

  const visible = isMobile ? 1 : 3;
  const maxIdx = beyondCards.length - visible;
  const clampedCurrent = Math.min(current, maxIdx);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const offset = clampedCurrent * (cardWidth + gap);

  const initialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = (max: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c >= max ? 0 : c + 1));
    }, 4000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
  };

  // Only run the auto-slide timer when the carousel is visible in the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Short initial delay so the user sees the first card, then slides begin
          initialTimerRef.current = setTimeout(() => startTimer(maxIdx), 1500);
        } else {
          stopTimer();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => { observer.disconnect(); stopTimer(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIdx]);

  const prev = () => { startTimer(maxIdx); setCurrent((c) => Math.max(0, c - 1)); };
  const next = () => { startTimer(maxIdx); setCurrent((c) => Math.min(maxIdx, c + 1)); };

  return (
    <div ref={sectionRef} className="mt-20 sm:mt-32">
      <div className="flex items-center gap-4 mb-16">
        <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-normal">
          // Beyond Code
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent" />
      </div>

      <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-16">
        Engineering was always the plan, just not this kind. I started with mechatronics, moved into
        software by following what genuinely interested me, and the mindset carried over: curiosity,
        systems thinking, and caring about the craft. All of it earned through doing, not following.
      </p>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-4 h-[1px] bg-white/45" />
        <span className="text-white/65 text-[10px] tracking-[0.4em] uppercase font-normal">
          values & identity
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
      </div>

      {/* Carousel — mask-image fades right edge to reveal peek card */}
      <div
        ref={containerRef}
        className="overflow-hidden pl-px"
        style={clampedCurrent < maxIdx ? {
          WebkitMaskImage: 'linear-gradient(to right, black 80%, rgba(0,0,0,0.45) 93%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 80%, rgba(0,0,0,0.45) 93%, transparent 100%)',
        } : {}}>
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{ gap: `${gap}px`, transform: `translateX(-${offset}px)` }}>
          {beyondCards.map((item, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
              <div className="border border-white/[0.10] hover:border-white/25 rounded-lg p-6 bg-black-200/30 hover:bg-white/[0.04] h-full transition-all duration-300 group/card">
                <p className="text-white/55 text-[10px] tracking-[0.3em] uppercase font-light mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="text-white/90 group-hover/card:text-white text-base font-light mb-3 transition-colors duration-300">{item.title}</h4>
                <p className="text-white/65 group-hover/card:text-white/80 text-sm font-light leading-relaxed transition-colors duration-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          disabled={clampedCurrent === 0}
          className="w-9 h-9 flex items-center justify-center border border-white/30 rounded-full text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => {
            const isActive = i === clampedCurrent;
            return (
              <button
                key={i}
                onClick={() => { startTimer(maxIdx); setCurrent(i); }}
                className={`relative rounded-full overflow-hidden transition-[width,height] duration-300 ease-out ${
                  isActive
                    ? 'w-8 h-1 bg-white/15'
                    : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/45'
                }`}>
                {isActive && (
                  <span
                    key={clampedCurrent}
                    className="absolute inset-0 bg-white/75 rounded-full dot-progress"
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={next}
          disabled={clampedCurrent >= maxIdx}
          className="w-9 h-9 flex items-center justify-center border border-white/30 rounded-full text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Shipped' },
  { value: '3', label: 'Companies' },
  { value: '20+', label: 'Technologies' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Existing Profile animations
      gsap.from('.about-label-line', {
        scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.about-reveal', {
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      gsap.from('.about-stat', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.about-corner', {
        scrollTrigger: { trigger: '.about-frame', start: 'top 80%' },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });

      // Detailed bio + social links
      gsap.from('.about-detail-reveal', {
        scrollTrigger: { trigger: '.about-detail', start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // Education animations
      gsap.from('.edu-label-line', {
        scrollTrigger: { trigger: '.edu-section', start: 'top 80%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.edu-content', {
        scrollTrigger: { trigger: '.edu-section', start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="about">
      {/* Profile Label */}
      <div className="about-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Profile</span>
        <div className="about-label-line flex-1 h-[1px] bg-gradient-to-r from-white/55 to-transparent origin-left" />
      </div>

      {/* Profile Frame */}
      <div className="about-frame relative">
        <div className="about-corner absolute -top-3 -left-3 w-6 h-6 border-l border-t border-white/[0.18]" />
        <div className="about-corner absolute -top-3 -right-3 w-6 h-6 border-r border-t border-white/[0.18]" />
        <div className="about-corner absolute -bottom-3 -left-3 w-6 h-6 border-l border-b border-white/[0.18]" />
        <div className="about-corner absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-white/[0.18]" />

        <div className="about-content py-8 sm:py-16 px-4 sm:px-12">
          <h2 className="about-reveal text-white/95 text-2xl sm:text-3xl md:text-5xl font-light leading-tight tracking-wide mb-6 sm:mb-8">
            Software Engineer
            <br />
            <span className="text-white/65 text-xl sm:text-2xl md:text-4xl">Full Stack · Systems · DevOps · Automation</span>
          </h2>

          <div className="about-reveal max-w-2xl mb-12">
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              6+ years delivering scalable web applications and intelligent automation systems for enterprise clients
              across Singapore and Southeast Asia. Currently at Rezerv, leading frontend architecture while deepening
              expertise in backend systems, DevOps, and automation.
            </p>
          </div>

          <div className="about-stats grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="about-stat border-l border-white/[0.14] pl-3 sm:pl-6">
                <p className="text-white/90 text-xl sm:text-3xl font-light tracking-wide">{stat.value}</p>
                <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Bio + Social Links */}
      <div className="about-detail mt-16 sm:mt-20">
        <div className="about-detail-reveal max-w-2xl mb-10">
          <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-4">
            Architected production systems for 7-Eleven, Rezerv, SPOTV, AIA, RWS Singapore, Neuroglee, and major
            regional brands. Engineered enterprise automation platforms and deployed ML-powered computer vision systems.
          </p>
          <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
            Bachelor of Engineering in Mechatronics from West Yangon Technological University, bringing systems thinking
            to software solutions. Building technology that matters.
          </p>
        </div>

        <div className="about-detail-reveal flex items-center gap-4 sm:gap-6 flex-wrap">
          <a
            href="https://github.com/myothiha97"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors">
            <img src="/assets/github.svg" alt="github" className="w-4 h-4 opacity-70" />
            <span className="text-xs tracking-wider uppercase font-light">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/myo-thiha-kyaw-ba036a187"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors">
            <img src="/assets/twitter.svg" alt="linkedin" className="w-4 h-4 opacity-70" />
            <span className="text-xs tracking-wider uppercase font-light">LinkedIn</span>
          </a>
          <a
            href="mailto:mthk97.dev@gmail.com"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors">
            <span className="text-xs tracking-wider uppercase font-light text-white/65">mthk97.dev@gmail.com</span>
          </a>
          <div className="inline-flex cursor-auto items-center gap-2 text-white/55 hover:text-white/80 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-xs sm:text-base tracking-wider uppercase font-light">+66927033226</span>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="edu-section mt-20 sm:mt-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-normal">// Education</span>
          <div className="edu-label-line flex-1 h-[1px] bg-gradient-to-r from-white/55 to-transparent origin-left" />
        </div>

        <div className="edu-content grid sm:grid-cols-2 grid-cols-1 gap-6">
          {[
            {
              num: '01',
              degree: 'Bachelor of Engineering',
              field: 'Mechatronics, Robotics & Automation',
              years: '2014 - 2020',
              gpa: '4.5',
              gpaMax: '5.0',
              gpaPercent: 90,
              desc: 'Advanced study in mechatronics engineering with focus on IoT systems, automation, and system integration. Developed strong expertise in bridging hardware and software, applying systems thinking to complex engineering challenges.',
            },
            {
              num: '02',
              degree: 'Bachelor of Science',
              field: 'Mechatronics Engineering',
              years: '2014 - 2018',
              gpa: '4.3',
              gpaMax: '5.0',
              gpaPercent: 86,
              desc: 'Foundation in multidisciplinary engineering combining mechanical, electrical, and computer systems. Hands-on project experience in automation and interdisciplinary problem-solving that shaped a systems-level approach to software architecture.',
            },
          ].map((edu, i) => (
            <div key={i} className="relative group">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white/[0.14] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-white/[0.14] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="border border-white/[0.10] rounded-lg p-6 sm:p-8 bg-black-200/30 h-full relative overflow-hidden group-hover:border-white/[0.18] transition-colors duration-500">
                {/* Grid overlay */}
                <div className="absolute inset-0 bridge-grid opacity-[0.01] pointer-events-none" />

                <div className="relative z-10">
                  {/* Number tag */}
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light mb-4">{edu.num}</p>

                  {/* Degree title */}
                  <h3 className="text-white/90 text-lg font-light mb-1">{edu.degree}</h3>
                  <p className="text-white/55 text-xs tracking-[0.15em] uppercase font-light mb-1">{edu.field}</p>
                  <p className="text-white/45 text-xs tracking-[0.15em] uppercase font-light mb-5">{edu.years}</p>

                  {/* GPA indicator */}
                  <div className="mb-5">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-light">GPA</span>
                      <span className="text-white/80 text-sm font-light">{edu.gpa} <span className="text-white/40">/ {edu.gpaMax}</span></span>
                    </div>
                    <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400/60 to-blue-400/30 rounded-full"
                        style={{ width: `${edu.gpaPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* University name */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span className="text-white/55 text-[11px] tracking-wider font-light">West Yangon Technological University</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm font-light leading-relaxed">{edu.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beyond Code */}
      <BeyondCode />
    </section>
  );
};

export default About;
