import { NextResponse } from "next/server";
import { fetchAllApplications, fetchRawApplications } from "@/app/apply/prodcon/supabaseServer";

// This route returns formatted application data. If you call with ?dump=1 it will
// also write the raw rows to a JSON file (default /tmp) and return the file path.
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const rawOnly = url.searchParams.get("raw") === "1" || url.searchParams.get("raw") === "true";

    if (rawOnly) {
      const raw = await fetchRawApplications();
      return NextResponse.json({ data: raw });
    }

    const data = await fetchAllApplications();
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
