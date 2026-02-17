import { motion } from "motion/react";
import { useReplay, DemoShell } from "./demo-utils";

export function ListStaggerDemo() {
  const { key, replay } = useReplay();

  const items = [
    { label: "Design Review", tag: "Design", color: "bg-violet-100 text-violet-600" },
    { label: "Update color tokens", tag: "Tokens", color: "bg-blue-100 text-blue-600" },
    { label: "Animate card transition", tag: "Motion", color: "bg-emerald-100 text-emerald-600" },
    { label: "Ship v2.0 to staging", tag: "Deploy", color: "bg-amber-100 text-amber-600" },
    { label: "Write migration guide", tag: "Docs", color: "bg-pink-100 text-pink-600" },
    { label: "Accessibility audit", tag: "A11y", color: "bg-cyan-100 text-cyan-600" },
  ];

  return (
    <DemoShell onReplay={replay}>
      <div className="w-full px-4 space-y-2">
        <motion.div
          key={`${key}-header`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-[14px] text-gray-800 mb-1"
        >
          Sprint Backlog
        </motion.div>
        {items.map((item, i) => (
          <motion.div
            key={`${key}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
              ease: [0, 0, 0.58, 1],
            }}
            className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded border-2 border-gray-200 flex-shrink-0" />
            <span className="text-[13px] text-gray-700 flex-1">
              {item.label}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md ${item.color}`}
            >
              {item.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </DemoShell>
  );
}