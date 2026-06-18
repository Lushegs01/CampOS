export function Logo({ className = "", hideText = false }: { className?: string; hideText?: boolean }) {
  return (
    <span
      className={`flex items-center gap-2 font-sans font-bold text-[1.25rem] text-white tracking-tight leading-none ${className}`}
    >
      <img
        src="/logo.png"
        alt="CampOS Logo"
        className="h-8 w-8 object-contain flex-none"
      />
      {!hideText && <span>CampOS</span>}
    </span>
  );
}
