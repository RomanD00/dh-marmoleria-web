# Guía de Despliegue y Validación — Beta Privada 16 de Noviembre (DH Mármoles)

Documento operativo para publicar, proteger y presentar la beta navegable de **Dodera Hermanos Marmolería (DH Mármoles)** en un entorno **Vercel Preview**, manteniendo intacto el sitio público de producción.

---

## 1. Estrategia de Ramas Git y Respaldo

Para garantizar cero impacto sobre la rama pública (`main`):

| Rama | Rol | Estado |
|---|---|---|
| `main` | Producción pública actual | **Intacta** (commit previo a la preparación de beta) |
| `backup/pre-beta-16-nov` | Punto de respaldo recuperable previo a cambios de beta | Creada y preservada con el snapshot completo |
| `beta/trinidad-16-nov` | Rama de trabajo de la beta navegable del 16 de noviembre | Contiene configuración Preview + control de acceso + marcas provisionales |

> Si en cualquier momento necesitás volver exactamente al estado anterior a esta preparación, usá `git checkout backup/pre-beta-16-nov`.

---

## 2. Separación Producción vs. Beta Preview

Se mantuvo intacto el criterio editorial de flags públicos:

- `CATALOGS_PUBLISHED = false` (`src/config/site.ts`)
- `CONTACT_PAGE_PUBLISHED = false` (`src/config/site.ts`)

En su lugar, la exposición de rutas beta depende automáticamente del entorno:

1. **Rutas de página (`astro.config.mjs`)**:
   - Solo incorpora las páginas de `src/pages-preview/` (`/preview-materiales`, `/preview-piletas`, `/preview-mesas`, `/preview-contacto`) cuando `VERCEL_ENV === 'preview'`, `ENABLE_PREVIEW=true` o `--preview`.
   - En el build de producción convencional (`npm run build`, equivalente a Vercel Production), **ninguna ruta `/preview-*` se compila ni entra al sitemap**.
2. **Navegación contextual (`src/config/site.ts`)**:
   - `isPreviewEnvironment()` ahora incluye `process.env.VERCEL_ENV === 'preview'`.
   - En beta (`VERCEL_ENV === 'preview'` o `npm run build:preview` / `npm run build:beta`), las tarjetas `01`, `02`, `03`, el dropdown `Catálogos` y los enlaces de `Contacto` apuntan a `/preview-materiales`, `/preview-piletas`, `/preview-mesas` y `/preview-contacto`.
   - `Galería` permanece vinculada provisionalmente a `/#obras`.
   - En build de producción (`npm run build`), toda la navegación apunta únicamente a `/` y `#anclas` / WhatsApp, sin referencias a `/preview-*`.
3. **Redirecciones y cabeceras (`vercel.json`)**:
   - La redirección `/preview-(.*) -> /` quedó restringida mediante condición `has` (`type: "host"`) al dominio público (`dhmarmoleria.com.ar` / `dhmarmoles.com.ar` y variante `www`), de modo que los subdominios de **Vercel Preview (`*.vercel.app`)** sirvan las rutas `/preview-*` normalmente sin redirigirlas.
   - Toda ruta `/preview-(.*)` recibe cabeceras HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` y `Cache-Control: private, no-cache, no-store, must-revalidate`.
4. **Etiqueta `<meta name="robots">` (`src/components/SEO.astro`)**:
   - En compilaciones preview/beta emite `noindex, nofollow` en todas las páginas (incluida la homepage de preview); en producción emite `index, follow`.

---

## 3. Control de Acceso Privado en Vercel

`noindex` impide indexación en buscadores, **no restringe acceso**. Para que la beta sea realmente privada antes de compartir el enlace con Trinidad, se disponen dos capas complementarias:

### Opción A (Recomendada — Nativa de Vercel): **Vercel Deployment Protection**
En **Vercel Dashboard → Project Settings → Deployment Protection**:
1. Activar **Standard Protection** (incluye Preview Deployments; disponible sin costo en Vercel Hobby y planes superiores) o **Password Protection** (si el equipo cuenta con el add-on correspondiente).
2. En el despliegue Preview generado para la beta, generar un **Shareable Link** (enlace con bypass token temporal o revocable) desde el panel del deployment, o invitar a Trinidad por correo con acceso de Preview sin acceso al repo.
3. Esta barrera actúa en la red Edge de Vercel antes de entregar HTML o archivos estáticos y permite revocar el acceso en un clic después de la presentación.

### Opción B (Incluida en el repo — HTTP Basic Auth en Edge): `middleware.js`
En la raíz del proyecto se incorporó `middleware.js` (Vercel Routing Middleware sin secretos en código):
- **Nunca se activa en Producción** (`VERCEL_ENV === 'production'` pasa directo sin bloqueo).
- En **Preview** (`VERCEL_ENV === 'preview'`), se activa al definir en **Vercel → Settings → Environment Variables** (marcar **únicamente el casillero `Preview`**, NO `Production`):
  - `BETA_AUTH_PASSWORD`: clave elegida al momento del deploy (nunca guardada en Git).
  - `BETA_AUTH_USER` *(opcional)*: usuario de acceso (por defecto `dh-beta`).
  - `BETA_REQUIRE_AUTH`: definir en `true` si querés comportamiento *fail-closed* (devuelve `503` si alguien desplegase la beta olvidando cargar `BETA_AUTH_PASSWORD`).

> **Importante:** No tildar `Production` ni `Development` innecesariamente al cargar `BETA_AUTH_*`; limitar las variables exclusivamente a **Preview**.

---

## 4. Qué es Real y Qué es Provisional en Esta Beta

Al presentarle el sitio a Trinidad, conviene aclarar explícitamente este inventario (también reflejado en los archivos de `src/data/`):

### Contenido real / aprobado en sitio
- **Identidad y arquitectura visual** de Homepage, Header global, Footer global, 3 Catálogos y Contacto.
- **Datos de contacto y WhatsApp oficial**: `+54 11 2824-2848` (`wa.me/5491128242848`) y enlaces de Instagram / Facebook en `src/config/site.ts`.
- **Sección `05 / Instagram` (`src/data/instagram.ts`)**: publicaciones reales de `@dh.marmoleria` con permalinks directos (`/p/...`) e imágenes locales curadas.
- **Formulario de Contacto (`ContactoPageContent.astro`)**: arma consulta contextual estructurada hacia WhatsApp manteniendo compatibilidad estricta con CSP (`script-src 'self'`).

### Contenido provisional pendiente de entrega del cliente
- **Preguntas Frecuentes (`src/data/faqs.ts`)**: `FAQ_IS_PLACEHOLDER = true` — títulos `Pregunta 1` a `Pregunta 4` con texto placeholder (`"Aquí irá la respuesta a la pregunta X."`) y marcado JSON-LD `FAQPage` desactivado temporalmente para SEO limpio.
- **Catálogo de Piletas y Bachas (`src/data/piletas.ts`)**: modelos e imágenes curadas de referencia (Johnson / Neue) etiquetados como base estructural para validar curaduría, códigos y stock real con DH Mármoles.
- **Catálogo de Mesas de Arrime (`src/data/mesas.ts`)**: modelos y fotografías de referencia (`Modelo 01` a `Modelo 04`) sujetos a reemplazo por piezas/fotos finales de taller.
- **Catálogo de Materiales (`src/data/materiales.ts`)**: `MATERIALES_MEDIA_IS_PROVISIONAL = true` — estructura de 4 familias confirmada; fotografías de hero y tarjetas actualmente ilustrativas/referenciales.
- **Tarjetas de Portada `01 / Catálogos` (`src/data/catalogos.ts`) y `02 / Obras` (`src/data/obras.ts`)**: `CATALOGOS_HOME_MEDIA_IS_PROVISIONAL = true` y `OBRAS_GALLERY_IS_PROVISIONAL = true` — fotografías de referencia provisorias; `Galería` en menú apunta a `/#obras` hasta contar con galería definitiva de obras reales.
- **Páginas de detalle individual**: postergadas para una etapa posterior a la aprobación de catálogos.

