import { useState, useEffect, useRef } from 'react';
import { supabase, uploadImage, deleteImage } from '../lib/supabase';

const MEDIUMS = ['Watercolor', 'Acrylic', 'Oil', 'Mixed Media', 'Pencil'];
const BUCKET = 'shop';
const emptyForm = { name: '', medium: 'Watercolor', size: '', price: '', is_sold: false, display_order: 0 };

export default function ShopManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('shop_products').select('*').order('display_order');
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setImageFile(null); setImagePreview(''); setError(''); setShowForm(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ name: p.name, medium: p.medium, size: p.size, price: p.price, is_sold: p.is_sold, display_order: p.display_order }); setImageFile(null); setImagePreview(p.image_url || ''); setError(''); setShowForm(true); };
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
        if (editItem?.image_url) await deleteImage(BUCKET, editItem.image_url);
        const { publicUrl } = await uploadImage(BUCKET, imageFile);
        image_url = publicUrl;
      }
      const payload = { ...form, price: form.price.startsWith('₹') ? form.price : `₹${form.price}`, image_url };
      if (editItem) {
        await supabase.from('shop_products').update(payload).eq('id', editItem.id);
      } else {
        await supabase.from('shop_products').insert(payload);
      }
      await fetchProducts();
      closeForm();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSold = async (p) => {
    await supabase.from('shop_products').update({ is_sold: !p.is_sold }).eq('id', p.id);
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_sold: !x.is_sold } : x));
  };

  const toggleVisible = async (p) => {
    await supabase.from('shop_products').update({ is_visible: !p.is_visible }).eq('id', p.id);
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_visible: !x.is_visible } : x));
  };

  const deleteProduct = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    if (p.image_url) await deleteImage(BUCKET, p.image_url);
    await supabase.from('shop_products').delete().eq('id', p.id);
    setProducts(prev => prev.filter(x => x.id !== p.id));
  };

  if (loading) return <div style={s.loading}>Loading products...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={s.title}>Shop / Art for Sale</h2>
          <p style={s.subtitle}>{products.length} products · {products.filter(p => p.is_sold).length} sold out</p>
        </div>
        <button onClick={openAdd} style={s.primaryBtn}>+ Add Product</button>
      </div>

      {products.length === 0 && !showForm && (
        <div style={s.empty}>No products yet. Add paintings to the shop.</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff9f4', borderRadius: 14, overflow: 'hidden', border: '1px solid #f5e6d3', opacity: p.is_visible ? 1 : 0.5, position: 'relative' }}>
            {p.is_sold && (
              <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, backgroundColor: '#2c1810', color: '#fdf8f3', fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 700, borderRadius: 20, padding: '3px 10px', letterSpacing: '0.08em' }}>SOLD OUT</div>
            )}
            <div style={{ height: 150, backgroundColor: '#f5e6d3', overflow: 'hidden' }}>
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a7060', fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }}>No image</div>
              )}
            </div>
            <div style={{ padding: '12px' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 600, color: '#2c1810', marginBottom: 2 }}>{p.name}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', marginBottom: 6 }}>{p.medium} · {p.size}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#c17f47', marginBottom: 10 }}>{p.price}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button onClick={() => openEdit(p)} style={s.smallBtn('#c17f47')}>Edit</button>
                <button onClick={() => toggleSold(p)} style={s.smallBtn(p.is_sold ? '#5a8a7a' : '#8b5e3c')}>{p.is_sold ? 'Unmark Sold' : 'Mark Sold'}</button>
                <button onClick={() => toggleVisible(p)} style={s.smallBtn('#8a7060')}>{p.is_visible ? 'Hide' : 'Show'}</button>
                <button onClick={() => deleteProduct(p)} style={s.smallBtn('#dc2626')}>Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#2c1810', marginBottom: '1.5rem' }}>
              {editItem ? 'Edit Product' : 'Add Product for Sale'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Image */}
              <div>
                <label style={s.label}>Product Image</label>
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />}
                <div onClick={() => fileRef.current.click()} style={{ border: '2px dashed #f5e6d3', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdf8f3' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c17f47'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f5e6d3'; }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', margin: 0 }}>
                    {imageFile ? imageFile.name : 'Click to upload image'}
                  </p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={s.label}>Painting Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="The Golden Lotus" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Medium *</label>
                  <select value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput}>
                    {MEDIUMS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Size *</label>
                  <input required value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} placeholder="12×16 inch" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Price *</label>
                  <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="₹9,500" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div>
                  <label style={s.label}>Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
                  <input type="checkbox" id="is_sold" checked={form.is_sold} onChange={e => setForm(f => ({ ...f, is_sold: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#c17f47' }} />
                  <label htmlFor="is_sold" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#2c1810', cursor: 'pointer' }}>Mark as Sold Out</label>
                </div>
              </div>

              {error && <div style={s.errorBox}>{error}</div>}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={saving} style={s.primaryBtn}>{saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add to Shop'}</button>
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
  primaryBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  ghostBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: 'transparent', color: '#8a7060', border: '1px solid #f5e6d3', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  smallBtn: (color) => ({ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 600, backgroundColor: color + '15', color, border: `1px solid ${color}40`, borderRadius: 6, padding: '4px 8px', cursor: 'pointer', flex: 1 }),
  label: { fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 5 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block' },
  focusInput: (e) => { e.target.style.borderColor = '#c17f47'; },
  blurInput: (e) => { e.target.style.borderColor = '#f5e6d3'; },
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto' },
  modal: { backgroundColor: '#fff9f4', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(44,24,16,0.3)' },
};
