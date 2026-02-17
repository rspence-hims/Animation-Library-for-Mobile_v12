import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function ModalCenterDemo() {
  const { key, replay } = useReplay();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0">
        <div className="p-4 space-y-3 opacity-60">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-48 bg-gray-100 rounded" />
          <div className="h-32 w-full bg-gray-100 rounded-xl" />
        </div>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="absolute inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                  className="bg-white rounded-2xl p-5 w-full shadow-2xl"
                >
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-[15px] text-gray-800">
                      Payment Successful
                    </div>
                    <div className="text-[12px] text-gray-400">
                      $42.50 charged to &bull;&bull;&bull;&bull; 4289
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full bg-gray-900 text-white rounded-xl py-2.5 text-[13px]"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DemoShell>
  );
}