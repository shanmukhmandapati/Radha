import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_PASSWORD = 'radharani2025';

const getPassword = () => localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (password === getPassword()) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setResetError('');
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }
    localStorage.setItem('adminPassword', newPassword);
    setResetSuccess('Password updated! You can now log in with your new password.');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setShowForgot(false);
      setResetSuccess('');
      setShowCurrent(false);
    }, 2500);
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

        {/* ── LOGIN FORM ── */}
        {!showForgot ? (
          <>
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
                <div style={s.errorBox}>{error}</div>
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

            {/* Forgot password link */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <button
                onClick={() => { setShowForgot(true); setError(''); }}
                style={{
                  fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', fontWeight: 500,
                  color: '#c17f47', background: 'none', border: 'none',
                  cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted',
                  textUnderlineOffset: 3, opacity: 0.8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
              >
                Forgot password?
              </button>
            </div>
          </>
        ) : (
          /* ── RESET PANEL ── */
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#2c1810', marginBottom: 6 }}>Reset Password</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#8a7060' }}>
                Set a new password for your admin studio.
              </p>
            </div>

            {/* Show current password */}
            <div style={{ backgroundColor: '#fdf8f3', border: '1px solid #f5e6d3', borderRadius: 10, padding: '12px 16px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060' }}>
                  Current password:{' '}
                  <span style={{ fontFamily: 'monospace', color: '#2c1810', letterSpacing: 2 }}>
                    {showCurrent ? getPassword() : '••••••••••••'}
                  </span>
                </span>
                <button
                  onClick={() => setShowCurrent(v => !v)}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#c17f47', background: 'none', border: 'none', cursor: 'pointer', paddingLeft: 10 }}
                >
                  {showCurrent ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {resetSuccess ? (
              <div style={s.successBox}>{resetSuccess}</div>
            ) : (
              <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={s.label}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value); setResetError(''); }}
                    required
                    placeholder="Min. 6 characters"
                    autoFocus
                    style={s.input}
                    onFocus={e => { e.target.style.borderColor = '#c17f47'; }}
                    onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }}
                  />
                </div>
                <div>
                  <label style={s.label}>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setResetError(''); }}
                    required
                    placeholder="Repeat new password"
                    style={s.input}
                    onFocus={e => { e.target.style.borderColor = '#c17f47'; }}
                    onBlur={e => { e.target.style.borderColor = '#f5e6d3'; }}
                  />
                </div>

                {resetError && <div style={s.errorBox}>{resetError}</div>}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1, fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.9rem',
                      backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: '50px',
                      padding: '13px', cursor: 'pointer', letterSpacing: '0.05em',
                      boxShadow: '0 6px 22px rgba(193,127,71,0.3)', transition: 'background-color 0.25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8b5e3c'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#c17f47'}
                  >
                    Save New Password
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForgot(false); setNewPassword(''); setConfirmPassword(''); setResetError(''); setShowCurrent(false); }}
                    style={{
                      fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.9rem',
                      backgroundColor: 'transparent', color: '#8a7060',
                      border: '1px solid #f5e6d3', borderRadius: '50px',
                      padding: '13px 20px', cursor: 'pointer', transition: 'border-color 0.25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#c17f47'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#f5e6d3'}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}

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
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' },
  successBox: { backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '12px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' },
};
