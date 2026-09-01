"use client";

import type { ReactNode } from "react";
import { useContactDialog } from "./ContactDialogProvider";

/** Any "Talk to CampOS" affordance. Opens the dialog; never navigates. */
export function ContactButton({
  children = "Talk to CampOS",
  className = "btn btn-primary",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useContactDialog();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
