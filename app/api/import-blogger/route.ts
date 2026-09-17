import { NextResponse } from "next/server";
import { getAllArticles } from "../../../lib/blogger";
import { saveArticle } from "../../../lib/firestore-service";

function extractMetaDescription(html: string): string | null {
  // 1. <meta name="description" content="...">
  const match1 = html.match(/<meta\s+[^>]*name=['"]description['"][^>]*content=['"]([^'"]+)['"]/i);
  if (match1 && match1[1]) return match1[1].trim();

  // 2. <meta content="..." name="description">
  const match2 = html.match(/<meta\s+[^>]*content=['"]([^'"]+)['"][^>]*name=['"]description['"]/i);
  if (match2 && match2[1]) return match2[1].trim();

  // 3. <meta property="og:description" content="...">
  const matchOg = html.match(/<meta\s+[^>]*property=['"]og:description['"][^>]*content=['"]([^'"]+)['"]/i);
  if (matchOg && matchOg[1]) return matchOg[1].trim();

  // 4. <meta content="..." property="og:description">
  const matchOg2 = html.match(/<meta\s+[^>]*content=['"]([^'"]+)['"][^>]*property=['"]og:description['"]/i);
  if (matchOg2 && matchOg2[1]) return matchOg2[1].trim();

  return null;
}

export async function POST() {
  try {
    const articles = await getAllArticles();
    if (!articles || articles.length === 0) {
      return NextResponse.json({ success: false, message: "Tidak ada artikel ditemukan di Blogspot." }, { status: 404 });
    }

    let importedCount = 0;

    // Proses import dan ambil Deskripsi Penelusuran (SEO Meta) asli dari setiap halaman Blogspot
    for (const art of articles) {
      let realSeoDescription = art.excerpt;

      if (art.alternateUrl) {
        try {
          const res = await fetch(art.alternateUrl, { signal: AbortSignal.timeout(5000) });
          if (res.ok) {
            const html = await res.text();
            const metaDesc = extractMetaDescription(html);
            if (metaDesc && metaDesc.length > 5) {
              realSeoDescription = metaDesc;
            }
          }
        } catch {
          // fallback to standard excerpt if page fetch fails
        }
      }

      await saveArticle({
        id: art.id || art.slug,
        slug: art.slug,
        title: art.title,
        excerpt: realSeoDescription,
        content: art.content,
        featuredImage: art.featuredImage,
        tags: ["Blogspot", "Karimunjawa"],
        status: "published",
        date: art.date || new Date().toISOString(),
        createdAt: art.date || new Date().toISOString(),
      });
      importedCount++;
    }

    return NextResponse.json({
      success: true,
      importedCount,
      message: `Berhasil mengimpor ${importedCount} artikel lengkap dengan Deskripsi Penelusuran (SEO Meta) dari Blogspot ke Firestore.`,
    });
  } catch (error: any) {
    console.error("Error importing from Blogspot:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengimpor artikel dari Blogspot" },
      { status: 500 }
    );
  }
}
