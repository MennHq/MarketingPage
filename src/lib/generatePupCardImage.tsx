import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";

// In-memory font cache
let outfitBlack: Buffer | null = null;
let outfitBold: Buffer | null = null;
let outfitSemiBold: Buffer | null = null;
let grandstanderBlack: Buffer | null = null;

// In-memory puppy data cache (60-second TTL for instant response)
const puppyCache = new Map<string, { data: any; timestamp: number }>();

function loadFonts() {
  try {
    if (!outfitBlack) {
      const fontsDir = path.join(process.cwd(), "public/fonts");
      if (fs.existsSync(path.join(fontsDir, "Outfit-Black.ttf"))) {
        outfitBlack = fs.readFileSync(path.join(fontsDir, "Outfit-Black.ttf"));
      }
      if (fs.existsSync(path.join(fontsDir, "Outfit-Bold.ttf"))) {
        outfitBold = fs.readFileSync(path.join(fontsDir, "Outfit-Bold.ttf"));
      }
      if (fs.existsSync(path.join(fontsDir, "Outfit-SemiBold.ttf"))) {
        outfitSemiBold = fs.readFileSync(path.join(fontsDir, "Outfit-SemiBold.ttf"));
      }
      if (fs.existsSync(path.join(fontsDir, "Grandstander-Black.ttf"))) {
        grandstanderBlack = fs.readFileSync(path.join(fontsDir, "Grandstander-Black.ttf"));
      }
    }
  } catch (err) {
    console.error("Font loading error:", err);
  }
}

export async function getPublicPuppy(slug: string) {
  const normalized = slug.toLowerCase().trim();
  const cached = puppyCache.get(normalized);
  if (cached && Date.now() - cached.timestamp < 60000) {
    return cached.data;
  }

  try {
    const convexUrl =
      process.env.VITE_CONVEX_URL ||
      process.env.NEXT_PUBLIC_CONVEX_URL ||
      "https://energetic-partridge-407.convex.cloud";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "puppies:getPublicPuppyByTag",
        args: { identifier: normalized },
      }),
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.status === "success" && data.value) {
      puppyCache.set(normalized, { data: data.value, timestamp: Date.now() });
      return data.value;
    }
  } catch (err) {
    console.error("Error fetching puppy in OG generator:", err);
  }
  return null;
}

