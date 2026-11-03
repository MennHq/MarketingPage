import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { Check, Shield, ArrowRight, Dog } from "lucide-react";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { AppActionLink } from "@/components/common/AppActionLink";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] font-sans selection:bg-[#8B5E3C] selection:text-white">
      {/* Navbar with Responsive Mobile Navigation */}
      <MarketingHeader />

      {/* Main Content */}
      <main className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-[-10%] w-[600px] h-[600px] bg-[#8B5E3C] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#F59E0B] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] font-bold text-xs sm:text-sm mb-6 border border-[#8B5E3C]/20">
              <Shield className="w-4 h-4" /> Limited-Time Launch Offer
            </div>
            
            <h1 className="text-3.5xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-tight">
              One Price.<br className="md:hidden" /> A Lifetime of Care.
            </h1>
            <p className="text-lg sm:text-xl text-[#766A63] mb-12 max-w-2xl mx-auto font-medium">
              Limited introductory offer: pay <span className="font-bold text-[#2C211B]">$24.99 once</span> and enjoy full lifetime access. No subscriptions, no hidden renewals, no feature gates.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto bg-white rounded-[40px] shadow-2xl border-2 border-[#8B5E3C] overflow-hidden transition-all duration-300 hover:shadow-3xl relative">
            {/* Limited Offer Badge */}
            <div className="bg-[#8B5E3C] text-white text-xs font-black uppercase tracking-wider py-1.5 text-center">
              🔥 Limited Launch Offer • One-Time Payment
            </div>

            {/* Card Header */}
            <div className="bg-[#2C211B] p-8 sm:p-10 relative overflow-hidden text-center text-white">
              <div className="relative z-10 mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md">
                <Dog className="w-8 h-8 text-[#F3E7DA]" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Lifetime Access</h2>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-5xl sm:text-6xl font-black">$24.99</span>
                <span className="text-base text-white/80 font-semibold">USD</span>
              </div>
              <p className="text-xs text-[#F3E7DA]/80 mt-2 font-medium">
                One-time payment • Never pay monthly fees
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <ul className="space-y-4 mb-8 text-left">
                <FeatureItem text="Unlimited AI Co-Pilot Chat" />
                <FeatureItem text="Full Training Academy Access" />
                <FeatureItem text="Advanced Health & Growth Analytics" />
                <FeatureItem text="Complete Medical & Vaccine Vault" />
                <FeatureItem text="Potty & Sleep Tracking Tools" />
                <FeatureItem text="Free Future Updates & Sync" />
              </ul>

              <Link 
                href="/checkout" 
                className="w-full h-14 text-base sm:text-lg font-bold text-white bg-[#8B5E3C] rounded-2xl hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Claim Limited Offer — $24.99</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <p className="text-center text-xs font-semibold text-[#766A63] mt-4">
                14-Day Money-Back Guarantee • Zero Recurring Charges
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C211B] py-12 text-center text-zinc-300">
        <div className="container mx-auto px-6">
          <Link href="/" aria-label="PupLume Home">
            <PupLumeLogo variant="icon" size="sm" className="mx-auto mb-6 opacity-75 grayscale hover:grayscale-0 transition-all" />
          </Link>
          <p className="text-sm font-medium mb-4">
            &copy; {new Date().getFullYear()} PupLume. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <a href="mailto:support@puplume.pet" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E5F6DF] flex items-center justify-center border border-[#C6E9BA]" aria-hidden="true">
      <Check className="w-3.5 h-3.5 text-[#2E7D32] font-bold" />
    </div>
    <span className="text-[#2C211B] font-semibold">{text}</span>
  </li>
);
