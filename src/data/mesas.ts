/**
 * ==========================================================================
 * CATÁLOGO DE MESAS DE ARRIME — DATOS DE DEMOSTRACIÓN (PROVISIONALES)
 * Dodera Hermanos Marmolería (DH Mármoles)
 *
 * NOTA EDITORIAL Y COMERCIAL:
 * - Estos cuatro registros ("Modelo 01" a "Modelo 04") son muestras
 *   ilustrativas provisionales para validación visual de la grilla editorial.
 * - No se inventan nombres comerciales, precios, dimensiones, terminaciones
 *   ni disponibilidad.
 * - Cada tarjeta del catálogo representa una pieza individual completa
 *   (no se asume comercialización en conjunto cuando una fotografía incluye
 *   dos piezas en ambientación).
 * - Las fotografías de detalles constructivos quedan reservadas en el campo
 *   opcional `detailImage` para su futuro uso en fichas individuales.
 * ==========================================================================
 */

import { getWhatsAppUrl } from '../config/site';

export interface MesaModel {
  id: string;
  num: string;
  name: string;
  image: string;
  imageAlt: string;
  detailImage?: string;
  detailImageAlt?: string;
  isProvisional: boolean;
  editorialNote?: string;
  whatsappUrl: string;
}

export const MESAS_HERO_CONTENT = {
  eyebrow: '03 / MESAS DE ARRIME',
  title: 'Mesas de arrime.',
  description:
    'Mesas con estructura de hierro y tapas de piedra. Conocé los modelos y terminaciones disponibles.',
  image: '/assets/mesas/hero-mesas-arrime.jpg',
  imageAlt:
    'Detalle constructivo de mesa de arrime con tapa de piedra natural veteada sobre estructura de hierro negro'
} as const;

export const MESAS_PROVISIONAL_NOTE =
  'Modelos ilustrativos de referencia. La colección final se completará con las piezas definidas por DH Mármoles.';

export const MESAS_PREFOOTER_CONTENT = {
  question: '¿Querés incorporar una pieza a tu espacio?',
  subtitle: 'Consultanos por medidas, terminaciones y disponibilidad de modelos.',
  actionLabel: 'Consultar por WhatsApp',
  actionMessage:
    'Hola Dodera Hermanos Marmolería, quisiera consultar por medidas, terminaciones y disponibilidad de mesas de arrime.'
} as const;

export const MESAS_MODELS: MesaModel[] = [
  {
    id: 'modelo-01',
    num: '01',
    name: 'Modelo 01',
    image: '/assets/mesas/modelo-01.jpg',
    imageAlt:
      'Mesa de arrime Modelo 01 con estructura de hierro negro y tapa circular de piedra natural (muestra provisional)',
    isProvisional: true,
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por la mesa de arrime Modelo 01 (referencia provisional del catálogo).'
    )
  },
  {
    id: 'modelo-02',
    num: '02',
    name: 'Modelo 02',
    image: '/assets/mesas/modelo-02.jpg',
    imageAlt:
      'Mesa de arrime Modelo 02 con estructura de hierro y tapa circular de piedra natural oscura — pieza individual de referencia (muestra provisional)',
    isProvisional: true,
    editorialNote:
      'Referencia de pieza individual; la ambientación con dos mesas no implica venta en conjunto.',
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por la mesa de arrime Modelo 02 (referencia provisional del catálogo).'
    )
  },
  {
    id: 'modelo-03',
    num: '03',
    name: 'Modelo 03',
    image: '/assets/mesas/modelo-03-completa.jpg',
    imageAlt:
      'Mesa de arrime Modelo 03 con estructura de hierro negro y tapa de piedra travertino natural (muestra provisional)',
    detailImage: '/assets/mesas/modelo-03-detalle.jpg',
    detailImageAlt:
      'Fotografía de detalle del encuentro entre tapa de piedra y estructura de hierro del Modelo 03 (reservada para futura ficha individual)',
    isProvisional: true,
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por la mesa de arrime Modelo 03 (referencia provisional del catálogo).'
    )
  },
  {
    id: 'modelo-04',
    num: '04',
    name: 'Modelo 04',
    image: '/assets/mesas/modelo-04.jpg',
    imageAlt:
      'Mesa de arrime Modelo 04 con estructura prismática de hierro negro y tapa cuadrada de piedra natural (muestra provisional)',
    isProvisional: true,
    whatsappUrl: getWhatsAppUrl(
      'Hola Dodera Hermanos Marmolería, quisiera consultar por la mesa de arrime Modelo 04 (referencia provisional del catálogo).'
    )
  }
];
