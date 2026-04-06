import { motion } from 'framer-motion';
import HeroSlideshow from './HeroSlideshow';

const BgBlobs = () => (
  <>
    <style>{`
      @keyframes blobDrift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20px, -25px) scale(1.05); }
        66% { transform: translate(-10px, 15px) scale(0.97); }
      }
      @keyframes blobDrift2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-18px, 20px) scale(1.04); }
        66% { transform: translate(12px, -18px) scale(0.98); }
      }
      @keyframes blobDrift3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(15px, -12px) scale(1.06); }
      }
    `}</style>
    {/* Blob 1 — pink top-right */}
    <div style={{
      position: 'absolute', top: -100, right: -50,
      width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,154,158,0.25) 0%, transparent 70%)',
      filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
      animation: 'blobDrift1 20s ease-in-out infinite',
    }} />
    {/* Blob 2 — green bottom-left */}
    <div style={{
      position: 'absolute', bottom: -50, left: -80,
      width: 400, height: 400, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(168,230,207,0.2) 0%, transparent 70%)',
      filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
      animation: 'blobDrift2 20s ease-in-out infinite',
    }} />
    {/* Blob 3 — yellow center-right */}
    <div style={{
      position: 'absolute', top: '30%', right: '20%',
      width: 300, height: 300, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(246,211,101,0.18) 0%, transparent 70%)',
      filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none',
      animation: 'blobDrift3 20s ease-in-out infinite',
    }} />
  </>
);

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      style={{
        backgroundColor: '#fdf8f3',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 80,
      }}
    >
      <BgBlobs />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 6%',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

          {/* Left: Text */}
          <div style={{ flex: '1 1 420px' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#c17f47',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              ✦ Indian Painting Artist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 700,
                color: '#2c1810',
                lineHeight: 1.08,
                marginBottom: '1.5rem',
              }}
            >
              Art That Speaks
              <br />
              <span style={{ color: '#c17f47', fontStyle: 'italic' }}>To The Soul.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65 }}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '1.05rem',
                color: '#8a7060',
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: '2.5rem',
              }}
            >
              Explore original paintings, join transformative workshops, and bring color into your world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => scrollTo('gallery')}
                style={btnFilled}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8b5e3c'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Explore Gallery
              </button>
              <button
                onClick={() => scrollTo('workshops')}
                style={btnOutline}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c17f47'; }}
              >
                Join a Workshop
              </button>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
            >
              {[['200+', 'Paintings'], ['1500+', 'Students'], ['80+', 'Workshops']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#c17f47' }}>{n}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}
          >
            <HeroSlideshow />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const btnFilled = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 600,
  fontSize: '0.95rem',
  backgroundColor: '#c17f47',
  color: '#fff',
  border: 'none',
  borderRadius: '50px',
  padding: '14px 32px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  boxShadow: '0 8px 25px rgba(193,127,71,0.35)',
  transition: 'all 0.3s',
};

const btnOutline = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 600,
  fontSize: '0.95rem',
  backgroundColor: 'transparent',
  color: '#c17f47',
  border: '2px solid #c17f47',
  borderRadius: '50px',
  padding: '14px 32px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  transition: 'all 0.3s',
};
