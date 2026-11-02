import Link from "next/link";

export const metadata = { title: "Refund & Cancellation Policy | PupLume" };

export default function RefundPolicy() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Refund & Cancellation Policy</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: November 2, 2026</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        At PupLume, our mission is to support puppy parents through every milestone of early puppyhood. We want you to feel confident and informed about your purchase. Please read our refund and subscription cancellation terms below.
      </p>

      {/* 1. Digital Goods General Rule */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. General Rule: Digital Products & Services</h2>
        <p className="mb-4">
          PupLume provides instant digital software, interactive AI coaching, downloadable logs, and lifetime/subscription access that is made available immediately upon completed checkout.
        </p>
        <p className="mb-4">
          Because digital access is delivered instantly and cannot be physically returned, <strong>all purchases are generally non-refundable once digital features have been unlocked</strong>, subject to consumer statutory rights and our compassionate exceptions below.
        </p>
      </section>

      {/* 2. Compassionate Exceptions */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. 14-Day Compassionate Exceptions</h2>
        <p className="mb-4">
          We understand that welcoming a puppy does not always go as planned, and unexpected hardships happen. We will gladly review and honor refund requests submitted within <strong>fourteen (14) calendar days</strong> of the original transaction date in the following cases:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Loss or Re-homing of Pet:</strong> In the heartbreaking event of the tragic loss, sudden medical disqualification, or unavoidable re-homing of your puppy.</li>
          <li><strong>Persistent Technical Malfunction:</strong> In the rare event of a verified technical bug or system failure that completely prevents you from using core features, and which our support engineering team is unable to resolve within 72 hours.</li>
          <li><strong>Accidental Duplicate Charge:</strong> If our billing gateway accidentally processed a double charge for the same account.</li>
        </ul>
      </section>

      {/* 3. Subscription Cancellations */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. How Subscriptions & Renewals Work</h2>
        <p className="mb-4">
          If you have purchased a recurring plan (e.g. monthly or annual subscription), you have total freedom to cancel anytime:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Instant Self-Service:</strong> You can cancel future renewals at any time in your account settings or via the management link included on your Paddle email receipt.</li>
          <li><strong>Support Request:</strong> You can also email us at <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline font-semibold">support@puplume.pet</a> and we will process the cancellation on your behalf.</li>
          <li><strong>Active Access:</strong> When you cancel, you will continue to have full premium access until the end of your current paid billing period. There are no surprise fees or termination penalties.</li>
        </ul>
      </section>

      {/* 4. Merchant of Record & Billing Support */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Payment Processing by Paddle</h2>
        <p className="mb-4">
          All financial transactions, customer invoices, and refund executions are administered by our Merchant of Record, <strong>Paddle</strong>. Paddle complies with global payment standards (PCI-DSS Level 1) and handles international VAT and consumer protections.
        </p>
        <p className="mb-4">
          Approved refunds will be processed by Paddle back to your original payment method (Credit Card, Apple Pay, Google Pay, or PayPal). Please allow 5 to 10 business days for the credit to appear on your bank statement.
        </p>
      </section>

      {/* 5. How to Submit a Refund Request */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">5. How to Request a Refund</h2>
        <p className="mb-4">
          To request an exception refund, please email our support team with your order details:
        </p>
        <div className="bg-[#FFF9F2] p-5 rounded-2xl border border-[#E8DDD3] space-y-3">
          <p className="font-bold text-[#2C211B]">Email Subject: <span className="text-[#8B5E3C]">Refund Request - [Your Order / Account Email]</span></p>
          <p className="text-sm text-zinc-700">Send to: <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] underline font-semibold">support@puplume.pet</a></p>
          <p className="text-xs text-zinc-600">
            Please include: (1) The email address used at checkout, (2) Your Paddle Order ID or receipt number, and (3) A brief explanation of the issue or circumstance. We review all requests respectfully and respond within 24 to 48 business hours.
          </p>
        </div>
      </section>

      <div className="border-t border-zinc-100 pt-6 text-sm text-zinc-500">
        Related: Read our <Link href="/legal/terms" className="text-[#8B5E3C] underline font-medium">Terms of Service</Link> and <Link href="/legal/privacy" className="text-[#8B5E3C] underline font-medium">Privacy Policy</Link>.
      </div>
    </article>
  );
}
