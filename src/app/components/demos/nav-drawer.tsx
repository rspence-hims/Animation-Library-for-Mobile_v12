import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, User, Bell, Star } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function NavDrawerDemo() {
  const { key, replay } = useReplay();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white p-4"
          animate={{ x: open ? 200 : 0, scale: open ? 0.92 : 1 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.58, 1] }}
          style={{ borderRadius: open ? 16 : 0 }}
        >
          <button onClick={() => setOpen(true)} className="mb-3">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="space-y-3">
            <div className="text-[15px] text-gray-800">Home</div>
            <div className="h-28 w-full bg-gray-100 rounded-xl" />
            <div className="h-16 w-full bg-gray-50 rounded-xl" />
          </div>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[200px] bg-[#1a1a2e] text-white p-5 pt-8"
          animate={{ x: open ? 0 : -200 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.58, 1] }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
              <div>
                <div className="text-[12px]">Alex M.</div>
                <div className="text-[10px] text-white/40">Pro Plan</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 text-white/40" />
            </button>
          </div>
          <div className="space-y-5">
            {[
              { icon: Home, label: "Home" },
              { icon: User, label: "Profile" },
              { icon: Bell, label: "Notifications" },
              { icon: Star, label: "Favorites" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-[13px] text-white/60"
              >
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DemoShell>
  );
}