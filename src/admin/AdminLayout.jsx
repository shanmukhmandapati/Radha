import { useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'hero', icon: '🏠', label: 'Hero Image' },
  { id: 'gallery', icon: '🎨', label: 'Gallery' },
  { id: 'shop', icon: '🛒', label: 'Shop' },
  { id: 'events', icon: '📅', label: 'Events' },
  { id: 'workshops', icon: '🎓', label: 'Workshops' },
  { id: 'enquiries', icon: '✉️', label: 'Enquiries' },
  { id: 'profile', icon: '👤', label: 'Profile' },
  { id: 'stats', icon: '📊', label: 'Overview' },
];

export default function AdminLayout({ active, onSelect, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fdf8f3' }}>
      {/* Sidebar */}
      <aside style={{
        width: 230, flexShrink: 0, backgroundColor: '#2c1810',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 20px 22px', borderBottom: '1px solid rgba(193,127,71,0.2)' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.35rem', fontWeight: 700, color: '#f5e6d3' }}>Radha Rani</div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', color: '#8a7060', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>Studio Admin</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 14px', borderRadius: 10, border: 'none',
                  cursor: 'pointer', marginBottom: 3, textAlign: 'left',
                  backgroundColor: isActive ? '#c17f47' : 'transparent',
                  color: isActive ? '#fff' : '#c4a882',
                  fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(193,127,71,0.15)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span style={{ fontSize: '1.05rem', width: 22, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '14px 10px', borderTop: '1px solid rgba(193,127,71,0.15)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, color: '#8a7060', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', textDecoration: 'none', marginBottom: 4 }}
            onMouseEnter={e => { e.currentTarget.style.color = '#c4a882'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8a7060'; }}
          >
            🌐 View Website
          </a>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#8a7060', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', textAlign: 'left' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e87878'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8a7060'; }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top bar */}
        <div style={{ backgroundColor: '#fff9f4', borderBottom: '1px solid #f5e6d3', padding: '16px 28px', position: 'sticky', top: 0, zIndex: 10 }}>
          <h1 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#2c1810', margin: 0 }}>
            {navItems.find(n => n.id === active)?.icon} {navItems.find(n => n.id === active)?.label}
          </h1>
        </div>
        <div style={{ flex: 1, padding: '2rem 2.5rem', maxWidth: 1000, width: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
