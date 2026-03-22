import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { navLinks } from '../constants/index';

const scrollToSection = (href: string) => {
  const el = document.querySelector(href) as HTMLElement;
  if (!el) return;
  const navbarHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({ top, behavior: 'smooth' });
};

// Live clock — UTC+7 (Indochina Time)
const useLiveClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      setTime(utc7.toISOString().slice(11, 19));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// Tracks which section is currently in view
const useActiveSection = () => {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.href.startsWith('#'))
      .map((l) => document.querySelector(l.href) as HTMLElement)
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -75% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
};

// Desktop-only terminal-style nav
const DesktopNavItems = ({ activeSection }: { activeSection: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(href);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(href), 100);
    }
  };

  return (
    <ul className="flex items-center">
      {navLinks.map((item, index) => {
        const sectionId = item.href.replace('#', '');
        const isActive = item.href.startsWith('#')
          ? activeSection === sectionId
          : location.pathname === item.href;

        return (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
              <span className="text-white/[0.18] mx-2.5 font-mono text-[10px] select-none">·</span>
            )}
            {item.href.startsWith('/') ? (
              <Link
                to={item.href}
                className={`font-mono text-[10px] tracking-wide flex items-center gap-1 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}>
                <span className={`transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/[0.18]'}`}>
                  {String(index + 1).padStart(2, '0')}/
                </span>
                {item.name.toLowerCase()}
              </Link>
            ) : (
              <a
                href="#"
                onClick={(e) => handleClick(e, item.href)}
                className={`font-mono text-[10px] tracking-wide flex items-center gap-1 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}>
                {isActive && (
                  <span className="text-white/50 text-[9px]">▶</span>
                )}
                <span className={`transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/[0.18]'}`}>
                  {String(index + 1).padStart(2, '0')}/
                </span>
                {item.name.toLowerCase()}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    if (isHome) {
      scrollToSection(href);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(href), 100);
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] sm:hidden transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#010103]/[0.97] backdrop-blur-xl transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle grid background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner decorative accents */}
      <div
        className={`absolute top-6 left-6 w-8 h-8 border-l border-t border-white/[0.08] transition-all duration-500 delay-200 ${
          isOpen ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'
        }`}
      />
      <div
        className={`absolute top-6 right-6 w-8 h-8 border-r border-t border-white/[0.08] transition-all duration-500 delay-200 ${
          isOpen ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 -translate-y-2'
        }`}
      />
      <div
        className={`absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/[0.08] transition-all duration-500 delay-300 ${
          isOpen ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'
        }`}
      />
      <div
        className={`absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/[0.08] transition-all duration-500 delay-300 ${
          isOpen ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 translate-y-2'
        }`}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full px-8">
        {/* Header with close button */}
        <div className="flex justify-between items-center py-5">
          <span
            className={`text-white/85 text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-400 delay-100 ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
            Myo Thiha Kyaw
          </span>
          <button
            onClick={onClose}
            className={`relative w-8 h-8 flex items-center justify-center group transition-opacity duration-150 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Close menu">
            {/* Animated X lines */}
            <span
              className={`absolute w-5 h-[1px] bg-white/60 group-hover:bg-white/90 transition-all duration-400 ${
                isOpen ? 'rotate-45 delay-300' : 'rotate-45'
              }`}
            />
            <span
              className={`absolute w-5 h-[1px] bg-white/60 group-hover:bg-white/90 transition-all duration-400 ${
                isOpen ? '-rotate-45 delay-300' : '-rotate-45'
              }`}
            />
          </button>
        </div>

        {/* Divider line */}
        <div
          className={`h-[1px] bg-gradient-to-r from-white/40 via-white/20 to-transparent transition-all duration-600 ${
            isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transformOrigin: 'left' }}
        />

        {/* Navigation section label */}
        <div
          className={`mt-12 mb-8 transition-all duration-500 delay-200 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <span className="text-white/50 text-[9px] tracking-[0.35em] uppercase font-light">
            // Navigation
          </span>
        </div>

        {/* Nav links — staggered animation */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item, index) => (
              <li key={item.id}>
                <a
                  href="#"
                  onClick={(e) => handleClick(e, item.href)}
                  className={`group flex items-center gap-5 py-3.5 transition-all duration-500 ${
                    isOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-[-20px]'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${250 + index * 70}ms` : `${(navLinks.length - index) * 30}ms`,
                  }}>
                  {/* Index number */}
                  <span className="text-white/35 text-[10px] tracking-[0.2em] font-mono w-6 group-hover:text-white/60 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Accent dash */}
                  <span className="w-4 h-[1px] bg-white/25 group-hover:w-8 group-hover:bg-white/50 transition-all duration-300" />

                  {/* Link text */}
                  <span className="text-white/90 text-[22px] tracking-[0.08em] uppercase font-light group-hover:text-white group-hover:tracking-[0.14em] transition-all duration-300">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="pb-10">
          {/* Divider */}
          <div
            className={`h-[1px] bg-gradient-to-r from-white/30 via-white/15 to-transparent mb-6 transition-all duration-600 delay-500 ${
              isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'left' }}
          />

          {/* Status + info */}
          <div
            className={`flex items-center justify-between transition-all duration-500 delay-[600ms] ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/80 shadow-[0_0_6px_2px_rgba(74,222,128,0.3)]" />
              <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase font-light">
                Available for work
              </span>
            </div>
            <span className="text-white/60 text-[9px] tracking-[0.2em] font-mono">
              2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clock = useLiveClock();
  const activeSection = useActiveSection();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setMenuClosing(true);
    setTimeout(() => setMenuClosing(false), 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeMenu]);

  const headerHidden = isOpen || menuClosing;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#010103]/95 backdrop-blur-md' : 'bg-transparent'
        }`}>
        {/* Top accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

        <div className="max-w-7xl mx-auto">
          <div
            className={`flex justify-between items-center py-4 mx-auto c-space transition-opacity duration-200 ${
              headerHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>

            {/* ── Left: terminal prompt logo ── */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-0 group shrink-0">
              <span className="font-mono text-[11px] text-white/35 group-hover:text-white/50 transition-colors duration-300">[</span>
              <span className="font-mono text-[11px] text-white/75 group-hover:text-white/90 transition-colors duration-300">myo@sys</span>
              <span className="font-mono text-[11px] text-white/35 group-hover:text-white/50 transition-colors duration-300">:~</span>
              <span className="font-mono text-[11px] text-white/35 group-hover:text-white/50 transition-colors duration-300">]$</span>
              <span className="font-mono text-[12px] text-white/50 ml-1 animate-pulse">▋</span>
              {/* Current section path — fades in on scroll */}
              <span
                className={`font-mono text-[10px] text-white/30 ml-2.5 transition-all duration-500 ${
                  scrolled && activeSection !== 'home'
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-1'
                }`}>
                ~/{activeSection}
              </span>
            </Link>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] sm:hidden group"
              aria-label="Toggle menu">
              <span
                className={`w-5 h-[1px] bg-white/50 group-hover:bg-white/80 transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-[3px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1px] bg-white/50 group-hover:bg-white/80 transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-[3px]' : ''
                }`}
              />
            </button>

            {/* ── Desktop nav center ── */}
            <nav className="sm:flex hidden items-center">
              <DesktopNavItems activeSection={activeSection} />
            </nav>

            {/* ── Right: system status + clock ── */}
            <div className="sm:flex hidden items-center gap-3 shrink-0">
              <span className="font-mono text-[10px] text-white/[0.18] select-none">—</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/80 shadow-[0_0_4px_1px_rgba(74,222,128,0.4)]" />
                <span className="font-mono text-[10px] text-white/50 tracking-wider">SYS_READY</span>
              </div>
              <span className="font-mono text-[10px] text-white/[0.18] select-none">—</span>
              <span className="font-mono text-[10px] text-white/35 tabular-nums tracking-wider">{clock}</span>
            </div>
          </div>
        </div>

        {/* Bottom separator (on scroll) */}
        <div
          className={`h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </header>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
