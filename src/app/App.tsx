import { useState, useCallback } from "react";
import { AnimationItem } from "./components/animation-data";
import { Sidebar } from "./components/sidebar";
import { DescriptionPanel } from "./components/description-panel";
import { SwiftCodePanel } from "./components/swift-code-panel";
import { demoComponents } from "./components/animation-demos";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff, Play, MousePointerClick, Code2 } from "lucide-react";

type RightPanelMode = "closed" | "details" | "swift";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[375px] h-[812px] flex-shrink-0" style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))" }}>
      {/* Screen — clean white rounded rectangle */}
      <div className="absolute inset-0 rounded-[44px] overflow-hidden bg-gray-50">
        {/* Content area */}
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<AnimationItem | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelMode, setRightPanelMode] = useState<RightPanelMode>("closed");
  const [replayCount, setReplayCount] = useState(0);

  const DemoComponent = selectedItem ? demoComponents[selectedItem.id] : null;

  const handleSelectItem = (item: AnimationItem | null) => {
    setSelectedItem(item);
    setReplayCount(0);
  };

  const togglePanel = useCallback((mode: "details" | "swift") => {
    setRightPanelMode((prev) => (prev === mode ? "closed" : mode));
  }, []);

  return (
    <div className="size-full flex bg-[#111119] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        selectedItem={selectedItem}
        onSelectItem={handleSelectItem}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        {/* Vertical stack: title bar + phone frame */}
        <div className="flex flex-col items-center flex-shrink-0">

          {/* Title bar above phone — 30px gap to phone */}
          <div className="w-[375px] mb-[30px] h-8 flex items-center">
            {/* Play button — left aligned */}
            <button
              onClick={() => setReplayCount((c) => c + 1)}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
              title="Replay animation"
            >
              <Play className="w-4 h-4 text-white/40" />
            </button>

            {/* Title text */}
            <span className="text-white/60 text-[14px] tracking-tight truncate px-4">
              {selectedItem ? selectedItem.name : "Choose a pattern from the left panel"}
            </span>
          </div>

          {/* Phone Frame + right-side buttons wrapper */}
          <div className="relative flex-shrink-0">
            <PhoneFrame>
              <AnimatePresence mode="wait">
                {DemoComponent && (
                  <motion.div
                    key={`${selectedItem?.id}-${replayCount}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-full h-full"
                  >
                    <DemoComponent replayCount={replayCount} />
                  </motion.div>
                )}
              </AnimatePresence>
              {!DemoComponent && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-12">
                  <MousePointerClick className="w-8 h-8 text-gray-300" />
                  <p className="text-gray-400 text-[13px] text-center leading-relaxed">Choose a pattern from the left panel to preview it here</p>
                </div>
              )}
            </PhoneFrame>

            {/* Right-side buttons — stacked vertically */}
            <div className="absolute top-4 left-full ml-3 flex flex-col gap-2 z-20">
              {/* See details button */}
              <button
                onClick={() => togglePanel("details")}
                className={`h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors gap-2 ${
                  rightPanelMode === "details" ? "w-8 bg-white/10" : "px-3"
                }`}
                title={rightPanelMode === "details" ? "Hide details" : "Show details"}
              >
                {rightPanelMode === "details" ? (
                  <EyeOff className="w-4 h-4 text-white/40" />
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-white/40" />
                    <span className="text-white/40 text-[12px] whitespace-nowrap">See details</span>
                  </>
                )}
              </button>

              {/* Show Swift code button */}
              <button
                onClick={() => togglePanel("swift")}
                className={`h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors gap-2 ${
                  rightPanelMode === "swift" ? "w-8 bg-white/10" : "px-3"
                }`}
                title={rightPanelMode === "swift" ? "Hide Swift code" : "Show Swift code"}
              >
                {rightPanelMode === "swift" ? (
                  <EyeOff className="w-4 h-4 text-white/40" />
                ) : (
                  <>
                    <Code2 className="w-4 h-4 text-white/40" />
                    <span className="text-white/40 text-[12px] whitespace-nowrap">Swift code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Rail — Description or Swift Panel */}
      <motion.div
        animate={{ width: rightPanelMode !== "closed" ? 340 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="h-screen flex-shrink-0 overflow-hidden"
      >
        <div className="w-[340px] h-full py-8 pr-4">
          <div className="h-full rounded-xl bg-[#1a1a2e] ring-1 ring-white/10 overflow-hidden">
            {rightPanelMode === "details" && (
              <DescriptionPanel item={selectedItem} replayCount={replayCount} />
            )}
            {rightPanelMode === "swift" && (
              <SwiftCodePanel item={selectedItem} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
