import { useState, useCallback } from "react";

export function useReplay() {
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey((k) => k + 1), []);
  return { key, replay };
}

export function DemoShell({
  children,
  onReplay,
}: {
  children: React.ReactNode;
  onReplay?: () => void;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-50">
      {children}
    </div>
  );
}
