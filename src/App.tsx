import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomePage from './pages/HomePage';

if (typeof window !== 'undefined') {
  // only register gsap module at client side
  gsap.registerPlugin(ScrollTrigger);
}

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default App;
