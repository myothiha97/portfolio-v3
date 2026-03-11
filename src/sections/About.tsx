import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../constants/index';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
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

      // Tech Stack animations
      gsap.from('.skills-label-line', {
        scrollTrigger: { trigger: '.skills-section', start: 'top 80%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.skill-card', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
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
        <div className="about-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      {/* Profile Frame */}
      <div className="about-frame relative">
        <div className="about-corner absolute -top-3 -left-3 w-6 h-6 border-l border-t border-white/[0.18]" />
        <div className="about-corner absolute -top-3 -right-3 w-6 h-6 border-r border-t border-white/[0.18]" />
        <div className="about-corner absolute -bottom-3 -left-3 w-6 h-6 border-l border-b border-white/[0.18]" />
        <div className="about-corner absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-white/[0.18]" />

        <div className="about-content py-12 sm:py-16 px-6 sm:px-12">
          <h2 className="about-reveal text-white/95 text-3xl sm:text-5xl font-light leading-tight tracking-wide mb-8">
            Software Engineer
            <br />
            <span className="text-white/65">full stack · backend · DevOps · automation</span>
          </h2>

          <div className="about-reveal max-w-2xl mb-12">
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              6+ years delivering scalable web applications and intelligent automation systems for enterprise clients
              across Singapore and Southeast Asia. Currently at Rezerv building modern frontend experiences while
              specializing in backend architecture, automation workflows, and DevOps practices.
            </p>
          </div>

          <div className="about-stats grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="about-stat border-l border-white/[0.14] pl-4 sm:pl-6">
                <p className="text-white/90 text-2xl sm:text-3xl font-light tracking-wide">{stat.value}</p>
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

        <div className="about-detail-reveal flex items-center gap-6">
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
        </div>
      </div>

      {/* Tech Stack */}
      <div className="skills-section mt-20 sm:mt-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-light">// Tech Stack</span>
          <div className="skills-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
        </div>

        <div className="skills-grid grid sm:grid-cols-2 grid-cols-1 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-card relative">
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-l border-t border-white/[0.14]" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-r border-t border-white/[0.14]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-l border-b border-white/[0.14]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-r border-b border-white/[0.14]" />

              <div className="border border-white/[0.10] rounded-lg p-6 bg-black-200/50">
                <p className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-light mb-4">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 border border-white/[0.14] rounded text-white/65 text-xs tracking-wider font-light hover:border-white/20 hover:text-white/80 transition-all duration-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="edu-section mt-20 sm:mt-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-light">// Education</span>
          <div className="edu-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
        </div>

        <div className="edu-content border border-white/[0.10] rounded-lg p-6 sm:p-8 bg-black-200/30 max-w-xl">
          <h3 className="text-white/90 text-lg font-light mb-2">West Yangon Technological University</h3>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light mb-1">
            Bachelor of Engineering — Mechatronics, Robotics &amp; Automation
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light mb-4">
            2014 - 2020 · Grade: A
          </p>
          <p className="text-white/65 text-sm font-light leading-relaxed">
            Multidisciplinary engineering combining electronics, mechanical systems, and computer science —
            providing a systems-level perspective on software architecture and infrastructure design.
          </p>
        </div>
      </div>

      {/* Currently Exploring */}
      <div className="mt-20 sm:mt-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-light">
            // Currently Exploring
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
          {[
            {
              title: 'Go & Microservices',
              desc: 'Building high-performance backend services with Go, clean architecture, and distributed system patterns.',
            },
            {
              title: 'DevOps & Cloud',
              desc: 'Docker orchestration, AWS infrastructure, CI/CD pipelines, monitoring with Datadog, and Linux administration.',
            },
            {
              title: 'Automation & Systems',
              desc: 'Web scraping pipelines, task scheduling, ML-powered automation, and end-to-end system design patterns.',
            },
          ].map((item, i) => (
            <div key={i} className="border border-white/[0.10] rounded-lg p-6 bg-black-200/30">
              <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase font-light mb-3">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="text-white/80 text-base font-light mb-3">{item.title}</h4>
              <p className="text-white/55 text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
