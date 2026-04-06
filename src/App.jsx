import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Workshops from './components/Workshops';
import Events from './components/Events';
import Shop from './components/Shop';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BrushDivider from './components/BrushDivider';

// Subtle wavy paint-stroke divider between sections
function WaveDivider() {
  return (
    <div style={{ lineHeight: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
        <path
          d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z"
          fill="rgba(193,127,71,0.08)"
        />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <WaveDivider />
      <About />
      <WaveDivider />
      <Gallery />
      <WaveDivider />
      <BrushDivider fromColor="#fff5ec" toColor="#f5e6d3" />
      <Workshops />
      <BrushDivider flip fromColor="#fdf8f3" toColor="#f5e6d3" />
      <Events />
      <Shop />
      <Testimonials />
      <BrushDivider fromColor="#fdf8f3" toColor="#f5e6d3" />
      <Contact />
      <BrushDivider flip fromColor="#fdf8f3" toColor="#f5e6d3" />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
