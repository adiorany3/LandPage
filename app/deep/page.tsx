import Link from "next/link";

export const dynamic = "force-static";

export default function DeepPage() {
  return (
    <main style={{ width: "100%", height: "100dvh", display: "flex", flexDirection: "column" }}>
      <nav aria-label="Navigasi utama" style={{ padding: "12px 20px" }}>
        <Link href="/">Home</Link>
      </nav>
      <iframe
        src="https://udify.app/chat/K12CskGI7xphyRGA"
        title="Adioranye Deep Search"
        style={{ width: "100%", flex: 1, minHeight: 0, border: 0, display: "block" }}
        allow="microphone;clipboard-write"
      />
    </main>
  );
}
