import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReplay, DemoShell } from "./demo-utils";

export function SheetBottomDemo() {
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
        <div className="p-4 space-y-3">
          <div className="text-[14px] text-gray-800">Playlist</div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300" />
              <div className="flex-1">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-2 w-16 bg-gray-100 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              <div className="px-5 pb-8 space-y-4">
                <div className="text-[15px] text-gray-800 text-center">
                  Share Playlist
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: "Messages", color: "bg-green-100", dot: "bg-green-400" },
                    { name: "Copy Link", color: "bg-blue-100", dot: "bg-blue-400" },
                    { name: "AirDrop", color: "bg-gray-100", dot: "bg-gray-400" },
                    { name: "More", color: "bg-purple-100", dot: "bg-purple-400" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
                      >
                        <div className={`w-5 h-5 rounded ${item.dot}`} />
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoShell>
  );
}