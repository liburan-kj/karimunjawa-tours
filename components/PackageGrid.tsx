import Link from "next/link";
import Image from "next/image";
import { getPackageLowPriceLabel, type PackageSlug } from "../lib/packagePricing";
import { getTourPackages, type TourPackageItem } from "../lib/firestore-service";

type PackageCard = TourPackageItem & {
  displayPrice: string;
};

export default async function PackageGrid() {
  let loadedPackages: TourPackageItem[] = [];
  try {
    loadedPackages = await getTourPackages();
  } catch (err) {
    console.warn("Failed to load tour packages from firestore:", err);
  }

  // Filter hanya yang aktif
  const activePackages = loadedPackages.filter((p) => p.isActive !== false);

  const packagesWithPrice: PackageCard[] = await Promise.all(
    activePackages.map(async (pkg) => {
      let displayPrice = pkg.price;
      // Jika harga belum dikustomisasi atau kosong, hitung dari packagePricing
      if (!displayPrice || displayPrice.trim() === "") {
        try {
          displayPrice = await getPackageLowPriceLabel(pkg.slug as PackageSlug);
        } catch {
          displayPrice = "Lihat Detail";
        }
      }
      return {
        ...pkg,
        displayPrice,
      };
    })
  );

  return (
    <section className="pages-grid-section" id="paket-wisata">
      <h2 className="pages-grid-title">
        <span className="pages-grid-subtitle">REKOMENDASI</span>
        Paket Wisata Terpopuler
      </h2>
      <div className="pages-grid">
        {packagesWithPrice.map((pkg) => (
          <div className="page-card" key={pkg.slug}>
            <Link className="page-card-image-wrap" href={`/paket/${pkg.slug}`}>
              <Image
                className="page-card-img"
                alt={pkg.title}
                src={pkg.img || "/images/satu.png"}
                width={1280}
                height={720}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                quality={85}
              />
              <div className="page-card-badge">
                <span className="badge-text">{pkg.displayPrice}</span>
              </div>
            </Link>
            <div className="page-card-body">
              <span className="page-card-category">PAKET WISATA</span>
              <h3 className="page-card-title">
                <Link href={`/paket/${pkg.slug}`}>{pkg.title}</Link>
              </h3>
              <p className="page-card-desc">{pkg.desc}</p>
              <div className="page-card-footer">
                <span className="page-card-meta">🗓️ {pkg.duration}</span>
                <Link className="page-card-link" href={`/paket/${pkg.slug}`}>
                  Lihat Detail →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}