export const ease = [0.2, 0.8, 0.2, 1];

// Deliberately opacity + transform only. These two are the properties Chrome
// can hand to the compositor; interpolating `filter: blur()` instead forces the
// element to be re-rasterised at a new blur radius on every frame, and this
// variant drives the reveal of every section heading and card on the page.
export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const container = (stagger = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

export const viewport = { once: true, margin: "0px 0px -40px 0px", amount: 0.12 };
