/**
 * ==========================================================================
 * DATOS DE GALERÍA DE OBRAS — DODERA HERMANOS MARMOLERÍA
 * Estructura modular diseñada para reemplazar fácilmente imágenes ilustrativas
 * por obras reales verificadas (título, ubicación y material) en futuras fases.
 * ==========================================================================
 */

export const GALERIA_IS_PROVISIONAL = true;

export type GaleriaSpanClass =
  | 'span-7-landscape'
  | 'span-5-portrait'
  | 'span-5-portrait-left'
  | 'span-7-landscape-right'
  | 'span-12-panoramic'
  | 'span-6-half';

export interface GaleriaItem {
  id: string;
  num: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  width: number;
  height: number;
  spanClass: GaleriaSpanClass;
  isIllustrative: boolean;
  /**
   * Campos opcionales reservados para cuando el cliente entregue
   * fotografías reales con información verificada de cada obra.
   */
  title?: string;
  location?: string;
  material?: string;
  category?: string;
}

export const GALERIA_HERO_CONTENT = {
  eyebrow: 'GALERÍA DE OBRAS',
  title: 'Cada espacio, una expresión única.',
  description:
    'Explorá nuestra selección visual de espacios, materiales y posibilidades de diseño en piedra.',
  provisionalNotice:
    'Imágenes ilustrativas. Las fotografías de obras realizadas por DH Mármoles se incorporarán próximamente.'
} as const;

export const GALERIA_ITEMS: GaleriaItem[] = [
  {
    id: 'lamina-01',
    num: '01',
    image: '/assets/hero/hero-obra-alternativa.jpg',
    imageAlt: 'Imagen ilustrativa de cocina abierta con isla central y mesadas continuas en piedra',
    imagePosition: '58% center',
    width: 960,
    height: 535,
    spanClass: 'span-7-landscape',
    isIllustrative: true
  },
  {
    id: 'lamina-02',
    num: '02',
    image: '/assets/mesas/modelo-03-completa.jpg',
    imageAlt: 'Imagen ilustrativa de pieza de apoyo en piedra natural con luz natural y sombras proyectadas',
    imagePosition: 'center center',
    width: 900,
    height: 810,
    spanClass: 'span-5-portrait',
    isIllustrative: true
  },
  {
    id: 'lamina-03',
    num: '03',
    image: '/assets/mesas/modelo-01.jpg',
    imageAlt: 'Imagen ilustrativa de mesa de piedra natural junto a ventanal arquitectónico con luz natural',
    imagePosition: 'center center',
    width: 900,
    height: 810,
    spanClass: 'span-5-portrait-left',
    isIllustrative: true
  },
  {
    id: 'lamina-04',
    num: '04',
    image: '/assets/materiales/04-marmol.jpg',
    imageAlt: 'Imagen ilustrativa de alzada vertical y mesada con continuidad de veta natural',
    imagePosition: 'center center',
    width: 927,
    height: 600,
    spanClass: 'span-7-landscape-right',
    isIllustrative: true
  },
  {
    id: 'lamina-05',
    num: '05',
    image: '/assets/hero/hero-obra-principal.jpg',
    imageAlt: 'Imagen ilustrativa de cocina contemporánea con gran isla central e iluminación cálida',
    imagePosition: 'center 52%',
    width: 960,
    height: 535,
    spanClass: 'span-12-panoramic',
    isIllustrative: true
  },
  {
    id: 'lamina-06',
    num: '06',
    image: '/assets/materiales/02-cuarzo.jpg',
    imageAlt: 'Imagen ilustrativa de detalle arquitectónico en mesada clara bajo luz natural',
    imagePosition: 'center center',
    width: 927,
    height: 600,
    spanClass: 'span-6-half',
    isIllustrative: true
  },
  {
    id: 'lamina-07',
    num: '07',
    image: '/assets/materiales/03-sinterizados.jpg',
    imageAlt: 'Imagen ilustrativa de encuentro monolítico a 45° en superficie arquitectónica oscura',
    imagePosition: 'center center',
    width: 927,
    height: 600,
    spanClass: 'span-6-half',
    isIllustrative: true
  }
];

export const GALERIA_CTA_CONTENT = {
  title: 'Tu próximo proyecto puede empezar acá.',
  description: 'Contanos tu idea y te ayudamos a encontrar la mejor solución para tu espacio.',
  buttonLabel: 'Consultar por WhatsApp',
  whatsappMessage:
    'Hola Dodera Hermanos Marmolería, estuve viendo la galería y quisiera consultar por un proyecto.'
} as const;
