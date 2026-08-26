import Breadcrumb from "../../components/Breadcrumb";
import { generateBreadcrumbSchema } from "../../lib/jsonld";

export const metadata = {
  title: "FAQ - Pertanyaan yang Sering Ditanyakan | Karimunjawa Tours",
  description: "Semua yang perlu kamu tahu sebelum liburan ke Karimunjawa: cara ke Karimunjawa, booking, pembayaran, refund, dan lainnya.",
};

// Satu sumber data untuk tampilan DAN JSON-LD, supaya tidak ada risiko teks beda.
const faqs = [
  {
    q: "Gimana cara ke Karimunjawa?",
    a: "Saat ini penyeberangan ke Karimunjawa hanya dari Pelabuhan Kartini, Jepara. Tenang aja, semua sudah kami atur dalam paket, kamu tinggal ikut jadwal aja.",
  },
  {
    q: "Berapa lama perjalanan kapal ke Karimunjawa?",
    a: "Dari Pelabuhan Kartini, Jepara, perjalanan kapal cepat memakan waktu sekitar 2-3 jam, sedangkan naik KMP Siginjai (kapal reguler) memakan waktu sekitar 5,5 jam. Waktu tempuh bisa berubah tergantung cuaca dan kondisi laut.",
  },
  {
    q: "Apa beda paket 2H1M, 3H2M, dan 4H3M?",
    a: "Makin lama hari, makin banyak pulau dan spot yang bisa dieksplor. 2H1M cocok buat yang waktunya mepet tapi tetap mau island hopping. 3H2M paling favorit karena waktunya pas — nggak buru-buru tapi juga nggak kelamaan. 4H3M buat yang mau eksplor lebih dalam dan santai.",
  },
  {
    q: "Apa beda nginep di hotel sama homestay?",
    a: "Hotel lebih ke fasilitas standar (AC, kamar mandi dalam, lebih privat), sementara homestay lebih terasa suasana lokal dan biasanya lebih hemat. Soal kenyamanan dua-duanya oke, tinggal sesuaikan sama budget dan selera kamu.",
  },
  {
    q: "Kapan waktu terbaik ke Karimunjawa?",
    a: "April–Oktober adalah musim kering, laut lebih tenang dan cocok untuk snorkeling/island hopping. Musim hujan (November–Maret) kadang ombak lebih besar, jadi jadwal kapal bisa berubah sewaktu-waktu.",
  },
  {
    q: "Apakah tetap bisa ke Karimunjawa saat musim hujan?",
    a: "Bisa, tapi perlu fleksibel soal jadwal karena keberangkatan kapal tergantung cuaca. Kami akan selalu update kondisi terkini sebelum keberangkatan.",
  },
  {
    q: "Gimana cara booking dan pembayaran?",
    a: "Untuk booking, kamu perlu bayar DP dulu — 50% dari harga paket untuk penginapan hotel, atau Rp500.000 per orang untuk penginapan homestay. DP bisa ditransfer ke BCA nomor rekening 0095341611 atas nama Fransisca Frisca Yuwanita. Sisa pembayaran bisa dilunasi pada hari keberangkatan.",
  },
  {
    q: "Apa kebijakan pembatalan/refund?",
    a: "Kalau kamu membatalkan, akan ada potongan Rp50.000 per peserta. Untuk refund tiket kapal dan hotel, besarannya mengikuti kebijakan dari pihak kapal penyeberangan dan hotel masing-masing, jadi bisa berbeda-beda tergantung ketentuan mereka.",
  },
  {
    q: "Apa saja yang perlu dibawa?",
    a: "Barang wajib: sunscreen, obat pribadi, baju ganti, kamera/underwater case kalau ada. Untuk kebutuhan snorkeling, fin, masker, dan life jacket sudah disediakan. Kalau kamu mau bawa fin dan masker sendiri, itu juga boleh.",
  },
  {
    q: "Apakah aman untuk anak-anak dan lansia?",
    a: "Aman, tapi ada beberapa aktivitas yang mungkin lebih cocok untuk usia tertentu (misalnya snorkeling di spot arus lebih kuat). Kami bisa bantu sesuaikan itinerary kalau ada anggota rombongan dengan kebutuhan khusus.",
  },
  {
    q: "Kalau membawa anak, apakah harganya sama dengan dewasa?",
    a: "Tergantung kebutuhan kamar. Kalau anak butuh extra bed, biayanya sama dengan harga dewasa. Kalau cukup gabung satu kamar dengan orang tua dan hanya perlu tambahan extra breakfast, harganya lebih murah dari harga dewasa. Khusus anak di bawah usia 2 tahun (infant), hanya dikenakan biaya tiket infant sebesar Rp100.000 pulang-pergi.",
  },
];

export default function FaqPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "FAQ" },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="kj-faq-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "FAQ" },
          ]}
        />
      </div>

      <div className="kj-faq-header">
        <h1>Pertanyaan yang Sering Ditanyakan</h1>
        <p>Semua yang perlu kamu tahu sebelum liburan ke Karimunjawa</p>
      </div>

      {faqs.map((item, i) => (
        <details className="kj-faq-item" name="kj-faq-group" key={i}>
          <summary>{item.q}</summary>
          <div className="kj-faq-answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}