import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '../components/Button';

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
  drift: number;
  driftSpeed: number;
}

// Subtle floating particles (like ash/timefall from Death Stranding)
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const numParticles = 160;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.45 + 0.1,
        speedY: -(Math.random() * 0.2 + 0.04),
        speedX: (Math.random() - 0.5) * 0.12,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.004 + 0.001,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        const sway = Math.sin(time + p.drift) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 195, 188, ${p.opacity})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX + sway * 0.02;
        p.drift += p.driftSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.5, stagger: 0.1, ease: 'power3.inOut' })
        .fromTo(
          '.hero-circle',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
          '-=1.2',
        )
        .fromTo('.hero-greeting', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
        .fromTo('.hero-subtitle', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');

      gsap.to('.hero-circle', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col relative overflow-hidden" id="home">
      <ParticleField />
      <div className="absolute inset-0 hero-atmosphere" />
      <div className="absolute inset-0 hero-grain pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="hero-circle absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] rounded-full border border-white/[0.07]">
          {/* Orbiting moon with strong localized glow on circle */}
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2">
            {/* Large diffused glow illuminating the circle outline */}
            <div className="absolute -inset-10 rounded-full bg-white/[0.15] blur-2xl" />
            <div className="absolute -inset-5 rounded-full bg-white/[0.12] blur-lg animate-pulse" />
            {/* Moon dot */}
            <div className="relative w-[7px] h-[7px] rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.5)]" />
          </div>
          {/* Secondary smaller dot */}
          <div className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white/25" />
        </div>
        <div className="hero-line absolute w-[120px] sm:w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-[180px] sm:-translate-y-[240px]" />
        <div className="hero-line absolute w-[80px] sm:w-[140px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-y-[180px] sm:translate-y-[240px]" />
      </div>

      <div className="w-full mx-auto flex flex-col items-center justify-center flex-1 c-space gap-5 z-10 relative">
        <p className="hero-greeting sm:text-2xl text-lg font-light tracking-[0.2em] uppercase text-white/70 text-center font-generalsans opacity-0">
          Hi, I am Myo <span className="waving-hand">👋</span>
        </p>
        <h1 className="hero-title hero_tag text-[#c8c2bc] opacity-0" style={{ letterSpacing: '0.04em' }}>
          Full-Stack Engineer
        </h1>
        <p className="hero-subtitle text-white/55 text-center max-w-xl sm:text-base text-sm font-generalsans font-light tracking-wide leading-relaxed opacity-0">
          Building scalable systems — from React frontends
          <br className="hidden sm:block" /> to Go microservices and cloud infrastructure
        </p>
      </div>

      <div className="hero-cta absolute bottom-7 left-0 right-0 w-full z-10 c-space opacity-0">
        <a href="#about" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
