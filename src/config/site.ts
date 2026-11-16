/**
 * ==========================================================================
 * CONFIGURACIÓN CENTRALIZADA DEL SITIO — DODERA HERMANOS MARMOLERÍA
 * Fuente única de verdad para datos institucionales, WhatsApp, SEO y rutas.
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
 * INTERRUPTOR PRINCIPAL DE MODO BETA / LANZAMIENTO DEFINITIVO:
 * - true:  Emite <meta name="robots" content="noindex, nofollow" /> en todo el sitio
 *          mientras el contenido está en revisión privada con la clienta.
 * - false: Habilita la indexación (`index, follow`) en el lanzamiento definitivo.
 *          (Recordar cambiar también `IS_BETA_MODE` en `astro.config.mjs` y quitar
 *           el encabezado `X-Robots-Tag` en `vercel.json`).
 */
export const IS_BETA_MODE = true;

export const CATALOGS_PUBLISHED = true;
export const CONTACT_PAGE_PUBLISHED = true;
export const GALERIA_PAGE_PUBLISHED = true;

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
  publishedHref: string;
}

export interface NavItem {
  label: string;
  href: string;
  publishedHref?: string;
  hasPlus?: boolean;
  children?: NavSubItem[];
}

export const CATALOG_DROPDOWN_ITEMS: NavSubItem[] = [
  {
    id: 'materiales',
    num: '01',
    label: 'Materiales',
    href: '#catalogos',
    publishedHref: '/materiales'
  },
  {
    id: 'piletas',
    num: '02',
    label: 'Piletas',
    href: '#catalogos',
    publishedHref: '/piletas-y-bachas'
  },
  {
    id: 'mesas',
    num: '03',
    label: 'Mesas de Arrime',
    href: '#catalogos',
    publishedHref: '/mesas-de-arrime'
  }
];

/**
 * Resuelve el href de un ítem de catálogo en el navbar hacia su ruta definitiva.
 */
export function resolveCatalogNavHref(item: NavSubItem, headerTheme: 'dark' | 'light' = 'dark'): string {
  if (CATALOGS_PUBLISHED) {
    return item.publishedHref;
  }
  return headerTheme === 'light' && item.href.startsWith('#') ? `/${item.href}` : item.href;
}

/**
 * Resuelve el href de un ítem de primer nivel en navbar o footer.
 */
export function resolveMainNavHref(item: NavItem, headerTheme: 'dark' | 'light' = 'dark'): string {
  if (item.label === 'Inicio') {
    return headerTheme === 'light' ? '/' : '#hero';
  }

  const isPublished =
    (item.publishedHref === '/contacto' && CONTACT_PAGE_PUBLISHED) ||
    (item.publishedHref === '/galeria' && GALERIA_PAGE_PUBLISHED);

  if (item.publishedHref && isPublished) {
    return item.publishedHref;
  }
  return headerTheme === 'light' && item.href.startsWith('#') ? `/${item.href}` : item.href;
}

/**
 * Resuelve el destino de Galería / "Ver todas las obras".
 */
export function resolveGaleriaHref(headerTheme: 'dark' | 'light' = 'dark'): string {
  if (GALERIA_PAGE_PUBLISHED) {
    return '/galeria';
  }
  return headerTheme === 'light' ? '/#obras' : '#obras';
}

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Inicio',
    href: '#hero',
    publishedHref: '/'
  },
  {
    label: 'Catálogo',
    href: '#catalogos',
    hasPlus: true,
    children: CATALOG_DROPDOWN_ITEMS
  },
  {
    label: 'Galería',
    href: '#obras',
    publishedHref: '/galeria'
  },
  {
    label: 'Contacto',
    href: '#contacto',
    publishedHref: '/contacto'
  }
];
