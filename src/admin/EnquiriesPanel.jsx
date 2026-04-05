import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const enquiryTypeColors = {
  'Buy a Painting': '#c17f47',
  'Book Workshop': '#5a8a7a',
  'Commission Art': '#8b5e3c',
  'General Enquiry': '#8a7060',
};

export default function EnquiriesPanel() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const markRead = async (id) => {
    await supabase.from('enquiries').update({ is_read: true }).eq('id', id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, is_read: true } : e));
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await supabase.from('enquiries').delete().eq('id', id);
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const unreadCount = enquiries.filter(e => !e.is_read).length;
  const filtered = filter === 'unread' ? enquiries.filter(e => !e.is_read) : enquiries;

  if (loading) return <div style={s.loading}>Loading enquiries...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={s.title}>Enquiries</h2>
          <p style={s.subtitle}>{enquiries.length} total · {unreadCount} unread</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'unread'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...s.filterBtn, backgroundColor: filter === f ? '#c17f47' : '#fff9f4', color: filter === f ? '#fff' : '#8a7060', border: `1px solid ${filter === f ? '#c17f47' : '#f5e6d3'}` }}>
              {f === 'all' ? `All (${enquiries.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={s.empty}>No enquiries yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(enq => (
            <div
              key={enq.id}
              style={{
                backgroundColor: '#fff9f4',
                borderRadius: 14,
                border: '1px solid #f5e6d3',
                borderLeft: enq.is_read ? '4px solid #f5e6d3' : '4px solid #c17f47',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Row */}
              <div
                style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#2c1810' }}>{enq.name}</span>
                    {!enq.is_read && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c17f47', display: 'inline-block', flexShrink: 0 }} />}
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: (enquiryTypeColors[enq.enquiry_type] || '#8a7060') + '20', color: enquiryTypeColors[enq.enquiry_type] || '#8a7060', borderRadius: 20, padding: '2px 10px' }}>
                      {enq.enquiry_type}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060' }}>
                    {enq.email} {enq.phone ? `· ${enq.phone}` : ''}
                  </div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#5a4030', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: expanded === enq.id ? 'normal' : 'nowrap' }}>
                    {enq.message}
                  </div>
                </div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {formatDate(enq.created_at)}
                </div>
              </div>

              {/* Expanded actions */}
              {expanded === enq.id && (
                <div style={{ borderTop: '1px solid #f5e6d3', padding: '12px 20px', display: 'flex', gap: '0.75rem', backgroundColor: '#fdf8f3' }}>
                  {!enq.is_read && (
                    <button onClick={() => markRead(enq.id)} style={s.actionBtn('#5a8a7a')}>
                      ✓ Mark as Read
                    </button>
                  )}
                  <a href={`mailto:${enq.email}?subject=Re: ${enq.enquiry_type}`} style={{ ...s.actionBtn('#c17f47'), textDecoration: 'none' }}>
                    ✉ Reply by Email
                  </a>
                  {enq.phone && (
                    <a href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ ...s.actionBtn('#25d366'), textDecoration: 'none' }}>
                      💬 WhatsApp
                    </a>
                  )}
                  <button onClick={() => deleteEnquiry(enq.id)} style={s.actionBtn('#dc2626')}>
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060', marginTop: 4 },
  loading: { fontFamily: "'Jost', sans-serif", color: '#8a7060', padding: '2rem', textAlign: 'center' },
  empty: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', padding: '3rem', textAlign: 'center' },
  filterBtn: { fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, borderRadius: 20, padding: '6px 16px', cursor: 'pointer', transition: 'all 0.2s' },
  actionBtn: (color) => ({ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, backgroundColor: color + '15', color: color, border: `1px solid ${color}40`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }),
};
