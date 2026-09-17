"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #033D4A 0%, #0077b6 100%)",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: "36px 32px",
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏝️</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#033D4A", marginBottom: 6 }}>
          Karimunjawa Tours
        </h1>
        <p style={{ fontSize: 13, color: "#5c6b70", marginBottom: 28 }}>
          Masuk menggunakan akun Google yang terdaftar sebagai admin.
        </p>

        {error === "AccessDenied" && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            ⛔ Akun ini tidak memiliki akses admin.
          </div>
        )}

        {error && error !== "AccessDenied" && (
          <div
            style={{
              background: "#fef3c7",
              color: "#92400e",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            Terjadi kesalahan. Silakan coba lagi.
          </div>
        )}

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#ffffff",
            color: "#374151",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          {/* Google Logo SVG */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.6-3-11.3-7.3l-6.6 5.1C9.8 40.1 16.5 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41.1 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Masuk dengan Google
        </button>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
