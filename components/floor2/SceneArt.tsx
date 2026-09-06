"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { P1_END, P2_END, P3_END } from "@/lib/floor2/constants";

/** Fades a layer in over [inA,inB] and out over [outA,outB] of scroll progress. */
function useLayerOpacity(progress: MotionValue<number>, inA: number, inB: number, outA: number, outB: number) {
  return useTransform(progress, [inA, inB, outA, outB], [0, 1, 1, 0]);
}

const stage = { width: "100%", height: "100%" } as const;

// ---------------------------------------------------------------------------
// Scene 1 — Michael Dell: circuit macro → supply chain → custom order
// ---------------------------------------------------------------------------
export function DellArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      {/* A: circuit board macro */}
      <motion.g style={{ opacity: a }} stroke={accent} strokeWidth={3}>
        {[80, 140, 200, 260, 320].map((y) => (
          <line key={y} x1={40} y1={y} x2={360} y2={y} opacity={0.35} />
        ))}
        {[80, 140, 200, 260, 320].map((x) => (
          <line key={x} x1={x} y1={40} x2={x} y2={360} opacity={0.35} />
        ))}
        <rect x={150} y={150} width={100} height={100} rx={8} fill={accentSoft} stroke={accent} strokeWidth={3} />
        <circle cx={200} cy={200} r={10} fill={accent} />
      </motion.g>

      {/* B: factory → store → home supply chain */}
      <motion.g style={{ opacity: b }} stroke={accent} strokeWidth={3}>
        <rect x={40} y={180} width={60} height={44} rx={6} fill={accentSoft} />
        <rect x={170} y={180} width={60} height={44} rx={6} fill={accentSoft} />
        <rect x={300} y={180} width={60} height={44} rx={6} fill={accentSoft} />
        <path d="M100 202 L170 202" strokeDasharray="6 6" />
        <path d="M230 202 L300 202" strokeDasharray="6 6" />
      </motion.g>

      {/* C: custom tower + online order */}
      <motion.g style={{ opacity: c }} stroke={accent} strokeWidth={3}>
        <rect x={165} y={120} width={70} height={160} rx={8} fill={accentSoft} />
        <circle cx={200} cy={150} r={6} fill={accent} />
        <line x1={180} y1={175} x2={220} y2={175} />
        <line x1={180} y1={190} x2={220} y2={190} />
        <path d="M255 250 l16 16 l30 -34" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Scene 2 — Forrest Mars: candy macro → Spain→England→America map → M&M's pack
// ---------------------------------------------------------------------------
export function MarsArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);

  const dots = [
    [140, 150], [200, 130], [260, 160], [150, 220], [220, 230], [290, 210], [180, 280], [250, 290],
  ];

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={26} fill={accentSoft} stroke={accent} strokeWidth={3} />
        ))}
      </motion.g>

      <motion.g style={{ opacity: b }} stroke={accent} strokeWidth={3}>
        <circle cx={90} cy={220} r={10} fill={accent} />
        <circle cx={210} cy={150} r={10} fill={accent} />
        <circle cx={330} cy={220} r={10} fill={accent} />
        <path d="M90 220 Q150 130 210 150" strokeDasharray="6 6" />
        <path d="M210 150 Q270 130 330 220" strokeDasharray="6 6" />
      </motion.g>

      <motion.g style={{ opacity: c }} stroke={accent} strokeWidth={3}>
        <rect x={140} y={110} width={120} height={170} rx={14} fill={accentSoft} />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle key={`${row}-${col}`} cx={168 + col * 32} cy={160 + row * 40} r={9} fill={accent} stroke="none" />
          ))
        )}
      </motion.g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Scene 3 — Thomas Edison: filament macro → power grid → house lit up
