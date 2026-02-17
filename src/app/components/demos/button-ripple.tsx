import { useState } from "react";
import { motion } from "motion/react";
import { DemoShell } from "./demo-utils";

export function ButtonRippleDemo() {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: xPos, y: yPos }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600
    );
  };

  return (
    <DemoShell>
      <div className="w-full px-5 space-y-4">
        <p className="text-[11px] text-gray-400 text-center">
          Tap anywhere on the surfaces
        </p>
        {[
          { label: "Send Message", bg: "bg-indigo-500", ripple: "bg-white/25", text: "text-white" },
          { label: "Save Draft", bg: "bg-white", ripple: "bg-indigo-400/20", text: "text-gray-700" },
          { label: "Archive", bg: "bg-gray-100", ripple: "bg-gray-400/20", text: "text-gray-600" },
        ].map((btn) => (
          <div
            key={btn.label}
            onClick={handleClick}
            className={`relative overflow-hidden ${btn.bg} rounded-2xl py-4 px-4 text-center cursor-pointer select-none shadow-sm`}
          >
            <span className={`text-[14px] ${btn.text} relative z-10`}>
              {btn.label}
            </span>
            {ripples.map((r) => (
              <motion.div
                key={r.id}
                className={`absolute ${btn.ripple} rounded-full pointer-events-none`}
                style={{ left: r.x, top: r.y, x: "-50%", y: "-50%" }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0, 0, 0.58, 1] }}
              />
            ))}
          </div>
        ))}
      </div>
    </DemoShell>
  );
}