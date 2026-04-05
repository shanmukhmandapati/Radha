import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../lib/SiteSettingsContext';

const navLinks = ['Home', 'Gallery', 'Workshops', 'Events', 'Shop', 'About', 'Contact'];

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(253,248,243,0.97)' : 'rgba(253,248,243,0.92)',
          boxShadow: scrolled ? '0 4px 30px rgba(193,127,71,0.12)' : 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col leading-tight cursor-pointer" onClick={() => scrollTo('home')}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#c17f47',
                lineHeight: 1.1,
              }}
            >
              {settings.artist_name}
            </span>
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.68rem',
                color: '#8a7060',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Painter · Teacher · Creator
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: '#8a7060',
                  letterSpacing: '0.06em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#c17f47')}
                onMouseLeave={(e) => (e.target.style.color = '#8a7060')}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('workshops')}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: '#8b5e3c',
                color: '#fdf8f3',
                border: 'none',
                borderRadius: '50px',
                padding: '10px 22px',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c17f47';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#8b5e3c';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Book a Workshop
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              style={{ display: 'block', width: 24, height: 2, background: '#c17f47', borderRadius: 2 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: 'block', width: 24, height: 2, background: '#c17f47', borderRadius: 2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              style={{ display: 'block', width: 24, height: 2, background: '#c17f47', borderRadius: 2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-[68px] left-0 right-0 z-40 lg:hidden overflow-hidden"
            style={{ backgroundColor: '#fdf8f3', boxShadow: '0 8px 30px rgba(193,127,71,0.15)' }}
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link)}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#2c1810',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '8px 0',
                    borderBottom: '1px solid #f5e6d3',
                  }}
                >
                  {link}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo('workshops')}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  backgroundColor: '#8b5e3c',
                  color: '#fdf8f3',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  marginTop: '4px',
                }}
              >
                Book a Workshop
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
