import Image from "next/image";

type HeroProps = {
  averageRating?: number;
  reviewCount?: number;
};

export default function Hero({ averageRating, reviewCount }: HeroProps) {
  const ratingLabel =
    averageRating && reviewCount
      ? `${averageRating.toFixed(1)} bintang (${reviewCount.toLocaleString("id-ID")} ulasan)`
      : "4.9 bintang di Google";

  return (
    <section className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/images/wimbo.webp"
          alt="Keindahan Wisata Karimunjawa"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-floats" aria-hidden="true">
        <div className="hero-float hero-float--1">
          <Image 
            src="/images/stand.jpg" 
            alt="" 
            fill 
            sizes="170px"
            className="object-cover"
          />
        </div>
        <div className="hero-float hero-float--2">
          <Image 
            src="/images/jump.jpg" 
            alt="" 
            fill 
            sizes="200px"
            className="object-cover"
          />
        </div>
        <div className="hero-float hero-float--3">
          <Image 
            src="/images/island-hopping.png" 
            alt="" 
            fill 
            sizes="210px"
            className="object-cover"
          />
        </div>
        <div className="hero-float hero-float--4">
          <Image 
            src="/images/scuba-diving.jpg" 
            alt="" 
            fill 
            sizes="180px"
            className="object-cover"
          />
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1>Wujudkan Liburan Impianmu Bersama Karimunjawa Tours</h1>
        <p>
          Paket tour terpercaya, harga bersahabat, dan pengalaman wisata tak
          terlupakan menjelajahi keindahan Kepulauan Karimunjawa
        </p>
        <a className="btn-cta" href="#paket-wisata">
          <span>Lihat Pilihan Paket</span>
          <span className="btn-cta-arrow">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

      <div className="hero-stats">
        <span className="hero-stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {ratingLabel}
        </span>
        <span className="hero-stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Ribuan wisatawan sejak 2015
        </span>
        <span className="hero-stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          @karimunjawa.tours
        </span>
      </div>
    </section>
  );
}

