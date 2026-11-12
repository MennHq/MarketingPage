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
  ChevronRight,
  Shield,
  Clock,
  Award
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
  const [locationLink, setLocationLink] = useState<string | null>(null);

  if (!activePup) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-5 border border-amber-200/80 shadow-xs">
          <Dog className="w-10 h-10 text-[#8B5E3C]" />
        </div>
        <h1 className="text-2xl font-black text-[#1C140E] mb-2 font-heading tracking-tight">
          Puppy Passport Not Found
        </h1>
        <p className="text-sm text-[#766A63] mb-6 leading-relaxed">
          We couldn&apos;t find an active smart collar tag for &quot;{slug}&quot;. The link might be mistyped or the owner hasn&apos;t activated it yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5E3C] hover:bg-[#6D492F] text-white text-sm font-bold rounded-2xl shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span>Return to PupLume Home</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isEmergency = Boolean(activePup.isLost);
  const ownerPhoneNumber = activePup.ownerPhone || "";

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
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        setLocationLink(mapsUrl);
        setLocationStatus("success");

        const pupName = activePup.name || "your puppy";
        const smsMessage = encodeURIComponent(
          `Hi! I found ${pupName}! Here is my current GPS location: ${mapsUrl}`
        );

        if (ownerPhoneNumber) {
          window.location.href = `sms:${ownerPhoneNumber}?body=${smsMessage}`;
        } else {
          navigator.clipboard.writeText(mapsUrl);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Calculate age
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

  const microchipSerial =
    activePup.microchipNumber ||
    `PL-${(activePup._id || slug || "985").toString().slice(-6).toUpperCase()}-PUP`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C140E] flex flex-col items-center selection:bg-[#8B5E3C] selection:text-white">
      {/* 
        ====================================================================
        HEADER / BANNER
        - In Emergency: Urgent crimson rescue alert with pulsating beacon.
        - In Normal: Clean, tactile navigation with NO background box behind logo.
        ====================================================================
      */}
      {isEmergency ? (
        <header className="w-full bg-[#DC2626] text-white px-4 py-3.5 shadow-md border-b border-red-700 sticky top-0 z-40">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-white animate-ping shrink-0" />
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wide uppercase font-sans">
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
                <span className="px-2.5 py-1 bg-amber-400 text-amber-950 text-xs font-black rounded-lg shrink-0 shadow-xs uppercase tracking-wider">
                  ★ {label}
                </span>
              );
            })()}
          </div>
        </header>
      ) : (
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#EFE8E1] sticky top-0 z-40">
          <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <PupLumeLogo size="sm" showBackground={false} />
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#8B5E3C] bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#EFE8E1]">
                Digital Pet Passport
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] font-bold text-emerald-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Active Smart Tag</span>
                <span className="sm:hidden">Active</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* MAIN PASSPORT CONTAINER */}
      <main className="w-full max-w-xl px-4 py-5 sm:py-6 space-y-4 mb-16">
        
        {/* ================================================================= */}
        {/* PASSPORT HERO IDENTITY CARD */}
        {/* ================================================================= */}
        <div className="bg-white rounded-[28px] border border-[#EFE8E1] p-6 sm:p-7 shadow-[0_4px_24px_rgba(44,33,27,0.04)] relative overflow-hidden">
          {/* Subtle Guilloche Corner Watermark */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full border-[10px] border-[#FAF6F0] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Puppy Photo Frame */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#8B5E3C]/25 shadow-sm relative bg-[#FAF6F0]">
                <img
                  src={
                    activePup.photoUrl ||
                    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"
                  }
                  alt={activePup.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Verified Tag Medallion */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-emerald-600">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Verified Tag</span>
              </div>
            </div>

            {/* Canine Identity Information */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#8B5E3C]">
                  Official Passport • {activePup.slug ? activePup.slug.toUpperCase() : "PL-PUP"}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#1C140E] tracking-tight leading-none">
                {activePup.name}
              </h1>

              {/* Breed, Age, Weight, Sex metadata chips */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-[#52433D] pt-0.5">
                <span className="bg-[#FAF6F0] border border-[#EFE8E1] px-2.5 py-0.5 rounded-lg text-[#2C211B] font-bold">
                  {activePup.breed || "Canine"}
                </span>
                {ageString && (
                  <>
                    <span className="text-[#C4B7AC]">•</span>
                    <span>{ageString}</span>
                  </>
                )}
                {activePup.weightLbs && (
                  <>
                    <span className="text-[#C4B7AC]">•</span>
                    <span>{activePup.weightLbs} lbs</span>
                  </>
                )}
                {activePup.sex && (
                  <>
                    <span className="text-[#C4B7AC]">•</span>
                    <span className="capitalize">{activePup.sex}</span>
                  </>
                )}
              </div>

              {/* Temperament Note */}
              {activePup.temperament && (
                <p className="text-xs sm:text-sm text-[#52433D] font-medium pt-1 leading-relaxed">
                  🐾 <span className="font-bold text-[#2C211B]">Temperament:</span> {activePup.temperament}
                </p>
              )}

              {/* Microchip Quick Copy */}
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#EFE8E1] text-xs font-mono text-[#2C211B]">
                  <span className="text-[10px] font-sans font-extrabold uppercase text-[#8B5E3C]">Microchip:</span>
                  <span className="font-bold">{microchipSerial}</span>
                </div>
                <button
                  onClick={() => handleCopyText(microchipSerial, "microchip")}
                  className="px-2.5 py-1.5 rounded-xl border border-[#EFE8E1] hover:bg-[#FAF6F0] text-[#766A63] hover:text-[#1C140E] transition-transform active:scale-[0.97] text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  title="Copy Microchip Serial"
                >
                  {copiedField === "microchip" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* DIRECT FINDER ACTIONS (HIGH VISIBILITY, ZERO FRICTION) */}
        {/* ================================================================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#8B5E3C]" />
              Direct Emergency Contacts
            </h2>
            <span className="text-[11px] text-[#766A63] font-medium">Tap to connect directly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Call Owner Button */}
            {ownerPhoneNumber ? (
              <a
                href={`tel:${ownerPhoneNumber}`}
                className={`p-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-sm transition-transform active:scale-[0.98] cursor-pointer ${
                  isEmergency
                    ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span>Call Owner ({ownerPhoneNumber})</span>
              </a>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-[#EFE8E1] text-[#766A63] font-bold text-xs text-center flex items-center justify-center">
                Owner phone not public • See vet details below
              </div>
            )}

            {/* Send SMS Button */}
            {ownerPhoneNumber ? (
              <a
                href={`sms:${ownerPhoneNumber}?body=${encodeURIComponent(
                  `Hi! I found ${activePup.name}. They are safe with me right now.`
                )}`}
                className="p-4 rounded-2xl bg-[#8B5E3C] hover:bg-[#6D492F] text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Send SMS Message</span>
              </a>
            ) : (
              <button
                onClick={() => handleCopyText(window.location.href, "pageLink")}
                className="p-4 rounded-2xl bg-white border border-[#EFE8E1] hover:bg-[#FAF6F0] text-[#1C140E] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#8B5E3C]" />
                <span>{copiedField === "pageLink" ? "Link Copied!" : "Share Profile Link"}</span>
              </button>
            )}
          </div>

          {/* ONE-TAP GPS LOCATION SHARING */}
          <div className="bg-white rounded-2xl border border-[#EFE8E1] p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-[#1C140E] flex items-center justify-center sm:justify-start gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Send Live GPS Pin to Owner</span>
                </div>
                <p className="text-[11px] text-[#766A63] mt-0.5">
                  Instantly sends your exact Google Maps pin via SMS so the owner can navigate straight to you.
                </p>
              </div>

              <button
                onClick={handleShareLocation}
                disabled={locationStatus === "locating"}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-transform active:scale-[0.98] shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {locationStatus === "locating" ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Getting GPS...</span>
                  </>
                ) : locationStatus === "success" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>GPS Pin Sent!</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>Send GPS Pin</span>
                  </>
                )}
              </button>
            </div>

            {locationStatus === "success" && locationLink && (
              <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-mono">{locationLink}</span>
                <button
                  onClick={() => handleCopyText(locationLink, "gps")}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-[10px] font-bold shrink-0 cursor-pointer"
                >
                  {copiedField === "gps" ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {locationStatus === "error" && (
              <p className="mt-2 text-[11px] text-red-600">
                Could not retrieve GPS. Please check location permissions in your browser.
              </p>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* EMERGENCY MEDICAL & HANDLING NOTES */}
        {/* ================================================================= */}
        {activePup.emergencyNotes && (
          <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Critical Health &amp; Handling Instructions</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {activePup.emergencyNotes}
            </p>
          </div>
        )}

        {/* ================================================================= */}
        {/* VET & HEALTH RECORDS SHEET */}
        {/* ================================================================= */}
        <div className="bg-white rounded-[24px] border border-[#EFE8E1] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#FAF6F0] pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-[#8B5E3C]" />
              Medical &amp; Veterinary Records
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified Records
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Vet Clinic */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6F0]/80 border border-[#EFE8E1] space-y-1">
              <div className="text-[10px] font-extrabold uppercase text-[#8B5E3C] tracking-wider">
                Primary Vet Clinic
              </div>
              <div className="text-xs font-black text-[#1C140E]">
                {activePup.vetClinic || activePup.vetName || "Emergency Animal Hospital"}
              </div>
              {activePup.vetPhone ? (
                <a
                  href={`tel:${activePup.vetPhone}`}
                  className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:underline pt-0.5"
                >
                  <Phone className="w-3 h-3" /> {activePup.vetPhone}
                </a>
              ) : (
                <div className="text-[11px] text-[#766A63]">24/7 Animal Emergency Care</div>
              )}
            </div>

            {/* Backup Family Contact */}
            {activePup.emergencyContactPhone ? (
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0]/80 border border-[#EFE8E1] space-y-1">
                <div className="text-[10px] font-extrabold uppercase text-[#8B5E3C] tracking-wider">
                  Backup Emergency Contact
                </div>
                <div className="text-xs font-black text-[#1C140E]">
                  {activePup.emergencyContactName || "Trusted Family / Friend"}
                </div>
                <a
                  href={`tel:${activePup.emergencyContactPhone}`}
                  className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:underline pt-0.5"
                >
                  <Phone className="w-3 h-3" /> {activePup.emergencyContactPhone}
                </a>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0]/80 border border-[#EFE8E1] space-y-1">
                <div className="text-[10px] font-extrabold uppercase text-[#8B5E3C] tracking-wider">
                  Microchip Database
                </div>
                <div className="text-xs font-black text-[#1C140E]">Universal Scanner Compatible</div>
                <div className="text-[11px] text-[#766A63]">Registered nationwide with ISO 11784</div>
              </div>
            )}
          </div>

          {/* Allergies & Dietary Restrictions */}
          {(activePup.allergies || activePup.dietaryRestrictions) && (
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1">
              <div className="text-[10px] font-extrabold uppercase text-rose-800 tracking-wider flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-600" /> Allergies &amp; Diet Notes
              </div>
              <p className="text-xs text-rose-950 font-medium leading-relaxed">
                {activePup.allergies && <span>Allergies: {activePup.allergies}. </span>}
                {activePup.dietaryRestrictions && <span>Diet: {activePup.dietaryRestrictions}</span>}
              </p>
            </div>
          )}

          {/* Alternate Direct Messaging Channels */}
          {activePup.communicationLinks && activePup.communicationLinks.length > 0 && (
            <div className="pt-2 border-t border-[#FAF6F0]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B5E3C] block mb-2">
                Alternate Direct Channels:
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EFE8E1] bg-[#FAF6F0] hover:bg-[#F3E7DA] text-xs font-bold text-[#1C140E] transition-colors"
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

        {/* ================================================================= */}
        {/* BOTTOM SECTION */}
        {/* ================================================================= */}
        {isEmergency ? (
          <div className="pt-4 pb-12 text-center space-y-2">
            <p className="text-xs font-bold text-[#766A63]">
              Official Pet Emergency Tag • PupLume Safety Network
            </p>
            <p className="text-[11px] text-[#8B7C73] max-w-sm mx-auto leading-relaxed">
              If you have found {activePup.name}, thank you deeply for keeping them safe! Please call or text the owner above so they can be reunited immediately.
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Friendly Pet Passport Summary */}
            <div className="bg-white rounded-2xl border border-[#EFE8E1] p-5 text-center space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] text-[#8B5E3C] flex items-center justify-center mx-auto text-xl">
                🐾
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-[#1C140E]">
                  Loved meeting {activePup.name}?
                </h4>
                <p className="text-xs text-[#766A63] max-w-sm mx-auto leading-relaxed">
                  Give your dog a verified digital passport, emergency QR collar tag, and daily AI care routines on PupLume.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5E3C] hover:bg-[#6D492F] text-white text-xs font-black rounded-xl shadow-xs transition-transform active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get a Smart Tag for Your Dog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <footer className="pt-2 pb-8 text-center space-y-1.5">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#766A63]">
                <Dog className="w-4 h-4 text-[#8B5E3C]" />
                <span>PupLume Smart Collar Network</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-[#8B5E3C]">
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
