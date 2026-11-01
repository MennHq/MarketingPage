import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { AppActionLink } from "@/components/common/AppActionLink";

export default function AcademyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <MarketingHeader />

      <main className="flex-1 pt-18 sm:pt-20">
        {/* Academy Section */}
        <section id="academy" className="py-16 sm:py-24 bg-[#2C211B] text-white relative">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5F3E29] text-white mb-8 shadow-lg" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Expert training, built-in.</h1>
            <p className="text-zinc-300 font-medium text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Unlock the PupLume Academy to get step-by-step guides on crate training, biting, and basic obedience. Tailored exactly to your puppy&apos;s current age.</p>
            <AppActionLink
              hrefPath="/?login=true"
              className="inline-flex px-8 py-3.5 text-sm font-bold text-[#2C211B] bg-[#FFF9F2] rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Explore the Academy
            </AppActionLink>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8DDD3] bg-[#FFF9F2] pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <Link href="/" aria-label="PupLume Home" className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
              <PupLumeLogo variant="full" size="md" />
            </Link>
            <nav aria-label="Footer Navigation" className="flex flex-wrap gap-4 md:gap-8 text-sm font-bold text-[#766A63] items-center justify-center">
              <Link href="/legal/privacy" className="hover:text-[#8B5E3C] transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-[#8B5E3C] transition-colors">Terms of Service</Link>
              <Link href="/legal/refund" className="hover:text-[#8B5E3C] transition-colors">Refund Policy</Link>
              <Link href="/legal/cookies" className="hover:text-[#8B5E3C] transition-colors">Cookie Policy</Link>
              <a href="mailto:support@puplume.pet" className="hover:text-[#8B5E3C] transition-colors">Contact Support</a>
            </nav>
          </div>
          <div className="text-center text-sm font-semibold text-[#6B5E55]">
            &copy; {new Date().getFullYear()} PupLume. Built for puppies and their humans.
          </div>
        </div>
      </footer>
    </div>
  );
}
