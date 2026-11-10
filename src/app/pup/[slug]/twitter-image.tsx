import { generatePupCardImage } from "@/lib/generatePupCardImage";

export const runtime = "nodejs";
export const alt = "Puppy Digital Passport";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  return await generatePupCardImage(slug);
}
