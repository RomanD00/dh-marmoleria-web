/**
 * ==========================================================================
 * DATOS DE OBRAS DESTACADAS — DODERA HERMANOS MARMOLERÍA
 * Fotografías y fichas de proyectos para Homepage y Galería.
 * ==========================================================================
 */

/**
 * Flag de beta privada: las tarjetas actuales de 02 / Obras muestran fotos de referencia
 * hasta recibir la selección final de obras reales para la Galería definitiva.
 */
export const OBRAS_GALLERY_IS_PROVISIONAL = true;

export interface ObraItem {
  id: string;
  title: string;
  specs: string;
  image: string;
  imageAlt: string;
  category?: string;
  isProvisionalPhoto?: boolean;
}

export const OBRAS_DESTACADAS: ObraItem[] = [
  {
    id: 'cocina-residencial',
    title: 'Cocina residencial',
    specs: 'Mármol Calacatta | Isla con inglete a 45°',
    image: '/assets/obras/01-cocina-residencial.jpg',
    imageAlt: 'Cocina residencial con isla en Mármol Calacatta',
    category: 'Cocinas e Islas'
  },
  {
    id: 'bano-principal',
    title: 'Baño principal',
    specs: 'Cuarzo | Bacha integrada',
    image: '/assets/obras/02-bano-principal.jpg',
    imageAlt: 'Baño principal con mesada en Cuarzo y bacha integrada',
    category: 'Baños y Vanitorys'
  },
  {
    id: 'quincho-galeria',
    title: 'Quincho y galería',
    specs: 'Granito | Mesadas y revestimientos',
    image: '/assets/obras/03-quincho-galeria.jpg',
    imageAlt: 'Quincho y galería exterior con mesadas en Granito',
    category: 'Quinchos y Exteriores'
  }
];

export const GALERIA_COMPLETA: ObraItem[] = [
  ...OBRAS_DESTACADAS,
  {
    id: 'isla-calacatta-central',
    title: 'Isla central y alzada continua',
    specs: 'Mármol seleccionado | Faldón perimetral a 45°',
    image: '/assets/hero/hero-obra-principal.jpg',
    imageAlt: 'Cocina y gran isla central con inglete a 45° en mármol Calacatta realizada por Dodera Hermanos Marmolería',
    category: 'Cocinas e Islas'
  },
  {
    id: 'pileta-integrada-piedra',
    title: 'Pileta armada en piedra natural',
    specs: 'Mármol | Bacha monolítica con escurridor',
    image: '/assets/catalogos/02-piletas.jpg',
    imageAlt: 'Pileta y bacha armada e integrada en mármol con escurridor acanalado',
    category: 'Piletas y Bachas'
  },
  {
    id: 'consola-recibidor-marmol',
    title: 'Consola de recibidor a medida',
    specs: 'Piedra natural + Base de hierro negro',
    image: '/assets/catalogos/03-mesas-arrime.jpg',
    imageAlt: 'Mesa de arrime de diseño con tapa maciza de mármol y base de hierro negro',
    category: 'Mobiliario'
  }
];
