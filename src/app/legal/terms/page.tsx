import Link from "next/link";

export const metadata = { title: "Terms of Service | PupLume" };

export default function TermsOfService() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Terms of Service</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: November 2, 2026</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        Welcome to PupLume (&quot;PupLume,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our web application, mobile applications, AI features, digital puppy organizer, and related services (collectively, the &quot;Service&quot;).
      </p>

      {/* 1. Acceptance & Age Requirements */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. Acceptance of Terms & Eligibility</h2>
        <p className="mb-4">
          By creating an account, accessing, or using PupLume, you agree to be bound by these Terms and our <Link href="/legal/privacy" className="text-[#8B5E3C] underline font-semibold">Privacy Policy</Link>. If you do not agree to these Terms, do not use the Service.
        </p>
        <p className="mb-4">
          The Service is intended for family pet care. However, you must be at least 13 years of age to create an account. If you are under 18 years of age, you must have the consent and supervision of a parent or legal guardian to create an account or make any purchases.
        </p>
      </section>

      {/* 2. Medical & Veterinary Disclaimer */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. Veterinary & Medical Disclaimer (Important)</h2>
        <div className="bg-[#FFF9F2] border-l-4 border-[#8B5E3C] p-5 rounded-r-xl mb-4">
          <p className="font-bold text-[#8B5E3C] mb-2 uppercase text-xs tracking-wider">Informational & Tracking Purposes Only</p>
          <p className="text-sm text-zinc-800 leading-relaxed">
            <strong>PupLume and its AI-powered features are NOT licensed veterinarians, certified animal hospitals, or emergency poison control centers.</strong> The content, puppy milestones, potty schedule suggestions, and AI chat responses are provided strictly for routine tracking and educational purposes.
          </p>
        </div>
        <p className="mb-4">
          The Service is <strong>not</strong> a substitute for professional veterinary clinical diagnosis, medical advice, prescription, or emergency care. Always consult a licensed veterinarian for specific medical concerns, sudden behavior changes, toxic ingestion emergencies, or illness. Never disregard or delay seeking professional veterinary care because of information provided by PupLume.
        </p>
      </section>

      {/* 3. User Accounts & Security */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. User Accounts & Security</h2>
        <p className="mb-4">
          When you create an account, you agree to provide accurate, current, and complete information. You are responsible for safeguarding your login credentials and for all activities that take place under your account.
        </p>
        <p className="mb-4">
          Notify us immediately at <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline font-semibold">support@puplume.pet</a> if you suspect any unauthorized access to or compromise of your account.
        </p>
      </section>

      {/* 4. Customer Data Ownership */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Your Data & Content Ownership</h2>
        <p className="mb-4">
          <strong>Your data belongs to you.</strong> You retain full ownership of all puppy photos, names, daily notes, health records, vaccination files, and journal entries that you upload to PupLume (&quot;User Content&quot;).
        </p>
        <p className="mb-4">
          You grant PupLume only a limited, worldwide, non-exclusive license to host, store, display, and process your User Content solely to operate, maintain, and provide the Service to you and your authorized family members. We do not sell your personal data or your puppy&apos;s photos.
        </p>
      </section>

      {/* 5. Payments, Subscriptions & Merchant of Record */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">5. Pricing, Billing & Merchant of Record</h2>
        <p className="mb-4">
          PupLume offers free features and paid premium offerings (such as lifetime passes or subscription plans). All prices are displayed in USD or your local currency where applicable.
        </p>
        <p className="mb-4">
          Our order process and payment transactions are conducted by our Merchant of Record, <strong>Paddle</strong> (Paddle.com Market Ltd). Paddle acts as the Merchant of Record for all customer orders, handling payment processing, billing receipts, applicable sales tax, VAT calculation, and currency conversion.
        </p>
        <p className="mb-4">
          If you purchase a recurring subscription, it will automatically renew at the end of each billing cycle unless you cancel prior to the renewal date. You can cancel your subscription at any time within your account settings or by emailing <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline font-semibold">support@puplume.pet</a>. Upon cancellation, you will retain access through the end of your current paid billing period.
        </p>
      </section>

      {/* 6. Refund Policy Reference */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">6. Refund Policy</h2>
        <p className="mb-4">
          Because PupLume delivers immediate digital access to AI tools, printable resources, and premium features, purchases are generally final. However, we maintain compassionate exceptions for unforeseen hardships or technical issues within 14 days of purchase.
        </p>
        <p className="mb-4">
          Please review our full details, eligibility rules, and instructions in our <Link href="/legal/refund" className="text-[#8B5E3C] underline font-semibold">Refund Policy</Link>.
        </p>
      </section>

      {/* 7. Acceptable Use Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">7. Acceptable Use Policy</h2>
        <p className="mb-4">You agree that you will not:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Use the Service for any unlawful purpose, animal abuse, or unauthorized commercial activity.</li>
          <li>Reverse engineer, decompile, disassemble, or attempt to extract source code from the Service.</li>
          <li>Circumvent, disable, or tamper with security features, subscription gates, or digital rights management.</li>
          <li>Upload malicious code, viruses, automated crawlers, scrapers, or overload our infrastructure.</li>
          <li>Harass, abuse, or harm other users, support staff, or pets.</li>
        </ul>
      </section>

      {/* 8. Warranty Disclaimer */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">8. Disclaimer of Warranties (&quot;AS-IS&quot;)</h2>
        <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl mb-4">
          <p className="text-xs uppercase font-bold text-zinc-700 tracking-wide mb-2">Legal Disclaimer</p>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed uppercase">
            TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE SERVICE AND ALL CONTENT, ADVICE, AND SOFTWARE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. PUPLUME EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed uppercase mt-3">
            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT AI RESPONSES WILL BE 100% ACCURATE OR COMPLETE.
          </p>
        </div>
      </section>

      {/* 9. Limitation of Liability */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">9. Limitation of Liability</h2>
        <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl mb-4">
          <p className="text-xs uppercase font-bold text-zinc-700 tracking-wide mb-2">Liability Cap</p>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed uppercase">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PUPLUME, ITS FOUNDERS, OFFICERS, EMPLOYEES, AFFILIATES, OR PARTNERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR INJURY TO PERSONS OR PETS, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO USE) THE SERVICE.
          </p>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed uppercase mt-3">
            IN NO EVENT SHALL OUR TOTAL CUMULATIVE LIABILITY EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO PUPLUME FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR FIFTY US DOLLARS ($50.00 USD), WHICHEVER IS GREATER.
          </p>
        </div>
      </section>

      {/* 10. Indemnification */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">10. Indemnification</h2>
        <p className="mb-4">
          You agree to defend, indemnify, and hold harmless PupLume, its operators, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use or misuse of the Service, violation of these Terms, or infringement of any third-party rights.
        </p>
      </section>

      {/* 11. Termination */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">11. Termination</h2>
        <p className="mb-4">
          You may terminate your account at any time by requesting deletion in your settings or emailing support. We reserve the right to suspend or terminate your access to the Service immediately and without prior notice if you violate these Terms or engage in fraudulent or abusive behavior.
        </p>
      </section>

      {/* 12. Changes to These Terms */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">12. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. When changes occur, we will update the &quot;Effective Date&quot; at the top of this document. Continued use of the Service after changes take effect constitutes your acceptance of the revised Terms.
        </p>
      </section>

      {/* 13. Contact Information */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">13. Contact & Support</h2>
        <p className="mb-4">
          For any questions, legal inquiries, or notices regarding these Terms, please contact us at:
        </p>
        <div className="bg-[#FFF9F2] p-5 rounded-2xl border border-[#E8DDD3] inline-block">
          <p className="font-bold text-[#2C211B]">PupLume Customer Support</p>
          <p className="text-sm text-zinc-700 mt-1">
            Email: <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] hover:underline font-semibold">support@puplume.pet</a>
          </p>
          <p className="text-xs text-zinc-500 mt-2">
            Standard customer inquiries receive a response within 24 to 48 business hours.
          </p>
        </div>
      </section>
    </article>
  );
}
