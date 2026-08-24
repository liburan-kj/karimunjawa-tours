import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Karimunjawa Tours",
  description:
    "Kebijakan privasi Karimunjawa Tours mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pelanggan.",
  alternates: {
    canonical: "https://karimunjawa.tours/privasi",
  },
  openGraph: {
    type: "website",
    url: "https://karimunjawa.tours/privasi",
    title: "Kebijakan Privasi | Karimunjawa Tours",
    description:
      "Kebijakan privasi Karimunjawa Tours mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pelanggan.",
    images: [
      {
        url: "https://karimunjawa.tours/images/satu.jpg",
        width: 1200,
        height: 630,
        alt: "Kebijakan Privasi Karimunjawa Tours",
      },
    ],
  },
};

const LAST_UPDATED = "24 Agustus 2026";

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kebijakan Privasi - Karimunjawa Tours",
    description:
      "Kebijakan privasi Karimunjawa Tours mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pelanggan.",
    url: "https://karimunjawa.tours/privasi",
    publisher: {
      "@type": "Organization",
      name: "Karimunjawa Tours",
      url: "https://karimunjawa.tours",
      logo: "https://karimunjawa.tours/images/satu.jpg",
    },
  };

  return (
    <div className="privacy-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kebijakan Privasi" },
        ]}
      />

      {/* Hero Header */}
      <div className="pkg-hero">
        <div className="pkg-hero-label">🔒 KEBIJAKAN PRIVASI</div>
        <h1>Kebijakan Privasi</h1>
        <p>
          Komitmen kami dalam menjaga dan melindungi privasi serta keamanan data pribadi Anda saat menggunakan layanan dan memesan trip bersama Karimunjawa Tours.
        </p>
      </div>

      <div className="privacy-meta">
        <span>📅</span> Terakhir diperbarui: <strong>{LAST_UPDATED}</strong>
      </div>

      <div className="privacy-card">
        <section className="privacy-section">
          <h2>
            <span>👋</span> Pendahuluan
          </h2>
          <p>
            Karimunjawa Tours (&ldquo;kami&rdquo;) sangat menghargai privasi dan kepercayaan para pengunjung serta pelanggan kami. Dokumen Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat mengakses situs <strong>karimunjawa.tours</strong> maupun saat melakukan pemesanan paket wisata bersama kami.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>📋</span> Informasi yang Kami Kumpulkan
          </h2>
          <p>
            Saat Anda menghubungi kami, berkonsultasi, atau melakukan reservasi paket wisata, kami dapat meminta sejumlah informasi penting seperti:
          </p>
          <ul>
            <li>Nama lengkap dan data identitas diri (sesuai KTP/Paspor untuk tiket kapal &amp; asuransi)</li>
            <li>Nomor WhatsApp aktif dan alamat email untuk konfirmasi jadwal serta pengiriman tiket</li>
            <li>Rincian rencana perjalanan (tanggal keberangkatan, durasi paket, tipe penginapan, dan jumlah peserta)</li>
            <li>Kebutuhan khusus perjalanan (seperti preferensi makanan, kamar, atau pendampingan ramah anak/lansia)</li>
          </ul>
          <p>
            Informasi tersebut semata-mata dikumpulkan untuk keperluan pemrosesan reservasi dan kelancaran komunikasi selama Anda berwisata di Karimunjawa.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>⚙️</span> Penggunaan Informasi
          </h2>
          <p>Informasi yang Anda berikan digunakan secara bertanggung jawab untuk:</p>
          <ul>
            <li>Memproses reservasi tiket kapal penyeberangan (Express Bahari / KMP Siginjai) dan kamar penginapan</li>
            <li>Mengirimkan invoice, bukti transfer, konfirmasi jadwal, dan briefing trip sebelum keberangkatan</li>
            <li>Memberikan update terkini terkait cuaca, jadwal pelayaran, dan kondisi di Karimunjawa</li>
            <li>Meningkatkan kualitas pelayanan tour guide, armada kapal wisata, dan pengalaman liburan Anda</li>
          </ul>
          <p>
            Kami <strong>tidak pernah</strong> menjual, menyewakan, atau memperjualbelikan data pribadi Anda kepada pihak ketiga mana pun untuk tujuan promosi atau periklanan komersial.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>🤝</span> Pembagian Data dengan Mitra Operasional
          </h2>
          <p>
            Demi kelancaran perjalanan Anda, beberapa data tertentu (seperti nama peserta dan nomor identitas) hanya akan diteruskan kepada mitra resmi terkait, yaitu:
          </p>
          <ul>
            <li>Pihak operator kapal penyeberangan untuk penerbitan tiket resmi dan manifest asuransi penumpang</li>
            <li>Pihak hotel / homestay mitra kami (seperti Java Paradise Resort, Halo Resort, Happinezz Hills, Omah Alchy, dan homestay lokal terdaftar) untuk keperluan check-in</li>
            <li>Tour guide lokal bersertifikasi HPI yang bertugas menyambut dan mendampingi rombongan Anda</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>
            <span>🛡️</span> Keamanan &amp; Penyimpanan Data
          </h2>
          <p>
            Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk mencegah kehilangan, pencurian, atau penyalahgunaan data pribadi Anda. Seluruh transaksi dan pertukaran data dilindungi dengan standar keamanan terkini.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>🍪</span> Cookie &amp; Analitik Situs
          </h2>
          <p>
            Situs ini menggunakan layanan analitik web (seperti Google Analytics) untuk memahami statistik kunjungan, konten yang paling disukai wisatawan, dan efisiensi navigasi situs. Data analitik ini bersifat agregat/anonim dan tidak melacak informasi identitas pribadi Anda.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>⚖️</span> Hak Pengguna atas Data Pribadi
          </h2>
          <p>
            Anda memiliki hak untuk meminta rincian data pribadi Anda yang tersimpan di sistem kami, memperbarui informasi yang kurang tepat, atau meminta penghapusan data kontak setelah perjalanan Anda selesai.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>🔄</span> Pembaruan Kebijakan
          </h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini secara berkala mengikuti perkembangan regulasi dan peningkatan layanan. Setiap perubahan akan segera dipublikasikan pada halaman ini beserta tanggal pembaruan terbaru.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <span>💬</span> Pertanyaan &amp; Kontak Layanan
          </h2>
          <p>
            Apabila Anda memiliki pertanyaan, saran, atau permohonan terkait data pribadi dan kebijakan privasi ini, silakan hubungi tim kami melalui:
          </p>
          
          <div className="privacy-contact-box">
            <p style={{ margin: "0 0 8px" }}>
              ✉️ <strong>Email:</strong>{" "}
              <a href="mailto:liburan@karimunjawa.tours" className="font-semibold text-[#0a5c8a] underline">
                liburan@karimunjawa.tours
              </a>
            </p>
            <p style={{ margin: "0 0 12px" }}>
              📱 <strong>WhatsApp:</strong>{" "}
              <a href="https://wa.me/6282225336306" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a5c8a] underline">
                +62 822-2533-6306
              </a>
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#5a7691" }}>
              Atau kunjungi halaman <Link href="/kontak" className="text-[#0a5c8a] font-semibold underline">Kontak Kami</Link> untuk saluran komunikasi lainnya.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}