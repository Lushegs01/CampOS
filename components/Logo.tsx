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
        {/* Left Dark Chevron */}
        <polygon points="0,40 0,20 20,0 20,20" className="fill-primary-deep" />
        
        {/* Top Bright Arm */}
        <polygon points="20,0 60,0 40,20 20,20" fill="currentColor" />
        
        {/* Top-Right Dark Triangle */}
        <polygon points="40,20 60,20 60,0" className="fill-primary-deep" />
        
        {/* Bottom Bright Body */}
        <polygon points="20,20 0,40 20,60 40,60 60,40 20,40" fill="currentColor" />
        
        {/* Bottom-Right Dark Triangle */}
        <polygon points="40,60 60,60 60,40" className="fill-primary-deep" />
      </svg>
      CampOS
    </span>
  );
}
