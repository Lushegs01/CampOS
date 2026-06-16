export function Logo() {
  return (
    <span
      className="flex flex-col items-center gap-[0.1em] font-sans font-medium text-[1.15rem] text-primary tracking-normal leading-none"
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[54px] w-[54px] flex-none"
        aria-hidden="true"
      >
        <rect x="0" y="20" width="20" height="20" fill="currentColor" />
        <rect x="20" y="0" width="40" height="20" fill="currentColor" />
        <rect x="20" y="40" width="40" height="20" fill="currentColor" />
      </svg>
      CampOS
    </span>
  );
}
