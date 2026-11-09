"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Heart,
  Dog,
  Copy,
  Check,
  Stethoscope,
  Share2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import {
  COMMUNICATION_PLATFORMS,
  getPlatformFaviconUrl,
} from "@/lib/communicationPlatforms";

interface PublicPupViewProps {
  puppy: any;
  slug: string;
}

export function PublicPupView({ puppy: activePup, slug }: PublicPupViewProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "locating" | "success" | "error"
  >("idle");

  if (!activePup) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mb-5 border border-amber-200 shadow-xs">
          <Dog className="w-10 h-10 text-amber-700" />
        </div>
        <h1 className="text-2xl font-black text-[#2C211B] mb-2 font-heading">
          Puppy Profile Not Found
        </h1>
        <p className="text-sm text-[#766A63] mb-6 leading-relaxed">
          We couldn&apos;t find an active smart collar tag for &quot;{slug}&quot;. The link might be mistyped or the owner hasn&apos;t published it yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5E3C] hover:bg-[#6D492F] text-white text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Go to PupLume Home
        </Link>
      </div>
    );
  }

  const isEmergency = Boolean(activePup.isLost);

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2500);
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("locating");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationStatus("success");

        const ownerPhone = activePup.ownerPhone || "";
        const pupName = activePup.name || "your puppy";
        const smsMessage = encodeURIComponent(
          `Hi! I found ${pupName}! Here is my current GPS location: ${mapsUrl}`
        );

        if (ownerPhone) {
          window.location.href = `sms:${ownerPhone}?body=${smsMessage}`;
        } else {
          navigator.clipboard.writeText(mapsUrl);
          alert("Location copied to clipboard!");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Calculate age weeks/months
  let ageString = "";
  if (activePup.birthDate) {
    const bDate = new Date(activePup.birthDate);
    const diffWeeks = Math.max(
      1,
      Math.floor((Date.now() - bDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
    );
    if (diffWeeks >= 52) {
      const years = (diffWeeks / 52).toFixed(1);
      ageString = `${years} yrs old`;
    } else {
      ageString = `${diffWeeks} weeks old`;
    }
  }

  const ownerPhoneNumber = activePup.ownerPhone || "";

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2C211B] flex flex-col items-center">
      {/* 
        ====================================================================
        BRANDING LOGIC:
        - When in Emergency Mode: ZERO PupLume branding or upsells.
        - When in Normal Mode: Full PupLume branding + "Get Tag" CTA.
        ====================================================================
      */}

      {/* HEADER SECTION */}
      {isEmergency ? (
        // Emergency Lost Banner (Strictly focused on rescuing the dog)
        <header className="w-full bg-rose-600 text-white px-4 py-3.5 shadow-md">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-white animate-ping" />
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
                MISSING PUPPY ALERT • PLEASE HELP REUNITE
              </span>
            </div>
            {(() => {
              const raw = activePup.rewardAmount?.trim();
              if (!raw) return null;
              const lower = raw.toLowerCase();
              if (lower === "no reward" || lower === "none" || lower === "no_reward") {
                return null;
              }
              const label = lower.includes("reward") ? raw.toUpperCase() : `${raw.toUpperCase()} REWARD`;
              return (
                <span className="px-2.5 py-1 bg-amber-400 text-amber-950 text-xs font-black rounded-lg shrink-0 shadow-xs uppercase">
                  ★ {label}
                </span>
              );
            })()}
          </div>
        </header>
      ) : (
        // Normal Mode: PupLume Brand Header
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#E8DDD3] sticky top-0 z-40">
          <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <PupLumeLogo size="sm" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#8B5E3C] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#E8DDD3]">
                Digital Passport
              </span>
            </Link>

            <Link
              href="/"
              className="text-xs font-bold px-3 py-1.5 bg-[#8B5E3C] hover:bg-[#6D492F] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Get Tag For Your Dog</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </header>
      )}

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-xl px-4 py-6 sm:py-8 space-y-6">
        {/* Puppy Hero Profile Card */}
        <div className="bg-white rounded-3xl border border-[#E8DDD3] p-6 shadow-sm relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={
                activePup.photoUrl ||
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"
              }
              alt={activePup.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-[#8B5E3C] shadow-md"
            />
            {isEmergency && (
              <span className="absolute -top-2 -right-2 px-2.5 py-1 bg-rose-600 text-white text-[10px] font-black rounded-full shadow-md uppercase">
                Lost
              </span>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isEmergency
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-[#FAF6F0] text-[#8B5E3C] border border-[#E8DDD3]"
                }`}
              >
                {isEmergency ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Reported Missing Pet</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified PupLume Smart Tag</span>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#2C211B] tracking-tight font-heading">
              {activePup.name}
            </h1>

            <p className="text-sm text-[#766A63] font-medium">
              {activePup.breed} {ageString && `• ${ageString}`}{" "}
              {activePup.weightLbs ? `• ${activePup.weightLbs} lbs` : ""}
            </p>

            {activePup.temperament && (
              <div className="inline-block bg-[#FFF9F2] border border-[#E8DDD3] px-3 py-1 rounded-xl text-xs font-medium text-[#5F3E29]">
                ✨ {activePup.temperament}
              </div>
            )}
          </div>
        </div>

        {/* Action Hero: Quick Call & SMS Location Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ownerPhoneNumber ? (
            <a
              href={`tel:${ownerPhoneNumber}`}
              className={`p-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-md transition-transform active:scale-[0.98] ${
                isEmergency
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span>Call Owner ({ownerPhoneNumber})</span>
            </a>
          ) : (
            <div className="p-4 rounded-2xl bg-gray-100 text-gray-500 font-bold text-sm text-center">
              No owner phone on record
            </div>
          )}

          <button
            onClick={handleShareLocation}
            disabled={locationStatus === "locating"}
            className="p-4 rounded-2xl bg-white hover:bg-[#FAF6F0] text-[#8B5E3C] border-2 border-[#8B5E3C] font-black text-sm flex items-center justify-center gap-2.5 shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
            <span>
              {locationStatus === "locating"
                ? "Locating GPS..."
                : locationStatus === "success"
                ? "Location Sent via SMS!"
                : "Send GPS Location to Owner"}
            </span>
          </button>
        </div>

        {/* Emergency Medical Notes (High Priority if present) */}
        {activePup.emergencyNotes && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Critical Health & Handling Instructions</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {activePup.emergencyNotes}
            </p>
          </div>
        )}

        {/* Owner Contact Information Card */}
        <div className="bg-white rounded-3xl border border-[#E8DDD3] p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#8B5E3C]">
            Family & Contact Channels
          </h3>

          <div className="space-y-3">
            {/* Primary Phone */}
            {ownerPhoneNumber && (
              <div className="flex items-center justify-between p-3.5 bg-[#FAF6F0] rounded-2xl border border-[#E8DDD3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#766A63] block">
                      Primary Contact
                    </span>
                    <a
                      href={`tel:${ownerPhoneNumber}`}
                      className="text-sm font-black text-[#2C211B] hover:underline"
                    >
                      {ownerPhoneNumber}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyText(ownerPhoneNumber, "ownerPhone")}
                  className="p-2 rounded-xl bg-white border border-[#E8DDD3] text-[#766A63] hover:text-[#2C211B] cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedField === "ownerPhone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {/* Alternate Emergency Contact */}
            {activePup.emergencyContactPhone && (
              <div className="flex items-center justify-between p-3.5 bg-[#FAF6F0] rounded-2xl border border-[#E8DDD3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#766A63] block">
                      Backup Contact ({activePup.emergencyContactName || "Family"})
                    </span>
                    <a
                      href={`tel:${activePup.emergencyContactPhone}`}
                      className="text-sm font-black text-[#2C211B] hover:underline"
                    >
                      {activePup.emergencyContactPhone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCopyText(activePup.emergencyContactPhone, "backupPhone")
                  }
                  className="p-2 rounded-xl bg-white border border-[#E8DDD3] text-[#766A63] hover:text-[#2C211B] cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedField === "backupPhone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Social / Direct Messaging Platform Links */}
          {activePup.communicationLinks && activePup.communicationLinks.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-[#766A63] block mb-2.5">
                Direct Messaging Channels:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePup.communicationLinks.map((link: any, idx: number) => {
                  const platformDef = COMMUNICATION_PLATFORMS.find(
                    (p) => p.id === link.platformId
                  );
                  const href = platformDef?.buildUrl
                    ? platformDef.buildUrl(link.value)
                    : link.value;

                  return (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDD3] bg-[#FAF6F0] hover:bg-[#F3E7DA] text-xs font-bold text-[#2C211B] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#8B5E3C]" />
                      <span>{platformDef?.name || link.platformId}</span>
                      <ExternalLink className="w-3 h-3 text-[#766A63]" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Microchip & Vet Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Microchip Card */}
          <div className="bg-white rounded-2xl border border-[#E8DDD3] p-4 shadow-2xs space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Microchip ID
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-[#2C211B] font-mono">
                {activePup.microchipNumber || "Not Listed"}
              </span>
              {activePup.microchipNumber && (
                <button
                  onClick={() =>
                    handleCopyText(activePup.microchipNumber, "microchip")
                  }
                  className="p-1 text-[#766A63] hover:text-[#2C211B] cursor-pointer"
                >
                  {copiedField === "microchip" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <p className="text-[10px] text-[#766A63]">
              Scannable by veterinarians & animal shelters nationwide.
            </p>
          </div>

          {/* Primary Vet Clinic */}
          <div className="bg-white rounded-2xl border border-[#E8DDD3] p-4 shadow-2xs space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" /> Primary Vet Clinic
            </span>
            <h4 className="text-xs font-bold text-[#2C211B]">
              {activePup.vetClinic || "Local Emergency Animal Hospital"}
            </h4>
            {activePup.vetPhone ? (
              <a
                href={`tel:${activePup.vetPhone}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8B5E3C] hover:underline"
              >
                <Phone className="w-3 h-3" /> {activePup.vetPhone}
              </a>
            ) : (
              <p className="text-[10px] text-[#766A63]">
                Contact nearest 24/7 emergency clinic if injured.
              </p>
            )}
          </div>

          {/* Allergies & Dietary Restrictions */}
          {(activePup.allergies || activePup.dietaryRestrictions) && (
            <div className="bg-white rounded-2xl border border-[#E8DDD3] p-4 shadow-2xs space-y-1.5 sm:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Allergies & Dietary Restrictions
              </span>
              <p className="text-xs text-[#2C211B] leading-relaxed">
                {activePup.allergies && (
                  <span>
                    <strong>Allergies:</strong> {activePup.allergies}.{" "}
                  </span>
                )}
                {activePup.dietaryRestrictions && (
                  <span>
                    <strong>Diet:</strong> {activePup.dietaryRestrictions}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* 
          ====================================================================
          BRANDING LOGIC - BOTTOM SECTION:
          - If Emergency: Clean emergency notice only (NO marketing up-sell).
          - If Normal: High-converting PupLume promotional showcase!
          ====================================================================
        */}
        {isEmergency ? (
          // Emergency Solemn Notice (No marketing distractions)
          <div className="pt-6 pb-12 text-center border-t border-[#E8DDD3] space-y-2">
            <p className="text-xs font-bold text-[#766A63]">
              Official Pet Emergency Tag
            </p>
            <p className="text-[11px] text-[#A69B95] max-w-sm mx-auto leading-relaxed">
              If you have found {activePup.name}, please contact the owner or emergency numbers above right away. Thank you for your kindness!
            </p>
          </div>
        ) : (
          // Normal Mode: High-Converting PupLume Viral Marketing Card
          <div className="space-y-6 pt-4">
            <div className="bg-gradient-to-br from-[#FFF9F2] to-white rounded-3xl border-2 border-[#8B5E3C]/30 p-6 sm:p-8 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E8DDD3] text-[#8B5E3C] flex items-center justify-center mx-auto text-2xl shadow-2xs">
                🐾
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#2C211B] font-heading">
                  Loved meeting {activePup.name}?
                </h3>
                <p className="text-xs sm:text-sm text-[#766A63] max-w-md mx-auto leading-relaxed">
                  Give your puppy their own verified digital pet passport, smart collar safety tag, and intelligent AI care routines.
                </p>
              </div>

              {/* Feature Pill Highlights */}
              <div className="flex flex-wrap justify-center gap-2 pt-1 pb-2">
                <span className="text-[11px] font-bold text-[#8B5E3C] bg-white px-3 py-1 rounded-full border border-[#E8DDD3] shadow-2xs">
                  ✓ 24/7 Lost Pet Recovery
                </span>
                <span className="text-[11px] font-bold text-[#8B5E3C] bg-white px-3 py-1 rounded-full border border-[#E8DDD3] shadow-2xs">
                  ✓ Smart Potty & Meal Schedule
                </span>
                <span className="text-[11px] font-bold text-[#8B5E3C] bg-white px-3 py-1 rounded-full border border-[#E8DDD3] shadow-2xs">
                  ✓ AI Training Academy
                </span>
              </div>

              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8B5E3C] hover:bg-[#6D492F] text-white text-sm font-black rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Create a Free Tag for Your Puppy</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Standard PupLume Footer */}
            <footer className="pt-4 pb-12 text-center space-y-2 border-t border-[#E8DDD3]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#766A63]">
                <Dog className="w-4 h-4 text-[#8B5E3C]" />
                <span>Powered by PupLume Smart Collar Network</span>
              </div>
              <p className="text-[11px] text-[#A69B95] max-w-sm mx-auto">
                Intelligent digital pet care, health tracking, and smart safety tags for dogs everywhere.
              </p>
              <div className="pt-2 flex items-center justify-center gap-4 text-xs font-bold text-[#8B5E3C]">
                <Link href="/" className="hover:underline">Home</Link>
                <span>•</span>
                <Link href="/features" className="hover:underline">Features</Link>
                <span>•</span>
                <Link href="/pricing" className="hover:underline">Pricing</Link>
                <span>•</span>
                <Link href="/legal/privacy" className="hover:underline">Privacy</Link>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
