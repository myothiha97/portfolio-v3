import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { navLinks } from '../constants/index';

const NavItems = ({ onClick = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (isHome) {
        e.preventDefault();
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    onClick();
  };

  return (
    <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-8 relative z-20">
      {navLinks.map((item) => {
        if (item.href.startsWith('/')) {
          const isActive = location.pathname === item.href;
          return (
            <li key={item.id}>
              <Link
                to={item.href}
                className={`text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white/90'
                }`}
                onClick={onClick}>
                {item.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <a
              href={item.href}
              className="text-[11px] tracking-[0.2em] uppercase font-light text-white/70 hover:text-white/90 transition-colors duration-300"
              onClick={(e) => handleClick(e, item.href)}>
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#010103]/95 backdrop-blur-md' : 'bg-transparent'
      }`}>
      {/* Top thin accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* Logo area */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group">
            {/* Small status dot */}
            <div className="relative">
              {/* <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white/70 transition-colors" /> */}
            </div>
            <span className="text-white/85 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light group-hover:text-white transition-colors">
              Myo Thiha Kyaw
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            className="text-white/30 hover:text-white/60 focus:outline-none sm:hidden flex transition-colors"
            aria-label="Toggle menu">
            <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="toggle" className="w-5 h-5 opacity-60" />
          </button>

          {/* Desktop nav */}
          <nav className="sm:flex hidden items-center gap-8">
            <NavItems />
            {/* Status indicator */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/[0.18]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/80 shadow-[0_0_4px_1px_rgba(74,222,128,0.4)]" />
              <span className="text-white/75 text-[11px] tracking-[0.2em] uppercase font-light">Available</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom line (appears on scroll) */}
      <div
        className={`h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile sidebar */}
      <div
        className={`absolute left-0 right-0 bg-[#010103]/98 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden z-20 sm:hidden block border-b border-white/[0.06] ${
          isOpen ? 'max-h-screen' : 'max-h-0 border-b-0'
        }`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
