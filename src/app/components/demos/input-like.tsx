import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star } from "lucide-react";
import { DemoShell } from "./demo-utils";

export function InputLikeDemo() {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setParticles(Array.from({ length: 6 }, (_, i) => i));
      setTimeout(() => setParticles([]), 600);
    }
  };

  return (
    <DemoShell>
      <div className="w-full px-5">
        {/* Post card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-orange-200 via-pink-200 to-violet-200" />
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-500" />
              <span className="text-[12px] text-gray-700">studio.daily</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <motion.button
                  onClick={handleLike}
                  whileTap={{ scale: 0.8 }}
                  className="relative z-10"
                >
                  <motion.div
                    animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors duration-200 ${
                        liked
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {particles.map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: [
                          "#ef4444",
                          "#f59e0b",
                          "#ec4899",
                          "#8b5cf6",
                          "#06b6d4",
                          "#10b981",
                        ][i],
                      }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos((i * Math.PI * 2) / 6) * 30,
                        y: Math.sin((i * Math.PI * 2) / 6) * 30,
                        scale: 0,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </AnimatePresence>
              </div>
              <Star className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-[12px] text-gray-500">
              {liked ? "You and 847 others" : "847 likes"}
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}