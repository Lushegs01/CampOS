import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = ButtonProps & ComponentPropsWithoutRef<"a"> & { href: string };
type NativeProps = ButtonProps & ComponentPropsWithoutRef<"button"> & { href?: never };

function classes(variant: Variant, className?: string) {
  return ["btn", variant === "primary" ? "btn-primary" : "btn-secondary", className]
    .filter(Boolean)
    .join(" ");
}

/** Link-shaped action. Anything that navigates is an anchor, so it behaves like one. */
export function ButtonLink({ variant = "primary", className, children, ...rest }: AnchorProps) {
  return (
    <a className={classes(variant, className)} {...rest}>
      {children}
    </a>
  );
}

/** Action that does something on the page rather than navigating. */
export function Button({ variant = "primary", className, children, ...rest }: NativeProps) {
  return (
    <button type="button" className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
