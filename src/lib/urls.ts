"use client";

import { useState, useEffect } from "react";

/**
 * Dynamically resolves the main PupLume app URL based on runtime context.
 * If running on LAN IP (e.g. 192.168.x.x, 10.x.x.x, 172.x.x.x) or localhost in development,
 * it preserves the client's hostname on port 3000 so mobile/LAN devices can connect seamlessly.
 */
export function getAppUrl(): string {
  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    // Check if accessing via local LAN IP or localhost
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.")
    ) {
      return `${protocol}//${hostname}:3000`;
    }
  }

  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

/**
 * Hook to provide reactive App URL on client with safe hydration defaults.
 */
export function useAppUrl(): string {
  const [url, setUrl] = useState(() => {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  });

  useEffect(() => {
    setUrl(getAppUrl());
  }, []);

  return url;
}
