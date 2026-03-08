import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { workExperiences, skills } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.from('.about-hero-line', { scaleX: 0, duration: 1.2, ease: 'power3.inOut' })
        .from('.about-hero-label', { opacity: 0, y: 10, duration: 0.6 }, '-=0.6')
        .from('.about-hero-name', { opacity: 0, y: 25, duration: 0.8 }, '-=0.3')
        .from('.about-hero-role', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
        .from('.about-hero-bio', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
        .from('.about-hero-social', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');

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

      gsap.from('.exp-label-line', {
        scrollTrigger: { trigger: '.exp-section', start: 'top 80%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.exp-item', {
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 85%' },
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      });

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
    { scope: pageRef },
  );

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="max-w-7xl mx-auto relative">
        <div className="fixed inset-0 hero-grain pointer-events-none z-50" />

        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center c-space pt-24 pb-16 relative">
          <div className="absolute inset-0 hero-atmosphere pointer-events-none" />

          <Link
            to="/"
            className="about-hero-label inline-flex items-center gap-2 text-white/45 hover:text-white/70 transition-colors mb-12 w-fit">
            <span className="w-4 h-[1px] bg-white/20" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-light">Back to Home</span>
          </Link>

          <div className="about-hero-line w-full h-[1px] bg-gradient-to-r from-white/15 via-white/[0.10] to-transparent mb-12 origin-left" />

          <p className="about-hero-label text-white/40 text-[11px] tracking-[0.5em] uppercase font-light mb-6">
            // About Me
          </p>

          <h1 className="about-hero-name text-white/95 text-4xl sm:text-6xl font-light tracking-wide mb-4">
            Myo Thiha Kyaw
          </h1>

          <p className="about-hero-role text-white/55 text-lg sm:text-xl font-light tracking-wide mb-8">
            Senior Frontend Engineer &rarr; Full-Stack Engineer
          </p>

          <div className="about-hero-bio max-w-2xl mb-10">
            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed mb-4">
              I&apos;m a software engineer based in Thailand, working remotely with Singapore-based companies. With a
              background in Mechatronics Engineering, I approach software with a systems-thinking mindset — bridging
              hardware concepts with modern web architectures.
            </p>
            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
              Over the past 6+ years, I&apos;ve evolved from a frontend specialist to a full-stack engineer, building
              everything from high-performance streaming platforms to fitness management software. I&apos;m currently
              expanding into Go microservices, Docker orchestration, and cloud infrastructure.
            </p>
          </div>

          <div className="about-hero-social flex items-center gap-6">
            <a
              href="https://github.com/myothiha97"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/70 transition-colors">
              <img src="/assets/github.svg" alt="github" className="w-4 h-4 opacity-60" />
              <span className="text-xs tracking-wider uppercase font-light">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/myo-thiha-kyaw-ba036a187"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/70 transition-colors">
              <img src="/assets/twitter.svg" alt="linkedin" className="w-4 h-4 opacity-60" />
              <span className="text-xs tracking-wider uppercase font-light">LinkedIn</span>
            </a>
            <a
              href="mailto:mthk97.dev@gmail.com"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/70 transition-colors">
              <span className="text-xs tracking-wider uppercase font-light text-white/55">mthk97.dev@gmail.com</span>
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="skills-section c-space my-20 sm:my-32">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-white/50 text-[11px] tracking-[0.4em] uppercase font-light">// Tech Stack</span>
            <div className="skills-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
          </div>

          <div className="skills-grid grid sm:grid-cols-2 grid-cols-1 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-card relative">
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-l border-t border-white/[0.10]" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-r border-t border-white/[0.10]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-l border-b border-white/[0.10]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-r border-b border-white/[0.10]" />

                <div className="border border-white/[0.08] rounded-lg p-6 bg-black-200/50">
                  <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-light mb-4">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 border border-white/[0.10] rounded text-white/55 text-xs tracking-wider font-light hover:border-white/15 hover:text-white/65 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="exp-section c-space my-20 sm:my-32">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-white/50 text-[11px] tracking-[0.4em] uppercase font-light">// Experience</span>
            <div className="exp-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
          </div>

          <div className="exp-timeline space-y-0">
            {workExperiences.map((exp, index) => (
              <div key={exp.id} className="exp-item relative pl-8 pb-12 last:pb-0 group">
                {index < workExperiences.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-white/[0.06]" />
                )}

                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border border-white/[0.08] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                </div>

                <div className="border border-white/[0.08] rounded-lg p-6 sm:p-8 bg-black-200/30 hover:bg-black-200/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white/90 text-lg font-light">{exp.name}</h3>
                      <p className="text-white/50 text-sm font-light">{exp.pos}</p>
                    </div>
                    <p className="text-white/35 text-xs tracking-[0.2em] uppercase font-light">{exp.duration}</p>
                  </div>
                  <p className="text-white/55 text-sm font-light leading-relaxed">{exp.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="edu-section c-space my-20 sm:my-32">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-white/50 text-[11px] tracking-[0.4em] uppercase font-light">// Education</span>
            <div className="edu-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
          </div>

          <div className="edu-content border border-white/[0.08] rounded-lg p-6 sm:p-8 bg-black-200/30 max-w-xl">
            <h3 className="text-white/90 text-lg font-light mb-2">Mechatronics Engineering</h3>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase font-light mb-4">
              Bachelor&apos;s Degree
            </p>
            <p className="text-white/55 text-sm font-light leading-relaxed">
              A multidisciplinary field combining mechanical engineering, electronics, computer science, and control
              engineering — giving me a unique systems-level perspective on software architecture and infrastructure
              design.
            </p>
          </div>
        </section>

        {/* Currently Learning */}
        <section className="c-space my-20 sm:my-32">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-white/50 text-[11px] tracking-[0.4em] uppercase font-light">
              // Currently Exploring
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
            {[
              {
                title: 'Go Microservices',
                desc: 'Building high-performance backend services with goroutines, channels, and clean architecture patterns.',
              },
              {
                title: 'DevOps & Infrastructure',
                desc: 'Docker orchestration, CI/CD pipelines, cloud deployment strategies, and monitoring systems.',
              },
              {
                title: 'System Design',
                desc: 'Distributed systems, API gateway patterns, rate limiting, caching strategies, and database optimization.',
              },
            ].map((item, i) => (
              <div key={i} className="border border-white/[0.08] rounded-lg p-6 bg-black-200/30">
                <p className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-light mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="text-white/80 text-base font-light mb-3">{item.title}</h4>
                <p className="text-white/45 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="c-space my-20 sm:my-32">
          <div className="text-center">
            <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase font-light mb-6">
              Open to remote opportunities worldwide
            </p>
            <h2 className="text-white/90 text-2xl sm:text-3xl font-light tracking-wide mb-8">
              Let&apos;s build something together
            </h2>
            <div className="flex items-center justify-center gap-6">
              <Link
                to="/"
                onClick={() => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="px-6 py-3 border border-white/[0.12] rounded text-white/60 text-xs tracking-[0.2em] uppercase font-light hover:border-white/25 hover:text-white/90 transition-all duration-300">
                Get in Touch
              </Link>
              <a
                href="mailto:mthk97.dev@gmail.com"
                className="text-white/30 text-xs tracking-wider font-light hover:text-white/60 transition-colors">
                mthk97.dev@gmail.com
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default AboutPage;
