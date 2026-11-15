/**
 * ==========================================================================
 * CATÁLOGO DE MATERIALES — 4 FAMILIAS DE SUPERFICIES
 * Dodera Hermanos Marmolería (DH Mármoles)
 * ==========================================================================
 */

import { getWhatsAppUrl } from '../config/site';

/**
 * Flag global para la beta privada: las fotografías actuales de materiales y el hero
 * son imágenes de referencia/ilustrativas pendientes de curación definitiva con obra propia.
 */
export const MATERIALES_MEDIA_IS_PROVISIONAL = true;

export interface MaterialFamily {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  whatsappUrl: string;
  isProvisionalPhoto?: boolean;
}

export const MATERIALES_HERO_CONTENT = {
  eyebrow: '01 / CATÁLOGO DE MATERIALES',
  title: 'El carácter de cada material.',
  description: 'Cuatro familias de superficies, distintas formas de dar vida a un espacio.',
  image: '/assets/materiales/hero-materiales.jpg',
  imageAlt: 'Corte arquitectónico de piedra travertino natural en taller',
  isProvisionalPhoto: true
} as const;

export const MATERIALES_FAMILIES: MaterialFamily[] = [
  {
    id: 'granito',
    num: '01',
    name: 'GRANITO',
    subtitle: 'RESISTENCIA NATURAL',
    image: '/assets/materiales/01-granito.jpg',
    imageAlt: 'Mesada e isla en Granito natural macizo con encuentro a inglete',
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por opciones de Granito para mi proyecto.'
    )
  },
  {
    id: 'cuarzo',
    num: '02',
    name: 'CUARZO',
    subtitle: 'ESTÉTICA Y DURABILIDAD',
    image: '/assets/materiales/02-cuarzo.jpg',
    imageAlt: 'Mesada de cocina en Cuarzo de ingeniería con textura uniforme y luminosa',
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por opciones de Cuarzo para mi proyecto.'
    )
  },
  {
    id: 'sinterizados',
    num: '03',
    name: 'SINTERIZADOS',
    subtitle: 'TECNOLOGÍA DE ALTO RENDIMIENTO',
    image: '/assets/materiales/03-sinterizados.jpg',
    imageAlt: 'Volumen monolítico en piedra Sinterizada oscura de ultra compactación',
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por Superficies Sinterizadas para mi proyecto.'
    )
  },
  {
    id: 'marmol',
    num: '04',
    name: 'MÁRMOL',
    subtitle: 'ELEGANCIA ATEMPORAL',
    image: '/assets/materiales/04-marmol.jpg',
    imageAlt: 'Revestimiento y mesada en Mármol natural con vetas orgánicas seleccionadas',
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por opciones de Mármol para mi proyecto.'
    )
  }
];

export const MATERIALES_PREFOOTER_CONTENT = {
  question: '¿No sabés qué material elegir?',
  actionLabel: 'Consultanos →',
  actionMessage:
    'Hola Dodera Hermanos Marmolería, quisiera asesoramiento para elegir el material adecuado para mi proyecto.'
} as const;
