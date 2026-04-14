import { NextResponse, type NextRequest } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "placeholder-indexnow-key";
const HOST = "https://raabyt.com";

export async function POST(request: NextRequest) {
  try {
    const { urls } = (await request.json()) as { urls?: string[] };

    if (!urls || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    const payload = {
      host: HOST.replace("https://", ""),
      key: INDEXNOW_KEY,
      keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((u) => (u.startsWith("http") ? u : `${HOST}${u}`)),
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submitted: payload.urlList.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit to IndexNow" },
      { status: 500 }
    );
  }
}
