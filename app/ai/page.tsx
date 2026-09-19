export default function AiPage() {
  return (
    <main style={{ width: "100%", height: "100dvh", display: "flex", flexDirection: "column" }}>
      <nav aria-label="Navigasi utama" style={{ padding: "12px 20px" }}>
        <a href="/">Home</a>
      </nav>
      <iframe
        src="https://udify.app/chatbot/s8pa4tyZ2EdkN1Bf"
        title="Adioranye AI"
        style={{ width: "100%", flex: 1, minHeight: 0, border: 0, display: "block" }}
        allow="microphone;clipboard-write"
      />
    </main>
  );
}
