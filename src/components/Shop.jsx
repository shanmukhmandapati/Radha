import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getLocal } from '../lib/storage';

const staticProducts = [
  { id: 's1', name: 'The Golden Lotus', medium: 'Watercolor', size: '12×16 inch', price: '₹9,500', gradient: 'linear-gradient(145deg, #f5d08a, #e8956a, #c17f47)', available: true },
  { id: 's2', name: 'Monsoon Melody', medium: 'Acrylic', size: '16×20 inch', price: '₹15,000', gradient: 'linear-gradient(145deg, #8ec9d0, #5a9eb8, #3d6e8a)', available: true },
  { id: 's3', name: 'Temple Bells', medium: 'Acrylic', size: '18×24 inch', price: '₹22,000', gradient: 'linear-gradient(145deg, #e87878, #c04848, #8a2828)', available: false },
  { id: 's4', name: 'Evening Raga', medium: 'Watercolor', size: '10×14 inch', price: '₹7,000', gradient: 'linear-gradient(145deg, #c0a8d8, #9070b8, #604888)', available: true },
];

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const sold = product.available === false;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: '1 1 220px', backgroundColor: '#fff9f4', borderRadius: 20, overflow: 'hidden', boxShadow: hovered ? '0 20px 50px rgba(193,127,71,0.2)' : '0 4px 20px rgba(44,24,16,0.08)', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', transition: 'all 0.4s ease', position: 'relative' }}
    >
      {sold && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(253,248,243,0.75)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#2c1810', color: '#fdf8f3', padding: '10px 24px', borderRadius: 4, fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', transform: 'rotate(-15deg)' }}>Sold Out</div>
        </div>
      )}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', backgroundColor: '#f5e6d3' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 55%)', transition: 'opacity 0.3s', opacity: hovered ? 0.6 : 0.4, zIndex: 1 }} />
        {product.image ? (
          <motion.img src={product.image} alt={product.name} animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <motion.div animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', height: '100%', background: product.gradient || 'linear-gradient(145deg, #f5c9a0, #e8956a)' }} />
        )}
        <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(253,248,243,0.92)', borderRadius: 20, padding: '3px 10px', fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 600, color: '#8b5e3c', border: '1px solid #f5e6d3' }}>
          ✓ Certificate Included
        </div>
      </div>
      <div style={{ padding: '18px 18px 22px' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: '#2c1810', marginBottom: 4 }}>{product.name}</h3>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#8a7060', marginBottom: '1rem' }}>{product.medium} · {product.size}</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#c17f47', marginBottom: '1.25rem' }}>{product.price}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button disabled={sold} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem', backgroundColor: sold ? '#e0d4c8' : '#c17f47', color: '#fff', border: 'none', borderRadius: '50px', padding: '10px 20px', cursor: sold ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => { if (!sold) e.currentTarget.style.backgroundColor = '#8b5e3c'; }}
            onMouseLeave={(e) => { if (!sold) e.currentTarget.style.backgroundColor = '#c17f47'; }}>
            {sold ? 'Sold Out' : 'Add to Cart'}
          </button>
          {!sold && (
            <button style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.82rem', backgroundColor: '#25d366', color: '#fff', border: 'none', borderRadius: '50px', padding: '10px 20px', cursor: 'pointer', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1ebe5d'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25d366'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Enquire on WhatsApp
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState(() => {
    const stored = getLocal('shopPaintings', []);
    return stored.length > 0 ? stored : staticProducts;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const sync = () => {
      const stored = getLocal('shopPaintings', []);
      setProducts(stored.length > 0 ? stored : staticProducts);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <section id="shop" ref={ref} style={{ backgroundColor: '#fdf8f3', padding: '80px 7%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', filter: 'blur(60px)', opacity: 0.6 }} />
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', fontWeight: 500, color: '#c17f47', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Art for Sale</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>
            Take <span className="gradient-text">Art</span> Home
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.15rem', color: '#8a7060', maxWidth: 520, margin: '0 auto' }}>
            Original paintings available for purchase. Each piece comes with a certificate of authenticity.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '3rem' }}>
          {products.map((p, i) => (
            <ProductCard key={p.id || p.name} product={p} index={i} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} style={{ marginTop: '4rem', backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 20, padding: '36px 40px', textAlign: 'center', boxShadow: '0 6px 30px rgba(193,127,71,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(ellipse, #f5e6d3, transparent)', opacity: 0.8 }} />
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🖌️</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', marginBottom: '0.75rem' }}>Commission a Custom Painting</h3>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '1rem', color: '#8a7060', marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
            Have a vision in mind? I'd love to create a one-of-a-kind painting just for you.
          </p>
          <button
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', backgroundColor: '#c17f47', color: '#fff', border: 'none', borderRadius: '50px', padding: '13px 32px', cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '0 6px 22px rgba(193,127,71,0.35)', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8b5e3c'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Discuss Your Vision
          </button>
        </motion.div>
      </div>
    </section>
  );
}
