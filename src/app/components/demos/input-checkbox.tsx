import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function InputCheckboxDemo() {
  const [checks, setChecks] = useState([false, false, false, false]);
  const toggle = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const items = [
    "Review design specs",
    "Update component library",
    "Write animation tokens",
    "Publish to npm",
  ];

  return (
    <DemoShell>
      <div className="w-full px-5 space-y-2">
        <div className="text-[14px] text-gray-800 mb-2">Today's Tasks</div>
        {items.map((item, i) => (
          <motion.button
            key={item}
            onClick={() => toggle(i)}
            className="w-full bg-white rounded-xl p-3.5 shadow-sm flex items-center gap-3 text-left"
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0"
              animate={{
                backgroundColor: checks[i] ? "#6366f1" : "transparent",
                borderColor: checks[i] ? "#6366f1" : "#d1d5db",
              }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: checks[i] ? 1 : 0,
                  opacity: checks[i] ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-[13px]"
              animate={{
                color: checks[i] ? "#9ca3af" : "#374151",
                textDecoration: checks[i] ? "line-through" : "none",
              }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.span>
          </motion.button>
        ))}
        <div className="pt-2 text-center">
          <span className="text-[11px] text-gray-300">
            {checks.filter(Boolean).length} of {checks.length} complete
          </span>
        </div>
      </div>
    </DemoShell>
  );
}