import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import imgBottle from "figma:asset/d656ba7ea9c64660e689fc69995f4aee6c3bb579.png";
import { DemoShell } from "./demo-utils";
import BottomArea from "../../../imports/BottomArea";

/* ─── Sub-components ─────────────────────────────────────── */

function NavBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <div className="relative w-[119px] h-[48px] rounded-[56px] outline outline-1 outline-[rgba(154,189,177,0.2)] bg-[rgba(235,243,237,0.1)]">
        {/* Teal selected indicator */}
        <div className="absolute left-[2px] top-[2px] w-[57.5px] h-[44px] rounded-[24px] bg-[#2da5a2]" />
        {/* Left button – person+sparkle (selected) */}
        <div className="absolute left-[2px] top-[2px] w-[57.5px] h-[44px] rounded-[24px] flex items-center justify-center">
          <svg width="19.2" height="19.2" viewBox="0 0 19.2 19.2" fill="none">
            <g clipPath="url(#clip0_nav_glass)">
              <path d="M6 5.19961C6 3.21138 7.61177 1.59961 9.6 1.59961C11.5882 1.59961 13.2 3.21138 13.2 5.19961C13.2 7.18783 11.5882 8.79961 9.6 8.79961C7.61177 8.79961 6 7.18783 6 5.19961Z" fill="white"/>
              <path d="M9.59962 9.59961C6.5341 9.59961 4.18793 11.4366 3.23528 14.0124C2.96293 14.7488 3.14939 15.4747 3.58232 15.9906C4.00422 16.4934 4.6555 16.7996 5.35709 16.7996H10.4785C9.97678 16.0822 9.59961 15.1929 9.59961 14.1996C9.59961 12.5753 10.6217 10.6478 12.6081 10.2668C11.7203 9.83927 10.7069 9.59961 9.59962 9.59961Z" fill="white"/>
            </g>
            <g clipPath="url(#clip1_nav_glass)">
              <path d="M15.5041 10.2672C15.4541 10.1007 15.3008 9.98665 15.127 9.98665C14.9531 9.98665 14.7998 10.1007 14.7498 10.2672C14.4666 11.2113 14.0995 11.8845 13.5936 12.3905C13.0877 12.8964 12.4144 13.2635 11.4704 13.5467C11.3038 13.5967 11.1898 13.75 11.1898 13.9238C11.1898 14.0977 11.3038 14.251 11.4704 14.3009C12.4144 14.5842 13.0877 14.9513 13.5936 15.4572C14.0995 15.9631 14.4666 16.6364 14.7498 17.5804C14.7998 17.747 14.9531 17.861 15.127 17.861C15.3008 17.861 15.4541 17.747 15.5041 17.5804C15.7873 16.6364 16.1544 15.9631 16.6603 15.4572C17.1662 14.9513 17.8395 14.5842 18.7835 14.3009C18.9501 14.251 19.0641 14.0977 19.0641 13.9238C19.0641 13.75 18.9501 13.5967 18.7835 13.5467C17.8395 13.2635 17.1662 12.8964 16.6603 12.3905C16.1544 11.8845 15.7873 11.2113 15.5041 10.2672Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_nav_glass"><rect fill="white" height="19.2" width="19.2"/></clipPath>
              <clipPath id="clip1_nav_glass"><rect fill="white" height="9.44922" transform="translate(10.4023 9.19922)" width="9.44922"/></clipPath>
            </defs>
          </svg>
        </div>
        {/* Right button – heartbeat (unselected) */}
        <div className="absolute left-[59.5px] top-[2px] w-[57.5px] h-[44px] rounded-[72px] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1.33333 8H3.51141C3.80226 8 4.05955 7.81144 4.14713 7.53409L5.84107 2.16995C5.89011 2.01464 6.10989 2.01464 6.15893 2.16995L9.84107 13.8301C9.89011 13.9854 10.1099 13.9854 10.1589 13.8301L11.8529 8.46591C11.9405 8.18856 12.1977 8 12.4886 8H14.6667" stroke="#162B33" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      {/* Spacer where M profile used to be (M is now positioned absolutely) */}
      <div className="w-[52px] h-[48px]" />
    </div>
  );
}

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end px-5 pb-3">
      <div className="bg-[#ebf3ed] rounded-2xl px-4 py-3">
        <span className="text-[14px] text-[#162b33] tracking-[-0.4px]">{text}</span>
      </div>
    </div>
  );
}

function ResponseText({ text }: { text: string }) {
  return (
    <div className="px-5 pt-2 pb-3">
      <p className="text-[14px] text-[#13262e] leading-[22px] tracking-[-0.5px] -mt-[10px]">
        {text}
      </p>
    </div>
  );
}

