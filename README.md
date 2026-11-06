# Dodera Hermanos Marmolería — Sitio Institucional

Implementación *pixel-perfect* de la homepage oficial de **Dodera Hermanos Marmolería** (Buenos Aires, cobertura en CABA y GBA), desarrollada en **HTML5 semántico, CSS3 moderno y JavaScript Vanilla**, lista para desplegar en **Vercel** y servir como referencia maestra para **WordPress + Elementor Pro**.

---

## 1. Arquitectura de Carpetas y Archivos

El proyecto está organizado bajo una estructura modular de producción, separando el código fuente, los activos fotográficos por sección, la configuración de seguridad/despliegue y la documentación técnica:

```text
dodera-hermanos-web/
├── index.html                  # Documento principal (HTML5, SEO, Open Graph, JSON-LD, Seguridad)
├── styles.css                  # Sistema de diseño, variables CSS, layout Grid/Flex y responsive
├── script.js                   # Interacciones Vanilla JS (Header sticky, Acordeón FAQ, Menú móvil)
├── vercel.json                 # Configuración de producción Vercel (Security Headers + Cache-Control)
├── site.webmanifest            # Web App Manifest e iconos de aplicación móvil
├── robots.txt                  # Directivas de indexación para buscadores
├── sitemap.xml                 # Mapa XML del sitio para SEO
├── .gitignore                  # Exclusión de archivos temporales y de sistema
├── .gitattributes              # Normalización de saltos de línea (LF) y tratamiento de binarios
├── README.md                   # Documentación general del proyecto
│
├── .well-known/
│   └── security.txt            # Estándar RFC 9116 para reporte y contacto de seguridad
│
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: validación automática de enlaces, recursos y seguridad
│
├── assets/                     # Activos estáticos de producción categorizados
│   ├── brand/                  # Identidad corporativa y metadatos visuales
│   │   ├── logo-dh-white.png   # Logotipo oficial en blanco (Header y Footer)
│   │   ├── logo-dh-dark.png    # Logotipo oficial en negro carbón
│   │   ├── logo-dh-original.png# Logotipo original en alta resolución (2000x2000)
│   │   ├── favicon.png         # Favicon 64x64 px
│   │   ├── apple-touch-icon.png# Icono iOS/Android 180x180 px
│   │   └── og-cover.jpg        # Imagen Open Graph 1200x630 px para compartir en WhatsApp/Redes
│   ├── hero/                   # Portada cinematográfica
│   │   ├── hero-obra-principal.jpg   # Obra real de isla Calacatta con inglete a 45°
│   │   └── hero-obra-alternativa.jpg # Fotografía alternativa de obra real
│   ├── catalogos/              # Sección 01. Catálogos
│   │   ├── 01-materiales.jpg   # Muestrario de mármoles, granitos, cuarzo y sinterizados
│   │   ├── 02-piletas.jpg      # Pileta / bacha integrada en piedra a medida
│   │   └── 03-mesas-arrime.jpg # Mesa de arrime con tapa de piedra natural y base de hierro
│   ├── arquitectos/            # Sección 03. Canal Exclusivo Profesionales
│   │   └── planos-marmol.jpg   # Planos técnicos de obra sobre bloque de mármol
│   ├── obras/                  # Sección 04. Obras Destacadas
│   │   ├── 01-cocina-residencial.jpg
│   │   ├── 02-bano-principal.jpg
│   │   └── 03-quincho-galeria.jpg
│   ├── taller/                 # Sección 05. Vida en el Taller (@DH.MARMOLERIA)
│   │   ├── 01-medicion.jpg
│   │   ├── 02-corte.jpg
│   │   ├── 03-placas.jpg
│   │   └── 04-pulido.jpg
│   └── textures/               # Fondos y texturas sutiles
│       └── marble-vein-subtle.jpg
│
└── docs/                       # Documentación de relevamiento y capturas de validación
    ├── briefing-dodera-hermanos.md
    ├── objetivos-de-la-web.md
    ├── deep-research-report.md
    └── screenshots/
        └── render-1440-final.png
```

---

## 2. Seguridad Implementada

