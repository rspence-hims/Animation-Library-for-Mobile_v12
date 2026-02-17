import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useReplay, DemoShell } from "./demo-utils";

export function FeedbackSkeletonDemo() {
  const { key, replay } = useReplay();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="w-full px-4 space-y-3">
        <div className="text-[14px] text-gray-800">Activity</div>
        {loaded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {[
              { name: "Sarah Chen", action: "Pushed to main", time: "2m ago" },
              { name: "Alex Kim", action: "Opened a PR", time: "15m ago" },
              { name: "Jordan Lee", action: "Left a comment", time: "1h ago" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[12px] text-gray-800">{item.name}</div>
                  <div className="text-[11px] text-gray-400">
                    {item.action}
                  </div>
                </div>
                <span className="text-[10px] text-gray-300">{item.time}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-2.5 w-32 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-2 w-8 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
    </DemoShell>
  );
}