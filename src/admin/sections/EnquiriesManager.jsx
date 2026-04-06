import { useState } from 'react';
import { getLocal, setLocal } from '../../lib/storage';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState(() => getLocal('enquiries', []));
  const [selected, setSelected] = useState(null);

  const markRead = (id) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, read: true } : e);
    setEnquiries(updated);
    setLocal('enquiries', updated);
  };

  const deleteEnquiry = (id) => {
    if (!confirm('Delete this enquiry?')) return;
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    setLocal('enquiries', updated);
    if (selected?.id === id) setSelected(null);
  };

  const unread = enquiries.filter(e => !e.read).length;

  const open = (enq) => {
    setSelected(enq);
    if (!enq.read) markRead(enq.id);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={s.title}>Enquiries</h2>
        <p style={s.subtitle}>
          {enquiries.length} total · {unread > 0
            ? <span style={{ color: '#c17f47', fontWeight: 600 }}>{unread} unread</span>
            : 'all read'}
        </p>
      </div>

      {enquiries.length === 0 && (
        <div style={s.empty}>No enquiries yet. When visitors submit the contact form, messages will appear here.</div>
      )}

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {/* List */}
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[...enquiries].reverse().map(enq => (
            <div
              key={enq.id}
              onClick={() => open(enq)}
              style={{
                backgroundColor: selected?.id === enq.id ? '#fff3e8' : '#fff9f4',
                border: selected?.id === enq.id
                  ? '1.5px solid #c17f47'
                  : `1px solid ${enq.read ? '#f5e6d3' : 'rgba(193,127,71,0.4)'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              {!enq.read && (
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 8, height: 8, borderRadius: '50%',
                  backgroundColor: '#c17f47',
                }} />
              )}
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, color: '#2c1810', marginBottom: 3 }}>{enq.name}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', marginBottom: 4 }}>
                {enq.enquiry_type || 'General'} · {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', paddingRight: 16 }}>
                {enq.message}
              </p>
            </div>
          ))}
        </div>

        {/* Detail view */}
        {selected && (
          <div style={{ flex: '1 1 320px', backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 16, padding: '24px', alignSelf: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#2c1810' }}>{selected.name}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', marginTop: 2 }}>
                  {new Date(selected.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
              <button onClick={() => deleteEnquiry(selected.id)} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Enquiry Type', value: selected.enquiry_type || '—' },
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone || '—' },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: '#8a7060', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: '#2c1810' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: '#8a7060', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Message</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', lineHeight: 1.7, backgroundColor: '#fdf8f3', border: '1px solid #f5e6d3', borderRadius: 8, padding: '12px 14px', whiteSpace: 'pre-wrap' }}>
                {selected.message}
              </p>
            </div>

            {/* Reply shortcuts */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.enquiry_type || 'Your Enquiry'}`}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#c17f4718', color: '#c17f47', border: '1px solid #c17f4740', borderRadius: 8, padding: '7px 14px', textDecoration: 'none', cursor: 'pointer' }}
              >
                ✉️ Reply by Email
              </a>
              {selected.phone && (
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#25d36618', color: '#16a34a', border: '1px solid #25d36640', borderRadius: 8, padding: '7px 14px', textDecoration: 'none', cursor: 'pointer' }}
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060', marginTop: 4 },
  empty: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', padding: '3rem', textAlign: 'center', border: '2px dashed #f5e6d3', borderRadius: 16 },
};
