// ponytail: 'unsafe-inline' di script-src/style-src wajib karena layout.tsx menyuntik
// skrip tema & konfigurasi chatbot lewat dangerouslySetInnerHTML. Ganti ke nonce
// via middleware jika ingin menghapusnya.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://udify.app",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://udify.app",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

export default nextConfig;

