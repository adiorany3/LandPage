export const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "GitHub", href: "#github" },
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
      "Web app formulasi ransum ruminansia untuk manual formulation, optimasi linear programming, evaluasi nutrisi real-time, analisis mineral, dan kalkulasi biaya.",
    tags: ["Python", "Streamlit", "Optimization", "Livestock"],
    repo: "https://github.com/adiorany3/ransumruminansia",
    image: "/assets/visual-ruminant.svg",
    alt: "Ilustrasi dashboard formulasi ransum ruminansia"
  },
  {
    name: "ransumsapiperah",
    eyebrow: "Dairy Nutrition",
    description:
      "Tool optimasi ransum sapi perah untuk menghitung kebutuhan nutrien, menyusun formula pakan, dan mencari komposisi least-cost.",
    tags: ["Linear Programming", "Dairy", "Feed"],
    repo: "https://github.com/adiorany3/ransumsapiperah",
    image: "/assets/visual-dairy.svg",
    alt: "Ilustrasi dashboard optimasi ransum sapi perah"
  },
  {
    name: "karkas",
    eyebrow: "Livestock Calculator",
    description:
      "Kalkulator estimasi karkas dan non-karkas ternak Indonesia berbasis rumus ilmiah, dibuat untuk workflow produksi yang lebih praktis.",
    tags: ["Calculator", "Livestock", "Formula"],
    repo: "https://github.com/adiorany3/karkas",
    image: "/assets/visual-carcass.svg",
    alt: "Ilustrasi kalkulator estimasi karkas dan non-karkas ternak"
  },
  {
    name: "OneWay",
    eyebrow: "Statistical Analysis",
    description:
      "Aplikasi One-Way ANOVA dengan post-hoc testing, effect size, assumption testing, boxplot, distribusi, dan interpretasi hasil.",
    tags: ["ANOVA", "Post-hoc", "Visualization"],
    repo: "https://github.com/adiorany3/OneWay",
    image: "/assets/visual-anova.svg",
    alt: "Ilustrasi One-Way ANOVA dengan boxplot dan distribusi"
  },
  {
    name: "TwoWay",
    eyebrow: "Research Analysis",
    description:
      "Two-Way ANOVA untuk interaction effect, Tukey HSD, eta-squared, import data, visualisasi, dan export laporan.",
    tags: ["Factorial", "Eta-squared", "Export"],
    repo: "https://github.com/adiorany3/TwoWay",
    image: "/assets/visual-factorial.svg",
    alt: "Ilustrasi Two-Way ANOVA dengan heatmap interaksi faktor"
  },
  {
    name: "ttest",
    eyebrow: "Statistical Testing",
    description:
      "App analisis One-Sample dan Independent T-Test dengan effect size, confidence interval, visualisasi, dan interpretasi yang mudah dibaca.",
    tags: ["T-Test", "Effect Size", "CI"],
    repo: "https://github.com/adiorany3/ttest",
    image: "/assets/visual-ttest.svg",
    alt: "Ilustrasi T-Test dengan perbandingan dua sampel dan confidence interval"
  }
];

export const workflow = [
  {
    step: "01",
    title: "Map the domain",
    description: "Pahami rumus, satuan, dataset, batasan, dan kebutuhan pengguna lapangan."
  },
  {
    step: "02",
    title: "Build the engine",
    description: "Ubah workflow domain menjadi kalkulasi, optimasi, dan validasi yang konsisten."
  },
  {
    step: "03",
    title: "Design the interface",
    description: "Buat input, output, visualisasi, dan laporan yang rapi serta tidak bikin pengguna mikir keras."
  },
  {
    step: "04",
    title: "Ship & iterate",
    description: "Deploy ke platform web, dokumentasikan, lalu perbaiki berdasarkan penggunaan nyata."
  }
];

export const stack = [
  "Pandas",
  "NumPy",
  "SciPy",
  "Statsmodels",
  "Plotly",
  "GitHub Actions",
  "Vercel",
  "Streamlit Cloud"
];

export const links = [
  { label: "GitHub", href: "https://github.com/adiorany3" },
  { label: "Portfolio", href: "https://adioranye.vercel.app" },
  { label: "Chat", href: "https://ngobrol.streamlit.app" },
  { label: "Blog", href: "https://catataninsani.wordpress.com" }
];
