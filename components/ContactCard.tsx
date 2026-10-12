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
  "URL:https://www.adioranye.my.id/",
  "END:VCARD",
  ""
].join("\r\n");

export default async function ContactCard() {
  const qr = await QRCode.toDataURL(vcard, { width: 360, margin: 4, errorCorrectionLevel: "M" });
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <p className={styles.label}>KARTU KONTAK / DIGITAL</p>
        <h3>Galuh Adi Insani</h3>
        <p className={styles.role}>AgriTech &amp; Scientific Computing</p>
        <p className={styles.organization}>Universitas Gadjah Mada</p>
        <div className={styles.channels}>
          <a href="mailto:adioranye@ugm.ac.id"><span>Email</span>adioranye@ugm.ac.id</a>
          <a href="https://www.adioranye.my.id/"><span>Website</span>www.adioranye.my.id</a>
        </div>
        <a className={styles.save} href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`} download="galuh-adi-insani.vcf">Simpan kontak <span aria-hidden="true">↓</span></a>
      </div>
      <figure className={styles.qr}>
        <div className={styles.qrFrame}><Image src={qr} alt="QR kartu kontak Galuh Adi Insani" width={360} height={360} unoptimized /></div>
        <figcaption>Pindai QR untuk menyimpan kontak di ponsel.</figcaption>
      </figure>
    </div>
  );
}
