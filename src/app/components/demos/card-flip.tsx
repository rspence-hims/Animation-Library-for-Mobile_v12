import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Wifi } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function CardFlipDemo() {
  const { key, replay } = useReplay();
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
    const t = setTimeout(() => setFlipped(true), 500);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div
        className="flex items-center justify-center w-full px-6"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="w-full h-52 relative cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Card face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-7 bg-amber-400/90 rounded-md" />
              <Wifi className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <div className="text-[14px] text-white/60 tracking-[0.25em] font-mono">
                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4289
              </div>
              <div className="flex justify-between mt-3">
                <div>
                  <div className="text-[9px] text-white/30 uppercase">
                    Card Holder
                  </div>
                  <div className="text-[12px] text-white/80">Alex Morgan</div>
                </div>
                <div>
                  <div className="text-[9px] text-white/30 uppercase">
                    Expires
                  </div>
                  <div className="text-[12px] text-white/80">09/28</div>
                </div>
              </div>
            </div>
          </div>
          {/* Back - CVV */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex flex-col justify-center items-center shadow-xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full h-10 bg-slate-900/60 mb-6" />
            <div className="bg-white/90 px-6 py-2 rounded-md">
              <span className="text-[16px] text-slate-800 font-mono tracking-wider">
                847
              </span>
            </div>
            <span className="text-[10px] text-white/40 mt-2">Security Code</span>
          </div>
        </motion.div>
      </div>
    </DemoShell>
  );
}