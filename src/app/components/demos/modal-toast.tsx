import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { useReplay, DemoShell } from "./demo-utils";

export function ModalToastDemo() {
  const { key, replay } = useReplay();
  const [toasts, setToasts] = useState<
    { id: number; type: "success" | "error" | "info"; msg: string }[]
  >([]);

  useEffect(() => {
    setToasts([]);
    const t1 = setTimeout(
      () =>
        setToasts((p) => [
          ...p,
          { id: 1, type: "success", msg: "File uploaded successfully" },
        ]),
      500
    );
    const t2 = setTimeout(
      () =>
        setToasts((p) => [
          ...p,
          { id: 2, type: "error", msg: "Connection lost" },
        ]),
      1400
    );
    const t3 = setTimeout(
      () =>
        setToasts((p) => [
          ...p,
          { id: 3, type: "info", msg: "3 new messages" },
        ]),
      2200
    );
    const t4 = setTimeout(() => setToasts([]), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [key]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Bell className="w-4 h-4 text-blue-500" />,
  };
  const bgs = {
    success: "border-emerald-100",
    error: "border-red-100",
    info: "border-blue-100",
  };

  return (
    <DemoShell onReplay={replay}>
      <div className="absolute inset-0">
        <div className="p-4 space-y-3">
          <div className="text-[14px] text-gray-800">Dashboard</div>
          <div className="h-32 bg-white rounded-xl shadow-sm" />
          <div className="h-20 bg-white rounded-xl shadow-sm" />
        </div>
        {/* Toast stack */}
        <div className="absolute top-2 left-3 right-3 space-y-2 z-50">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className={`bg-white rounded-xl px-3 py-2.5 shadow-lg border ${bgs[toast.type]} flex items-center gap-2`}
              >
                {icons[toast.type]}
                <span className="text-[12px] text-gray-700 flex-1">
                  {toast.msg}
                </span>
                <button
                  onClick={() =>
                    setToasts((p) => p.filter((t) => t.id !== toast.id))
                  }
                >
                  <X className="w-3 h-3 text-gray-300" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DemoShell>
  );
}