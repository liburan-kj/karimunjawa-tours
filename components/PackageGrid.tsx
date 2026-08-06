import Link from "next/link";

type Package = {
  slug: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  img: string;
};

const packages: Package[] = [
  { slug: "2h1m-hotel", title: "2 Hari 1 Malam Hotel", duration: "2 Hari 1 Malam", price: "Mulai 1280K",
    desc: "Perjalanan seru, fasilitas lengkap, serta istirahat nyaman di hotel pilihan. Cocok untuk kamu yang ingin melepas penat dengan liburan singkat namun berkesan.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7S6ed8R81qgFEh4xTPeEMHbC0Jhg3HDT-A4netc-X_bYpG5LmXbRqJDd-_vwjqa803Hmwg_Rz_pO06omBj7swIQFJHNFopip7L2LXKAa13TAHa9fyjf3391xdeOXP-RMFQfCXsWE_92azKsnS8MRFB5mwjPZxIkRRrkw7Mo8fT324qujZeuYa0YCtDvk/s648/2h1mhotel.webp" },
  { slug: "3h2m-hotel", title: "3 Hari 2 Malam Hotel", duration: "3 Hari 2 Malam", price: "Mulai 1770K",
    desc: "Menikmati aktivitas seru, dan tetap beristirahat nyaman di hotel pilihan. Cocok untuk liburan santai dengan jadwal fleksibel.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEip7CwdmdAtUGZ_Djc-kA_vW-GvwtYYTAeDiwoL3qYqHbhRdds3mQboPfEwKXFEeceT1HZQPYuGNgPGrBr-Wl8lphqOsoozZQAfeswB-msTFffB9HrksWieZiixYqnMGK-Bo8rH8kQBInaDlKszA0ob7k94J8gpLzKmz0ZkpJ9_bw7HgURp2dL8tEyA_UM/s648/3h2mhotel.webp" },
  { slug: "4h3m-hotel", title: "4 Hari 3 Malam Hotel", duration: "4 Hari 3 Malam", price: "Mulai 2270K",
    desc: "Cocok untuk kamu yang ingin liburan santai sekaligus mendalam, dengan waktu cukup untuk merasakan semua keindahan dan keseruan perjalanan.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvaTMF8ONZhVRt7jusM4oDqT6QVlBYDJIVt49KOAWFM6JZOWOZz_dLU6gsGiJo_ReWXvnZyZUvkv7FaxD6uJdOG1OZLIAVBBi_-FCMUmKqYl6HHgb9A36wW2CBLdrPpOqWanWebYokKWBHA65xfyIkuDhfhQmtwiw8AbG1zfPRtz8GBc10PCqRK3p7n_c/s768/4h3mhotel.webp" },
  { slug: "2h1m-homestay", title: "2 Hari 1 Malam Homestay", duration: "2 Hari 1 Malam", price: "Mulai 610K",
    desc: "Pengalaman hangat dan ramah. Dengan fasilitas sederhana namun nyaman, liburanmu tetap berkesan dan penuh cerita.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRrhUhDqhs6OWcVADiwAWzs3W8GfZphO45ERJmEg2d449milC_aeL3GnMqfKq5gEhEZzq3bgvinNwakCPtH5Huq_MIwhrabdk10ikX-E8t7zwiD4vAaOQXLc4wmy3ce-ZSF1XKu2ToELVN-lKPxE2tZlE5yP3br6f6oVHF8BKGGdppcVu-px_HVr5EA9A/s768/2h1mhomestay.webp" },
  { slug: "3h2m-homestay", title: "3 Hari 2 Malam Homestay", duration: "3 Hari 2 Malam", price: "Mulai 920K",
    desc: "Menikmati suasana ramah khas warga lokal, sekaligus menjelajahi destinasi dengan waktu lebih leluasa.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFZe4uimK7OFYGP0IXSBrshJ_8mff6y3U-LCQttvoK3qOcdsKoto093mdtxLeZPrHm9p_XEWrPz0v-ROTU_JICnpsgpOfqEdV0V-2-2vQU9aZqqcJ6lKDd9YyKJApPyx2d2lElWq0-5JCjHg6Enrh7fzNFNKUAMTqhRgRu9PcSZFr6x6tSLp_XEhsRRLE/s648/3h2mhomestay.webp" },
  { slug: "4h3m-homestay", title: "4 Hari 3 Malam Homestay", duration: "4 Hari 3 Malam", price: "Mulai 1180K",
    desc: "Merasakan keramahan warga lokal, menikmati aktivitas wisata lebih lengkap, dan beristirahat nyaman dalam suasana akrab.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwZ6kjCdgZeCSjs3XLFHVK-F9A7JLYJg6xib-dIO4PSgafoQu0shi4x4Tn6zqBW9Ykx6kolFTWwGHNv3fFHvB5prERHDXlUG94iKpK0KOQMh1Kw0Lajp33eSmPAExVyN-XokOC__8fLCb7SxehIFJVSaMUmwy2XqcHEOC0yARH8laDc3mT8P0rU6gpkZI/s648/4h3mhomestay.webp" },
];

export default function PackageGrid() {
  return (
    <section className="pages-grid-section" id="paket-wisata">
      <h2 className="pages-grid-title">
        <span className="pages-grid-subtitle">REKOMENDASI</span>
        Paket Wisata Terpopuler
      </h2>
      <div className="pages-grid">
        {packages.map((pkg) => (
          <div className="page-card" key={pkg.slug}>
            <Link className="page-card-image-wrap" href={`/paket/${pkg.slug}`}>
              <img className="page-card-img" loading="lazy" alt={pkg.title} src={pkg.img} />
              <div className="page-card-badge"><span className="badge-text">{pkg.price}</span></div>
            </Link>
            <div className="page-card-body">
              <span className="page-card-category">PAKET WISATA</span>
              <h3 className="page-card-title"><Link href={`/paket/${pkg.slug}`}>{pkg.title}</Link></h3>
              <p className="page-card-desc">{pkg.desc}</p>
              <div className="page-card-footer">
                <span className="page-card-meta">🗓️ {pkg.duration}</span>
                <Link className="page-card-link" href={`/paket/${pkg.slug}`}>Lihat Detail →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}