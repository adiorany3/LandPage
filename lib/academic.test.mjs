import assert from "node:assert/strict";
import { parseAcademicProfile } from "./academic.ts";

const header = '<h4 class="fw-bold text-darkblue">Ir. Galuh Adi Insani, S.Pt.</h4><div class="hstack gap-3 text-darkblue mb-1"><i></i>Faculty of Animal Science</div><div class="hstack gap-3 text-darkblue mb-1">Yogyakarta</div>';
const details = '<div class="card-title">EDUCATION BACKGROUND</div><div class="card-body"><p>Master &amp; Research</p><p>Undergraduate</p></div><div class="card-title">RESEARCH INTEREST</div><div class="card-body">Genetics &#38; Data</div>';
const profile = parseAcademicProfile(header, details);
assert.equal(profile.faculty, "Faculty of Animal Science");
assert.deepEqual(profile.sections[0].items, ["Master & Research", "Undergraduate"]);
assert.deepEqual(profile.sections[1].items, ["Genetics & Data"]);
assert.throws(() => parseAcademicProfile("", details));
assert.throws(() => parseAcademicProfile(header, "<html>Unavailable</html>"));
console.log("Academic profile checks passed");
