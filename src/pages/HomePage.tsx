import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import WorkExperience from '../sections/Experience';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

const HomePage = () => (
  <main className="max-w-7xl mx-auto relative">
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <WorkExperience />
    <Contact />
    <Footer />
  </main>
);

export default HomePage;
