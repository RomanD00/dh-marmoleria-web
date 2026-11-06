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
  copyrightYear: '2024',
  contact: {
    phoneDisplay: '+54 11 2824-2848',
    phoneSchema: '+54-11-2824-2848',
    whatsappNumber: '5491128242848',
    defaultMessage: 'Hola Dodera Hermanos Marmolería, quisiera solicitar un presupuesto.'
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

export interface NavItem {
  label: string;
  href: string;
  hasPlus?: boolean;
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
    hasPlus: true
  },
  {
    label: 'Galería',
    href: '#obras'
  },
  {
    label: 'Contacto',
    href: '#contacto'
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
