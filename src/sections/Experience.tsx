import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { workExperiences } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

interface BridgePanelProps {
  activeIndex: number;
}

const BridgePanel = ({ activeIndex }: BridgePanelProps) => {
  const dotRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (dotRef.current) {
      gsap.fromTo(
        dotRef.current,
        { scale: 1, opacity: 0.15 },
        { scale: 1.8, opacity: 0.4, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 },
      );
    }
    if (statusRef.current) {
      gsap.fromTo(statusRef.current, { opacity: 0, x: -5 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [activeIndex]);

  const isActive = activeIndex >= 0;
  const experience = isActive ? workExperiences[activeIndex] : null;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black-200 rounded-lg border border-white/[0.08]">
      <div className="absolute inset-0 bridge-grid opacity-[0.02]" />

      <div className="absolute">
        <div
          className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px]"
          style={{ animation: 'bridge-rotate 12s linear infinite' }}>
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-[1px]"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.08), transparent)',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-white/[0.04]" />
      <div className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full border border-white/[0.03]" />
      <div className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full border border-white/[0.025]" />

      <div className="text-center z-10 flex flex-col items-center">
        <div
          ref={dotRef}
          className="w-2.5 h-2.5 rounded-full mb-5"
          style={{
            backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            boxShadow: isActive ? '0 0 20px rgba(255,255,255,0.1)' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <div ref={statusRef}>
          {isActive ? (
            <>
              <p className="text-white/60 text-[11px] tracking-[0.25em] uppercase font-light mb-1">
                {experience?.pos}
              </p>
              <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase font-light">
                {experience?.duration}
              </p>
            </>
          ) : (
            <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-light">STANDBY</p>
          )}
        </div>
      </div>

      <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-white/[0.12]" />
      <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-white/[0.12]" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-white/[0.12]" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-white/[0.12]" />

      <p className="absolute top-5 text-white/25 text-[9px] tracking-[0.4em] uppercase font-light">BRIDGE.LINK</p>
      <p className="absolute bottom-5 text-white/25 text-[9px] tracking-[0.3em] uppercase font-light">
        {isActive ? `NODE ${activeIndex + 1} / ${workExperiences.length}` : `${workExperiences.length} CONNECTIONS`}
      </p>

      {workExperiences.map((_, i) => {
        const angle = (i / workExperiences.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 130;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={i}
            className="absolute hidden sm:block"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '8px' : '4px',
                height: i === activeIndex ? '8px' : '4px',
                backgroundColor: i === activeIndex ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)',
                boxShadow: i === activeIndex ? '0 0 12px rgba(255,255,255,0.15)' : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const WorkExperience = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.work-label-line', {
        scrollTrigger: { trigger: '.work-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.work-entrance', {
        scrollTrigger: { trigger: '.work-grid', start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="work">
      <div className="work-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Experience</span>
        <div className="work-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      <div className="work-grid grid lg:grid-cols-3 grid-cols-1 gap-5">
        <div className="work-entrance col-span-1 rounded-lg min-h-[320px]">
          <BridgePanel activeIndex={activeIndex} />
        </div>

        <div className="work-entrance col-span-1 lg:col-span-2 border border-white/[0.08] rounded-lg bg-black-200">
          <div className="sm:py-10 py-5 sm:px-5 px-2.5">
            {workExperiences.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                onPointerOver={() => setActiveIndex(index)}
                onPointerOut={() => setActiveIndex(-1)}
                className="grid grid-cols-[auto_1fr] items-start gap-5 transition-all ease-in-out duration-500 cursor-pointer hover:bg-white/[0.02] rounded-lg sm:px-5 px-2.5 group">
                <div className="flex flex-col h-full justify-start items-center py-2">
                  <div className="rounded-xl w-14 h-14 p-2 bg-black-300/50 border border-white/[0.08] flex items-center justify-center">
                    <img className="w-8 h-8 opacity-70" src={item.icon} alt="" />
                  </div>
                  <div className="flex-1 w-[1px] mt-4 h-full bg-white/[0.08] group-last:hidden" />
                </div>

                <div className="sm:p-5 px-2.5 py-5">
                  <p className="text-white/90 font-light text-lg">{item.name}</p>
                  <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-light mb-4">
                    {item.pos} &mdash; {item.duration}
                  </p>
                  <p className="text-white/55 text-sm font-light leading-relaxed group-hover:text-white/75 transition-all duration-500">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
