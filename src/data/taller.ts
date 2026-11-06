/**
 * ==========================================================================
 * DATOS DE VIDA EN EL TALLER — DODERA HERMANOS MARMOLERÍA
 * Procesos reales de fabricación: medición, corte, placas y pulido.
 * ==========================================================================
 */

export interface TallerPhoto {
  id: string;
  step: string;
  title: string;
  image: string;
  imageAlt: string;
}

export const TALLER_PHOTOS: TallerPhoto[] = [
  {
    id: 'medicion',
    step: '01',
    title: 'Medición y trazado',
    image: '/assets/taller/01-medicion.jpg',
    imageAlt: 'Operario midiendo y trazando cortes con precisión en piedra natural'
  },
  {
    id: 'corte',
    step: '02',
    title: 'Corte diamantado',
    image: '/assets/taller/02-corte.jpg',
    imageAlt: 'Corte milimétrico con disco diamantado y refrigeración por agua'
  },
  {
    id: 'placas',
    step: '03',
    title: 'Selección de placas',
    image: '/assets/taller/03-placas.jpg',
    imageAlt: 'Placas y tablas de mármol y granito seleccionadas en taller'
  },
  {
    id: 'pulido',
    step: '04',
    title: 'Terminación y pulido',
    image: '/assets/taller/04-pulido.jpg',
    imageAlt: 'Pulido artesanal y terminación de cantos en piedra'
  }
];
