export type ProjectCategory = "AgriTech" | "Statistics" | "AI & Vision" | "Web & Tools";

export type GitHubProject = {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string;
  topics: string[];
  updatedAt: string;
  stars: number;
  forks: number;
  featured: boolean;
  category: ProjectCategory;
};

type GitHubRepositoryResponse = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
};

type GitHubUserResponse = {
  public_repos: number;
};

export type GitHubPortfolio = {
  projects: GitHubProject[];
  totalRepositories: number;
  source: "github" | "fallback";
};

const featuredNames = new Set([
  "ransumruminansia",
  "OneWay",
  "ransumsapiperah",
  "ttest",
  "TwoWay",
  "karkas"
]);

const knownDescriptions: Record<string, string> = {
  LandPage: "Landing page portfolio modern untuk menampilkan produk riset, profil GitHub, dan karya open-source.",
  AdIoranye: "Ruang pengembangan utama untuk eksperimen aplikasi, otomasi, dan produk digital Adioranye.",
  ConvertYAML: "Utilitas untuk membantu konversi dan pengolahan data berformat YAML.",
  "sembako-dashboard": "Dashboard monitoring Flask untuk sembako, aset kripto, emas, dan komoditas pertanian.",
  statistika: "Kumpulan alat dan eksperimen analisis statistik berbasis Python.",
  SumberYAML: "Repository sumber dan pengelolaan data YAML untuk mendukung workflow aplikasi.",
  BeritaHariIni: "Aplikasi Python untuk mengumpulkan dan menyajikan informasi berita terkini.",
  BirdnetStreamlit: "Aplikasi Streamlit untuk workflow identifikasi dan analisis suara burung.",
  AntiTrust: "Eksperimen aplikasi Python untuk analisis dan pengujian berbasis data.",
  LokasiTernak: "Aplikasi pemetaan lokasi dan data peternakan untuk mendukung keputusan lapangan.",
  FruitDetection: "Eksperimen computer vision untuk mendeteksi objek buah pada citra.",
  DNAclassification: "Notebook klasifikasi data DNA untuk eksplorasi machine learning dan bioinformatika.",
  ObjectDetection: "Toolkit eksperimen object detection berbasis Python.",
  AbnormalSperm: "Eksperimen computer vision untuk klasifikasi dan deteksi abnormalitas sperma.",
  FaceDetection: "Aplikasi deteksi wajah berbasis computer vision.",
  steganografi: "Eksperimen penyisipan dan pembacaan informasi menggunakan teknik steganografi.",
  PitchingFormat: "Utilitas Python untuk menyiapkan dan menata materi pitching secara terstruktur.",
  BiogasDetection: "Eksperimen deteksi dan analisis data biogas berbasis Python.",
  MilkPrediction: "Model prediksi produksi atau karakteristik susu berbasis data.",
  PlantDesease: "Eksperimen deteksi penyakit tanaman menggunakan computer vision.",
  deteksiayam: "Eksperimen deteksi ayam pada citra menggunakan Python.",
  kentang: "Eksperimen aplikasi dan analisis data untuk komoditas kentang.",
  ScabDetection: "Eksperimen deteksi gejala scab pada citra tanaman.",
  AutoReboot: "Script Shell untuk otomasi restart dan pemeliharaan layanan.",
  EvaluasiTernak: "Alat evaluasi data ternak untuk membantu analisis performa dan keputusan produksi.",
  bbternak: "Aplikasi pengolahan data bobot badan ternak berbasis Python.",
  chatdev: "Eksperimen asisten percakapan untuk kebutuhan pengembangan perangkat lunak.",
  chatternak: "Asisten percakapan untuk akses informasi dan workflow peternakan.",
  SysReview: "Tool pendukung systematic review dan pengelolaan literatur penelitian.",
  ransumruminansia: "Software formulasi pakan ruminansia untuk evaluasi nutrien, keseimbangan ransum, dan optimasi biaya.",
  ransumsapiperah: "Software perencanaan nutrisi dan formulasi pakan sapi perah.",
  OneWay: "Aplikasi One-Way ANOVA dengan uji lanjut, effect size, visualisasi, dan interpretasi hasil.",
  TwoWay: "Aplikasi Two-Way ANOVA untuk desain faktorial, interaction effect, dan interpretasi data.",
  ttest: "Aplikasi T-Test dengan confidence interval, effect size, dan laporan statistik.",
  karkas: "Kalkulator estimasi karkas dan komponen non-karkas ternak berbasis rumus ilmiah."
};

