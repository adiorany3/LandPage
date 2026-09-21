import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// ponytail: dipanggil oleh Vercel Cron (vercel.json), bukan GitHub Actions.
// CRON_SECRET diisi otomatis oleh Vercel; cocokkan dengan Authorization: Bearer <CRON_SECRET>.
export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("news", { expire: 0 });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}

export const dynamic = "force-dynamic";
