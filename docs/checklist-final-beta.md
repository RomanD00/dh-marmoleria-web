# Checklist Final de Beta Privada — DH Mármoles

**Rama actual:** `beta/trinidad-16-nov`  
**Respaldos preservados:** `backup/pre-beta-16-nov`, `backup/pre-refinamiento-home-galeria`  
**Rama pública (`main`):** intacta, sin merges ni despliegues ejecutados.  
**Estado de despliegue:** pendiente (no se ejecutó `vercel deploy` ni se conectó repositorio remoto todavía).

---

## 1. Cambios Realizados y Correcciones Aplicadas

### Fase 1 — Corrección del Navbar Móvil (`<= 768px`)
1. **Barra superior móvil simplificada ([`Header.astro`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/components/Header.astro))**:
   - Con menú cerrado, muestra únicamente el logotipo a la izquierda y el botón hamburguesa (`44px × 44px` de área táctil) a la derecha.
   - Se ocultó el botón `"Cotizar por WhatsApp"` de la barra superior en móvil (`.header-whatsapp-desktop`) sin modificar la barra de escritorio (`> 768px`).
2. **Panel móvil abierto e integración del CTA ([`Header.astro`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/components/Header.astro), [`global.css`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/styles/global.css))**:
   - En la parte superior: logotipo a la izquierda y botón de cierre `X` a la derecha (`position: fixed` coherente tanto en páginas oscuras como en `.header-light`).
   - Enlaces en orden exacto: `Inicio` → `Catálogo` (con submenú `01 | Materiales`, `02 | Piletas`, `03 | Mesas de Arrime`) → `Galería` → `Contacto`.
   - Debajo de todos los enlaces: botón `"Cotizar por WhatsApp"` a ancho completo dentro del panel, altura táctil `51px` (`min-height: 48px`), ícono WhatsApp y enlace centralizado `SITE_CONFIG`.
   - Soporte de desplazamiento vertical interno (`max-height: calc(100dvh - var(--header-height)); overflow-y: auto; overscroll-behavior: contain`) para pantallas compactas como `320×568px`.
3. **Interacción y accesibilidad CSP-safe ([`public/scripts/main.js`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/public/scripts/main.js), [`src/scripts/main.js`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/scripts/main.js))**:
   - Estado sincronizado `aria-expanded`, `aria-label` (`"Abrir menú"` / `"Cerrar menú"`), bloqueo de scroll de fondo vía clase CSS `body.mobile-menu-open`, restauración automática del scroll y cierre del submenú `Catálogo` al cerrar o cambiar a escritorio.
   - Manejo de foco por teclado (`Tab` / `Shift+Tab` contenido dentro del panel y toggle mientras el menú está abierto, `Escape` cierra el menú y retorna el foco a `#mobileToggle`).
   - Cierre automático del menú móvil al pulsar cualquier enlace de navegación, opción de `Catálogo` o el CTA móvil de WhatsApp.

### Errores Detectados y Corregidos Durante la Revisión Responsive
1. **Alineación vertical apilada en submenú móvil de `Catálogo` (observado a `320×568px`)**:
   - **Causa**: reglas heredadas de `.nav-dropdown-link` con `flex-direction: column` en `src/styles/global.css` apilaban el número `01`, la barra `|` y el nombre en 3 líneas dentro del panel abierto.
   - **Corrección**: en `@media (max-width: 768px)` se especificó `display: flex; flex-direction: row; align-items: center; gap: 10px` en `.site-header .main-nav .nav-dropdown-link`, más color `var(--color-bronze-hover)` para los números cuando el header padre es `.header-light`.
2. **Altura táctil reducida en filtros de Piletas ([`BrandFilter.astro`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/components/BrandFilter.astro))**:
   - **Causa**: los botones `Todas`, `Johnson` y `Neue` medían `31px` de alto en móvil y `34px` en escritorio.
   - **Corrección**: se ajustó `min-height: 40px` (`padding: 9px 24px`) en escritorio y `min-height: 44px` (`padding: 10px 20px`) debajo de `640px`.
3. **Resolución de entorno `VERCEL_ENV` en [`site.ts`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/config/site.ts)**:
   - Se reforzó `isPreviewEnvironment()` para verificar tanto `import.meta.env.VERCEL_ENV === 'preview'` como `process.env.VERCEL_ENV === 'preview'`.
4. **Artefacto de compositor en dropdown claro ([`global.css`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/styles/global.css))**:
   - Se desactivó `backdrop-filter` innecesario sobre `.site-header.header-light .nav-dropdown-menu` (fondo sólido 98% opaco).

---

