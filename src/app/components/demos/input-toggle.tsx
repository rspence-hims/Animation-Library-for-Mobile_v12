import { useState } from "react";
import { motion } from "motion/react";
import { Wifi, Bluetooth, Volume2 } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function InputToggleDemo() {
  const [toggles, setToggles] = useState([true, false, true]);
  const toggle = (i: number) =>
    setToggles((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const labels = [
    { name: "Wi-Fi", icon: Wifi },
    { name: "Bluetooth", icon: Bluetooth },
    { name: "Sound", icon: Volume2 },
  ];

  return (
    <DemoShell>
      <div className="w-full px-5 space-y-3">
        <div className="text-[14px] text-gray-800 mb-1">Settings</div>
        {labels.map(({ name, icon: Icon }, i) => (
          <div
            key={name}
            className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-gray-400" />
              <span className="text-[13px] text-gray-700">{name}</span>
            </div>
            <button
              onClick={() => toggle(i)}
              className="relative w-12 h-7 rounded-full transition-colors duration-250"
              style={{
                backgroundColor: toggles[i] ? "#6366f1" : "#d1d5db",
              }}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ left: toggles[i] ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        ))}
      </div>
    </DemoShell>
  );
}