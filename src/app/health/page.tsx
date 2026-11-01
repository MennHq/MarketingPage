import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { MarketingHeader } from "@/components/layout/MarketingHeader";

export default function HealthPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <MarketingHeader />

      <main className="flex-1 pt-18 sm:pt-20">
        {/* Health Center Section */}
        <section id="health" className="py-16 sm:py-24 bg-[#FAF6F0] border-y border-[#E8DDD3] relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-black text-[#2C211B] tracking-tight mb-6">Never miss a<br/><span className="text-[#8B5E3C]">vaccine again.</span></h1>
              <p className="text-[#766A63] font-medium text-lg mb-8 leading-relaxed">Keep your puppy&apos;s medical records, weight history, and vaccine schedule safely stored in the cloud. We&apos;ll automatically remind you when the next booster is due.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs" aria-hidden="true">🐾</span> Automated Vet Reminders</li>
                <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs" aria-hidden="true">🐾</span> Weight Tracking Charts</li>
                <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs" aria-hidden="true">🐾</span> Secure Medical Logs</li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5E3C]/20 to-transparent rounded-full blur-3xl transform scale-150 pointer-events-none" />
              <div className="bg-white p-6 rounded-[2rem] border border-[#E8DDD3] shadow-xl relative z-10">
                <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-[#2C211B]">DHPP Booster</h3>
                    <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mt-1">Due in 3 Days</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-1-0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#2C211B]">Rabies Vaccine</h3>
                    <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-1">Completed</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700" aria-hidden="true">🐾</div>
                </div>
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