function SuggestionBubbles({ suggestions }: { suggestions: string[] }) {
  return (
    <div className="absolute bottom-[123px] left-5 right-5">
      <div className="flex flex-col gap-1 items-end">
        {suggestions.map((text) => (
          <div key={text} className="bg-[#ebf3ed] rounded-2xl px-4 py-3">
            <span className="text-[14px] text-[#162b33] tracking-[-0.4px]">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrescriptionCard({
  expanded,
  onExpand,
  easeTransition,
  showText,
}: {
  expanded: boolean;
  onExpand: () => void;
  easeTransition: { duration: number; ease: readonly [number, number, number, number] };
  showText: boolean;
}) {
  // Track whether showText was ever true this expand cycle
  const hadTextRef = useRef(false);
  if (showText) hadTextRef.current = true;
  if (!expanded) hadTextRef.current = false;

  // Labels mount on expand, but exit early when collapse starts (showText goes false after being true)
  const showLabels = expanded && !(hadTextRef.current && !showText);

  // ── Scale via Web Animations API on a plain wrapper div ──
  const bounceRef = useRef<HTMLDivElement>(null);
  const activeAnimRef = useRef<Animation | null>(null);

  const playScale = useCallback((keyframes: Keyframe[], duration: number, easing = "ease-out") => {
    if (!bounceRef.current) return;
    activeAnimRef.current?.cancel();
    const anim = bounceRef.current.animate(keyframes, {
      duration,
      easing,
      fill: "forwards",
    });
    activeAnimRef.current = anim;
    anim.onfinish = () => {
      activeAnimRef.current = null;
    };
  }, []);

  // Quick squeeze on press, then immediately expand
  const handleClick = useCallback(() => {
    if (expanded) return;
    playScale(
      [{ transform: "scale(1)" }, { transform: "scale(0.93)" }],
      110,
      "ease-out"
    );
    setTimeout(() => {
      onExpand();
    }, 140);
  }, [expanded, onExpand, playScale]);

  // Reset scale back to 1 after expand starts (clears the fill:forwards squeeze)
  const prevExpandedRef = useRef(expanded);
  useEffect(() => {
    const wasExpanded = prevExpandedRef.current;
    prevExpandedRef.current = expanded;

    if (expanded && !wasExpanded) {
      const t = setTimeout(() => {
        playScale(
          [{ transform: "scale(0.93)" }, { transform: "scale(1)" }],
          150,
          "ease-out"
        );
      }, 80);
      return () => clearTimeout(t);
    }
  }, [expanded, playScale]);

  // ── Glass effect (blur + brightness + RGB separation) ──
  const clipRef = useRef<HTMLDivElement>(null);
  const glassBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const glassRedOffRef = useRef<SVGFEOffsetElement>(null);
  const glassBlueOffRef = useRef<SVGFEOffsetElement>(null);
  const glassFuncRRef = useRef<SVGFEFuncRElement>(null);
  const glassFuncGRef = useRef<SVGFEFuncGElement>(null);
  const glassFuncBRef = useRef<SVGFEFuncBElement>(null);
  const glassRafRef = useRef(0);
  const glassInitRef = useRef(true);

  useEffect(() => {
    // Skip initial mount
    if (glassInitRef.current) { glassInitRef.current = false; return; }

    const el = clipRef.current;
    const blur = glassBlurRef.current;
    const rOff = glassRedOffRef.current;
    const bOff = glassBlueOffRef.current;
    const fR = glassFuncRRef.current;
    const fG = glassFuncGRef.current;
    const fB = glassFuncBRef.current;
    if (!el || !blur || !rOff || !bOff || !fR || !fG || !fB) return;

    cancelAnimationFrame(glassRafRef.current);

    // Tunable parameters
    const DURATION = 700;       // ms — matches card transition
    const PEAK = 0.35;          // peak at 35% — matches rotateX peak
    const MAX_BLUR = 16;        // px
    const MAX_BRIGHT = 1.8;     // multiplier
    const MAX_RGB_OFFSET = 10;  // px vertical channel shift

    el.style.filter = "url(#glass-fx)";
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);

      // Skewed bell curve: fast ramp to peak, smooth resolve
      const i = p <= PEAK
        ? Math.sin((p / PEAK) * Math.PI * 0.5)
        : Math.cos(((p - PEAK) / (1 - PEAK)) * Math.PI * 0.5);

      blur.setAttribute("stdDeviation", String(MAX_BLUR * i));
      rOff.setAttribute("dy", String(-MAX_RGB_OFFSET * i));
      bOff.setAttribute("dy", String(MAX_RGB_OFFSET * i));
      const bright = String(1 + (MAX_BRIGHT - 1) * i);
      fR.setAttribute("slope", bright);
      fG.setAttribute("slope", bright);
      fB.setAttribute("slope", bright);

      if (p < 1) {
        glassRafRef.current = requestAnimationFrame(tick);
      } else {
        el.style.filter = "";
        blur.setAttribute("stdDeviation", "0");
        rOff.setAttribute("dy", "0");
        bOff.setAttribute("dy", "0");
        fR.setAttribute("slope", "1");
        fG.setAttribute("slope", "1");
        fB.setAttribute("slope", "1");
      }
    };

    glassRafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(glassRafRef.current);
      if (el) el.style.filter = "";
    };
  }, [expanded]);

  return (
    <motion.div
      className="absolute cursor-pointer"
      onClick={handleClick}
      initial={false}
      animate={{
        left: expanded ? -1 : 21,
        top: expanded ? -1 : 275,
        right: expanded ? -1 : 103,
        bottom: expanded ? -1 : 234,
        rotateX: expanded ? [0, -11, 0] : [0, -14.01, 0],
      }}
      transition={{
        default: easeTransition,
        rotateX: {
          duration: 0.7,
          ease: [0.22, 0.68, 0.36, 1],
          times: [0, 0.35, 1],
        },
      }}
      style={{ zIndex: 10, transformOrigin: "50% 50%", transformPerspective: 550 }}
    >
      {/* SVG filter for glass effect — blur + brightness + RGB channel separation */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="glass-fx" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur ref={glassBlurRef} in="SourceGraphic" stdDeviation="0" result="blurred" />
            <feComponentTransfer in="blurred" result="bright">
              <feFuncR ref={glassFuncRRef} type="linear" slope="1" />
              <feFuncG ref={glassFuncGRef} type="linear" slope="1" />
              <feFuncB ref={glassFuncBRef} type="linear" slope="1" />
            </feComponentTransfer>
            <feColorMatrix type="matrix" in="bright" result="red"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feOffset ref={glassRedOffRef} in="red" dx="0" dy="0" result="red-shifted" />
            <feColorMatrix type="matrix" in="bright" result="green"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
            <feColorMatrix type="matrix" in="bright" result="blue"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            <feOffset ref={glassBlueOffRef} in="blue" dx="0" dy="0" result="blue-shifted" />
            <feComposite in="red-shifted" in2="green" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="rg" />
            <feComposite in="blue-shifted" in2="rg" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>
      {/* Scale wrapper — plain div, animated exclusively via WAAPI */}
      <div ref={bounceRef} className="absolute inset-0" style={{ transform: "scale(1)" }}>
      {/* Inner clip wrapper – uses clipPath instead of overflow+borderRadius to avoid
           sharp-corner flicker during 3D transforms (GPU compositing bug) */}
      <motion.div
        ref={clipRef}
        className="absolute inset-0 bg-[#13262e]"
        initial={false}
        animate={{
          clipPath: expanded
            ? ["inset(0px round 24px)", "inset(0px round 56px)", "inset(0px round 44px)"]
            : ["inset(0px round 44px)", "inset(0px round 36px)", "inset(0px round 24px)"],
        }}
        transition={{
          clipPath: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.3, 1],
          },
        }}
        style={{ willChange: "clip-path" }}
      >
      {/* Bottle image */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={false}
        animate={{
          width: expanded ? 676 : 376,
          height: expanded ? 1014 : 564,
          x: "-51%",
          y: expanded ? "-48%" : "-44%",
        }}
        transition={easeTransition}
      >
        <img
          alt=""
          className="w-full h-full object-cover pointer-events-none"
          src={imgBottle}
        />
      </motion.div>

      {/* Bottom gradient overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#36652a] to-transparent"
        initial={false}
        animate={{ height: showText ? 363 : 99 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Description text (state 3 – fades in + slides up) */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute left-[22px] w-[331px] bottom-[113px] text-[16px] text-white tracking-[-0.89px] leading-[24.85px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="mb-0">A licensed provider has approved your care plan, and your prescription is now being prepared by the Hers pharmacy.</p>
            <p className="mb-0">&nbsp;</p>
            <p>This step includes safety checks and careful preparation. You don't need to do anything right now—we'll keep you updated.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text: Approved + Arrives */}
      <motion.div
        className="absolute flex flex-col gap-1"
        initial={false}
        animate={{
          left: expanded ? 23 : 16,
          top: expanded ? 66 : 16,
        }}
        transition={easeTransition}
      >
        <p className="text-[20px] text-white tracking-[-1px] leading-[20px]">
          Approved
        </p>
        <p className="text-[16px] leading-[18px] tracking-[-0.5px]">
          <span className="text-white/40">Arrives: </span>
          <span className="text-white">Monday</span>
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute flex gap-[2px] h-[6px] overflow-hidden rounded-[30px]"
        initial={false}
        animate={{
          left: expanded ? 22 : 16,
          right: expanded ? 22 : 11,
          bottom: expanded ? 64 : 28,
        }}
        transition={easeTransition}
      >
        <motion.div
          className="bg-white h-full rounded-[30px]"
          initial={false}
          animate={{ width: "50%" }}
          transition={easeTransition}
        />
        <div className="bg-white/20 h-full flex-1 rounded-[30px]" />
      </motion.div>

      {/* Status labels (expanded only) */}
      <AnimatePresence>
        {showLabels && (
          <motion.div
            className="absolute left-[22px] right-[22px] bottom-[36px] flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.2 } }}
          >
            {[
              { label: "Requested", cls: "text-white" },
              { label: "Reviewed", cls: "text-white" },
              { label: "Shipped", cls: "text-white/50" },
              { label: "Delivered", cls: "text-white/50" },
            ].map((item, i, arr) => (
              <motion.span
                key={item.label}
                className={`text-[13px] ${item.cls} tracking-[-0.3px]`}
                custom={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.25,
                    delay: 0.7 + i * 0.1,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  x: -8,
                  transition: {
                    duration: 0.2,
                    delay: (arr.length - 1 - i) * 0.08,
                    ease: "easeIn",
                  },
                }}
              >
                {item.label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Main demo ──────────────────────────────────────────── */

export function Card3dGlassDemo({ replayCount = 0 }: { replayCount?: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Replay: reset everything, then auto-expand */
  useEffect(() => {
    if (replayCount > 0) {
      setShowText(false);
      setShowClose(false);
      setExpanded(false);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      const t = setTimeout(() => setExpanded(true), 600);
      return () => clearTimeout(t);
    }
  }, [replayCount]);

  /* Show close button ~350ms after expand, then text at ~700ms */
  useEffect(() => {
    if (expanded) {
      const tClose = setTimeout(() => setShowClose(true), 350);
      const tText = setTimeout(() => setShowText(true), 700);
      return () => { clearTimeout(tClose); clearTimeout(tText); };
    }
  }, [expanded]);

  /* Staged collapse: text + X disappear first, then card collapses */
  const handleCollapse = useCallback(() => {
    setShowText(false);
    setShowClose(false);
    collapseTimerRef.current = setTimeout(() => {
      setExpanded(false);
    }, 250);
  }, []);

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const easeTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as readonly [number, number, number, number] };

  return (
    <DemoShell>
      <div className="absolute inset-0 bg-white overflow-hidden">
        {/* ── Conversation background (fades out when expanded) ── */}
        <motion.div
          className="absolute inset-0 pt-[45px]"
          initial={false}
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <NavBar />
          <ChatBubble text="When will it arrive?" />
          <ResponseText text="I've been keeping an eye on things while you were away. Your care request has been reviewed and approved, and your prescription is now being prepared for shipment." />
          <SuggestionBubbles
            suggestions={[
              "What should I expect in the first week?",
              "What side effects are common?",
            ]}
          />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <BottomArea />
          </div>
        </motion.div>

        {/* ── M profile button (positioned to match X button location) ── */}
        <motion.div
          className="absolute top-[63px] right-[20px] w-[52px] h-[48px] rounded-[56px] outline outline-1 outline-[rgba(154,189,177,0.2)] bg-[rgba(235,243,237,0.1)] flex items-center justify-center z-[5]"
          initial={false}
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-[18px] text-[#162b33]">M</span>
        </motion.div>

        {/* ── The expanding prescription card ── */}
        <PrescriptionCard
          expanded={expanded}
          onExpand={() => setExpanded(true)}
          easeTransition={easeTransition}
          showText={showText}
        />

        {/* ── X close button (outside card so it doesn't inherit layout animation) ── */}
        <AnimatePresence>
          {showClose && (
            <motion.button
              className="absolute top-[63px] right-[20px] w-[48px] h-[48px] rounded-[24px] border border-[rgba(235,243,237,0.2)] flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              whileTap={{ scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              onClick={(e) => {
                e.stopPropagation();
                handleCollapse();
              }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </DemoShell>
  );
}
