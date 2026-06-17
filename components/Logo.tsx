/**
 * CampOS logo lockup — the blocky "C" mark (recreated as transparent SVG so it
 * sits cleanly on the dark canvas) + wordmark with an accented "OS".
 */
export function CampMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="camp-mark" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B8CFF" />
          <stop offset="0.55" stopColor="#2E6BFF" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <path
        d="M46 20 V13 a5 5 0 0 0-5-5 H13 a5 5 0 0 0-5 5 V43 a5 5 0 0 0 5 5 H41 a5 5 0 0 0 5-5 V36"
        stroke="url(#camp-mark)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0" y="22.5" width="9" height="11" rx="3" fill="url(#camp-mark)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <CampMark className="h-8 w-8 drop-shadow-[0_0_12px_rgba(46,107,255,0.45)]" />
      <span className="font-sans text-[1.32rem] font-semibold leading-none tracking-tight text-hi">
        Camp<span className="text-gradient">OS</span>
      </span>
    </span>
  );
}
