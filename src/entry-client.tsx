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

root.classList.add('hydrated');
