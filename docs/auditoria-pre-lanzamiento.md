# Auditoría Integral de Calidad y Preparación para el Lanzamiento — DH Mármoles

**Proyecto:** Dodera Hermanos Marmolería (`dhmarmoleria.com.ar`)  
**Stack:** Astro 5.18.1 (SSG) · TypeScript · CSS Nativo / Scoped · Despliegue en Vercel  
**Tipo de documento:** Auditoría técnica integral de solo lectura (Arquitectura, Seguridad, SEO Técnico, Performance & Core Web Vitals, Responsive, Accesibilidad WCAG 2.1 AA, Funcionalidad y Contenido Comercial)  
**Fecha de auditoría:** Noviembre 2026

---

## A. Resumen Ejecutivo

### 1. Estado General del Proyecto

El sitio web de **DH Mármoles** presenta una base arquitectónica y visual **sólida, ligera y muy bien alineada con la estética editorial de arquitectura e interiorismo**. Al estar construido sobre **Astro 5 SSG sin frameworks JS pesados** en el cliente (`0 KB` de bundles de React/Vue/Svelte; únicamente un script global de `9.0 KB` sin comprimir), el sitio alcanza tiempos de renderizado local sobresalientes y un perfil de seguridad de dependencias limpio (`0 vulnerabilidades` en `npm audit` sobre 284 paquetes).

El sistema de **aislamiento por entorno (`dev` vs `build`)** funciona según lo previsto para la Homepage:
- En **producción (`npm run build`)**, Astro compila exclusivamente `dist/index.html` (`1 página en 694 ms`), `dist/sitemap-0.xml` incluye únicamente `https://dhmarmoleria.com.ar/`, y no se filtra ningún enlace a `/preview-*` en el HTML público (`CATALOGS_PUBLISHED = false`).
- En **desarrollo/preview (`npm run dev`)**, la Homepage y los 4 módulos internos (`/preview-materiales`, `/preview-piletas`, `/preview-mesas` y `/preview-contacto`) están operativos y navegables.

### 2. Principales Riesgos Detectados

A pesar de la solidez general, la auditoría identificó **dos bloqueantes técnicos de producción** y un conjunto de hallazgos de **coherencia responsive (`320px`), higiene de repositorio y enlaces de navegación** que deben atenderse antes de publicar las páginas internas o presentar la primera versión completa al cliente:

1. **[CRÍTICO — Seguridad / Funcionalidad en Producción] La política CSP en `vercel.json` bloqueará el filtro de Piletas, las animaciones de Mesas y el formulario de Contacto al desplegar en Vercel:**  
   `vercel.json` define `script-src 'self'` y `style-src 'self' https://fonts.googleapis.com` (sin `'unsafe-inline'` ni hashes). Sin embargo, `PiletasCatalog.astro`, `MesasCatalog.astro` y `ContactoPageContent.astro` utilizan `<script is:inline>`, y `MesaCard.astro` / `PiletasCatalog.astro` aplican atributos `style` inline. En producción sobre Vercel, el navegador bloqueará la ejecución del filtro **Todas / Johnson / Neue** y del **formulario interactivo hacia WhatsApp**.
2. **[ALTO — Responsive en `320px`] Desbordamiento horizontal de `15px` (`scrollWidth = 335px`) en el ancho extremo de `320px` en 4 de las 5 páginas:**  
   En `1920px`, `1440px`, `1024px`, `768px` y `390px` **todas las páginas tienen `0px` de overflow horizontal**. Sin embargo, en `320px` reales, el bloque `.footer-brand-lockup` (`Footer.astro`, por `white-space: nowrap` en `"Dodera Hermanos Marmolería"`) y el `.header-container` expanden el viewport a `335px` en Homepage, Materiales, Piletas y Mesas. *(En `/preview-contacto` no ocurre porque ya incorpora una regla correctiva `@media (max-width: 375px)` que debe trasladarse a `global.css`).*
3. **[ALTO — SEO / Rutas al publicar páginas internas] Inconsistencia de barra final (`trailingSlash: 'never'` vs `publishedHref` con `/`) y metadatos `noIndex={true}` en páginas preview:**  
   `astro.config.mjs` y `vercel.json` fuerzan URLs sin barra final (`/materiales`), pero `src/config/site.ts` y `src/data/catalogos.ts` declaran `publishedHref: '/materiales/'` con barra final, lo que provocará redirecciones `308` innecesarias en cada clic interno al activar `CATALOGS_PUBLISHED = true`.
4. **[MEDIO — Navegación para demo al cliente] El enlace `Contacto` del Header/Footer no lleva a `/preview-contacto` en entorno local y el enlace `Procesos` (`#taller`) del Footer falla en páginas internas:**  
   Mientras que el dropdown `Catálogo` cambia dinámicamente a `/preview-*` en desarrollo, el ítem `Contacto` del menú principal sigue apuntando a `#contacto` (el footer) en lugar de `/preview-contacto`, y el link `Procesos` en `Footer.astro` usa `#taller` (sin `/` inicial), quedando inerte fuera de la Homepage.
5. **[MEDIO — Higiene del proyecto y peso de build] 11 archivos huérfanos en `public/assets/` (`843 KB` copiados a `dist/`) y 44 capturas PNG + 3 scripts Python sueltos en la raíz del proyecto:**  
   Ensucian el repositorio y aumentan artificialmente el peso del artefacto estático desplegado en Vercel.

### 3. Matriz de Estado Global por Área

