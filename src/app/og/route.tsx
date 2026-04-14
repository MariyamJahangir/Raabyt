import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const title = searchParams.get("title") || "Raabyt Technologies";
  const description =
    searchParams.get("description") ||
    "Secure AI-Powered On-Premise Enterprise Software";

  // Fetch the icon for embedding
  let iconSrc: string | undefined;
  try {
    const iconRes = await fetch(new URL("/images/raabyt-icon-200.png", origin));
    if (iconRes.ok) {
      const buf = await iconRes.arrayBuffer();
      iconSrc = `data:image/png;base64,${Buffer.from(buf).toString("base64")}`;
    }
  } catch {
    // Fallback: no icon
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "linear-gradient(90deg, #8B5CF6, #D946EF, #8B5CF6)",
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          {iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconSrc}
              width={44}
              height={44}
              alt=""
              style={{ marginRight: "14px" }}
            />
          ) : (
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, #8B5CF6, #D946EF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              R
            </div>
          )}
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "2px",
            }}
          >
            RAABYT
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 50 ? "42px" : "52px",
            fontWeight: 700,
            color: "#F8FAFC",
            lineHeight: 1.15,
            margin: "0 0 16px 0",
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "22px",
            color: "#94A3B8",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "700px",
          }}
        >
          {description}
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "14px", color: "#94A3B8" }}>
            raabyt.com
          </span>
          <span style={{ fontSize: "14px", color: "#2D2D3F" }}>
            •
          </span>
          <span style={{ fontSize: "14px", color: "#8B5CF6" }}>
            Enterprise Software
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
