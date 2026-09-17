import { getCommodityPrices, pricesUrl } from "@/lib/prices";
import RevealOnScroll from "./RevealOnScroll";

export default async function CommodityPrices() {
  const prices = await getCommodityPrices();
  return (
    <section className="section" id="harga-peternakan" aria-labelledby="prices-title">
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">Harga komoditas peternakan</p>
        <h2 id="prices-title">Pantau harga telur, daging, ternak, pakan, dan susu.</h2>
        <p>Ringkasan nasional. Tanggal dan jenis harga mengikuti data terakhir tiap komoditas, bukan selalu harga hari ini. Harga lokal dapat berbeda.</p>
        <p>Pembaruan otomatis setiap 30 menit saat halaman diakses.</p>
      </RevealOnScroll>
      {prices.some(item => item.fallback) && <p role="status">Sumber tidak dapat dimuat. Menampilkan data cadangan tanggal 17 September 2026, bukan harga terkini. Periksa tautan sumber sebelum mengambil keputusan.</p>}
      {prices.length ? (
        <div className="blog-grid">
          {prices.map(item => (
            <RevealOnScroll className="blog-card" key={item.link}>
              <span className="journal-label">{item.level} · Data: {item.date}</span>
              <h3>{item.name}</h3>
              <p><strong>Rp {item.price}</strong> /{item.unit}</p>
              <a href={item.link} target="_blank" rel="noreferrer">Detail harga {item.name} ↗</a>
            </RevealOnScroll>
          ))}
        </div>
      ) : <p>Harga belum tersedia. Silakan periksa sumber langsung.</p>}
      <p>Sumber: <a href={pricesUrl} target="_blank" rel="noreferrer">Sun Egg</a>, yang mencantumkan BAPANAS melalui <a href="https://simponiternak.pertanian.go.id/" target="_blank" rel="noreferrer">SIMPONI Ternak — Kementerian Pertanian RI</a>.</p>
    </section>
  );
}
