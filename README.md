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
│   ├── pages/                  # Rutas estáticas activas en producción
│   │   └── index.astro         # / (Homepage aprobada; ÚNICA ruta compilada e indexada)
│   ├── pages-draft/            # Rutas en revisión EXCLUIDAS del build y sitemap
│   │   ├── materiales.astro    # Pendiente de arquitectura 2x2
│   │   ├── piletas-y-bachas.astro # Pendiente de grilla con filtros (Todas/Johnson/Neue)
│   │   ├── mesas-de-arrime.astro  # Pendiente de grilla editorial sin filtros
│   │   ├── galeria.astro       # Pendiente de portafolio fotográfico confirmado
│   │   └── contacto.astro      # Pendiente de validación de canales comerciales
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

- **Build de producción activo:** 1 única ruta aprobada (`/`) compilada en ~500 ms; páginas en borrador aisladas en `src/pages-draft/`.
- **Fidelidad visual comprobada vs baseline vanilla:** Diferencia media de `0.000 / 255.0` en tablet (768 px) y móvil (390 px), y `0.030 / 255.0` en desktop (1440 px) por renderizado subpíxel del glyph `+`.
- **Resultados Lighthouse (Build de producción):**
  - **Desktop:** Rendimiento 99/100, Accesibilidad 96/100, Mejores Prácticas 100/100, SEO 100/100. LCP: 0.9 s, CLS: 0.008, TBT: 0 ms.
  - **Mobile:** Rendimiento 86/100, Accesibilidad 96/100, Mejores Prácticas 100/100, SEO 100/100. CLS: 0.001, TBT: 0 ms, LCP: 4.2 s (bajo emulación móvil de red lenta por peso del JPEG principal de 140 KB).
- **SEO y Schema.org:** `HomeAndConstructionBusiness` y `FAQPage` integrados en JSON-LD; sitemap automático en `/sitemap-index.xml` conteniendo únicamente la URL aprobada; Open Graph verificado para WhatsApp y redes sociales.

---

## 6. Arquitectura Confirmada de Catálogos (Próxima Etapa)

Decisiones estructurales acordadas para el desarrollo futuro de las páginas de catálogo (actualmente no diseñadas y excluidas del build):

1. **Materiales (`/materiales`):**
   - Disposición en **4 tarjetas en grilla 2×2**, una por cada familia de piedra:
     1. Mármol Natural
     2. Granito Natural
     3. Cuarzo
     4. Superficies Sinterizadas
   - Cada tarjeta funcionará como portal de entrada hacia **futuras páginas de detalle** específicas de cada material.
2. **Piletas y Bachas (`/piletas-y-bachas`):**
   - Presentación de **todos los modelos en una grilla unificada**.
   - Barra de filtros interactiva accesible (JavaScript Vanilla, sin frameworks):
     - `Todas`
     - `Johnson` (Línea de piletas de acero inoxidable)
     - `Neue` (Línea de piletas de acero inoxidable)
     - *(Bachas armadas en piedra natural se integrarán según especificación final)*.
3. **Mesas de Arrime (`/mesas-de-arrime`):**
   - Presentación en **grilla editorial de modelos**.
   - **Sin filtros ni subdivisiones**, manteniendo una navegación visual fluida y directa.

---

## 7. Relevamiento de Datos Comerciales y Contenidos Pendientes de Confirmación

Antes de redactar o publicar información comercial definitiva, se documenta el estado de confirmación con la clienta:

| Elemento | Estado Actual | Fuente / Observaciones |
|---|---|---|
| **Teléfono / WhatsApp** | **Confirmado:** `+54 11 2824-2848` (`1128242848`) | Confirmado en briefing por el titular (Dodera Ezequiel Maximiliano). El número `+54 11 2346-2348` del mockup original era dummy y fue descartado. |
| **Nombre de Marca** | **Confirmado:** «Dodera Hermanos Marmolería» / «DH Mármoles» | Coincide en briefing, redes y logotipo original. |
| **Cobertura Geográfica** | **Confirmado:** «CABA y GBA» | Confirmado en briefing y aprobado en el hero y footer. |
| **Dirección de Taller / Local** | **No confirmado / Sin atención al público** | La clienta no informó dirección física. No inventar domicilio ni horarios. No colocar «Atención con coordinación previa». |
| **Correo Electrónico** | **Pendiente de confirmación pública** | En el briefing figura `villordotrinidad0603@gmail.com` catalogado expresamente como *Email de facturación*. No se ha confirmado si habrá un mail de contacto institucional. |
| **Modelos de Piletas** | **Marcas confirmadas (Johnson y Neue); Modelos pendientes** | Se conocen las marcas, pero falta el listado exacto de modelos, códigos y precios que comercializa el taller. |
| **Fotografías de Catálogo** | **Foto de Hero confirmada; resto provisional** | La foto de la isla Calacatta en el hero es obra real aprobada. Las fotos de piletas, mesas, baño y quincho provienen del mockup original y deben ser validadas o reemplazadas por obras de Dodera Hermanos cuando la clienta las suministre. |
| **Fichas Técnicas** | **Familias confirmadas; detalles técnicos pendientes** | Las 4 familias de materiales están confirmadas. Los espesores exactos, marcas de sinterizados (Dekton, Neolith) o cuarzos (Purastone, Silestone) y garantías deben ser validados formalmente. |

