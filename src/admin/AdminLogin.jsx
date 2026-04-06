import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PASSWORD = 'radharani2025';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (password === PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf8f3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background blobs */}
      <div style={{ position: 'fixed', top: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(193,127,71,0.12), transparent)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -60, right: -60, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,154,158,0.1), transparent)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, backgroundColor: '#fff9f4', borderRadius: 24, padding: '44px 40px', boxShadow: '0 20px 60px rgba(44,24,16,0.1)', border: '1px solid #f5e6d3' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '2rem', fontWeight: 700, color: '#c17f47' }}>
            Radha Rani
          </div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: '#8a7060', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 6 }}>
            Admin Studio
          </div>
          <div style={{ width: 40, height: 2, background: 'linear-gradient(to right, #c17f47, #e8a87c)', borderRadius: 2, margin: '12px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={s.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              required
              placeholder="Enter studio password"
              autoFocus
              style={s.input}
              onFocus={e => { e.target.style.borderColor = '#c17f47'; }}
              onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }}
            />
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.97rem',
              backgroundColor: loading ? '#d4a574' : '#c17f47',
              color: '#fff', border: 'none', borderRadius: '50px',
              padding: '14px', cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.08em', boxShadow: '0 6px 22px rgba(193,127,71,0.35)',
              transition: 'all 0.3s', marginTop: '0.25rem',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#8b5e3c'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#c17f47'; }}
          >
            {loading ? 'Opening Studio...' : '🎨 Enter Studio'}
          </button>
        </form>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.92rem', color: '#8a7060', textAlign: 'center', marginTop: '1.75rem' }}>
          Your creative space awaits.
        </p>
      </div>
    </div>
  );
}

const s = {
  label: { fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 7 },
  input: { width: '100%', fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', color: '#2c1810', backgroundColor: '#fdf8f3', border: '1.5px solid #f5e6d3', borderRadius: 10, padding: '12px 16px', outline: 'none', display: 'block', transition: 'border-color 0.3s' },
};
