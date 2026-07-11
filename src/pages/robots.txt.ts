import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://adioranye.vercel.app');
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', base)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
