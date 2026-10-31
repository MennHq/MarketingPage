import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { Check, Shield, ArrowRight, Dog } from "lucide-react";
import { NavAuthButton } from "@/components/common/AuthButtons";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function PricingPage() {
  const loginUrl = `${APP_URL}/?login=true`;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] font-sans selection:bg-[#8B5E3C] selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full bg-[#FFF9F2]/90 backdrop-blur-lg border-b border-[#E8DDD3]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" aria-label="PupLume Home">
            <div className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
              <PupLumeLogo variant="full" size="lg" />
            </div>
          </Link>
          <nav className="flex gap-4">
            <NavAuthButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-[-10%] w-[600px] h-[600px] bg-[#8B5E3C] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#F59E0B] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] font-bold text-sm mb-6 border border-[#8B5E3C]/20">
              <Shield className="w-4 h-4" /> Simple, Transparent Pricing
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              One Price.<br className="md:hidden" /> A Lifetime of Care.
            </h1>
            <p className="text-xl text-[#766A63] mb-12 max-w-2xl mx-auto font-medium">
              No hidden fees. No recurring subscriptions. Just full access to everything you need to raise a healthy, happy puppy.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto bg-white rounded-[40px] shadow-2xl border border-[#E8DDD3] overflow-hidden transition-all duration-300 hover:shadow-3xl">
            {/* Card Header */}
            <div className="bg-[#2C211B] p-10 relative overflow-hidden text-center text-white">
              <div className="relative z-10 mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md">
                <Dog className="w-8 h-8 text-[#F3E7DA]" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Lifetime Access</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl font-black">$24.99</span>
                <span className="text-lg text-white/80 font-medium">USD</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <ul className="space-y-4 mb-8 text-left">
                <FeatureItem text="Unlimited AI Co-Pilot Chat" />
                <FeatureItem text="Full Training Academy Access" />
                <FeatureItem text="Advanced Health & Growth Analytics" />
                <FeatureItem text="Complete Medical & Vaccine Vault" />
                <FeatureItem text="Potty & Sleep Tracking Tools" />
                <FeatureItem text="Free Future Updates" />
              </ul>

              <a 
                href={loginUrl} 
                className="w-full h-14 text-lg font-bold text-white bg-[#8B5E3C] rounded-2xl hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <p className="text-center text-xs font-bold text-[#8B5E3C] mt-4 uppercase tracking-wider">
                100% Fully Paid. No Freemium.
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
          <div className="flex justify-center gap-6 text-sm font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
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
