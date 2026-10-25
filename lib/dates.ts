export const TZ = "Asia/Jakarta";

// Tanggal berita selalu dibaca dalam zona waktu pembaca, bukan zona waktu server.
function toJakarta(date: Date) {
  return new Date(date.toLocaleString("en-US", { timeZone: TZ }));
}

// Kunci hari harus dibangun dari objek Date. Mem-parsing potongan string tanggal
// (mis. hasil slice) bisa menghasilkan tahun default 2001 pada input tidak lengkap.
export function dayKey(value: string) {
  const date = toJakarta(new Date(value));
  if (!Number.isFinite(date.getTime())) return "";
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

export function dayLabel(iso: string, referenceNow = Date.now()) {
  const sourceDate = new Date(iso);
  if (!Number.isFinite(sourceDate.getTime())) return "";
  const date = toJakarta(sourceDate);
  const today = toJakarta(new Date(referenceNow));
  const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  const diff = Math.round((startOfDay(today) - startOfDay(date)) / 86400000);
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Kemarin";
  return sourceDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: TZ });
}

// Selisih terhadap waktu sekarang, supaya berita baru terbaca "2 jam lalu" bukan tanggal absolut.
export function relativeLabel(iso: string, now: number) {
  const time = Date.parse(iso);
  if (!Number.isFinite(time)) return "";
  const minutes = Math.round((now - time) / 60000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return dayLabel(iso, now);
}