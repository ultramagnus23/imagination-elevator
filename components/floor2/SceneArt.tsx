"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { P1_END, P2_END, P3_END } from "@/lib/floor2/constants";

/** Fades a layer in over [inA,inB] and out over [outA,outB] of scroll progress. */
function useLayerOpacity(progress: MotionValue<number>, inA: number, inB: number, outA: number, outB: number) {
  return useTransform(progress, [inA, inB, outA, outB], [0, 1, 1, 0]);
}

const stage = { width: "100%", height: "100%" } as const;

/** A soft radial glow behind a focal point — used throughout so each
 * illustration reads as lit, not flat line art. */
function Glow({ id, cx, cy, r, color }: { id: string; cx: number; cy: number; r: number; color: string }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={0.55} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Scene 1 — Michael Dell: circuit macro → supply chain → custom order
// ---------------------------------------------------------------------------
export function DellArt({ progress, accent, accentSoft }: { progress: MotionValue<number>; accent: string; accentSoft: string }) {
  const a = useLayerOpacity(progress, 0, 0.04, P1_END - 0.06, P1_END);
  const b = useLayerOpacity(progress, P1_END - 0.04, P1_END, P2_END - 0.05, P2_END);
  const c = useLayerOpacity(progress, P2_END - 0.04, P2_END, P3_END - 0.05, P3_END);
  const spin = useTransform(progress, [0, 1], [0, 25]);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      {/* A: circuit board macro */}
      <motion.g style={{ opacity: a }}>
        <Glow id="dell-a-glow" cx={200} cy={200} r={140} color={accent} />
        <g stroke={accent} strokeWidth={2}>
          {[80, 140, 200, 260, 320].map((y) => (
            <line key={`h${y}`} x1={30} y1={y} x2={370} y2={y} opacity={0.3} />
          ))}
          {[80, 140, 200, 260, 320].map((x) => (
            <line key={`v${x}`} x1={x} y1={30} x2={x} y2={370} opacity={0.3} />
          ))}
        </g>
        {/* corner solder pads */}
        {[[80, 80], [320, 80], [80, 320], [320, 320]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill={accent} opacity={0.5} />
        ))}
        {/* small satellite chips around the central die */}
        {[[110, 130, 26], [290, 120, 22], [120, 280, 20], [280, 290, 24]].map(([x, y, s], i) => (
          <rect key={i} x={x - s / 2} y={y - s / 2} width={s} height={s} rx={3} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.55} />
        ))}
        {/* the central die */}
        <rect x={150} y={150} width={100} height={100} rx={8} fill={accentSoft} stroke={accent} strokeWidth={3} />
        <rect x={168} y={168} width={64} height={64} rx={4} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.6} />
        {/* die legs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1={150} y1={168 + i * 16} x2={132} y2={168 + i * 16} stroke={accent} strokeWidth={2} />
            <line x1={250} y1={168 + i * 16} x2={268} y2={168 + i * 16} stroke={accent} strokeWidth={2} />
          </g>
        ))}
        <circle cx={200} cy={200} r={9} fill={accent} />
      </motion.g>

      {/* B: factory → store → home supply chain */}
      <motion.g style={{ opacity: b }}>
        <Glow id="dell-b-glow" cx={200} cy={200} r={160} color={accentSoft} />
        <g stroke={accent} strokeWidth={3}>
          {/* factory */}
          <rect x={30} y={190} width={70} height={50} rx={4} fill={accentSoft} />
          <path d="M40 190 L40 165 L55 178 L55 160 L70 175 L70 190" fill={accentSoft} />
          <rect x={38} y={205} width={14} height={18} fill="none" opacity={0.6} />
          <rect x={58} y={205} width={14} height={18} fill="none" opacity={0.6} />
          {/* store */}
          <rect x={165} y={195} width={70} height={45} rx={4} fill={accentSoft} />
          <path d="M165 195 L200 170 L235 195 Z" fill={accentSoft} />
          <rect x={192} y={215} width={16} height={25} fill="none" opacity={0.7} />
          {/* home */}
          <path d="M300 240 L300 200 L330 175 L360 200 L360 240 Z" fill={accentSoft} />
          <rect x={318} y={215} width={14} height={25} fill="none" opacity={0.7} />
          {/* dashed route */}
          <path d="M100 215 L165 217" strokeDasharray="6 6" />
          <path d="M235 217 L300 215" strokeDasharray="6 6" />
          {/* little shipping boxes travelling the route */}
          <rect x={122} y={206} width={12} height={12} rx={2} fill={accent} opacity={0.8} />
          <rect x={258} y={206} width={12} height={12} rx={2} fill={accent} opacity={0.8} />
        </g>
      </motion.g>

      {/* C: custom tower + online order */}
      <motion.g style={{ opacity: c }}>
        <Glow id="dell-c-glow" cx={200} cy={190} r={140} color={accent} />
        <g stroke={accent} strokeWidth={3}>
          {/* tower case */}
          <rect x={160} y={110} width={80} height={180} rx={8} fill={accentSoft} />
          <rect x={172} y={128} width={56} height={10} rx={2} fill="none" opacity={0.7} />
          <circle cx={200} cy={150} r={7} fill={accent} />
          <line x1={176} y1={172} x2={224} y2={172} />
          <line x1={176} y1={186} x2={224} y2={186} />
          <line x1={176} y1={200} x2={210} y2={200} opacity={0.6} />
          {/* customization sliders */}
          <line x1={176} y1={222} x2={224} y2={222} strokeWidth={2} opacity={0.5} />
          <circle cx={205} cy={222} r={4} fill={accent} />
          <line x1={176} y1={236} x2={224} y2={236} strokeWidth={2} opacity={0.5} />
          <circle cx={190} cy={236} r={4} fill={accent} />
          {/* cursor confirming the order */}
          <path d="M250 260 l14 14 l26 -30" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} />
          <circle cx={290} cy={244} r={22} fill="none" strokeDasharray="3 6" opacity={0.5} />
        </g>
      </motion.g>

      <motion.g style={{ rotate: spin, originX: "200px", originY: "200px" }} opacity={0.12}>
        <circle cx={200} cy={200} r={185} fill="none" stroke={accent} strokeWidth={1} strokeDasharray="2 10" />
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
    [140, 150, 26], [200, 130, 30], [260, 160, 24], [150, 220, 28],
    [220, 230, 26], [290, 210, 22], [180, 280, 24], [250, 290, 27],
    [95, 190, 20], [305, 260, 20],
  ];

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        <Glow id="mars-a-glow" cx={200} cy={210} r={170} color={accentSoft} />
        {dots.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={accentSoft} stroke={accent} strokeWidth={2.5} />
            {/* sugar-shell sheen highlight */}
            <ellipse cx={x - r * 0.32} cy={y - r * 0.32} rx={r * 0.32} ry={r * 0.2} fill={accent} opacity={0.5} />
          </g>
        ))}
      </motion.g>

      <motion.g style={{ opacity: b }}>
        <Glow id="mars-b-glow" cx={200} cy={185} r={190} color={accentSoft} />
        <g stroke={accent} strokeWidth={3}>
          {/* simple landmasses to ground the three points */}
          <path d="M60 200 q30 -30 70 -8 q10 20 -10 34 q-40 10 -60 -26 Z" fill={accentSoft} opacity={0.5} stroke="none" />
          <path d="M175 110 q40 -14 70 10 q6 22 -22 30 q-38 4 -48 -40 Z" fill={accentSoft} opacity={0.5} stroke="none" />
          <path d="M290 170 q46 4 56 46 q-10 26 -46 20 q-30 -30 -10 -66 Z" fill={accentSoft} opacity={0.5} stroke="none" />

          <circle cx={90} cy={220} r={11} fill={accent} />
          <circle cx={210} cy={150} r={11} fill={accent} />
          <circle cx={330} cy={220} r={11} fill={accent} />
          <path d="M90 220 Q150 130 210 150" strokeDasharray="6 6" />
          <path d="M210 150 Q270 130 330 220" strokeDasharray="6 6" />
          {/* little ship + plane marking the crossing */}
          <path d="M145 178 l10 -6 l10 6 l-4 8 h-12 Z" fill={accentSoft} />
          <path d="M270 178 l16 -4 l-4 10 l-12 4 Z" fill={accentSoft} />
        </g>
        <text x={90} y={246} textAnchor="middle" fontSize={13} fill={accent} opacity={0.8} fontFamily="var(--font-sans)">SPAIN</text>
        <text x={210} y={128} textAnchor="middle" fontSize={13} fill={accent} opacity={0.8} fontFamily="var(--font-sans)">ENGLAND</text>
        <text x={330} y={246} textAnchor="middle" fontSize={13} fill={accent} opacity={0.8} fontFamily="var(--font-sans)">AMERICA</text>
      </motion.g>

      <motion.g style={{ opacity: c }}>
        <Glow id="mars-c-glow" cx={200} cy={195} r={150} color={accent} />
        <g stroke={accent} strokeWidth={3}>
          <rect x={140} y={100} width={120} height={190} rx={14} fill={accentSoft} />
          <rect x={152} y={116} width={96} height={26} rx={6} fill="none" opacity={0.7} />
          <text x={200} y={134} textAnchor="middle" fontSize={16} fill={accent} fontFamily="var(--font-display)" fontStyle="italic" stroke="none">m</text>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <circle key={`${row}-${col}`} cx={165 + col * 35} cy={168 + row * 28} r={9} fill={accent} stroke="none" opacity={0.9} />
            ))
          )}
        </g>
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
  const flicker = useTransform(progress, [0, 0.1, 0.2, P1_END], [0.7, 1, 0.75, 1]);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        <Glow id="edison-a-glow" cx={185} cy={190} r={150} color={accent} />
        <ellipse cx={200} cy={190} rx={92} ry={112} stroke={accent} strokeWidth={3} />
        <ellipse cx={200} cy={112} rx={20} ry={10} stroke={accent} strokeWidth={2.5} opacity={0.7} />
        <line x1={185} y1={112} x2={185} y2={95} stroke={accent} strokeWidth={2.5} />
        <line x1={215} y1={112} x2={215} y2={95} stroke={accent} strokeWidth={2.5} />
        <motion.path
          d="M170 130 Q200 160 170 190 Q200 220 170 250"
          stroke={accent}
          strokeWidth={4}
          strokeLinecap="round"
          style={{ opacity: flicker }}
        />
        <path d="M170 130 Q200 160 170 190 Q200 220 170 250" stroke={accentSoft} strokeWidth={16} opacity={0.5} />
        {/* second filament coil for depth */}
        <path d="M225 140 Q210 165 225 190 Q210 215 225 240" stroke={accent} strokeWidth={2.5} opacity={0.4} />
        {/* glass rim highlight */}
        <path d="M130 130 Q110 190 130 250" stroke={accent} strokeWidth={1.5} opacity={0.3} />
      </motion.g>

      <motion.g style={{ opacity: b }}>
        <Glow id="edison-b-glow" cx={200} cy={180} r={190} color={accentSoft} />
        <g stroke={accent} strokeWidth={3}>
          {/* power station */}
          <rect x={172} y={62} width={56} height={44} rx={4} fill={accentSoft} />
          <path d="M180 62 v-16 M195 62 v-20 M205 62 v-20 M220 62 v-16" strokeWidth={2} />
          <line x1={200} y1={106} x2={200} y2={158} strokeDasharray="4 6" />
          {/* pylons */}
          {[[100, 232], [200, 244], [300, 232]].map(([x, y], i) => (
            <g key={i}>
              <line x1={200} y1={158} x2={x} y2={y - 16} strokeDasharray="4 6" />
              <path d={`M${x - 14} ${y - 16} L${x} ${y - 40} L${x + 14} ${y - 16}`} opacity={0.6} />
            </g>
          ))}
          {[[100, 232], [200, 244], [300, 232]].map(([x, y], i) => (
            <rect key={i} x={x - 24} y={y} width={48} height={36} rx={4} fill={accentSoft} />
          ))}
          {/* street lamps between the houses */}
          {[150, 250].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={268} x2={x} y2={244} strokeWidth={2} opacity={0.6} />
              <circle cx={x} cy={244} r={4} fill={accent} opacity={0.9} />
            </g>
          ))}
        </g>
      </motion.g>

      <motion.g style={{ opacity: c }}>
        <Glow id="edison-c-glow" cx={200} cy={250} r={140} color={accent} />
        <g stroke={accent} strokeWidth={3}>
          <path d="M135 225 L200 155 L265 225 L265 305 L135 305 Z" fill={accentSoft} />
          <path d="M150 225 L200 175 L250 225" opacity={0.5} />
          <rect x={165} y={245} width={28} height={28} fill={accent} opacity={0.9} />
          <rect x={207} y={245} width={28} height={28} fill={accent} opacity={0.9} />
          <rect x={186} y={278} width={28} height={27} fill={accentSoft} />
          {/* incoming service wire */}
          <path d="M265 250 q30 -10 40 -60" strokeDasharray="4 6" opacity={0.6} />
          <circle cx={305} cy={190} r={5} fill={accent} />
        </g>
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
  const rise = useTransform(progress, [P2_END, P3_END], [0, -18]);

  return (
    <svg viewBox="0 0 400 400" style={stage} fill="none">
      <motion.g style={{ opacity: a }}>
        <Glow id="hull-a-glow" cx={200} cy={170} r={150} color={accent} />
        <path d="M110 260 Q200 305 290 260 L290 282 Q200 325 110 282 Z" fill={accentSoft} />
        <path d="M110 260 Q200 300 290 260" stroke={accent} strokeWidth={2} opacity={0.5} />
        {/* UV rays converging */}
        {[150, 175, 200, 225, 250].map((x, i) => (
          <line key={i} x1={x} y1={95} x2={x - 15 + i * 3} y2={255} stroke={accent} strokeWidth={2} opacity={0.55} />
        ))}
        <circle cx={200} cy={85} r={12} fill={accent} />
        <circle cx={200} cy={85} r={22} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.4} />
        {/* curing ripples on the resin surface */}
        {[30, 46, 62].map((r, i) => (
          <ellipse key={i} cx={200} cy={262} rx={r} ry={r * 0.28} stroke={accent} strokeWidth={1.5} opacity={0.35} />
        ))}
      </motion.g>

      <motion.g style={{ opacity: b }}>
        <Glow id="hull-b-glow" cx={220} cy={170} r={170} color={accentSoft} />
        <g stroke={accent} strokeWidth={3}>
          <rect x={145} y={104} width={110} height={44} rx={6} fill={accentSoft} />
          <rect x={158} y={116} width={84} height={8} rx={3} fill="none" opacity={0.6} />
          {[168, 200, 232].map((x, i) => (
            <line key={i} x1={x} y1={148} x2={x} y2={192} strokeDasharray="3 5" />
          ))}
          {/* ink droplets */}
          {[168, 200, 232].map((x, i) => (
            <circle key={i} cx={x} cy={196} r={3} fill={accent} opacity={0.8} />
          ))}
          <path d="M135 250 h130" />
          <path d="M330 178 l-32 8 M330 178 l-32 -8 M296 178 h34" />
        </g>
        <text x={200} y={90} textAnchor="middle" fontSize={13} fill={accent} opacity={0.75} fontFamily="var(--font-sans)">INKJET PRINTER</text>
      </motion.g>

      <motion.g style={{ opacity: c, y: rise }}>
        <Glow id="hull-c-glow" cx={200} cy={230} r={140} color={accent} />
        <g stroke={accent} strokeWidth={2}>
          {Array.from({ length: 11 }).map((_, i) => {
            const y = 310 - i * 18;
            const w = 150 - i * 9;
            return <rect key={i} x={200 - w / 2} y={y} width={w} height={15} rx={3} fill={accentSoft} />;
          })}
          {/* build plate */}
          <rect x={110} y={314} width={180} height={8} rx={2} fill={accentSoft} opacity={0.8} />
        </g>
        <circle cx={200} cy={112} r={6} fill={accent} opacity={0.9} />
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
      <motion.g style={{ opacity: a }}>
        <Glow id="haz-a-glow" cx={200} cy={180} r={160} color={accent} />
        <g stroke={accent} strokeWidth={3}>
          <rect x={85} y={100} width={230} height={150} rx={6} fill={accentSoft} />
          <path d="M160 130 l50 45 l-50 45 Z" fill={accent} opacity={0.85} stroke="none" />
          {/* surround speaker bars along the base */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={96 + i * 30} y={266} width={18} height={38} rx={3} fill={accentSoft} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={96 + i * 30 + 9} y1={272} x2={96 + i * 30 + 9} y2={298} opacity={0.4} strokeWidth={1.5} />
          ))}
        </g>
        <text x={200} y={88} textAnchor="middle" fontSize={13} fill={accent} opacity={0.8} fontFamily="var(--font-sans)">DIGITAL · SURROUND · COLOR</text>
      </motion.g>

      <motion.g style={{ opacity: b }}>
        <Glow id="haz-b-glow" cx={200} cy={200} r={190} color={accentSoft} />
        <g stroke={accent} strokeWidth={2.5}>
          <line x1={60} y1={200} x2={340} y2={200} />
          {[60, 133, 206, 279, 340].map((x, i) => (
            <line key={i} x1={x} y1={193} x2={x} y2={207} />
          ))}
        </g>
        {[
          [60, "1920s"],
          [133, "1940s"],
          [206, "1960s"],
          [279, "1980s"],
          [340, "TODAY"],
        ].map(([x, label], i) => (
          <text key={i} x={x as number} y={222} textAnchor="middle" fontSize={11} fill={accent} opacity={0.75} fontFamily="var(--font-sans)">
            {label}
          </text>
        ))}
        {/* film reel marking the destination era */}
        <circle cx={60} cy={200} r={30} fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="4 5" />
        <circle cx={60} cy={200} r={10} fill={accentSoft} stroke={accent} strokeWidth={2} />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 19;
          const y = 200 + Math.sin(rad) * 19;
          return <circle key={i} cx={x} cy={y} r={3} fill={accent} opacity={0.7} />;
        })}
        {/* a little bowler-hat silhouette for the silent era */}
        <path d="M42 148 q18 -14 36 0 q-4 8 -18 8 q-14 0 -18 -8 Z" fill={accentSoft} stroke="none" opacity={0.7} />
      </motion.g>

      <motion.g style={{ opacity: c }}>
        <Glow id="haz-c-glow" cx={200} cy={175} r={140} color={accent} />
        <g stroke={accent} strokeWidth={3}>
          <rect x={122} y={118} width={156} height={112} rx={4} fill={accentSoft} />
          {/* silhouettes echoing The Artist's poster composition */}
          <path d="M170 210 q0 -46 30 -46 q30 0 30 46 Z" fill={accent} opacity={0.85} stroke="none" />
          <circle cx={200} cy={148} r={14} fill={accent} opacity={0.85} stroke="none" />
          <line x1={140} y1={250} x2={260} y2={250} />
          <line x1={240} y1={240} x2={260} y2={260} />
        </g>
        <text x={200} y={106} textAnchor="middle" fontSize={13} fill={accent} opacity={0.8} fontFamily="var(--font-display)" fontStyle="italic">THE ARTIST</text>
      </motion.g>
    </svg>
  );
}
