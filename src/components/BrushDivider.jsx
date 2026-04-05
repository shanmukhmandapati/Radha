export default function BrushDivider({ flip = false, fromColor = '#fdf8f3', toColor = '#f5e6d3' }) {
  return (
    <div style={{ lineHeight: 0, backgroundColor: fromColor }}>
      <svg
        viewBox="0 0 1440 70"
        fill={toColor}
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 70, transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path d="M0,35 C180,70 360,0 540,35 C720,70 900,0 1080,35 C1260,70 1380,20 1440,35 L1440,70 L0,70 Z" />
      </svg>
    </div>
  );
}
