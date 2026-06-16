export function Logo() {
  return (
    <span
      className="flex flex-col items-center gap-[0.1em] font-sans font-semibold text-[1.25rem] text-primary tracking-normal leading-none"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[48px] w-[48px] flex-none"
        aria-hidden="true"
      >
        {/* Left arm */}
        <rect x="0" y="20" width="20" height="20" fill="currentColor" />
        
        {/* Top arm */}
        <rect x="20" y="0" width="20" height="20" fill="currentColor" />
        <polygon points="40,0 60,0 40,20" fill="currentColor" />
        <polygon points="60,0 60,20 40,20" className="fill-primary-deep" />
        
        {/* Top-left diagonal connection */}
        <polygon points="0,20 20,0 20,20" fill="currentColor" />
        
        {/* Bottom-left diagonal connection */}
        <polygon points="0,40 20,60 20,40" className="fill-primary-deep" />
        
        {/* Bottom arm */}
        <rect x="20" y="40" width="20" height="20" fill="currentColor" />
        <polygon points="40,40 60,40 60,60" fill="currentColor" />
        <polygon points="40,40 40,60 60,60" className="fill-primary-deep" />
      </svg>
      CampOS
    </span>
  );
}
