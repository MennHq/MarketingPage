import React from 'react';

export const metadata = { title: "Privacy Policy | PupLume" };

export default function PrivacyPolicy() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px] pb-16">
      <header className="mb-10 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Privacy Policy</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: November 2, 2026 • Last Updated: November 2, 2026</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        Welcome to PupLume (&quot;PupLume,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). PupLume provides a digital puppy care assistant, routine tracker, smart collar tag safety hub, and AI-guided puppy coaching service. This Privacy Policy explains what personal data we collect, why we collect it, how it is handled, and the third-party services we partner with.
      </p>

      {/* 1. Information We Collect */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you actively provide to us, as well as data gathered automatically when you use our service:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Account Data:</strong> Your name, email address, profile avatar, and authentication credentials (processed securely via Clerk).</li>
          <li><strong>Puppy Profiles:</strong> Puppy names, breeds, dates of birth, photos, gender, and weights.</li>
          <li><strong>Daily Activity Logs:</strong> Potty break records (time, pad/outdoor, notes), feeding logs, sleep/nap times, and completed training habits.</li>
          <li><strong>Pet Health &amp; Medical Records:</strong> Vaccine histories, clinic names, appointment reminders, and health notes you choose to log.</li>
          <li><strong>AI Chat Interactions:</strong> Questions, training queries, and prompts submitted to the PupLume AI Puppy Coach.</li>
          <li><strong>Payment &amp; Transaction Metadata:</strong> Order IDs, pass status, and billing confirmations. <em>PupLume does not collect or store raw credit card numbers; payment data is securely handled directly by our Merchant of Record, Paddle.</em></li>
          <li><strong>Device &amp; Telemetry Data:</strong> IP address, device type, browser settings, and operational telemetry collected automatically to maintain app reliability.</li>
        </ul>
      </section>

      {/* 2. How We Use Information */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. How We Use Your Information</h2>
        <p className="mb-4">Your data is strictly used to provide, maintain, and enhance the PupLume service:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>To generate personalized daily routines, age-appropriate potty countdowns, and feeding schedules.</li>
          <li>To power interactive AI coaching responses and custom training drills tailored to your puppy&apos;s age and breed.</li>
          <li>To display your puppy&apos;s public Smart QR Collar Tag safety webpage if you choose to activate it.</li>
          <li>To sync puppy progress seamlessly across household members and caregivers in real time.</li>
          <li>To monitor app health, diagnose bugs, and improve user experience.</li>
        </ul>
      </section>

      {/* 3. Third-Party Sub-Processors */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. Data Sharing and Third-Party Sub-Processors</h2>
        <p className="mb-4">
          <strong>We never sell, rent, or trade your personal data.</strong> To operate our application, we share necessary data with trusted third-party providers under strict data privacy agreements:
        </p>
        <div className="overflow-x-auto my-6 border border-zinc-200 rounded-2xl shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Service Provider</th>
                <th className="py-3 px-4">Role &amp; Purpose</th>
                <th className="py-3 px-4">Data Shared</th>
                <th className="py-3 px-4">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Clerk (clerk.com)</td>
                <td className="py-3 px-4">User Authentication &amp; Identity</td>
                <td className="py-3 px-4">Name, email, session tokens</td>
                <td className="py-3 px-4">United States</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Convex (convex.dev)</td>
                <td className="py-3 px-4">Cloud Database &amp; Realtime Sync</td>
                <td className="py-3 px-4">Puppy profiles, routines, health logs, photos</td>
                <td className="py-3 px-4">United States</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Vercel (vercel.com)</td>
                <td className="py-3 px-4">Cloud Hosting &amp; Serverless Infra</td>
                <td className="py-3 px-4">IP address, request logs</td>
                <td className="py-3 px-4">United States / Global Edge</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Google Gemini API</td>
                <td className="py-3 px-4">AI Puppy Coach Model Inference</td>
                <td className="py-3 px-4">Anonymized chat prompts &amp; puppy context</td>
                <td className="py-3 px-4">United States</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Paddle (paddle.com)</td>
                <td className="py-3 px-4">Merchant of Record &amp; Payment Gateway</td>
                <td className="py-3 px-4">Billing email, country, transaction records</td>
                <td className="py-3 px-4">United Kingdom / Global</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">PostHog (posthog.com)</td>
                <td className="py-3 px-4">Product Analytics &amp; Error Tracking</td>
                <td className="py-3 px-4">Anonymized events, browser telemetry</td>
                <td className="py-3 px-4">United States / EU</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Veterinary Disclaimer */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Special Veterinary &amp; Medical Disclaimer</h2>
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>Important:</strong> PupLume and its AI Puppy Coach provide educational insights, habit tracking, and puppy development suggestions. <strong>PupLume does not provide licensed veterinary medical diagnosis, medical advice, prescription, or emergency care.</strong> Always consult a qualified, licensed veterinarian for animal health emergencies, medical diagnostics, vaccinations, or dietary treatments.
          </p>
        </div>
      </section>

      {/* 5. Children's Privacy */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">5. Children&apos;s Privacy (COPPA &amp; Family Use)</h2>
        <p className="mb-4">
          PupLume is designed as a family-friendly puppy care assistant with wholesome content suitable for all ages (3+). However, to comply with the Children&apos;s Online Privacy Protection Act (COPPA) and international digital privacy standards:
        </p>
        <p className="mb-4">
          <strong>Accounts must be created and managed by an adult or parent/legal guardian aged 13 or older</strong> (and 18 or older to complete paid transactions via Paddle). We do not knowingly collect personal information directly from children under 13 without verifiable parental oversight. If you believe a child under 13 has registered without parental authorization, please notify us at <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline">support@puplume.pet</a> for prompt removal.
        </p>
      </section>

      {/* 6. User Rights */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">6. Your Privacy Rights (US State Laws &amp; GDPR)</h2>
        <p className="mb-4">Regardless of your location, you have meaningful rights over your data:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Right to Access &amp; Know:</strong> You may request a copy of all personal information we have recorded about you.</li>
          <li><strong>Right to Rectification:</strong> You can edit or correct puppy details and records directly within your profile settings at any time.</li>
          <li><strong>Right to Deletion:</strong> You can request permanent erasure of your account, puppy profiles, and health records.</li>
          <li><strong>Right to Opt-Out:</strong> You may opt out of non-essential analytics tracking or marketing emails.</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline">support@puplume.pet</a>. We respond to verified requests within 30 days without charge.</p>
      </section>

      {/* 7. Data Storage & International Transfers */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">7. Data Storage &amp; International Transfers</h2>
        <p className="mb-4">
          PupLume is hosted primarily on secure cloud servers located in the United States. If you access our services from outside the United States, your information will be transferred to and processed in the US under standard contractual clauses and appropriate administrative safeguards.
        </p>
      </section>

      {/* 8. Retention & Security */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">8. Data Retention &amp; Security Safeguards</h2>
        <p className="mb-4">
          We retain your puppy records and account information for as long as your account remains active. Upon receiving an account deletion request, your personal data will be purged from active databases within 30 days.
        </p>
        <p className="mb-4">
          We employ robust technical safeguards, including HTTPS/TLS encryption in transit and encrypted cloud storage at rest, to prevent unauthorized access or disclosure.
        </p>
      </section>

      {/* 9. Contact */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">9. Contact Us</h2>
        <p className="mb-4">If you have any questions or concerns regarding this Privacy Policy or data handling practices, please contact us:</p>
        <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/80 inline-block">
          <p className="font-bold text-zinc-900 mb-1">PupLume Privacy Team</p>
          <p className="text-zinc-600">Email: <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] font-semibold hover:underline">support@puplume.pet</a></p>
          <p className="text-zinc-600">Web: <a href="https://puplume.pet" className="text-[#8B5E3C] font-semibold hover:underline">https://puplume.pet</a></p>
        </div>
      </section>
    </article>
  );
}