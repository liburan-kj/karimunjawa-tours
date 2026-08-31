import type { Metadata } from "next";

import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "Karimunjawa Tours - SuperDesign Version",
  description: "Karimunjawa Tours page designed with SuperDesign",
};

export default function TestPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-20 px-4 md:px-8 lg:px-12 flex items-center justify-between" data-sd-id="2">
        <a href="#" id="nav-logo" className="flex items-center gap-2 group" data-sd-id="3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Palm_Tree_Icon.png/512px-Palm_Tree_Icon.png" alt="Karimunjawa Tours Logo" className="h-10 object-contain"/>
          <span className="text-xl font-extrabold tracking-tighter heading-font text-stone-900 hidden sm:block">Karimun<span className="text-sky-600">Jawa</span></span>
        </a>

        <div className="hidden lg:flex items-center gap-4 xl:gap-8" data-sd-id="7">
          <a href="#home" id="nav-home" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Home</a>
          <a href="#paket-wisata" id="nav-paket" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Paket Wisata</a>
          <a href="#aktivitas" id="nav-aktivitas" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Aktivitas</a>
          <a href="#artikel" id="nav-artikel" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Artikel</a>
          <a href="#galeri" id="nav-galeri" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Galeri</a>
          <a href="#tentang-kami" id="nav-tentang" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Tentang Kami</a>
          <a href="#faq" id="nav-faq" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">FAQ</a>
          <a href="#kontak" id="nav-kontak" className="font-medium text-sm xl:text-base text-stone-600 hover:text-sky-600 transition-colors">Kontak</a>
        </div>

        <div className="flex items-center gap-4" data-sd-id="12">
          <a href="#booking" id="nav-book-btn" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-sky-200 transition-all hover:-translate-y-0.5" data-sd-id="14">Pesan Sekarang</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center pt-20 px-6 md:px-12" data-sd-id="15">
        <div className="absolute inset-0 z-0" data-sd-id="16">
          <img src="https://images.unsplash.com/photo-1570534125881-2c092a95c479?auto=format&fit=crop&q=80&w=2000" alt="Karimunjawa Paradise" className="w-full h-full object-cover brightness-75" data-sd-id="17"/>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/20 to-transparent" data-sd-id="18"></div>
        </div>

        <div className="relative z-10 max-w-4xl" data-sd-id="19">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-6 tracking-widest uppercase animate-fade-in" data-sd-id="20">Jelajahi Surga Tersembunyi</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white heading-font leading-[1.1] mb-6 drop-shadow-lg" data-sd-id="21">
            Liburan ke Surga <br/> <span className="text-sky-400 underline decoration-sky-400 underline-offset-8" data-sd-id="22">Karimunjawa</span>
          </h1>
          <p className="text-xl text-stone-100 max-w-2xl mb-10 leading-relaxed drop-shadow" data-sd-id="23">
            Rasakan pengalaman luar biasa di kepulauan paling asri di Indonesia. Air sebening kristal, pantai pasir putih, dan terumbu karang yang hidup menanti Anda.
          </p>
          <div className="flex flex-wrap gap-4" data-sd-id="24">
            <a href="#paket-wisata" id="hero-cta-main" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/20 transition-all flex items-center gap-2" data-sd-id="25">
              Cari Paket
              <Icon icon="lucide:arrow-right"/>
            </a>
            <a href="#video" id="hero-cta-sec" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2" data-sd-id="26">
              Tonton Video
              <Icon icon="lucide:play-circle"/>
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 bg-stone-50" data-sd-id="50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center" data-sd-id="51">
          <div data-sd-id="52">
            <div className="text-4xl font-extrabold text-stone-900 heading-font mb-2" data-sd-id="53">15k+</div>
            <div className="text-stone-500 font-medium" data-sd-id="54">Wisatawan Bahagia</div>
          </div>
          <div data-sd-id="55">
            <div className="text-4xl font-extrabold text-stone-900 heading-font mb-2" data-sd-id="56">27</div>
            <div className="text-stone-500 font-medium" data-sd-id="57">Pulau Pribadi</div>
          </div>
          <div data-sd-id="58">
            <div className="text-4xl font-extrabold text-stone-900 heading-font mb-2" data-sd-id="59">50+</div>
            <div className="text-stone-500 font-medium" data-sd-id="60">Spot Diving</div>
          </div>
          <div data-sd-id="61">
            <div className="text-4xl font-extrabold text-stone-900 heading-font mb-2" data-sd-id="62">4.9</div>
            <div className="text-stone-500 font-medium" data-sd-id="63">Rating Tamu</div>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section id="paket-wisata" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" data-sd-id="64">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-sd-id="65">
          <div className="max-w-xl" data-sd-id="66">
            <h2 className="text-stone-500 font-bold tracking-[0.2em] uppercase text-sm mb-4" data-sd-id="67">Kurasi Paket Terbaik</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 heading-font leading-tight" data-sd-id="68">Pilih Pengalaman Pulaumu</h3>
          </div>
          <a href="#" id="view-all-packages" className="flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all" data-sd-id="69">
            Lihat Semua Paket <Icon icon="lucide:arrow-right"/>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-sd-id="70">
          {/* Card 1 */}
          <div className="tour-card group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-stone-200 border border-stone-100 transition-all duration-500" data-sd-id="71">
            <div className="relative h-72 overflow-hidden" data-sd-id="72">
              <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800" alt="Snorkeling Adventure" className="card-image w-full h-full object-cover transition-transform duration-700" data-sd-id="73"/>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800" data-sd-id="74">
                Best Seller
              </div>
              <div className="absolute bottom-4 right-4 bg-sky-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg" data-sd-id="75">
                Rp 1.5M/org
              </div>
            </div>
            <div className="p-8" data-sd-id="76">
              <div className="flex items-center gap-2 text-orange-500 mb-2" data-sd-id="77">
                <Icon icon="mdi:star" className="text-lg"/>
                <span className="text-sm font-bold" data-sd-id="78">4.9 (124 ulasan)</span>
              </div>
              <h4 className="text-2xl font-bold text-stone-900 heading-font mb-4" data-sd-id="79">3H2M Hotel Eksklusif</h4>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed" data-sd-id="80">
                Kunjungi 5 pulau perawan, berenang bersama hiu di Menjangan Besar, dan nikmati BBQ pantai.
              </p>
              <div className="flex items-center gap-4 mb-8 text-stone-400" data-sd-id="81">
                <div className="flex items-center gap-1" data-sd-id="82">
                  <Icon icon="lucide:clock" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="83">3 Hari</span>
                </div>
                <div className="flex items-center gap-1" data-sd-id="84">
                  <Icon icon="lucide:map" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="85">5 Spot</span>
                </div>
              </div>
              <a href="#" id="book-pack-1" className="block w-full text-center py-4 bg-stone-900 group-hover:bg-sky-600 text-white font-bold rounded-2xl transition-all" data-sd-id="86">
                Pesan Paket
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="tour-card group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-stone-200 border border-stone-100 transition-all duration-500" data-sd-id="87">
            <div className="relative h-72 overflow-hidden" data-sd-id="88">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800" alt="Luxury Escape" className="card-image w-full h-full object-cover transition-transform duration-700" data-sd-id="89"/>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800" data-sd-id="90">
                Premium
              </div>
              <div className="absolute bottom-4 right-4 bg-sky-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg" data-sd-id="91">
                Rp 2.2M/org
              </div>
            </div>
            <div className="p-8" data-sd-id="92">
              <div className="flex items-center gap-2 text-orange-500 mb-2" data-sd-id="93">
                <Icon icon="mdi:star" className="text-lg"/>
                <span className="text-sm font-bold" data-sd-id="94">5.0 (82 ulasan)</span>
              </div>
              <h4 className="text-2xl font-bold text-stone-900 heading-font mb-4" data-sd-id="95">4H3M Hotel Premium</h4>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed" data-sd-id="96">
                Akomodasi berkelas, makan malam romantis di bawah bintang, dan penjelasankan dengan kapal pribadi.
              </p>
              <div className="flex items-center gap-4 mb-8 text-stone-400" data-sd-id="97">
                <div className="flex items-center gap-1" data-sd-id="98">
                  <Icon icon="lucide:clock" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="99">4 Hari</span>
                </div>
                <div className="flex items-center gap-1" data-sd-id="100">
                  <Icon icon="lucide:anchor" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="101">Privat</span>
                </div>
              </div>
              <a href="#" id="book-pack-2" className="block w-full text-center py-4 bg-stone-900 group-hover:bg-sky-600 text-white font-bold rounded-2xl transition-all" data-sd-id="102">
                Pesan Paket
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="tour-card group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-stone-200 border border-stone-100 transition-all duration-500" data-sd-id="103">
            <div className="relative h-72 overflow-hidden" data-sd-id="104">
              <img src="https://images.unsplash.com/photo-1506929113675-b9299d3932ee?auto=format&fit=crop&q=80&w=800" alt="Diving Expedition" className="card-image w-full h-full object-cover transition-transform duration-700" data-sd-id="105"/>
              <div className="absolute bottom-4 right-4 bg-sky-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg" data-sd-id="106">
                Rp 1.1M/org
              </div>
            </div>
            <div className="p-8" data-sd-id="107">
              <div className="flex items-center gap-2 text-orange-500 mb-2" data-sd-id="108">
                <Icon icon="mdi:star" className="text-lg"/>
                <span className="text-sm font-bold" data-sd-id="109">4.8 (95 ulasan)</span>
              </div>
              <h4 className="text-2xl font-bold text-stone-900 heading-font mb-4" data-sd-id="110">3H2M Homestay Asik</h4>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed" data-sd-id="111">
                Pilihan ramah di kantong dengan pengalaman homestay lokal yang hangat dan paket eksplorasi lengkap.
              </p>
              <div className="flex items-center gap-4 mb-8 text-stone-400" data-sd-id="112">
                <div className="flex items-center gap-1" data-sd-id="113">
                  <Icon icon="lucide:clock" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="114">3 Hari</span>
                </div>
                <div className="flex items-center gap-1" data-sd-id="115">
                  <Icon icon="lucide:home" className="text-lg"/>
                  <span className="text-xs font-medium" data-sd-id="116">Homestay</span>
                </div>
              </div>
              <a href="#" id="book-pack-3" className="block w-full text-center py-4 bg-stone-900 group-hover:bg-sky-600 text-white font-bold rounded-2xl transition-all" data-sd-id="117">
                Pesan Paket
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-stone-900 text-white" data-sd-id="118">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center" data-sd-id="119">
          <div data-sd-id="120">
            <h2 className="text-sky-400 font-bold tracking-[0.2em] uppercase text-sm mb-4" data-sd-id="121">Mengapa Karimunjawa</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold heading-font leading-tight mb-8" data-sd-id="122">Perjalanan Anda ke Jantung Lautan</h3>
            
            <div className="space-y-8" data-sd-id="123">
              <div className="flex gap-6" data-sd-id="124">
                <div className="w-14 h-14 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400" data-sd-id="125">
                  <Icon icon="lucide:shield-check" className="text-3xl"/>
                </div>
                <div data-sd-id="126">
                  <h4 className="text-xl font-bold mb-2" data-sd-id="127">Pemandu Lokal Tersertifikasi</h4>
                  <p className="text-stone-400" data-sd-id="128">Tim kami adalah penduduk lokal yang hafal setiap permata tersembunyi di kepulauan ini.</p>
                </div>
              </div>
              <div className="flex gap-6" data-sd-id="129">
                <div className="w-14 h-14 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400" data-sd-id="130">
                  <Icon icon="lucide:eco-leaf" className="text-3xl"/>
                </div>
                <div data-sd-id="131">
                  <h4 className="text-xl font-bold mb-2" data-sd-id="132">Wisata Berkelanjutan</h4>
                  <p className="text-stone-400" data-sd-id="133">Kami mempraktikkan pariwisata ramah lingkungan agar keindahan karang tetap lestari untuk generasi mendatang.</p>
                </div>
              </div>
              <div className="flex gap-6" data-sd-id="134">
                <div className="w-14 h-14 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400" data-sd-id="135">
                  <Icon icon="lucide:heart" className="text-3xl"/>
                </div>
                <div data-sd-id="136">
                  <h4 className="text-xl font-bold mb-2" data-sd-id="137">Layanan All-Inclusive</h4>
                  <p className="text-stone-400" data-sd-id="138">Mulai dari tiket kapal, alat snorkeling, hingga makan siang BBQ ikan segar di pantai, kami yang urus semuanya.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative" data-sd-id="139">
            <div className="grid grid-cols-2 gap-4" data-sd-id="140">
              <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600" alt="Beach" className="rounded-3xl w-full aspect-square object-cover" data-sd-id="141"/>
              <img src="https://images.unsplash.com/photo-1506953823976-52c1ddc0149a?auto=format&fit=crop&q=80&w=600" alt="Turtle" className="rounded-3xl w-full aspect-square object-cover mt-12" data-sd-id="142"/>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-600 p-8 rounded-full border-[10px] border-stone-900" data-sd-id="143">
              <Icon icon="lucide:anchor" className="text-5xl text-white"/>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" data-sd-id="144">
        <div className="text-center mb-16" data-sd-id="145">
          <h2 className="text-sky-600 font-bold tracking-[0.2em] uppercase text-sm mb-4" data-sd-id="146">Suara Wisatawan</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 heading-font" data-sd-id="147">Apa Kata Mereka?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-sd-id="148">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100" data-sd-id="149">
            <div className="flex items-center gap-1 text-orange-400 mb-6" data-sd-id="150">
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
            </div>
            <p className="text-stone-600 italic mb-8 leading-relaxed" data-sd-id="151">&quot;Perjalanan paling terorganisir yang pernah saya lakukan. Titik snorkeling yang sepi dan air yang luar biasa bening. 10/10!&quot;</p>
            <div className="flex items-center gap-4" data-sd-id="152">
              <div className="w-14 h-14 rounded-full bg-stone-200 overflow-hidden" data-sd-id="153">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" data-sd-id="154"/>
              </div>
              <div data-sd-id="155">
                <h5 className="font-bold text-stone-900" data-sd-id="156">Budi Santoso</h5>
                <p className="text-stone-400 text-sm" data-sd-id="157">dari Jakarta</p>
              </div>
            </div>
          </div>

          <div className="bg-sky-600 p-10 rounded-[2.5rem] shadow-xl text-white" data-sd-id="158">
            <div className="flex items-center gap-1 text-sky-200 mb-6" data-sd-id="159">
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
            </div>
            <p className="italic mb-8 leading-relaxed text-sky-50" data-sd-id="160">&quot;Berenang bersama hiu di Menjangan Besar adalah sorotan hidup saya. Pemandu kami, Mas Adi, sangat hebat dan paham sekali soal biota laut.&quot;</p>
            <div className="flex items-center gap-4" data-sd-id="161">
              <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden" data-sd-id="162">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" className="w-full h-full object-cover" data-sd-id="163"/>
              </div>
              <div data-sd-id="164">
                <h5 className="font-bold text-white" data-sd-id="165">Sarah Jenkins</h5>
                <p className="text-sky-200 text-sm" data-sd-id="166">dari Australia</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100" data-sd-id="167">
            <div className="flex items-center gap-1 text-orange-400 mb-6" data-sd-id="168">
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
              <Icon icon="mdi:star"/>
            </div>
            <p className="text-stone-600 italic mb-8 leading-relaxed" data-sd-id="169">&quot;Makan siang ikan bakar di pinggir Pantai Tanjung Gelam luar biasa nikmat. Suasananya pas banget untuk bulan madu!&quot;</p>
            <div className="flex items-center gap-4" data-sd-id="170">
              <div className="w-14 h-14 rounded-full bg-stone-200 overflow-hidden" data-sd-id="171">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Linda" alt="User" className="w-full h-full object-cover" data-sd-id="172"/>
              </div>
              <div data-sd-id="173">
                <h5 className="font-bold text-stone-900" data-sd-id="174">Linda & David</h5>
                <p className="text-stone-400 text-sm" data-sd-id="175">dari Surabaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-6 md:px-12 py-24 bg-stone-50" data-sd-id="176">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative" data-sd-id="177">
          <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=2000" alt="Island CTA" className="absolute inset-0 w-full h-full object-cover brightness-50" data-sd-id="178"/>
          <div className="relative z-10 py-24 px-8 md:px-20 text-center" data-sd-id="179">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white heading-font mb-8" data-sd-id="180">Siap untuk petualangan <br/> serumu berikutnya?</h2>
            <p className="text-xl text-stone-200 mb-12 max-w-2xl mx-auto" data-sd-id="181">
              Pesan paket wisata Karimunjawa Anda hari ini dan dapatkan diskon spesial 15% untuk pemesanan rombongan lebih dari 4 orang.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-sd-id="182">
              <a href="#" id="cta-bottom-primary" className="bg-white text-stone-900 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-sky-600 hover:text-white transition-all shadow-2xl" data-sd-id="183">
                Rencanakan Sekarang
              </a>
              <a href="#" id="cta-bottom-whatsapp" className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-extrabold text-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-2xl" data-sd-id="184">
                <Icon icon="mdi:whatsapp" className="text-2xl"/>
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white pt-20 pb-10 px-6 md:px-12" data-sd-id="185">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* Left Widget */}
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Palm_Tree_Icon.png/512px-Palm_Tree_Icon.png" alt="Karimunjawa Tours" className="h-10 mb-6 object-contain"/>
            <p className="text-stone-400 mb-6 leading-relaxed">
              Karimunjawa Tours adalah penyedia layanan wisata terbaik untuk menjelajahi keindahan kepulauan Karimunjawa. Kami menawarkan berbagai paket perjalanan yang nyaman, terjangkau, dan tak terlupakan.
            </p>
            <a href="#privasi" id="footer-privasi" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
              Kebijakan Privasi
            </a>
          </div>

          {/* Middle Widget */}
          <div>
            <h4 className="font-bold text-lg mb-8">Paket Favorit</h4>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#paket-1" id="ft-paket-1" className="hover:text-sky-400 transition-colors">3H2M Hotel</a></li>
              <li><a href="#paket-2" id="ft-paket-2" className="hover:text-sky-400 transition-colors">3H2M Homestay</a></li>
              <li><a href="#paket-3" id="ft-paket-3" className="hover:text-sky-400 transition-colors">4H3M Hotel</a></li>
              <li><a href="#paket-4" id="ft-paket-4" className="hover:text-sky-400 transition-colors">4H3M Homestay</a></li>
            </ul>
          </div>

          {/* Right Widget */}
          <div>
            <h4 className="font-bold text-lg mb-8">Kontak</h4>
            <ul className="space-y-4 text-stone-400">
              <li className="flex items-start gap-3">
                <Icon icon="lucide:map-pin" className="mt-1 text-sky-400"/>
                <span>Karimunjawa Jepara</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon="lucide:phone" className="text-sky-400"/>
                <span>+62 822-2533-6306</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon="lucide:mail" className="text-sky-400"/>
                <span>liburan@karimunjawa.tours</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex justify-center text-stone-500 text-sm">
          <p>&copy; Karimunjawa Tours. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
