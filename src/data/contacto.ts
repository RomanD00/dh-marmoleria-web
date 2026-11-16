/**
 * ==========================================================================
 * DATOS DE LA PÁGINA DE CONTACTO — DODERA HERMANOS MARMOLERÍA
 * Fuente centralizada de textos, opciones del formulario, horarios y enlaces.
 * Los datos institucionales (teléfono, redes) provienen de SITE_CONFIG.
 * ==========================================================================
 */

import { SITE_CONFIG, getWhatsAppUrl } from '../config/site';

export const CONTACTO_WHATSAPP_NUMBER = SITE_CONFIG.contact.whatsappNumber;

/**
 * Genera el enlace de WhatsApp para la página de Contacto reutilizando la configuración central.
 */
export function getContactoWhatsAppUrl(message: string): string {
  return getWhatsAppUrl(message);
}

export const CONTACTO_HERO_CONTENT = {
  eyebrow: '04 / CONTACTO',
  title: 'Las grandes ideas empiezan con una conversación.',
  description:
    'Contanos qué necesitás. Te asesoramos sobre materiales, medidas y opciones para tu proyecto.'
} as const;

export const CONTACTO_FORM_CONFIG = {
  title: 'Contanos tu proyecto.',
  nombreLabel: 'Nombre',
  nombrePlaceholder: 'Tu nombre y apellido',
  perfilLabel: 'Perfil',
  perfiles: ['Particular', 'Arquitecto / Diseñador', 'Otro profesional'] as const,
  defaultPerfil: 'Particular',
  tipoLabel: 'Tipo de consulta',
  tiposConsulta: [
    'Mesadas',
    'Islas',
    'Revestimientos',
    'Escaleras',
    'Piletas y Bachas',
    'Mesas de Arrime',
    'Otro'
  ] as const,
  descripcionLabel: 'Contanos un poco más',
  descripcionPlaceholder:
    'Escribí los detalles de tu idea, medidas aproximadas, materiales de interés o cualquier información que nos ayude a asesorarte mejor.',
  submitLabel: 'Continuar por WhatsApp',
  directLinkLabel: 'También podés escribirnos directamente.',
  directLinkMessage: 'Hola! Quisiera realizar una consulta sobre un proyecto en DH Mármoles.'
} as const;

export const CONTACTO_INFO_CONTENT = {
  title: 'Estamos para ayudarte.',
  whatsappDisplay: SITE_CONFIG.contact.phoneDisplay,
  whatsappDirectMessage: 'Hola! Quisiera hacer una consulta en DH Mármoles.',
  cobertura: 'CABA y Gran Buenos Aires',
  horarios: ['Lunes a viernes de 9 a 18 hs', 'Sábados de 9 a 13 hs'] as const,
  instagramLabel: 'Instagram: @dh.marmoleria',
  instagramUrl: SITE_CONFIG.social.instagramUrl,
  facebookLabel: 'Facebook: Dodera Hermanos Marmolería',
  facebookUrl: SITE_CONFIG.social.facebookUrl
} as const;

export const CONTACTO_PROFESIONALES_CONTENT = {
  title: '¿Sos arquitecto o diseñador?',
  description:
    'Si querés enviarnos planos o coordinar una consulta técnica, escribinos por WhatsApp y te acompañamos en la definición del proyecto.',
  linkLabel: 'Enviar consulta',
  whatsappMessage:
    'Hola! Soy arquitecto/diseñador y quisiera enviarles planos o coordinar una consulta técnica para un proyecto.'
} as const;

export const CONTACTO_DIFERENCIALES = [
  'Asesoramiento cercano.',
  'Cotizaciones sin cargo.',
  'Atención en CABA y GBA.',
  'Acompañamiento técnico y post-venta.'
] as const;

export const CONTACTO_FINAL_CTA = {
  title: '¿Listo para empezar?',
  description: 'Escribinos y te ayudamos a transformar tu idea en un proyecto concreto.',
  buttonLabel: 'Hablar por WhatsApp',
  whatsappMessage: 'Hola! Quisiera conversar sobre un proyecto en DH Mármoles.',
  image: '/assets/contacto/cta-marmol-detalle.jpg',
  imageAlt: 'Detalle de mesada de mármol natural terminada en taller'
} as const;
