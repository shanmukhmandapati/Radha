import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getLocal, DEFAULT_WORKSHOPS } from '../lib/storage';

function WorkshopCard({ w, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const accent = w.accent || 'linear-gradient(135deg, #f5c9a0, #e8956a)';
  const badgeColor = w.badgeColor || '#c17f47';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: '1 1 280px', backgroundColor: '#fff9f4', borderRadius: 20, overflow: 'hidden', boxShadow: hovered ? '0 24px 60px rgba(193,127,71,0.2), 0 8px 20px rgba(44,24,16,0.1)' : '0 6px 25px rgba(44,24,16,0.08)', transform: hovered ? 'translateY(-8px)' : 'translateY(0)', transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)', position: 'relative' }}
    >
      <div style={{ height: 6, background: accent }} />
      {w.badge && (
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: badgeColor, color: '#fff', borderRadius: 20, padding: '4px 12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{w.badge}</span>
        </div>
      )}
      <div style={{ padding: '28px 28px 32px' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1.25rem', boxShadow: '0 4px 15px rgba(193,127,71,0.2)' }}>
          {w.icon || '🎨'}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2c1810', marginBottom: '1rem', lineHeight: 1.3 }}>{w.title}</h3>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', backgroundColor: '#f5e6d3', borderRadius: 20, padding: '4px 12px' }}>⏱ {w.duration}</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', backgroundColor: '#f5e6d3', borderRadius: 20, padding: '4px 12px' }}>📍 {w.mode}</span>
        </div>
        <ul style={{ marginBottom: '1.75rem', paddingLeft: 0, listStyle: 'none' }}>
          {(Array.isArray(w.topics) ? w.topics : []).map((topic, i) => (
            <li key={i} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: '#8a7060', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ color: '#c17f47', marginTop: 2, flexShrink: 0 }}>✦</span>
              {topic}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, color: '#c17f47' }}>{w.price}</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>{w.perPerson !== false ? 'per person' : 'per session'}</span>
        </div>
        <button
          style={{ width: '100%', fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.9rem', background: accent, color: '#fff', border: 'none', borderRadius: '50px', padding: '13px 24px', cursor: 'pointer', letterSpacing: '0.06em', boxShadow: '0 6px 20px rgba(193,127,71,0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(193,127,71,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(193,127,71,0.3)'; }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}

export default function Workshops() {
  const [workshops, setWorkshops] = useState(() => {
    const stored = getLocal('workshops', []);
    return stored.length > 0 ? stored : DEFAULT_WORKSHOPS;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const sync = () => {
      const stored = getLocal('workshops', []);
      setWorkshops(stored.length > 0 ? stored : DEFAULT_WORKSHOPS);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <section id="workshops" ref={ref} style={{ backgroundColor: '#f5e6d3', padding: '80px 7%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, left: -80, width: 350, height: 350, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(ellipse, rgba(193,127,71,0.12), transparent)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'radial-gradient(ellipse, rgba(139,94,60,0.1), transparent)', filter: 'blur(40px)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Learn With Me</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>
            Learn to <span className="gradient-text">Paint</span>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', color: '#8a7060' }}>Workshops for all skill levels</p>
        </motion.div>

        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
          {workshops.map((w, i) => (
            <WorkshopCard key={w.id || w.title} w={w} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060' }}>
            All workshops include study materials, certificates of completion, and lifetime community access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
