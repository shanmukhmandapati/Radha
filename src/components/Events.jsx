import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getLocal } from '../lib/storage';

const ACCENT_COLORS = ['#c17f47', '#5a8a7a', '#8b5e3c', '#7a5fa0', '#3d8a6a'];
const PAST_GRADIENTS = [
  'linear-gradient(135deg, #f5d08a, #e8956a, #c17f47)',
  'linear-gradient(135deg, #8ec9a0, #5a9e70, #3d7a50)',
  'linear-gradient(135deg, #c0a8d8, #a07cbf, #8050a0)',
  'linear-gradient(135deg, #aad0e8, #5a9eb8, #3d6e8a)',
];

const defaultUpcoming = [
  { id: 'du1', name: 'Holi Colors Workshop', date: '15 April 2026', location: 'Hyderabad', seats: '8 seats left', type: 'upcoming' },
  { id: 'du2', name: 'Monsoon Watercolors', date: '20 June 2026', location: 'Online', seats: '12 seats left', type: 'upcoming' },
  { id: 'du3', name: 'Portrait Masterclass', date: '10 July 2026', location: 'Hyderabad', seats: '5 seats left', type: 'upcoming' },
];

const defaultPast = [
  { id: 'dp1', name: 'Diwali Art Festival', date: '12 November 2025', attended: '45', type: 'past', description: 'A joyful celebration of color — students created stunning Diwali-inspired paintings.' },
  { id: 'dp2', name: 'Nature Sketching Retreat', date: '5 September 2025', attended: '32', type: 'past', description: 'A weekend retreat in the outdoors — sketching and painting amidst nature.' },
  { id: 'dp3', name: 'Acrylic Intensive', date: '18 August 2025', attended: '28', type: 'past', description: 'Three days of deep-dive acrylic techniques with group critique sessions.' },
];

export default function Events() {
  const [events, setEvents] = useState(() => {
    const stored = getLocal('events', []);
    return stored.length > 0 ? stored : [...defaultUpcoming, ...defaultPast];
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const sync = () => {
      const stored = getLocal('events', []);
      setEvents(stored.length > 0 ? stored : [...defaultUpcoming, ...defaultPast]);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const upcoming = events.filter(e => e.type === 'upcoming');
  const past = events.filter(e => e.type === 'past');

  return (
    <section id="events" ref={ref} style={{ backgroundColor: '#fdf8f3', padding: '80px 7%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Events</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810' }}>
            <span className="gradient-text">Art</span> Gatherings
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }} style={{ flex: '1 1 320px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c17f47', display: 'inline-block', boxShadow: '0 0 0 4px rgba(193,127,71,0.2)' }} />
              Upcoming Events
            </h3>
            {upcoming.length === 0 ? (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#8a7060' }}>No upcoming events at the moment.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcoming.map((event, i) => {
                  const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                  return (
                    <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      style={{ backgroundColor: '#fff9f4', borderRadius: 16, padding: '20px 20px 20px 24px', borderLeft: `4px solid ${color}`, boxShadow: '0 4px 20px rgba(44,24,16,0.07)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                      whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(44,24,16,0.12)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: '#2c1810', margin: 0 }}>{event.name}</h4>
                        {event.seats && <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 600, backgroundColor: color + '20', color, borderRadius: 20, padding: '3px 10px', whiteSpace: 'nowrap', marginLeft: 8 }}>{event.seats}</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>📅 {event.date}</span>
                        {event.location && <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>📍 {event.location}</span>}
                      </div>
                      <button style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.82rem', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '50px', padding: '8px 20px', cursor: 'pointer', letterSpacing: '0.04em' }}>
                        Register Now
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Past */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} style={{ flex: '1 1 320px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8a7060', display: 'inline-block' }} />
              Past Events
            </h3>
            {past.length === 0 ? (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#8a7060' }}>No past events recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {past.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    style={{ backgroundColor: '#fff9f4', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(44,24,16,0.07)' }}
                    whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(44,24,16,0.12)' }}>
                    <div style={{ height: 80, background: PAST_GRADIENTS[i % PAST_GRADIENTS.length], position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 55%)' }} />
                      {event.attended && <span style={{ position: 'absolute', bottom: 10, right: 12, fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: 'rgba(44,24,16,0.6)', color: '#fdf8f3', borderRadius: 20, padding: '3px 10px' }}>{event.attended} students attended</span>}
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{event.name}</h4>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', marginBottom: 8 }}>📅 {event.date}</p>
                      {event.description && <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.86rem', color: '#8a7060', lineHeight: 1.6 }}>{event.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
