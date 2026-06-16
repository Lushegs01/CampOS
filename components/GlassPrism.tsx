/**
 * GlassPrism — a slowly tumbling 3D glass cube for the hero.
 *
 * Pure CSS (no WebGL): six translucent faces with backdrop-blur refract whatever
 * sits behind them (the aurora glows), while a soft conic-gradient border on each
 * face scatters spectral / chromatic light along the edges — a light-mode,
 * on-brand reading of the rotating glass effect from the Canva hero.
 *
 * Decorative only (aria-hidden). The global prefers-reduced-motion rule freezes
 * the tumble into a static crystal for users who opt out of motion.
 */
export function GlassPrism({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`prism-stage ${className}`}>
      <div className="prism animate-prism-tumble">
        <span className="prism__face prism__face--front" />
        <span className="prism__face prism__face--back" />
        <span className="prism__face prism__face--right" />
        <span className="prism__face prism__face--left" />
        <span className="prism__face prism__face--top" />
        <span className="prism__face prism__face--bottom" />
      </div>
    </div>
  );
}
