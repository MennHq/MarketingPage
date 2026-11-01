"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, GraduationCap, Heart, Shield, ArrowRight } from "lucide-react";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { NavAuthButton } from "@/components/common/AuthButtons";
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
    href: "/features",
    icon: <Sparkles className="w-5 h-5 text-[#8B5E3C]" />,
    tagline: "Smart logging & routine tracking",
  },
  {
    name: "Academy",
    href: "/academy",
    icon: <GraduationCap className="w-5 h-5 text-[#8B5E3C]" />,
    tagline: "Age-tailored training guides",
  },
  {
    name: "Health Center",
    href: "/health",
    icon: <Heart className="w-5 h-5 text-[#8B5E3C]" />,
    tagline: "Vaccines, weight & vet records",
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: <Shield className="w-5 h-5 text-[#8B5E3C]" />,
    tagline: "Lifetime access, zero subscriptions",
  },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const appUrl = useAppUrl();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close menu & lock body scroll when open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#FFF9F2]/95 backdrop-blur-lg border-b border-[#E8DDD3] transition-all">
      <div className="container mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="PupLume Home"
          className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
        >
          <PupLumeLogo variant="full" size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex gap-8 lg:gap-10 text-sm font-bold text-[#766A63]">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 py-1 border-b-2 ${
                  isActive
                    ? "text-[#8B5E3C] border-[#8B5E3C] font-black"
                    : "border-transparent hover:text-[#8B5E3C] hover:border-[#8B5E3C]/30"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center">
            <NavAuthButton />
          </div>

          {/* Quick App Link for small screens */}
          <a
            href={`${appUrl}/?login=true`}
            className="sm:hidden px-3.5 py-1.5 text-xs font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-sm active:scale-95"
          >
            Open App
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#E8DDD3] bg-white text-[#2C211B] hover:bg-[#F3E7DA] transition-colors focus-visible:outline-2 focus-visible:outline-[#8B5E3C] cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
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
          className="md:hidden fixed inset-x-0 top-18 sm:top-20 bottom-0 bg-[#2C211B]/40 backdrop-blur-xs z-40 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FFF9F2] border-b border-[#E8DDD3] shadow-2xl px-5 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-black uppercase tracking-wider text-[#8B5E3C]">
              Navigation
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-150 min-h-[52px] ${
                      isActive
                        ? "bg-[#8B5E3C] text-white border-[#8B5E3C] shadow-sm"
                        : "bg-white text-[#2C211B] border-[#E8DDD3] hover:bg-[#F3E7DA]/60 active:scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive ? "bg-white/20 text-white" : "bg-[#FFF9F2] text-[#8B5E3C]"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isActive ? "text-white" : "text-[#2C211B]"}`}>
                          {item.name}
                        </div>
                        <div className={`text-[11px] ${isActive ? "text-white/80" : "text-[#766A63]"}`}>
                          {item.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-[#766A63]"}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Auth Actions inside Mobile Drawer */}
            <div className="pt-3 border-t border-[#E8DDD3] flex flex-col gap-2.5">
              <a
                href={`${appUrl}/?login=true`}
                className="w-full py-3.5 text-center text-sm font-bold text-white bg-[#8B5E3C] rounded-2xl hover:bg-[#5F3E29] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`${appUrl}/?login=true`}
                className="w-full py-2.5 text-center text-xs font-bold text-[#8B5E3C] hover:text-[#5F3E29] transition-colors"
              >
                Already have an account? Log In
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
