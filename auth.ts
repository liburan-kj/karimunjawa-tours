import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { logLoginAttempt } from "./lib/firestore-service";

// Parse ADMIN_EMAILS: comma-separated, case-insensitive
// Contoh: ADMIN_EMAILS=gue@gmail.com,rekan@gmail.com
const allowedEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Blokir login jika email tidak ada di whitelist & catat ke audit log
    async signIn({ user }) {
      const email = user.email?.toLowerCase() || "";
      const isAllowed = allowedEmails.includes(email);

      try {
        await logLoginAttempt({
          email: user.email || "unknown",
          name: user.name || undefined,
          image: user.image || undefined,
          status: isAllowed ? "success" : "blocked",
          reason: isAllowed
            ? "Akses diizinkan (Admin Whitelist)"
            : "Akses ditolak (Email tidak terdaftar di ADMIN_EMAILS)",
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Gagal menyimpan audit log login:", err);
      }

      return isAllowed;
    },
    // Ekspose email ke session token
    session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});
