import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DemoShell } from "./demo-utils";

export function NavSegmentedDemo() {
  const [active, setActive] = useState(0);
  const segments = ["Daily", "Weekly", "Monthly"];

  return (
    <DemoShell>
      <div className="w-full px-5 space-y-6">
        {/* Segmented control */}
        <div className="relative bg-gray-200/80 rounded-xl p-1 flex">
          <motion.div
            className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
            animate={{
              left: `calc(${(active * 100) / 3}% + 4px)`,
              width: `calc(${100 / 3}% - 5px)`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          {segments.map((seg, i) => (
            <button
              key={seg}
              onClick={() => setActive(i)}
              className="flex-1 relative z-10 py-2 text-center"
            >
              <span
                className={`text-[13px] transition-colors duration-200 ${
                  active === i ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {seg}
              </span>
            </button>
          ))}
        </div>

        {/* Content that changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-[11px] text-gray-400 uppercase">
                {segments[active]} Summary
              </div>
              <div className="text-[24px] text-gray-800 mt-1">
                {["$128.40", "$892.10", "$3,241.80"][active]}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="text-[11px] text-emerald-500">
                  +{["4.2", "12.8", "8.5"][active]}%
                </div>
                <div className="text-[11px] text-gray-300">
                  vs last {segments[active].toLowerCase().replace("ly", "")}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 bg-white rounded-xl p-3 shadow-sm"
                >
                  <div className="h-2 w-12 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </DemoShell>
  );
}