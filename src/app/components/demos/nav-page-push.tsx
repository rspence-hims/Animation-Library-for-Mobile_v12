import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Image } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function NavPagePushDemo() {
  const { key, replay } = useReplay();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    const t = setTimeout(() => setPage(1), 600);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {page === 0 && (
            <motion.div
              key="list"
              className="absolute inset-0 bg-white p-4"
              initial={{ x: 0 }}
              exit={{ x: "-30%", opacity: 0.5 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="text-[15px] text-gray-800 mb-3">Products</div>
              <div className="space-y-3">
                {["Wireless Earbuds", "Phone Case", "USB-C Cable"].map(
                  (name, i) => (
                    <div
                      key={name}
                      className="bg-gray-50 rounded-xl p-3 flex items-center gap-3"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg ${
                          [
                            "bg-gradient-to-br from-blue-200 to-blue-300",
                            "bg-gradient-to-br from-amber-200 to-amber-300",
                            "bg-gradient-to-br from-green-200 to-green-300",
                          ][i]
                        }`}
                      />
                      <div>
                        <div className="text-[13px] text-gray-700">{name}</div>
                        <div className="text-[11px] text-gray-400">
                          ${[29, 19, 12][i]}.99
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}
          {page === 1 && (
            <motion.div
              key="detail"
              className="absolute inset-0 bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                onClick={() => setPage(0)}
                className="flex items-center gap-1 text-indigo-500 p-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[13px]">Products</span>
              </button>
              <div className="px-4 space-y-3">
                <div className="w-full h-44 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Image className="w-10 h-10 text-blue-300" />
                </div>
                <div className="text-[16px] text-gray-800">
                  Wireless Earbuds
                </div>
                <div className="text-[12px] text-gray-400 leading-relaxed">
                  Premium noise-canceling earbuds with 24-hour battery life and
                  spatial audio support.
                </div>
                <button className="w-full bg-gray-900 text-white rounded-xl py-3 text-[13px]">
                  Add to Cart — $29.99
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoShell>
  );
}