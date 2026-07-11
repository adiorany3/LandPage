export const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Profil", href: "#github" },
  { label: "Infografis", href: "#infografis" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" }
];

export const stats = [
  { value: "46", label: "Public repositories" },
  { value: "6", label: "Featured products" },
  { value: "Python", label: "Main research stack" }
];

export const products = [
  {
    name: "ransumruminansia",
    eyebrow: "AgriTech / Feed Optimization",
    description:
      "Web app formulasi ransum ruminansia untuk optimasi linear, evaluasi nutrisi, analisis mineral, dan kalkulasi biaya.",
    tags: ["Python", "Streamlit", "Optimization", "Livestock"],
    repo: "https://github.com/adiorany3/ransumruminansia",
    image: "/assets/visual-ruminant.svg",
    alt: "Dashboard formulasi ransum ruminansia"
  },
  {
    name: "ransumsapiperah",
    eyebrow: "Dairy Nutrition",
    description:
      "Tool optimasi ransum sapi perah untuk menghitung kebutuhan nutrien, menyusun formula pakan, dan mencari komposisi least-cost.",
    tags: ["Linear Programming", "Dairy", "Feed"],
    repo: "https://github.com/adiorany3/ransumsapiperah",
    image: "/assets/visual-dairy.svg",
    alt: "Dashboard optimasi ransum sapi perah"
  },
  {
    name: "karkas",
    eyebrow: "Livestock Calculator",
    description:
      "Kalkulator estimasi karkas dan non-karkas berbasis rumus ilmiah untuk mendukung workflow produksi yang praktis.",
    tags: ["Calculator", "Livestock", "Formula"],
    repo: "https://github.com/adiorany3/karkas",
    image: "/assets/visual-carcass.svg",
    alt: "Kalkulator estimasi karkas ternak"
  },
  {
    name: "OneWay",
    eyebrow: "Statistical Analysis",
    description:
      "Aplikasi One-Way ANOVA dengan post-hoc, effect size, assumption testing, visualisasi, dan interpretasi hasil.",
    tags: ["ANOVA", "Post-hoc", "Visualization"],
    repo: "https://github.com/adiorany3/OneWay",
    image: "/assets/visual-anova.svg",
    alt: "Visualisasi One-Way ANOVA"
  },
  {
    name: "TwoWay",
    eyebrow: "Research Analysis",
    description:
      "Two-Way ANOVA untuk interaction effect, Tukey HSD, eta-squared, impor data, visualisasi, dan ekspor laporan.",
    tags: ["Factorial", "Eta-squared", "Export"],
    repo: "https://github.com/adiorany3/TwoWay",
    image: "/assets/visual-factorial.svg",
    alt: "Visualisasi Two-Way ANOVA"
  },
  {
    name: "ttest",
    eyebrow: "Statistical Testing",
    description:
      "Analisis One-Sample dan Independent T-Test dengan effect size, confidence interval, dan interpretasi yang mudah dibaca.",
    tags: ["T-Test", "Effect Size", "CI"],
    repo: "https://github.com/adiorany3/ttest",
    image: "/assets/visual-ttest.svg",
    alt: "Visualisasi perbandingan dua sampel"
  }
];

export const workflow = [
  {
    step: "01",
    title: "Pahami domain",
    description: "Petakan rumus, satuan, dataset, batasan, dan kebutuhan pengguna."
  },
  {
    step: "02",
    title: "Bangun mesin hitung",
    description: "Ubah metode menjadi kalkulasi, optimasi, dan validasi yang konsisten."
  },
  {
    step: "03",
    title: "Rancang antarmuka",
    description: "Susun input, hasil, visualisasi, dan laporan agar cepat dipahami."
  },
  {
    step: "04",
    title: "Rilis dan evaluasi",
    description: "Deploy, dokumentasikan, lalu perbaiki berdasarkan penggunaan nyata."
  }
];

export const stack = [
  "Python",
  "Pandas",
  "NumPy",
  "SciPy",
  "Statsmodels",
  "Plotly",
  "Streamlit",
  "Next.js",
  "Vercel"
];

export const links = [
  { label: "GitHub", href: "https://github.com/adiorany3" },
  { label: "Portfolio", href: "https://adioranye.vercel.app" },
  { label: "Streamlit", href: "https://adioranye.streamlit.app" },
  { label: "Catatan Insani", href: "https://catataninsani.wordpress.com" }
];
