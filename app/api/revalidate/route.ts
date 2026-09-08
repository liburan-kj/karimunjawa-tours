import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Token rahasia diambil dari Environment Variable, dengan fallback default
  const expectedSecret = process.env.REVALIDATE_SECRET || "karimunjawa-secret-revalidate-key";

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing secret token" },
      { status: 401 }
    );
  }

  try {
    // Revalidate tag khusus data artikel Blogger (expire 0 untuk langsung purge cache)
    revalidateTag("blogger-articles", { expire: 0 });

    // Revalidate rute halaman artikel dan homepage
    revalidatePath("/artikel");
    revalidatePath("/artikel/[slug]", "page");
    revalidatePath("/artikel/page/[page]", "page");
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      message: "Cache artikel Blogger berhasil di-revalidate!",
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
