export function Logo() {
  return (
    <span
      className="flex items-center gap-[0.6em] font-display text-[1.4rem] tracking-[-0.01em]"
      style={{ fontVariationSettings: '"opsz" 40, "SOFT" 70, "wght" 560' }}
    >
      <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-[50%_50%_50%_4px] bg-gradient-to-br from-honey to-blush shadow-[inset_0_0_0_1.5px_rgba(24,36,30,.08)]">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="h-[15px] w-[15px]"
        >
          <rect
            x="1.6"
            y="1.6"
            width="12.8"
            height="12.8"
            rx="3.4"
            stroke="#18241E"
            strokeWidth="1.5"
          />
          <rect x="5.5" y="5.5" width="5" height="5" rx="1.3" fill="#18241E" />
        </svg>
      </span>
      CampOS
    </span>
  );
}
