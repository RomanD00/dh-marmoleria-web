import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dhmarmoleria.com.ar',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
    assets: '_astro'
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date()
    })
  ]
});