export async function generatePupCardImage(slug: string): Promise<ImageResponse> {
  loadFonts();

  const fontOptions: any[] = [];
  if (outfitBlack) {
    fontOptions.push({ name: "Outfit", data: outfitBlack, weight: 900, style: "normal" });
  }
  if (outfitBold) {
    fontOptions.push({ name: "Outfit", data: outfitBold, weight: 700, style: "normal" });
  }
  if (outfitSemiBold) {
    fontOptions.push({ name: "Outfit", data: outfitSemiBold, weight: 600, style: "normal" });
  }
  if (grandstanderBlack) {
    fontOptions.push({ name: "Grandstander", data: grandstanderBlack, weight: 900, style: "normal" });
  }

  const edgeHeaders = {
    "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    "https://petttttttpuplume.vercel.app";

  const pup = slug ? await getPublicPuppy(slug) : null;

  if (!pup) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FCFAF7",
            fontFamily: "Outfit, sans-serif",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "32px",
              padding: "60px 80px",
              border: "2px solid #E8DDD3",
              boxShadow: "0 20px 40px rgba(44, 33, 27, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "36px",
                fontWeight: 900,
                fontFamily: "Grandstander, Outfit, sans-serif",
                color: "#2C211B",
                marginBottom: "20px",
              }}
            >
              <span>Pup</span>
              <span style={{ color: "#8B5E3C" }}>Lume</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "44px",
                fontWeight: 900,
                color: "#2C211B",
                marginBottom: "12px",
              }}
            >
              <span>Puppy Passport Not Found</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 600,
                color: "#6B5E55",
                marginBottom: "24px",
              }}
            >
              <span>{`No active collar tag registered for "${slug || 'puppy'}".`}</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                fontWeight: 700,
                color: "#8B5E3C",
              }}
            >
              <span>puplume.pet - Smart Digital Pet Passport</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: fontOptions.length > 0 ? fontOptions : undefined,
        headers: edgeHeaders,
      }
    );
  }

  const isEmergency = Boolean(pup.isLost);
  const name = pup.name || "Puppy";
  const breed = pup.breed || "Puppy";
  const weight = pup.weightLbs ? `${pup.weightLbs} lbs` : "";
  const temperament = pup.temperament || "Playful, affectionate & loyal";
  const microchip =
    pup.microchipNumber ||
    `PL-${(pup._id || "985").toString().slice(-6).toUpperCase()}-PUP`;

  let photoUrl =
    pup.photoUrl && pup.photoUrl.startsWith("http")
      ? pup.photoUrl
      : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";

  // Optimize Cloudinary URLs for lightning-fast serverless render
  if (photoUrl.includes("res.cloudinary.com") && photoUrl.includes("/image/upload/")) {
    photoUrl = photoUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_800,c_fill/");
  }

  // Real Scannable ISO-compliant QR Code that leads directly to this puppy's live public passport
  const publicPupUrl = `${baseUrl}/pup/${encodeURIComponent(slug.toLowerCase().trim())}`;
  let qrDataUrl = "";
  try {
    qrDataUrl = await QRCode.toDataURL(publicPupUrl, {
      margin: 2, // Standard quiet zone for 100% instant camera detection
      width: 240, // Crisp high-DPI matrix
      errorCorrectionLevel: "M",
      color: {
        dark: isEmergency ? "#991B1B" : "#1C140E",
        light: "#FFFFFF",
      },
    });
  } catch (qrErr) {
    console.error("QR Code generation error:", qrErr);
  }

  // Format subtitle details
  const subtitleParts: string[] = [breed];
  if (weight) subtitleParts.push(weight);
  if (pup.sex) subtitleParts.push(pup.sex);
  const subtitleText = subtitleParts.join(" \u2022 ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isEmergency ? "#FEF2F2" : "#FCFAF7",
          fontFamily: "Outfit, sans-serif",
          padding: "24px 60px",
          justifyContent: "space-between",
        }}
      >
        {/* Top Brand Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "44px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* PupLume Squircle Icon */}
            <div
              style={{
                display: "flex",
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                backgroundColor: isEmergency ? "#DC2626" : "#8B5E3C",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="#FFF9F2" />
                <circle cx="9" cy="10" r="1.6" fill="#2C211B" />
                <circle cx="15" cy="10" r="1.6" fill="#2C211B" />
                <ellipse cx="12" cy="14" rx="2.4" ry="1.4" fill="#2C211B" />
              </svg>
            </div>

            {/* Wordmark */}
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                fontWeight: 900,
                fontFamily: "Grandstander, Outfit, sans-serif",
                color: isEmergency ? "#991B1B" : "#241912",
                lineHeight: "1",
              }}
            >
              <span>Pup</span>
              <span style={{ color: isEmergency ? "#DC2626" : "#8B5E3C" }}>Lume</span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2.2px",
                color: isEmergency ? "#B91C1C" : "#8C7A6D",
                marginLeft: "12px",
              }}
            >
              <span>
                {isEmergency ? "EMERGENCY MISSING PET ALERT" : "DIGITAL PET PASSPORT"}
              </span>
            </div>
          </div>

          {/* Top Right Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: isEmergency ? "#FEE2E2" : "#EBE1D5",
              border: isEmergency ? "1.5px solid #EF4444" : "1px solid #DFD4C6",
              padding: "7px 18px",
              borderRadius: "16px",
              fontSize: "11px",
              fontWeight: 800,
              color: isEmergency ? "#B91C1C" : "#241912",
              letterSpacing: "0.8px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isEmergency ? "#EF4444" : "#087E61",
              }}
            />
            <span>{isEmergency ? "MISSING PET REPORTED" : "SMART COLLAR LIVE"}</span>
          </div>
        </div>

        {/* Master Passport Card (1080 x 498 px) */}
        <div
          style={{
            display: "flex",
            width: "1080px",
            height: "498px",
            backgroundColor: "#FFFFFF",
            borderRadius: "30px",
            border: isEmergency ? "3.5px solid #EF4444" : "1.5px solid #EAE2D8",
            boxShadow: "0 22px 35px rgba(58, 40, 24, 0.08)",
            padding: "28px",
            gap: "36px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Hero Photo (396 x 442 px) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "396px",
              height: "442px",
              borderRadius: "26px",
              overflow: "hidden",
              border: isEmergency ? "3px solid #EF4444" : "2px solid #FFFFFF",
              backgroundColor: "#EFE8DE",
              boxShadow: "0 8px 16px rgba(44, 33, 27, 0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Inset Verified Badge (Bottom Left) */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(28, 20, 14, 0.92)",
                borderRadius: "22px",
                padding: "8px 16px 8px 10px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: isEmergency ? "#EF4444" : "#087E61",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "0.5px",
                    lineHeight: "1.1",
                  }}
                >
                  <span>{isEmergency ? "LOST CANINE ALERT" : "VERIFIED CANINE"}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: isEmergency ? "#FCA5A5" : "#A7F3D0",
                    letterSpacing: "1px",
                  }}
                >
                  <span>PUPLUME SMART COLLAR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Passport Dossier */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              height: "100%",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            {/* Passport Header Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9C897A",
                    letterSpacing: "1.8px",
                  }}
                >
                  OFFICIAL PASSPORT
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: isEmergency ? "#B91C1C" : "#8B5E3C",
                    letterSpacing: "1px",
                  }}
                >
                  {`// NO. ${microchip}`}
                </span>
              </div>

              {/* Tactile NFC Symbol */}
              <div
                style={{
                  display: "flex",
                  width: "42px",
                  height: "28px",
                  borderRadius: "7px",
                  backgroundColor: "#FDF7EE",
                  border: "1.2px solid #DAC1A4",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8B5E3C",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="6" y1="12" x2="18" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="18" />
                </svg>
              </div>
            </div>

            {/* Bold Pet Name Block (Architectural Outfit-Black) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "74px",
                  fontWeight: 900,
                  color: isEmergency ? "#991B1B" : "#1C140E",
                  letterSpacing: "-1.8px",
                  lineHeight: "1.0",
                  marginBottom: "8px",
                }}
              >
                <span>{name}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#6A5A4D",
                }}
              >
                <span>{subtitleText}</span>
              </div>
            </div>

            {/* 3 Status Highlights Pills */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "18px",
                  backgroundColor: "#F0FDF4",
                  border: "1.2px solid #DCFCE7",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#15803D",
                }}
              >
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#16A34A" }} />
                <span>Active Collar Tag</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "18px",
                  backgroundColor: "#FEF3C7",
                  border: "1.2px solid #FDE68A",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#B45309",
                }}
              >
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#D97706" }} />
                <span>Fully Vaccinated</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "18px",
                  backgroundColor: isEmergency ? "#FEF2F2" : "#F0F9FF",
                  border: isEmergency ? "1.2px solid #FECACA" : "1.2px solid #E0F2FE",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: isEmergency ? "#B91C1C" : "#0369A1",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: isEmergency ? "#DC2626" : "#0284C7",
                  }}
                />
                <span>{isEmergency ? "Emergency Active" : "Emergency Ready"}</span>
              </div>
            </div>

            {/* Divider Line */}
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "1.2px",
                backgroundColor: "#EFE6DC",
              }}
            />

            {/* 2-Column Swiss Specs Grid */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Col 1: Microchip */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#9C897A",
                    letterSpacing: "1.5px",
                    marginBottom: "4px",
                  }}
                >
                  MICROCHIP ID
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#241912",
                  }}
                >
                  {microchip}
                </span>
              </div>

              {/* Col 2: Care & Temperament */}
              <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#9C897A",
                    letterSpacing: "1.5px",
                    marginBottom: "4px",
                  }}
                >
                  CARE & TEMPERAMENT
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#241912",
                  }}
                >
                  {temperament}
                </span>
              </div>
            </div>

            {/* Bottom Integrated Scan Collar Banner with REAL SCANNABLE QR */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isEmergency ? "#FEF2F2" : "#FAF6F0",
                border: isEmergency ? "1.5px solid #F87171" : "1.2px solid #EDE4D8",
                borderRadius: "22px",
                padding: "10px 18px",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Real Scannable QR Code Badge */}
                <div
                  style={{
                    display: "flex",
                    width: "70px",
                    height: "70px",
                    borderRadius: "14px",
                    backgroundColor: "#FFFFFF",
                    border: isEmergency ? "2px solid #FCA5A5" : "1.5px solid #E2D7C8",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    boxShadow: "0 2px 8px rgba(44, 33, 27, 0.08)",
                  }}
                >
                  {qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrDataUrl}
                      alt="Scannable QR Collar Tag"
                      style={{
                        width: "62px",
                        height: "62px",
                        borderRadius: "0px",
                      }}
                    />
                  ) : (
                    <div style={{ display: "flex", fontSize: "10px", fontWeight: "bold" }}>QR</div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: isEmergency ? "#991B1B" : "#1C140E",
                    }}
                  >
                    {isEmergency
                      ? "Scan Tag to Call Owner Immediately"
                      : "Scan Collar Tag to Connect Instantly"}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: isEmergency ? "#B91C1C" : "#756455",
                    }}
                  >
                    {isEmergency && pup.rewardAmount
                      ? `Reward: ${pup.rewardAmount}! Direct access to emergency contacts.`
                      : "Point phone camera to verify pet identity, contacts & medical records"}
                  </span>
                </div>
              </div>

              {/* Padlock Icon */}
              <div style={{ display: "flex", color: "#5F4B3C", opacity: 0.7 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Signature */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: "12px",
            fontWeight: 600,
            color: "#8C7A6D",
          }}
        >
          <span>{`puplume.pet/pup/${slug}`}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Small paws. Big peace of mind.</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#8C7A6D">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontOptions.length > 0 ? fontOptions : undefined,
      headers: edgeHeaders,
    }
  );
}
