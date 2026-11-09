import { redirect } from "next/navigation";

export default async function SafetyRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/pup/${encodeURIComponent(slug)}`);
}