| Área Auditada | Estado Actual | Hallazgos Críticos / Altos | Hallazgos Medios / Bajos | ¿Lista para Demo a Cliente? | ¿Lista para Producción Final? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **1. Arquitectura Astro** | 🟢 Sólida | 0 | 5 Medios · 2 Bajos | Sí (con limpieza menor) | Requiere unificar scripts y rutas |
| **2. Seguridad Web** | 🔴 Bloqueo CSP en internas | 1 Crítico · 1 Alto | 0 | Sí en local (`localhost`) | **No** (externalizar `<script is:inline>`) |
| **3. SEO Técnico** | 🟡 Bueno en Home | 1 Alto (al publicar) | 2 Medios · 2 Bajos | Sí | Requiere ajustar `noIndex`/canónicas al publicar |
| **4. Performance / CWV** | 🟢 Excelente base | 0 | 4 Medios · 2 Bajos | Sí | Sí (optimizable con WebP y `width`/`height`) |
| **5. Responsive Design** | 🟡 100% OK en `>=390px` | 1 Alto (solo en `320px`) | 1 Bajo | Sí en `390px–1920px` | Requiere llevar fix de `320px` a `global.css` |
| **6. Accesibilidad (WCAG)** | 🟢 Muy buena base | 0 | 1 Medio · 2 Bajos | Sí | Sí (corregir `aria-label` en Materiales) |
| **7. Funcionalidades** | 🟡 Operativa en local | 0 (en local) | 3 Medios | Ajustar link `Contacto` y `#taller` | Depende de fix CSP (#1) |
| **8. Contenido Comercial** | 🟡 Parcial / Provisional | — | 6 pendientes de cliente | Sí (con avisos de catálogo provisorio) | Requiere fotos/modelos reales del cliente |

---

## B. Hallazgos Técnicos Detallados

A continuación se documentan los **22 hallazgos técnicos** detectados durante la inspección estática de código, la compilación de producción (`npm run build`) y las pruebas automatizadas en navegador real (Chromium vía CDP).

---

### B.1. Seguridad Web y Configuración de Despliegue

#### [SEC-01] `Content-Security-Policy` (`script-src 'self'`) bloquea los `<script is:inline>` de Piletas, Mesas y Contacto en Vercel
- **Área afectada:** Seguridad Web / Funcionalidad interactiva en producción
- **Archivo o componente:** `vercel.json` (línea 64), `src/components/PiletasCatalog.astro` (líneas 49–114), `src/components/MesasCatalog.astro` (líneas 36–84), `src/components/ContactoPageContent.astro` (líneas 390–514)
- **Problema detectado:**  
  El encabezado `Content-Security-Policy` en `vercel.json` define `script-src 'self'` sin `'unsafe-inline'` ni hashes/nonces. En Astro, la directiva `<script is:inline>` inyecta el bloque `<script>` directamente en el HTML sin empaquetarlo como archivo `.js` externo. Cuando estas páginas se sirvan desde Vercel, el navegador bloqueará la ejecución de los tres scripts inline.
- **Evidencia concreta:**
  - `vercel.json:64`: `"value": "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; ..."`
  - `PiletasCatalog.astro:49`: `<script is:inline>` contiene `initPiletasFilter()`. **Impacto:** Los botones `Todas / Johnson / Neue` no filtrarán ninguna tarjeta en producción.
  - `MesasCatalog.astro:36`: `<script is:inline>` contiene `initMesasScrollReveal()`. **Impacto:** La animación de revelado por scroll no se ejecutará.
  - `ContactoPageContent.astro:390`: `<script is:inline>` contiene toda la lógica de botones de opción (`Perfil`, `Tipo de consulta`), validación de nombre obligatorio y armado de la URL hacia `https://wa.me/`. **Impacto:** Al pulsar «Continuar por WhatsApp», el `<form>` ejecutará un `submit` GET nativo recargando la página en vez de abrir WhatsApp.
  - *(Nota: En la Homepage, el único `<script>` inline es `<script type="application/ld+json">`, el cual no es ejecutable y no es bloqueado por `script-src 'self'`).*
- **Severidad:** **Crítica**
- **¿Bloquea el lanzamiento?:** **Sí** (bloquea la publicación de Piletas, Mesas y Contacto en Vercel; la Homepage actual por sí sola no se ve afectada porque usa `/scripts/main.js`).
- **Solución recomendada:**  
  Quitar el atributo `is:inline` de los `<script>` en `PiletasCatalog.astro`, `MesasCatalog.astro` y `ContactoPageContent.astro` para que Astro los compile y sirva como módulos externos bajo `/_astro/*.js` (cumpliendo estrictamente con `script-src 'self'`), o bien mover esa lógica a archivos en `public/scripts/` cargados con `src="/scripts/..."`. De este modo se conserva una CSP estricta de grado bancario sin necesidad de abrir `'unsafe-inline'` para scripts.

---

#### [SEC-02] `Content-Security-Policy` (`style-src 'self'`) bloquea estilos inline (`style="..."`) y mutaciones `element.style`
- **Área afectada:** Seguridad Web / Renderizado CSS y animaciones JS
- **Archivo o componente:** `vercel.json` (línea 64), `src/components/MesaCard.astro` (línea 16), `src/components/PiletasCatalog.astro` (líneas 74–87), `src/components/ContactoPageContent.astro` (estilos scoped de Astro)
- **Problema detectado:**  
  `vercel.json` define `style-src 'self' https://fonts.googleapis.com` sin `'unsafe-inline'`. Según la especificación CSP Level 2/3, la ausencia de `'unsafe-inline'` en `style-src` bloquea:
  1. Cualquier atributo HTML `style="..."` en el DOM.
  2. Las asignaciones directas a `element.style.*` vía JavaScript (como las que realiza el filtro de Piletas).
  3. Cualquier bloque `<style>` inyectado en el `<head>` si Astro decide inlinar estilos pequeños (`inlineStylesheets: 'auto'` por defecto en Astro).
- **Evidencia concreta:**
  - `MesaCard.astro:16`: `<article class="mesa-card" id={item.id} style={\`--reveal-delay: \${index * 90}ms;\`}>` — la variable CSS `--reveal-delay` será rechazada por CSP en producción.
  - `PiletasCatalog.astro:74–87`: `card.style.opacity = '0'`, `card.style.transform = 'translateY(8px)'`, `card.style.display = 'none'` — bloqueados bajo `style-src 'self'`.
- **Severidad:** **Alta**
- **¿Bloquea el lanzamiento?:** **Sí** (para páginas internas en Vercel y cualquier estilo inline generado por Astro).
- **Solución recomendada:**  
  1. Configurar `build: { inlineStylesheets: 'never' }` en `astro.config.mjs` para garantizar que todos los estilos de componentes Astro se emitan como archivos `.css` externos en `/_astro/`.
  2. En `vercel.json`, agregar `'unsafe-inline'` únicamente a `style-src` (`style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;`) —práctica estándar en sitios estáticos sin contenido generado por usuarios— o reemplazar `card.style.*` por clases CSS (`.is-hidden`, `.is-fading`) y `--reveal-delay` por selectores `:nth-child()`.

---

#### [SEC-03] Verificación de Superficie de Ataque, Enlaces Externos, XSS y Dependencias (Estado: Aprobado)
- **Área afectada:** Seguridad Web general
- **Archivo o componente:** Todo el proyecto (`package.json`, `vercel.json`, `src/components/**`, `public/.well-known/security.txt`)
- **Estado y evidencia comprobada:**
  - **`npm audit`:** `0 vulnerabilidades` (`info: 0, low: 0, moderate: 0, high: 0, critical: 0` en 284 paquetes).
  - **Cabeceras en `vercel.json`:** Incluye correctamente `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`, `Cross-Origin-Opener-Policy: same-origin` y `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  - **Prevención de Tabnabbing (`target="_blank"`):** Se verificaron mediante script los `66` enlaces de las 5 páginas; el **100% de los enlaces con `target="_blank"`** incluyen `rel="noopener noreferrer"`.
  - **Sanitización en Formulario de Contacto:** `ContactoPageContent.astro` lee `nombreInput.value.trim()` y `mensajeInput.value.trim()`, construye un array de líneas de texto plano y aplica `encodeURIComponent(lines.join('\n'))` antes de abrir `https://wa.me/`. No utiliza `innerHTML`, `outerHTML` ni `eval()`, por lo que no existe vector de DOM XSS.
  - **Aislamiento de rutas `/preview-*` en Producción:** En `npm run build`, Astro ignora por completo `src/pages-preview/` y `src/pages-draft/`, compilando solo `dist/index.html`. Además, `vercel.json` (líneas 28–31) posee una regla de defensa en profundidad `/preview-(.*) -> /` (`307`).

---

### B.2. Arquitectura Astro, Rutas y Mantenibilidad

#### [ARQ-01] Inconsistencia de Barra Final (`trailingSlash`) entre `astro.config.mjs`/`vercel.json` y `src/config/site.ts`/`src/data/catalogos.ts`
- **Área afectada:** Arquitectura Astro / Enrutamiento y SEO
- **Archivo o componente:** `astro.config.mjs` (línea 13), `vercel.json` (línea 5 y líneas 10–25), `src/config/site.ts` (líneas 88, 96, 104), `src/data/catalogos.ts` (líneas 51, 62, 73)
- **Problema detectado:**  
  La configuración de infraestructura exige URLs **sin barra final** (`trailingSlash: 'never'` en Astro y `"trailingSlash": false` en Vercel). Sin embargo, las constantes de rutas definitivas en `site.ts` y `catalogos.ts` tienen **barra final** (`'/materiales/'`, `'/piletas-y-bachas/'`, `'/mesas-de-arrime/'`).
- **Evidencia concreta:**
  - `astro.config.mjs:13`: `trailingSlash: 'never'`
  - `vercel.json:5`: `"trailingSlash": false`
  - `src/config/site.ts:88`: `publishedHref: '/materiales/'` (igual en líneas 96 y 104, y en `src/data/catalogos.ts` líneas 51, 62 y 73).
  - Cuando `CATALOGS_PUBLISHED` pase a `true`, cada clic en el navbar o en las cards de la Homepage apuntará a `/materiales/`, forzando a Vercel a responder con una redirección `308 Permanent Redirect` hacia `/materiales`.
- **Severidad:** **Alta**
- **¿Bloquea el lanzamiento?:** **Sí** (bloquea el paso a producción de los catálogos; no afecta mientras `CATALOGS_PUBLISHED = false`).
- **Solución recomendada:**  
  Unificar el criterio en `src/config/site.ts` y `src/data/catalogos.ts` eliminando la barra final (`publishedHref: '/materiales'`, `'/piletas-y-bachas'`, `'/mesas-de-arrime'`), o bien cambiar `astro.config.mjs` y `vercel.json` si se prefieren URLs con barra final.

---

#### [ARQ-02] Duplicación y desincronización entre `public/scripts/main.js` y `src/scripts/main.js`
- **Área afectada:** Arquitectura Astro / Mantenibilidad
- **Archivo o componente:** `public/scripts/main.js` (240 líneas) vs `src/scripts/main.js` (135 líneas), referenciado en `src/layouts/MainLayout.astro` (línea 52)
- **Problema detectado:**  
  Existen dos archivos `main.js` en el proyecto. `MainLayout.astro` carga `/scripts/main.js` (proveniente de `public/scripts/main.js`, que tiene 240 líneas e incluye `initCatalogDropdown()`). En cambio, `src/scripts/main.js` quedó huérfano con una versión antigua de 135 líneas (sin soporte para el menú desplegable de Catálogo).
- **Evidencia concreta:**
  - `public/scripts/main.js`: `9,041 bytes` (240 líneas, incluye `initCatalogDropdown`, manejo de `ArrowDown`/`ArrowUp`/`Escape`/`Tab` y soporte táctil).
  - `src/scripts/main.js`: `4,904 bytes` (135 líneas, versión obsoleta que no se importa en ningún componente).
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No** (pero representa un riesgo alto de confusión durante el mantenimiento futuro si un desarrollador edita `src/scripts/main.js` creyendo que es el script activo).
- **Solución recomendada:**  
  Eliminar `src/scripts/main.js` (o migrar el código definitivo de `public/scripts/main.js` a `src/scripts/main.js` e importarlo como `<script src="../scripts/main.js"></script>` en `MainLayout.astro` para que Astro además lo minifique y versiona con hash).

---

#### [ARQ-03] Código muerto y páginas obsoletas en `src/pages-draft/`, componentes antiguos y `src/styles/global.css`
- **Área afectada:** Arquitectura Astro / Mantenibilidad y limpieza de código
- **Archivo o componente:** `src/pages-draft/*.astro` (5 archivos), `src/components/PageHero.astro`, `src/components/CatalogDetailSection.astro`, `src/data/catalogos.ts` (líneas 79–262), `src/styles/global.css` (líneas 1828–2262)
- **Problema detectado:**  
  El proyecto conserva una primera iteración de borradores (`src/pages-draft/`) y componentes que ya fueron reemplazados por las nuevas páginas en `src/pages-preview/`:
  1. `src/pages-draft/materiales.astro`, `piletas-y-bachas.astro` y `mesas-de-arrime.astro` son copias idénticas de `src/pages-preview/preview-*.astro` (incluso conservan `canonicalPath="/preview-*"` y `noIndex={true}`).
  2. `src/pages-draft/contacto.astro` (177 líneas) es un diseño descartado que no coincide con `/preview-contacto` (`ContactoPageContent.astro`).
  3. `src/components/PageHero.astro` y `src/components/CatalogDetailSection.astro` solo son usados por `src/pages-draft/galeria.astro` y `src/pages-draft/contacto.astro`.
  4. `src/data/catalogos.ts` (líneas 79–262: `MATERIALES_ITEMS`, `PILETAS_ITEMS`, `MESAS_ITEMS`) ya no se usa en los catálogos actuales (que consumen `materiales.ts`, `piletas.ts` y `mesas.ts`).
  5. `src/styles/global.css` contiene ~435 líneas al final del archivo (líneas 1828–2262: `.nav-dropdown`, `.page-hero`, `.catalog-detail-*`, `.contacto-page-section`) correspondientes a esos borradores antiguos.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Depurar `src/pages-draft/contacto.astro`, `PageHero.astro`, `CatalogDetailSection.astro`, las colecciones obsoletas de `src/data/catalogos.ts` y las ~435 líneas de CSS sin uso en `global.css` (reduciendo el tamaño del CSS global en todas las páginas un ~20%).

---

#### [ARQ-04] Duplicación del número de WhatsApp en dos fuentes de verdad distintas con formato diferente
- **Área afectada:** Arquitectura Astro / Configuración centralizada
- **Archivo o componente:** `src/config/site.ts` (línea 21) vs `src/data/contacto.ts` (línea 11) y `src/components/ContactoPageContent.astro` (línea 395)
- **Problema detectado:**  
  `src/config/site.ts` se documenta como la «Fuente única de verdad», definiendo `whatsappNumber: '5491128242848'` (con el prefijo móvil internacional `9` para Argentina). Sin embargo, `src/data/contacto.ts` y el script inline de `ContactoPageContent.astro` definen `541128242848` (sin el `9`).
- **Evidencia concreta:**
  - `src/config/site.ts:21`: `whatsappNumber: '5491128242848'` -> usado en Header, Footer, Hero, Materiales, Piletas y Mesas (`https://wa.me/5491128242848?...`).
  - `src/data/contacto.ts:11`: `export const CONTACTO_WHATSAPP_NUMBER = '541128242848';` -> usado en la página de Contacto (`https://wa.me/541128242848?...`).
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No** (WhatsApp redirige ambos formatos en números de AMBA, pero rompe la fuente única de verdad si el cliente cambia de número en el futuro).
- **Solución recomendada:**  
  Importar `SITE_CONFIG.contact.whatsappNumber` y `getWhatsAppUrl()` desde `src/config/site.ts` dentro de `src/data/contacto.ts`, y pasar el número al script del formulario mediante un atributo `data-whatsapp-number={SITE_CONFIG.contact.whatsappNumber}` en el `<form>`.

---

#### [ARQ-05] Duplicación de datos de Catálogos entre `src/config/site.ts` y `src/data/catalogos.ts`
- **Área afectada:** Arquitectura Astro / Mantenibilidad
- **Archivo o componente:** `src/config/site.ts` (líneas 83–109: `CATALOG_ROUTES`) y `src/data/catalogos.ts` (líneas 45–75: `CATALOG_CATEGORIES`)
- **Problema detectado:**  
  Las rutas `previewHref` y `publishedHref` de los tres catálogos están declaradas por duplicado en `src/config/site.ts` (`CATALOG_ROUTES`, usado por `Header.astro`) y en `src/data/catalogos.ts` (`CATALOG_CATEGORIES`, usado por `CatalogSection.astro`).
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Hacer que `CATALOG_CATEGORIES` en `src/data/catalogos.ts` tome las rutas directamente desde `CATALOG_ROUTES` (en `src/config/site.ts`).

---

#### [ARQ-06] Componentes de Hero y Pre-Footer con estructura repetida entre los 3 catálogos
- **Área afectada:** Arquitectura Astro / Reutilización de componentes
- **Archivo o componente:** `src/components/MaterialesCatalog.astro` (hero inline), `src/components/PiletasHero.astro`, `src/components/MesasHero.astro`, `src/components/PreFooterConsultation.astro` y `src/components/MesasPreFooter.astro`
- **Problema detectado:**  
  - Los bloques de consulta pre-footer (`PreFooterConsultation.astro` usado en Materiales y Piletas, y `MesasPreFooter.astro` usado en Mesas) tienen la misma estructura visual y comparten el 95% de su CSS scoped, diferenciándose solo en que `MesasPreFooter` recibe props configurables.
  - Asimismo, `PiletasHero.astro`, `MesasHero.astro` y el hero embebido en `MaterialesCatalog.astro` repiten la grilla de 2 columnas con imagen en arco (`border-radius: 260px 260px 18px 18px`) y estilos casi idénticos.
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  En una iteración futura de refactorización, parametrizar `PreFooterConsultation.astro` (como ya hace `MesasPreFooter.astro`) para usar un único componente en los tres catálogos.

---

#### [ARQ-07] Archivos temporales en la raíz del repositorio y 11 assets huérfanos en `public/assets/` (`843 KB`)
- **Área afectada:** Higiene de repositorio y artefacto de build (`dist/`)
- **Archivo o componente:** Raíz del proyecto (`44` archivos `.png` y `3` archivos `.py`) + `public/assets/` (`11` archivos no referenciados)
- **Problema detectado:**  
  1. En la raíz del proyecto existen **44 capturas de pantalla PNG temporales** (`b0.png`..`b3.png`, `c0.png`..`c3.png`, `catalogo_mesas_1440.png`, `piletas_1440.png`, `contacto_1440.png`, etc.) y **3 scripts Python de prueba** (`audit_piletas.py`, `capture_mesas.py`, `verify_nav.py`).
  2. Más importante aún: en `public/assets/` existen **11 archivos (`843.2 KB` en total) que no son referenciados por ningún componente ni hoja de estilo**, pero que Astro copia íntegramente a `dist/assets/` en cada build de producción:
     - `public/assets/hero/hero-obra-alternativa.jpg` (`197.0 KB`)
     - `public/assets/arquitectos/planos-marmol.jpg` (`128.6 KB` — imagen anterior reemplazada por `canal-arquitectos-planos.jpg`)
     - `public/assets/mesas/modelo-03-detalle.jpg` (`75.9 KB` — imagen anterior reemplazada por `modelo-03-completa.jpg`)
     - `public/assets/brand/logo-dh-original.png` (`47.4 KB`)
     - `public/assets/piletas/johnson-luxor-si85.jpg` (`60.5 KB`), `johnson-quadra-q71.jpg` (`49.0 KB`), `johnson-curve-c37.jpg` (`55.0 KB`), `neue-minimal-n50.jpg` (`45.8 KB`), `neue-lineal-n70.jpg` (`56.7 KB`), `neue-quadro-duo-n80.jpg` (`61.7 KB`) — (`328.7 KB` de fotos JPG reemplazadas por los placeholders técnicos SVG).
     - `public/assets/piletas/placeholder-neue-quadro-n80.svg` (`2.1 KB` — duplicado de `placeholder-neue-quadro-duo-n80.svg`).
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No** (pero suma `843 KB` innecesarios al build y ensucia el control de versiones Git).
- **Solución recomendada:**  
  Eliminar o mover fuera del proyecto los 44 PNGs y 3 scripts `.py` de la raíz, y retirar de `public/assets/` los 11 archivos huérfanos (reduciendo el peso de `public/assets/` en un **31%**, de `2,707 KB` a `1,864 KB`).

---

### B.3. Auditoría de SEO Técnico

#### [SEO-01] Directivas `noIndex={true}` y `canonicalPath="/preview-*"` en las 4 páginas internas
- **Área afectada:** SEO Técnico / Indexación
- **Archivo o componente:** `src/pages-preview/preview-materiales.astro` (línea 13), `preview-piletas.astro` (línea 13), `preview-mesas.astro` (línea 13), `preview-contacto.astro` (línea 9)
- **Problema detectado:**  
  Las 4 páginas en preview tienen configurado `noIndex={true}` (`<meta name="robots" content="noindex, nofollow">`) y `canonicalPath="/preview-*"` (que además genera el JSON-LD `BreadcrumbList` con `https://dhmarmoleria.com.ar/preview-*`).
- **Evidencia concreta:**
  - En `/preview-materiales`: `<link rel="canonical" href="https://dhmarmoleria.com.ar/preview-materiales">`, `<meta name="robots" content="noindex, nofollow">`.
  - Esto es **100% correcto mientras estén en modo preview**, pero si los archivos se mueven directamente a `src/pages/` sin cambiar estas dos props, Google **no indexará ninguno de los catálogos ni la página de Contacto**.
- **Severidad:** **Alta** (al momento de publicar las páginas internas)
- **¿Bloquea el lanzamiento?:** **Sí** (al publicar los catálogos y Contacto en `src/pages/`).
- **Solución recomendada:**  
  Al promover cada archivo de `src/pages-preview/preview-*.astro` a `src/pages/*.astro`, eliminar `noIndex={true}` y actualizar `canonicalPath` a `"/materiales"`, `"/piletas-y-bachas"`, `"/mesas-de-arrime"` y `"/contacto"`.

---

#### [SEO-02] Salto en jerarquía de encabezados (`H1` -> `H3` sin `H2` previo) en `/preview-piletas`
- **Área afectada:** SEO Técnico y Accesibilidad Semántica
- **Archivo o componente:** `src/components/PiletasHero.astro` (`<h1>`), `src/components/ProductCard.astro` (línea 47: `<h3 class="product-title">`), `src/components/PreFooterConsultation.astro` (`<h2>`)
- **Problema detectado:**  
  En `/preview-piletas`, después del `<h1>Detalles que completan tu espacio.</h1>`, las 6 tarjetas de producto utilizan `<h3>` (`Luxor SI85`, `Quadra Q71`, etc.) sin que exista un `<h2>` contenedor para la grilla del catálogo, y recién al final de la página aparece un `<h2>` (`¿No sabés qué pileta elegir?`). En cambio, en Materiales y Mesas las tarjetas usan `<h2>`, manteniendo una jerarquía limpia `H1 -> H2`.
- **Evidencia concreta (DOM extraído en auditoría):**
  - `/preview-piletas`: `H1 ("Detalles que completan tu espacio.")` -> `H3 ("Luxor SI85")` x6 -> `H2 ("¿No sabés qué pileta elegir?")`.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Cambiar `<h3 class="product-title">` por `<h2 class="product-title">` en `src/components/ProductCard.astro` (línea 47), o agregar un `<h2 class="sr-only">Catálogo de piletas y bachas</h2>` antes de `#piletasGrid` en `PiletasCatalog.astro`.

---

#### [SEO-03] Datos estructurados Schema.org (`HomeAndConstructionBusiness`) incompletos y con logo blanco sobre transparente
- **Área afectada:** SEO Técnico / Rich Snippets y SEO Local
- **Archivo o componente:** `src/components/SEO.astro` (líneas 34–51)
- **Problema detectado:**  
  1. El campo `logo` del JSON-LD apunta a `https://dhmarmoleria.com.ar/assets/brand/logo-dh-white.png` (texto blanco sobre fondo transparente, que resulta invisible sobre fondos blancos en paneles de conocimiento de Google).
  2. No incluye `address` (`PostalAddress` con `addressRegion: "Buenos Aires"`, `addressCountry: "AR"`), ni `openingHoursSpecification` (pese a que los horarios `Lunes a viernes de 9 a 18 hs` y `Sábados de 9 a 13 hs` ya están definidos en `src/data/contacto.ts`).
- **Evidencia concreta:**
  - `SEO.astro:40`: `logo: new URL('/assets/brand/logo-dh-white.png', SITE_CONFIG.url).toString()`
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Cambiar `logo` en `SEO.astro` a `/assets/brand/logo-dh-dark.png` e incorporar `address` (`PostalAddress`) y `openingHoursSpecification` en el esquema `HomeAndConstructionBusiness`.

---

#### [SEO-04] Atributo `<html lang="es">` en lugar de `es-AR` y longitud de meta description en Homepage
- **Área afectada:** SEO Técnico / Regionalización
- **Archivo o componente:** `src/layouts/MainLayout.astro` (línea 33) y `src/pages/index.astro` (línea 14)
- **Problema detectado:**  
  1. `MainLayout.astro` define `<html lang="es" class="scroll-smooth">`, mientras que `public/site.webmanifest` declara `"lang": "es-AR"` y `SITE_CONFIG.locale` es `'es_AR'`.
  2. La `description` de `src/pages/index.astro` tiene **185 caracteres** (`"Fábrica de mesadas de mármol, granito, cuarzo y sinterizados a medida en Buenos Aires (CABA y GBA)..."`), superando el límite habitual de visualización completa en SERPs de Google (`155–160 caracteres`).
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Cambiar a `<html lang="es-AR" class="scroll-smooth">` en `MainLayout.astro` y acortar la `description` de `index.astro` a ~155 caracteres conservando las keywords principales (`mesadas a medida`, `mármol`, `cuarzo`, `sinterizados`, `CABA y GBA`).

---

### B.4. Responsive Design y Compatibilidad Mobile (`320px` – `1920px`)

Se ejecutó una batería de pruebas automatizadas en Chromium midiendo `document.documentElement.scrollWidth`, `window.innerWidth`, `document.documentElement.clientWidth` y los `getBoundingClientRect()` de todos los elementos del DOM en **6 resoluciones** (`1920px`, `1440px`, `1024px`, `768px`, `390px` y `320px`) para las **5 páginas**.

#### Resumen de Comportamiento por Resolución

| Página | `1920×1080` | `1440×900` | `1024×768` | `768×1024` | `390×844` | `320×568` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage (`/`)** | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ⚠️ `335px` (`+15px`) |
| **Materiales (`/preview-materiales`)** | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ⚠️ `335px` (`+15px`) |
| **Piletas (`/preview-piletas`)** | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ⚠️ `335px` (`+15px`) |
| **Mesas (`/preview-mesas`)** | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ⚠️ `335px` (`+15px`) |
| **Contacto (`/preview-contacto`)** | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `0px` overflow | ✅ `320px` (`0px`) |

---

#### [RESP-01] Desbordamiento horizontal de `15px` (`scrollWidth = 335px`) en viewports de `320px` en Homepage, Materiales, Piletas y Mesas
- **Área afectada:** Responsive Design (`320px` — iPhone SE 1ª gen / pantallas ultra-compactas)
- **Archivo o componente:** `src/styles/global.css` (líneas 1384–1406 y 1900–1911), `src/components/Footer.astro` (líneas 18–26), `src/components/Header.astro`
- **Problema detectado:**  
  En un viewport de `320px`, el bloque `.footer-brand-lockup` en `Footer.astro` tiene `display: flex; gap: 1.25rem (20px)` con `.footer-logo` (`108px`) + `.brand-divider` (`1px`) + `.brand-corp-name` (`"Dodera Hermanos Marmolería"` con `white-space: nowrap`, que mide `191px`). La suma (`108 + 20 + 1 + 191 = 320px`) más el padding izquierdo de `.container` (`16px`) empuja el borde derecho hasta **`334.8px` (`335px`)**, provocando que el navegador móvil expanda el layout viewport de `320px` a `335px`.
- **Evidencia concreta:**
  - En `/preview-contacto`, este problema **ya fue resuelto localmente** mediante reglas `:global(.footer-brand-lockup)` y `:global(.header-container)` dentro de `@media (max-width: 375px)` en `ContactoPageContent.astro` (líneas 844–876), logrando `scrollWidth = 320px` exactos.
  - En las otras 4 páginas (`Homepage`, `Materiales`, `Piletas`, `Mesas`), al no estar esas reglas en `src/styles/global.css`, `scrollWidth` alcanza `335px`.
- **Severidad:** **Alta** (para cumplimiento estricto de `320px`)
- **¿Bloquea el lanzamiento?:** **No bloquea en dispositivos modernos (`>= 360px` / `390px`)**, pero debe corregirse para cumplir al 100% el estándar de soporte en `320px`.
- **Solución recomendada:**  
  Mover las reglas `@media (max-width: 375px)` de `.header-container` y `.footer-brand-lockup` desde `ContactoPageContent.astro` (líneas 844–876) hacia `src/styles/global.css` para que protejan automáticamente a todas las páginas del sitio en `320px`.

---

#### [RESP-02] Tamaño de objetivos táctiles (`Touch Targets`) inferiores a `44×44px` en mobile (`390px`)
- **Área afectada:** Responsive Design / Usabilidad Táctil y Accesibilidad Mobile
- **Archivo o componente:** `src/components/Header.astro`, `src/components/BrandFilter.astro`, `src/components/Footer.astro`
- **Problema detectado:**  
  La medición de cajas (`getBoundingClientRect()`) en `390×844` detectó controles interactivos con altura o ancho menor al mínimo recomendado por WCAG 2.5.5 (`44×44px`):
  - `.mobile-toggle` (botón hamburguesa en `Header.astro`): `32×32px`
  - `.btn-whatsapp-pill` (CTA en `Header.astro` mobile): `175×34px`
  - `.filter-toggle-btn` (botones `Todas / Johnson / Neue` en `BrandFilter.astro` mobile): `67×31px` a `87×31px`
  - `.social-icon-btn` (iconos de Instagram/Facebook en `Footer.astro`): `28×28px`
  - `.footer-nav-link` y `.legal-link` en `Footer.astro`: `16px` de alto sin padding vertical de área clicable.
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Aumentar el área táctil efectiva usando `min-height: 44px` o agregando `padding` transparente compensado con margen negativo en `.mobile-toggle`, `.social-icon-btn` y `.filter-toggle-btn`.

---

### B.5. Accesibilidad (WCAG 2.1 AA)

#### [A11Y-01] `aria-label` incorrecto ("en piletas") en el botón de consulta de la página de Materiales
- **Área afectada:** Accesibilidad (Lectores de pantalla)
- **Archivo o componente:** `src/components/PreFooterConsultation.astro` (línea 34)
- **Problema detectado:**  
  El componente `PreFooterConsultation.astro` se reutiliza tanto en `/preview-piletas` como en `/preview-materiales` (pasando la prop `itemType="material"`). Mientras que el título visual sí cambia dinámicamente a `"¿No sabés qué material elegir?"`, el enlace de WhatsApp tiene hardcodeado el atributo `aria-label="Consultanos por asesoramiento en piletas por WhatsApp"`.
- **Evidencia concreta:**
  - `PreFooterConsultation.astro:34`: `aria-label="Consultanos por asesoramiento en piletas por WhatsApp"` (presente en el DOM renderizado de `/preview-materiales`).
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No** (pero debe corregirse antes de publicar o mostrar al cliente con tecnologías asistivas).
- **Solución recomendada:**  
  Dinamizar el atributo en `PreFooterConsultation.astro`: `aria-label={`Consultanos por asesoramiento en ${itemType === 'material' ? 'materiales' : 'piletas'} por WhatsApp`}`.

---

#### [A11Y-02] Navegación con flechas de teclado (`ArrowLeft` / `ArrowRight`) ausente en `BrandFilter.astro`
- **Área afectada:** Accesibilidad por teclado
- **Archivo o componente:** `src/components/BrandFilter.astro` y `src/components/PiletasCatalog.astro`
- **Problema detectado:**  
  El filtro de marcas (`Todas / Johnson / Neue`) funciona correctamente con `Tab` y `Enter`/`Space`, actualiza `aria-pressed="true/false"` y anuncia la cantidad de modelos en `#filterLiveStatus` (`aria-live="polite"`). Sin embargo, a diferencia del menú desplegable del Header y de los grupos de botones de `ContactoPageContent.astro` (que sí soportan navegación con cursores `ArrowLeft`/`ArrowRight`), los botones de `BrandFilter.astro` no implementan desplazamiento con flechas.
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Agregar un listener de `keydown` para `ArrowLeft` / `ArrowRight` en `initPiletasFilter()` igual al implementado en `ContactoPageContent.astro`.

---

#### [A11Y-03] Verificación de Contraste, Foco Visible, `prefers-reduced-motion` y Atributos `alt` (Estado: Aprobado)
- **Área afectada:** Accesibilidad WCAG 2.1 AA
- **Evidencia comprobada:**
  - **Atributos `alt`:** Se auditaron las **32 etiquetas `<img>`** presentes en las 5 páginas; **0 imágenes** carecen de atributo `alt`. Las imágenes informativas tienen descripciones ricas y precisas, y las decorativas usan `alt=""` con `aria-hidden="true"`.
  - **Skip Link y Landmarks:** Todas las páginas incluyen `<a href="#main-content" class="skip-link">Saltar al contenido principal</a>`, `<header>`, `<main id="main-content">` y `<footer id="contacto">`.
  - **Contraste de color:**
    - Texto principal `#1F1D1A` sobre fondo crema `#FAF8F5`: **ratio `15.4:1`** (supera ampliamente AAA `7:1`).
    - Texto secundario `#57524A` sobre `#FAF8F5`: **ratio `7.2:1`** (AAA).
    - Acento terracota `#773508` sobre `#F9F8F5` (Contacto): **ratio `7.85:1`** (AAA).
    - Botón terracota `#7A3E18` con texto blanco `#FAF8F5`: **ratio `7.02:1`** (AAA).
  - **`prefers-reduced-motion`:** Implementado tanto en `src/styles/global.css` (líneas 1766–1790) como en cada componente scoped (`PiletasCatalog`, `MesasCatalog`, `MesaCard`, `ContactoPageContent`) y verificado por JS en `main.js`.

---

### B.6. Funcionalidades, Navegación y Enlaces

#### [FUNC-01] El enlace `Contacto` del Header y del Footer no dirige a `/preview-contacto` en entorno de desarrollo
- **Área afectada:** Navegación entre páginas
- **Archivo o componente:** `src/config/site.ts` (línea 117), `src/components/Header.astro` (línea 24), `src/components/Footer.astro` (línea 120)
- **Problema detectado:**  
  En `src/config/site.ts`, el ítem `Contacto` de `MAIN_NAV` está definido como `{ label: 'Contacto', href: '#contacto' }`. En `Header.astro`, `resolveNavHref('#contacto')` devuelve `#contacto` en la Homepage y `/#contacto` en las páginas internas (desplazando la vista hacia el `<footer id="contacto">` en lugar de navegar a la nueva página `/preview-contacto`).
- **Evidencia concreta:**
  - En desarrollo (`npm run dev`), el usuario puede navegar a `/preview-materiales`, `/preview-piletas` y `/preview-mesas` desde el menú desplegable `Catálogo`, pero **no tiene forma de llegar a `/preview-contacto` haciendo clic en `Contacto` en el navbar**.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No bloquea el build actual**, pero **es importante corregirlo antes de mostrar el recorrido completo al cliente**.
- **Solución recomendada:**  
  Agregar una constante `CONTACT_PAGE_PUBLISHED = false` en `src/config/site.ts` (análoga a `CATALOGS_PUBLISHED`) para que `resolveNavHref` resuelva `Contacto` hacia `/preview-contacto` en entorno `DEV` y hacia `/contacto` cuando se publique (manteniendo `#contacto` en producción mientras `CONTACT_PAGE_PUBLISHED = false`).

---

#### [FUNC-02] Enlace roto `Procesos` (`href="#taller"`) en el Footer cuando se navega desde cualquier página interna
- **Área afectada:** Navegación / Footer global
- **Archivo o componente:** `src/components/Footer.astro` (línea 143)
- **Problema detectado:**  
  En la barra inferior del Footer (`Footer.astro` línea 143), el enlace `Procesos` tiene `href="#taller"` (ancla relativa sin `/` inicial), mientras que los enlaces superiores del Footer sí usan `/#hero`, `/#catalogos` y `/#obras`. En `/preview-materiales`, `/preview-piletas`, `/preview-mesas` y `/preview-contacto` no existe ningún elemento con `id="taller"`, por lo que hacer clic en `Procesos` no produce ninguna navegación.
- **Evidencia concreta:**
  - `Footer.astro:143`: `<a href="#taller" class="legal-link">Procesos</a>`
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Cambiar `href="#taller"` por `href="/#taller"` en `src/components/Footer.astro` (línea 143).

---

#### [FUNC-03] Enlaces legales (`Privacidad` y `Términos`) apuntan a `#contacto` y el año de copyright figura como `2024`
- **Área afectada:** Funcionalidad / Contenido Legal en Footer
- **Archivo o componente:** `src/components/Footer.astro` (líneas 139–141) y `src/config/site.ts` (línea 18)
- **Problema detectado:**  
  1. Los enlaces `Privacidad` y `Términos` en el pie de página apuntan a `href="#contacto"` (el propio footer), actuando como enlaces vacíos.
  2. `SITE_CONFIG.copyrightYear` en `src/config/site.ts` (línea 18) está fijado en `'2024'` (`© 2024 Dodera Hermanos Marmolería`), mientras que en la línea 17 `foundingYear` es `'2026'`.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No** (pero debe actualizarse antes de presentar al cliente).
- **Solución recomendada:**  
  Actualizar `copyrightYear` a `new Date().getFullYear().toString()` (o `'2026'`) en `src/config/site.ts`, y retirar los links `Privacidad` y `Términos` si el cliente no tendrá páginas de políticas legales en esta primera etapa.

---

### B.7. Performance y Recursos Estáticos

#### [PERF-01] Ausencia de atributos `width` y `height` explícitos en 12 de las 14 imágenes de la Homepage
- **Área afectada:** Performance / Estabilidad visual (CLS) y cálculo de layout
- **Archivo o componente:** `src/components/Hero.astro` (línea 8), `src/components/CatalogSection.astro` (línea 36 — 3 imágenes), `src/components/ArquitectosSection.astro` (línea 98), `src/components/ObrasSection.astro` (línea 29 — 3 imágenes), `src/components/TallerSection.astro` (línea 43 — 4 imágenes)
- **Problema detectado:**  
  En los catálogos internos (`Materiales`, `Piletas`, `Mesas`) y en `Contacto`, todas las imágenes tienen atributos `width` y `height` explícitos en el HTML. Sin embargo, en la Homepage, **12 de las 14 etiquetas `<img>` carecen de `width` y `height`**. Aunque los contenedores CSS mitigan el salto visual (`CLS = 0.0068`), las auditorías de PageSpeed Insights / Lighthouse penalizan las etiquetas `<img>` sin dimensiones intrínsecas explícitas.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Añadir los atributos `width` y `height` correspondientes a las dimensiones reales de cada archivo en `Hero.astro` (`1280×892`), `CatalogSection.astro` (`800×970`), `ArquitectosSection.astro` (`1024×438`), `ObrasSection.astro` (`364×252` / `424×252`) y `TallerSection.astro` (`275×186`).

---

#### [PERF-02] Doble referencia a `canal-arquitectos-planos.jpg` en `ArquitectosSection.astro` (CSS `background-image` + `<img>` oculto en desktop)
- **Área afectada:** Performance / Limpieza DOM y CSS
- **Archivo o componente:** `src/components/ArquitectosSection.astro` (línea 98) y `src/styles/global.css` (líneas 898, 913 y 1082–1095)
- **Problema detectado:**  
  En `global.css`, `.arquitectos-section` carga `/assets/arquitectos/canal-arquitectos-planos.jpg` (`109.7 KB`) como `background-image` (línea 898), y en `.arquitectos-media` vuelve a declararla como `background-image` (línea 913), mientras que en el HTML existe además `<img src="/assets/arquitectos/canal-arquitectos-planos.jpg" class="blueprint-img">` que en desktop (`>= 993px`) se oculta con `opacity: 0; pointer-events: none;`.
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Mantener una única fuente de imagen (preferiblemente la etiqueta `<img>` con `object-fit: cover` posicionada de forma absoluta, o bien una sola declaración CSS) para simplificar el mantenimiento.

---

#### [PERF-03] Imágenes extraídas de mockup con baja resolución intrínseca en `ObrasSection`, `TallerSection` y `PiletasHero`
- **Área afectada:** Calidad visual en pantallas Retina / 2x y Desktop grande (`1440px` / `1920px`)
- **Archivo o componente:** `public/assets/obras/01..03.jpg`, `public/assets/taller/01..04.jpg`, `public/assets/piletas/hero-stone-cad.jpg`
- **Problema detectado:**  
  La inspección de dimensiones reales en píxeles de los archivos en `public/assets/` reveló que varias imágenes provienen de recortes de baja resolución:
  - `public/assets/piletas/hero-stone-cad.jpg`: mide **`297×185 px`** (`9.2 KB`), pero en desktop (`1440px`) se renderiza a **`378×242 px`** (upscaling en pantalla 1x y un cuarto de la resolución necesaria para pantallas Retina 2x).
  - `public/assets/taller/01..04.jpg`: miden **`274×186 px`** (`~11 KB` c/u), renderizadas a `290×185 px` en desktop (insuficiente para pantallas 2x).
  - `public/assets/obras/01..03.jpg`: miden **`364×252 px`** y **`424×252 px`** (`~17–21 KB` c/u), renderizadas a `416×260 px` en desktop.
- **Severidad:** **Media**
- **¿Bloquea el lanzamiento?:** **No bloquea funcionalmente**, pero es importante reemplazarlas por fotografías reales en alta definición (`>= 800px` de ancho en formato WebP) cuando el cliente entregue el material fotográfico.
- **Solución recomendada:**  
  Solicitar al cliente fotografías reales de obras y taller en resolución mínima `1200×800 px` y exportarlas en WebP.

---

#### [PERF-04] Peso faltante de variante cursiva `500 italic` (`1,500`) en la petición a Google Fonts para `Cormorant Garamond`
- **Área afectada:** Tipografía / Fidelidad visual y Performance de fuentes
- **Archivo o componente:** `src/components/SEO.astro` (línea 120)
- **Problema detectado:**  
  La URL de Google Fonts en `SEO.astro` solicita `Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400` (solo pide cursiva en peso `400`). Sin embargo, múltiples títulos editoriales en `ContactoPageContent.astro`, `MesasCatalog.astro`, `MesasPreFooter.astro` y `PreFooterConsultation.astro` declaran `font-family: var(--font-heading); font-weight: 500; font-style: italic;`, forzando al navegador a sintetizar una cursiva falsa (`faux-italic`) o degradar el peso a `400`.
- **Severidad:** **Baja**
- **¿Bloquea el lanzamiento?:** **No**
- **Solución recomendada:**  
  Incluir `;1,500;1,600` en la URL de `Cormorant Garamond` en `SEO.astro` (o auto-hospedar solo los pesos realmente utilizados en `.woff2` para eliminar la conexión externa a `fonts.googleapis.com`).

---

## C. Rendimiento y Core Web Vitals

### 1. Métricas Reales Medidas en Navegador (Chromium Headless CDP) vs Estimación en Red Móvil 4G

Se midieron las métricas reales de **Performance Navigation Timing**, **Paint Timing**, **Largest Contentful Paint (LCP)** y **Cumulative Layout Shift (CLS)** sobre el servidor local tanto en **Desktop (`1440×900`)** como en **Mobile (`390×844`)**. Adicionalmente, se calculó la proyección realista en una conexión móvil **4G estándar (10 Mbps / 40 ms RTT)** considerando el peso transferido de imágenes por encima del pliegue (`above the fold`) y el bloqueo de Google Fonts:

| Página | Modo | FCP Medido (Local) | LCP Medido (Local) | LCP Estimado (4G Real) | Elemento LCP Detectado | CLS Medido | TBT / INP | Recursos Cargados |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: | :---: | :---: |
| **Homepage (`/`)** | Desktop | `96 ms` | `96 ms` | `~1.1 s` 🟢 | `IMG.hero-backdrop-img` (`hero-obra-principal.jpg`, `137.4 KB`) | `0.0068` 🟢 | `< 10 ms` 🟢 | 44 (`~1.26 MB` transf.) |
| **Homepage (`/`)** | Mobile | `404 ms` | `404 ms` | `~1.6 s` 🟢 | `IMG.hero-backdrop-img` (`hero-obra-principal.jpg`, `137.4 KB`) | `0.0000` 🟢 | `< 15 ms` 🟢 | 43 (`~1.15 MB` transf.) |
| **Materiales** | Desktop | `68 ms` | `68 ms` | `~1.0 s` 🟢 | `IMG.materiales-arch-img` (`hero-materiales.jpg`, `126.5 KB`) | `0.0019` 🟢 | `< 10 ms` 🟢 | 38 (`~0.83 MB` transf.) |
| **Materiales** | Mobile | `244 ms` | `244 ms` | `~1.4 s` 🟢 | `IMG.material-card-img` (`01-granito.jpg`, `114.2 KB`) | `0.0000` 🟢 | `< 10 ms` 🟢 | 37 (`~0.83 MB` transf.) |
| **Piletas** | Desktop | `108 ms` | `108 ms` | `~0.8 s` 🟢 | `IMG.product-card-img` (`placeholder-johnson-luxor-si85.svg`) | `0.0015` 🟢 | `< 10 ms` 🟢 | 45 (`~0.19 MB` transf.) |
| **Piletas** | Mobile | `332 ms` | `332 ms` | `~1.1 s` 🟢 | `IMG.product-card-img` (`placeholder-johnson-luxor-si85.svg`) | `0.0000` 🟢 | `< 15 ms` 🟢 | 42 (`~0.19 MB` transf.) |
| **Mesas** | Desktop | `76 ms` | `76 ms` | `~1.0 s` 🟢 | `IMG.mesas-arch-img` (`hero-mesas-arrime.jpg`, `125.8 KB`) | `0.0060` 🟢 | `< 10 ms` 🟢 | 39 (`~0.98 MB` transf.) |
| **Mesas** | Mobile | `248 ms` | `248 ms` | `~1.5 s` 🟢 | `IMG.mesas-arch-img` (`hero-mesas-arrime.jpg`, `125.8 KB`) | `0.0000` 🟢 | `< 15 ms` 🟢 | 39 (`~0.98 MB` transf.) |
| **Contacto** | Desktop | `96 ms` | `96 ms` | `~0.7 s` 🟢 | `H1.dh-contacto-hero-title` (Tipográfico) | `0.0110` 🟢 | `< 10 ms` 🟢 | 29 (`~0.24 MB` transf.) |
| **Contacto** | Mobile | `356 ms` | `356 ms` | `~1.0 s` 🟢 | `H1.dh-contacto-hero-title` (Tipográfico) | `0.0000` 🟢 | `< 15 ms` 🟢 | 27 (`~0.24 MB` transf.) |

*(Umbrales Core Web Vitals de Google: **LCP Bueno `< 2.5 s`**, **CLS Bueno `< 0.10`**, **INP/TBT Bueno `< 200 ms`**).*

### 2. Inventario de Peso de Assets (`public/assets/`)

- **Peso total actual en `public/assets/`:** `2,706.7 KB` (`2.64 MB` en 38 archivos).
- **Peso realmente utilizado por las 5 páginas:** `1,863.5 KB` (`1.82 MB` en 27 archivos).
- **Peso de archivos huérfanos/obsoletos copiados a `dist/`:** `843.2 KB` (11 archivos sin uso).

#### Los 10 archivos activos más pesados del proyecto:

| Archivo | Dimensiones | Peso Actual | Formato | Uso y Observación |
| :--- | :---: | :---: | :---: | :--- |
| `/assets/catalogos/03-mesas-arrime.jpg` | `800×970` | `160.2 KB` | JPEG | Card 03 en Homepage (`loading="lazy"`). |
| `/assets/catalogos/01-materiales.jpg` | `800×970` | `147.2 KB` | JPEG | Card 01 en Homepage (`loading="lazy"`). |
| `/assets/hero/hero-obra-principal.jpg` | `1280×892` | `137.4 KB` | JPEG | **LCP de Homepage** (`loading="eager"`, `fetchpriority="high"`). |
| `/assets/materiales/hero-materiales.jpg` | `1024×1024` | `126.5 KB` | JPEG | **LCP de Materiales Desktop** (`loading="eager"`, `fetchpriority="high"`). |
| `/assets/mesas/hero-mesas-arrime.jpg` | `1024×1024` | `125.8 KB` | JPEG | **LCP de Mesas** (`loading="eager"`, `fetchpriority="high"`). |
| `/assets/mesas/modelo-03-completa.jpg` | `1024×1024` | `125.5 KB` | JPEG | Card Modelo 03 en Mesas (`loading="lazy"`). |
| `/assets/materiales/01-granito.jpg` | `1024×1024` | `114.2 KB` | JPEG | Card 01 en Materiales (`loading="eager"`). |
| `/assets/catalogos/02-piletas.jpg` | `800×970` | `109.8 KB` | JPEG | Card 02 en Homepage (`loading="lazy"`). |
| `/assets/arquitectos/canal-arquitectos-planos.jpg` | `1024×438` | `109.7 KB` | JPEG | Fondo de sección Arquitectos en Homepage. |
| `/assets/mesas/modelo-01-hierro-negro.jpg` | `1024×1024` | `105.0 KB` | JPEG | Card Modelo 01 en Mesas (`loading="eager"`). |

### 3. Optimizaciones de Rendimiento Ordenadas por Impacto

1. **[Alto Impacto] Conversión de imágenes JPEG/PNG a WebP (o `<Picture>` de `astro:assets`):**  
   Convertir las 20 fotografías activas de `.jpg` a `.webp` (calidad `82`) reducirá el peso transferido de imágenes de `~1.82 MB` a **`~780 KB` (ahorro estimado del 57%)**, acelerando el LCP móvil en redes 4G en `~350–450 ms`.
2. **[Medio Impacto] `<link rel="preload" as="image">` para la imagen LCP en cada página:**  
   Aunque las imágenes Hero ya tienen `loading="eager"` y `fetchpriority="high"`, añadir una directiva `<link rel="preload" as="image">` en `SEO.astro` (pasada por prop desde cada página) permite que el navegador inicie la descarga de la imagen Hero en paralelo con el CSS antes de parsear el `<body>`.
3. **[Medio Impacto] Eliminación de los 11 archivos huérfanos en `public/assets/` (`843 KB`) y las ~435 líneas de CSS muerto en `global.css`:**  
   Reduce de inmediato el tamaño del hoja de estilos bloqueante (`global.css` baja de `45.3 KB` a `~36 KB` sin comprimir) y limpia el directorio de salida `dist/`.
4. **[Medio Impacto] Agregar atributos `width` y `height` a las 12 imágenes de la Homepage:**  
   Asegura un puntaje de `100/100` en las auditorías automatizadas de CLS y buenas prácticas de imágenes de Lighthouse.
5. **[Bajo Impacto] Redimensionar `logo-dh-white.png` y `logo-dh-dark.png`:**  
   Actualmente miden `1092×689 px` (`~24 KB` c/u) para mostrarse a `114×72 px`. Exportarlos a `342×216 px` (3x Retina) en WebP/PNG optimizado reduce su peso a `< 5 KB` y evita decodificar `750,000 píxeles` por logo.

---

## D. Checklist de Estado por Página

| Criterio de Verificación | 1. Homepage (`/`) | 2. Materiales (`/preview-materiales`) | 3. Piletas (`/preview-piletas`) | 4. Mesas (`/preview-mesas`) | 5. Contacto (`/preview-contacto`) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Ruta actual** | `/` (Producción y Dev) | `/preview-materiales` (Solo Dev) | `/preview-piletas` (Solo Dev) | `/preview-mesas` (Solo Dev) | `/preview-contacto` (Solo Dev) |
| **Fidelidad visual y editorial** | ✅ Aprobada | ✅ Aprobada | ✅ Aprobada | ✅ Aprobada | ✅ Aprobada y refinada |
| **Header y Footer globales** | ✅ Modo oscuro (`transparent`) | ✅ Modo claro (`light`) | ✅ Modo claro (`light`) | ✅ Modo claro (`light`) | ✅ Modo claro (`light`) |
| **Responsive `390px` – `1920px`** | ✅ Sin overflow (`0px`) | ✅ Sin overflow (`0px`) | ✅ Sin overflow (`0px`) | ✅ Sin overflow (`0px`) | ✅ Sin overflow (`0px`) |
| **Responsive extremo `320px`** | ⚠️ `335px` (falta regla global) | ⚠️ `335px` (falta regla global) | ⚠️ `335px` (falta regla global) | ⚠️ `335px` (falta regla global) | ✅ `320px` exactos |
| **Jerarquía `H1` -> `H2` -> `H3`** | ✅ Correcta (`1 H1`, `5 H2`) | ✅ Correcta (`1 H1`, `5 H2`) | ⚠️ Salto `H1` -> `H3` en cards | ✅ Correcta (`1 H1`, `5 H2`) | ✅ Correcta (`1 H1`, `4 H2`) |
| **Compatibilidad CSP en Vercel** | ✅ Compatible (`/scripts/main.js`) | ✅ Compatible (`/scripts/main.js`) | 🔴 Bloquea filtro (`is:inline`) | 🔴 Bloquea reveal (`is:inline`) | 🔴 Bloquea form (`is:inline`) |
| **CTAs a WhatsApp contextuales** | ✅ Todos operativos | ✅ Por familia + Pre-footer | ✅ Por modelo + Pre-footer | ✅ Por modelo + Pre-footer | ✅ Formulario dinámico + CTAs |
| **Contenido comercial definitivo** | ⚠️ Fotos Obras/Taller baja res. | ✅ 4 familias listas | ⚠️ Placeholders SVG + aviso | ⚠️ Modelos ilustrativos + aviso | ⚠️ Falta confirmar si va mapa/mail |

### Páginas Adicionales Pendientes en el Mapa del Sitio
1. **Galería de Obras (`/galeria`):** Actualmente el ítem `Galería` del navbar apunta a `#obras` en la Homepage. Existe un borrador antiguo no aprobado en `src/pages-draft/galeria.astro`.
2. **Fichas de Detalle por Familia de Material (`/materiales/granito`, `/materiales/cuarzo`, etc.) o por Producto:** Actualmente los enlaces de cada tarjeta de catálogo abren una consulta contextualizada en WhatsApp.
3. **Página de Error `404` personalizada (`src/pages/404.astro`):** No existe aún; cualquier URL inexistente mostrará la pantalla genérica de Vercel.

---

## E. Pendientes de Contenido (A Solicitar o Confirmar con el Cliente)

Antes del lanzamiento definitivo (o para retirar las notas de «catálogo ilustrativo» en las páginas internas), el cliente (**Dodera Hermanos Marmolería**) debe entregar o confirmar los siguientes puntos:

1. **Catálogo de Piletas y Bachas (`/preview-piletas`):**
   - Listado definitivo de modelos comercializados de **Johnson Acero** y **Neue** (confirmar si se mantienen `Luxor SI85`, `Quadra Q71`, `Curve C37`, `Minimal N50`, `Lineal N70`, `Quadro Duo N80` o si se agregan/reemplazan modelos).
   - Fotografías reales de producto o renders oficiales en alta resolución para reemplazar los **6 placeholders técnicos SVG** actuales (`placeholder-*.svg`).
   - Confirmación de medidas exactas (`cm`), tipo de acero (`AISI 304` / `AISI 430`) y sistema de colocación por modelo.
2. **Catálogo de Mesas de Arrime (`/preview-mesas`):**
   - Confirmar los nombres comerciales, medidas estándar (`Largo × Profundidad × Altura`), materiales de tapa y terminaciones de estructura de los modelos reales de fábrica para retirar la leyenda *«Los modelos exhibidos son ilustrativos del estilo y las terminaciones que realizamos a medida»*.
   - Fotografías reales de mesas fabricadas por DH Mármoles.
3. **Fotografías Reales de Obras y Taller para la Homepage (`/`):**
   - 3 fotografías en alta resolución (`>= 1200×800 px`) de proyectos reales instalados (Cocina, Baño, Quincho/Galería) para reemplazar los recortes de baja resolución (`364×252 px`) en `ObrasSection.astro`.
   - 4 fotografías reales del taller propio, maquinaria de corte y equipo de colocación para `TallerSection.astro` (actualmente de `274×186 px`).
4. **Datos de Contacto e Institucionales (`src/config/site.ts` y `/preview-contacto`):**
   - Confirmar si el taller/showroom tendrá **dirección física pública** en el sitio (actualmente solo se informa cobertura en `CABA y Gran Buenos Aires`) o si la atención es exclusivamente con cita previa / online.
   - Confirmar si desean publicar un **correo electrónico corporativo** (ej. `info@dhmarmoleria.com.ar`, que aparecía en el footer del mockup pero hoy no está en el sitio).
   - Confirmar el formato único del número de WhatsApp (`+54 9 11 2824-2848`) y las URLs definitivas de Instagram (`@dh.marmoleria`) y Facebook (`Dodera Hermanos Marmoleria`).
5. **Alcance de la sección `Galería` y enlaces de `Materiales`:**
   - Definir si para el lanzamiento inicial el ítem `Galería` del menú seguirá llevando a la sección `#obras` de la Homepage o si se diseñará una página interna `/galeria`.
   - Definir si las 4 tarjetas de `/materiales` (`Granito`, `Cuarzo`, `Sinterizados`, `Mármol`) seguirán abriendo WhatsApp directo en la versión 1.0 o si llevarán a subpáginas de muestras de colores/vetas.

---

## F. Plan de Acción Priorizado

### 1. Críticas antes del lanzamiento en Producción (Bloqueantes Técnicos)
- **[SEC-01 / SEC-02] Externalizar los scripts inline y ajustar `style-src` en `vercel.json`:**  
  Quitar `is:inline` de los `<script>` en `PiletasCatalog.astro`, `MesasCatalog.astro` y `ContactoPageContent.astro` (o moverlos a `/scripts/`), configurar `build: { inlineStylesheets: 'never' }` en `astro.config.mjs` y permitir `'unsafe-inline'` en `style-src` dentro de `vercel.json`.
- **[ARQ-01] Unificar `trailingSlash` entre `site.ts`/`catalogos.ts` y `astro.config.mjs`/`vercel.json`:**  
  Quitar la barra final de `publishedHref` (`'/materiales'`, `'/piletas-y-bachas'`, `'/mesas-de-arrime'`) en `src/config/site.ts` y `src/data/catalogos.ts`.
- **[SEO-01] Al publicar las páginas internas en `src/pages/`, desactivar `noIndex` y actualizar `canonicalPath`:**  
  Cambiar `noIndex={true}` a `false` y `canonicalPath` a las rutas definitivas sin `/preview-`.

### 2. Importantes antes de mostrar la web completa al cliente
- **[FUNC-01] Conectar el ítem `Contacto` del Header y Footer con `/preview-contacto` en entorno de desarrollo:**  
  Para que durante la demostración en vivo el cliente pueda navegar fluidamente entre Homepage, los 3 Catálogos y Contacto desde la barra de navegación superior.
- **[FUNC-02 / FUNC-03] Corregir el enlace `#taller` -> `/#taller` en `Footer.astro`, actualizar el año de copyright (`2024` -> `2026`) y limpiar los links `Privacidad`/`Términos` vacíos.**
- **[RESP-01] Trasladar a `src/styles/global.css` las reglas `@media (max-width: 375px)` de Header y Footer que ya tiene `ContactoPageContent.astro`:**  
  Elimina el desbordamiento de `15px` (`335px`) en viewports extremos de `320px` en Homepage, Materiales, Piletas y Mesas.
- **[A11Y-01] Corregir el `aria-label` hardcodeado ("en piletas") en `PreFooterConsultation.astro` cuando se renderiza en Materiales.**

### 3. Mejoras recomendadas (Calidad de Código, SEO y Performance)
- **[ARQ-07] Limpiar los 11 archivos huérfanos de `public/assets/` (`843 KB`) y las 44 capturas PNG + 3 scripts `.py` de la raíz del proyecto.**
- **[ARQ-02 / ARQ-03 / ARQ-04] Eliminar `src/scripts/main.js` duplicado, depurar `src/pages-draft/` y las ~435 líneas de CSS muerto en `global.css`, y unificar el número de WhatsApp en `src/config/site.ts`.**
- **[SEO-02 / SEO-03 / SEO-04] Cambiar `<h3>` a `<h2>` en `ProductCard.astro` (Piletas), usar `<html lang="es-AR">` en `MainLayout.astro`, y enriquecer el JSON-LD en `SEO.astro` con `logo-dh-dark.png`, `PostalAddress` y horarios.**
- **[PERF-01 / PERF-04] Agregar `width` y `height` a las 12 etiquetas `<img>` de la Homepage e incluir la variante `1,500` de `Cormorant Garamond` en Google Fonts.**

### 4. Optimizaciones futuras (Post-aprobación del cliente)
- **[PERF-03] Convertir el catálogo completo de imágenes a WebP/AVIF y reemplazar las fotos de baja resolución de Obras y Taller por fotografías reales de alta definición.**
- **Crear una página `src/pages/404.astro` con la estética editorial de la marca** para capturar rutas inexistentes con un CTA de retorno al inicio o a WhatsApp.
- **Auto-hospedar las fuentes `Cormorant Garamond` y `Plus Jakarta Sans` en `.woff2`** para eliminar el request externo bloqueante a `fonts.googleapis.com`.

---

## G. Próximas Cinco Acciones Recomendadas

Para avanzar con el **máximo retorno técnico y el menor esfuerzo**, se recomienda ejecutar en el próximo paso exactamente estas **5 acciones en orden**:

1. **Unificar la navegación de desarrollo (`site.ts`, `Header.astro`, `Footer.astro`):**  
   Conectar el enlace `Contacto` del navbar a `/preview-contacto` en modo desarrollo, corregir `href="/#taller"` en el Footer, actualizar el año `2026` y unificar el número de WhatsApp desde `SITE_CONFIG`. *(Tiempo estimado: 5 min — Deja toda la navegación lista para mostrar al cliente).*
2. **Hacer compatibles con la CSP de Vercel los scripts de Piletas, Mesas y Contacto (`vercel.json` + componentes):**  
   Convertir los 3 bloques `<script is:inline>` en scripts procesados por Astro (o externos en `/scripts/`) y ajustar `style-src` en `vercel.json` junto con `trailingSlash` en `site.ts` y `catalogos.ts`. *(Tiempo estimado: 15 min — Elimina el 100% de los bloqueantes críticos de producción).*
3. **Trasladar el ajuste responsive de `320px` a `src/styles/global.css` y corregir los detalles de accesibilidad/SEO (`PreFooterConsultation.astro`, `ProductCard.astro`, `MainLayout.astro`):**  
   Garantiza `0px` de overflow en las 5 páginas desde `320px` hasta `1920px`, corrige la jerarquía `H1 -> H2` en Piletas y el `aria-label` en Materiales. *(Tiempo estimado: 10 min).*
4. **Limpiar los archivos huérfanos en `public/assets/` (`843 KB`), las capturas temporales en la raíz y el código muerto (`src/scripts/main.js`, `src/pages-draft/`, final de `global.css`):**  
   Reduce un 31% el peso de `public/assets/` y un ~20% el tamaño de `global.css`. *(Tiempo estimado: 10 min).*
5. **Añadir dimensiones explícitas `width`/`height` a las 12 imágenes de la Homepage y optimizar los assets fotográficos a WebP:**  
   Deja el proyecto con métricas Core Web Vitals sobresalientes tanto en laboratorio (Lighthouse) como en dispositivos móviles reales. *(Tiempo estimado: 15 min).*
