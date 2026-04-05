import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '../lib/supabase';

const enquiryOptions = [
  'Buy a Painting',
  'Book Workshop',
  'Commission Art',
  'General Enquiry',
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', enquiry: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    const { error } = await supabase.from('enquiries').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      enquiry_type: form.enquiry,
      message: form.message,
    });
    setSubmitting(false);
    if (error) {
      setFormError('Something went wrong. Please try WhatsApp or email instead.');
    } else {
      setSubmitted(true);
    }
  };

  const inputStyle = {
    width: '100%',
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.95rem',
    color: '#2c1810',
    backgroundColor: '#fff9f4',
    border: '1.5px solid #f5e6d3',
    borderRadius: 10,
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#8a7060',
    letterSpacing: '0.05em',
    display: 'block',
    marginBottom: 6,
  };

  return (
    <section id="contact" ref={ref} style={{ backgroundColor: '#f5e6d3', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 350, height: 350, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(ellipse, rgba(193,127,71,0.12), transparent)', filter: 'blur(50px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>
            Let's Create Together
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {/* LEFT — Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            style={{ flex: '1 1 340px' }}
          >
            <div style={{ backgroundColor: '#fff9f4', borderRadius: 20, padding: '36px', boxShadow: '0 8px 35px rgba(44,24,16,0.08)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#c17f47', marginBottom: '0.75rem' }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'Jost', sans-serif", color: '#8a7060' }}>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="hello@you.com" style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXXXXXXX" style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>I Want To...</label>
                    <select name="enquiry" value={form.enquiry} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
                    >
                      <option value="">Select an option...</option>
                      {enquiryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell me about your vision..." style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={(e) => { e.target.style.borderColor = '#c17f47'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#f5e6d3'; }}
                    />
                  </div>
                  {formError && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' }}>
                      {formError}
                    </div>
                  )}
                  <button type="submit" disabled={submitting} style={{
                    fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem',
                    backgroundColor: submitting ? '#d4a574' : '#c17f47', color: '#fff', border: 'none', borderRadius: '50px',
                    padding: '14px', cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.06em',
                    boxShadow: '0 6px 22px rgba(193,127,71,0.35)', transition: 'all 0.3s',
                  }}
                    onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.backgroundColor = '#8b5e3c'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                    onMouseLeave={(e) => { if (!submitting) { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                  >
                    {submitting ? 'Sending...' : 'Send Message ✦'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                backgroundColor: '#25d366',
                color: '#fff',
                borderRadius: 16,
                padding: '18px 22px',
                textDecoration: 'none',
                boxShadow: '0 6px 25px rgba(37,211,102,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(37,211,102,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(37,211,102,0.3)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '1rem' }}>Chat on WhatsApp</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', opacity: 0.9 }}>+91 XXXXXXXXXX</div>
              </div>
            </a>

            {/* Contact details */}
            {[
              { icon: '✉️', label: 'Email', value: 'hello@artistname.com', href: 'mailto:hello@artistname.com' },
              { icon: '📸', label: 'Instagram', value: '@artistname', href: '#' },
              { icon: '📍', label: 'Location', value: 'Hyderabad, India', href: null },
            ].map((item) => (
              <div key={item.label} style={{ backgroundColor: '#fff9f4', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 3px 15px rgba(44,24,16,0.06)', border: '1px solid #f5e6d3' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#8a7060', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: '#c17f47', textDecoration: 'none' }}>{item.value}</a>
                  ) : (
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: '#2c1810' }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Commission card */}
            <div style={{
              backgroundColor: '#fff9f4',
              borderRadius: 16,
              padding: '24px',
              border: '1px solid #f5e6d3',
              boxShadow: '0 4px 20px rgba(193,127,71,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', opacity: 0.8 }} />
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🖌️</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#2c1810', marginBottom: '0.5rem' }}>Commission a Painting</h4>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', marginBottom: '1rem', lineHeight: 1.65 }}>
                Want something truly unique? Let's co-create your dream painting together.
              </p>
              <button
                style={{
                  fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                  backgroundColor: '#8b5e3c', color: '#fff', border: 'none', borderRadius: '50px',
                  padding: '10px 22px', cursor: 'pointer', letterSpacing: '0.04em', transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c17f47'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#8b5e3c'; }}
              >
                Start a Commission
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
