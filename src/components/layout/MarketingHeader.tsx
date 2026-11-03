"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, GraduationCap, Heart, Shield, ArrowRight } from "lucide-react";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { useAppUrl } from "@/lib/urls";

interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  tagline: string;
}

const navLinks: NavLinkItem[] = [
  {
    name: "Features",
    href: "/#features",
    icon: <Sparkles className="w-4 h-4 text-[#8B5E3C]" />,
    tagline: "Predictive potty & daily routines",
  },
  {
    name: "AI Co-Pilot",
    href: "/#ai",
    icon: <Sparkles className="w-4 h-4 text-[#8B5E3C]" />,
    tagline: "24/7 puppy behavior advice",
  },
  {
    name: "Academy",
    href: "/academy",
    icon: <GraduationCap className="w-4 h-4 text-[#8B5E3C]" />,
    tagline: "Age-tailored training guides",
  },
  {
    name: "Health Vault",
    href: "/health",
    icon: <Heart className="w-4 h-4 text-[#8B5E3C]" />,
    tagline: "Vaccines, weight & vet records",
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: <Shield className="w-4 h-4 text-[#8B5E3C]" />,
    tagline: "One-time $24.99, no subscriptions",
  },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const appUrl = useAppUrl();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#E8DDD3] transition-all">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="PupLume Home"
          className="flex items-center cursor-pointer transform hover:scale-[1.02] transition-transform origin-left"
        >
          <PupLumeLogo variant="full" size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-[#766A63]">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors py-1 hover:text-[#8B5E3C] ${
                  isActive ? "text-[#8B5E3C] font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={`${appUrl}/?login=true`}
            className="hidden sm:inline-flex text-xs font-bold text-[#766A63] hover:text-[#2C211B] px-3.5 py-2 transition-colors"
          >
            Log In
          </a>

          <a
            href="/checkout"
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#8B5E3C] hover:bg-[#6D492F] rounded-2xl transition-all shadow-xs hover:shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Limited Offer</span>
            <span className="hidden sm:inline opacity-90 text-[11px] font-bold">• $24.99</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#E8DDD3] bg-white text-[#2C211B] hover:bg-[#F3E7DA] transition-colors focus-visible:outline-2 focus-visible:outline-[#8B5E3C] cursor-pointer w-9 h-9 flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#8B5E3C]" /> : <Menu className="w-5 h-5 text-[#2C211B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#2C211B]/40 backdrop-blur-xs z-40 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FFF9F2] border-b border-[#E8DDD3] shadow-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E3C]">
              Explore PupLume
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E8DDD3] hover:border-[#8B5E3C]/40 transition-all text-[#2C211B]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#FFF9F2] text-[#8B5E3C]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2C211B]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#766A63]">
                        {item.tagline}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#766A63]" />
                </Link>
              ))}
            </nav>

            {/* Bottom Auth Actions inside Mobile Drawer */}
            <div className="pt-3 border-t border-[#E8DDD3] flex flex-col gap-2.5">
              <a
                href="/checkout"
                className="w-full py-3.5 text-center text-sm font-bold text-white bg-[#8B5E3C] rounded-2xl hover:bg-[#6D492F] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Claim Limited Offer ($24.99)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`${appUrl}/?login=true`}
                className="w-full py-2.5 text-center text-xs font-bold text-[#766A63] hover:text-[#2C211B] transition-colors"
              >
                Already have an account? Sign In →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
