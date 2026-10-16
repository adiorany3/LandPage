"use client";

import { dayKey, dayLabel, relativeLabel } from "@/lib/dates";
import { useEffect, useMemo, useState } from "react";

const RANGES = [
  { key: "all", label: "Semua", days: null },
  { key: "7", label: "7 hari", days: 7 },
  { key: "30", label: "30 hari", days: 30 }
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

export type FeedItem = { title: string; link: string; published: string; source: string; excerpt?: string };

export default function NewsFilters({ items }: { items: FeedItem[] }) {
  const [range, setRange] = useState<RangeKey>("all");
  const [day, setDay] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  const active = RANGES.find((option) => option.key === range);
  const available = useMemo(
    () => [...new Set(items.map((item) => dayKey(item.published)).filter(Boolean))].sort().reverse(),
    [items]
  );
  const sources = useMemo(() => [...new Set(items.map((item) => item.source).filter(Boolean))].sort(), [items]);
  const visible = useMemo(() => {
    const cutoff = active?.days ? now - active.days * 86400000 : null;
    return items.filter((item) => {
      const time = Date.parse(item.published);
      if (!Number.isFinite(time)) return false;
      if (cutoff && time < cutoff) return false;
      if (source && item.source !== source) return false;
      return !day || dayKey(item.published) === day;
    });
  }, [active, day, items, now, source]);
  const groups = useMemo(() => {
    const map = new Map<string, FeedItem[]>();
    for (const item of visible) {
      const key = dayKey(item.published);
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [visible]);

  return (
    <>
      <div className="news-filters">
        <div className="news-filter-row" role="group" aria-label="Rentang waktu berita">
          {RANGES.map((option) => (
            <button key={option.key} type="button" className={option.key === range ? "active" : ""} aria-pressed={option.key === range} onClick={() => { setRange(option.key); setDay(null); setSource(null); }}>
              {option.label}
            </button>
          ))}
        </div>
        {available.length > 1 && (
          <div className="news-filter-row" role="group" aria-label="Saring berdasarkan hari">
            {available.map((option) => (
              <button key={option} type="button" className={day === option ? "active" : ""} aria-pressed={day === option} onClick={() => setDay(day === option ? null : option)}>
                {dayLabel(`${option}T00:00:00`)}
              </button>
            ))}
          </div>
        )}
        {sources.length > 1 && (
          <div className="news-filter-row" role="group" aria-label="Saring berdasarkan sumber">
            {sources.map((option) => (
              <button key={option} type="button" className={source === option ? "active" : ""} aria-pressed={source === option} onClick={() => setSource(source === option ? null : option)}>
                {option}
              </button>
            ))}
          </div>
        )}
        <p className="news-filter-count" aria-live="polite">{visible.length} dari {items.length} berita</p>
      </div>
      <div className="blog-grid">
        {groups.map(([date, group]) => (
          <section className="news-day-group" key={date}>
            <h3 className="news-day-label">{dayLabel(`${date}T00:00:00`)}</h3>
            <div className="news-day-list">
              {group.map((item) => (
                <article className="blog-card" key={`${item.title}-${item.link}`}>
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    headline: item.title,
                    url: item.link,
                    datePublished: new Date(item.published).toISOString(),
                    articleSection: "Berita terkait",
                    inLanguage: "id-ID"
                  }).replace(/</g, "\\u003c") }} />
                  <span className="journal-label">
                    {item.source}
                    {Number.isFinite(Date.parse(item.published)) && <> · <time dateTime={new Date(item.published).toISOString()}>{relativeLabel(item.published, now)}</time></>}
                  </span>
                  <h4><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></h4>
                  {item.excerpt && <p>{item.excerpt}</p>}
                  <a className="news-card-cta" href={item.link} target="_blank" rel="noopener noreferrer">Baca berita ↗</a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
