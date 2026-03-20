import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;

// Using createRoot (CSR) instead of hydrateRoot (SSR) temporarily
// so GSAP ScrollTrigger animations work without hydration mismatch.
// TODO: Re-enable SSR with hydrateRoot once design is finalized.
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// Dismiss loader after minimum display time (lets the full animation sequence play)
const MIN_DISPLAY = 5500;
setTimeout(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Start loader fade-out
  loader.classList.add('fade-out');

  // Reveal main content 0.5s after fade starts — syncs with the transition midpoint
  setTimeout(() => {
    root.classList.add('hydrated');
    window.dispatchEvent(new CustomEvent('portfolio:ready'));
  }, 500);

  loader.addEventListener('transitionend', () => {
    loader.remove();
    document.body.style.overflow = 'auto';
    if (typeof (window as any).__stopLoaderCanvas === 'function') {
      (window as any).__stopLoaderCanvas();
    }
  }, { once: true });

  // Fallback in case transitionend doesn't fire
  setTimeout(() => {
    document.getElementById('loader')?.remove();
    document.body.style.overflow = 'auto';
    root.classList.add('hydrated');
  }, 2000);
}, MIN_DISPLAY);
