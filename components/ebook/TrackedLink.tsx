"use client";

import { track } from "@vercel/analytics/react";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean | null>;
  asChild?: boolean;
  children: ReactNode;
}

export function TrackedLink({
  eventName,
  eventProperties,
  asChild = false,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const Comp = asChild ? Slot : "a";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(eventName, eventProperties);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Comp onClick={handleClick} {...props}>
      {children}
    </Comp>
  );
}

