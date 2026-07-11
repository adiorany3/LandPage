export type Project = {
  name: string;
  eyebrow: string;
  description: string;
  tags: string[];
  repo: string;
  image: string;
  alt: string;
};

export const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'GitHub', href: '#github' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

export const stats = [
  { value: '46', label: 'Public repositories' },
  { value: '6', label: 'Featured products' },
  { value: 'Python', label: 'Main research stack' }
];

export const projects: Project[] = [
  {
    name: 'ransumruminansia',
    eyebrow: 'AgriTech / Feed Optimization',
    description: 'Web app formulasi ransum ruminansia untuk optimasi linear, evaluasi nutrisi real-time, analisis mineral, dan perhitungan biaya.',
    tags: ['Python', 'Streamlit', 'Optimization', 'Livestock'],
    repo: 'https://github.com/adiorany3/ransumruminansia',
    image: '/assets/visual-ruminant.svg',
    alt: 'Ilustrasi dashboard formulasi ransum ruminansia'
  },
  {
    name: 'ransumsapiperah',
    eyebrow: 'Dairy Nutrition',
    description: 'Tool optimasi ransum sapi perah untuk menghitung kebutuhan nutrien, menyusun formula pakan, dan mencari komposisi least-cost.',
    tags: ['Linear Programming', 'Dairy', 'Feed'],
    repo: 'https://github.com/adiorany3/ransumsapiperah',
    image: '/assets/visual-dairy.svg',
    alt: 'Ilustrasi dashboard optimasi ransum sapi perah'
  },
  {
    name: 'karkas',
    eyebrow: 'Livestock Calculator',
    description: 'Kalkulator estimasi karkas dan non-karkas ternak Indonesia berbasis rumus ilmiah untuk workflow produksi yang lebih praktis.',
    tags: ['Calculator', 'Livestock', 'Formula'],
    repo: 'https://github.com/adiorany3/karkas',
    image: '/assets/visual-carcass.svg',
    alt: 'Ilustrasi kalkulator estimasi karkas'
  },
  {
    name: 'anova',
    eyebrow: 'Statistical Analysis',
    description: 'Aplikasi analisis ragam yang membantu pengguna menjalankan ANOVA, membaca asumsi, dan memahami hasil melalui visual yang jelas.',
    tags: ['Statistics', 'ANOVA', 'Data Visualization'],
    repo: 'https://github.com/adiorany3',
    image: '/assets/visual-anova.svg',
    alt: 'Ilustrasi chart hasil analisis ANOVA'
  },
  {
    name: 't-test',
    eyebrow: 'Scientific Computing',
    description: 'Antarmuka analisis uji-t untuk membandingkan sampel, memeriksa distribusi, dan menyajikan hasil statistik secara ringkas.',
    tags: ['T-Test', 'Research', 'Python'],
    repo: 'https://github.com/adiorany3',
    image: '/assets/visual-ttest.svg',
    alt: 'Ilustrasi perbandingan dua sampel'
  },
  {
    name: 'research-api',
    eyebrow: 'API / Data Product',
    description: 'Pola arsitektur API untuk memisahkan perhitungan ilmiah, validasi data, dan antarmuka produk agar lebih mudah dirawat.',
    tags: ['FastAPI', 'TypeScript', 'REST API'],
    repo: 'https://github.com/adiorany3',
    image: '/assets/visual-api.svg',
    alt: 'Ilustrasi arsitektur API untuk aplikasi riset'
  }
];

export const workflow = [
  { step: '01', title: 'Terjemahkan metode', description: 'Pecah rumus, asumsi, dan kebutuhan pengguna menjadi alur kerja yang terukur.' },
  { step: '02', title: 'Bangun mesin hitung', description: 'Implementasikan validasi, kalkulasi, dan pengujian dengan Python atau layanan API.' },
  { step: '03', title: 'Rancang antarmuka', description: 'Susun input, hasil, dan visual agar pengguna dapat mengambil keputusan dengan cepat.' },
  { step: '04', title: 'Deploy dan evaluasi', description: 'Rilis versi web, ukur penggunaan, lalu perbaiki berdasarkan umpan balik nyata.' }
];

export const stack = ['Python', 'TypeScript', 'Astro', 'FastAPI', 'Streamlit', 'Pandas', 'SciPy', 'Vercel'];

export const links = [
  { label: 'GitHub', href: 'https://github.com/adiorany3' },
  { label: 'Catatan Insani', href: 'https://catataninsani.wordpress.com' },
  { label: 'Streamlit', href: 'https://adioranye.streamlit.app/' }
];

export const fallbackPosts = [
  {
    title: 'Membawa rumus penelitian ke aplikasi web',
    excerpt: 'Catatan tentang menyusun metode ilmiah menjadi alur input, kalkulasi, validasi, dan hasil yang mudah dipahami.',
    href: 'https://catataninsani.wordpress.com'
  },
  {
    title: 'Mengapa visualisasi penting dalam alat statistik',
    excerpt: 'Hasil numerik menjadi lebih berguna saat pengguna dapat melihat pola, perbedaan, dan konteksnya secara langsung.',
    href: 'https://catataninsani.wordpress.com'
  },
  {
    title: 'Membangun produk AgriTech yang sederhana',
    excerpt: 'Produk riset yang baik fokus pada keputusan pengguna, bukan sekadar banyaknya fitur di dalam aplikasi.',
    href: 'https://catataninsani.wordpress.com'
  }
];
