import { useState, useRef } from 'react';
import { getLocal, setLocal, imageToBase64, DEFAULT_PROFILE } from '../../lib/storage';

export default function ProfileManager() {
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...getLocal('artistProfile', {}) }));
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef();

  const set = (key) => (e) => setProfile(p => ({ ...p, [key]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    const ok = setLocal('artistProfile', profile);
    setTimeout(() => {
      setSaving(false);
      if (ok) {
        window.dispatchEvent(new Event('profileUpdated'));
        setSuccess('Profile saved! Changes are live on your website.');
        setTimeout(() => setSuccess(''), 4000);
      } else {
        setError('Save failed. Storage might be full.');
      }
    }, 400);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const base64 = await imageToBase64(file, 700);
      const updated = { ...profile, photo: base64 };
      setProfile(updated);
      setLocal('artistProfile', updated);
      window.dispatchEvent(new Event('profileUpdated'));
      setSuccess('Photo updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch { setError('Photo upload failed.'); }
    finally { setPhotoUploading(false); e.target.value = ''; }
  };

  return (
    <div>
      <h2 style={s.title}>Artist Profile</h2>
      <p style={s.subtitle}>Everything here appears live on your website.</p>

      <form onSubmit={handleSave} style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* LEFT — Photo + Contact */}
          <div>
            <h3 style={s.sectionHead}>Profile Photo</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '3px solid #f5e6d3', backgroundColor: '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {profile.photo ? (
                  <img src={profile.photo} alt="Artist" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : <span style={{ fontSize: '2.5rem' }}>👩‍🎨</span>}
              </div>
              <div>
                <button type="button" onClick={() => fileRef.current.click()} style={{ ...s.primaryBtn, display: 'block', marginBottom: 8 }}>
                  {photoUploading ? 'Uploading...' : '📷 Upload Photo'}
                </button>
                {profile.photo && (
                  <button type="button" onClick={() => { setProfile(p => ({ ...p, photo: '' })); }} style={s.ghostBtn}>Remove</button>
                )}
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
              </div>
            </div>

            <h3 style={s.sectionHead}>Identity</h3>
            <Field label="Artist Name" value={profile.artist_name} onChange={set('artist_name')} placeholder="Radha Rani" />
            <Field label="Tagline" value={profile.tagline} onChange={set('tagline')} placeholder="Painter · Teacher · Creator" />

            <h3 style={{ ...s.sectionHead, marginTop: '1.5rem' }}>Contact Details</h3>
            <Field label="WhatsApp (with country code)" value={profile.whatsapp} onChange={set('whatsapp')} placeholder="919XXXXXXXXX" />
            <Field label="Email" value={profile.email} onChange={set('email')} placeholder="hello@radharani.com" />
            <Field label="Instagram Handle" value={profile.instagram} onChange={set('instagram')} placeholder="@radharaniart" />
            <Field label="YouTube Channel URL" value={profile.youtube} onChange={set('youtube')} placeholder="https://youtube.com/@radharaniart" />
            <Field label="Facebook Page URL" value={profile.facebook} onChange={set('facebook')} placeholder="https://facebook.com/radharaniart" />
            <Field label="Location / City" value={profile.location} onChange={set('location')} placeholder="Hyderabad, India" />
          </div>

          {/* RIGHT — Bio + Stats */}
          <div>
            <h3 style={s.sectionHead}>Artist Bio</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.fieldLabel}>Bio Paragraph 1</label>
              <textarea value={profile.bio_1} onChange={set('bio_1')} rows={4} style={{ ...s.input, resize: 'vertical' }}
                onFocus={e => { e.target.style.borderColor = '#c17f47'; }} onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.fieldLabel}>Bio Paragraph 2</label>
              <textarea value={profile.bio_2} onChange={set('bio_2')} rows={4} style={{ ...s.input, resize: 'vertical' }}
                onFocus={e => { e.target.style.borderColor = '#c17f47'; }} onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }} />
            </div>

            <h3 style={{ ...s.sectionHead, marginTop: '1.5rem' }}>Stats (shown on website)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Field label="Paintings Created" value={profile.paintings_count} onChange={set('paintings_count')} placeholder="200+" />
              <Field label="Students Taught" value={profile.students_count} onChange={set('students_count')} placeholder="1500+" />
              <Field label="Workshops Done" value={profile.workshops_count} onChange={set('workshops_count')} placeholder="80+" />
              <Field label="Years Experience" value={profile.years_experience} onChange={set('years_experience')} placeholder="10+" />
            </div>
          </div>
        </div>

        {success && <div style={{ ...s.successBox, marginTop: '1.5rem' }}>✓ {success}</div>}
        {error && <div style={{ ...s.errorBox, marginTop: '1.5rem' }}>{error}</div>}

        <button type="submit" disabled={saving} style={{ ...s.primaryBtn, marginTop: '1.5rem', padding: '13px 32px' }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', display: 'block', marginBottom: 5, letterSpacing: '0.04em' }}>{label}</label>
      <input value={value || ''} onChange={onChange} placeholder={placeholder} style={{ width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block', transition: 'border-color 0.3s' }}
        onFocus={e => { e.target.style.borderColor = '#c17f47'; }}
        onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }} />
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', marginTop: 6 },
  sectionHead: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: '#2c1810', marginBottom: '0.9rem' },
  fieldLabel: { fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#8a7060', display: 'block', marginBottom: 5 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 8, padding: '10px 14px', outline: 'none', display: 'block' },
  primaryBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.88rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', cursor: 'pointer' },
  ghostBtn: { fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.82rem', backgroundColor: 'transparent', color: '#8a7060', border: '1px solid #f5e6d3', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' },
  successBox: { backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' },
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' },
};
