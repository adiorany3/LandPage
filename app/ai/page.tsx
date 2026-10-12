import Link from "next/link";
import styles from "./page.module.css";

export default function AiPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Adioranye home">
          <span className={styles.brandMark}>A<span>.</span></span>
          <span><strong>ADIORANYE</strong><small>INTELLIGENCE SYSTEM</small></span>
        </Link>
        <div className={styles.headerStatus}><span /> AI SYSTEM ONLINE</div>
        <nav className={styles.navigation} aria-label="Navigasi utama">
          <Link href="/">Home</Link>
          <Link href="/download">Download aplikasi</Link>
        </nav>
      </header>
      <section className={styles.workspace} aria-label="Adioranye AI workspace">
        <div className={styles.panelTop}>
          <div><span className={styles.panelIcon}>✳</span><div><strong>ADIORANYE AI</strong><small>Research &amp; productivity assistant</small></div></div>
          <span className={styles.live}><i /> LIVE SESSION</span>
        </div>
        <iframe
          className={styles.chat}
          src="https://udify.app/chat/s8pa4tyZ2EdkN1Bf"
          title="Adioranye AI"
          allow="microphone;clipboard-write"
        />
        <div className={styles.panelFooter}><span>SECURE INTERFACE</span><span>POWERED BY ADIORANYE</span></div>
      </section>
      <footer className={styles.footer}><span>AGROTECH <b>·</b> DATA <b>·</b> AI</span><span>Use AI outputs as a starting point; verify critical information.</span></footer>
    </main>
  );
}
