export const easeCustom = [0.16, 1, 0.3, 1] as any; // custom cubic-bezier (power4.out / cubic-out equivalent)

export const fadeIn = (duration = 0.5, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const fadeInUp = (yOffset = 30, duration = 0.6, delay = 0) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const fadeInDown = (yOffset = -30, duration = 0.6, delay = 0) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const fadeInSide = (direction: "left" | "right", xOffset = 40, duration = 0.6, delay = 0) => ({
  hidden: { opacity: 0, x: direction === "left" ? -xOffset : xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const scaleUp = (duration = 0.5, delay = 0) => ({
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const blurReveal = (duration = 0.8, delay = 0) => ({
  hidden: { opacity: 0, filter: "blur(12px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration, delay, ease: easeCustom }
  }
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const textWordReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeCustom }
  }
};

export const viewportConfig = {
  once: true,
  amount: 0.15
};
