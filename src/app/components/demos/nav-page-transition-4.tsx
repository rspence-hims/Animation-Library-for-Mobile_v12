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
  HomeContent,
  ProgressContent,
  InsightsContent,
} from "./nav-page-shared";

/* ─── Tab Configuration ───────────────────────────────────── */

const tabs = [
  { id: "ask", label: "Ask", Icon: HeartSparkleIcon },
  { id: "progress", label: "Progress", Icon: ChartIcon },
  { id: "insights", label: "Insights", Icon: PulseIcon },
];

const NUM_TABS = tabs.length;
const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 500;

/* ─── Menu Pill Component ─────────────────────────────────── */

const pillWidths = [82, 122, 114];
const PILL_SLIDE = 335;

const pillVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? PILL_SLIDE : -PILL_SLIDE,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -PILL_SLIDE : PILL_SLIDE,
    opacity: 0,
  }),
};

function MenuPill({ selectedTab, direction }: { selectedTab: number; direction: number }) {
  const tab = tabs[selectedTab];
  return (
    <div className="absolute left-0 top-0 h-[48px]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={selectedTab}
          className="absolute left-0 top-0 flex items-center h-full px-[16px]"
          custom={direction}
          variants={pillVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: springPage, opacity: { duration: 0.15, ease: "easeInOut" } }}
          style={{
            width: pillWidths[selectedTab],
            height: 48,
            borderRadius: 56,
            backgroundColor: colors.badgeBg,
            border: `1px solid ${colors.borderSubtle}`,
            gap: 8,
          }}
        >
          <tab.Icon color={colors.primary} />
          <span
            className="text-[15px] leading-[18.2px] tracking-[-0.57px] font-normal whitespace-nowrap"
            style={{ color: colors.primary, fontFamily: font, position: "relative", top: 2 }}
          >
            {tab.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Top Navigation ──────────────────────────────────────── */

function TopNavigation({ selectedTab, direction }: { selectedTab: number; direction: number }) {
  return (
    <div className="absolute left-0 top-0 w-[375px] flex flex-col items-start z-10">
      <div
        className="h-[112px] overflow-hidden relative shrink-0 w-full"
        style={{ backgroundColor: colors.surfaceStrong }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[63px] h-[48px] w-[335px]">
          <MenuPill selectedTab={selectedTab} direction={direction} />

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

export function NavPageTransition4Demo({
  replayCount = 0,
}: {
  replayCount?: number;
}) {
  const { key, replay } = useReplay();
  const [selectedTab, setSelectedTab] = useState(0);
  const directionRef = useRef(1);

  const handleSelectTab = (tab: number) => {
    if (tab === selectedTab) return;
    directionRef.current = tab > selectedTab ? 1 : -1;
    setSelectedTab(tab);
  };

  const handlePanEnd = (_: never, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
    if (info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY) {
      handleSelectTab(Math.min(selectedTab + 1, NUM_TABS - 1));
    } else if (info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY) {
      handleSelectTab(Math.max(selectedTab - 1, 0));
    }
  };

  return (
    <DemoShell onReplay={replay}>
      <motion.div
        className="absolute inset-0 overflow-hidden bg-white"
        onPanEnd={handlePanEnd}
      >
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
            {selectedTab === 0 && <HomeContent exitDirection="horizontal" />}
            {selectedTab === 1 && <ProgressContent />}
            {selectedTab === 2 && <InsightsContent />}
          </motion.div>
        </AnimatePresence>

        <TopNavigation selectedTab={selectedTab} direction={directionRef.current} />
      </motion.div>
    </DemoShell>
  );
}
