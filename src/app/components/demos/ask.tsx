import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DemoShell } from "./demo-utils";

/* ─── Collapsed prescription card ────────────────────────── */

function PrescriptionCardCollapsed({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="mx-[21px] mb-3 bg-[#13262e] rounded-[24px] overflow-hidden relative"
      style={{ height: 303, width: 256 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {/* Text: Approved + Arrives */}
      <div className="absolute left-[16px] top-[16px] flex flex-col gap-1 w-[224px]">
        <p className="text-[20px] text-white tracking-[-1px] leading-[20px]">
          Approved
        </p>
        <p className="text-[16px] leading-[18px] tracking-[-0.5px]">
          <span className="text-white/40">Arrives: </span>
          <span className="text-white">Monday</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute left-[16px] top-[269px] w-[224px] flex gap-[2px] h-[6px] overflow-hidden rounded-[30px]">
        <div className="bg-white h-full rounded-[30px] w-[120px]" />
        <div className="bg-white/20 h-full flex-1 rounded-[30px]" />
      </div>
    </motion.div>
  );
}

/* ─── Ask prompt bar ─────────────────────────────────────── */

function AskPromptBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      {/* Fade-out gradient */}
      <div className="h-[50px] bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.95)]" />
      {/* Prompt bar */}
      <div className="bg-[rgba(255,255,255,0.95)]">
      </div>
    </div>
  );
}

/* ─── Main demo ──────────────────────────────────────────── */

export function AskDemo({ replayCount = 0 }: { replayCount?: number }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 400));   // prescription card
    return () => timers.forEach(clearTimeout);
  }, [replayCount]);

  return (
    <DemoShell>
      <div className="absolute inset-0 bg-white overflow-hidden">
        {/* Status bar spacer */}
        <div className="h-[45px]" />

        {/* Conversation area (scrollable above prompt) */}
        <div className="absolute top-[45px] left-0 right-0 bottom-[158px] overflow-y-auto">
        </div>

        {/* Bottom Ask prompt */}
        <AskPromptBar />
      </div>
    </DemoShell>
  );
}