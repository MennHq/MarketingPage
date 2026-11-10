import { NextRequest } from "next/server";
import { generatePupCardImage } from "@/lib/generatePupCardImage";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "";
    return await generatePupCardImage(slug);
  } catch (err: any) {
    console.error("OG Route Error:", err);
    return new Response(`Failed to generate OG image: ${err?.message}`, { status: 500 });
  }
}
