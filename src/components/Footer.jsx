import { motion } from 'framer-motion';
import { useProfile } from '../lib/useProfile';

const footerLinks = ['Gallery', 'Workshops', 'Events', 'Shop', 'About', 'Contact'];

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/91XXXXXXXXXX',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
];

const PaintbrushIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
    <path d="M9 8c-2 3-4 3.5-7 4l8 8c1-.5 3.5-2 4-7"/>
    <path d="M14.5 17.5 4.5 15"/>
  </svg>
);

export default function Footer() {
  const profile = useProfile();
  const settings = { artist_name: profile.artist_name };
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#2c1810', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blob */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(193,127,71,0.1), transparent)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(193,127,71,0.08), transparent)', filter: 'blur(40px)' }} />

      {/* SVG Wave divider at top */}
      <div style={{ marginTop: -2, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="#2c1810" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 7% 32px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {/* Logo & tagline */}
          <div style={{ flex: '1 1 240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
              <span style={{ color: '#c17f47', opacity: 0.6 }}>
                <PaintbrushIcon />
              </span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: '1.7rem',
                fontWeight: 700,
                color: '#f5e6d3',
              }}>
                {settings.artist_name}
              </span>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#8a7060',
              lineHeight: 1.7,
              maxWidth: 240,
            }}>
              Bringing color to life, one stroke at a time.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(193,127,71,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e8a87c',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(193,127,71,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ flex: '1 1 180px' }}>
            <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#c17f47', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {footerLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.92rem',
                      color: '#8a7060',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s',
                      textAlign: 'left',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#e8a87c')}
                    onMouseLeave={(e) => (e.target.style.color = '#8a7060')}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#c17f47', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '✉️', text: profile.email || 'hello@radharani.com' },
                { icon: '📱', text: profile.whatsapp ? `+${profile.whatsapp}` : '+91 XXXXXXXXXX' },
                { icon: '📍', text: profile.location || 'Hyderabad, India' },
                { icon: '📸', text: profile.instagram || '@radharaniart' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div style={{ flex: '1 1 240px' }}>
            <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#c17f47', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Stay Inspired
            </h4>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', lineHeight: 1.65, marginBottom: '1rem' }}>
              Get notified about new paintings, workshops, and art events.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Your email..."
                style={{
                  flex: 1,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.88rem',
                  backgroundColor: 'rgba(193,127,71,0.1)',
                  border: '1px solid rgba(193,127,71,0.25)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  color: '#f5e6d3',
                  outline: 'none',
                  minWidth: 140,
                }}
              />
              <button
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  backgroundColor: '#c17f47',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e8a87c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#c17f47'; }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(193,127,71,0.15)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#5a4030', margin: 0 }}>
              © 2026 {settings.artist_name}. All rights reserved.
            </p>
            <a href="/admin" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#5a4030', opacity: 0.5, textDecoration: 'none', transition: 'opacity 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>
              Admin
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#5a4030', opacity: 0.6 }}>
              <PaintbrushIcon />
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.9rem', color: '#5a4030' }}>
              Art that speaks to the soul
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
