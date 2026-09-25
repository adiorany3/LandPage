import { ImageResponse } from "next/og";

export const alt = "Galuh Adi Insani — Inovasi Peternakan dan AgriTech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#10251f", color: "#ffffff", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 28, color: "#86efac", marginBottom: 28 }}>ADIORANYE • AGRITECH</div>
      <div style={{ fontSize: 72, fontWeight: 700 }}>Galuh Adi Insani</div>
      <div style={{ fontSize: 38, marginTop: 28 }}>Inovasi Peternakan & Komputasi Ilmiah</div>
      <div style={{ fontSize: 25, marginTop: 40, color: "#bbd5ca" }}>Ransum Ruminansia · Formulasi Pakan · Analisis Statistik</div>
      <div style={{ fontSize: 23, marginTop: 40, color: "#86efac" }}>www.adioranye.my.id</div>
    </div>,
    size
  );
}