const fallbackRows: Array<{
  name: string;
  language?: string;
  updatedAt: string;
  stars?: number;
  forks?: number;
}> = [
  { name: "LandPage", language: "TypeScript", updatedAt: "2026-07-11T00:00:00Z" },
  { name: "AdIoranye", language: "Python", updatedAt: "2026-07-11T00:00:00Z" },
  { name: "ConvertYAML", language: "Python", updatedAt: "2026-07-10T00:00:00Z", stars: 1 },
  { name: "sembako-dashboard", language: "Python", updatedAt: "2026-07-10T00:00:00Z" },
  { name: "statistika", language: "Python", updatedAt: "2026-07-09T00:00:00Z" },
  { name: "SumberYAML", language: "Python", updatedAt: "2026-07-08T00:00:00Z" },
  { name: "BeritaHariIni", language: "Python", updatedAt: "2026-06-28T00:00:00Z" },
  { name: "BirdnetStreamlit", language: "Python", updatedAt: "2026-06-22T00:00:00Z" },
  { name: "AntiTrust", language: "Python", updatedAt: "2026-06-21T00:00:00Z" },
  { name: "LokasiTernak", language: "Python", updatedAt: "2026-06-18T00:00:00Z" },
  { name: "FruitDetection", language: "Python", updatedAt: "2026-06-12T00:00:00Z" },
  { name: "DNAclassification", language: "Jupyter Notebook", updatedAt: "2026-06-12T00:00:00Z" },
  { name: "ObjectDetection", language: "Python", updatedAt: "2026-06-10T00:00:00Z" },
  { name: "AbnormalSperm", language: "Python", updatedAt: "2026-06-08T00:00:00Z" },
  { name: "FaceDetection", language: "Python", updatedAt: "2026-06-08T00:00:00Z" },
  { name: "steganografi", language: "Python", updatedAt: "2026-06-05T00:00:00Z" },
  { name: "PitchingFormat", language: "Python", updatedAt: "2026-06-05T00:00:00Z" },
  { name: "BiogasDetection", language: "Python", updatedAt: "2026-06-03T00:00:00Z" },
  { name: "MilkPrediction", language: "Python", updatedAt: "2026-06-03T00:00:00Z" },
  { name: "PlantDesease", language: "Python", updatedAt: "2026-06-02T00:00:00Z" },
  { name: "deteksiayam", language: "Python", updatedAt: "2026-06-02T00:00:00Z" },
  { name: "kentang", language: "Python", updatedAt: "2026-06-02T00:00:00Z" },
  { name: "ScabDetection", language: "Python", updatedAt: "2026-06-01T00:00:00Z" },
  { name: "AutoReboot", language: "Shell", updatedAt: "2026-05-31T00:00:00Z" },
  { name: "EvaluasiTernak", language: "Python", updatedAt: "2026-05-26T00:00:00Z" },
  { name: "bbternak", language: "Python", updatedAt: "2026-05-26T00:00:00Z" },
  { name: "chatdev", language: "Python", updatedAt: "2026-05-24T00:00:00Z" },
  { name: "chatternak", language: "Python", updatedAt: "2026-05-20T00:00:00Z" },
  { name: "SysReview", language: "Python", updatedAt: "2026-05-19T00:00:00Z" },
  { name: "ChatSecrets", language: "Python", updatedAt: "2026-05-19T00:00:00Z" },
  { name: "Bibliografi", language: "Python", updatedAt: "2026-05-17T00:00:00Z" },
  { name: "inbreed", language: "Python", updatedAt: "2026-05-13T00:00:00Z" },
  { name: "PushToTalk", language: "Python", updatedAt: "2026-05-11T00:00:00Z" },
  { name: "HargaTelur", language: "Python", updatedAt: "2026-05-11T00:00:00Z" },
  { name: "sentimen", language: "Python", updatedAt: "2026-05-11T00:00:00Z" },
  { name: "PakanAyamKampung", language: "Python", updatedAt: "2026-05-10T00:00:00Z" },
  { name: "SpermDetect", language: "Python", updatedAt: "2026-05-09T00:00:00Z" },
  { name: "ProtozoaDetect", language: "Python", updatedAt: "2026-05-09T00:00:00Z" },
  { name: "deteksitelur", language: "Python", updatedAt: "2026-05-09T00:00:00Z" },
  { name: "CariBuku", language: "HTML", updatedAt: "2026-05-04T00:00:00Z" },
  { name: "ransum", language: "Python", updatedAt: "2026-04-20T00:00:00Z" },
  { name: "trace", language: "Python", updatedAt: "2026-03-28T00:00:00Z" },
  { name: "Sp0t", language: "Repository", updatedAt: "2026-03-27T00:00:00Z" },
  { name: "ransumsapiperah", language: "Python", updatedAt: "2026-01-20T00:00:00Z" },
  { name: "DorkGoogle", language: "Python", updatedAt: "2026-01-17T00:00:00Z" },
  { name: "adioranye-portfolio", language: "TypeScript", updatedAt: "2026-01-11T00:00:00Z" },
  { name: "MoleculeDocker", language: "Python", updatedAt: "2025-12-10T00:00:00Z" },
  { name: "manajemenrecording", language: "Python", updatedAt: "2025-12-10T00:00:00Z" },
  { name: "analisaayamkampung", language: "Python", updatedAt: "2025-10-18T00:00:00Z" },
  { name: "klasifikasi", language: "Python", updatedAt: "2025-10-06T00:00:00Z" },
  { name: "ransumruminansia", language: "Python", updatedAt: "2025-08-30T00:00:00Z" },
  { name: "TwoWay", language: "Python", updatedAt: "2025-07-05T00:00:00Z" },
  { name: "IoTnProd", language: "Python", updatedAt: "2025-07-01T00:00:00Z" },
  { name: "IoTData", language: "Python", updatedAt: "2025-06-18T00:00:00Z" },
  { name: "ttest", language: "Python", updatedAt: "2025-06-03T00:00:00Z" },
  { name: "prediksiipbroiler", language: "Python", updatedAt: "2025-05-30T00:00:00Z" },
  { name: "analisadna", language: "Python", updatedAt: "2025-05-05T00:00:00Z" },
  { name: "kipasayam", language: "Python", updatedAt: "2025-04-28T00:00:00Z" },
  { name: "heatstress", language: "Python", updatedAt: "2025-04-28T00:00:00Z" },
  { name: "LKTI", language: "Python", updatedAt: "2025-04-25T00:00:00Z", forks: 1 },
  { name: "analisadata", language: "Python", updatedAt: "2025-04-24T00:00:00Z" },
  { name: "karkas", language: "Python", updatedAt: "2025-04-21T00:00:00Z", stars: 1 },
  { name: "cangkringan", language: "HTML", updatedAt: "2025-04-16T00:00:00Z" },
  { name: "OneWay", language: "Python", updatedAt: "2025-03-15T00:00:00Z" },
  { name: "enhance", language: "Python", updatedAt: "2025-02-27T00:00:00Z" },
  { name: "HeartAttack", language: "Python", updatedAt: "2025-02-27T00:00:00Z" },
  { name: "randomforestbroiler", language: "Python", updatedAt: "2025-02-27T00:00:00Z" }
];

