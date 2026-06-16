export const ease = [0.2, 0.8, 0.2, 1];

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
