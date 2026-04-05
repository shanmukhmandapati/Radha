import { useState, useEffect, useRef } from 'react';
import { supabase, uploadImage, deleteImage } from '../lib/supabase';

const MEDIUMS = ['Watercolor', 'Acrylic', 'Oil', 'Mixed Media', 'Pencil'];
const CATEGORIES = ['Watercolor', 'Acrylic', 'Portraits', 'Nature', 'Abstract'];
const BUCKET = 'gallery';

const emptyForm = { title: '', medium: 'Watercolor', size: '', price: '', category: 'Watercolor', display_order: 0 };

export default function GalleryManager() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const fetchPaintings = async () => {
    setLoading(true);
    const { data } = await supabase.from('gallery_paintings').select('*').order('display_order');
    setPaintings(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPaintings(); }, []);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setImageFile(null); setImagePreview(''); setError(''); setShowForm(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ title: p.title, medium: p.medium, size: p.size, price: p.price, category: p.category, display_order: p.display_order }); setImageFile(null); setImagePreview(p.image_url || ''); setError(''); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditItem(null); setImageFile(null); setImagePreview(''); };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let image_url = editItem?.image_url || '';

      if (imageFile) {
        // Delete old image if editing
        if (editItem?.image_url) await deleteImage(BUCKET, editItem.image_url);
        const { publicUrl } = await uploadImage(BUCKET, imageFile);
        image_url = publicUrl;
      }

      const payload = { ...form, price: form.price.startsWith('₹') ? form.price : `₹${form.price}`, image_url };

      if (editItem) {
        await supabase.from('gallery_paintings').update(payload).eq('id', editItem.id);
      } else {
        await supabase.from('gallery_paintings').insert(payload);
      }

      await fetchPaintings();
      closeForm();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (p) => {
    await supabase.from('gallery_paintings').update({ is_visible: !p.is_visible }).eq('id', p.id);
    setPaintings(prev => prev.map(x => x.id === p.id ? { ...x, is_visible: !x.is_visible } : x));
  };

  const deletePainting = async (p) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    if (p.image_url) await deleteImage(BUCKET, p.image_url);
    await supabase.from('gallery_paintings').delete().eq('id', p.id);
    setPaintings(prev => prev.filter(x => x.id !== p.id));
  };

  if (loading) return <div style={s.loading}>Loading paintings...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={s.title}>Gallery Paintings</h2>
          <p style={s.subtitle}>{paintings.length} paintings · {paintings.filter(p => p.is_visible).length} visible</p>
        </div>
        <button onClick={openAdd} style={s.primaryBtn}>+ Add Painting</button>
      </div>

      {paintings.length === 0 && !showForm && (
        <div style={s.empty}>No paintings yet. Click "Add Painting" to upload your first.</div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {paintings.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff9f4', borderRadius: 14, overflow: 'hidden', border: '1px solid #f5e6d3', opacity: p.is_visible ? 1 : 0.5 }}>
            {/* Thumbnail */}
            <div style={{ height: 150, backgroundColor: '#f5e6d3', position: 'relative', overflow: 'hidden' }}>
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a7060', fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }}>No image</div>
              )}
              {!p.is_visible && <div style={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#2c1810', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 700, borderRadius: 20, padding: '2px 8px' }}>Hidden</div>}
            </div>
            <div style={{ padding: '12px' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, color: '#2c1810', marginBottom: 2 }}>{p.title}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', marginBottom: 8 }}>{p.medium} · {p.size}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#c17f47', marginBottom: 10 }}>{p.price}</p>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => openEdit(p)} style={s.smallBtn('#c17f47')}>Edit</button>
                <button onClick={() => toggleVisible(p)} style={s.smallBtn('#5a8a7a')}>{p.is_visible ? 'Hide' : 'Show'}</button>
                <button onClick={() => deletePainting(p)} style={s.smallBtn('#dc2626')}>Del</button>
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
              {editItem ? 'Edit Painting' : 'Add New Painting'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Image upload */}
              <div>
                <label style={s.label}>Painting Image</label>
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />}
                <div
                  onClick={() => fileRef.current.click()}
                  style={{ border: '2px dashed #f5e6d3', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdf8f3' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c17f47'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f5e6d3'; }}
                >
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', margin: 0 }}>
                    {imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WebP)'}
                  </p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </div>

              {/* Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Morning Bloom" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Medium *</label>
                  <select value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput}>
                    {MEDIUMS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Size *</label>
                  <input required value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} placeholder="12×16 inch" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Price *</label>
                  <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="₹8,500" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
              </div>

              {error && <div style={s.errorBox}>{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={saving} style={s.primaryBtn}>{saving ? 'Saving...' : editItem ? 'Save Changes' : 'Upload Painting'}</button>
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
  loading: { fontFamily: "'Jost', sans-serif", color: '#8a7060', padding: '2rem', textAlign: 'center' },
  empty: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', padding: '3rem', textAlign: 'center', border: '2px dashed #f5e6d3', borderRadius: 16 },
  primaryBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', cursor: 'pointer', letterSpacing: '0.04em' },
  ghostBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: 'transparent', color: '#8a7060', border: '1px solid #f5e6d3', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  smallBtn: (color) => ({ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: color + '15', color, border: `1px solid ${color}40`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', flex: 1 }),
  label: { fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 5 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block' },
  focusInput: (e) => { e.target.style.borderColor = '#c17f47'; },
  blurInput: (e) => { e.target.style.borderColor = '#f5e6d3'; },
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto' },
  modal: { backgroundColor: '#fff9f4', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(44,24,16,0.3)' },
};
