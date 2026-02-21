import { useEffect, useRef, useState } from "react";
import { interpolate } from "flubber";

/* eslint-disable no-console */

/* ─── Design Tokens ──────────────────────────────────────── */

const colors = {
  primary: "#162B33",
  secondary: "#EBF3ED",
  accent: "#2DA5A2",
  surface: "#FFFFFF",
  surfaceStrong: "rgba(255,255,255,0.97)",
  badgeBg: "rgba(235,243,237,0.1)",
  borderSubtle: "rgba(154,189,177,0.2)",
  borderInput: "rgba(19,38,46,0.08)",
};

/* ─── Shape Definitions (100×100 viewBox) ────────────────── */

const shapes = [
  {
    name: "Star",
    color: "#2DA5A2",
    path: "M40.5758 5.25582C44.9045 -1.75195 55.0955 -1.75194 59.4242 5.25584L71.535 24.8621C72.4396 26.3268 73.6732 27.5603 75.1379 28.465L94.7442 40.5758C101.752 44.9045 101.752 55.0955 94.7442 59.4242L75.1379 71.535C73.6732 72.4396 72.4396 73.6732 71.535 75.1378L59.4242 94.7442C55.0955 101.752 44.9045 101.752 40.5758 94.7442L28.465 75.1378C27.5603 73.6732 26.3268 72.4396 24.8621 71.535L5.25582 59.4242C-1.75195 55.0955 -1.75194 44.9045 5.25584 40.5758L24.8622 28.465C26.3268 27.5603 27.5603 26.3268 28.465 24.8621L40.5758 5.25582Z",
  },
  {
    name: "Cube",
    color: "#965452",
    path: "M42.6686 2.00243C47.2053 -0.667478 52.7947 -0.667476 57.3314 2.00243L87.113 19.5293C91.6497 22.1992 94.4444 27.1334 94.4444 32.4732V67.5268C94.4444 72.8666 91.6497 77.8008 87.113 80.4707L57.3314 97.9976C52.7947 100.667 47.2053 100.667 42.6686 97.9976L12.887 80.4707C8.35027 77.8008 5.55554 72.8666 5.55554 67.5268V32.4732C5.55554 27.1334 8.35027 22.1992 12.887 19.5293L42.6686 2.00243Z",
  },
  {
    name: "Flower",
    color: "#4C6EBE",
    path: "M50 6.98A30.5556 30.5556 0 0 1 93.02 50A30.5556 30.5556 0 0 1 50 93.02A30.5556 30.5556 0 0 1 6.98 50A30.5556 30.5556 0 0 1 50 6.98Z",
  },
  {
    name: "Oval",
    color: "#86488D",
    path: "M18.5186 32.4074A32.4074 32.4074 0 0 1 83.3334 32.4074L83.3334 67.5926A32.4074 32.4074 0 0 1 18.5186 67.5926Z",
  },
  {
    name: "Square",
    color: "#65B399",
    path: "M0 29.6296C0 13.2656 13.2656 0 29.6296 0H70.3704C86.7344 0 100 13.2656 100 29.6296V70.3704C100 86.7344 86.7344 100 70.3704 100H29.6296C13.2656 100 0 86.7344 0 70.3704V29.6296Z",
  },
  {
    name: "Wavy",
    color: "#B16786",
    path: "M43.3499 2.08805C47.3462 -0.696016 52.6538 -0.696016 56.6501 2.08805L64.7984 7.76453C66.1769 8.72488 67.7471 9.37527 69.4009 9.67097L79.1765 11.4188C83.971 12.276 87.724 16.029 88.5812 20.8235L90.329 30.5991C90.6247 32.2529 91.2751 33.8231 92.2355 35.2016L97.912 43.3499C100.696 47.3462 100.696 52.6538 97.912 56.6502L92.2355 64.7984C91.2751 66.1769 90.6247 67.7471 90.329 69.4009L88.5812 79.1765C87.724 83.971 83.971 87.724 79.1765 88.5812L69.4009 90.329C67.7471 90.6247 66.1769 91.2751 64.7984 92.2355L56.6502 97.912C52.6538 100.696 47.3462 100.696 43.3499 97.912L35.2016 92.2355C33.8231 91.2751 32.2529 90.6247 30.5991 90.329L20.8235 88.5812C16.029 87.724 12.276 83.971 11.4188 79.1765L9.67097 69.4009C9.37527 67.7471 8.72488 66.1769 7.76453 64.7984L2.08805 56.6501C-0.696016 52.6538 -0.696016 47.3462 2.08805 43.3499L7.76453 35.2016C8.72488 33.8231 9.37527 32.2529 9.67097 30.5991L11.4188 20.8235C12.276 16.029 16.029 12.276 20.8235 11.4188L30.5991 9.67097C32.2529 9.37527 33.8231 8.72488 35.2016 7.76453L43.3499 2.08805Z",
  },
];

/* ─── Animation Timing (from AE reference: 30fps) ───────── */

