"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function NavAuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fast non-blocking check for active session cookie
    try {
      const hasSession = document.cookie.split("; ").some(c => 
        c.startsWith("__session=") || c.startsWith("__client_uat=") || c.startsWith("puplume_session=")
      );
      if (hasSession) {
        setIsLoggedIn(true);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  if (isLoggedIn) {
    return (
      <a
        href={`${APP_URL}/?login=true`}
        className="px-6 py-2.5 text-sm font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
      >
        Open Dashboard
      </a>
    );
  }

  return (
    <>
      <a
        href={`${APP_URL}/?login=true`}
        className="hidden sm:inline-flex px-5 py-2.5 text-sm font-bold text-[#8B5E3C] hover:text-[#5F3E29] transition-colors"
      >
        Log In
      </a>
      <a
        href={`${APP_URL}/?login=true`}
        className="px-6 py-2.5 text-sm font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
      >
        Sign Up for Free
      </a>
    </>
  );
}

export function HeroAuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const hasSession = document.cookie.split("; ").some(c => 
        c.startsWith("__session=") || c.startsWith("__client_uat=") || c.startsWith("puplume_session=")
      );
      if (hasSession) {
        setIsLoggedIn(true);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  if (isLoggedIn) {
    return (
      <a
        href={`${APP_URL}/?login=true`}
        className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center"
      >
        Open Dashboard
      </a>
    );
  }

  return (
    <>
      <a
        href={`${APP_URL}/?login=true`}
        className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center"
      >
        Sign Up for Free
      </a>
      <Link
        href="/features"
        className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-[#8B5E3C] bg-white rounded-full hover:bg-[#F3E7DA] transition-all shadow-md active:scale-95 text-center"
      >
        See Features
      </Link>
    </>
  );
}
