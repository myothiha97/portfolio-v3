import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Shipped' },
  { value: '3', label: 'Companies' },
  { value: '10+', label: 'Technologies' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="about">
      <div className="about-label flex items-center gap-4 mb-16">
        <span className="text-white/50 text-[11px] tracking-[0.4em] uppercase font-light">// Profile</span>
        <div className="about-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
      </div>

      <div className="about-frame relative">
        <div className="about-corner absolute -top-3 -left-3 w-6 h-6 border-l border-t border-white/[0.12]" />
        <div className="about-corner absolute -top-3 -right-3 w-6 h-6 border-r border-t border-white/[0.12]" />
        <div className="about-corner absolute -bottom-3 -left-3 w-6 h-6 border-l border-b border-white/[0.12]" />
        <div className="about-corner absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-white/[0.12]" />

        <div className="about-content py-12 sm:py-16 px-6 sm:px-12">
          <h2 className="about-reveal text-white/95 text-3xl sm:text-5xl font-light leading-tight tracking-wide mb-8">
            Senior Frontend Engineer
            <br />
            <span className="text-white/50">building across the full stack</span>
          </h2>

          <div className="about-reveal max-w-2xl mb-12">
            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
              With a Mechatronics Engineering background and 6+ years of experience, I bring a systems-thinking approach
              to software. I&apos;ve shipped products for 7-Eleven, Resorts World Sentosa, and SPOTV — now expanding
              into Go microservices, DevOps, and cloud infrastructure.
            </p>
          </div>

          <div className="about-stats grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="about-stat border-l border-white/[0.10] pl-4 sm:pl-6">
                <p className="text-white/90 text-2xl sm:text-3xl font-light tracking-wide">{stat.value}</p>
                <p className="text-white/50 text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="about-reveal">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors group">
              <span className="text-sm tracking-[0.15em] uppercase font-light">Explore my story</span>
              <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-white/50 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
