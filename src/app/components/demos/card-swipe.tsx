import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Star } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function CardSwipeDemo() {
  const { key, replay } = useReplay();
  const [cards, setCards] = useState([
    { id: 1, color: "from-violet-400 to-purple-600", title: "Design Systems", sub: "48 components" },
    { id: 2, color: "from-blue-400 to-indigo-600", title: "Motion Tokens", sub: "12 easings defined" },
    { id: 3, color: "from-pink-400 to-rose-600", title: "Icon Library", sub: "240+ icons" },
  ]);

  useEffect(() => {
    setCards([
      { id: 1, color: "from-violet-400 to-purple-600", title: "Design Systems", sub: "48 components" },
      { id: 2, color: "from-blue-400 to-indigo-600", title: "Motion Tokens", sub: "12 easings defined" },
      { id: 3, color: "from-pink-400 to-rose-600", title: "Icon Library", sub: "240+ icons" },
    ]);
  }, [key]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 80) {
      setCards((prev) => prev.slice(1));
    }
  };

  return (
    <DemoShell onReplay={replay}>
      <div className="relative w-full h-full flex items-center justify-center">
        <p className="absolute top-4 text-[11px] text-gray-400">
          Swipe cards left or right
        </p>
        {cards.length === 0 ? (
          <div className="text-center">
            <p className="text-[13px] text-gray-400">Stack cleared</p>
            <p className="text-[11px] text-gray-300 mt-1">Tap replay to reset</p>
          </div>
        ) : (
          <div className="relative w-52 h-64">
            {cards
              .slice(0, 3)
              .reverse()
              .map((card, i, arr) => {
                const isTop = i === arr.length - 1;
                return isTop ? (
                  <motion.div
                    key={card.id}
                    className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl shadow-lg flex flex-col items-center justify-center text-white cursor-grab active:cursor-grabbing`}
                    style={{ x, rotate, opacity, zIndex: arr.length }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={handleDragEnd}
                  >
                    <Star className="w-8 h-8 text-white/40 mb-3" />
                    <span className="text-[16px]">{card.title}</span>
                    <span className="text-[12px] text-white/60 mt-1">{card.sub}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={card.id}
                    className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl shadow-lg flex flex-col items-center justify-center text-white`}
                    style={{
                      zIndex: i,
                      scale: 1 - (arr.length - 1 - i) * 0.05,
                      y: (arr.length - 1 - i) * 10,
                    }}
                  >
                    <Star className="w-8 h-8 text-white/40 mb-3" />
                    <span className="text-[16px]">{card.title}</span>
                    <span className="text-[12px] text-white/60 mt-1">{card.sub}</span>
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>
    </DemoShell>
  );
}