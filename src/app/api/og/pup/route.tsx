import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

async function getPublicPuppy(slug: string) {
  try {
    const convexUrl =
      process.env.VITE_CONVEX_URL ||
      process.env.NEXT_PUBLIC_CONVEX_URL ||
      "https://energetic-partridge-407.convex.cloud";

    const res = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "puppies:getPublicPuppyByTag",
        args: { identifier: slug.toLowerCase().trim() },
      }),
      next: { revalidate: 30 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.status === "success" && data.value) {
      return data.value;
    }
  } catch (err) {
    console.error("Error fetching puppy in OG generator:", err);
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "";

    const pup = slug ? await getPublicPuppy(slug) : null;

    if (!pup) {
      // Return clean "Not Found" card
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
              backgroundColor: "#FFF9F2",
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
                  fontWeight: "bold",
                  color: "#2C211B",
                  marginBottom: "20px",
                }}
              >
                🐾 Pup<span style={{ color: "#8B5E3C" }}>Lume</span>
              </div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "900",
                  color: "#2C211B",
                  marginBottom: "12px",
                }}
              >
                Puppy Passport Not Found
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "#6B5E55",
                  marginBottom: "24px",
                }}
              >
                No active collar tag registered for &quot;{slug || "this pup"}&quot;.
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#8B5E3C",
                }}
              >
                puplume.pet • Smart Dog Passport &amp; Routine Care
              </div>
            </div>
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const isEmergency = Boolean(pup.isLost);
    const name = pup.name || "Puppy";
    const breed = pup.breed || "Puppy";
    const weight = pup.weightLbs ? `${pup.weightLbs} lbs` : "";
    const temperament = pup.temperament || "Playful, affectionate & loyal";
    const microchip = pup.microchipNumber || `PL-${(pup._id || "TAG").slice(-6).toUpperCase()}`;
    const photoUrl = pup.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";

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
            backgroundColor: isEmergency ? "#FEF2F2" : "#FFF9F2",
            padding: "36px 50px",
          }}
        >
          {/* Main Card Container */}
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              borderRadius: "32px",
              border: isEmergency ? "3px solid #EF4444" : "2px solid #E8DDD3",
              boxShadow: "0 20px 45px rgba(44, 33, 27, 0.08)",
              padding: "32px 40px",
              position: "relative",
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "18px",
                borderBottom: "1.5px solid #F3E7DA",
                marginBottom: "24px",
              }}
            >
              {/* Logo + Tagline */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: "#8B5E3C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "24px",
                  }}
                >
                  🐶
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "900",
                      color: "#2C211B",
                      lineHeight: "1",
                    }}
                  >
                    Pup<span style={{ color: "#8B5E3C" }}>Lume</span>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "2.5px",
                      color: "#8C7A6D",
                      marginTop: "3px",
                    }}
                  >
                    {isEmergency ? "EMERGENCY SAFETY ALERT" : "DIGITAL PET PASSPORT"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: isEmergency ? "#FEE2E2" : "#F4EBE1",
                  border: isEmergency ? "1.5px solid #EF4444" : "1.5px solid #D8C3B0",
                  padding: "8px 18px",
                  borderRadius: "24px",
                  fontSize: "14px",
                  fontWeight: "800",
                  color: isEmergency ? "#B91C1C" : "#5F3E29",
                  letterSpacing: "1px",
                }}
              >
                <span>{isEmergency ? "🚨" : "●"}</span>
                <span>{isEmergency ? "MISSING PET REPORTED" : "SMART COLLAR LIVE"}</span>
              </div>
            </div>

            {/* Body Row (Left: Photo, Right: Passport Details) */}
            <div
              style={{
                display: "flex",
                flex: "1",
                gap: "36px",
                alignItems: "center",
              }}
            >
              {/* Left Column: Photo */}
              <div
                style={{
                  position: "relative",
                  width: "270px",
                  height: "270px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "flex",
                  border: isEmergency ? "3px solid #EF4444" : "2px solid #E8DDD3",
                  backgroundColor: "#F7EFE6",
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
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    right: "12px",
                    backgroundColor: "rgba(44, 33, 27, 0.88)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "12px",
                    padding: "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span style={{ color: "#34D399" }}>✓</span>
                  <span>VERIFIED CANINE TAG</span>
                </div>
              </div>

              {/* Right Column: Passport Info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1",
                  justifyContent: "center",
                }}
              >
                {/* Passport ID */}
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "1.5px",
                    color: isEmergency ? "#B91C1C" : "#8C7A6D",
                    marginBottom: "4px",
                  }}
                >
                  OFFICIAL PASSPORT // NO. {microchip}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: "56px",
                    fontWeight: "900",
                    color: isEmergency ? "#991B1B" : "#2C211B",
                    lineHeight: "1.05",
                    marginBottom: "6px",
                  }}
                >
                  {name}
                </div>

                {/* Breed & Stats */}
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#6B5E55",
                    marginBottom: "16px",
                  }}
                >
                  {breed} {weight ? `• ${weight}` : ""} {pup.sex ? `• ${pup.sex}` : ""}
                </div>

                {/* Badges Pill Row */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      backgroundColor: "#ECFDF5",
                      border: "1px solid #A7F3D0",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#065F46",
                    }}
                  >
                    <span>●</span> Active Collar Tag
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      backgroundColor: "#FFFBEB",
                      border: "1px solid #FDE68A",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#92400E",
                    }}
                  >
                    <span>●</span> Fully Vaccinated
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      backgroundColor: isEmergency ? "#FEF2F2" : "#EFF6FF",
                      border: isEmergency ? "1px solid #FECACA" : "1px solid #BFDBFE",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: isEmergency ? "#991B1B" : "#1E40AF",
                    }}
                  >
                    <span>●</span> {isEmergency ? "Emergency Active" : "Emergency Ready"}
                  </div>
                </div>

                {/* Bottom Callout / Scan Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    backgroundColor: isEmergency ? "#FEF2F2" : "#FAF6F0",
                    border: isEmergency ? "1.5px solid #F87171" : "1px solid #E8DDD3",
                    borderRadius: "18px",
                    padding: "12px 18px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E8DDD3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    {isEmergency ? "🚨" : "🏷️"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        color: isEmergency ? "#991B1B" : "#2C211B",
                      }}
                    >
                      {isEmergency
                        ? "Scan Tag or Open Link to Call Owner Immediately"
                        : "Scan Collar Tag to Connect Instantly"}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#766A63",
                      }}
                    >
                      {isEmergency && pup.rewardAmount
                        ? `Reward: ${pup.rewardAmount}! Direct access to emergency phone & vet.`
                        : `Temperament: ${temperament}`}
                    </div>
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
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #F3E7DA",
                fontSize: "12px",
                fontWeight: "700",
                color: "#8C7A6D",
              }}
            >
              <div>puplume.pet/pup/{slug}</div>
              <div>Small paws. Big peace of mind. ♡</div>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err: any) {
    console.error("OG Route Error:", err);
    return new Response(`Failed to generate OG image: ${err?.message}`, { status: 500 });
  }
}
