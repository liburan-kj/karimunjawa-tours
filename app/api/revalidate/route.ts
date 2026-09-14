import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");

  const expectedSecret = process.env.REVALIDATE_SECRET || "karimunjawa-secret-revalidate-key";

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing secret token" },
      { status: 401 }
    );
  }

  try {
    // 1. Purge Data Cache berdasarkan Tag (Gunakan 2 argumen untuk Next.js 15)
    revalidateTag("blogger-articles", "max");

    // 2. Purge Halaman Listing & Homepage
    revalidatePath("/artikel", "layout");
    revalidatePath("/", "layout");

    // 3. Purge Spesifik Artikel atau Pattern
    if (slug) {
      revalidatePath(`/artikel/${slug}`);
    } else {
      revalidatePath("/artikel/[slug]", "page");
    }

    return NextResponse.json({
      revalidated: true,
      message: "Cache berhasil dibersihkan!",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses revalidation", error: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}