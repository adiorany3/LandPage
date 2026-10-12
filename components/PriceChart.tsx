"use client";

import { useState } from "react";
import type { PriceRecord } from "@/lib/price-history";

type Range = 7 | 30 | 0;
const rupiah = new Intl.NumberFormat("id-ID");
const dateLabel = (date: string) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(`${date}T00:00:00Z`));

export default function PriceChart({ records }: { records: PriceRecord[] }) {
  const products = [...new Map(records.map(item => [`${item.product}|${item.level}|${item.unit}`, item])).values()];
  const [selected, setSelected] = useState(products[0] ? `${products[0].product}|${products[0].level}|${products[0].unit}` : "");
  const [range, setRange] = useState<Range>(30);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  if (!products.length) return <section className="chart-panel"><h2>Tren harga</h2><p>Riwayat harga belum tersedia dari sumber. Silakan coba kembali nanti.</p></section>;

  const active = products.find(item => `${item.product}|${item.level}|${item.unit}` === selected) ?? products[0];
  const full = records.filter(item => item.product === active.product && item.level === active.level && item.unit === active.unit)
    .sort((a, b) => a.date.localeCompare(b.date));
  const cutoff = range && full.length ? new Date(`${full.at(-1)!.date}T00:00:00Z`).getTime() - (range - 1) * 86400000 : 0;
  const points = range ? full.filter(item => Date.parse(`${item.date}T00:00:00Z`) >= cutoff) : full;
  const values = points.map(item => item.price);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max((max - min) * .15, max * .01, 1);
  const low = Math.max(0, min - padding);
  const high = max + padding;
  const start = Date.parse(`${points[0].date}T00:00:00Z`);
  const duration = Date.parse(`${points.at(-1)!.date}T00:00:00Z`) - start;
  const x = (index: number) => 62 + (duration ? (Date.parse(`${points[index].date}T00:00:00Z`) - start) / duration : .5) * 672;
  const y = (value: number) => 225 - (value - low) / (high - low) * 180;
  const path = points.map((item, index) => `${index ? "L" : "M"}${x(index).toFixed(1)} ${y(item.price).toFixed(1)}`).join(" ");
  const latest = points.at(-1)!;
  const first = points[0];
  const difference = latest.price - first.price;
  const hoveredIndex = points.findIndex(item => item.date === hoveredDate);
  const hovered = hoveredIndex >= 0 ? points[hoveredIndex] : null;

  function onChartPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const matrix = svg.getScreenCTM();
    if (!matrix) return;
    const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const nearest = points.reduce((best, _, index) => Math.abs(x(index) - position.x) < Math.abs(x(best) - position.x) ? index : best, 0);
    setHoveredDate(points[nearest].date);
  }

  return (
    <section className="chart-panel" aria-labelledby="chart-title">
      <div className="chart-top">
        <div><span className="price-label">ANALISIS TREN / 02</span><h2 id="chart-title">Pergerakan harga</h2><p>Pilih komoditas untuk melihat riwayat yang tersedia dari sumber.</p></div>
        <div className="chart-controls">
          <label htmlFor="chart-product">Komoditas</label>
          <select id="chart-product" value={selected} onChange={event => { setSelected(event.target.value); setHoveredDate(null); }}>
            {products.map(item => <option key={`${item.product}|${item.level}|${item.unit}`} value={`${item.product}|${item.level}|${item.unit}`}>{item.product} · {item.level}</option>)}
          </select>
          <div className="chart-ranges" role="group" aria-label="Rentang waktu">
            {([7, 30, 0] as const).map(value => <button type="button" key={value} aria-pressed={range === value} onClick={() => { setRange(value); setHoveredDate(null); }}>{value ? `${value}H` : "Semua"}</button>)}
          </div>
        </div>
      </div>
      <div className="chart-summary">
        <div><span>HARGA TERAKHIR</span><strong>Rp {rupiah.format(latest.price)}<small> /{active.unit}</small></strong><time dateTime={latest.date}>Data {latest.date}</time></div>
        <div><span>PERUBAHAN PERIODE</span><strong className={difference > 0 ? "trend-up" : difference < 0 ? "trend-down" : ""}>{difference > 0 ? "+" : difference < 0 ? "−" : ""}Rp {rupiah.format(Math.abs(difference))}</strong><span>{first.date} – {latest.date}</span></div>
        <div><span>RENTANG HARGA</span><strong>Rp {rupiah.format(min)} – {rupiah.format(max)}</strong><span>{points.length} tanggal tersedia · {active.level}</span></div>
      </div>
      <div className="chart-plot">
        <svg viewBox="0 0 780 275" role="img" aria-labelledby="plot-title plot-desc" preserveAspectRatio="xMidYMid meet" onPointerMove={onChartPointerMove} onPointerLeave={() => setHoveredDate(null)}>
          <title id="plot-title">Grafik harga {active.product}</title>
          <desc id="plot-desc">{points.length} tanggal dari {first.date} sampai {latest.date}. Terendah Rp {rupiah.format(min)}, tertinggi Rp {rupiah.format(max)} per {active.unit}. Detail tersedia pada tabel di bawah.</desc>
          <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6fd88a" stopOpacity=".33"/><stop offset="100%" stopColor="#6fd88a" stopOpacity="0"/></linearGradient></defs>
          {[0, .5, 1].map(fraction => <g key={fraction}><line x1="62" x2="734" y1={225 - fraction * 180} y2={225 - fraction * 180} stroke="currentColor" opacity=".18" strokeDasharray="4 6"/><text x="54" y={229 - fraction * 180} textAnchor="end" fill="currentColor" fontSize="11">{rupiah.format(Math.round(low + fraction * (high - low)))}</text></g>)}
          {points.length > 1 && <path d={`${path} L${x(points.length - 1)} 225 L${x(0)} 225 Z`} fill="url(#chart-fill)" />}
          <path d={path} fill="none" stroke="#6fd88a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
          {points.map((item, index) => <circle key={item.date} cx={x(index)} cy={y(item.price)} r={index === points.length - 1 ? 5 : 3} fill="#6fd88a" stroke="#071612" strokeWidth="2"><title>{item.date}: Rp {rupiah.format(item.price)}/{active.unit}</title></circle>)}
          {hovered && <g className="chart-hover" pointerEvents="none">
            <line x1={x(hoveredIndex)} x2={x(hoveredIndex)} y1="45" y2="225" stroke="#6fd88a" strokeDasharray="4 5" opacity=".8" />
            <circle cx={x(hoveredIndex)} cy={y(hovered.price)} r="7" fill="#6fd88a" stroke="#071612" strokeWidth="3" />
          </g>}
          <text x="62" y="258" fill="currentColor" fontSize="12">{dateLabel(first.date)}</text><text x="734" y="258" textAnchor="end" fill="currentColor" fontSize="12">{dateLabel(latest.date)}</text>
        </svg>
        {hovered && <div className="chart-tooltip" style={{ left: `${Math.min(79, Math.max(21, x(hoveredIndex) / 780 * 100))}%` }} role="status">
          <time dateTime={hovered.date}>{hovered.date}</time><strong>Rp {rupiah.format(hovered.price)} /{active.unit}</strong>
        </div>}
      </div>
      <div className="chart-bottom"><span>{active.level} · Sumber: <a href={latest.source} target="_blank" rel="noopener noreferrer">Sun Egg ↗</a></span><span>Grafik mengikuti tanggal data, bukan waktu pengambilan.</span></div>
      <details className="chart-data"><summary>Lihat data dalam tabel ({points.length} tanggal)</summary><div className="chart-table-scroll"><table><caption>Riwayat {active.product}, {active.level}, rupiah per {active.unit}</caption><thead><tr><th scope="col">Tanggal</th><th scope="col">Harga (Rp/{active.unit})</th></tr></thead><tbody>{points.map(item => <tr key={item.date}><td><time dateTime={item.date}>{item.date}</time></td><td>{rupiah.format(item.price)}</td></tr>)}</tbody></table></div></details>
    </section>
  );
}
