import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useReplay, DemoShell } from "./demo-utils";

export function ListPullRefreshDemo() {
  const { key, replay } = useReplay();
  const [refreshing, setRefreshing] = useState(false);
  const [pulled, setPulled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setRefreshing(false);
    setPulled(false);
    const t = setTimeout(async () => {
      setPulled(true);
      await controls.start({ y: 60, transition: { duration: 0.4 } });
      setRefreshing(true);
      await new Promise((r) => setTimeout(r, 1500));
      setRefreshing(false);
      setPulled(false);
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      });
    }, 500);
    return () => clearTimeout(t);
  }, [key, controls]);

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-4 z-10">
          <AnimatePresence>
            {pulled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div
                  className="w-6 h-6 border-2 border-gray-300 border-t-indigo-500 rounded-full"
                  animate={refreshing ? { rotate: 360 } : {}}
                  transition={
                    refreshing
                      ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                      : {}
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div className="p-4 space-y-3" animate={controls}>
          <div className="text-[14px] text-gray-800">Messages</div>
          {[
            { name: "Sarah C.", msg: "Just pushed the new build!", time: "2m" },
            { name: "Mike D.", msg: "Can you review the PR?", time: "15m" },
            { name: "Lisa T.", msg: "Meeting moved to 3pm", time: "1h" },
            { name: "Team", msg: "Sprint planning tomorrow", time: "3h" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-gray-800">{item.name}</div>
                <div className="text-[11px] text-gray-400 truncate">
                  {item.msg}
                </div>
              </div>
              <span className="text-[10px] text-gray-300 flex-shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </DemoShell>
  );
}