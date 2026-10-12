import assert from "node:assert/strict";
import { parseCommodityHistory } from "./price-history.ts";

const source = "https://sunegg.id/harga-komoditas/telur-ayam-ras";
const chart = String.raw`initialChartData\":[{\"date\":\"2026-10-11\",\"dateLabel\":\"11 Okt\",\"price\":27834},{\"date\":\"2026-10-12\",\"price\":28000},{\"date\":\"2026-02-30\",\"price\":42},{\"date\":\"2026-10-10\",\"price\":-1}],\"initialStats\":{}`;
assert.deepEqual(parseCommodityHistory(chart, "Telur", "Eceran", "kg", source), [
  { product: "Telur", level: "Eceran", date: "2026-10-11", price: 27834, unit: "kg", source },
  { product: "Telur", level: "Eceran", date: "2026-10-12", price: 28000, unit: "kg", source },
]);
assert.deepEqual(parseCommodityHistory("markup berubah", "Telur", "Eceran", "kg", source), []);
console.log("Price export history checks passed");
