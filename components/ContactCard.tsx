import Image from "next/image";
import QRCode from "qrcode";
import styles from "./ContactCard.module.css";

const vcard = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Insani;Galuh;Adi;;",
  "FN:Galuh Adi Insani",
  "ORG:Universitas Gadjah Mada",
  "EMAIL;TYPE=INTERNET:adioranye@ugm.ac.id",
  "TEL;TYPE=CELL:+6285155050769",
  "URL:https://adioranye.vercel.app/",
  "END:VCARD",
  ""
].join("\r\n");

export default async function ContactCard() {
  const qr = await QRCode.toDataURL(vcard, { width: 360, margin: 4, errorCorrectionLevel: "M" });
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <p className="eyebrow">Kartu kontak</p>
        <h3>Galuh Adi Insani</h3>
        <p>AgriTech &amp; Scientific Computing</p>
        <p>Universitas Gadjah Mada</p>
        <a href="mailto:adioranye@ugm.ac.id">adioranye@ugm.ac.id</a>
        <a href="https://adioranye.vercel.app/">adioranye.vercel.app</a>
        <a className="btn primary" href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`} download="galuh-adi-insani.vcf">Simpan kontak</a>
      </div>
      <figure className={styles.qr}>
        <Image src={qr} alt="QR kartu kontak Galuh Adi Insani" width={360} height={360} unoptimized />
        <figcaption>Pindai QR, lalu konfirmasi simpan kontak di ponsel.</figcaption>
      </figure>
    </div>
  );
}
