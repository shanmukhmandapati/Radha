import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSiteSettings } from '../lib/SiteSettingsContext';

const SectionLabel = ({ children }) => (
  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
    ✦ {children}
  </p>
);

const ArtistPhoto = ({ photoUrl }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    {/* Brushstroke border */}
    <div
      style={{
        position: 'absolute',
        inset: -12,
        borderRadius: '50%',
        border: '3px solid #c17f47',
        borderStyle: 'dashed',
        opacity: 0.4,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: -24,
        borderRadius: '50%',
        border: '2px solid #e8a87c',
        opacity: 0.25,
      }}
    />
    {/* Photo circle */}
    <div
      style={{
        width: 340,
        height: 340,
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #f5c9a0 0%, #e8956a 35%, #c17f47 65%, #8b5e3c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 60px rgba(193,127,71,0.3)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {photoUrl ? (
        <img src={photoUrl} alt="Artist" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(255,220,180,0.6) 0%, transparent 55%)' }} />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: '5rem', marginBottom: 8 }}>🎨</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>Artist Photo</p>
          </div>
        </>
      )}
    </div>

    {/* Floating badge */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity }}
      style={{
        position: 'absolute',
        bottom: 10,
        right: -20,
        backgroundColor: '#fff9f4',
        borderRadius: 12,
        padding: '8px 16px',
        boxShadow: '0 8px 25px rgba(44,24,16,0.12)',
        border: '1px solid #f5e6d3',
      }}
    >
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#c17f47', margin: 0 }}>10+</p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#8a7060', margin: 0 }}>Years of Art</p>
    </motion.div>
  </div>
);

export default function About() {
  const { settings } = useSiteSettings();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{ backgroundColor: '#fdf8f3', padding: '100px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          background: 'radial-gradient(ellipse, #f5e6d3, transparent)',
          filter: 'blur(60px)',
          opacity: 0.7,
          transform: 'translateY(-50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}
          >
            <ArtistPhoto photoUrl={settings.artist_photo_url} />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            style={{ flex: '1 1 380px' }}
          >
            <SectionLabel>About the Artist</SectionLabel>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#2c1810',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Hello, I'm{' '}
              <span style={{ color: '#c17f47', fontStyle: 'italic' }}>{settings.artist_name}</span>
            </h2>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '1.02rem',
                color: '#8a7060',
                lineHeight: 1.85,
                marginBottom: '1.25rem',
              }}
            >
              {settings.artist_bio_1}
            </p>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '1.02rem',
                color: '#8a7060',
                lineHeight: 1.85,
                marginBottom: '2.5rem',
              }}
            >
              {settings.artist_bio_2}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { number: settings.paintings_count, label: 'Paintings Created' },
                { number: settings.students_count, label: 'Students Taught' },
                { number: settings.workshops_count, label: 'Workshops Conducted' },
              ].map(({ number, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                  style={{
                    backgroundColor: '#fff9f4',
                    border: '1px solid #f5e6d3',
                    borderRadius: 12,
                    padding: '16px 24px',
                    textAlign: 'center',
                    flex: '1 1 100px',
                    boxShadow: '0 4px 20px rgba(193,127,71,0.08)',
                  }}
                >
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#c17f47' }}>{number}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', marginTop: 4, letterSpacing: '0.05em' }}>{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Download button */}
            <button
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 600,
                fontSize: '0.92rem',
                backgroundColor: 'transparent',
                color: '#8b5e3c',
                border: '2px solid #8b5e3c',
                borderRadius: '50px',
                padding: '12px 28px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8b5e3c';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#8b5e3c';
              }}
            >
              ↓ Download Portfolio
            </button>

            {/* Signature */}
            <div style={{ marginTop: '2rem' }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#c17f47',
                  opacity: 0.75,
                }}
              >
                {settings.artist_name}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
