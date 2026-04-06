import { useState, useEffect, useRef, useCallback } from 'react';
import { getLocal } from '../lib/storage';

const PLACEHOLDERS = [
  { id: 'p1', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', title: 'Morning Bloom' },
  { id: 'p2', gradient: 'linear-gradient(135deg, #f6d365, #fda085)', title: 'Golden Hour' },
  { id: 'p3', gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', title: 'Serenity' },
  { id: 'p4', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)', title: 'Forest Path' },
  { id: 'p5', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', title: 'Twilight Reverie' },
];

export default function HeroSlideshow() {
  const [slides, setSlides] = useState(() => {
    const stored = getLocal('heroSlideshow', []);
    return stored.length > 0 ? stored : PLACEHOLDERS;
  });
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const timerRef = useRef(null);
  const transitionRef = useRef(false);

  const goTo = useCallback((idx) => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
      setTimeout(() => { transitionRef.current = false; }, 800);
    }, 400);
  }, []);

  const next = useCallback(() => {
    setSlides(s => {
      const nextIdx = (current + 1) % s.length;
      goTo(nextIdx);
      return s;
    });
  }, [current, goTo]);

  const prev = useCallback(() => {
    setSlides(s => {
      const prevIdx = (current - 1 + s.length) % s.length;
      goTo(prevIdx);
      return s;
    });
  }, [current, goTo]);

  useEffect(() => {
    const sync = () => {
      const stored = getLocal('heroSlideshow', []);
      const list = stored.length > 0 ? stored : PLACEHOLDERS;
      setSlides(list);
      setCurrent(0);
    };
    window.addEventListener('heroSlideshowUpdated', sync);
    return () => window.removeEventListener('heroSlideshowUpdated', sync);
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setSlides(s => {
        const nextIdx = (current + 1) % s.length;
        goTo(nextIdx);
        return s;
      });
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [paused, current, slides.length, goTo]);

  const slide = slides[current] || slides[0];

  return (
    <>
      <style>{`
        @keyframes ovalFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {/* Rings + oval container */}
        <div style={{ position: 'relative' }}>
          {/* Ring 3 — outermost */}
          <div style={{
            position: 'absolute',
            inset: -24,
            borderRadius: '50%',
            border: '1px solid rgba(193,127,71,0.15)',
            pointerEvents: 'none',
          }} />
          {/* Ring 2 — dashed */}
          <div style={{
            position: 'absolute',
            inset: -12,
            borderRadius: '50%',
            border: '1px dashed rgba(193,127,71,0.3)',
            pointerEvents: 'none',
          }} />

          {/* Float wrapper */}
          <div
            style={{ animation: 'ovalFloat 4s ease-in-out infinite', position: 'relative' }}
            onMouseEnter={() => { setPaused(true); setShowArrows(true); }}
            onMouseLeave={() => { setPaused(false); setShowArrows(false); }}
          >
            {/* Left arrow */}
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: -18, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(193,127,71,0.3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, opacity: showArrows ? 1 : 0,
                transition: 'opacity 0.2s ease',
                boxShadow: '0 2px 12px rgba(44,24,16,0.12)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c17f47" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Oval frame — Ring 1 (innermost border) */}
            <div style={{
              width: 'clamp(300px, 38vw, 460px)',
              height: 'clamp(300px, 38vw, 460px)',
              borderRadius: '50%',
              border: '2px solid rgba(193,127,71,0.5)',
              boxShadow: '0 40px 100px rgba(193,127,71,0.3), 0 0 0 8px rgba(193,127,71,0.05), 0 0 0 20px rgba(193,127,71,0.03)',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#f5e6d3',
            }}>
              {/* Slide content with crossfade */}
              <div style={{
                position: 'absolute', inset: 0,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}>
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.title || 'Artwork'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: slide.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.3) 0%, transparent 55%)' }} />
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      color: 'rgba(255,255,255,0.92)',
                      zIndex: 1,
                      textAlign: 'center',
                      padding: '0 30px',
                      textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    }}>
                      {slide.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              style={{
                position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(193,127,71,0.3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, opacity: showArrows ? 1 : 0,
                transition: 'opacity 0.2s ease',
                boxShadow: '0 2px 12px rgba(44,24,16,0.12)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c17f47" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Dots navigation */}
        {slides.length > 1 && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  padding: 0, cursor: 'pointer',
                  backgroundColor: i === current ? '#c17f47' : 'transparent',
                  border: i === current ? 'none' : '1.5px solid #c17f47',
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
