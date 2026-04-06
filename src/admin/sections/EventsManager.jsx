import { useState } from 'react';
import { getLocal, setLocal, generateId } from '../../lib/storage';

const emptyEvent = { name: '', date: '', location: '', seats: '', type: 'upcoming', description: '', attended: '' };

export default function EventsManager() {
  const [events, setEvents] = useState(() => getLocal('events', []));
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyEvent);
  const [success, setSuccess] = useState('');

  const save = (list) => { setEvents(list); setLocal('events', list); };

  const openAdd = () => { setEditId(null); setForm(emptyEvent); setShowForm(true); };
  const openEdit = (ev) => {
    setEditId(ev.id);
    setForm({ name: ev.name, date: ev.date, location: ev.location, seats: ev.seats || '', type: ev.type, description: ev.description || '', attended: ev.attended || '' });
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      save(events.map(ev => ev.id === editId ? { ...ev, ...form } : ev));
    } else {
      save([...events, { ...form, id: generateId(), created_at: new Date().toISOString() }]);
    }
    setSuccess(editId ? 'Event updated!' : 'Event added!');
    setTimeout(() => setSuccess(''), 3000);
    closeForm();
  };

  const deleteEvent = (id) => {
    if (!confirm('Delete this event?')) return;
    save(events.filter(ev => ev.id !== id));
  };

  const upcoming = events.filter(ev => ev.type === 'upcoming');
  const past = events.filter(ev => ev.type === 'past');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={s.title}>Events</h2>
          <p style={s.subtitle}>{upcoming.length} upcoming · {past.length} past</p>
        </div>
        <button onClick={openAdd} style={s.primaryBtn}>+ Add Event</button>
      </div>

      {success && <div style={{ ...s.successBox, marginBottom: '1rem' }}>✓ {success}</div>}

      {events.length === 0 && !showForm && (
        <div style={s.empty}>No events yet. Click "Add Event" to get started.</div>
      )}

      {upcoming.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={s.sectionHead}>Upcoming Events</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {upcoming.map(ev => (
              <div key={ev.id} style={{ backgroundColor: '#fff9f4', borderRadius: 12, padding: '14px 18px', border: '1px solid #f5e6d3', borderLeft: '4px solid #c17f47', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{ev.name}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060' }}>📅 {ev.date} · 📍 {ev.location} {ev.seats && `· ${ev.seats}`}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => openEdit(ev)} style={s.smallBtn('#c17f47')}>Edit</button>
                  <button onClick={() => deleteEvent(ev.id)} style={s.smallBtn('#dc2626')}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 style={s.sectionHead}>Past Events</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {past.map(ev => (
              <div key={ev.id} style={{ backgroundColor: '#fff9f4', borderRadius: 12, padding: '14px 18px', border: '1px solid #f5e6d3', borderLeft: '4px solid #8a7060', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', opacity: 0.8 }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{ev.name}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060' }}>📅 {ev.date} {ev.attended && `· ${ev.attended} attended`}</p>
                  {ev.description && <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', marginTop: 4 }}>{ev.description}</p>}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => openEdit(ev)} style={s.smallBtn('#c17f47')}>Edit</button>
                  <button onClick={() => deleteEvent(ev.id)} style={s.smallBtn('#dc2626')}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem' }}>
              {editId ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Event Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Holi Colors Workshop" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Date *</label>
                  <input required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="15 April 2026" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Location</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Hyderabad / Online" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={s.input}>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
                {form.type === 'upcoming' && (
                  <div>
                    <label style={s.label}>Seats Info</label>
                    <input value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} placeholder="8 seats left" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                  </div>
                )}
                {form.type === 'past' && (
                  <div>
                    <label style={s.label}>Students Attended</label>
                    <input value={form.attended} onChange={e => setForm(f => ({ ...f, attended: e.target.value }))} placeholder="45" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                  </div>
                )}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="A brief description of the event..." style={{ ...s.input, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" style={s.primaryBtn}>{editId ? 'Save Changes' : 'Add Event'}</button>
                <button type="button" onClick={closeForm} style={s.ghostBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060', marginTop: 4 },
  sectionHead: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: '#2c1810', marginBottom: '0.9rem' },
  label: { fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.04em', display: 'block', marginBottom: 5 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block' },
  primaryBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  ghostBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.88rem', backgroundColor: 'transparent', color: '#8a7060', border: '1px solid #f5e6d3', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  smallBtn: (c) => ({ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: c + '18', color: c, border: `1px solid ${c}40`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }),
  empty: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', padding: '3rem', textAlign: 'center', border: '2px dashed #f5e6d3', borderRadius: 16 },
  successBox: { backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto' },
  modal: { backgroundColor: '#fff9f4', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(44,24,16,0.3)' },
};
