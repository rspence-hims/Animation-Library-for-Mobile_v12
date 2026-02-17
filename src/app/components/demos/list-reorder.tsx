import { useState } from "react";
import { motion } from "motion/react";
import { GripVertical } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function ListReorderDemo() {
  const [items] = useState([
    { id: "1", label: "Design Review", color: "bg-violet-100 text-violet-600" },
    { id: "2", label: "Update Tokens", color: "bg-blue-100 text-blue-600" },
    { id: "3", label: "Write Docs", color: "bg-emerald-100 text-emerald-600" },
    { id: "4", label: "Ship v2.0", color: "bg-amber-100 text-amber-600" },
  ]);
  const [dragging, setDragging] = useState<string | null>(null);

  return (
    <DemoShell>
      <div className="w-full px-4 space-y-2">
        <p className="text-[11px] text-gray-400 mb-1">Drag items to reorder</p>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            drag="y"
            dragConstraints={{ top: -10, bottom: 10 }}
            dragElastic={0.1}
            onDragStart={() => setDragging(item.id)}
            onDragEnd={() => setDragging(null)}
            className={`bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 cursor-grab active:cursor-grabbing ${
              dragging === item.id ? "shadow-lg z-10" : ""
            }`}
            whileDrag={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <GripVertical className="w-4 h-4 text-gray-300" />
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md ${item.color}`}
            >
              Task
            </span>
            <span className="text-[13px] text-gray-700">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </DemoShell>
  );
}