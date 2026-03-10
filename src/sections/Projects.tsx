import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { myProjects } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

const projectCount = myProjects.length;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction: 'previous' | 'next') => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(
    () => {
      gsap.from('.projects-label-line', {
        scrollTrigger: { trigger: '.projects-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.project-entrance', {
        scrollTrigger: { trigger: '.project-card', start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  // Animate text on project change
  useGSAP(
    () => {
      gsap.fromTo(
        '.project-text',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      );
    },
    { scope: sectionRef, dependencies: [selectedProjectIndex], revertOnUpdate: true },
  );

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="projects">
      {/* Section label */}
      <div className="projects-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Projects</span>
        <div className="projects-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      <div className="project-card grid lg:grid-cols-2 grid-cols-1 gap-8">
        {/* Left: Project info */}
        <div className="project-entrance flex flex-col justify-between">
          <div className="mb-8">
            <p className="project-text text-white/50 text-[11px] tracking-[0.4em] uppercase font-light mb-6">
              {String(selectedProjectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
            </p>

            <div
              className="project-text p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg mb-6"
              style={currentProject.logoStyle}>
              <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
            </div>

            <h3 className="project-text text-white/95 text-2xl sm:text-3xl font-light tracking-wide mb-4">
              {currentProject.title}
            </h3>
            <p className="project-text text-white/70 text-sm sm:text-base font-light leading-relaxed mb-3">
              {currentProject.desc}
            </p>
            <p className="project-text text-white/60 text-sm font-light leading-relaxed">{currentProject.subdesc}</p>
          </div>

          <div>
            <div className="project-text flex items-center gap-3 flex-wrap mb-6">
              {currentProject.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.14] rounded">
                  <img src={tag.path} alt={tag.name} className="w-4 h-4" />
                  <span className="text-white/65 text-[11px] tracking-wider uppercase">{tag.name}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                className="w-10 h-10 border border-white/[0.14] rounded flex items-center justify-center hover:border-white/25 transition-colors"
                onClick={() => handleNavigation('previous')}>
                <img src="/assets/left-arrow.png" alt="previous" className="w-3 h-3 opacity-70" />
              </button>
              <button
                className="w-10 h-10 border border-white/[0.14] rounded flex items-center justify-center hover:border-white/25 transition-colors"
                onClick={() => handleNavigation('next')}>
                <img src="/assets/right-arrow.png" alt="next" className="w-3 h-3 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Project visual — DS2-style data panel instead of broken video */}
        <div className="project-entrance relative">
          {/* DS2 frame corners */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-l border-t border-white/[0.18] z-10" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-r border-t border-white/[0.18] z-10" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l border-b border-white/[0.18] z-10" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r border-b border-white/[0.18] z-10" />

          <div className="w-full h-80 sm:h-96 lg:h-full min-h-[360px] bg-black-200 border border-white/[0.10] rounded overflow-hidden relative flex items-center justify-center">
            {/* Grid background */}
            <div className="absolute inset-0 bridge-grid opacity-[0.02]" />

            {/* Spotlight glow effect based on project */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${currentProject.logoStyle.boxShadow?.replace('0px 0px 60px 0px ', '') || 'rgba(255,255,255,0.05)'}, transparent 70%)`,
              }}
            />

            {/* Center project visualization */}
            <div className="text-center z-10 px-8">
              {/* Project number large */}
              <p className="text-white/[0.04] text-[120px] sm:text-[160px] font-light leading-none select-none">
                {String(selectedProjectIndex + 1).padStart(2, '0')}
              </p>

              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-white/[0.03]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full border border-white/[0.02]" />

              {/* Project title overlay */}
              <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-light mt-[-40px]">
                {currentProject.tags.map((t) => t.name).join(' · ')}
              </p>
            </div>

            {/* Top label */}
            <p className="absolute top-4 left-5 text-white/25 text-[9px] tracking-[0.4em] uppercase font-light">
              PROJECT.DATA
            </p>

            {/* Bottom label */}
            <p className="absolute bottom-4 right-5 text-white/25 text-[9px] tracking-[0.3em] uppercase font-light">
              {currentProject.title.toUpperCase().slice(0, 20)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
