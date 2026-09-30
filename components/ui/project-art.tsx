import type { ReactElement } from 'react';
import type { ProjectArt as ArtKind } from '@/types';

/**
 * Code-drawn covers for projects that have no live UI to screenshot.
 * One visual language for all of them: charcoal field, hairline grid,
 * one crimson element that carries the idea.
 */
const A = 'rgb(234 0 68)';
const FG = 'rgb(247 247 247)';
const MUTE = 'rgb(247 247 247 / 0.14)';
const MUTE2 = 'rgb(247 247 247 / 0.28)';

export function ProjectArt({ kind, label }: { kind: ArtKind; label: string }) {
  return (
    <svg viewBox="0 0 800 550" className="h-full w-full" role="img" aria-label={`${label} illustration`}>
      <defs>
        <pattern id={`grid-${kind}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgb(247 247 247 / 0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`glow-${kind}`} cx="0.72" cy="0.3" r="0.7">
          <stop offset="0" stopColor={A} stopOpacity="0.28" />
          <stop offset="1" stopColor={A} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="550" fill="rgb(28 27 31)" />
      <rect width="800" height="550" fill={`url(#grid-${kind})`} />
      <rect width="800" height="550" fill={`url(#glow-${kind})`} />
      <g>{motifs[kind]}</g>
      <text x="40" y="510" fill={MUTE2} fontFamily="ui-monospace, monospace" fontSize="16" letterSpacing="2">
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

const motifs: Record<ArtKind, ReactElement> = {
  code: (
    <>
      <rect x="110" y="95" width="580" height="330" rx="16" fill="rgb(36 35 40)" stroke={MUTE} />
      <circle cx="140" cy="122" r="6" fill={A} />
      <circle cx="160" cy="122" r="6" fill={MUTE2} />
      <circle cx="180" cy="122" r="6" fill={MUTE} />
      {[
        [150, 80, 140],
        [170, 60, 220],
        [170, 110, 90],
        [190, 50, 180],
        [170, 90, 120],
        [150, 40, 0],
      ].map(([x, w1, w2], i) => (
        <g key={i}>
          <rect x={x} y={165 + i * 36} width={w1} height="12" rx="6" fill={i === 2 ? A : MUTE2} />
          {w2 > 0 && <rect x={x + w1 + 14} y={165 + i * 36} width={w2} height="12" rx="6" fill={MUTE} />}
        </g>
      ))}
      <rect x="470" y="330" width="190" height="64" rx="12" fill={A} />
      <text x="565" y="370" textAnchor="middle" fill={FG} fontFamily="ui-monospace, monospace" fontSize="19" fontWeight="700">
        O(n²) → O(n)
      </text>
    </>
  ),
  report: (
    <>
      {[2, 1, 0].map((i) => (
        <g key={i} transform={`translate(${250 + i * 34} ${90 + i * 22}) rotate(${(i - 1) * 4})`}>
          <rect width="260" height="340" rx="10" fill={i === 0 ? 'rgb(247 247 247)' : 'rgb(36 35 40)'} stroke={MUTE} />
          {i === 0 && (
            <>
              <rect x="28" y="34" width="150" height="16" rx="4" fill="rgb(20 19 22)" />
              <rect x="28" y="60" width="90" height="8" rx="4" fill={A} />
              {[92, 110, 128, 146, 180, 198, 216].map((y, k) => (
                <rect key={y} x="28" y={y} width={k % 3 === 2 ? 140 : 204} height="7" rx="3.5" fill="rgb(20 19 22 / 0.2)" />
              ))}
              <rect x="28" y="244" width="204" height="64" rx="6" fill="rgb(234 0 68 / 0.12)" />
            </>
          )}
        </g>
      ))}
      <rect x="560" y="360" width="96" height="40" rx="20" fill={A} />
      <text x="608" y="386" textAnchor="middle" fill={FG} fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="700">.docx</text>
    </>
  ),
  dashboard: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={110 + i * 196} y="90" width="176" height="90" rx="12" fill="rgb(36 35 40)" stroke={MUTE} />
          <rect x={130 + i * 196} y="112" width="60" height="8" rx="4" fill={MUTE2} />
          <text x={130 + i * 196} y="158" fill={i === 1 ? A : FG} fontFamily="ui-sans-serif, system-ui" fontSize="30" fontWeight="700">
            {['1,284', '−12%', '96.4'][i]}
          </text>
        </g>
      ))}
      <rect x="110" y="200" width="568" height="240" rx="12" fill="rgb(36 35 40)" stroke={MUTE} />
      {[70, 120, 95, 160, 130, 185, 150, 200].map((h, i) => (
        <rect key={i} x={140 + i * 64} y={420 - h} width="36" height={h} rx="6" fill={i === 5 ? A : MUTE2} />
      ))}
    </>
  ),
  voice: (
    <>
      <circle cx="400" cy="260" r="120" fill="none" stroke={MUTE} />
      <circle cx="400" cy="260" r="175" fill="none" stroke="rgb(247 247 247 / 0.07)" />
      {Array.from({ length: 33 }, (_, i) => {
        const d = Math.abs(i - 16);
        const h = Math.max(10, 180 - d * 10 + ((i * 37) % 23));
        return <rect key={i} x={400 - 16 * 13 + i * 13 - 3} y={260 - h / 2} width="6" height={h} rx="3" fill={d < 3 ? A : MUTE2} />;
      })}
    </>
  ),
  chat: (
    <>
      <rect x="120" y="110" width="360" height="92" rx="22" fill="rgb(36 35 40)" stroke={MUTE} />
      <rect x="148" y="140" width="250" height="12" rx="6" fill={MUTE2} />
      <rect x="148" y="164" width="170" height="12" rx="6" fill={MUTE} />
      <rect x="300" y="236" width="380" height="150" rx="22" fill={A} />
      {[266, 292, 318].map((y, i) => (
        <rect key={y} x="330" y={y} width={[300, 260, 200][i]} height="12" rx="6" fill="rgb(255 255 255 / 0.85)" />
      ))}
      <rect x="330" y="344" width="44" height="24" rx="12" fill="rgb(255 255 255)" />
      <text x="352" y="361" textAnchor="middle" fill={A} fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700">[1]</text>
    </>
  ),
  traffic: (
    <>
      <path d="M300 460 L380 90 H420 L500 460Z" fill="rgb(36 35 40)" />
      {[120, 180, 240, 300, 360, 420].map((y) => (
        <rect key={y} x="397" y={y} width="6" height="26" rx="2" fill={MUTE2} />
      ))}
      <rect x="330" y="300" width="60" height="44" rx="4" fill="none" stroke={A} strokeWidth="3" />
      <rect x="410" y="210" width="44" height="32" rx="4" fill="none" stroke={FG} strokeWidth="2.5" />
      <rect x="386" y="150" width="30" height="22" rx="3" fill="none" stroke={MUTE2} strokeWidth="2" />
      <rect x="590" y="140" width="70" height="190" rx="18" fill="rgb(36 35 40)" stroke={MUTE} />
      <circle cx="625" cy="185" r="20" fill={A} />
      <circle cx="625" cy="235" r="20" fill={MUTE} />
      <circle cx="625" cy="285" r="20" fill={MUTE} />
    </>
  ),
  finance: (
    <>
      <circle cx="280" cy="270" r="120" fill="none" stroke={MUTE} strokeWidth="44" />
      <circle
        cx="280"
        cy="270"
        r="120"
        fill="none"
        stroke={A}
        strokeWidth="44"
        strokeDasharray={`${2 * Math.PI * 120 * 0.38} ${2 * Math.PI * 120}`}
        transform="rotate(-90 280 270)"
      />
      <text x="280" y="280" textAnchor="middle" fill={FG} fontFamily="ui-sans-serif, system-ui" fontSize="34" fontWeight="700">38%</text>
      {['Food', 'Travel', 'Bills', 'Other'].map((t, i) => (
        <g key={t}>
          <rect x="470" y={160 + i * 56} width="16" height="16" rx="4" fill={i === 0 ? A : MUTE2} />
          <rect x="500" y={163 + i * 56} width={[150, 110, 130, 80][i]} height="10" rx="5" fill={i === 0 ? FG : MUTE} />
        </g>
      ))}
    </>
  ),
};
