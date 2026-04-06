import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getLocal } from '../lib/storage';

const filters = ['All', 'Watercolor', 'Acrylic', 'Portraits', 'Nature', 'Abstract'];

// Top color bars cycle — one per card position
const COLOR_BARS = [
  'linear-gradient(90deg, #ff9a9e, #fecfef)',
  'linear-gradient(90deg, #f6d365, #fda085)',
  'linear-gradient(90deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(90deg, #d4fc79, #96e6a1)',
  'linear-gradient(90deg, #f093fb, #f5576c)',
  'linear-gradient(90deg, #4facfe, #00f2fe)',
  'linear-gradient(90deg, #43e97b, #38f9d7)',
  'linear-gradient(90deg, #fa709a, #fee140)',
];

const staticPaintings = [
  { id: 's1', title: 'Morning Bloom',   medium: 'Watercolor', size: '12×16 inch', price: '₹8,500',  gradient: 'linear-gradient(145deg, #f5c5b0, #e88ea0, #c47090)', height: 280, category: 'Watercolor', available: true },
  { id: 's2', title: 'Golden Hour',     medium: 'Acrylic',    size: '16×20 inch', price: '₹14,000', gradient: 'linear-gradient(145deg, #f5d08a, #e8a832, #c47820)', height: 340, category: 'Acrylic',    available: true },
  { id: 's3', title: 'Forest Whisper',  medium: 'Watercolor', size: '10×14 inch', price: '₹6,500',  gradient: 'linear-gradient(145deg, #8ec9c0, #5a9e8a, #3d7a6a)', height: 260, category: 'Nature',     available: true },
  { id: 's4', title: 'Twilight Reverie',medium: 'Acrylic',    size: '18×24 inch', price: '₹18,500', gradient: 'linear-gradient(145deg, #c0a8d8, #a07cbf, #c080a0)', height: 380, category: 'Abstract',   available: true },
  { id: 's5', title: 'Ember & Ash',     medium: 'Acrylic',    size: '14×18 inch', price: '₹12,000', gradient: 'linear-gradient(145deg, #e87850, #c04828, #a03820)', height: 300, category: 'Abstract',   available: true },
  { id: 's6', title: 'Serenity',        medium: 'Watercolor', size: '12×16 inch', price: '₹7,500',  gradient: 'linear-gradient(145deg, #aad0e8, #88b8d8, #f5f0e0)', height: 250, category: 'Nature',     available: true },
  { id: 's7', title: 'Soulful Gaze',    medium: 'Acrylic',    size: '16×20 inch', price: '₹16,000', gradient: 'linear-gradient(145deg, #8060a0, #a07898, #c0a0b8)', height: 360, category: 'Portraits',  available: true },
  { id: 's8', title: 'Earth Song',      medium: 'Watercolor', size: '10×12 inch', price: '₹5,500',  gradient: 'linear-gradient(145deg, #7a9060, #a0b870, #c0c890)', height: 240, category: 'Nature',     available: true },
];

function PaintingCard({ painting, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const colorBar = COLOR_BARS[index % COLOR_BARS.length];

  return (
    <motion.div
      ref={ref}
      className="masonry-item"
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: 'easeOut' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#fff9f4',
          boxShadow: hovered
            ? '0 16px 48px rgba(193,127,71,0.22)'
            : '0 8px 32px rgba(193,127,71,0.12)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          opacity: painting.available === false ? 0.72 : 1,
        }}
      >
        {/* Top color bar */}
        <div style={{ height: 4, background: colorBar }} />

        {/* Image area */}
        <div style={{ position: 'relative', height: painting.height || 280, overflow: 'hidden' }}>
          {painting.image ? (
            <img
              src={painting.image}
              alt={painting.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%', height: '100%',
                background: painting.gradient || 'linear-gradient(145deg, #f5c9a0, #e8956a)',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 55%)' }} />

          {/* SOLD badge */}
          {painting.available === false && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              backgroundColor: '#2c1810', color: '#fdf8f3',
              fontSize: '0.7rem', fontWeight: 700, borderRadius: 20,
              padding: '3px 10px', fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em',
            }}>SOLD</div>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(44,24,16,0.72)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: 20,
            }}
          >
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: '#fdf8f3', margin: 0, textAlign: 'center' }}>{painting.title}</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#e8a87c', margin: 0 }}>{painting.medium} · {painting.size}</p>
            <button style={{ marginTop: 12, fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: '50px', padding: '9px 22px', cursor: 'pointer', letterSpacing: '0.05em' }}>
              Enquire
            </button>
          </motion.div>
        </div>

        {/* Card info */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', margin: 0 }}>{painting.title}</p>
              <span style={{
                display: 'inline-block', marginTop: 4,
                fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 500,
                backgroundColor: 'rgba(193,127,71,0.1)',
                color: '#8b5e3c',
                border: '1px solid rgba(193,127,71,0.2)',
                borderRadius: 20, padding: '2px 10px', letterSpacing: '0.05em',
              }}>
                {painting.medium}
              </span>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#c17f47', margin: 0, whiteSpace: 'nowrap' }}>{painting.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [paintings, setPaintings] = useState(() => {
    const stored = getLocal('galleryPaintings', []);
    return stored.length > 0 ? stored : staticPaintings;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const sync = () => {
      const stored = getLocal('galleryPaintings', []);
      setPaintings(stored.length > 0 ? stored : staticPaintings);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const filtered = activeFilter === 'All' ? paintings : paintings.filter(p => p.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #fdf8f3, #fff5ec)',
        padding: '80px 7%',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ Portfolio
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>
            Original{' '}
            <span className="gradient-text">Paintings</span>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', color: '#8a7060' }}>
            Each piece tells a unique story
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  background: isActive ? 'linear-gradient(135deg, #c17f47, #e8a87c)' : '#fff9f4',
                  color: isActive ? '#fff' : '#8b5e3c',
                  border: isActive ? 'none' : '1.5px solid #e8c4a0',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.04em',
                  boxShadow: isActive ? '0 4px 16px rgba(193,127,71,0.3)' : 'none',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = '#fff5ec'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = '#fff9f4'; }}
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((painting, i) => (
            <PaintingCard key={painting.id || painting.title} painting={painting} index={i} />
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <button
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              backgroundColor: 'transparent',
              color: '#c17f47',
              border: '2px solid #c17f47',
              borderRadius: '50px',
              padding: '14px 36px',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c17f47'; }}
          >
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  );
}
