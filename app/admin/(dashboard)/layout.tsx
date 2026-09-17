import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isFirebaseConfigured } from "@/lib/firebase";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware sudah handle redirect, ini sebagai safety net
  if (!session?.user) {
    redirect("/admin/login");
  }

  const hasFirebase = isFirebaseConfigured();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>
      {/* Top Bar Navigation */}
      <header
        style={{
          background: "#033D4A",
          color: "#ffffff",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 24 }}>🏝️</span>
          <div>
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
              Karimunjawa Tours
            </span>
            <span
              style={{
                marginLeft: 8,
                fontSize: 11,
                fontWeight: 600,
                background: "#60C0D8",
                color: "#033D4A",
                padding: "2px 8px",
                borderRadius: 999,
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Firestore Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              background: hasFirebase ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.2)",
              color: hasFirebase ? "#10b981" : "#f59e0b",
              border: `1px solid ${hasFirebase ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.4)"}`,
              padding: "4px 12px",
              borderRadius: 999,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: hasFirebase ? "#10b981" : "#f59e0b",
              }}
            />
            {hasFirebase ? "Firestore Connected" : "Local / Offline Mode"}
          </div>

          {/* User Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {session.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name || "Admin"}
                width={28}
                height={28}
                style={{ borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)" }}
              />
            )}
            <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>
              {session.user.name?.split(" ")[0]}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            style={{
              fontSize: 12,
              color: "#e2e8f0",
              textDecoration: "none",
              background: "rgba(255,255,255,0.1)",
              padding: "6px 12px",
              borderRadius: 6,
            }}
          >
            Lihat Website ↗
          </Link>

          {/* Sign Out */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              style={{
                fontSize: 12,
                color: "#ffffff",
                background: "#ef4444",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "24px 20px" }}>
        {children}
      </main>
    </div>
  );
}