## 2. Archivos Modificados en Esta Etapa
- [`src/components/Header.astro`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/components/Header.astro)
- [`src/components/BrandFilter.astro`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/components/BrandFilter.astro)
- [`src/styles/global.css`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/styles/global.css)
- [`public/scripts/main.js`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/public/scripts/main.js)
- [`src/scripts/main.js`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/scripts/main.js)
- [`src/config/site.ts`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/src/config/site.ts)
- [`docs/checklist-final-beta.md`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/docs/checklist-final-beta.md) *(este informe)*

---

## 3. Matriz de Pruebas Responsive (54 Combinaciones Locales bajo CSP)

Evaluado en Chrome headless (`vercel.json` CSP activa) tras la última edición sobre `1920×1080`, `1440×900`, `1024×900`, `768×1024`, `430×932`, `390×844`, `375×812`, `360×800` y `320×568`:

| Ruta | 1920 | 1440 | 1024 | 768 | 430 | 390 | 375 | 360 | 320 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/` | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| `/preview-materiales` | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| `/preview-piletas` | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| `/preview-mesas` | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| `/preview-galeria` | OK | OK | OK | OK | OK | OK | OK | OK | OK |
| `/preview-contacto` | OK | OK | OK | OK | OK | OK | OK | OK | OK |

Criterios verificados por combinación (`54 / 54` aprobados):
- `overflowX === false` en todos los anchos.
- `brokenImgs === []` (imágenes y fuentes cargadas sin deformación).
- `clippedHeadings === []` (ningún `<h1>` o `<h2>` cortado o desbordado).
- `headerOverlap === false`, `stickyWorks === true` y visibilidad exclusiva del CTA según viewport (escritorio en barra, móvil dentro del menú abierto).
- `smallControls === []` (incluyendo filtros de Piletas >= `40px` desktop / >= `44px` móvil y botón hamburguesa `44×44px`).
- `consoleErrors === []` y `securityLogs === []` (cero violaciones de CSP `script-src 'self'`).

### Pruebas Funcionales Verificadas Localmente (bajo CSP estricta)
- **Navbar móvil (`390×844` y `320×568`)**: CTA superior oculto (`display: none`); panel abierto con `Inicio`, `Catálogo`, `Galería`, `Contacto` + botón `"Cotizar por WhatsApp"` (`51px` alto, `100%` ancho útil) visible e íntegramente accesible aun con `Catálogo` desplegado; `body` bloqueado con `overflow: hidden` al abrir y restaurado al cerrar con clic o `Escape` (devolviendo foco a `#mobileToggle`).
- **Catálogos dropdown y navegación 6 páginas**: submenú apunta a `/preview-materiales`, `/preview-piletas`, `/preview-mesas`; `"Ver todas las obras"` y `Galería` en Header/Footer apuntan a `/preview-galeria`.
- **Instagram**: 8 posts reales de `@DH.MARMOLERIA` con enlaces individuales y avance `#igCarouselNext` (`scrollLeft: 0 → 317`).
- **Piletas**: filtros `Johnson (3)`, `Neue (3)`, `Todas (6)` operativos sin estilos inline.
- **FAQs**: acordeón funcional (`Pregunta 1`..`4`, `aria-expanded: "true"` al abrir) sin esquema JSON-LD `FAQPage`.
- **Contacto**: validación de formulario y generación de URL `https://wa.me/5491128242848?...` sin envío real.

---

## 4. Estado de Builds, Aislamiento y CSP