function projectCategory(name: string, description = "", topics: string[] = []): ProjectCategory {
  const searchable = `${name} ${description} ${topics.join(" ")}`.toLowerCase();

  if (
    /(detection|detect|deteksi|classification|klasifikasi|prediction|prediksi|randomforest|vision|birdnet|face|sperm|dna|scab|desease|disease|object|sentimen|heart)/.test(
      searchable
    )
  ) {
    return "AI & Vision";
  }

  if (/(anova|ttest|t-test|statistik|statistic|review|bibliografi|analisadata|data analysis|factorial)/.test(searchable)) {
    return "Statistics";
  }

  if (
    /(ternak|ransum|sapi|karkas|dairy|feed|pakan|livestock|milk|biogas|ayam|telur|broiler|heatstress|inbreed|recording|kentang|plant|fruit|agri)/.test(
      searchable
    )
  ) {
    return "AgriTech";
  }

  return "Web & Tools";
}

function fallbackDescription(name: string, category: ProjectCategory): string {
  if (knownDescriptions[name]) return knownDescriptions[name];

  const categoryText: Record<ProjectCategory, string> = {
    AgriTech: "Repository pengembangan aplikasi dan analisis data untuk kebutuhan pertanian atau peternakan.",
    Statistics: "Repository alat analisis statistik dan workflow penelitian berbasis data.",
    "AI & Vision": "Repository eksperimen machine learning dan computer vision berbasis Python.",
    "Web & Tools": "Repository utilitas, otomasi, dan pengembangan aplikasi web."
  };

  return categoryText[category];
}

