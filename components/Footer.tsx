import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-widget">
          <h4>Karimunjawa Tours</h4>
          <p>
            Mitra perjalanan terpercaya untuk menjelajahi keindahan bahari
            Kepulauan Karimunjawa. Pengalaman wisata aman, nyaman, dan
            berkesan.
          </p>
          <ul style={{ marginTop: 16 }}>
            <li><Link href="/privasi">Kebijakan Privasi</Link></li>
          </ul>
          <div className="footer-socials">
            <a
              className="footer-social-btn"
              href="https://www.instagram.com/karimunjawa.tours"
              target="_blank"
              rel="noopener"
              aria-label="Instagram Karimunjawa Tours"
            >
              <Icon icon="lucide:instagram" />
            </a>
            <a
              className="footer-social-btn"
              href="https://wa.me/6282225336306"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp Karimunjawa Tours"
            >
              <Icon icon="lucide:message-circle" />
            </a>
            <a
              className="footer-social-btn"
              href="mailto:liburan@karimunjawa.tours"
              aria-label="Email Karimunjawa Tours"
            >
              <Icon icon="lucide:mail" />
            </a>
          </div>
        </div>
        <div className="footer-widget">
          <h4>Paket Favorit</h4>
          <ul>
            <li><Link href="/paket/3h2m-hotel">3 Hari 2 Malam Hotel</Link></li>
            <li><Link href="/paket/3h2m-homestay">3 Hari 2 Malam Homestay</Link></li>
            <li><Link href="/paket/4h3m-hotel">4 Hari 3 Malam Hotel</Link></li>
            <li><Link href="/paket/4h3m-homestay">4 Hari 3 Malam Homestay</Link></li>
          </ul>
        </div>
        <div className="footer-widget">
          <h4>Hubungi Kami</h4>
          <ul>
            <li>📍 Karimunjawa, Jepara, Jawa Tengah, Indonesia</li>
            <li>📞 +62 822-2533-6306</li>
            <li>✉️ liburan@karimunjawa.tours</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        © Karimunjawa Tours {new Date().getFullYear()}. Seluruh hak cipta dilindungi. Dibuat dengan ❤️ untuk para penjelajah.
      </div>
    </footer>
  );
}
