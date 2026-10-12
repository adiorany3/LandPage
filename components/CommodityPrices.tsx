import { formatPriceChange, getCommodityPrices, pricesUrl } from "@/lib/prices";
import { eggPriceUrl, eggArchiveUrl, getEggPrice, getEggArchive } from "@/lib/egg-price";
import RevealOnScroll from "./RevealOnScroll";

export default async function CommodityPrices() {
  const [prices, currentEgg, archive] = await Promise.all([getCommodityPrices(), getEggPrice(), getEggArchive()]);
  const useArchive = archive.length > 0 && archive[0].date >= currentEgg.date && (currentEgg.fallback || archive[0].date > currentEgg.date);
  const egg = useArchive ? { ...archive[0], fallback: false } : currentEgg;
  const eggSource = useArchive ? `${eggArchiveUrl}/${egg.date}` : eggPriceUrl;
  return (
    <section className="section" aria-labelledby="prices-title">
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">MARKET INTELLIGENCE / 01</p>
        <h1 id="prices-title">Pantau harga <span>komoditas peternakan.</span></h1>
        <p>Telur, daging, ternak, pakan, dan susu dalam satu ringkasan. Tanggal dan jenis harga mengikuti data terakhir tiap komoditas; harga lokal dapat berbeda.</p>
        <div className="price-status"><span aria-hidden="true" /> DATA DIPERIKSA TIAP 30 MENIT SAAT DIAKSES</div>
      </RevealOnScroll>
      <RevealOnScroll className="price-feature">
        <div>
          <span className="price-label">REFERENSI PASAR / TELUR AYAM RAS</span>
          <h2>Harga telur ayam ras</h2>
          <p>Ringkasan dari halaman harga telur harian; berbeda dari seri harga eceran komoditas di bawah.</p>
          <a href={eggSource} target="_blank" rel="noopener noreferrer">Sumber: Sun Egg — harga telur harian ↗</a>
        </div>
        <div className="price-feature-value">
          <span>RATA-RATA NASIONAL</span>
          <strong>Rp {egg.price}<small> /kg</small></strong>
          <time dateTime={egg.date}>Data: {egg.date}</time>
          {egg.fallback && <span>Arsip harga sesuai tanggal data</span>}
        </div>
      </RevealOnScroll>
      <details className="price-archive">
        <summary>Arsip harga telur — rata-rata nasional</summary>
        <p>Daftar tanggal yang tersedia dari sumber; diperbarui setiap 30 menit saat halaman diakses.</p>
        {archive.length > 0 ? <ul>{archive.map(item => (
          <li key={item.date}><a href={`${eggArchiveUrl}/${item.date}`} target="_blank" rel="noopener noreferrer"><time dateTime={item.date}>{item.date}</time> — Rp {item.price}/kg</a></li>
        ))}</ul> : <p>Daftar arsip belum tersedia. Buka sumber untuk melihat riwayat.</p>}
        <a href={eggArchiveUrl} target="_blank" rel="noopener noreferrer">Lihat seluruh arsip di Sun Egg ↗</a>
      </details>
      <div className="price-list-heading">
        <div><span className="price-label">DATA KOMODITAS / 02</span><h2>Ringkasan harga lainnya</h2></div>
        {prices.some(item => item.fallback) && <p>Arsip harga sesuai tanggal data.</p>}
      </div>
      {prices.length ? (
        <div className="price-grid">
          {prices.map(item => (
            <RevealOnScroll className="price-card" key={item.link}>
              <span className="price-label">{item.level} · Data: {item.date}</span>
              <h3>{item.name}</h3>
              <p className="price-amount"><strong>Rp {item.price}</strong> <span>/{item.unit}</span></p>
              <p className="price-change">{formatPriceChange(item)}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">Detail harga {item.name} <span aria-hidden="true">↗</span></a>
            </RevealOnScroll>
          ))}
        </div>
      ) : <p>Harga belum tersedia. Silakan periksa sumber langsung.</p>}
      <div className="price-export">
        <div><h2>Unduh riwayat harga</h2><p>File Excel memuat tanggal dan harga yang tersedia di arsip telur serta grafik komoditas saat diunduh. Data baru ikut masuk saat sumber memperbaruinya; riwayat lama dibatasi ketersediaan sumber.</p></div>
        <a href="/api/harga-peternakan/arsip" download="arsip-harga-peternakan.xlsx">Unduh XLSX ↓</a>
      </div>
      <p className="price-sources">Sumber: <a href={pricesUrl} target="_blank" rel="noopener noreferrer">Sun Egg</a>, yang mencantumkan BAPANAS melalui <a href="https://simponiternak.pertanian.go.id/" target="_blank" rel="noopener noreferrer">SIMPONI Ternak — Kementerian Pertanian RI</a>.</p>
    </section>
  );
}
