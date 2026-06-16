/**
 * CampOS logo lockup — a faceted cobalt "C" cube + geometric wordmark.
 * Recreated as SVG so it scales crisply and stays on-brand everywhere.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${className}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-[30px] w-[30px] flex-none"
      >
        <defs>
          <linearGradient id="campos-c" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3A5BF0" />
            <stop offset="0.55" stopColor="#1E3FD0" />
            <stop offset="1" stopColor="#16299A" />
          </linearGradient>
          <clipPath id="campos-c-clip">
            <path d="M7 7H41V18H18V30H41V41H7Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#campos-c-clip)">
          <rect x="0" y="0" width="48" height="48" fill="url(#campos-c)" />
          {/* folded facets give the cube its dimensional look */}
          <polygon points="7,7 41,7 7,41" fill="#FFFFFF" opacity="0.14" />
          <polygon points="41,41 41,7 7,41" fill="#0B1533" opacity="0.16" />
          <path d="M7 41L41 7" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.2" />
        </g>
      </svg>
      <span className="font-display text-[1.32rem] font-semibold tracking-[-0.02em] text-brand">
        CampOS
      </span>
    </span>
  );
}
