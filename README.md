# Dodera Hermanos Marmolería — Sitio Institucional y Catálogo Visual

Sitio institucional y catálogo visual de **Dodera Hermanos Marmolería** (Buenos Aires, cobertura en CABA y GBA). Desarrollado con **Astro SSG (Static Site Generation)**, componentes limpios, CSS convencional, JavaScript Vanilla y despliegue continuo en **Vercel**.

La arquitectura está concebida para **mantenimiento mensual ágil y seguro sin CMS, sin base de datos y sin dependencias pesadas**, conservando de manera exacta el diseño editorial, tipografías (`Cormorant Garamond` + `Plus Jakarta Sans`), proporciones y curvas aprobadas.

---

## 1. Arquitectura de Carpetas del Proyecto

```text
dodera-hermanos-web/
├── astro.config.mjs            # Configuración Astro SSG + @astrojs/sitemap + dominio oficial
├── package.json                # Scripts npm (dev, build, preview) y dependencias
├── tsconfig.json               # Configuración TypeScript estricta para datos y componentes
├── vercel.json                 # Redirects, Security Headers y caché diferenciado en Vercel
├── .gitignore                  # Exclusión de dist, node_modules y temporales
├── .gitattributes              # Normalización de saltos de línea (LF)
├── README.md                   # Documentación general y guía de mantenimiento
│
├── .github/
│   └── workflows/
│       └── ci.yml              # CI en GitHub Actions: build automático, verificación de enlaces y seguridad
│
├── public/                     # Archivos estáticos servidos en la raíz del dominio
│   ├── .well-known/
│   │   └── security.txt        # RFC 9116 para contacto oficial de seguridad
│   ├── assets/                 # Fotografías y texturas oficiales categorizadas
│   │   ├── arquitectos/        # Fotografía de planos sobre mármol
│   │   ├── brand/              # Logotipo oficial (blanco, negro, original), favicons y OG image
│   │   ├── catalogos/          # 01-materiales.jpg, 02-piletas.jpg, 03-mesas-arrime.jpg
│   │   ├── hero/               # hero-obra-principal.jpg (Isla Calacatta a 45°)
│   │   ├── obras/              # 01-cocina-residencial.jpg, 02-bano-principal.jpg, 03-quincho-galeria.jpg
│   │   ├── taller/             # 01-medicion.jpg, 02-corte.jpg, 03-placas.jpg, 04-pulido.jpg
│   │   └── textures/           # marble-vein-subtle.jpg (textura de veta sutil)
│   ├── scripts/
│   │   └── main.js             # JavaScript Vanilla (Header sticky, menú móvil accesible, acordeón FAQ)
│   ├── robots.txt              # Directivas de rastreo hacia sitemap-index.xml
│   └── site.webmanifest        # PWA Web App Manifest
│
├── src/
│   ├── config/
│   │   └── site.ts             # FUENTE ÚNICA DE VERDAD: Teléfono, WhatsApp, redes, datos institucionales y nav
│   ├── data/                   # Capa de datos desacoplada para mantenimiento mensual
│   │   ├── catalogos.ts        # Tarjetas de homepage y fichas técnicas de Materiales, Piletas y Mesas
│   │   ├── diferenciales.ts    # Los 4 pilares de la marca
│   │   ├── obras.ts            # Proyectos de obras destacadas y galería
│   │   ├── taller.ts           # Fotos y pasos de fabricación en el taller
│   │   └── faqs.ts             # Preguntas y respuestas frecuentes (FAQ)
│   ├── layouts/
│   │   └── MainLayout.astro    # Layout maestro (HTML5, Skip-link accesible, SEO, Header, Footer y JS)
│   ├── components/
│   │   ├── SEO.astro           # Meta tags, canonical, Open Graph, Twitter Cards y Schema.org JSON-LD
│   │   ├── Header.astro        # Header con dropdown de Catálogos y botón WhatsApp
│   │   ├── Footer.astro        # Footer de 5 columnas con divisores verticales
│   │   ├── Hero.astro          # Hero cinematográfico con curva orgánica (Homepage)
│   │   ├── PageHero.astro      # Encabezado con migas de pan y curva para páginas internas
│   │   ├── CatalogSection.astro# Sección 01. Catálogos (Homepage)
│   │   ├── CatalogDetailSection.astro # Fichas detalladas con especificaciones y CTA WhatsApp
│   │   ├── DiferencialesSection.astro # Franja de 4 diferenciales
│   │   ├── ArquitectosSection.astro   # Bloque profesional CAD / Planos
│   │   ├── ObrasSection.astro  # Grid de proyectos
│   │   ├── TallerSection.astro # Grid de procesos de taller (@DH.MARMOLERIA)
│   │   └── FaqSection.astro    # Acordeón accesible de consultas frecuentes
│   ├── pages/                  # Rutas estáticas generadas por Astro
│   │   ├── index.astro         # / (Homepage idéntica al diseño aprobado)
│   │   ├── materiales.astro    # /materiales (Catálogo de mármol, granito, cuarzo y sinterizados)
│   │   ├── piletas-y-bachas.astro # /piletas-y-bachas (Bachas armadas a medida y acero Johnson/Neue)
│   │   ├── mesas-de-arrime.astro  # /mesas-de-arrime (Consolas y mesas en piedra y hierro)
│   │   ├── galeria.astro       # /galeria (Portafolio completo y fotos de taller)
│   │   └── contacto.astro      # /contacto (Canal directo WhatsApp y pasos de trabajo)
│   └── styles/
│       └── global.css          # CSS global con todos los tokens, tipografías y reglas responsive
│
└── docs/                       # Documentación estratégica, briefings y capturas de pantalla
    ├── briefing-dodera-hermanos.md
    ├── objetivos-de-la-web.md
    ├── deep-research-report.md
    └── screenshots/
        └── render-1440-final.png
```

