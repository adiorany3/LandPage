export const academicUrl = "https://acadstaff.ugm.ac.id/galuhadiinsani";

const fallback = {
  name: "Ir. Galuh Adi Insani, S.Pt., M.Sc., IPM.",
  faculty: "Faculty of Animal Science",
  address: "Fakultas Peternakan UGM, Jl. Fauna No. 3, Kampus UGM, Bulaksumur, Yogyakarta, 55281",
  sections: [
    { title: "Bidang keahlian", items: ["Agricultural and Veterinary Sciences / Genetic and Animal Breeding / Animal Genetics and Production"] },
    { title: "Pendidikan", items: ["Master, Ilmu Peternakan, Fakultas Peternakan UGM, Indonesia, 01/2009–01/2011", "Undergraduate, Produksi Ternak, Fakultas Peternakan UGM, Indonesia, 09/2002–11/2007"] },
    { title: "Kelompok riset", items: ["Poultry Breeding, Animal Breeding / Bioinformatics, Recording / Big Data Analysis", "Science Data Sciencecluster - Science technology"] },
    { title: "Minat riset", items: ["Animal Genetics, Bioinformatics, Data Analysis, Genetics Poultry"] }
  ]
};

function text(html: string) {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
      if (!code.startsWith("#")) return entities[code.toLowerCase()] ?? entity;
      const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : "�";
    }).replace(/\s+/g, " ").trim();
}

export function parseAcademicProfile(header: string, details: string) {
  // ponytail: parser khusus markup Acadstaff; beralih ke parser DOM bila struktur sumber berubah.
  const name = text(header.match(/<h4 class="fw-bold text-darkblue">([\s\S]*?)<\/h4>/)?.[1] ?? "");
  const fields = [...header.matchAll(/<div class="hstack gap-3 text-darkblue mb-1">([\s\S]*?)<\/div>/g)].map(match => text(match[1]));
  const titles: Record<string, string> = {
    "AREA OF EXPERTISE (DIVISION / GROUP / FIELD)": "Bidang keahlian",
    "EDUCATION BACKGROUND": "Pendidikan",
    "RESEARCH CLUSTER/GROUP": "Kelompok riset",
    "RESEARCH INTEREST": "Minat riset",
    "SCHOLARSHIP": "Beasiswa",
    "WORK EXPERIENCE": "Pengalaman",
    "COMPETENCE/ CERTIFICATION": "Pelatihan dan sertifikasi"
  };
  const sections = [...details.matchAll(/<div class="card-title">([^<]+)<\/div>[\s\S]*?<div class="card-body">([\s\S]*?)<\/div>/g)]
    .flatMap(([, heading, body]) => {
      const title = titles[text(heading)];
      const paragraphs = [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(match => text(match[1]));
      const items = (paragraphs.length ? paragraphs : [text(body)]).filter(Boolean);
      return title && items.length ? [{ title, items }] : [];
    });
  if (!name.includes("Galuh Adi Insani") || !fields[0] || !fields[1] || !sections.some(section => section.title === "Pendidikan") || !sections.some(section => section.title === "Minat riset")) {
    throw new Error("Struktur profil Acadstaff tidak valid");
  }
  return { name, faculty: fields[0], address: fields[1], sections };
}

export async function getAcademicProfile() {
  try {
    const options = { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) };
    const responses = await Promise.all([
      fetch(academicUrl, options),
      fetch("https://acadstaff.ugm.ac.id/ajax-tab-detail", {
        ...options,
        method: "POST",
        body: new URLSearchParams({ nickname: "GaluhAdIInsani", tab: "profile" })
      })
    ]);
    if (responses.some(response => !response.ok)) throw new Error("Acadstaff tidak tersedia");
    const [header, details] = await Promise.all(responses.map(response => response.text()));
    if (header.length > 1_000_000 || details.length > 1_000_000) throw new Error("Respons Acadstaff terlalu besar");
    return { ...parseAcademicProfile(header, details), live: true };
  } catch (error) {
    console.warn("Pembaruan profil Acadstaff gagal; memakai data cadangan.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return { ...fallback, live: false };
  }
}
