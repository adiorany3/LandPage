import assert from "node:assert/strict";
import { dayKey, dayLabel, relativeLabel } from "./dates.ts";

// dayKey harus dibangun dari objek Date; mem-parsing potongan string tanggal
// pernah menghasilkan tahun default 2001 pada sebagian input tidak lengkap.
assert.equal(dayKey("Fri, 16 Oct 2026 09:00:00 GMT"), "2026-10-16");
assert.equal(dayKey("2026-10-16T00:00:00"), "2026-10-16");
assert.equal(dayKey(""), "");
assert.equal(dayKey("bukan tanggal"), "");

// Zona waktu: 2026-10-15 18:00 UTC sudah 16 Oktober di WIB (+07:00).
assert.equal(dayKey("2026-10-15T18:00:00Z"), "2026-10-16");
assert.equal(dayKey("2026-10-15T16:00:00Z"), "2026-10-15");

const now = new Date("2026-10-16T09:00:00+07:00").getTime();
assert.equal(dayLabel("2026-10-16T00:00:00+07:00", now), "Hari ini");
assert.equal(dayLabel("2026-10-15T00:00:00+07:00", now), "Kemarin");
assert.equal(dayLabel("2026-10-14T00:00:00+07:00", now), "14 Oktober 2026");
assert.ok(!dayLabel("2026-10-15T00:00:00+07:00", now).includes("2001"));

assert.equal(relativeLabel("2026-10-16T08:59:40+07:00", now), "baru saja");
assert.equal(relativeLabel("2026-10-16T08:30:00+07:00", now), "30 menit lalu");
assert.equal(relativeLabel("2026-10-16T07:00:00+07:00", now), "2 jam lalu");
assert.equal(relativeLabel("2026-10-14T09:00:00+07:00", now), "2 hari lalu");
assert.equal(relativeLabel("2026-10-01T09:00:00+07:00", now), "1 Oktober 2026");
assert.equal(relativeLabel("bukan tanggal", now), "");

console.log("Date helper checks passed");