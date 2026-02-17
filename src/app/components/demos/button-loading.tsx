import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function ButtonLoadingDemo() {
  const { key, replay } = useReplay();
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    setState("idle");
    const t1 = setTimeout(() => setState("loading"), 600);
    const t2 = setTimeout(() => setState("success"), 2200);
    const t3 = setTimeout(() => setState("idle"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="w-full px-6 space-y-6">
        <div className="text-center space-y-1">
          <div className="text-[14px] text-gray-700">Place Order</div>
          <div className="text-[11px] text-gray-400">Total: $42.50</div>
        </div>

        <motion.button
          className="w-full py-3.5 rounded-2xl text-[14px] text-white relative overflow-hidden"
          animate={{
            backgroundColor:
              state === "success"
                ? "#10b981"
                : state === "loading"
                  ? "#4f46e5"
                  : "#111827",
          }}
          whileTap={state === "idle" ? { scale: 0.95 } : {}}
          transition={{ duration: 0.3 }}
          onClick={() => {
            if (state === "idle") {
              setState("loading");
              setTimeout(() => setState("success"), 1600);
              setTimeout(() => setState("idle"), 3200);
            }
          }}
        >
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="block"
              >
                Confirm Payment
              </motion.span>
            )}
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span>Processing...</span>
              </motion.div>
            )}
            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Order Placed!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Status indicators */}
        <div className="flex justify-center gap-2">
          {["idle", "loading", "success"].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                s === state ? "bg-indigo-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </DemoShell>
  );
}