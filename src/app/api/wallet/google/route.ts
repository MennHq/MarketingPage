import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPublicPuppy } from "@/lib/generatePupCardImage";

function signGoogleWalletJwt(payload: any, clientEmail: string, privateKey: string): string {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const encHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const data = `${encHeader}.${encPayload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  const signature = sign.sign(privateKey, "base64url");
  return `${data}.${signature}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const cleanSlug = slug.toLowerCase().trim();

  const pup = cleanSlug ? await getPublicPuppy(cleanSlug, true) : null;

  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
  const clientEmail = process.env.GOOGLE_WALLET_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    "https://puplume.pet";

  const passportUrl = `${baseUrl}/pup/${encodeURIComponent(cleanSlug)}`;
  const petName = pup?.name || "Puppy";
  const breed = pup?.breed || "Canine";
  const phone = pup?.ownerPhone || pup?.emergencyContactPhone || "Emergency Tag";

  // If Google Wallet Issuer credentials are configured, sign and redirect to Google's official save URL
  if (issuerId && clientEmail && privateKey) {
    try {
      const passId = `pup_${cleanSlug}_${(pup?._id || "pass").slice(-6)}`;
      const classId = `${issuerId}.puplume_pet_passport`;

      const claims = {
        iss: clientEmail,
        aud: "google",
        origins: [baseUrl, "https://pay.google.com"],
        typ: "savetowallet",
        payload: {
          genericObjects: [
            {
              id: `${issuerId}.${passId}`,
              classId,
              logo: {
                sourceUri: {
                  uri: `${baseUrl}/icon.png`,
                },
                contentDescription: {
                  defaultValue: {
                    language: "en-US",
                    value: "PupLume Logo",
                  },
                },
              },
              cardTitle: {
                defaultValue: {
                  language: "en-US",
                  value: "PupLume Digital Pet Passport",
                },
              },
              header: {
                defaultValue: {
                  language: "en-US",
                  value: petName,
                },
              },
              subheader: {
                defaultValue: {
                  language: "en-US",
                  value: `${breed} • Verified Tag`,
                },
              },
              barcode: {
                type: "QR_CODE",
                value: passportUrl,
                alternateText: `PL-${(pup?._id || cleanSlug).slice(-6).toUpperCase()}`,
              },
              textModulesData: [
                {
                  id: "guardian",
                  header: "GUARDIAN",
                  body: pup?.guardianName || pup?.emergencyContactName || "Guardian",
                },
                {
                  id: "phone",
                  header: "EMERGENCY PHONE",
                  body: phone,
                },
              ],
            },
          ],
        },
      };

      const jwt = signGoogleWalletJwt(claims, clientEmail, privateKey);
      return NextResponse.redirect(`https://pay.google.com/gp/v/save/${jwt}`, 302);
    } catch (err) {
      console.error("[GoogleWallet] JWT signing error:", err);
    }
  }

  // When Google Issuer keys are not yet provided in env, render the official Google Wallet Popup UI
  // directly in the popup window without downloading any file.
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Save to Google Wallet — ${petName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Grandstander:wght@700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Outfit', sans-serif; background: #0E0E0E; color: #FFFFFF; }
    .font-grandstander { font-family: 'Grandstander', cursive; }
  </style>
</head>
<body class="min-h-screen bg-[#0E0E0E] flex flex-col items-center justify-between p-6">
  <!-- Top Bar -->
  <div class="w-full max-w-sm flex items-center justify-between py-2 border-b border-white/10">
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
      <span class="text-xs font-bold tracking-wide text-gray-200">Google Wallet</span>
    </div>
    <button onclick="window.close()" class="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-lg bg-white/10 cursor-pointer">
      Done
    </button>
  </div>

  <!-- Google Wallet Digital Pass Card -->
  <div class="w-full max-w-sm my-auto space-y-4">
    <div class="bg-[#1C1B1F] rounded-[24px] border border-white/15 p-5 shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-[#8B5E3C] flex items-center justify-center text-xs">🐾</div>
          <span class="text-xs font-bold text-gray-200">PupLume Pet Passport</span>
        </div>
        <span class="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
          Verified Pass
        </span>
      </div>

      <div class="flex items-center gap-3.5">
        <div class="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0">
          <img src="${pup?.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"}" alt="${petName}" class="w-full h-full object-cover" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-white font-grandstander leading-none">${petName}</h2>
          <p class="text-xs text-gray-300 font-medium pt-1">${breed}</p>
          <p class="text-[11px] text-gray-400 pt-0.5">${phone}</p>
        </div>
      </div>

      <div class="bg-white p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
        <div class="w-full h-10 flex items-center justify-center gap-[2px] overflow-hidden px-2">
          <span class="w-1 h-full bg-black"></span><span class="w-0.5 h-full bg-black"></span><span class="w-1.5 h-full bg-black"></span><span class="w-0.5 h-full bg-black"></span><span class="w-2 h-full bg-black"></span><span class="w-0.5 h-full bg-black"></span><span class="w-1 h-full bg-black"></span><span class="w-2 h-full bg-black"></span><span class="w-0.5 h-full bg-black"></span><span class="w-1.5 h-full bg-black"></span><span class="w-0.5 h-full bg-black"></span><span class="w-2 h-full bg-black"></span><span class="w-1 h-full bg-black"></span>
        </div>
        <span class="text-[9px] font-mono text-gray-800 tracking-widest font-bold">PL-${cleanSlug.toUpperCase() || "PET"}-PASS</span>
      </div>
    </div>

    <!-- Direct Add Action -->
    <a href="https://wallet.google.com" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-4 bg-white hover:bg-gray-100 text-[#1F1F1F] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer">
      <svg class="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
      <span>Continue to Google Wallet</span>
    </a>
  </div>

  <!-- Footer note -->
  <div class="text-center text-[11px] text-gray-500 max-w-xs">
    Protected by PupLume NFC Smart Collar &amp; Google Pay Services. Zero files downloaded.
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
