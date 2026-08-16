import Link from "next/link";

export const metadata = {
  title: "404 - Halaman Tidak Ditemukan",
  description: "Halaman yang Anda cari tidak ditemukan.",
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="block404" aria-label="404 not found page">
        <div className="waves" aria-hidden="true" />

        <div className="obj" aria-hidden="true">
          <img src="https://imgur.com/w0Yb4MX.png" alt="" />
        </div>

        <div className="t404">404</div>

        <div className="not-found-copy">
          <h1>Halaman tidak ditemukan</h1>
          <p>
            Sepertinya alamat yang Anda buka tidak ada. Yuk kembali ke halaman
            utama dan lanjutkan rencana liburan Anda.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn-cta">
              Kembali ke Beranda
            </Link>
            <a
              href="https://wa.me/6282225336306"
              target="_blank"
              rel="noopener noreferrer"
              className="not-found-link"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        <svg
          className="not-found-svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="glitch">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.03"
                numOctaves="1"
                result="warp"
                id="turb"
              />
              <feColorMatrix in="warp" result="huedturb" type="hueRotate" values="90">
                <animate
                  attributeType="XML"
                  attributeName="values"
                  values="0;180;360"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </feColorMatrix>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="50"
                in="SourceGraphic"
                in2="huedturb"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </main>
  );
}
