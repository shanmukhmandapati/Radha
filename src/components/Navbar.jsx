import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../lib/useProfile';

const NAV_LINKS = ['Home', 'Gallery', 'Workshops', 'Events', 'Shop', 'About', 'Contact'];
const SECTION_IDS = ['home', 'gallery', 'workshops', 'events', 'shop', 'about', 'contact'];

const PaintbrushIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
      fill="#c17f47"
    />
    <path
      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
      fill="#c17f47"
      opacity="0.6"
    />
  </svg>
);

export default function Navbar() {
  const profile = useProfile();
  const artistName = profile.artist_name || 'Radha Rani';

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
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
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          padding: '0 6%',
          backgroundColor: 'rgba(253,248,243,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(193,127,71,0.2)' : '1px solid rgba(193,127,71,0.15)',
          boxShadow: scrolled ? '0 4px 30px rgba(193,127,71,0.08)' : 'none',
          transition: 'box-shadow 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo('home')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PaintbrushIcon />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#2c1810',
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}>
              {artistName}
            </span>
          </div>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            color: '#c17f47',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            paddingLeft: 30,
          }}>
            Painter · Teacher · Creator
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? '#c17f47' : '#6b4c35',
                  letterSpacing: '0.3px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c17f47'; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#c17f47' : '#6b4c35'; }}
              >
                {link}
                {/* Active dot indicator */}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: '#c17f47',
                    display: 'block',
                  }} />
                )}
              </button>
            );
          })}

          {/* Book a Workshop CTA */}
          <button
            onClick={() => scrollTo('workshops')}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.5px',
              backgroundColor: '#c17f47',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(193,127,71,0.3)',
              transition: 'all 0.25s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#a06535';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(193,127,71,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#c17f47';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(193,127,71,0.3)';
            }}
          >
            🖌️ Book a Workshop
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'none', flexDirection: 'column', gap: 5 }}
          className="hamburger-btn"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: '#c17f47', borderRadius: 2 }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', width: 22, height: 2, background: '#c17f47', borderRadius: 2 }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: '#c17f47', borderRadius: 2 }} />
        </button>

        <style>{`
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .hamburger-btn { display: flex !important; }
          }
        `}</style>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 80, left: 0, right: 0,
              zIndex: 49,
              backgroundColor: 'rgba(253,248,243,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(193,127,71,0.15)',
              boxShadow: '0 8px 30px rgba(193,127,71,0.12)',
              padding: '16px 6% 20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link)}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: activeSection === link.toLowerCase() ? '#c17f47' : '#2c1810',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(193,127,71,0.1)',
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
                  backgroundColor: '#c17f47',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  cursor: 'pointer',
                  marginTop: 8,
                  textAlign: 'center',
                }}
              >
                🖌️ Book a Workshop
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
