import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * INTERRUPTOR DE MODO BETA PARA SITEMAP:
 * - true:  Excluye las páginas provisionales del sitemap público mientras la beta
 *          sigue en revisión privada con el cliente.
 * - false: Incluye automáticamente las 6 páginas definitivas en el lanzamiento oficial.
 *          (Cambiar junto con `IS_BETA_MODE` en `src/config/site.ts` y `vercel.json`).
 */
const IS_BETA_MODE = true;

const PROVISIONAL_BETA_PATHS = [
  '/materiales',
  '/piletas-y-bachas',
  '/mesas-de-arrime',
  '/galeria',
  '/contacto',
  '/preview-',
  '/draft-'
];

export default defineConfig({
  site: 'https://dhmarmoleria.com.ar',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
    assets: '_astro',
    inlineStylesheets: 'never'
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date(),
      filter: (page) => {
        if (IS_BETA_MODE) {
          return !PROVISIONAL_BETA_PATHS.some((path) => page.includes(path));
        }
        return !page.includes('/preview-') && !page.includes('/draft-');
      }
    })
  ]
});
