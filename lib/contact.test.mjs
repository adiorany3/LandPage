import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import QRCode from "qrcode";

const source = readFileSync(new URL("../components/ContactCard.tsx", import.meta.url), "utf8");
const lines = JSON.parse(source.match(/const vcard = (\[[\s\S]*?\])/)[1]);
const vcard = lines.join("\r\n");
assert.equal(lines[0], "BEGIN:VCARD");
assert.equal(lines[1], "VERSION:3.0");
assert.equal(lines.at(-2), "END:VCARD");
assert.equal(lines.at(-1), "");
assert.ok(lines.includes("TEL;TYPE=CELL:+6285155050769"));
assert.ok(lines.includes("FN:Galuh Adi Insani"));
assert.ok(!source.slice(source.indexOf("return (")).includes("085155050769"));
assert.ok(!source.slice(source.indexOf("return (")).includes("+6285155050769"));
const qr = QRCode.create(vcard, { errorCorrectionLevel: "M" });
assert.ok(qr.modules.size > 0);
assert.match(await QRCode.toDataURL(vcard), /^data:image\/png;base64,/);
console.log("Contact vCard and QR generation checks passed");
