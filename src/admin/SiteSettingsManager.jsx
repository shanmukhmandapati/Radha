import { useState, useEffect, useRef } from 'react';
import { supabase, uploadImage, deleteImage } from '../lib/supabase';
import { useSiteSettings } from '../lib/SiteSettingsContext';

const BUCKET = 'artist-photo';

export default function SiteSettingsManager() {
  const { settings: globalSettings, setSettings: setGlobalSettings } = useSiteSettings();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef();

  // Derive preview directly from settings (local or global)
  const photoPreview = settings.artist_photo_url || globalSettings.artist_photo_url || '';

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');
    if (data) {
      const map = {};
      data.forEach(row => { map[row.key] = row.value; });
      setSettings(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const rows = Object.entries(settings).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
      const { error: upsertErr } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
      if (upsertErr) throw upsertErr;
      // Push changes into global context so website updates instantly
      setGlobalSettings(prev => ({ ...prev, ...settings }));
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    setError('');
    try {
      if (settings.artist_photo_url) await deleteImage(BUCKET, settings.artist_photo_url);
      const { publicUrl } = await uploadImage(BUCKET, file);
      // Update local state (photoPreview is derived from this)
      setSettings(prev => ({ ...prev, artist_photo_url: publicUrl }));
      // Save to DB
      await supabase.from('site_settings').upsert(
        [{ key: 'artist_photo_url', value: publicUrl, updated_at: new Date().toISOString() }],
        { onConflict: 'key' }
      );
      // Push to global context so website updates instantly
      setGlobalSettings(prev => ({ ...prev, artist_photo_url: publicUrl }));
      setSuccess('Photo uploaded! ✓');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading) return <div style={s.loading}>Loading settings...</div>;

  const set = (key) => (e) => setSettings(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <h2 style={s.title}>Site Settings</h2>
      <p style={s.subtitle}>Artist profile, photo, bio and stats shown on the website.</p>

      <form onSubmit={handleSave} style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* LEFT — Photo */}
          <div>
            <h3 style={s.sectionHead}>Artist Photo</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              {/* Current photo */}
              <div style={{ width: 180, height: 180, borderRadius: '50%', overflow: 'hidden', border: '3px solid #f5e6d3', marginBottom: '0.75rem', backgroundColor: '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Artist"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <span style={{ fontSize: '3rem', display: photoPreview ? 'none' : 'flex' }}>👩‍🎨</span>
              </div>

              {/* Debug: show saved URL */}
              {photoPreview && (
                <div style={{ marginBottom: '0.75rem', maxWidth: 300 }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#8a7060', marginBottom: 3 }}>Saved URL:</p>
                  <a href={photoPreview} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#c17f47', wordBreak: 'break-all', display: 'block' }}>
                    {photoPreview}
                  </a>
                </div>
              )}

              <div
                onClick={() => fileRef.current.click()}
                style={{ border: '2px dashed #f5e6d3', borderRadius: 12, padding: '16px 20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fdf8f3', maxWidth: 300 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c17f47'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f5e6d3'; }}
              >
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060', margin: 0 }}>
                  {photoUploading ? 'Uploading...' : '📷 Click to upload artist photo'}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', opacity: 0.7, margin: '4px 0 0' }}>
                  JPG / PNG · Recommended: 600×600 px
                </p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
            </div>

            {/* Stats */}
            <h3 style={s.sectionHead}>Statistics</h3>
            {[
              { key: 'paintings_count', label: 'Paintings Created' },
              { key: 'students_count', label: 'Students Taught' },
              { key: 'workshops_count', label: 'Workshops Conducted' },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <label style={s.label}>{label}</label>
                <input value={settings[key] || ''} onChange={set(key)} placeholder="200+" style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
              </div>
            ))}
          </div>

          {/* RIGHT — Bio */}
          <div>
            <h3 style={s.sectionHead}>Artist Identity</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.label}>Artist Name (shown on website)</label>
              <input
                value={settings.artist_name || ''}
                onChange={set('artist_name')}
                placeholder="Radha Rani"
                style={s.input}
                onFocus={s.focusInput}
                onBlur={s.blurInput}
              />
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', marginTop: 5 }}>
                Appears in the navbar logo, About section, and footer.
              </p>
            </div>

            <h3 style={{ ...s.sectionHead, marginTop: '1.5rem' }}>Artist Bio</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.label}>Bio Paragraph 1</label>
              <textarea value={settings.artist_bio_1 || ''} onChange={set('artist_bio_1')} rows={4} style={{ ...s.input, resize: 'vertical' }} onFocus={s.focusInput} onBlur={s.blurInput} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.label}>Bio Paragraph 2</label>
              <textarea value={settings.artist_bio_2 || ''} onChange={set('artist_bio_2')} rows={4} style={{ ...s.input, resize: 'vertical' }} onFocus={s.focusInput} onBlur={s.blurInput} />
            </div>

            {/* Custom fields */}
            <h3 style={{ ...s.sectionHead, marginTop: '1.5rem' }}>Additional Info</h3>
            {[
              { key: 'whatsapp_number', label: 'WhatsApp Number (with country code)', placeholder: '919XXXXXXXXX' },
              { key: 'email', label: 'Contact Email', placeholder: 'hello@artistname.com' },
              { key: 'instagram', label: 'Instagram Handle', placeholder: '@artistname' },
              { key: 'location', label: 'Location', placeholder: 'Hyderabad, India' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <label style={s.label}>{label}</label>
                <input value={settings[key] || ''} onChange={set(key)} placeholder={placeholder} style={s.input} onFocus={s.focusInput} onBlur={s.blurInput} />
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {error && <div style={s.errorBox}>{error}</div>}
        {success && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a', marginTop: '1rem' }}>
            ✓ {success}
          </div>
        )}

        <button type="submit" disabled={saving} style={{ ...s.primaryBtn, marginTop: '1.5rem' }}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060', marginTop: 4 },
  sectionHead: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: '#2c1810', marginBottom: '1rem' },
  loading: { fontFamily: "'Jost', sans-serif", color: '#8a7060', padding: '2rem', textAlign: 'center' },
  primaryBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.9rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', cursor: 'pointer' },
  label: { fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 5 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block' },
  focusInput: (e) => { e.target.style.borderColor = '#c17f47'; },
  blurInput: (e) => { e.target.style.borderColor = '#f5e6d3'; },
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626', marginTop: '1rem' },
};
