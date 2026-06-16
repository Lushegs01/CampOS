export function Logo() {
  return (
    <span
      className="flex items-center gap-[0.6em] font-sans font-semibold text-[1.5rem] text-primary tracking-tight"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[30px] w-[30px] flex-none"
        aria-hidden="true"
      >
        <rect x="0" y="20" width="20" height="20" fill="currentColor" />
        <rect x="20" y="0" width="20" height="20" fill="currentColor" />
        <rect x="20" y="40" width="40" height="20" fill="currentColor" />
        <polygon points="0,20 20,0 20,20" className="fill-primary-deep" />
        <polygon points="0,40 20,60 20,40" className="fill-primary-deep" />
        <polygon points="40,0 60,0 40,20" fill="currentColor" />
        <polygon points="60,0 60,20 40,20" className="fill-primary-deep" />
      </svg>
      CampOS
    </span>
  );
}
