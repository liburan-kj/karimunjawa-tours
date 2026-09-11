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
    // 1. Purge Data Cache for Blogger articles
    revalidateTag("blogger-articles", { expire: 0 });

    // 2. Purge halaman listing /artikel (dan /artikel/page/[page])
    revalidatePath("/artikel", "layout");

    // 3. Purge SEMUA halaman detail /artikel/[slug] yang sudah di-generate statis
    //    saat build (generateStaticParams). Wajib pakai literal "[slug]" -- ini
    //    yang sebelumnya hilang, sehingga edit title/isi artikel yang sudah lama
    //    ter-generate tidak pernah ke-refresh walau revalidateTag sudah jalan.
    revalidatePath("/artikel/[slug]", "page");

    // 4. Purge homepage
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Cache berhasil dibersihkan! Semua data artikel dan homepage telah di-update.",
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
