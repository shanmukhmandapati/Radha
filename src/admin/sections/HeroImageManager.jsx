import { useState, useRef } from 'react';
import { getLocal, setLocal, imageToBase64, generateId } from '../../lib/storage';

const MAX_SLIDES = 6;

export default function HeroImageManager() {
  const [slides, setSlides] = useState(() => getLocal('heroSlideshow', []));
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const fileRef = useRef();

  const processFiles = async (files) => {
    const remaining = MAX_SLIDES - slides.length;
    if (remaining <= 0) { setError(`Maximum ${MAX_SLIDES} images allowed. Delete some first.`); return; }
    const toProcess = Array.from(files).slice(0, remaining);
    setUploading(true);
    setError('');
    try {
      const newSlides = await Promise.all(
        toProcess.map(async (file) => {
          const b64 = await imageToBase64(file, 900);
          return { id: generateId(), image: b64, title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') };
        })
      );
      setSlides(s => [...s, ...newSlides]);
    } catch {
      setError('One or more images failed to process. Try smaller files.');
    } finally {
      setUploading(false);
      fileRef.current.value = '';
    }
  };

  const handleFileInput = (e) => processFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const updateTitle = (id, title) => {
    setSlides(s => s.map(sl => sl.id === id ? { ...sl, title } : sl));
  };

  const deleteSlide = (id) => {
    setSlides(s => s.filter(sl => sl.id !== id));
  };

  const handleSave = () => {
    setLocal('heroSlideshow', slides);
    window.dispatchEvent(new Event('heroSlideshowUpdated'));
    setSuccess('Slideshow updated! Homepage will show your paintings.');
    setTimeout(() => setSuccess(''), 4000);
  };

  // Drag-to-reorder
  const onDragStart = (i) => setDragIdx(i);
  const onDragOver = (e, i) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const reordered = [...slides];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(i, 0, moved);
    setSlides(reordered);
    setDragIdx(i);
  };
  const onDragEnd = () => setDragIdx(null);

  return (
    <div>
      <h2 style={s.title}>Hero Slideshow Manager</h2>
      <p style={s.subtitle}>Upload up to {MAX_SLIDES} paintings or photos to display in the homepage oval slideshow. Images rotate automatically every 3.5 seconds.</p>

      {/* Upload zone */}
      <div
        onClick={() => fileRef.current.click()}
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{
          border: `2px dashed ${dragOver ? '#c17f47' : '#f5e6d3'}`,
          borderRadius: 16,
          padding: '32px',
          textAlign: 'center',
          cursor: slides.length >= MAX_SLIDES ? 'not-allowed' : 'pointer',
          backgroundColor: dragOver ? 'rgba(193,127,71,0.05)' : '#fdf8f3',
          transition: 'all 0.25s',
          marginTop: '1.5rem',
          opacity: slides.length >= MAX_SLIDES ? 0.5 : 1,
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{uploading ? '⏳' : '📷'}</div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#2c1810', marginBottom: 4 }}>
          {uploading ? 'Processing images...' : slides.length >= MAX_SLIDES ? `Maximum ${MAX_SLIDES} images reached` : 'Drag paintings here or click to upload'}
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#8a7060', margin: 0 }}>
          {slides.length}/{MAX_SLIDES} images · JPG, PNG accepted · Multiple files OK
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileInput}
          disabled={slides.length >= MAX_SLIDES}
        />
      </div>

      {error && <div style={{ ...s.errorBox, marginTop: '1rem' }}>{error}</div>}
      {success && <div style={{ ...s.successBox, marginTop: '1rem' }}>✓ {success}</div>}

      {/* Slides grid */}
      {slides.length > 0 && (
        <div style={{ marginTop: '1.75rem' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#8a7060', marginBottom: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Drag to reorder · First image shows first on homepage
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDragEnd={onDragEnd}
                style={{
                  cursor: 'grab',
                  backgroundColor: '#fff9f4',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: dragIdx === i ? '2px solid #c17f47' : '2px solid #f5e6d3',
                  transition: 'border-color 0.2s, opacity 0.2s',
                  opacity: dragIdx !== null && dragIdx !== i ? 0.7 : 1,
                }}
              >
                {/* Circle preview */}
                <div style={{ position: 'relative', padding: '12px 12px 0' }}>
                  <div style={{
                    width: '100%',
                    paddingBottom: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#f5e6d3',
                  }}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  {/* Order badge */}
                  <div style={{
                    position: 'absolute', top: 8, left: 8,
                    width: 24, height: 24, borderRadius: '50%',
                    backgroundColor: '#c17f47', color: '#fff',
                    fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i + 1}
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteSlide(slide.id); }}
                    style={{
                      position: 'absolute', top: 8, right: 8,
                      width: 24, height: 24, borderRadius: '50%',
                      backgroundColor: '#dc2626', color: '#fff',
                      border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ✕
                  </button>
                  {/* Drag handle */}
                  <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', color: '#8a7060', fontSize: '0.8rem', opacity: 0.6 }}>⋮⋮</div>
                </div>
                {/* Title input */}
                <div style={{ padding: '8px 10px 10px' }}>
                  <input
                    value={slide.title}
                    onChange={e => updateTitle(slide.id, e.target.value)}
                    placeholder="Painting title"
                    style={{
                      width: '100%',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.78rem',
                      color: '#2c1810',
                      backgroundColor: '#fdf8f3',
                      border: '1px solid #f5e6d3',
                      borderRadius: 6,
                      padding: '5px 8px',
                      outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = '#c17f47'}
                    onBlur={e => e.target.style.borderColor = '#f5e6d3'}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            style={{
              marginTop: '1.5rem',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              backgroundColor: '#c17f47',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '13px 32px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(193,127,71,0.3)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#a06535'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#c17f47'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Save Slideshow
          </button>
        </div>
      )}

      {slides.length === 0 && (
        <div style={{ marginTop: '2rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7060', textAlign: 'center', padding: '2rem', border: '2px dashed #f5e6d3', borderRadius: 16 }}>
          No images yet. Upload your first painting above.
        </div>
      )}

      {/* Tips card */}
      <div style={{ backgroundColor: '#fff9f4', border: '1px solid #f5e6d3', borderRadius: 14, padding: '18px 20px', marginTop: '2rem' }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#c17f47', marginBottom: 10 }}>💡 Best painting images for slideshow</p>
        <ul style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.84rem', color: '#8a7060', paddingLeft: 18, margin: 0, lineHeight: 2 }}>
          <li>Use your most beautiful and colorful works</li>
          <li>Square or portrait crops work best in the oval</li>
          <li>Up to 6 paintings rotate every 3.5 seconds</li>
          <li>First image in the list shows when the page loads</li>
          <li>Drag thumbnails to change the display order</li>
        </ul>
      </div>
    </div>
  );
}

const s = {
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2c1810', margin: 0 },
  subtitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#8a7060', marginTop: 6 },
  successBox: { backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#16a34a' },
  errorBox: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: '#dc2626' },
};
