import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { NavAuthButton } from "@/components/common/AuthButtons";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full bg-[#FFF9F2]/90 backdrop-blur-lg border-b border-[#E8DDD3] transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" aria-label="PupLume Home" className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
            <PupLumeLogo variant="full" size="lg" />
          </Link>
          <nav aria-label="Main Navigation" className="hidden md:flex gap-10 text-sm font-bold text-[#766A63]">
            <Link href="/features" className="text-[#8B5E3C] font-black scale-105 transition-all">Features</Link>
            <Link href="/academy" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Academy</Link>
            <Link href="/health" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Health Center</Link>
            <Link href="/pricing" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Pricing</Link>
          </nav>
          <div className="flex gap-4 items-center">
            <NavAuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Features Section */}
        <section id="features" className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-black text-[#2C211B] tracking-tight mb-4">Everything your puppy needs.</h1>
              <p className="text-[#766A63] font-medium text-lg max-w-2xl mx-auto">PupLume replaces your messy notebooks with an elegant, AI-powered system designed specifically for the chaotic first year of puppyhood.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 border border-[#E8DDD3]" aria-hidden="true">🐾</div>
                <h3 className="text-xl font-bold text-[#2C211B] mb-3">Smart Logging</h3>
                <p className="text-[#766A63] text-sm leading-relaxed">Log potty breaks, meals, and naps in one tap. We track the patterns so you don&apos;t have to guess when they need to go out.</p>
              </div>
              <div className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B5E3C] shadow-sm mb-6 border border-[#E8DDD3]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-[#2C211B] mb-3">AI Insights</h3>
                <p className="text-[#766A63] text-sm leading-relaxed">Our AI analyzes your puppy&apos;s routine and tells you exactly what to expect. Get personalized tips based on their age and breed.</p>
              </div>
              <div className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B5E3C] shadow-sm mb-6 border border-[#E8DDD3]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-xl font-bold text-[#2C211B] mb-3">Family Sync</h3>
                <p className="text-[#766A63] text-sm leading-relaxed">Share access with your partner or dog walker. Everyone stays perfectly in sync with instant updates and push notifications.</p>
              </div>
            </div>
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
