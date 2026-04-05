import { motion } from 'framer-motion';

const BlobDecoration = ({ style, color1, color2, size = 300 }) => (
  <div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
      background: `radial-gradient(ellipse at center, ${color1}, ${color2})`,
      filter: 'blur(50px)',
      opacity: 0.55,
      ...style,
    }}
  />
);

const PaintingPlaceholder = () => (
  <motion.div
    className="animate-painting-float"
    style={{ position: 'relative', width: '100%', maxWidth: 460 }}
  >
    {/* Outer decorative ring */}
    <div
      style={{
        position: 'absolute',
        inset: -16,
        borderRadius: '42% 58% 38% 62% / 55% 45% 55% 45%',
        border: '2px solid rgba(193,127,71,0.25)',
      }}
    />
    {/* Main painting canvas */}
    <div
      style={{
        width: '100%',
        aspectRatio: '4/5',
        borderRadius: '38% 62% 44% 56% / 52% 48% 52% 48%',
        background: 'linear-gradient(135deg, #f5c9a0 0%, #e8956a 25%, #d4734a 50%, #b5c4a8 75%, #8eadb5 100%)',
        boxShadow: '0 30px 80px rgba(44,24,16,0.25), inset 0 0 60px rgba(255,255,255,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watercolor texture overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,220,180,0.5) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 70%, rgba(180,120,80,0.4) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(142,173,181,0.5) 0%, transparent 50%)' }} />
      {/* Brushstroke effect */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40%', height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: 4, transform: 'rotate(-8deg)', filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', top: '40%', right: '15%', width: '30%', height: '2px', background: 'rgba(255,255,255,0.25)', borderRadius: 4, transform: 'rotate(5deg)', filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', bottom: '30%', left: '20%', width: '50%', height: '4px', background: 'rgba(180,90,50,0.3)', borderRadius: 4, transform: 'rotate(-3deg)', filter: 'blur(2px)' }} />
    </div>

    {/* Floating paint drops */}
    {[
      { top: '8%', right: '5%', size: 14, color: '#e8a87c' },
      { bottom: '15%', left: '-5%', size: 10, color: '#c17f47' },
      { top: '50%', right: '-3%', size: 8, color: '#8b5e3c' },
      { top: '25%', left: '2%', size: 6, color: '#e8956a' },
    ].map((drop, i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
        style={{
          position: 'absolute',
          width: drop.size,
          height: drop.size,
          borderRadius: '50%',
          background: drop.color,
          top: drop.top,
          right: drop.right,
          left: drop.left,
          bottom: drop.bottom,
          filter: 'blur(1px)',
          boxShadow: `0 2px 8px ${drop.color}80`,
        }}
      />
    ))}
  </motion.div>
);

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{ backgroundColor: '#fdf8f3', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* Background blobs */}
      <BlobDecoration color1="#f5e6d3" color2="rgba(245,230,211,0)" style={{ top: '-80px', left: '-120px' }} size={500} />
      <BlobDecoration color1="#fde8cc" color2="rgba(253,232,204,0)" style={{ bottom: '-60px', right: '-100px' }} size={420} />
      <BlobDecoration color1="#f0d5bc" color2="rgba(240,213,188,0)" style={{ top: '40%', left: '30%' }} size={280} />

      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
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
                fontSize: 'clamp(3rem, 6vw, 5rem)',
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
                style={{
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
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#8b5e3c';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(193,127,71,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#c17f47';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(193,127,71,0.35)';
                }}
              >
                Explore Gallery
              </button>
              <button
                onClick={() => scrollTo('workshops')}
                style={{
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c17f47';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#c17f47';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
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
              {[['200+', 'Paintings'], ['1500+', 'Students'], ['80+', 'Workshops']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#c17f47' }}>{num}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Painting */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <PaintingPlaceholder />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#8a7060', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #c17f47, transparent)' }}
        />
      </motion.div>
    </section>
  );
}
