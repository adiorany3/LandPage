import ExcelJS from "exceljs";
import { getPriceHistory } from "@/lib/price-export";

export const runtime = "nodejs";

export async function GET() {
  const records = await getPriceHistory();
  if (!records.length) return new Response("Arsip harga belum tersedia. Coba lagi nanti.", { status: 503 });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Riwayat harga");
  sheet.columns = [
    { header: "Produk", key: "product", width: 38 },
    { header: "Jenis harga", key: "level", width: 22 },
    { header: "Tanggal data", key: "date", width: 17 },
    { header: "Harga (Rp)", key: "price", width: 20 },
    { header: "Satuan", key: "unit", width: 14 },
    { header: "Sumber", key: "source", width: 70 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.autoFilter = { from: "A1", to: "F1" };
  for (const record of records) sheet.addRow(record);
  sheet.getColumn("price").numFmt = "#,##0";
  const bytes = await workbook.xlsx.writeBuffer();
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="arsip-harga-peternakan.xlsx"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
