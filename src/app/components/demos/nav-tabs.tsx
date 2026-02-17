import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, User } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function NavTabsDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Home", "Search", "Profile"];
  const icons = [Home, Search, User];

  return (
    <DemoShell>
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                  ["bg-blue-100", "bg-orange-100", "bg-green-100"][activeTab]
                }`}
              >
                {icons.map(
                  (Icon, i) =>
                    activeTab === i && (
                      <Icon
                        key={i}
                        className={`w-8 h-8 ${
                          ["text-blue-500", "text-orange-500", "text-green-500"][i]
                        }`}
                      />
                    )
                )}
              </div>
              <span className="text-[14px] text-gray-700">
                {tabs[activeTab]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative flex items-center border-t border-gray-100 bg-white pb-6 pt-2">
          <motion.div
            className="absolute top-0 h-0.5 bg-gray-900 rounded-full"
            animate={{
              left: `${(activeTab * 100) / 3}%`,
              width: `${100 / 3}%`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          {tabs.map((tab, i) => {
            const Icon = icons[i];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="flex-1 flex flex-col items-center gap-0.5 py-1"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    activeTab === i ? "text-gray-900" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-[10px] transition-colors ${
                    activeTab === i ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </DemoShell>
  );
}