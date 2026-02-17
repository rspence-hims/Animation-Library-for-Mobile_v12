import { AnimationItem } from "./animation-data";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Clock, Waves, Tag, Lightbulb } from "lucide-react";

interface DescriptionPanelProps {
  item: AnimationItem | null;
  replayCount?: number;
}

function EasingCurveVisual({ easingCurve, replayCount = 0, durationMs = 500 }: { easingCurve: string; replayCount?: number; durationMs?: number }) {
  // Parse cubic-bezier values
  const match = easingCurve.match(
    /cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/
  );
  const [x1, y1, x2, y2] = match
    ? [
        parseFloat(match[1]),
        parseFloat(match[2]),
        parseFloat(match[3]),
        parseFloat(match[4]),
      ]
    : [0.42, 0, 0.58, 1];

  const width = 200;
  const height = 120;
  const padding = 16;

  const toSvgX = (val: number) => padding + val * (width - padding * 2);
  const toSvgY = (val: number) => height - padding - val * (height - padding * 2);

  const pathD = `M ${toSvgX(0)} ${toSvgY(0)} C ${toSvgX(x1)} ${toSvgY(y1)}, ${toSvgX(x2)} ${toSvgY(y2)}, ${toSvgX(1)} ${toSvgY(1)}`;

  // Playhead state
  // Delay accounts for AnimatePresence exit/enter (~150ms) + typical demo setTimeout (~500ms)
  const PLAYHEAD_DELAY = 650;
  const [playheadX, setPlayheadX] = useState<number | null>(null);

  useEffect(() => {
    if (replayCount === 0) return;
    let rafId: number;
    let delayTimer: ReturnType<typeof setTimeout>;

    setPlayheadX(toSvgX(0));

    delayTimer = setTimeout(() => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        setPlayheadX(toSvgX(progress));
        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setTimeout(() => setPlayheadX(null), 400);
        }
      };
      rafId = requestAnimationFrame(animate);
    }, PLAYHEAD_DELAY);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
      setPlayheadX(null);
    };
  }, [replayCount, durationMs]);

  return (
    <div className="bg-[#0d0d1a] rounded-xl p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: 120 }}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <line
            key={`h-${v}`}
            x1={toSvgX(0)}
            y1={toSvgY(v)}
            x2={toSvgX(1)}
            y2={toSvgY(v)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <line
            key={`v-${v}`}
            x1={toSvgX(v)}
            y1={toSvgY(0)}
            x2={toSvgX(v)}
            y2={toSvgY(1)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        ))}
        {/* Linear reference */}
        <line
          x1={toSvgX(0)}
          y1={toSvgY(0)}
          x2={toSvgX(1)}
          y2={toSvgY(1)}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={0.5}
          strokeDasharray="3 3"
        />
        {/* Control point handles */}
        <line
          x1={toSvgX(0)}
          y1={toSvgY(0)}
          x2={toSvgX(x1)}
          y2={toSvgY(y1)}
          stroke="rgba(139,92,246,0.4)"
          strokeWidth={0.75}
        />
        <line
          x1={toSvgX(1)}
          y1={toSvgY(1)}
          x2={toSvgX(x2)}
          y2={toSvgY(y2)}
          stroke="rgba(139,92,246,0.4)"
          strokeWidth={0.75}
        />
        {/* Curve */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Gradient */}
        <defs>
          <linearGradient
            id="curveGradient"
            x1="0"
            y1="0"
            x2={width}
            y2="0"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Control points */}
        <circle
          cx={toSvgX(x1)}
          cy={toSvgY(y1)}
          r={3}
          fill="#8b5cf6"
        />
        <circle
          cx={toSvgX(x2)}
          cy={toSvgY(y2)}
          r={3}
          fill="#ec4899"
        />
        {/* Start/end points */}
        <circle
          cx={toSvgX(0)}
          cy={toSvgY(0)}
          r={3}
          fill="white"
        />
        <circle
          cx={toSvgX(1)}
          cy={toSvgY(1)}
          r={3}
          fill="white"
        />
        {/* Axis labels */}
        <text
          x={toSvgX(0)}
          y={height - 2}
          className="fill-white/30"
          style={{ fontSize: 7 }}
        >
          0
        </text>
        <text
          x={toSvgX(1) - 4}
          y={height - 2}
          className="fill-white/30"
          style={{ fontSize: 7 }}
        >
          1
        </text>
        {/* Playhead */}
        {playheadX !== null && (
          <line
            x1={playheadX}
            y1={toSvgY(0) + 6}
            x2={playheadX}
            y2={toSvgY(1) - 6}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}

export function DescriptionPanel({ item, replayCount }: DescriptionPanelProps) {
  if (!item) {
    return (
      <div className="h-full flex items-center justify-center px-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center">
            <Waves className="w-8 h-8 text-white/20" />
          </div>
          <p className="text-white/30 text-[14px]">
            Select an animation from the sidebar
          </p>
          <p className="text-white/15 text-[12px]">
            Each pattern includes a live demo, easing curve, and implementation details
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      {/* Title */}
      <div>
        <p className="text-[11px] tracking-widest uppercase text-white/30 mb-1">
          {item.category.replace("-", " ")}
        </p>
        <h2 className="text-white text-[22px] tracking-tight">{item.name}</h2>
      </div>

      {/* Description */}
      <p className="text-white/50 text-[13px] leading-relaxed">
        {item.description}
      </p>

      {/* Easing Curve */}
      <div className="space-y-3">
        <h3 className="text-white/70 text-[12px] tracking-widest uppercase">
          Easing Curve
        </h3>
        <EasingCurveVisual easingCurve={item.easingCurve} replayCount={replayCount} durationMs={parseDurationMs(item.duration)} />
      </div>

      {/* Properties */}
      <div className="space-y-3">
        <h3 className="text-white/70 text-[12px] tracking-widest uppercase">
          Properties
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] text-white/40">Easing</span>
            </div>
            <p className="text-[13px] text-white/80">{item.easing}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="text-[11px] text-white/40">Duration</span>
            </div>
            <p className="text-[13px] text-white/80">{item.duration}</p>
          </div>
        </div>
      </div>

      {/* Cubic Bezier */}
      <div className="space-y-2">
        <h3 className="text-white/70 text-[12px] tracking-widest uppercase">
          CSS Value
        </h3>
        <div className="bg-[#0d0d1a] rounded-xl p-3 font-mono">
          <code className="text-[12px] text-violet-300">{item.easingCurve}</code>
        </div>
      </div>

      {/* Use Cases */}
      {item.useCase && (
        <div className="space-y-2">
          <h3 className="text-white/70 text-[12px] tracking-widest uppercase">
            When to Use
          </h3>
          <div className="bg-white/5 rounded-xl p-3 flex gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-white/50 leading-relaxed">
              {item.useCase}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="space-y-2">
        <h3 className="text-white/70 text-[12px] tracking-widest uppercase">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-[11px] text-white/40"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function parseDurationMs(duration: string): number {
  const msMatch = duration.match(/([\d.]+)\s*ms/);
  if (msMatch) return parseFloat(msMatch[1]);
  const sMatch = duration.match(/([\d.]+)\s*s/);
  if (sMatch) return parseFloat(sMatch[1]) * 1000;
  return 500;
}