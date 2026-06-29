import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { checkAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await checkAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    await del(url);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
