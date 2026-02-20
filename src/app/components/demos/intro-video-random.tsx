import { useState, useEffect } from "react";
import { DemoShell } from "./demo-utils";

export function IntroVideoRandomDemo({ replayCount = 0 }: { replayCount?: number }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 400));
    return () => timers.forEach(clearTimeout);
  }, [replayCount]);

  return (
    <DemoShell>
      <div className="absolute inset-0 bg-white overflow-hidden">
        <div className="h-[45px]" />
      </div>
    </DemoShell>
  );
}
