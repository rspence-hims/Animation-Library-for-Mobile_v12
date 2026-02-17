import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function FeedbackProgressDemo() {
  const { key, replay } = useReplay();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const steps = [15, 35, 55, 72, 88, 100];
    const timers = steps.map((val, i) =>
      setTimeout(() => setProgress(val), (i + 1) * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="w-full px-6 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[12px] text-gray-500">
                Uploading design.fig
              </span>
            </div>
            <span className="text-[12px] text-gray-700">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0, 0, 0.58, 1] }}
            />
          </div>
        </div>
        <div className="space-y-3">
          <span className="text-[12px] text-gray-500">Onboarding Steps</span>
          <div className="flex gap-2">
            {["Profile", "Team", "Invite", "Plan", "Done"].map((step, i) => (
              <div key={step} className="flex-1 space-y-1.5">
                <motion.div
                  className="h-1.5 rounded-full"
                  animate={{
                    backgroundColor:
                      progress >= (i + 1) * 20 ? "#6366f1" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className={`text-[9px] text-center ${
                    progress >= (i + 1) * 20
                      ? "text-indigo-500"
                      : "text-gray-300"
                  }`}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}