import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;

hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// Reveal content once CSS is loaded and hydration is complete
root.classList.add('hydrated');
