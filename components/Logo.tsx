export function Logo() {
  return (
    <span
      className="flex flex-col items-center gap-[0.1em] font-sans font-semibold text-[1.3rem] text-primary tracking-tight leading-none"
    >
      <img
        src="/logo.png"
        alt="CampOS Logo"
        className="h-[48px] w-[48px] object-contain flex-none"
      />
      CampOS
    </span>
  );
}