---

## 5. Qué Falta Configurar en Vercel / Git para Compartir Acceso con Trinidad

Al momento de preparar este entregable:
- El repositorio local todavía no tiene un `remote` Git configurado ni una carpeta `.vercel` vinculada.
- No se realizó ningún despliegue público ni de preview automáticamente.

Pasos para publicar la beta privada sin tocar producción:
1. *(Si usás Git + Vercel)* Subir la rama `beta/trinidad-16-nov` (sin mergear a `main`) a tu repositorio remoto (GitHub/GitLab/Bitbucket) conectado en Vercel. Vercel generará automáticamente un **Preview Deployment** aislado con URL `*.vercel.app` usando `VERCEL_ENV=preview`.
2. *(O por CLI desde esta carpeta, una vez iniciada sesión con `vercel login` y vinculado el proyecto con `vercel link`)* Desplegar **exclusivamente** como Preview (jamás `--prod`):
   ```bash
   vercel deploy
   ```
3. Configurar el candado privado elegido (**Vercel Deployment Protection + Shareable Link** y/o variables `BETA_AUTH_PASSWORD`, `BETA_AUTH_USER`, `BETA_REQUIRE_AUTH=true` en ámbito **Preview**) y re-desplegar si agregaste variables después del primer build.
4. En el Dashboard de Vercel, confirmar en **Settings → Domains** que el dominio público (`dhmarmoleria.com.ar`) siga asignado **únicamente al deployment de Producción (`main`)**.

---

## 6. Lista de Verificación Pre-Envío (Antes de Mandarle el Link a Trinidad)

1. **Control de acceso activo**: abrir la URL `*.vercel.app` en una ventana incógnito sin sesión ni token → debe pedir autenticación (Deployment Protection o popup HTTP Basic Auth `401`) y **no** mostrar el sitio directamente.
2. **Probar acceso de invitado**: validar en ventana incógnito el **Shareable Link** (o usuario/clave `BETA_AUTH_USER` / `BETA_AUTH_PASSWORD` cargados en Preview) en desktop y teléfono (iOS/Android).
3. **Recorrido completo en beta**:
   - Portada `/`: logos nítidos en Header/Footer, tarjetas `01 / 02 / 03`, sección `02 / Obras`, carrusel `05 / Instagram` (verificar que las flechas avancen y cada imagen abra su `/p/...` real), acordeón `06 / Preguntas Frecuentes` (`Pregunta 1`..`4`).
   - Navegar por `/preview-materiales`, `/preview-piletas` (probar filtros `Todas`, `Johnson`, `Neue`), `/preview-mesas` y `/preview-contacto` (probar envío hacia `wa.me/5491128242848`).
   - Confirmar que `Galería` desplaza suavemente a `#obras` en portada (o vuelve a `/#obras` desde subpáginas).
4. **Producción intacta**: verificar que el dominio público de producción siga respondiendo con la versión anterior sin rutas `/preview-*`.
5. **Consola y CSP limpios**: comprobar en DevTools (`F12`) que no existan errores de consola ni bloqueos de `Content-Security-Policy`.
