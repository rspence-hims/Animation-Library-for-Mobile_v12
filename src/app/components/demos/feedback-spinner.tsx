import { motion } from "motion/react";
import { DemoShell } from "./demo-utils";

export function FeedbackSpinnerDemo() {
  return (
    <DemoShell>
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        {/* Ring spinner */}
        <div className="text-center space-y-3">
          <motion.div
            className="w-10 h-10 border-3 border-gray-200 border-t-indigo-500 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-[10px] text-gray-400">Loading</span>
        </div>
        {/* Bouncing dots */}
        <div className="text-center space-y-3">
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 bg-violet-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">Processing</span>
        </div>
        {/* Equalizer */}
        <div className="text-center space-y-3">
          <div className="flex gap-0.5 justify-center items-end h-7">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-400 rounded-full"
                animate={{ height: [12, 28, 12] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">Syncing</span>
        </div>
      </div>
    </DemoShell>
  );
}