function toProject(repository: GitHubRepositoryResponse): GitHubProject {
  const topics = repository.topics ?? [];
  const category = projectCategory(repository.name, repository.description ?? "", topics);

  return {
    name: repository.name,
    description: repository.description?.trim() || fallbackDescription(repository.name, category),
    url: repository.html_url,
    homepage: repository.homepage?.trim() || null,
    language: repository.language || "Repository",
    topics,
    updatedAt: repository.updated_at,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    featured: featuredNames.has(repository.name),
    category
  };
}

function fallbackProjects(): GitHubProject[] {
  return fallbackRows.map((item) => {
    const category = projectCategory(item.name, knownDescriptions[item.name] ?? "");
    return {
      name: item.name,
      description: fallbackDescription(item.name, category),
      url: `https://github.com/adiorany3/${item.name}`,
      homepage: null,
      language: item.language ?? "Repository",
      topics: [],
      updatedAt: item.updatedAt,
      stars: item.stars ?? 0,
      forks: item.forks ?? 0,
      featured: featuredNames.has(item.name),
      category
    };
  });
}

function sortProjects(projects: GitHubProject[]): GitHubProject[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  });
}

export async function getGitHubPortfolio(): Promise<GitHubPortfolio> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "adioranye-landpage"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [repositoryResponse, userResponse] = await Promise.all([
      fetch("https://api.github.com/users/adiorany3/repos?per_page=100&sort=updated", {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(7000)
      }),
      fetch("https://api.github.com/users/adiorany3", {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(7000)
      })
    ]);

    if (!repositoryResponse.ok || !userResponse.ok) {
      throw new Error(`GitHub request failed: ${repositoryResponse.status}/${userResponse.status}`);
    }

    const repositories = (await repositoryResponse.json()) as GitHubRepositoryResponse[];
    const user = (await userResponse.json()) as GitHubUserResponse;

    const projects = repositories
      .filter((repository) => !repository.fork && !repository.archived && repository.name !== "adiorany3")
      .map(toProject);

    return {
      projects: sortProjects(projects),
      totalRepositories: user.public_repos,
      source: "github"
    };
  } catch {
    return {
      projects: sortProjects(fallbackProjects()),
      totalRepositories: 69,
      source: "fallback"
    };
  }
}
