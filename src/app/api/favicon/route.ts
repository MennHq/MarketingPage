import { NextRequest, NextResponse } from "next/server";
import { getFaviconCandidates, extractHostname, BRAND_FAVICONS, matchBrandKey } from "@/lib/faviconExtractor";

export const dynamic = "force-dynamic";

/**
 * API route to 100% extract and proxy/redirect to real favicons.
 * GET /api/favicon?url=https://example.com or ?domain=example.com
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url") || searchParams.get("domain") || "";

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  const hostname = extractHostname(targetUrl);
  if (!hostname) {
    return new NextResponse("Invalid hostname", { status: 400 });
  }

  // 1. Check known brand icons (Return SVG directly)
  const brandKey = matchBrandKey(hostname);
  if (brandKey && BRAND_FAVICONS[brandKey]) {
    const dataUri = BRAND_FAVICONS[brandKey];
    if (dataUri.startsWith("data:image/svg+xml,")) {
      const svg = decodeURIComponent(dataUri.replace("data:image/svg+xml,", ""));
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
        },
      });
    }
  }

  // 2. Try fetching the real site's HTML to extract <link rel="icon">
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const protocol = targetUrl.startsWith("http://") ? "http" : "https";
    const res = await fetch(`${protocol}://${hostname}`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PupLumeBot/1.0; +https://puplume.pet)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();
      // Look for <link rel="icon" ...> or <link rel="shortcut icon" ...> or <link rel="apple-touch-icon" ...>
      const match =
        html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i) ||
        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i) ||
        html.match(/<link[^>]+rel=["']apple-touch-icon(?:-precomposed)?["'][^>]+href=["']([^"']+)["']/i);

      if (match && match[1]) {
        let iconUrl = match[1].trim();
        if (iconUrl.startsWith("//")) {
          iconUrl = `https:${iconUrl}`;
        } else if (iconUrl.startsWith("/")) {
          iconUrl = `https://${hostname}${iconUrl}`;
        } else if (!iconUrl.startsWith("http")) {
          iconUrl = `https://${hostname}/${iconUrl}`;
        }
        return NextResponse.redirect(iconUrl, {
          status: 302,
          headers: {
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      }
    }
  } catch {
    // Network / timeout: fall through to fallback CDNs
  }

  // 3. Fallback to gstatic Favicon V2 (clean 128px)
  const gstaticUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=128`;
  return NextResponse.redirect(gstaticUrl, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
