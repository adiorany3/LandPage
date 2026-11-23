export type Lesson = { title: string; points: string[] };

export type EducationModule = {
  slug: string;
  title: string;
  field: string;
  audience: string;
  summary: string;
  lessons: Lesson[];
};

// Ringkasan konseptual untuk mahasiswa, peternak, dan penyuluh lapangan.
// Bukan panduan dosis, diagnosis penyakit, atau penggantian skema resmi.
export const educationModules: EducationModule[] = [
  {
    slug: "nutrisi-ruminansia",
    title: "Dasar nutrisi ruminansia",
    field: "Pakan",
    audience: "Mahasiswa baru, peternak sapi, dan ruminansia kecil",
    summary: "Membaca hasil analisis pakan dan menyusun ransum dengan batasan nutrisi yang masuk akal.",
    lessons: [
      {
        title: "Fraksi cepat dan lambat tercerna",
        points: [
          "Pati dan gula tersedia lebih cepat daripada fraksi serat.",
          "Serat tetap penting sebagai sumber energi fermentasi dan kesehatan saluran cerna.",
          "Kelebihan bahan mudah tercerna dapat memicu gangguan metabolisme.",
          "Periksa komposisi dengan hasil analisis, bukan asumsi."
        ]
      },
      {
        title: "NDF, ADF, dan protein kasar",
        points: [
          "NDF berkaitan dengan volume bahan yang dimakan dan laju makan.",
          "ADF berkaitan dengan tingkat tercerna bahan.",
          "Protein kasar perlu dibaca bersama kebutuhan asam amino."
        ]
      }
    ]
  },
  {
    slug: "kesehatan-ternak",
    title: "Dasar kesehatan peternakan",
    field: "Kesehatan",
    audience: "Peternak skala kecil dan penyuluh lapangan",
    summary: "Deteksi dini, kebersihan lingkungan, dan pencatatan riwayat kesehatan.",
    lessons: [
      {
        title: "Kebersihan kandang",
        points: [
          "Kandang perlu sirkulasi udara baik, kering, dan mudah dibersihkan.",
          "Sisa pakan dan kotoran harus dibuang tepat waktu.",
          "Alat minum perlu dibersihkan agar lapisan mikroba tidak menumpuk."
        ]
      },
      {
        title: "Gejala yang perlu diperhatikan",
        points: [
          "Penurunan nafsu makan dan produksi sering muncul lebih dulu.",
          "Catat waktu, gejala, dan kelompok hewan yang terkena.",
          "Gejala berlanjut perlu konsultasi dengan dokter hewan."
        ]
      }
    ]
  },
  {
    slug: "data-peternakan",
    title: "Membaca data peternakan",
    field: "Data",
    audience: "Peneliti, mahasiswa, dan pemilik usaha",
    summary: "Mencatat, memeriksa, dan menganalisis data peternakan secara sederhana.",
    lessons: [
      {
        title: "Pencatatan harian",
        points: [
          "Catat jumlah pakan, bobot, dan kondisi kesehatan per kelompok.",
          "Gunakan satuan yang seragam agar data dapat dibandingkan.",
          "Catat kondisi lingkungan yang memengaruhi hasil."
        ]
      },
      {
        title: "Memeriksa sebelum menganalisis",
        points: [
          "Periksa nilai ekstrem dan tanggal yang tidak logis.",
          "Bedakan data kosong dari angka nol.",
          "Rata-rata bukan pengganti sebaran data."
        ]
      }
    ]
  },
  {
    slug: "peternakan-presisi",
    title: "Peternakan presisi: IoT, PLF, dan DSS",
    field: "Teknologi",
    audience: "Peneliti, mahasiswa, dan pelaku usaha yang memakai teknologi di peternakan",
    summary: "Memahami sensor IoT, Precision Livestock Farming (PLF), dan sistem pendukung keputusan (DSS) untuk keputusan peternakan berbasis data.",
    lessons: [
      {
        title: "Sensor IoT dan data kandang",
        points: [
          "Sensor suhu, kelembapan, amonia, air, dan konsumsi pakan menghasilkan data berkala.",
          "Gateway mengirim data ke dasbor; pastikan satuan dan pencatatan waktu konsisten.",
          "Data sensor perlu divalidasi dengan kondisi lapangan sebelum dipakai mengambil keputusan."
        ]
      },
      {
        title: "Precision Livestock Farming (PLF)",
        points: [
          "PLF memakai data per hewan atau per kelompok untuk manajemen yang lebih tepat.",
          "Manfaat muncul ketika data diubah menjadi tindakan harian, bukan sekadar dasbor.",
          "Mulai dari satu variabel penting, misalnya konsumsi pakan, sebelum memperluas."
        ]
      },
      {
        title: "Sistem pendukung keputusan (DSS)",
        points: [
          "DSS menggabungkan data, model, dan aturan menjadi rekomendasi yang dapat ditinjau.",
          "Contoh: formulasi ransum biaya minimum, evaluasi performa, dan peringatan dini.",
          "Keputusan akhir tetap pada peternak; DSS membantu, bukan menggantikan penilaian ahli."
        ]
      }
    ]
  }
];
