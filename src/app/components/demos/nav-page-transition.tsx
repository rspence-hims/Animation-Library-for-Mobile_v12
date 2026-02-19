import { useReplay, DemoShell } from "./demo-utils";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import {
  colors,
  font,
  springPage,
  pageVariants,
  HeartSparkleIcon,
  ChartIcon,
  PulseIcon,
  HamburgerIcon,
  HomeContent,
  ProgressContent,
  InsightsContent,
} from "./nav-page-shared";

/* ─── Expanding Menu Constants ────────────────────────────── */

const CLOSED_W = 52;
const OPEN_W = 148;

const springExpand = { type: "spring" as const, stiffness: 400, damping: 28 };
const springItem = { type: "spring" as const, stiffness: 500, damping: 24 };

const menuItems = [
  { id: "heart", left: 2 },
  { id: "chart", left: 50 },
  { id: "pulse", left: 98 },
];

const iconComponents = [HeartSparkleIcon, ChartIcon, PulseIcon];

/* ─── Expanding Menu Component ────────────────────────────── */

function ExpandingMenu({
  isOpen,
  onToggle,
  selectedTab,
  onSelectTab,
}: {
  isOpen: boolean;
  onToggle: () => void;
  selectedTab: number;
  onSelectTab: (tab: number) => void;
}) {
  return (
    <motion.div
      className="absolute left-0 top-0 cursor-pointer"
      onClick={() => {
        if (!isOpen) onToggle();
      }}
      initial={false}
      style={{
        height: 48,
        borderRadius: 56,
        backgroundColor: colors.badgeBg,
        border: `1px solid ${colors.borderSubtle}`,
        overflow: "hidden",
      }}
      animate={{ width: isOpen ? OPEN_W : CLOSED_W }}
      transition={springExpand}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <HamburgerIcon />
      </motion.div>

      <motion.div
        className="absolute"
        initial={false}
        style={{
          width: 48,
          height: 44,
          top: 2,
          borderRadius: 28,
          backgroundColor: colors.accent,
        }}
        animate={{
          left: menuItems[selectedTab].left,
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.3,
        }}
        transition={{
          ...springItem,
          opacity: { duration: 0.2 },
        }}
      />

      {iconComponents.map((IconComp, i) => (
        <motion.div
          key={menuItems[i].id}
          className="absolute flex items-center justify-center"
          onClick={(e) => {
            if (isOpen) {
              e.stopPropagation();
              onSelectTab(i);
            }
          }}
          initial={false}
          style={{
            width: 48,
            height: 44,
            left: menuItems[i].left,
            top: 2,
            borderRadius: 28,
            cursor: isOpen ? "pointer" : "default",
            zIndex: 1,
          }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.3,
          }}
          transition={{
            ...springItem,
            delay: isOpen ? 0.02 + i * 0.07 : 0,
            opacity: {
              duration: 0.2,
              delay: isOpen ? 0.02 + i * 0.07 : 0,
            },
          }}
        >
          <IconComp color={selectedTab === i ? colors.white : colors.primary} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Top Navigation ──────────────────────────────────────── */

function TopNavigation({
  isOpen,
  onToggle,
  selectedTab,
  onSelectTab,
}: {
  isOpen: boolean;
  onToggle: () => void;
  selectedTab: number;
  onSelectTab: (tab: number) => void;
}) {
  return (
    <div className="absolute left-0 top-0 w-[375px] flex flex-col items-start z-10">
      <div
        className="h-[112px] overflow-hidden relative shrink-0 w-full"
        style={{ backgroundColor: colors.surfaceStrong }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[63px] h-[48px] w-[335px]">
          <ExpandingMenu
            isOpen={isOpen}
            onToggle={onToggle}
            selectedTab={selectedTab}
            onSelectTab={onSelectTab}
          />

          <div className="absolute right-0 top-0 h-[48px] w-[52px] flex items-center justify-center">
            <div
              className="w-full h-full rounded-[56px] flex items-center justify-center overflow-hidden p-[2px]"
              style={{
                backgroundColor: colors.badgeBg,
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <span
                className="text-[15px] tracking-[-0.57px] leading-[18.2px] font-normal"
                style={{ color: colors.primary, fontFamily: font }}
              >
                M
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-[50px] shrink-0 w-full"
        style={{
          background: `linear-gradient(to top, rgba(255,255,255,0), ${colors.surfaceStrong})`,
        }}
      />
    </div>
  );
}

/* ─── Main Demo ───────────────────────────────────────────── */

export function NavPageTransitionDemo({
  replayCount = 0,
}: {
  replayCount?: number;
}) {
  const { key, replay } = useReplay();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const directionRef = useRef(1);

  const handleToggle = () => {
    setIsOpen((o) => !o);
  };

  const handleSelectTab = (tab: number) => {
    if (tab === selectedTab) return;
    directionRef.current = tab > selectedTab ? 1 : -1;
    setSelectedTab(tab);
  };

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0 overflow-hidden bg-white">
        <AnimatePresence initial={false} custom={directionRef.current}>
          <motion.div
            key={selectedTab}
            className="absolute inset-0"
            custom={directionRef.current}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springPage}
          >
            {selectedTab === 0 && <HomeContent exitDirection="vertical" />}
            {selectedTab === 1 && <ProgressContent />}
            {selectedTab === 2 && <InsightsContent />}
          </motion.div>
        </AnimatePresence>

        <TopNavigation
          isOpen={isOpen}
          onToggle={handleToggle}
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
        />
      </div>
    </DemoShell>
  );
}
