import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { invalidatePuppyCache } from "@/lib/generatePupCardImage";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

async function handleRevalidation(slug: string | null) {
  if (!slug) {
    return NextResponse.json(
      { error: "Missing required 'slug' parameter" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const cleanSlug = slug.toLowerCase().trim();

  // Clear memory cache so next read is 100% fresh from Convex database
  invalidatePuppyCache(cleanSlug);

  // Bust Next.js App Router cache for all paths corresponding to this puppy
  try {
    revalidatePath(`/${cleanSlug}`);
    revalidatePath(`/pup/${cleanSlug}`);
    revalidatePath(`/safety/${cleanSlug}`);
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn("[revalidate] Warning during revalidatePath:", err);
  }

  return NextResponse.json(
    {
      revalidated: true,
      slug: cleanSlug,
      timestamp: Date.now(),
      status: "instant_update_committed",
    },
    { status: 200, headers: corsHeaders() }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const slug = body.slug || req.nextUrl.searchParams.get("slug");
    return await handleRevalidation(slug);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to process revalidation" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  return await handleRevalidation(slug);
}
