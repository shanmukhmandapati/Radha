import { getLocal } from '../../lib/storage';

export default function StatsOverview() {
  const paintings = getLocal('galleryPaintings', []);
  const shop = getLocal('shopPaintings', []);
  const events = getLocal('events', []);
  const workshops = getLocal('workshops', []);
  const profile = getLocal('artistProfile', {});
  const hasHero = !!localStorage.getItem('heroImage');

  const stats = [
    { label: 'Gallery Paintings', value: paintings.length, sub: `${paintings.filter(p => p.available).length} available`, color: '#c17f47', icon: '🎨' },
    { label: 'Shop Products', value: shop.length, sub: `${shop.filter(p => p.available).length} for sale`, color: '#5a8a7a', icon: '🛒' },
    { label: 'Events', value: events.length, sub: `${events.filter(e => e.type === 'upcoming').length} upcoming`, color: '#8b5e3c', icon: '📅' },
    { label: 'Workshops', value: workshops.length, sub: 'active listings', color: '#c17f47', icon: '🎓' },
  ];

  const checklist = [
    { label: 'Hero image uploaded', done: hasHero },
    { label: 'Artist name set', done: !!profile.artist_name },
    { label: 'Bio written', done: !!(profile.bio_1 || profile.bio_2) },
    { label: 'Profile photo added', done: !!profile.photo },
    { label: 'At least one gallery painting', done: paintings.length > 0 },
    { label: 'At least one shop product', done: shop.length > 0 },
    { label: 'Contact info added (WhatsApp)', done: !!profile.whatsapp },
  ];

  const done = checklist.filter(c => c.done).length;

  return (
    <div>
      <h2 style={s.title}>Website Overview</h2>
      <p style={s.subtitle}>A quick snapshot of your content and setup progress.</p>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(193,127,71,0.06)' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#2c1810', marginTop: 4 }}>{stat.label}</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Setup checklist */}
      <div style={{ backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 20, padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#2c1810', margin: 0 }}>Setup Checklist</h3>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 600, backgroundColor: done === checklist.length ? '#f0fdf4' : '#fff3e8', color: done === checklist.length ? '#16a34a' : '#c17f47', border: `1px solid ${done === checklist.length ? '#86efac' : '#f5c58a'}`, borderRadius: 20, padding: '3px 12px' }}>
            {done}/{checklist.length} complete
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, backgroundColor: '#f5e6d3', borderRadius: 999, marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(done / checklist.length) * 100}%`, backgroundColor: done === checklist.length ? '#16a34a' : '#c17f47', borderRadius: 999, transition: 'width 0.5s ease' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {checklist.map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: item.done ? '#16a34a' : '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem' }}>
                {item.done ? <span style={{ color: '#fff' }}>✓</span> : <span style={{ color: '#8a7060' }}>·</span>}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: item.done ? '#2c1810' : '#8a7060', textDecoration: item.done ? 'none' : 'none' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {done === checklist.length && (
          <div style={{ marginTop: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '12px 16px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' }}>
            🎉 Your website is fully set up and ready to share!
          </div>
        )}
      </div>

      {/* Quick info */}
      <div style={{ backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 20, padding: '24px 28px', marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#2c1810', marginBottom: '1rem' }}>Artist Info</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {[
            { label: 'Name', value: profile.artist_name || '—' },
            { label: 'Location', value: profile.location || '—' },
            { label: 'WhatsApp', value: profile.whatsapp || '—' },
            { label: 'Instagram', value: profile.instagram || '—' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#8a7060', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', marginTop: 6 },
};
