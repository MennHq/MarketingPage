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
                <span>Pup</span>
                <span style={{ color: "#8B5E3C" }}>Lume</span>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "44px",
                  fontWeight: "900",
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
                  color: "#6B5E55",
                  marginBottom: "24px",
                }}
              >
                <span>No active collar tag registered for this puppy.</span>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#8B5E3C",
                }}
              >
                <span>puplume.pet - Smart Dog Passport and Care Routine</span>
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
    const temperament = pup.temperament || "Playful, affectionate and loyal";
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
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" fill="#FFF9F2" />
                    <circle cx="9" cy="10" r="1.5" fill="#2C211B" />
                    <circle cx="15" cy="10" r="1.5" fill="#2C211B" />
                    <ellipse cx="12" cy="14" rx="2.5" ry="1.5" fill="#2C211B" />
                  </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "28px",
                      fontWeight: "900",
                      color: "#2C211B",
                      lineHeight: "1",
                    }}
                  >
                    <span>Pup</span>
                    <span style={{ color: "#8B5E3C" }}>Lume</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "2.5px",
                      color: "#8C7A6D",
                      marginTop: "3px",
                    }}
                  >
                    <span>{isEmergency ? "EMERGENCY MISSING PET ALERT" : "OFFICIAL DIGITAL PET PASSPORT"}</span>
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
                  fontSize: "13px",
                  fontWeight: "800",
                  color: isEmergency ? "#B91C1C" : "#5F3E29",
                  letterSpacing: "1px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isEmergency ? "#EF4444" : "#10B981",
                  }}
                />
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
                    backgroundColor: "rgba(44, 33, 27, 0.90)",
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
                    display: "flex",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "1.5px",
                    color: isEmergency ? "#B91C1C" : "#8C7A6D",
                    marginBottom: "4px",
                  }}
                >
                  <span>{`OFFICIAL PASSPORT // NO. ${microchip}`}</span>
                </div>

                {/* Name */}
                <div
                  style={{
                    display: "flex",
                    fontSize: "56px",
                    fontWeight: "900",
                    color: isEmergency ? "#991B1B" : "#2C211B",
                    lineHeight: "1.05",
                    marginBottom: "6px",
                  }}
                >
                  <span>{name}</span>
                </div>

                {/* Breed and Stats */}
                <div
                  style={{
                    display: "flex",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#6B5E55",
                    marginBottom: "16px",
                  }}
                >
                  <span>{`${breed}${weight ? ' - ' + weight : ''}${pup.sex ? ' - ' + pup.sex : ''}`}</span>
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
                    <div style={{ display: "flex", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#059669" }} />
                    <span>Active Collar Tag</span>
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
                    <div style={{ display: "flex", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#D97706" }} />
                    <span>Fully Vaccinated</span>
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
                    <div style={{ display: "flex", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: isEmergency ? "#DC2626" : "#2563EB" }} />
                    <span>{isEmergency ? "Emergency Active" : "Emergency Ready"}</span>
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
                      color: "#8B5E3C",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "14px",
                        fontWeight: "800",
                        color: isEmergency ? "#991B1B" : "#2C211B",
                      }}
                    >
                      <span>
                        {isEmergency
                          ? "Scan Tag or Open Link to Call Owner Immediately"
                          : "Scan Collar Tag to Connect Instantly"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "12px",
                        color: "#766A63",
                      }}
                    >
                      <span>
                        {isEmergency && pup.rewardAmount
                          ? `Reward: ${pup.rewardAmount}! Direct access to emergency phone and vet.`
                          : `Temperament: ${temperament}`}
                      </span>
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
              <span style={{ display: "flex" }}>puplume.pet/pup/{slug}</span>
              <span style={{ display: "flex" }}>Small paws. Big peace of mind.</span>
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
