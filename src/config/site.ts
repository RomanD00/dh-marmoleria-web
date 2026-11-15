/**
 * ==========================================================================
 * CONFIGURACIÓN CENTRALIZADA DEL SITIO — DODERA HERMANOS MARMOLERÍA
 * Fuente única de verdad para datos institucionales, WhatsApp, SEO y rutas.
 * Para actualizar teléfono, redes o mensajes, editar únicamente este archivo.
 * ==========================================================================
 */

export const SITE_CONFIG = {
  name: 'Dodera Hermanos Marmolería',
  shortName: 'DH Marmolería',
  slogan: 'Piedra. Diseño. Oficio.',
  url: 'https://dhmarmoleria.com.ar',
  locale: 'es_AR',
  coverage: 'CABA Y GBA',
  foundingYear: '2026',
  copyrightYear: '2026',
  contact: {
    phoneDisplay: '+54 11 2824-2848',
    phoneSchema: '+54-11-2824-2848',
    whatsappNumber: '5491128242848',
    defaultMessage: 'Hola Dodera Hermanos Marmolería, quisiera solicitar un presupuesto.'
  },
  legal: {
    privacyHref: null as string | null,
    termsHref: null as string | null,
    procesosHref: '/#taller'
  },
  social: {
    instagramHandle: '@DH.MARMOLERIA',
    instagramUrl: 'https://www.instagram.com/dh.marmoleria/',
    facebookUrl: 'https://web.facebook.com/profile.php?id=100068510846029'
  },
  ogImage: '/assets/brand/og-cover.jpg',
  logoWhite: '/assets/brand/logo-dh-white.png',
  logoDark: '/assets/brand/logo-dh-dark.png'
} as const;

/**
 * Genera un enlace seguro de WhatsApp con mensaje prearmado codificado.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || SITE_CONFIG.contact.defaultMessage);
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`;
}

export type CatalogSlug = 'materiales' | 'piletas' | 'mesas';

export interface NavSubItem {
  id: CatalogSlug;
  num: string;
  label: string;
  href: string;
  previewHref: string;
  publishedHref: string;
}

export interface NavItem {
  label: string;
  href: string;
  previewHref?: string;
  publishedHref?: string;
  hasPlus?: boolean;
  children?: NavSubItem[];
}

/**
 * Controla si las páginas definitivas de los 3 catálogos están publicadas en producción.
 * - false: En build de producción (`npm run build`), no se generan enlaces a `/preview-*`
 *          y se mantienen los destinos seguros aprobados para la homepage.
 * - true:  Cuando se publiquen las páginas definitivas, los enlaces apuntarán a
 *          `/materiales/`, `/piletas-y-bachas/` y `/mesas-de-arrime/`.
 */
export const CATALOGS_PUBLISHED = false;

/**
 * Controla si la página definitiva de Contacto está publicada en producción.
 * - false: En desarrollo apunta a `/preview-contacto`; en producción conserva `#contacto`.
 * - true:  Cuando se publique la página definitiva, apuntará a `/contacto`.
 */
export const CONTACT_PAGE_PUBLISHED = false;

/**
 * Detecta si la compilación o servidor actual corre en entorno local / preview.
 */
export function isPreviewEnvironment(): boolean {
  return (
    import.meta.env.DEV ||
    process.env.ENABLE_PREVIEW === 'true' ||
    process.argv.includes('--preview') ||
    process.argv.includes('preview')
  );
}

export const CATALOG_DROPDOWN_ITEMS: NavSubItem[] = [
  {
    id: 'materiales',
    num: '01',
    label: 'Materiales',
    href: '#catalogos',
    previewHref: '/preview-materiales',
    publishedHref: '/materiales/'
  },
  {
    id: 'piletas',
    num: '02',
    label: 'Piletas',
    href: '#catalogos',
    previewHref: '/preview-piletas',
    publishedHref: '/piletas-y-bachas/'
  },
  {
    id: 'mesas',
    num: '03',
    label: 'Mesas de Arrime',
    href: '#catalogos',
    previewHref: '/preview-mesas',
    publishedHref: '/mesas-de-arrime/'
  }
];

/**
 * Resuelve el href de un ítem de catálogo en el navbar según el entorno:
 * 1. Si CATALOGS_PUBLISHED === true -> ruta definitiva (`/materiales/`, `/piletas-y-bachas/`, `/mesas-de-arrime/`)
 * 2. Si estamos en dev/preview local -> ruta preview (`/preview-materiales`, `/preview-piletas`, `/preview-mesas`)
 * 3. En producción mientras no estén publicados -> destino seguro en la homepage (`#catalogos` o `/#catalogos`)
 */
export function resolveCatalogNavHref(item: NavSubItem, headerTheme: 'dark' | 'light' = 'dark'): string {
  if (CATALOGS_PUBLISHED) {
    return item.publishedHref;
  }
  if (isPreviewEnvironment()) {
    return item.previewHref;
  }
  return headerTheme === 'light' && item.href.startsWith('#') ? `/${item.href}` : item.href;
}

/**
 * Resuelve el href de un ítem de primer nivel en el navbar o footer según el entorno:
 * 1. Si tiene ruta publicada y CONTACT_PAGE_PUBLISHED === true -> ruta definitiva (`/contacto`)
 * 2. Si tiene ruta preview y estamos en dev/preview local -> ruta preview (`/preview-contacto`)
 * 3. En producción mientras no esté publicado -> destino seguro (`#contacto` o `/#contacto`)
 */
export function resolveMainNavHref(item: NavItem, headerTheme: 'dark' | 'light' = 'dark'): string {
  if (item.publishedHref && CONTACT_PAGE_PUBLISHED) {
    return item.publishedHref;
  }
  if (item.previewHref && isPreviewEnvironment()) {
    return item.previewHref;
  }
  return headerTheme === 'light' && item.href.startsWith('#') ? `/${item.href}` : item.href;
}

/**
 * Navegación principal aprobada de la Homepage.
 * Mientras las páginas internas estén en revisión/borrador, las anclas
 * dirigen a las secciones correspondientes de la portada aprobada.
 */
export const MAIN_NAV: NavItem[] = [
  {
    label: 'Inicio',
    href: '#hero'
  },
  {
    label: 'Catálogo',
    href: '#catalogos',
    hasPlus: true,
    children: CATALOG_DROPDOWN_ITEMS
  },
  {
    label: 'Galería',
    href: '#obras'
  },
  {
    label: 'Contacto',
    href: '#contacto',
    previewHref: '/preview-contacto',
    publishedHref: '/contacto'
  }
];

/**
 * Plan de arquitectura de rutas futuras para cuando la clienta apruebe
 * el diseño y contenido definitivo de cada sección:
 * - /materiales (4 tarjetas 2x2: Mármol, Granito, Cuarzo, Sinterizado + futuras páginas de detalle)
 * - /piletas-y-bachas (grilla unificada con filtros: Todas, Johnson, Neue)
 * - /mesas-de-arrime (grilla editorial de modelos sin filtros)
 * - /galeria (portafolio completo de obras reales y taller)
 * - /contacto (formulario/atención a estudios y particulares)
 */
export const FUTURE_CATALOG_ROUTES = [
  { label: '01. Materiales', href: '/materiales' },
  { label: '02. Piletas y Bachas', href: '/piletas-y-bachas' },
  { label: '03. Mesas de Arrime', href: '/mesas-de-arrime' }
] as const;