// ---------------------------------------------------------------------------
export function EdisonArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        <ellipse cx={200} cy={190} rx={90} ry={110} stroke={accent} strokeWidth={3} />
        <path
          d="M170 130 Q200 160 170 190 Q200 220 170 250"
          stroke={accent}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path d="M170 130 Q200 160 170 190 Q200 220 170 250" stroke={accentSoft} strokeWidth={12} opacity={0.6} />
      </motion.g>

      <motion.g style={{ opacity: b }} stroke={accent} strokeWidth={3}>
        <rect x={175} y={70} width={50} height={40} rx={6} fill={accentSoft} />
        <line x1={200} y1={110} x2={200} y2={160} strokeDasharray="4 6" />
        <line x1={200} y1={160} x2={100} y2={230} strokeDasharray="4 6" />
        <line x1={200} y1={160} x2={200} y2={240} strokeDasharray="4 6" />
        <line x1={200} y1={160} x2={300} y2={230} strokeDasharray="4 6" />
        {[[100, 230], [200, 240], [300, 230]].map(([x, y], i) => (
          <rect key={i} x={x - 22} y={y} width={44} height={34} rx={4} fill={accentSoft} />
        ))}
      </motion.g>

      <motion.g style={{ opacity: c }} stroke={accent} strokeWidth={3}>
        <path d="M140 220 L200 160 L260 220 L260 300 L140 300 Z" fill={accentSoft} />
        <rect x={165} y={240} width={30} height={30} fill={accent} opacity={0.85} />
        <rect x={210} y={240} width={30} height={30} fill={accent} opacity={0.85} />
      </motion.g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Scene 4 — Chuck Hull: UV resin cure → inkjet nozzles → 3D printed layers
// ---------------------------------------------------------------------------
export function HullArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        <path d="M120 260 Q200 300 280 260 L280 280 Q200 320 120 280 Z" fill={accentSoft} />
        {[160, 200, 240].map((x, i) => (
          <line key={i} x1={x} y1={100} x2={x - 20} y2={250} stroke={accent} strokeWidth={3} opacity={0.7} />
        ))}
        <circle cx={200} cy={90} r={10} fill={accent} />
      </motion.g>

      <motion.g style={{ opacity: b }} stroke={accent} strokeWidth={3}>
        <rect x={150} y={110} width={100} height={40} rx={6} fill={accentSoft} />
        {[170, 200, 230].map((x, i) => (
          <line key={i} x1={x} y1={150} x2={x} y2={190} strokeDasharray="3 5" />
        ))}
        <path d="M140 250 h120" />
        <path d="M320 180 l-30 8 M320 180 l-30 -8 M290 180 h30" />
      </motion.g>

      <motion.g style={{ opacity: c }} stroke={accent} strokeWidth={3}>
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 300 - i * 20;
          const w = 140 - i * 8;
          return <rect key={i} x={200 - w / 2} y={y} width={w} height={16} rx={3} fill={accentSoft} />;
        })}
      </motion.g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Scene 5 — Michel Hazanavicius: modern cinema → timeline back → The Artist
// ---------------------------------------------------------------------------
export function HazanaviciusArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }} stroke={accent} strokeWidth={3}>
        <rect x={90} y={110} width={220} height={140} rx={6} fill={accentSoft} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={100 + i * 34} y={270} width={20} height={40} rx={3} fill={accentSoft} />
        ))}
      </motion.g>

      <motion.g style={{ opacity: b }} stroke={accent} strokeWidth={3}>
        <line x1={70} y1={200} x2={330} y2={200} />
        {[70, 200, 330].map((x, i) => (
          <circle key={i} cx={x} cy={200} r={7} fill={accent} />
        ))}
        <circle cx={330} cy={200} r={26} fill="none" strokeDasharray="4 5" />
      </motion.g>

      <motion.g style={{ opacity: c }} stroke={accent} strokeWidth={3}>
        <rect x={130} y={130} width={140} height={100} rx={4} fill={accentSoft} />
        <line x1={150} y1={250} x2={250} y2={250} />
        <line x1={230} y1={240} x2={250} y2={260} />
      </motion.g>
    </svg>
  );
}
