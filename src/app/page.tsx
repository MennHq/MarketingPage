import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart, 
  GraduationCap, 
  Users, 
  QrCode, 
  Check, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Bell,
  Activity,
  Smile,
  Shield,
  Lock,
  Zap,
  DollarSign
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden font-sans">
      {/* Modern Fixed Navbar */}
      <MarketingHeader />

      <main className="flex-1 pt-20 sm:pt-24">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
          {/* Subtle Warm Amber Glow in Background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#E9B89C]/20 via-[#F3E7DA]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Core Value Proposition */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
                
                {/* Brand Philosophy Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DDD3] shadow-xs text-xs font-semibold text-[#8B5E3C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5E3C]" />
                  <span>The Intelligent Companion for New Dog Parents</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-[#2C211B] font-heading">
                  The First Year of Puppyhood.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E3C] to-[#B27344]">
                    Made Calm, Simple &amp; Joyful.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#6B5E55] leading-relaxed font-normal">
                  Say goodbye to ruined rugs, 3 AM crate panic, and lost paper vet cards. PupLume predicts potty breaks before accidents happen, gives you 24/7 AI puppy coaching, and syncs your family in real-time.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 justify-center lg:justify-start">
                  <a
                    href="/checkout"
                    className="px-7 py-4 text-base font-bold text-white bg-[#8B5E3C] hover:bg-[#6D492F] rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Lifetime Access — $24.99</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#features"
                    className="px-6 py-4 text-base font-bold text-[#5F3E29] bg-white hover:bg-[#F3E7DA]/60 border border-[#E8DDD3] rounded-2xl transition-all shadow-2xs hover:shadow-xs active:scale-95 text-center cursor-pointer"
                  >
                    See How It Works ↓
                  </a>
                </div>

                {/* Trust Badges Strip */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-semibold text-[#766A63]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    One-time payment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    No monthly subscriptions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    14-day refund guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    iOS, Android &amp; Web
                  </span>
                </div>

              </div>

              {/* Right Column: High-Fidelity Interactive Phone Mockup */}
              <div className="lg:col-span-5 relative max-w-[340px] sm:max-w-[380px] mx-auto w-full">
                
                {/* Floating Notification Badge: Vaccine */}
                <div className="hidden sm:flex absolute -top-4 -left-6 z-20 bg-white/95 backdrop-blur-md border border-[#E8DDD3] p-3 rounded-2xl shadow-lg items-center gap-3 animate-in fade-in slide-in-from-left duration-300">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2C211B]">Rabies Booster Completed</p>
                    <p className="text-[9px] text-[#766A63]">Vault updated &amp; synced</p>
                  </div>
                </div>

                {/* Floating Notification Badge: Family Walk */}
                <div className="hidden sm:flex absolute -bottom-5 -right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E8DDD3] p-3 rounded-2xl shadow-lg items-center gap-3 animate-in fade-in slide-in-from-right duration-300">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-sm">
                    🐾
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2C211B]">Dad walked Bella</p>
                    <p className="text-[9px] text-[#766A63]">22 mins • Potty logged</p>
                  </div>
                </div>

                {/* Phone Hardware Container */}
                <div className="relative mx-auto w-full aspect-[9/18.5] bg-[#2C211B] rounded-[3rem] p-3.5 shadow-2xl border-4 border-[#5F3E29]">
                  {/* Phone Screen */}
                  <div className="w-full h-full bg-[#FFF9F2] rounded-[2.3rem] overflow-hidden flex flex-col relative text-left">
                    
                    {/* Status Bar */}
                    <div className="bg-white px-6 pt-3 pb-1 flex justify-between items-center text-[10px] font-bold text-[#2C211B]">
                      <span>9:41</span>
                      <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
                      <div className="flex gap-1 text-[9px]">5G 100%</div>
                    </div>

                    {/* App Header with Active Puppy Profile */}
                    <div className="bg-white px-4 py-3 border-b border-[#E8DDD3] flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200"
                          alt="Bella the Golden Retriever puppy"
                          className="w-10 h-10 rounded-2xl object-cover border border-[#8B5E3C]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#2C211B] text-sm">Bella</span>
                            <span className="text-[9px] bg-[#F3E7DA] text-[#5F3E29] px-1.5 py-0.5 rounded-full font-bold">12 wks</span>
                          </div>
                          <p className="text-[10px] text-[#766A63]">Golden Retriever • 16.4 lbs</p>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-xs">
                        🔔
                      </div>
                    </div>

                    {/* App Scroll Area */}
                    <div className="flex-1 p-3.5 space-y-3 overflow-hidden">
                      
                      {/* Potty Timer Card */}
                      <div className="bg-gradient-to-br from-[#FFF9F2] to-[#F3E7DA] rounded-2xl border border-[#8B5E3C]/30 p-3.5 shadow-xs">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="px-2 py-0.5 bg-[#8B5E3C] text-white text-[9px] font-extrabold uppercase rounded-full">
                            Next Potty Break
                          </span>
                          <span className="text-[10px] font-extrabold text-[#8B5E3C]">In 14 Mins</span>
                        </div>
                        <div className="w-full bg-white h-2 rounded-full overflow-hidden my-2 border border-[#E8DDD3]">
                          <div className="bg-[#8B5E3C] h-full w-[78%] rounded-full" />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#766A63]">
                          <span>Accident Risk: <strong className="text-emerald-700">Low</strong></span>
                          <span>Based on 11:30 Meal</span>
                        </div>
                      </div>

                      {/* AI Co-Pilot Advice Card */}
                      <div className="bg-white rounded-2xl border border-[#E8DDD3] p-3 shadow-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#8B5E3C] text-[10px] font-black uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Co-Pilot • Live Tip</span>
                        </div>
                        <p className="text-[11px] text-[#2C211B] font-medium leading-snug">
                          &quot;Bella is biting pants? At 12 weeks, freeze and redirect her to a cold chew rope immediately.&quot;
                        </p>
                      </div>

                      {/* Quick Log Action Bar */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#766A63] mb-1.5">One-Tap Routine Log</p>
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className="bg-white p-2 rounded-xl border border-[#E8DDD3] shadow-2xs">
                            <span className="text-sm">💦</span>
                            <p className="text-[9px] font-bold text-[#2C211B] mt-0.5">Pee</p>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-[#E8DDD3] shadow-2xs">
                            <span className="text-sm">💩</span>
                            <p className="text-[9px] font-bold text-[#2C211B] mt-0.5">Poop</p>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-[#E8DDD3] shadow-2xs">
                            <span className="text-sm">🍗</span>
                            <p className="text-[9px] font-bold text-[#2C211B] mt-0.5">Meal</p>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-[#E8DDD3] shadow-2xs">
                            <span className="text-sm">💤</span>
                            <p className="text-[9px] font-bold text-[#2C211B] mt-0.5">Nap</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Navigation Mock */}
                    <div className="bg-white border-t border-[#E8DDD3] py-2 px-4 flex justify-between items-center text-[9px] font-bold text-[#766A63]">
                      <span className="text-[#8B5E3C] flex flex-col items-center">🏠 Home</span>
                      <span className="flex flex-col items-center">📋 Plan</span>
                      <span className="flex flex-col items-center">✨ Ask AI</span>
                      <span className="flex flex-col items-center">🎓 Academy</span>
                      <span className="flex flex-col items-center">⚙️ More</span>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRUST RIBBON: ALL DOG BREEDS */}
        {/* ========================================================================= */}
        <section className="py-8 bg-white border-y border-[#E8DDD3]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#766A63] mb-4">
              Designed For Every Puppy Breed &amp; Mixed Rescue
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#5F3E29]">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E8DDD3]">🦮 Golden Retrievers</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E8DDD3]">🐶 French Bulldogs</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E8DDD3]">🐕 Corgis &amp; Dachshunds</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E8DDD3]">🐩 Labradoodles &amp; Poodles</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#E8DDD3]">🐾 Rescue Puppies</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BEFORE VS AFTER: THE CHAOS VS THE PUPLUME WAY */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6F0]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#2C211B] font-heading tracking-tight">
                Puppyhood is chaotic.<br />
                <span className="text-[#8B5E3C]">Here is how we bring peace to your home.</span>
              </h2>
              <p className="text-base text-[#6B5E55] max-w-2xl mx-auto">
                No more guessing, no more stress. See the difference PupLume makes on Day 1.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Without PupLume */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-xs relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-6">
                  <span>❌ Without PupLume</span>
                </div>
                <ul className="space-y-4 text-sm text-[#5F3E29]">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Constant carpet accidents:</strong> Guessing when your pup needs to pee, leading to ruined rugs and frustration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>3 AM crate panic:</strong> Searching endless forums in the dark wondering why your puppy won&apos;t sleep.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Lost paper vet records:</strong> Scrambling for wrinkled vaccination papers right before day care or boarding.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Family miscommunication:</strong> Wondering: &quot;Did you feed the puppy or did I? When was their last walk?&quot;</span>
                  </li>
                </ul>
              </div>

              {/* With PupLume */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8B5E3C] shadow-md relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F2] text-[#8B5E3C] text-xs font-bold mb-6 border border-[#E8DDD3]">
                  <span>✨ With PupLume</span>
                </div>
                <ul className="space-y-4 text-sm text-[#2C211B]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Predictive Potty AI:</strong> Smart alerts notify you before accidents happen based on meals and water.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>24/7 AI Behavior Co-Pilot:</strong> Instant science-backed answers for biting, barking, and crate soothing anytime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Cloud Vaccine &amp; Health Vault:</strong> All booster shots, weight charts, and certificates saved in your pocket.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Live Multi-Parent Sync:</strong> Real-time shared timeline so you, your partner, and dog walker stay on the exact same page.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE FEATURES BENTO GRID */}
        {/* ========================================================================= */}
        <section id="features" className="py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            
            <div className="text-center space-y-3 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF9F2] text-[#8B5E3C] text-xs font-bold uppercase tracking-wider border border-[#E8DDD3]">
                <Sparkles className="w-3.5 h-3.5" /> Complete Puppy Toolkit
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2C211B] font-heading tracking-tight">
                Everything you need for Year One.
              </h2>
              <p className="text-base text-[#6B5E55] max-w-2xl mx-auto">
                No bloated clutter. Just the 6 essential tools every modern puppy parent relies on every single day.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              
              {/* Feature 1: Predictive Potty Tracker */}
              <div className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    🕒
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    Predictive Potty Timer
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    Our smart algorithm learns your puppy&apos;s routine and calculates outdoor timing based on feeding, naps, and age in weeks.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>Smart timing based on meals &amp; naps</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feature 2: 24/7 AI Puppy Co-Pilot */}
              <div id="ai" className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    24/7 AI Co-Pilot
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    Trained exclusively on positive reinforcement science and canine behavior. Ask about sudden biting, night whining, separation anxiety, or food refusal.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>Instant answers anytime</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feature 3: Vaccine & Medical Vault */}
              <div className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    💉
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    Vaccine &amp; Health Vault
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    Keep DHPP, Rabies, Bordetella, and flea/tick boosters organized with automatic alerts before due dates. Store vet files safely in the cloud.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>Never miss a booster</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feature 4: Training Academy */}
              <div className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    🎓
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    Puppy Academy
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    Over 30 age-tailored interactive lessons: bite inhibition, loose leash walking, crate confidence, and safe socialization checklists.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>Week-by-week roadmap</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feature 5: Family Co-Parenting Sync */}
              <div className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    👨‍👩‍👧
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    Live Family Sync
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    Invite your partner, roommates, or dog walkers with a simple link. Everyone views the same real-time timeline so routines stay uninterrupted.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>No double feeding</span>
                  <span>→</span>
                </div>
              </div>

              {/* Feature 6: Smart QR Safety Collar */}
              <div className="bg-[#FFF9F2] rounded-3xl p-7 border border-[#E8DDD3] shadow-xs hover:border-[#8B5E3C]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center text-xl mb-5 shadow-2xs">
                    🏷️
                  </div>
                  <h3 className="text-xl font-bold text-[#2C211B] mb-2 font-heading">
                    Smart Collar Safety Tag
                  </h3>
                  <p className="text-sm text-[#6B5E55] leading-relaxed">
                    If your puppy slips their collar, anyone who scans their digital tag can immediately view medical notes and call you with one tap.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8DDD3] text-xs font-bold text-[#8B5E3C] flex items-center gap-1">
                  <span>Lost pet protection</span>
                  <span>→</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR CORE PRINCIPLES (HONEST, AUTHENTIC VALUE INSTEAD OF FAKE REVIEWS) */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF6F0]">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-[#2C211B] font-heading tracking-tight">
                Built On Four Core Principles.
              </h2>
              <p className="text-base text-[#6B5E55] max-w-xl mx-auto">
                Why puppy owners trust PupLume over traditional pet subscription apps.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
              
              {/* Principle 1 */}
              <div className="bg-white p-7 rounded-3xl border border-[#E8DDD3] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-xl text-[#8B5E3C]">
                  🐾
                </div>
                <h3 className="text-lg font-bold text-[#2C211B] font-heading">
                  1. Positive Reinforcement First
                </h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Every AI recommendation, academy guide, and habit suggestion follows certified, force-free canine behavior science. We focus on trust, gentle routines, and building a lifelong bond.
                </p>
              </div>

              {/* Principle 2 */}
              <div className="bg-white p-7 rounded-3xl border border-[#E8DDD3] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-xl text-[#8B5E3C]">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-[#2C211B] font-heading">
                  2. 100% Private &amp; Zero Ad Tracking
                </h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Your puppy&apos;s memories, health records, and daily habits belong solely to you. We write zero tracking cookies, run zero third-party ad networks, and never sell your data to pet food brands.
                </p>
              </div>

              {/* Principle 3 */}
              <div className="bg-white p-7 rounded-3xl border border-[#E8DDD3] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-xl text-[#8B5E3C]">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-[#2C211B] font-heading">
                  3. Fast &amp; Offline-Ready (PWA)
                </h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Log a potty break or a meal in under 3 seconds directly from your phone&apos;s home screen. Built as a progressive web app that operates seamlessly even in weak-signal backyards.
                </p>
              </div>

              {/* Principle 4 */}
              <div className="bg-white p-7 rounded-3xl border border-[#E8DDD3] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9F2] border border-[#E8DDD3] flex items-center justify-center text-xl text-[#8B5E3C]">
                  💰
                </div>
                <h3 className="text-lg font-bold text-[#2C211B] font-heading">
                  4. One Honest Price, No Traps
                </h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  No monthly renewal shocks, no feature gating, and no trial expirations. One straightforward payment of $24.99 grants your family lifetime access and all future feature releases.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIMPLE HONEST PRICING */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            
            <div className="text-center space-y-3 mb-14">
              <h2 className="text-3xl sm:text-5xl font-black text-[#2C211B] font-heading tracking-tight">
                One Honest Price. Lifetime Care.
              </h2>
              <p className="text-base text-[#6B5E55] max-w-xl mx-auto">
                No recurring fees. No feature gates. Pay once and keep full access forever.
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-gradient-to-br from-[#FFF9F2] to-white rounded-3xl border-2 border-[#8B5E3C] shadow-xl overflow-hidden p-8 sm:p-10 text-center relative">
              
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#8B5E3C] text-white text-xs font-bold uppercase tracking-wider mb-6">
                Lifetime Access • One-Time Payment
              </div>

              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-5xl sm:text-6xl font-black text-[#2C211B] font-heading">$24.99</span>
                <span className="text-sm font-bold text-[#766A63]">USD</span>
              </div>

              <p className="text-xs font-semibold text-[#766A63] mb-8">
                One single payment. Full features unlocked forever.
              </p>

              <div className="space-y-3 text-left mb-8 text-sm text-[#2C211B]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited 24/7 AI Puppy Co-Pilot Chat</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Predictive Potty &amp; Routine Tracker</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digital Vaccine, Weight &amp; Health Vault</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full Training Academy (All Modules &amp; Videos)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited Co-Parents &amp; Sitters Family Sync</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Future Updates &amp; New Features Forever</span>
                </div>
              </div>

              <a
                href="/checkout"
                className="w-full py-4 text-base font-bold text-white bg-[#8B5E3C] hover:bg-[#6D492F] rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Lifetime Access Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-[#766A63] mt-4">
                🔒 256-bit Encrypted Checkout via Paddle • 14-Day Money Back Guarantee
              </p>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section id="faq" className="py-20 sm:py-28 bg-[#FAF6F0]">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            
            <div className="text-center space-y-3 mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-[#2C211B] font-heading tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#6B5E55]">
                Everything you need to know before joining the PupLume family.
              </p>
            </div>

            <div className="space-y-4">
              
              <details className="group bg-white rounded-2xl border border-[#E8DDD3] p-5 cursor-pointer open:shadow-xs transition-all">
                <summary className="flex justify-between items-center font-bold text-[#2C211B] text-sm sm:text-base select-none list-none">
                  <span>Is PupLume really a one-time payment?</span>
                  <span className="text-[#8B5E3C] text-lg font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed border-t border-[#F3E7DA] pt-3">
                  Yes! We dislike endless pet subscriptions just as much as you do. You pay $24.99 once and get full lifetime access for your puppy, including all future updates and AI tools with zero recurring charges.
                </p>
              </details>

              <details className="group bg-white rounded-2xl border border-[#E8DDD3] p-5 cursor-pointer open:shadow-xs transition-all">
                <summary className="flex justify-between items-center font-bold text-[#2C211B] text-sm sm:text-base select-none list-none">
                  <span>What age puppy is PupLume best for?</span>
                  <span className="text-[#8B5E3C] text-lg font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed border-t border-[#F3E7DA] pt-3">
                  PupLume is specifically optimized for puppies from 8 weeks up to 18 months old—the most critical and demanding period of canine development. However, the routine trackers, health vault, and collar tag are useful for your dog&apos;s entire lifetime!
                </p>
              </details>

              <details className="group bg-white rounded-2xl border border-[#E8DDD3] p-5 cursor-pointer open:shadow-xs transition-all">
                <summary className="flex justify-between items-center font-bold text-[#2C211B] text-sm sm:text-base select-none list-none">
                  <span>Can my partner or family members share my account?</span>
                  <span className="text-[#8B5E3C] text-lg font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed border-t border-[#F3E7DA] pt-3">
                  Yes, Family Co-Parenting Sync is included with every account. You can invite your spouse, kids, dog walker, or puppy sitter with an invitation link. Everyone sees the exact same live timeline on their phones.
                </p>
              </details>

              <details className="group bg-white rounded-2xl border border-[#E8DDD3] p-5 cursor-pointer open:shadow-xs transition-all">
                <summary className="flex justify-between items-center font-bold text-[#2C211B] text-sm sm:text-base select-none list-none">
                  <span>Does it work on iPhone and Android?</span>
                  <span className="text-[#8B5E3C] text-lg font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed border-t border-[#F3E7DA] pt-3">
                  Yes! PupLume is built as a progressive web app (PWA). You can install it straight to your phone&apos;s home screen with one tap from Safari (iOS) or Chrome (Android) without going through bulky store updates.
                </p>
              </details>

              <details className="group bg-white rounded-2xl border border-[#E8DDD3] p-5 cursor-pointer open:shadow-xs transition-all">
                <summary className="flex justify-between items-center font-bold text-[#2C211B] text-sm sm:text-base select-none list-none">
                  <span>What is your refund policy?</span>
                  <span className="text-[#8B5E3C] text-lg font-bold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#6B5E55] leading-relaxed border-t border-[#F3E7DA] pt-3">
                  We stand behind our quality. If you encounter any technical difficulty or face unexpected personal hardship within 14 days of purchase, email us at <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline font-bold">support@puplume.pet</a> and we will gladly refund your payment.
                </p>
              </details>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CLOSING BANNER */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 bg-[#2C211B] text-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 space-y-6">
            <span className="text-4xl">🐾</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Your puppy is only this small once.<br />
              Make every moment count.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Give your puppy the calm, structured, loving start they deserve from Day 1.
            </p>
            <div className="pt-2">
              <a
                href="/checkout"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold text-[#2C211B] bg-white hover:bg-[#FFF9F2] rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Get Lifetime Access — $24.99</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-zinc-400">
              One-Time Payment • No Subscriptions • 14-Day Guarantee
            </p>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* UNIVERSAL CLEAN FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#E8DDD3] bg-white pt-14 pb-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link href="/" aria-label="PupLume Home" className="flex items-center cursor-pointer">
              <PupLumeLogo variant="full" size="md" />
            </Link>
            
            <nav aria-label="Footer Navigation" className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-[#766A63] items-center justify-center">
              <Link href="/legal/privacy" className="hover:text-[#8B5E3C] transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-[#8B5E3C] transition-colors">Terms of Service</Link>
              <Link href="/legal/refund" className="hover:text-[#8B5E3C] transition-colors">Refund Policy</Link>
              <Link href="/legal/cookies" className="hover:text-[#8B5E3C] transition-colors">Cookie Policy</Link>
              <a href="mailto:support@puplume.pet" className="hover:text-[#8B5E3C] transition-colors">Contact Support</a>
            </nav>
          </div>

          <div className="border-t border-[#F3E7DA] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#766A63]">
            <p>&copy; {new Date().getFullYear()} PupLume. Built with love for puppies and their humans.</p>
            <p>Positive reinforcement first. 🐾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
