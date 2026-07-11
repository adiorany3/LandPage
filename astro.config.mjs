import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://adioranye.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  }
});
