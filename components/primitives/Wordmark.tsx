import Image from "next/image";

/**
 * The CampOS mark — 3D emerald emblem paired with the brand wordmark.
 */
export function Wordmark({
  className = "",
  showName = true,
  size = 24,
}: {
  className?: string;
  showName?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="h-6 w-6 flex-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:scale-105"
        priority
      />
      {showName ? (
        <span className="text-[1.06rem] font-semibold tracking-[-0.02em]">CampOS</span>
      ) : null}
      <span className="sr-only">CampOS</span>
    </span>
  );
}
