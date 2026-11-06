/**
 * ==========================================================================
 * DATOS DE DIFERENCIALES — DODERA HERMANOS MARMOLERÍA
 * Los 4 valores diferenciales aprobados para la franja institucional.
 * ==========================================================================
 */

export interface DiferencialItem {
  id: string;
  icon: 'clock' | 'heart' | 'crosshair' | 'file';
  title: string;
  description: string;
}

export const DIFERENCIALES_ITEMS: DiferencialItem[] = [
  {
    id: 'entregas',
    icon: 'clock',
    title: 'Entregas inmediatas',
    description: 'Cumplimos en tiempo y forma para que tu obra avance con agilidad y sin demoras.'
  },
  {
    id: 'asesoramiento',
    icon: 'heart',
    title: 'Asesoramiento personalizado',
    description: 'Te ayudamos a elegir el material ideal con criterio técnico y acompañamiento cercano.'
  },
  {
    id: 'precision',
    icon: 'crosshair',
    title: 'Precisión milimétrica',
    description: 'Corte, terminaciones y colocación con la más alta precisión.'
  },
  {
    id: 'cotizaciones',
    icon: 'file',
    title: 'Cotizaciones sin cargo',
    description: 'Sin compromiso y sin vueltas. Sin sorpresas.'
  }
];
