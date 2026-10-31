'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && (posthog as any).__loaded) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + '?' + searchParams.toString();
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_ph5K7sEtEe7ma5owE6AdhcKR4TdBwqSjM94ddi6Pcrhx';
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    const initPostHog = () => {
      if ((posthog as any).__loaded) return;
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: false,
        capture_dead_clicks: false,
        disable_surveys: true,
        disable_session_recording: true,
      });
    };

    // Defer initialization to user interaction or late idle to ensure 0 main-thread blocking
    const triggerEvents = ['pointerdown', 'scroll', 'keydown'];
    const onUserInteraction = () => {
      triggerEvents.forEach(evt => window.removeEventListener(evt, onUserInteraction));
      initPostHog();
    };
    triggerEvents.forEach(evt => window.addEventListener(evt, onUserInteraction, { once: true, passive: true }));

    const timer = setTimeout(initPostHog, 4000);
    return () => {
      clearTimeout(timer);
      triggerEvents.forEach(evt => window.removeEventListener(evt, onUserInteraction));
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
