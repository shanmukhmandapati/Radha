import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    text: "Attending Radha Rani's watercolor workshop was one of the most beautiful experiences of my life. She has this magical ability to simplify complex techniques and make every student feel capable and creative. I walked away with my first real painting — something I never thought I could do.",
    name: 'Priya Sharma',
    city: 'Bengaluru',
    workshop: 'Beginner Watercolor Workshop',
    stars: 5,
  },
  {
    text: "The 1:1 coaching sessions with Radha Rani completely transformed how I see color and composition. Her patience, expertise, and genuine passion for art are unmatched. My acrylic paintings now have a depth and emotion I never knew I was capable of.",
    name: 'Arjun Mehta',
    city: 'Mumbai',
    workshop: 'Private 1:1 Coaching',
    stars: 5,
  },
  {
    text: "I bought one of Radha Rani's original paintings — 'Golden Hour' — for our living room. Every single day I look at it, I see something new. It brings such warmth and energy to our space. Her art truly speaks to the soul, just as she promises.",
    name: 'Kavya Reddy',
    city: 'Hyderabad',
    workshop: 'Art Collector',
    stars: 5,
  },
];

const StarRating = ({ count }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#c17f47">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18 }}
      style={{
        flex: '1 1 280px',
        backgroundColor: '#fff9f4',
        borderRadius: 20,
        padding: '36px 32px',
        boxShadow: '0 6px 30px rgba(44,24,16,0.07)',
        border: '1px solid rgba(245,230,211,0.8)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large quote mark */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        fontFamily: "'Playfair Display', serif",
        fontSize: '6rem',
        lineHeight: 1,
        color: '#c17f47',
        opacity: 0.15,
        fontWeight: 700,
        userSelect: 'none',
      }}>
        "
      </div>

      {/* Stars */}
      <div style={{ marginBottom: '1.25rem' }}>
        <StarRating count={t.stars} />
      </div>

      {/* Text */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '1.08rem',
        color: '#5a4030',
        lineHeight: 1.85,
        marginBottom: '1.75rem',
        position: 'relative',
        zIndex: 1,
      }}>
        "{t.text}"
      </p>

      {/* Author */}
      <div style={{ borderTop: '1px solid #f5e6d3', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#2c1810', margin: 0 }}>{t.name}</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', margin: '2px 0 0' }}>{t.city}</p>
        </div>
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 600,
          backgroundColor: '#f5e6d3',
          color: '#8b5e3c',
          borderRadius: 20,
          padding: '4px 12px',
          whiteSpace: 'nowrap',
          marginLeft: 12,
          textAlign: 'right',
        }}>
          {t.workshop}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" ref={ref} style={{ backgroundColor: '#fdf8f3', padding: '80px 7%', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '20%', left: -100, width: 350, height: 350, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', filter: 'blur(60px)', opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: -80, width: 280, height: 280, borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', filter: 'blur(50px)', opacity: 0.5 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ Testimonials
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>
            What Students Say
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#8a7060' }}>
            Words from hearts touched by art
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
