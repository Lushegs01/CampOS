/**
 * The CampOS mark — three interlocking blocks forming an open C — redrawn as a
 * single vector path so it stays crisp at any size and takes the colour of
 * whatever ground it sits on.
 */
export function Wordmark({
  className = "",
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" className="flex-none">
        <path d="M9 3 H21 V9 H11 V15 H21 V21 H9 V16 H3 V8 H9 Z" fill="currentColor" />
      </svg>
      {showName ? (
        <span className="text-[1.06rem] font-semibold tracking-[-0.02em]">CampOS</span>
      ) : null}
      <span className="sr-only">CampOS</span>
    </span>
  );
}
