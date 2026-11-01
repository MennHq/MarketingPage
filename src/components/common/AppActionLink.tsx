"use client";

import React from "react";
import { useAppUrl } from "@/lib/urls";

interface AppActionLinkProps {
  hrefPath?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function AppActionLink({
  hrefPath = "/?login=true",
  className = "",
  children,
  id,
}: AppActionLinkProps) {
  const appUrl = useAppUrl();
  const cleanPath = hrefPath.startsWith("/") ? hrefPath : `/${hrefPath}`;
  const fullHref = `${appUrl}${cleanPath}`;

  return (
    <a id={id} href={fullHref} className={className}>
      {children}
    </a>
  );
}
