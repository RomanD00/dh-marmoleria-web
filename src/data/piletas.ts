/**
 * ==========================================================================
 * CATÁLOGO DE PILETAS Y BACHAS — DATOS DE DEMOSTRACIÓN (PROVISIONALES)
 * Dodera Hermanos Marmolería
 * 
 * NOTA EDITORIAL:
 * Estos modelos se presentan únicamente como muestra ilustrativa para
 * validación visual del diseño. No constituyen oferta comercial confirmada.
 * ==========================================================================
 */

import { getWhatsAppUrl } from '../config/site';

export type PiletaBrand = 'johnson' | 'neue';

export interface PiletaProduct {
  id: string;
  num: string;
  brand: PiletaBrand;
  brandLabel: string;
  name: string;
  image: string;
  imageAlt: string;
  whatsappUrl: string;
}

export interface BrandFilterOption {
  id: 'all' | PiletaBrand;
  label: string;
}

export const PILETAS_FILTERS: BrandFilterOption[] = [
  { id: 'all', label: 'Todas' },
  { id: 'johnson', label: 'Johnson' },
  { id: 'neue', label: 'Neue' }
];

export const PILETAS_PRODUCTS: PiletaProduct[] = [
  {
    id: 'johnson-luxor-si85',
    num: '01',
    brand: 'johnson',
    brandLabel: 'JOHNSON ACERO',
    name: 'LUXOR SI85',
    image: '/assets/piletas/placeholder-johnson-luxor-si85.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta Johnson Luxor SI85',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Johnson Luxor SI85.')
  },
  {
    id: 'johnson-quadra-q71',
    num: '02',
    brand: 'johnson',
    brandLabel: 'JOHNSON ACERO',
    name: 'QUADRA Q71',
    image: '/assets/piletas/placeholder-johnson-quadra-q71.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta Johnson Quadra Q71',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Johnson Quadra Q71.')
  },
  {
    id: 'johnson-curve-c37',
    num: '03',
    brand: 'johnson',
    brandLabel: 'JOHNSON ACERO',
    name: 'CURVE C37',
    image: '/assets/piletas/placeholder-johnson-curve-c37.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta Johnson Curve C37',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Johnson Curve C37.')
  },
  {
    id: 'neue-minimal-n50',
    num: '04',
    brand: 'neue',
    brandLabel: 'NEUE',
    name: 'MINIMAL N50',
    image: '/assets/piletas/placeholder-neue-minimal-n50.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta Neue Minimal N50',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Neue Minimal N50.')
  },
  {
    id: 'neue-lineal-n70',
    num: '05',
    brand: 'neue',
    brandLabel: 'NEUE',
    name: 'LINEAL N70',
    image: '/assets/piletas/placeholder-neue-lineal-n70.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta Neue Lineal N70',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Neue Lineal N70.')
  },
  {
    id: 'neue-quadro-duo-n80',
    num: '06',
    brand: 'neue',
    brandLabel: 'NEUE',
    name: 'QUADRO DUO N80',
    image: '/assets/piletas/placeholder-neue-quadro-duo-n80.svg',
    imageAlt: 'Esquema conceptual arquitectónico de pileta doble Neue Quadro Duo N80',
    whatsappUrl: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera consultar por la pileta Neue Quadro Duo N80.')
  }
];

export const PILETAS_HERO_CONTENT = {
  eyebrow: '02 / CATÁLOGO DE PILETAS',
  title: 'Piletas y bachas para tu proyecto.',
  description: 'Conocé los modelos de Johnson y Neue. Te ayudamos a elegir el más adecuado para tu mesada.',
  cadLabels: {
    radius: 'R 420',
    height: '240'
  }
};

export const PRE_FOOTER_CONTENT = {
  question: '¿No sabés qué pileta elegir?',
  actionLabel: 'Consultanos →',
  actionMessage: 'Hola Dodera Hermanos Marmolería, quisiera asesoramiento para elegir la pileta adecuada para mi proyecto.'
};
