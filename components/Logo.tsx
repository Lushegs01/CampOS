export function Logo() {
  return (
    <span
      className="flex flex-col items-center gap-[0.1em] font-sans font-semibold text-[1.3rem] text-primary tracking-tight leading-none"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[48px] w-[48px] flex-none"
        aria-hidden="true"
      >
        {/* Base Shape (Bright Blue) */}
        <path
          d="M 0 20 L 12 20 A 8 8 0 0 1 20 12 L 20 0 L 60 0 L 60 20 L 28 20 A 8 8 0 0 0 20 28 L 20 32 A 8 8 0 0 0 28 40 L 60 40 L 60 60 L 20 60 L 20 48 A 8 8 0 0 1 12 40 L 0 40 Z"
          fill="currentColor"
        />
        
        {/* Left Arm Shadow (Dark Blue) */}
        <path
          d="M 0 40 L 20 20 L 20 48 A 8 8 0 0 1 12 40 Z"
          className="fill-primary-deep"
        />

        {/* Top-Right Shadow (Dark Blue) */}
        <polygon points="40,20 60,0 60,20" className="fill-primary-deep" />
        
        {/* Bottom-Right Shadow (Dark Blue) */}
        <polygon points="40,60 60,40 60,60" className="fill-primary-deep" />
      </svg>
      CampOS
    </span>
  );
}
