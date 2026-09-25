import Link from "next/link";

export default function JanjianPage() {
  return (
    <main style={{ width: "100%", height: "100dvh", display: "flex", flexDirection: "column" }}>
      <nav aria-label="Navigasi utama" style={{ padding: "12px 20px", display: "flex", justifyContent: "flex-start" }}>
        <Link className="btn" href="/">Home</Link>
      </nav>
      <iframe
        src="https://cal.com/galuh-adi-insani/30min?layout=month_view"
        title="Janjian dengan Galuh Adi Insani"
        style={{ width: "100%", flex: 1, minHeight: 0, border: 0, display: "block" }}
      />
    </main>
  );
}
