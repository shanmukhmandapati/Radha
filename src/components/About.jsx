import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../lib/useProfile';

const STAT_STYLES = [
  { borderColor: '#c17f47', bg: 'linear-gradient(135deg, #fff9f4, #fff0e6)' },
  { borderColor: '#e8a87c', bg: 'linear-gradient(135deg, #fff5f0, #fde8d8)' },
  { borderColor: '#8b5e3c', bg: 'linear-gradient(135deg, #f8f5f0, #f0e8dc)' },
];

function ArtistPhoto({ photoUrl }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Watercolor splash blob behind the circle */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 40%, rgba(255,154,158,0.3) 0%, rgba(246,211,101,0.2) 40%, rgba(168,230,207,0.2) 70%, transparent 100%)',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: -24,
        borderRadius: '50%',
        border: '1px solid rgba(193,127,71,0.18)',
        zIndex: 1,
      }} />
      {/* Dashed middle ring */}
      <div style={{
        position: 'absolute', inset: -12,
        borderRadius: '50%',
        border: '1px dashed rgba(193,127,71,0.3)',
        zIndex: 1,
      }} />

      {/* Photo circle with gradient border */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: 340, height: 340,
        borderRadius: '50%',
        padding: 3,
        background: 'linear-gradient(135deg, #c17f47, #e8a87c, #8b5e3c)',
        boxShadow: '0 20px 60px rgba(193,127,71,0.35)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#f5e6d3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {photoUrl ? (
            <img src={photoUrl} alt="Artist" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #f5c9a0 0%, #e8956a 35%, #c17f47 65%, #8b5e3c 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(255,220,180,0.6) 0%, transparent 55%)' }} />
              <div style={{ fontSize: '5rem', marginBottom: 8, zIndex: 1 }}>🎨</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(255,255,255,0.9)', zIndex: 1 }}>Artist Photo</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: 12, right: -24, zIndex: 3,
          backgroundColor: '#fff',
          border: '2px solid #c17f47',
          borderRadius: 12,
          padding: '10px 16px',
          boxShadow: '0 8px 24px rgba(193,127,71,0.2)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#c17f47', margin: 0, lineHeight: 1 }}>10+</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.69rem', color: '#8a7060', margin: 0, marginTop: 2, letterSpacing: '0.05em' }}>Years of Art</p>
      </motion.div>
    </div>
  );
}

export default function About() {
  const profile = useProfile();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const artistName = profile.artist_name || 'Radha Rani';
  const bio1 = profile.bio_1;
  const bio2 = profile.bio_2;
  const counts = [
    { number: profile.paintings_count || '200+', label: 'Paintings Created' },
    { number: profile.students_count || '1500+', label: 'Students Taught' },
    { number: profile.workshops_count || '80+', label: 'Workshops Conducted' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #fff9f2 0%, #fff0e6 30%, #fef5e7 60%, #fff9f2 100%)',
        padding: '100px 7%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top-right corner blob */}
      <div style={{ position: 'absolute', top: -50, right: 0, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,120,0.25), transparent)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      {/* Bottom-left corner blob */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,230,207,0.2), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(320px,380px) 1fr', gap: 80, alignItems: 'center' }}>

        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <ArtistPhoto photoUrl={profile.photo} />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Section label pill */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: '#c17f47',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, rgba(193,127,71,0.12), rgba(232,168,124,0.12))',
              border: '1px solid rgba(193,127,71,0.25)',
              borderRadius: 99,
              padding: '6px 16px',
            }}>
              ✦ About the Artist
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Hello, I'm{' '}
            <span style={{ color: '#c17f47', fontStyle: 'italic' }}>{artistName}</span>
          </h2>

          {bio1 && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '1.02rem', color: '#8a7060', lineHeight: 1.85, marginBottom: '1.25rem' }}>
              {bio1}
            </p>
          )}
          {bio2 && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '1.02rem', color: '#8a7060', lineHeight: 1.85, marginBottom: '1.75rem' }}>
              {bio2}
            </p>
          )}

          {/* Signature */}
          <div style={{ marginBottom: '2.25rem' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: '#b09080', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>
              — Artist Signature
            </p>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <span style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 48,
                fontWeight: 700,
                color: '#c17f47',
                lineHeight: 1,
                display: 'inline-block',
                letterSpacing: '1px',
                transform: 'rotate(-2deg)',
              }}>
                {artistName}
              </span>
              <svg viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', marginTop: -4, display: 'block' }}>
                <path d="M2,8 C40,2 80,11 120,6 C150,2 175,9 198,5" stroke="#c17f47" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
              <div style={{ position: 'absolute', right: -8, bottom: 14, width: 5, height: 5, borderRadius: '50%', background: '#c17f47', opacity: 0.5 }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '36px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {counts.map(({ number, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                style={{
                  background: STAT_STYLES[i].bg,
                  borderLeft: `4px solid ${STAT_STYLES[i].borderColor}`,
                  borderRadius: '0 12px 12px 0',
                  padding: '16px 22px',
                  textAlign: 'center',
                  flex: '1 1 90px',
                  boxShadow: '0 4px 20px rgba(193,127,71,0.08)',
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#c17f47' }}>{number}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', marginTop: 4, letterSpacing: '0.05em' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 860px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about > div > div > div:first-child { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