El proyecto aplica medidas de seguridad tanto en el documento HTML como en la capa de transporte HTTP (`vercel.json`):

1. **Cabeceras HTTP de Seguridad (`vercel.json`):**
   - `Content-Security-Policy (CSP)`: Restringe la ejecución de scripts exclusivamente al dominio propio (`script-src 'self'`), permite tipografías de Google Fonts y bloquea la incrustación en marcos externos (`frame-ancestors 'none'`).
   - `Strict-Transport-Security (HSTS)`: Fuerza conexiones HTTPS con `max-age=63072000; includeSubDomains; preload`.
   - `X-Content-Type-Options: nosniff`: Previene ataques de *MIME-type sniffing*.
   - `X-Frame-Options: DENY`: Impide ataques de *Clickjacking*.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Protege la privacidad de navegación al salir hacia enlaces externos (WhatsApp e Instagram).
   - `Permissions-Policy`: Deshabilita explícitamente APIs sensibles del navegador (`camera`, `microphone`, `geolocation`, `payment`, `usb`).
2. **Protección de Enlaces Externos (*Tabnabbing*):**
   - Todos los enlaces con `target="_blank"` (WhatsApp, Instagram, Facebook) incluyen `rel="noopener noreferrer"`.
3. **Estándar RFC 9116 (`.well-known/security.txt`):**
   - Archivo de contacto oficial de seguridad para auditorías o reportes.

---

## 3. Flujo de Trabajo con GitHub y Despliegue en Vercel

### Subir a GitHub

El repositorio local ya cuenta con Git inicializado en la rama `main`, con `.gitignore`, `.gitattributes` y validación continua en `.github/workflows/ci.yml`. Para conectarlo a un repositorio remoto en GitHub:

```bash
git remote add origin https://github.com/TU-USUARIO/dodera-hermanos-web.git
git branch -M main
git push -u origin main
```

Cada vez que se realice un `git push`, la acción de GitHub verificará automáticamente que no existan imágenes rotas, que los archivos JSON sean válidos y que ningún enlace externo carezca de atributos de seguridad.

### Desplegar en Vercel

1. Ingresar a [vercel.com](https://vercel.com/) e importar el repositorio desde GitHub, o bien ejecutar desde la terminal con Vercel CLI:
   ```bash
   npx vercel --prod
   ```
2. **Configuración de Build:** No requiere framework ni paso de compilación (*Framework Preset: Other*, *Output Directory: `.`*).
3. Vercel detectará automáticamente el archivo `vercel.json` en la raíz, aplicando las cabeceras de seguridad y el caché inmutable de 1 año (`max-age=31536000, immutable`) para todas las imágenes de `assets/`.

---

## 4. Ejecución Local en Desarrollo

Para visualizar el sitio localmente:

```bash
python -m http.server 3000
```

Luego abrir `http://localhost:3000` en el navegador.

---

## 5. Tokens de Diseño para WordPress + Elementor Pro

Variables principales definidas en `:root` dentro de `styles.css`:

| Variable CSS | Valor | Aplicación en Elementor Pro |
|--------------|-------|-----------------------------|
| `--color-bg` | `#F9F8F5` | Fondo principal crema cálido |
| `--color-bg-secondary` | `#F4F3EE` | Fondo sección Diferenciales |
| `--color-bg-dark` | `#121210` | Fondo Hero y Footer |
| `--color-bg-dark-deep` | `#0D0E0D` | Fondo Canal Arquitectos |
| `--color-text-main` | `#141312` | Titulares y textos oscuros |
| `--color-text-muted` | `#686560` | Bajadas y descripciones |
| `--color-bronze` | `#9C724E` | Botones CTA, iconos y acentos |
| `--font-serif` | `'Cormorant Garamond', serif` | H1, H2, títulos de tarjetas, obras y preguntas FAQ |
| `--font-sans` | `'Plus Jakarta Sans', sans-serif` | Cuerpo de texto, navegación, etiquetas y botones |
| `--container-max-width`| `1320px` | Ancho máximo del contenedor principal |
| `--header-height` | `90px` (`68px` móvil) | Altura del Header Sticky |