- **Tipos Astro (`npx astro sync`)**: completado sin errores.
- **Build Beta (`npm run build:beta` y `VERCEL_ENV=preview npm run build`)**: compila **6 páginas** (`/`, `/preview-materiales`, `/preview-piletas`, `/preview-mesas`, `/preview-galeria`, `/preview-contacto`). Esto garantiza que Vercel generará automáticamente las 6 páginas en despliegues **Preview** ejecutando su comando estándar `npm run build`, sin depender de variables locales.
- **Build Producción (`npm run build` y `VERCEL_ENV=production npm run build`)**: compila únicamente **1 página** (`/index.html`), sin generar ninguna carpeta `/preview-*` en `dist/` ni referencias `/preview-` en `dist/index.html` ni `dist/sitemap-0.xml`.
- **Flags públicos intactos**: `CATALOGS_PUBLISHED = false`, `CONTACT_PAGE_PUBLISHED = false` y `GALERIA_PAGE_PUBLISHED = false` en `src/config/site.ts`.
- **CSP y Edge Auth**:
  - Todo JS corre desde `/scripts/main.js` sin scripts inline ejecutables (solo `application/ld+json`).
  - Test local de [`middleware.js`](file:///f:/Escritorio/dodera%20hermanos%20web/Proyecto%20en%20antigravity/middleware.js): `5/5` casos aprobados (`production` pasa directo, `preview` + `BETA_REQUIRE_AUTH=true` sin clave responde `503` *fail-closed*, sin credenciales o erróneas responde `401`, credenciales válidas responden `x-middleware-next: 1`).
  - *Nota honesta*: estas validaciones fueron locales/Node/Chrome; todavía no se probaron en el edge online de Vercel porque el proyecto aún no fue desplegado.

---

## 5. Pasos Manuales Pendientes en Vercel (Antes de Compartir con Trinidad)

1. Crear o iniciar sesión en la cuenta de **Vercel** donde vivirá la beta.
2. En **Project Settings → General**, confirmar:
   - **Framework Preset:** `Astro`
   - **Build Command:** `npm run build` *(no hace falta cambiarlo a `--preview`; Vercel inyecta `VERCEL_ENV=preview` en Preview y compila las 6 páginas automáticamente)*
   - **Output Directory:** `dist`
3. Elegir y configurar la protección privada:
   - **Opción A recomendada (Nativa de Vercel):** En **Project Settings → Deployment Protection**, activar **Standard Protection** (incluida en todos los planes) o **Password Protection** (plan Pro) para que ningún visitante anónimo ni buscador acceda al `*.vercel.app` sin token o autorización.
   - **Opción B complementaria (`middleware.js` HTTP Basic Auth):** En **Project Settings → Environment Variables**, cargar marcando **SOLO el entorno `Preview`** (NUNCA tildar `Production`):
     - `BETA_AUTH_PASSWORD` = *(clave segura elegida al momento de configurar)*
     - `BETA_AUTH_USER` = `dh-beta` *(o el usuario deseado)*
     - `BETA_REQUIRE_AUTH` = `true` *(hace que un preview sin clave devuelva `503` fail-closed en lugar de abrirse)*
   - **Precaución para no bloquear al cliente**: si activás **Standard Protection** y enviás el link común `*.vercel.app` sin generar el **Shareable Link**, Vercel le pedirá a Trinidad iniciar sesión con cuenta Vercel. Para evitarlo, generá siempre el **Shareable Link** desde el deployment Preview (o usá Password Protection / Opción B enviándole usuario y clave).
4. En **Settings → Domains**, confirmar que el dominio público de producción permanezca asignado únicamente a Producción (no al deployment Preview).

---

## 6. Cómo Desplegar la Beta sin Repositorio Remoto usando Vercel CLI

Desde la raíz del proyecto (`f:\Escritorio\dodera hermanos web\Proyecto en antigravity`), asegurando estar en la rama `beta/trinidad-16-nov`:

1. Iniciar sesión en Vercel CLI:
   ```powershell
   vercel login
   ```
2. Vincular esta carpeta con un proyecto de Vercel (sin crear repo remoto ni usar `--prod`):
   ```powershell
   vercel link
   ```
   - Confirmar Root Directory `.` y Preset `Astro` / Output `dist`.
3. Si vas a usar la Opción B (`middleware.js`), cargar las variables de Preview antes del deploy:
   ```powershell
   vercel env add BETA_AUTH_PASSWORD preview
   vercel env add BETA_AUTH_USER preview
   vercel env add BETA_REQUIRE_AUTH preview
   ```
   *(Ingresá `true` para `BETA_REQUIRE_AUTH`).*
4. Ejecutar **únicamente** un deploy de **Preview** (jamás `--prod`):
   ```powershell
   vercel deploy
   ```
   - Vercel detectará `VERCEL_ENV=preview`, construirá las **6 páginas** y devolverá la URL privada `https://<proyecto>-<hash>.vercel.app`.

---

## 7. Checklist de Verificación Posterior al Despliegue Online

Antes de enviarle el enlace a Trinidad:
1. Revisar el log de build en Vercel y confirmar `6 page(s) built`.
2. Abrir la URL Preview en una **ventana incógnito limpia** (sin cookies de Vercel ni credenciales):
   - Debe bloquear el acceso con Vercel Deployment Protection o solicitar usuario/clave (`401` Basic Auth). **No** debe mostrar la web directamente.
3. Probar en ventana incógnito con el acceso autorizado para cliente (**Shareable Link** o credenciales `BETA_AUTH_*`) desde escritorio y celular:
   - Recorrer `/`, `/preview-materiales`, `/preview-piletas` (filtros), `/preview-mesas`, `/preview-galeria` y `/preview-contacto`.
   - Probar el menú móvil (hamburguesa arriba, CTA WhatsApp abajo del menú abierto y redirección limpia a `wa.me/5491128242848`).
   - Probar carrusel de Instagram (`/p/...`) y acordeón FAQ.
4. Confirmar en DevTools (`F12` → Console) ausencia total de errores de consola o bloqueos de CSP en la URL real de Vercel.
5. Confirmar que el sitio/dominio público de producción (si ya existe en Vercel) no sufrió ningún cambio.