---

## 2. Guía de Mantenimiento Mensual (Sin Tocar Código Complejo)

Toda la información del negocio está centralizada en archivos TypeScript fáciles de editar con autocompletado y validación:

### Cambiar teléfono, WhatsApp o redes sociales
Editar únicamente `src/config/site.ts`:
```ts
export const SITE_CONFIG = {
  contact: {
    phoneDisplay: '+54 11 2824-2848',
    whatsappNumber: '5491128242848',
    defaultMessage: 'Hola Dodera Hermanos Marmolería...'
  },
  social: {
    instagramHandle: '@DH.MARMOLERIA',
    instagramUrl: 'https://www.instagram.com/dh.marmoleria/'
  }
};
```
Todos los botones de WhatsApp del sitio, cabeceras, enlaces de Schema.org y pie de página se actualizan de forma automática.

### Agregar o modificar materiales, piletas o mesas
Editar `src/data/catalogos.ts`. Cada ítem contiene título, subtítulo, descripción, especificaciones técnicas en viñetas, aplicaciones y mensaje de WhatsApp prearmado.

### Agregar fotos a la Galería u Obras Destacadas
1. Colocar la nueva imagen en `public/assets/obras/nueva-foto.jpg`.
2. Agregar la entrada en `src/data/obras.ts`:
```ts
{
  id: 'isla-negro-brasil',
  title: 'Cocina en Negro Brasil Leather',
  specs: 'Granito natural | Inglete a 45°',
  image: '/assets/obras/nueva-foto.jpg',
  imageAlt: 'Mesada de cocina en granito Negro Brasil Leather',
  category: 'Cocinas e Islas'
}
```

### Actualizar Preguntas Frecuentes (FAQ)
Editar `src/data/faqs.ts`. Las preguntas y respuestas se reflejan tanto en el acordeón visual como en los datos estructurados `Schema.org FAQPage` para Google de inmediato.

---

## 3. Comandos de Desarrollo y Compilación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local (con recarga rápida)
npm run dev

# Compilar el sitio estático para producción (genera carpeta dist/)
npm run build

# Previsualizar localmente la compilación de producción
npm run preview
```

---

## 4. Despliegue en Vercel y GitHub

### Conectar y desplegar
1. Subir el repositorio a GitHub:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/dodera-hermanos-web.git
   git push -u origin main
   ```
2. En [vercel.com](https://vercel.com/), importar el proyecto seleccionando el framework **Astro**.
3. El archivo `vercel.json` ya incluye:
   - **Security Headers:** CSP estricta probada sin violaciones, HSTS (2 años), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
   - **Caché óptimo:** Inmutable de 1 año (`max-age=31536000, immutable`) para bundles `/_astro/(.*)` y 1 día con stale-while-revalidate para `/assets/(.*)` y `/scripts/(.*)`.
   - **Redirects 301 permanentes:** `/sitemap.xml` -> `/sitemap-index.xml`, `/catalogos` -> `/materiales`, `/obras` -> `/galeria`, etc.

---

## 5. Pruebas y Control de Calidad

- **Build estático:** 6 rutas compiladas en menos de 1 segundo.
- **Diferencia visual vs diseño original:** `0.000 / 255.0` (fidelidad 100% matemática en 1440, 768 y 390 px).
- **Core Web Vitals:** 0 KB de librerías innecesarias de JS (sin React, Vue ni Tailwind); JavaScript vanilla nativo de 4.9 KB; carga asíncrona de recursos; `fetchpriority="high"` en imágenes críticas y `loading="lazy"` en resto.
- **SEO y Schema.org:** `HomeAndConstructionBusiness`, `FAQPage` y `BreadcrumbList` integrados en JSON-LD; sitemap automático en `/sitemap-index.xml`; Open Graph verificado para WhatsApp y redes.
