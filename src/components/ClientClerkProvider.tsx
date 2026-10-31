"use client";
import React from "react";

export function ClientClerkProvider({ children }: { children: React.ReactNode, publishableKey?: string | undefined }) {
  return <>{children}</>;
}
