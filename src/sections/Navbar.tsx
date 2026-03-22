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

// Scroll progress 0–1
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
};

const NavItems = ({ activeSection, onClick = () => {} }: { activeSection: string; onClick?: () => void }) => {
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
    onClick();
  };

  return (
    <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-8 relative z-20">
      {navLinks.map((item) => {
        const sectionId = item.href.replace('#', '');
        const isActive = item.href.startsWith('#')
          ? activeSection === sectionId
          : location.pathname === item.href;

        if (item.href.startsWith('/')) {
          return (
            <li key={item.id} className="relative">
              <Link
                to={item.href}
                className={`text-[11px] tracking-[0.2em] uppercase font-normal transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
                }`}
                onClick={onClick}>
                {item.name}
              </Link>
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70" />
              )}
            </li>
          );
        }

        return (
          <li key={item.id} className="relative">
            <a
              href="#"
              className={`text-[11px] tracking-[0.2em] uppercase font-normal transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
              }`}
              onClick={(e) => handleClick(e, item.href)}>
              {item.name}
            </a>
            {isActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const MobileMenu = ({ isOpen, onClose, activeSection }: { isOpen: boolean; onClose: () => void; activeSection: string }) => {
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

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item, index) => {
              const sectionId = item.href.replace('#', '');
              const isActive = item.href.startsWith('#')
                ? activeSection === sectionId
                : false;

              return (
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
                    <span className="text-white/35 text-[10px] tracking-[0.2em] font-mono w-6 group-hover:text-white/60 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="w-4 h-[1px] bg-white/25 group-hover:w-8 group-hover:bg-white/50 transition-all duration-300" />
                    <span className={`text-[22px] tracking-[0.08em] uppercase font-light group-hover:tracking-[0.14em] transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 ml-1" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="pb-10">
          <div
            className={`h-[1px] bg-gradient-to-r from-white/30 via-white/15 to-transparent mb-6 transition-all duration-600 delay-500 ${
              isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'left' }}
          />

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
  const activeSection = useActiveSection();
  const scrollProgress = useScrollProgress();

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
        {/* Scroll progress bar */}
        <div className="h-[1px] w-full relative bg-transparent">
          <div
            className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`flex justify-between items-center py-5 mx-auto c-space transition-opacity duration-200 ${
              headerHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>

            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group">
              <span className="text-white/85 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light group-hover:text-white transition-colors">
                Myo Thiha Kyaw
              </span>
            </Link>

            {/* Mobile toggle */}
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

            {/* Desktop nav */}
            <nav className="sm:flex hidden items-center gap-8">
              <NavItems activeSection={activeSection} />
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/[0.18]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/80 shadow-[0_0_4px_1px_rgba(74,222,128,0.4)]" />
                <span className="text-white/80 text-[11px] tracking-[0.2em] uppercase font-normal">Available</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom separator on scroll */}
        <div
          className={`h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </header>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} activeSection={activeSection} />
    </>
  );
};

export default Navbar;
