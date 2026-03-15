import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { myProjects } from '../constants/index';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projectCount = myProjects.length;

// Get monogram (first letter or first two initials)
const getMonogram = (title: string) => {
  const words = title.split(' ');
  if (words.length === 1) return title.slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Parse RGB from color string (hex or rgba)
const parseRGB = (color: string): [number, number, number] => {
  const hexMatch = color.match(/#([A-Fa-f0-9]{6,8})/);
  if (hexMatch) {
    const hex = hexMatch[1];
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  const rgbaMatch = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgbaMatch) return [+rgbaMatch[1], +rgbaMatch[2], +rgbaMatch[3]];
  return [100, 140, 255];
};

interface StrandNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  phase: number;
}

// Strand network animation - chiral network / Death Stranding inspired
const StrandCanvas = ({ color }: { color: string; projectIndex: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<StrandNode[]>([]);
  const colorRef = useRef({ r: 100, g: 140, b: 255 });
  const targetColorRef = useRef({ r: 100, g: 140, b: 255 });

  // Update target color when project changes (no re-init)
  useEffect(() => {
    const [r, g, b] = parseRGB(color);
    targetColorRef.current = { r, g, b };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const [ir, ig, ib] = parseRGB(color);
    colorRef.current = { r: ir, g: ig, b: ib };
    targetColorRef.current = { r: ir, g: ig, b: ib };

    const nodeCount = 35;
    const connectionDist = 120;
    const margin = 30;

    // Only initialize nodes once
    if (nodesRef.current.length === 0) {
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: margin + Math.random() * (w - margin * 2),
          y: margin + Math.random() * (h - margin * 2),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1.5 + Math.random() * 2.5,
          baseOpacity: 0.3 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const nodes = nodesRef.current;
    const startTime = Date.now();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const elapsed = (Date.now() - startTime) * 0.001;

      // Smoothly interpolate color toward target
      const cur = colorRef.current;
      const tgt = targetColorRef.current;
      const lerpSpeed = 0.03;
      cur.r += (tgt.r - cur.r) * lerpSpeed;
      cur.g += (tgt.g - cur.g) * lerpSpeed;
      cur.b += (tgt.b - cur.b) * lerpSpeed;
      const cr = Math.round(cur.r);
      const cg = Math.round(cur.g);
      const cb = Math.round(cur.b);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary bounce
        if (node.x < margin || node.x > w - margin) node.vx *= -1;
        if (node.y < margin || node.y > h - margin) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(margin, Math.min(w - margin, node.x));
        node.y = Math.max(margin, Math.min(h - margin, node.y));

        // Subtle drift variation
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Speed limit
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.4) {
          node.vx *= 0.4 / speed;
          node.vy *= 0.4 / speed;
        }
      });

      // Draw connections (strands)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const strength = 1 - dist / connectionDist;
            const lineOpacity = strength * 0.35;

            // Solid white-tinted strand line
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${Math.min(cr + 120, 255)}, ${Math.min(cg + 120, 255)}, ${Math.min(cb + 120, 255)}, ${lineOpacity})`;
            ctx.lineWidth = strength * 1.2;
            ctx.stroke();

            // Pulse traveling along strong connections
            if (strength > 0.5) {
              const pulsePos = (elapsed * 0.3 + i * 0.1) % 1;
              const px = nodes[i].x + dx * pulsePos;
              const py = nodes[i].y + dy * pulsePos;
              const pulseAlpha = Math.sin(pulsePos * Math.PI) * strength * 0.7;

              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${pulseAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const breathe = Math.sin(elapsed * 1.2 + node.phase) * 0.5 + 0.5;
        const opacity = node.baseOpacity * (0.6 + breathe * 0.4);

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 8, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 8);
        glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${opacity * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

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
  const monogram = getMonogram(currentProject.title);
  const glowColor = currentProject.logoStyle.boxShadow?.replace('0px 0px 60px 0px ', '') || 'rgba(100,140,255,0.5)';

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="projects">
      {/* Section label */}
      <div className="projects-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Projects</span>
        <div className="projects-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      <div className="project-card grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12">
        {/* Left: Project info */}
        <div className="project-entrance flex flex-col justify-between min-h-[480px]">
          <div className="mb-8">
            <p className="project-text text-white/50 text-[11px] tracking-[0.4em] uppercase font-light mb-6">
              {String(selectedProjectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
            </p>

            {/* Monogram logo */}
            <div
              className="project-text w-14 h-14 rounded-lg flex items-center justify-center mb-6"
              style={currentProject.logoStyle}>
              <span className="text-white/80 text-lg font-light tracking-wider">{monogram}</span>
            </div>

            <h3 className="project-text text-white/95 text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-3 sm:mb-4">
              {currentProject.title}
            </h3>
            <p className="project-text text-white/70 text-sm sm:text-base font-light leading-relaxed mb-3">
              {currentProject.desc}
            </p>
            <p className="project-text text-white/60 text-sm font-light leading-relaxed">{currentProject.subdesc}</p>
          </div>

          <div>
            <div className="project-text flex items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-6">
              {currentProject.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 border border-white/[0.14] rounded">
                  <span className="text-white/65 text-[9px] sm:text-[11px] tracking-wider uppercase">{tag.name}</span>
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

        {/* Right: Orbital animation panel */}
        <div className="project-entrance relative hidden lg:block">
          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-l border-t border-white/[0.14] z-10" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-r border-t border-white/[0.14] z-10" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l border-b border-white/[0.14] z-10" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r border-b border-white/[0.14] z-10" />

          <div className="w-full h-full min-h-[420px] bg-black-200 border border-white/[0.10] rounded-lg overflow-hidden relative flex flex-col items-center justify-center">
            {/* Grid background */}
            <div className="absolute inset-0 bridge-grid opacity-[0.015]" />

            {/* Spotlight glow - center radial */}
            <div
              className="absolute inset-0 opacity-30 transition-all duration-1000"
              style={{
                background: `radial-gradient(circle at center, ${glowColor}, transparent 100%)`,
              }}
            />

            {/* Strand network animation */}
            <StrandCanvas color={glowColor} projectIndex={selectedProjectIndex} />

            {/* Visit button - positioned at bottom center */}
            {currentProject.href && currentProject.href !== '#' && (
              <a
                href={currentProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-16 z-20 inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.10] rounded hover:border-white/25 transition-all duration-300 group bg-black-200/60 backdrop-blur-sm">
                <span className="text-white/55 text-[11px] tracking-[0.2em] uppercase font-light group-hover:text-white/90 transition-colors">
                  Visit Project
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/35 group-hover:text-white/70 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            )}

            {/* Corner labels */}
            <p className="absolute top-4 left-5 text-white/25 text-[9px] tracking-[0.4em] uppercase font-light z-10">
              {String(selectedProjectIndex + 1).padStart(2, '0')}.PROJECT
            </p>
            <p className="absolute bottom-4 right-5 text-white/25 text-[9px] tracking-[0.3em] uppercase font-light z-10">
              {currentProject.title.toUpperCase().slice(0, 20)}
            </p>
          </div>
        </div>

        {/* Mobile: Visit button */}
        <div className="project-text lg:hidden">
          {currentProject.href && currentProject.href !== '#' && (
            <a
              href={currentProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.12] rounded hover:border-white/25 transition-all duration-300 group">
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-light group-hover:text-white/90 transition-colors">
                Visit Project
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/40 group-hover:text-white/70 transition-colors">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
