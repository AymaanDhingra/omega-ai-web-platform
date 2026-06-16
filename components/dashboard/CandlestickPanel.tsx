export function CandlestickPanel({ candles }: { candles: [number, number, number, number][] }) {
  const max = 106;
  const min = 26;
  const scale = (value: number) => 156 - ((value - min) / (max - min)) * 140;

  return (
    <svg viewBox="0 0 560 190" className="h-full w-full" role="img" aria-label="candlestick chart">
      <rect x="0" y="0" width="560" height="190" rx="8" fill="#f8fbf9" />
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="24" x2="536" y1={y} y2={y} stroke="#d8e3dc" strokeDasharray="4 6" />
      ))}
      <path d="M28 148 C88 126, 118 142, 164 104 S252 88, 304 96 S404 42, 528 58" fill="none" stroke="#b7791f" strokeWidth="2" opacity="0.52" />
      {candles.map(([open, high, low, close], index) => {
        const up = close >= open;
        const x = 42 + index * 41;
        const bodyTop = scale(Math.max(open, close));
        const bodyBottom = scale(Math.min(open, close));
        return (
          <g key={`${open}-${index}`}>
            <line x1={x + 10} x2={x + 10} y1={scale(high)} y2={scale(low)} stroke={up ? "#2f9e72" : "#b42318"} strokeWidth="3" strokeLinecap="round" />
            <rect x={x} y={bodyTop} width="20" height={Math.max(bodyBottom - bodyTop, 4)} rx="3" fill={up ? "#2f9e72" : "#b42318"} />
          </g>
        );
      })}
      <line x1="28" x2="532" y1="72" y2="72" stroke="#0f766e" strokeDasharray="8 8" strokeWidth="2" />
    </svg>
  );
}
