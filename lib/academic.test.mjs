import assert from "node:assert/strict";
import { parseAcademicProfile } from "./academic.ts";

const header = '<h4 class="fw-bold text-darkblue">Ir. Galuh Adi Insani, S.Pt., M.Sc., IPM.</h4><div class="hstack gap-3 text-darkblue mb-1"><i class="bi bi-building"></i>Faculty of Animal Science</div><div class="hstack gap-3 text-darkblue mb-1"><i class="bi bi-geo-alt"></i>Fakultas Peternakan UGM, Jl. Fauna No. 3, Kampus UGM, Bulaksumur, Yogyakarta, 55281</div>';
const details = '<div class="card-title">AREA OF EXPERTISE (DIVISION / GROUP / FIELD)</div><div class="card-body"><p>AGRICULTURAL AND VETERINARY SCIENCES/ GENETIC AND ANIMAL BREEDING/ ANIMAL GENETICS AND PRODUCTION</p></div><div class="card-title">EDUCATION BACKGROUND</div><div class="card-body"><p>Master, Ilmu Peternakan, Fakultas Peternakan UGM, Indonesia, 01/2009 - 01/2011</p><p>Undergraduate, Produksi Ternak, Fakultas Peternakan UGM, Indonesia, 09/2002 - 11/2007</p></div><div class="card-title">RESEARCH CLUSTER/GROUP</div><div class="card-body">Poultry Breeding, Animal Breeding / Bioinformatics, Recording / Big Data Analysis for Science and Data Sciencecluster - Science and technology</div><div class="card-title">RESEARCH INTEREST</div><div class="card-body">ANIMAL GENETICS, BIOINFORMATICS, DATA ANALYSIS, Data Science, GENETICS POULTRY</div>';
const profile = parseAcademicProfile(header, details);
assert.equal(profile.name, "Ir. Galuh Adi Insani, S.Pt., M.Sc., IPM.");
assert.equal(profile.faculty, "Faculty of Animal Science");
assert.match(profile.address, /Jl\. Fauna No\. 3/);
assert.deepEqual(profile.sections.map(section => section.title), ["Bidang keahlian", "Pendidikan", "Kelompok riset", "Minat riset"]);
assert.equal(profile.sections[1].items.length, 2);
assert.deepEqual(profile.sections[3].items, ["ANIMAL GENETICS, BIOINFORMATICS, DATA ANALYSIS, Data Science, GENETICS POULTRY"]);
assert.throws(() => parseAcademicProfile("", details));
assert.throws(() => parseAcademicProfile(header, "<html>Unavailable</html>"));
console.log("Academic profile checks passed");
