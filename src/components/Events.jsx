import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const upcomingEvents = [
  {
    name: 'Holi Colors Workshop',
    date: '15 April 2026',
    location: 'Hyderabad',
    seats: '8 seats left',
    color: '#c17f47',
    bg: '#fff3e8',
  },
  {
    name: 'Monsoon Watercolors',
    date: '20 June 2026',
    location: 'Online',
    seats: '12 seats left',
    color: '#5a8a7a',
    bg: '#e8f3f0',
  },
  {
    name: 'Portrait Masterclass',
    date: '10 July 2026',
    location: 'Hyderabad',
    seats: '5 seats left',
    color: '#8b5e3c',
    bg: '#f3ede8',
  },
];

const pastEvents = [
  {
    name: 'Diwali Art Festival',
    date: '12 November 2025',
    attended: 45,
    gradient: 'linear-gradient(135deg, #f5d08a, #e8956a, #c17f47)',
    desc: 'A joyful celebration of color — students created stunning Diwali-inspired paintings.',
  },
  {
    name: 'Nature Sketching Retreat',
    date: '5 September 2025',
    attended: 32,
    gradient: 'linear-gradient(135deg, #8ec9a0, #5a9e70, #3d7a50)',
    desc: 'A weekend retreat in the outdoors — sketching and painting amidst nature.',
  },
  {
    name: 'Acrylic Intensive',
    date: '18 August 2025',
    attended: 28,
    gradient: 'linear-gradient(135deg, #c0a8d8, #a07cbf, #8050a0)',
    desc: 'Three days of deep-dive acrylic techniques with group critique sessions.',
  },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="events" ref={ref} style={{ backgroundColor: '#fdf8f3', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ Events
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810' }}>
            Art Gatherings
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {/* LEFT — Upcoming */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ flex: '1 1 320px' }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c17f47', display: 'inline-block', boxShadow: '0 0 0 4px rgba(193,127,71,0.2)' }} />
              Upcoming Events
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  style={{
                    backgroundColor: '#fff9f4',
                    borderRadius: 16,
                    padding: '20px 20px 20px 24px',
                    borderLeft: `4px solid ${event.color}`,
                    boxShadow: '0 4px 20px rgba(44,24,16,0.07)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(44,24,16,0.12)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: '#2c1810', margin: 0 }}>{event.name}</h4>
                    <span style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: event.color + '20',
                      color: event.color,
                      borderRadius: 20,
                      padding: '3px 10px',
                      whiteSpace: 'nowrap',
                      marginLeft: 8,
                    }}>
                      {event.seats}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>📅 {event.date}</span>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>📍 {event.location}</span>
                  </div>
                  <button
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      backgroundColor: event.color,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '8px 20px',
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Register Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Past Events */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ flex: '1 1 320px' }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8a7060', display: 'inline-block' }} />
              Past Events
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pastEvents.map((event, i) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  style={{
                    backgroundColor: '#fff9f4',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(44,24,16,0.07)',
                  }}
                  whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(44,24,16,0.12)' }}
                >
                  {/* Gradient banner */}
                  <div style={{ height: 80, background: event.gradient, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 55%)' }} />
                    <span style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 12,
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(44,24,16,0.6)',
                      color: '#fdf8f3',
                      borderRadius: 20,
                      padding: '3px 10px',
                    }}>
                      {event.attended} students attended
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{event.name}</h4>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', marginBottom: 8 }}>📅 {event.date}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.86rem', color: '#8a7060', lineHeight: 1.6 }}>{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
