import { motion } from "motion/react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function ButtonTapDemo() {
  return (
    <DemoShell>
      <div className="w-full px-6 space-y-4">
        <p className="text-[11px] text-gray-400 text-center mb-2">
          Press and release each button
        </p>
        <motion.button
          className="w-full bg-gray-900 text-white rounded-2xl py-3.5 text-[14px] shadow-sm"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Add to Cart
        </motion.button>
        <motion.button
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl py-3.5 text-[14px] shadow-lg shadow-indigo-500/25"
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Subscribe — $9.99/mo
        </motion.button>
        <motion.button
          className="w-full border border-gray-200 text-gray-700 rounded-2xl py-3.5 text-[14px] bg-white"
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Maybe Later
        </motion.button>
        <div className="flex gap-3 pt-1">
          {[Heart, ShoppingCart, Star].map((Icon, i) => (
            <motion.button
              key={i}
              className="flex-1 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center"
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-5 h-5 text-gray-500" />
            </motion.button>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}