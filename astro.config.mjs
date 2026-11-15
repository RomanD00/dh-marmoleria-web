import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Detecta si se solicitó explícitamente habilitar rutas de vista previa (o deploy Vercel Preview)
const isPreviewAllowed =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.ENABLE_PREVIEW === 'true' ||
  process.argv.includes('--preview') ||
  process.argv.includes('preview');

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
    {
      name: 'conditional-preview-routes',
      hooks: {
        'astro:config:setup': ({ injectRoute, command }) => {
          // En desarrollo local (astro dev) o en builds con flag de preview, inyecta la ruta
          if (command === 'dev' || isPreviewAllowed) {
            injectRoute({
              pattern: '/preview-materiales',
              entrypoint: './src/pages-preview/preview-materiales.astro'
            });
            injectRoute({
              pattern: '/preview-piletas',
              entrypoint: './src/pages-preview/preview-piletas.astro'
            });
            injectRoute({
              pattern: '/preview-mesas',
              entrypoint: './src/pages-preview/preview-mesas.astro'
            });
            injectRoute({
              pattern: '/preview-contacto',
              entrypoint: './src/pages-preview/preview-contacto.astro'
            });
          }
        }
      }
    },
    sitemap({
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date(),
      filter: (page) => !page.includes('/preview-') && !page.includes('/draft-')
    })
  ]
});
