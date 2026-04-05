import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Floating WhatsApp button — desktop & mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 999 }}
      >
        <motion.a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            backgroundColor: '#25d366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 6px 25px rgba(37,211,102,0.45)',
            position: 'relative',
          }}
        >
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid #25d366',
            }}
          />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                right: 68,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#2c1810',
                color: '#fdf8f3',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 500,
                borderRadius: 8,
                padding: '6px 12px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(44,24,16,0.2)',
              }}
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile sticky bottom bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
        className="lg:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 998,
          backgroundColor: '#fff9f4',
          borderTop: '1px solid #f5e6d3',
          padding: '12px 16px',
          boxShadow: '0 -4px 20px rgba(44,24,16,0.1)',
        }}
      >
        <a
          href="#workshops"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('workshops')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            backgroundColor: '#c17f47',
            color: '#fff',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            borderRadius: 12,
            padding: '14px',
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(193,127,71,0.35)',
          }}
        >
          🎨 Book a Workshop
        </a>
      </motion.div>
    </>
  );
}
