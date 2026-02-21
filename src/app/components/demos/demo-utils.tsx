import { useState, useCallback, useEffect, useRef, useId } from "react";

export function useReplay() {
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey((k) => k + 1), []);
  return { key, replay };
}

/* ─── Chroma + Blur Reveal ───────────────────────────────── */

const CHROMA_DURATION = 800;
const CHROMA_START = 5;
const BLUR_START = 14;
const EDGE_PAD = 20;

function cubicOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ChromaBlurReveal({
  active,
  triggerKey,
  children,
}: {
  active: boolean;
  triggerKey: number;
  children: React.ReactNode;
}) {
  const rawId = useId();
  const filterId = `chroma_${rawId.replace(/:/g, "")}`;
  const rOffRef = useRef<SVGFEOffsetElement>(null);
  const bOffRef = useRef<SVGFEOffsetElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const [settled, setSettled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setSettled(false);
      return;
    }

    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / CHROMA_DURATION, 1);
      const ease = cubicOut(p);

      const chroma = CHROMA_START * (1 - ease);
      const blur = BLUR_START * (1 - ease);

      rOffRef.current?.setAttribute("dx", String(chroma));
      bOffRef.current?.setAttribute("dx", String(-chroma));
      blurRef.current?.setAttribute("stdDeviation", String(blur));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSettled(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, triggerKey]);

  const useFilter = active && !settled;

  return (
    <>
      {useFilter && (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feGaussianBlur
                ref={blurRef}
                in="SourceGraphic"
                stdDeviation={String(BLUR_START)}
                result="blurred"
              />
              <feColorMatrix
                type="matrix"
                in="blurred"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="r"
              />
              <feColorMatrix
                type="matrix"
                in="blurred"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="g"
              />
              <feColorMatrix
                type="matrix"
                in="blurred"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="b"
              />
              <feOffset ref={rOffRef} in="r" dx={String(CHROMA_START)} result="rOff" />
              <feOffset in="g" dx="0" result="gPass" />
              <feOffset ref={bOffRef} in="b" dx={String(-CHROMA_START)} result="bOff" />
              <feBlend in="rOff" in2="gPass" mode="screen" result="rg" />
              <feBlend in="rg" in2="bOff" mode="screen" />
            </filter>
          </defs>
        </svg>
      )}
      <div
        className="absolute"
        style={{
          inset: useFilter ? `-${EDGE_PAD}px` : '0px',
          filter: useFilter ? `url(#${filterId})` : undefined,
        }}
      >
        <div className="absolute" style={{ inset: useFilter ? `${EDGE_PAD}px` : '0px' }}>
          {children}
        </div>
      </div>
    </>
  );
}

export function DemoShell({
  children,
  onReplay,
}: {
  children: React.ReactNode;
  onReplay?: () => void;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-50">
      {children}
    </div>
  );
}
