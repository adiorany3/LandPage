import { getCommodityPrices, pricesUrl } from "@/lib/prices";
import { eggPriceUrl, eggArchiveUrl, getEggPrice, getEggArchive } from "@/lib/egg-price";
import RevealOnScroll from "./RevealOnScroll";

export default async function CommodityPrices() {
  const [prices, currentEgg, archive] = await Promise.all([getCommodityPrices(), getEggPrice(), getEggArchive()]);
  const useArchive = archive.length > 0 && archive[0].date >= currentEgg.date && (currentEgg.fallback || archive[0].date > currentEgg.date);
  const egg = useArchive ? { ...archive[0], fallback: false } : currentEgg;
  const eggSource = useArchive ? `${eggArchiveUrl}/${egg.date}` : eggPriceUrl;
  return (
    <section className="section" id="harga-peternakan" aria-labelledby="prices-title">
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">Harga komoditas peternakan</p>
        <h2 id="prices-title">Pantau harga telur, daging, ternak, pakan, dan susu.</h2>
        <p>Ringkasan nasional. Tanggal dan jenis harga mengikuti data terakhir tiap komoditas, bukan selalu harga hari ini. Harga lokal dapat berbeda.</p>
        <p>Pembaruan otomatis setiap 30 menit saat halaman diakses.</p>
      </RevealOnScroll>
      <RevealOnScroll className="blog-card">
        <span className="journal-label">Rata-rata nasional · Data: <time dateTime={egg.date}>{egg.date}</time></span>
        <h3>Harga telur ayam ras — referensi pasar</h3>
        <p><strong>Rp {egg.price}</strong> /kg</p>
        <p>Ringkasan dari halaman harga telur harian; berbeda dari seri harga eceran komoditas di bawah.</p>
        {egg.fallback && <p>Arsip harga sesuai tanggal data.</p>}
        <a href={eggSource} target="_blank" rel="noreferrer">Sumber: Sun Egg — harga telur harian ↗</a>
      </RevealOnScroll>
      <details>
        <summary>Arsip harga telur — rata-rata nasional</summary>
        <p>Daftar tanggal yang tersedia dari sumber; diperbarui setiap 30 menit saat halaman diakses.</p>
        {archive.length > 0 ? <ul>{archive.map(item => (
          <li key={item.date}><a href={`${eggArchiveUrl}/${item.date}`} target="_blank" rel="noreferrer"><time dateTime={item.date}>{item.date}</time> — Rp {item.price}/kg</a></li>
        ))}</ul> : <p>Daftar arsip belum tersedia. Buka sumber untuk melihat riwayat.</p>}
        <a href={eggArchiveUrl} target="_blank" rel="noreferrer">Lihat seluruh arsip di Sun Egg ↗</a>
      </details>
      {prices.some(item => item.fallback) && <p>Arsip harga sesuai tanggal data.</p>}
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
