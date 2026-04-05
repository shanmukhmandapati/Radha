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

export default function App() {
  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <BrushDivider fromColor="#fdf8f3" toColor="#f5e6d3" />
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
