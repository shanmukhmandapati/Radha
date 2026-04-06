import { useState } from 'react';
import { getLocal, setLocal, generateId, DEFAULT_WORKSHOPS } from '../../lib/storage';

const ICONS = ['🎨', '🖌️', '✨', '🖼️', '🎭', '🌸', '🌿'];
const MODES = ['Online & Offline', 'Online only', 'Offline only'];
const empty = { icon: '🎨', title: '', duration: '', mode: 'Online & Offline', topics: '', price: '', badge: '', perPerson: true };

export default function WorkshopsManager() {
  const [workshops, setWorkshops] = useState(() => getLocal('workshops', DEFAULT_WORKSHOPS));
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [success, setSuccess] = useState('');

  const save = (list) => { setWorkshops(list); setLocal('workshops', list); };

  const openAdd = () => { setEditId(null); setForm(empty); setShowForm(true); };
  const openEdit = (w) => {
    setEditId(w.id);
    setForm({ icon: w.icon, title: w.title, duration: w.duration, mode: w.mode, topics: Array.isArray(w.topics) ? w.topics.join('\n') : w.topics, price: w.price, badge: w.badge || '', perPerson: w.perPerson !== false });
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = form.price.startsWith('₹') ? form.price : `₹${form.price}`;
    const topics = form.topics.split('\n').map(t => t.trim()).filter(Boolean);
    if (editId) {
      save(workshops.map(w => w.id === editId ? { ...w, ...form, price, topics } : w));
    } else {
      save([...workshops, { ...form, price, topics, id: generateId() }]);
    }
    setSuccess(editId ? 'Workshop updated!' : 'Workshop added!');
    setTimeout(() => setSuccess(''), 3000);
    closeForm();
  };

  const deleteWorkshop = (id) => {
    if (!confirm('Delete this workshop?')) return;
    save(workshops.filter(w => w.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={s.title}>Workshops</h2>
          <p style={s.subtitle}>{workshops.length} workshops listed</p>
        </div>
        <button onClick={openAdd} style={s.primaryBtn}>+ Add Workshop</button>
      </div>

      {success && <div style={{ ...s.successBox, marginBottom: '1rem' }}>✓ {success}</div>}

      {workshops.length === 0 && !showForm && (
        <div style={s.empty}>No workshops yet. Click "Add Workshop" to get started.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {workshops.map(w => (
          <div key={w.id} style={{ backgroundColor: '#fff9f4', borderRadius: 12, padding: '16px 20px', border: '1px solid #f5e6d3', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #f5c9a0, #e8956a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                {w.icon}
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{w.title}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', marginBottom: 4 }}>
                  ⏱ {w.duration} · 📍 {w.mode}
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#c17f47' }}>{w.price}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button onClick={() => openEdit(w)} style={s.smallBtn('#c17f47')}>Edit</button>
              <button onClick={() => deleteWorkshop(w.id)} style={s.smallBtn('#dc2626')}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem' }}>
              {editId ? 'Edit Workshop' : 'Add New Workshop'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div>
                  <label style={s.label}>Icon</label>
                  <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} style={s.input}>
                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Badge (e.g. Most Popular)</label>
                  <input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="Most Popular" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Workshop Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Beginner Watercolor Workshop" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Duration *</label>
                  <input required value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="2 days" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Mode</label>
                  <select value={form.mode} onChange={e => setForm(f => ({ ...f, mode: e.target.value }))} style={s.input}>
                    {MODES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Price *</label>
                  <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="₹2,500" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 18 }}>
                  <input type="checkbox" id="perPerson" checked={form.perPerson} onChange={e => setForm(f => ({ ...f, perPerson: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#c17f47' }} />
                  <label htmlFor="perPerson" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#2c1810', cursor: 'pointer' }}>Price per person</label>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Topics (one per line)</label>
                  <textarea value={form.topics} onChange={e => setForm(f => ({ ...f, topics: e.target.value }))} rows={4} placeholder={'Basic techniques & color theory\nUnderstanding paper & brushes\nComplete your first painting'} style={{ ...s.input, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" style={s.primaryBtn}>{editId ? 'Save Changes' : 'Add Workshop'}</button>
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
