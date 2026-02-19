export const springPage = { type: "spring" as const, stiffness: 243, damping: 27 };

export const easeOutQuad: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const easeInOutCubic: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const exitDuration = 0.55;

export const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 375 : -375,
  }),
  center: {
    x: 0,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -375 : 375,
  }),
};