const HOLD_FRAMES = 10;
const MORPH_FRAMES = 7;
const FPS = 30;
const HOLD_MS = (HOLD_FRAMES / FPS) * 1000; // ~333ms
const MORPH_MS = (MORPH_FRAMES / FPS) * 1000; // ~233ms
const STEP_MS = HOLD_MS + MORPH_MS; // ~567ms per shape

/* ─── Utilities ──────────────────────────────────────────── */

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

/* ─── Thinking Shape (animated) ──────────────────────────── */

function ThinkingShape({ speedMultiplier = 1 }: { speedMultiplier?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;

  useEffect(() => {
    let raf = 0;
    let virtualTime = 0;
    let lastNow = performance.now();
    let running = true;

    // Build interpolators inside the effect
    let morphFns: Array<(t: number) => string>;
    try {
      morphFns = shapes.map((shape, i) => {
        const next = shapes[(i + 1) % shapes.length];
        return interpolate(shape.path, next.path, { maxSegmentLength: 8 });
      });
      console.log("running (" + morphFns.length + " interpolators)");
    } catch (e: any) {
      console.error("FLUBBER ERROR:", e);
      return;
    }

    function tick(now: number) {
      if (!running) return;

      const delta = now - lastNow;
      lastNow = now;
      virtualTime += delta / speedRef.current;

      const pathEl = pathRef.current;
      const groupEl = groupRef.current;
      const textEl = textRef.current;
      if (!pathEl || !groupEl || !textEl) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const totalMs = shapes.length * STEP_MS;
      const cycleT = virtualTime % totalMs;
      const idx = Math.floor(cycleT / STEP_MS);
      const phase = cycleT - idx * STEP_MS;
      const nextIdx = (idx + 1) % shapes.length;

      let d: string;
      let color: string;
      let rotation: number;
      let scale: number;

      if (phase < HOLD_MS) {
        d = shapes[idx].path;
        color = shapes[idx].color;
        rotation = idx * -45;
        scale = 1;
      } else {
        const raw = (phase - HOLD_MS) / MORPH_MS;
        const eased = easeInOutCubic(raw);
        d = morphFns[idx](eased);
        color = lerpColor(shapes[idx].color, shapes[nextIdx].color, eased);
        rotation = idx * -45 + -45 * eased;
        scale = 1 + 0.15 * Math.sin(Math.PI * eased);
      }

      pathEl.setAttribute("d", d);
      pathEl.setAttribute("fill", color);
      groupEl.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      textEl.style.color = color;

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
        style={{ overflow: "visible", flexShrink: 0 }}
      >
        <g ref={groupRef} style={{ transformOrigin: "50px 50px" }}>
          <path ref={pathRef} d={shapes[0].path} fill={shapes[0].color} />
        </g>
      </svg>
      <span
        ref={textRef}
        style={{
          color: shapes[0].color,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: 16,
          letterSpacing: "-0.3px",
          whiteSpace: "nowrap",
        }}
      >
        Ivy is thinking...
      </span>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────── */

function HamburgerIcon() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, width: 19 }}>
      <div style={{ background: colors.primary, height: 2, borderRadius: 100, width: "100%" }} />
      <div style={{ background: colors.primary, height: 2, borderRadius: 100, width: 14 }} />
      <div style={{ background: colors.primary, height: 2, borderRadius: 100, width: 16 }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
      <path
        d="M1 2.5L2.8 4L6 1"
        stroke={colors.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.33C8 1.33 3.33 3.33 3.33 3.33V7.5C3.33 10.95 5.29 13.14 8 14.67C10.71 13.14 12.67 10.95 12.67 7.5V3.33L8 1.33ZM7.33 9.8L5.53 8L6.47 7.06L7.33 7.92L9.53 5.72L10.47 6.66L7.33 9.8Z"
        fill={colors.accent}
      />
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M14.17 9.17L8.33 15C7.89 15.44 7.29 15.69 6.67 15.69C6.05 15.69 5.44 15.44 5.01 15C4.57 14.56 4.31 13.95 4.31 13.33C4.31 12.71 4.57 12.11 5.01 11.67L12.51 4.17C12.79 3.89 13.17 3.73 13.57 3.73C13.96 3.73 14.34 3.89 14.63 4.17C14.91 4.46 15.07 4.84 15.07 5.23C15.07 5.63 14.91 6.01 14.63 6.29L7.12 13.79C6.98 13.93 6.79 14.01 6.59 14.01C6.39 14.01 6.21 13.93 6.07 13.79C5.93 13.65 5.85 13.46 5.85 13.27C5.85 13.07 5.93 12.88 6.07 12.74L11.91 6.91"
        stroke={colors.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.67C9.12 1.67 8.27 2.02 7.64 2.64C7.02 3.27 6.67 4.12 6.67 5V10C6.67 10.88 7.02 11.73 7.64 12.36C8.27 12.98 9.12 13.33 10 13.33C10.88 13.33 11.73 12.98 12.36 12.36C12.98 11.73 13.33 10.88 13.33 10V5C13.33 4.12 12.98 3.27 12.36 2.64C11.73 2.02 10.88 1.67 10 1.67ZM4.17 8.33V10C4.17 11.55 4.78 13.03 5.88 14.13C6.97 15.22 8.46 15.83 10 15.83C11.55 15.83 13.03 15.22 14.13 14.13C15.22 13.03 15.83 11.55 15.83 10V8.33M10 15.83V18.33"
        stroke={colors.primary}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Top Navigation ─────────────────────────────────────── */

function TopNav() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 375,
        zIndex: 10,
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          height: 112,
          background: colors.surfaceStrong,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 63,
            width: 335,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Hamburger */}
          <div
            style={{
              width: 52,
              height: 48,
              borderRadius: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.badgeBg,
              border: `1px solid ${colors.borderSubtle}`,
            }}
          >
            <HamburgerIcon />
          </div>

          {/* Right side — avatars + M */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Avatar pair badge */}
            <div
              style={{
                height: 48,
                borderRadius: 56,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "2px 8px",
                backgroundColor: colors.badgeBg,
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              {/* Ivy avatar */}
              <div style={{ display: "flex", alignItems: "flex-start", paddingRight: 8, position: "relative" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(235,243,237,0.8)",
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      color: colors.accent,
                      fontFamily: "'Georgia', serif",
                      fontStyle: "italic",
                      fontSize: 14.3,
                      letterSpacing: "-0.65px",
                    }}
                  >
                    ivy
                  </span>
                </div>
                {/* Doctor avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#d4c5b0",
                    border: "1px solid white",
                    marginLeft: -8,
                    position: "relative",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  {/* Placeholder silhouette */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #c9b8a0 0%, #b8a48e 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="7" r="3.5" fill="rgba(255,255,255,0.5)" />
                      <ellipse cx="9" cy="16" rx="5.5" ry="4" fill="rgba(255,255,255,0.5)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* M badge */}
            <div
              style={{
                width: 52,
                height: 48,
                borderRadius: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.badgeBg,
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <span
                style={{
                  color: colors.primary,
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 15,
                  letterSpacing: "-0.57px",
                  lineHeight: "18.2px",
                }}
              >
                M
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fade gradient below nav */}
      <div
        style={{
          height: 50,
          width: "100%",
          background: `linear-gradient(to top, rgba(255,255,255,0), ${colors.surfaceStrong})`,
        }}
      />
    </div>
  );
}

/* ─── Selected Chip ──────────────────────────────────────── */

function SelectedChip() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 146,
        width: 335,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: 52,
          borderRadius: 16,
          padding: "0 16px",
          backgroundColor: colors.secondary,
        }}
      >
        <CheckIcon />
        <span
          style={{
            color: colors.primary,
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 16.3,
            letterSpacing: "-0.57px",
            lineHeight: "18.6px",
          }}
        >
          I'm noticing some side effects
        </span>
      </div>
    </div>
  );
}

/* ─── Speed Buttons ──────────────────────────────────────── */

const SPEED_OPTIONS = [1.0, 1.1, 1.2, 1.3, 1.4];

function SpeedButtons({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 272,
        width: 200,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {SPEED_OPTIONS.map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: active === i ? "#2DA5A2" : "rgba(22,43,51,0.2)",
              fontWeight: 600,
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              opacity: active === i ? 1 : 0.4,
            }}
          >
            {i + 1}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Thinking Indicator Row ─────────────────────────────── */

function ThinkingIndicator({
  speedMultiplier,
}: {
  speedMultiplier: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 222,
        width: 335,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <ThinkingShape speedMultiplier={speedMultiplier} />
    </div>
  );
}

/* ─── Prompt Bar ─────────────────────────────────────────── */

function PromptBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 375,
      }}
    >
      {/* Fade above */}
      <div
        style={{
          height: 50,
          width: "100%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))",
        }}
      />

      {/* Bar */}
      <div style={{ width: "100%", backgroundColor: colors.surface }}>
        <div
          style={{
            width: 375,
            backgroundColor: colors.secondary,
            borderRadius: "24px 24px 45px 45px",
            padding: "24px 22px 36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldIcon />
              <span
                style={{
                  color: colors.primary,
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 18,
                  letterSpacing: "-0.89px",
                  lineHeight: "24.85px",
                }}
              >
                Ask Ivy...
              </span>
            </div>

            <div style={{ display: "flex", gap: 4, height: 48, alignItems: "center" }}>
              <div
                style={{
                  width: 52,
                  height: 48,
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${colors.borderInput}`,
                }}
              >
                <AttachmentIcon />
              </div>
              <div
                style={{
                  width: 52,
                  height: 48,
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${colors.borderInput}`,
                }}
              >
                <MicrophoneIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone Frame ────────────────────────────────────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: 375,
        height: 812,
        flexShrink: 0,
        filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 44,
          overflow: "hidden",
          backgroundColor: "#FAFAFA",
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────── */

export default function App() {
  const [speedIndex, setSpeedIndex] = useState(0);
  const speedMultiplier = SPEED_OPTIONS[speedIndex];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111119",
      }}
    >
      <PhoneFrame>
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <SelectedChip />
          <ThinkingIndicator speedMultiplier={speedMultiplier} />
          <SpeedButtons active={speedIndex} onSelect={setSpeedIndex} />
          <PromptBar />
          <TopNav />
        </div>
      </PhoneFrame>
    </div>
  );
}
