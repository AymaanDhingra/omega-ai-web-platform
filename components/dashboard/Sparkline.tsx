export function Sparkline({ data, stroke = "#0f766e", fill = false }: { data: number[]; stroke?: string; fill?: boolean }) {
  const width = 240;
  const height = 84;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const safeRange = Math.max(max - min, 1);
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const y = height - ((value - min) / safeRange) * (height - 12) - 6;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;
  const gradientId = `gradient-${stroke.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label="performance curve">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill ? <polygon points={area} fill={`url(#${gradientId})`} /> : null}
      <polyline points={points} fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}
