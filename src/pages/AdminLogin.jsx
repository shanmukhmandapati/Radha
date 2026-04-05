import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  const inputStyle = {
    width: '100%',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.95rem',
    color: '#2c1810',
    backgroundColor: '#fdf8f3',
    border: '1.5px solid #f5e6d3',
    borderRadius: 10,
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf8f3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      {/* Background blob */}
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: 400, height: 400, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: 350, height: 350, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, backgroundColor: '#fff9f4', borderRadius: 24, padding: '40px 36px', boxShadow: '0 20px 60px rgba(44,24,16,0.1)', border: '1px solid #f5e6d3', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '2rem', fontWeight: 700, color: '#c17f47' }}>
            Radha Rani
          </div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>
            Admin Portal
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#8a7060', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
            />
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              backgroundColor: loading ? '#d4a574' : '#c17f47',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '13px',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.06em',
              transition: 'background-color 0.3s',
              marginTop: '0.5rem',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#8b5e3c'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#c17f47'; }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#8a7060', textAlign: 'center', marginTop: '1.5rem' }}>
          Create your admin account in Supabase Dashboard → Authentication → Users
        </p>
      </div>
    </div>
  );
}
