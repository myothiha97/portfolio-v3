import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomePage from './pages/HomePage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const App = () => {
  // Refresh ScrollTrigger after loader dismissal so positions are correct.
  // ScrollTrigger initialises while #root is hidden (opacity:0) + body scroll
  // is locked, so its cached offsets can be stale once the page is revealed.
  useEffect(() => {
    const onReady = () => {
      setTimeout(() => ScrollTrigger.refresh(), 600);
    };
    window.addEventListener('portfolio:ready', onReady, { once: true });

    // Also refresh on resize (mobile address bar changes viewport height)
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('portfolio:ready', onReady);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
