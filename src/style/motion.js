// Shared Framer Motion variants. Defined at module scope (outside components)
// so the objects are created once and not re-allocated on every render.
// Motion is kept subtle (small distances, short durations, ease-out) and the
// app respects prefers-reduced-motion via <MotionConfig reducedMotion="user">
// in App.js plus the reduced-motion media query in global styles.

const EASE_OUT = [0.22, 1, 0.36, 1];

// Generic fade + slight rise. Good for headers and standalone elements.
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

// Container that staggers its children's reveal.
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

// Child item used inside staggerContainer.
export const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

// Results / overlay entrance: scale up from slightly small with a fade.
export const overlayReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

// Micro-interaction props for interactive controls (buttons/icons).
export const tappable = {
  whileHover: { scale: 1.12 },
  whileTap: { scale: 0.94 },
  transition: { type: "spring", stiffness: 400, damping: 22 },
};
