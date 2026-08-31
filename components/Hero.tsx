import { Icon } from "@iconify/react";
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
      <div className="hero-floats" aria-hidden="true">
        <div className="hero-float hero-float--1">
          <Image src="/images/stand.JPG" alt="" width={400} height={300} priority />
        </div>
        <div className="hero-float hero-float--2">
          <Image src="/images/jump.jpg" alt="" width={400} height={300} priority />
        </div>
        <div className="hero-float hero-float--3">
          <Image src="/images/island-hopping.png" alt="" width={400} height={300} priority />
        </div>
        <div className="hero-float hero-float--4">
          <Image src="/images/scuba-diving.jpg" alt="" width={400} height={300} priority />
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
            <Icon icon="lucide:arrow-right" />
          </span>
        </a>
      </div>

      <div className="hero-stats">
        <span className="hero-stat">
          <Icon icon="lucide:star" />
          {ratingLabel}
        </span>
        <span className="hero-stat">
          <Icon icon="lucide:users" />
          Ribuan wisatawan sejak 2015
        </span>
        <span className="hero-stat">
          <Icon icon="lucide:instagram" />
          @karimunjawa.tours
        </span>
      </div>
    </section>
  );
}
