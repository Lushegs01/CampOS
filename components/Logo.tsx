export function Logo() {
  return (
    <span
      className="flex flex-col items-center gap-[0.1em] font-sans font-semibold text-[1.3rem] text-primary tracking-tight leading-none"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[42px] w-[42px] flex-none"
        aria-hidden="true"
      >
        <rect x="0" y="20" width="20" height="20" fill="currentColor" />
        <rect x="20" y="0" width="20" height="20" fill="currentColor" />
        <rect x="20" y="40" width="40" height="20" fill="currentColor" />
        <polygon points="0,20 20,0 20,20" fill="currentColor" />
        <polygon points="0,40 20,60 20,40" className="fill-primary-deep" />
        <polygon points="40,0 60,0 40,20" fill="currentColor" />
        <polygon points="60,0 60,20 40,20" className="fill-primary-deep" />
      </svg>
      CampOS
    </span>
  );
}
