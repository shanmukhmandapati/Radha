import { useState, useRef } from 'react';
import { getLocal, setLocal, imageToBase64, generateId } from '../../lib/storage';

const MEDIUMS = ['Watercolor', 'Acrylic', 'Oil', 'Mixed Media', 'Pencil'];
const CATEGORIES = ['Watercolor', 'Acrylic', 'Portraits', 'Nature', 'Abstract'];
const empty = { title: '', medium: 'Watercolor', size: '', price: '', category: 'Watercolor', available: true, image: '' };

export default function GalleryManager() {
  const [paintings, setPaintings] = useState(() => getLocal('galleryPaintings', []));
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const fileRef = useRef();

  const save = (list) => { setPaintings(list); setLocal('galleryPaintings', list); };

  const openAdd = () => { setEditId(null); setForm(empty); setShowForm(true); };
  const openEdit = (p) => { setEditId(p.id); setForm({ title: p.title, medium: p.medium, size: p.size, price: p.price, category: p.category, available: p.available, image: p.image }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const b64 = await imageToBase64(file, 800);
      setForm(f => ({ ...f, image: b64 }));
    } catch { alert('Image too large. Try a smaller file.'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = form.price.startsWith('₹') ? form.price : `₹${form.price}`;
    if (editId) {
      const list = paintings.map(p => p.id === editId ? { ...p, ...form, price } : p);
      save(list);
    } else {
      save([...paintings, { ...form, price, id: generateId(), created_at: new Date().toISOString() }]);
    }
    setSuccess(editId ? 'Painting updated!' : 'Painting added to gallery!');
    setTimeout(() => setSuccess(''), 3000);
    closeForm();
  };

  const deletePainting = (id) => {
    if (!confirm('Delete this painting?')) return;
    save(paintings.filter(p => p.id !== id));
  };

  const toggleAvailable = (id) => {
    save(paintings.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={s.title}>Gallery Paintings</h2>
          <p style={s.subtitle}>{paintings.length} paintings · {paintings.filter(p => p.available).length} available</p>
        </div>
        <button onClick={openAdd} style={s.primaryBtn}>+ Add Painting</button>
      </div>

      {success && <div style={{ ...s.successBox, marginBottom: '1rem' }}>✓ {success}</div>}

      {paintings.length === 0 && !showForm && (
        <div style={s.empty}>No paintings yet. Click "Add Painting" to add your first.</div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {paintings.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff9f4', borderRadius: 14, overflow: 'hidden', border: '1px solid #f5e6d3', opacity: p.available ? 1 : 0.65 }}>
            <div style={{ height: 140, backgroundColor: '#f5e6d3', overflow: 'hidden', position: 'relative' }}>
              {p.image ? <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a7060', fontSize: '0.8rem' }}>No image</div>}
              {!p.available && <div style={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#2c1810', color: '#fdf8f3', fontSize: '0.65rem', fontWeight: 700, borderRadius: 20, padding: '2px 8px', fontFamily: "'Jost', sans-serif" }}>SOLD</div>}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 600, color: '#2c1810', marginBottom: 2 }}>{p.title}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.74rem', color: '#8a7060', marginBottom: 6 }}>{p.medium} · {p.size}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.98rem', fontWeight: 700, color: '#c17f47', marginBottom: 8 }}>{p.price}</p>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button onClick={() => openEdit(p)} style={s.smallBtn('#c17f47')}>Edit</button>
                <button onClick={() => toggleAvailable(p.id)} style={s.smallBtn('#5a8a7a')}>{p.available ? 'Sold' : 'Available'}</button>
                <button onClick={() => deletePainting(p.id)} style={s.smallBtn('#dc2626')}>Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem' }}>
              {editId ? 'Edit Painting' : 'Add New Painting'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Image */}
              <div>
                <label style={s.label}>Painting Image</label>
                {form.image && <img src={form.image} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />}
                <div onClick={() => fileRef.current.click()} style={s.uploadZone}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c17f47'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f5e6d3'; }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', margin: 0 }}>
                    {uploading ? 'Compressing...' : form.image ? '📷 Change Image' : '📷 Upload Painting Photo'}
                  </p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Morning Bloom" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Medium *</label>
                  <select value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))} style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'}>
                    {MEDIUMS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Size</label>
                  <input value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} placeholder="12×16 inch" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div>
                  <label style={s.label}>Price *</label>
                  <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="₹8,500" style={s.input} onFocus={e => e.target.style.borderColor = '#c17f47'} onBlur={e => e.target.style.borderColor = '#f5e6d3'} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 18 }}>
                  <input type="checkbox" id="avail" checked={form.available} onChange={e => setForm(f => ({ ...f, available: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#c17f47' }} />
                  <label htmlFor="avail" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#2c1810', cursor: 'pointer' }}>Available for sale</label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" style={s.primaryBtn}>{editId ? 'Save Changes' : 'Add to Gallery'}</button>
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
  smallBtn: (c) => ({ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 600, backgroundColor: c + '18', color: c, border: `1px solid ${c}40`, borderRadius: 6, padding: '4px 8px', cursor: 'pointer', flex: 1 }),
  empty: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', padding: '3rem', textAlign: 'center', border: '2px dashed #f5e6d3', borderRadius: 16 },
  successBox: { backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' },
  uploadZone: { border: '2px dashed #f5e6d3', borderRadius: 10, padding: '18px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdf8f3', transition: 'border-color 0.3s' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto' },
  modal: { backgroundColor: '#fff9f4', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(44,24,16,0.3)' },
};
