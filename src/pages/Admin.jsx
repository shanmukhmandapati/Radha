import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import EnquiriesPanel from '../admin/EnquiriesPanel';
import GalleryManager from '../admin/GalleryManager';
import ShopManager from '../admin/ShopManager';
import SiteSettingsManager from '../admin/SiteSettingsManager';

const tabs = [
  { id: 'enquiries', label: 'Enquiries', icon: '✉️' },
  { id: 'gallery', label: 'Gallery', icon: '🖼' },
  { id: 'shop', label: 'Shop', icon: '🛍' },
  { id: 'settings', label: 'Site Settings', icon: '⚙️' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('enquiries');
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch unread count for badge
    const fetchUnread = async () => {
      const { count } = await supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('is_read', false);
      setUnreadCount(count || 0);
    };
    fetchUnread();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'enquiries': return <EnquiriesPanel />;
      case 'gallery': return <GalleryManager />;
      case 'shop': return <ShopManager />;
      case 'settings': return <SiteSettingsManager />;
      default: return null;
    }
  };

  const Sidebar = () => (
    <div style={{ width: 240, flexShrink: 0, backgroundColor: '#fff9f4', borderRight: '1px solid #f5e6d3', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #f5e6d3' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.3rem', fontWeight: 700, color: '#c17f47' }}>Radha Rani</div>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#8a7060', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              marginBottom: 4,
              backgroundColor: activeTab === tab.id ? '#f5e6d3' : 'transparent',
              color: activeTab === tab.id ? '#2c1810' : '#8a7060',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.92rem',
              fontWeight: activeTab === tab.id ? 600 : 400,
              textAlign: 'left',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#fdf8f3'; }}
            onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
            <span style={{ flex: 1 }}>{tab.label}</span>
            {tab.id === 'enquiries' && unreadCount > 0 && (
              <span style={{ backgroundColor: '#c17f47', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 700, borderRadius: 20, padding: '2px 7px', minWidth: 20, textAlign: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer actions */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #f5e6d3' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, color: '#8a7060', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', textDecoration: 'none', marginBottom: 4 }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fdf8f3'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          🌐 View Website
        </a>
        <button
          onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#dc2626', fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', textAlign: 'left' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fdf8f3' }}>
      {/* Sidebar — desktop */}
      <div className="hidden lg:flex" style={{ display: 'flex' }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(44,24,16,0.4)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ backgroundColor: '#fff9f4', borderBottom: '1px solid #f5e6d3', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#c17f47', padding: 4 }}
          >
            ☰
          </button>
          <h1 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#2c1810', margin: 0 }}>
            {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
          </h1>
        </div>

        {/* Panel */}
        <div style={{ flex: 1, padding: '2rem', maxWidth: 1100, width: '100%' }}>
          {renderPanel()}
        </div>
      </div>
    </div>
  );
}
