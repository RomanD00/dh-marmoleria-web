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

export const OBRAS_PROVISIONAL_NOTICE =
  'Imágenes ilustrativas. Las fotografías de obras realizadas se incorporarán próximamente.';

export const OBRAS_DESTACADAS: ObraItem[] = [
  {
    id: 'cocina-residencial',
    title: 'Cocinas e islas centrales',
    specs: 'Superficies continuas e integración a medida',
    image: '/assets/hero/hero-obra-alternativa.jpg',
    imageAlt: 'Imagen ilustrativa de cocina arquitectónica con isla central en piedra',
    category: 'Cocinas e Islas',
    isProvisionalPhoto: true
  },
  {
    id: 'bano-principal',
    title: 'Mesadas y bachas integradas',
    specs: 'Encuentros limpios y terminaciones a medida',
    image: '/assets/materiales/02-cuarzo.jpg',
    imageAlt: 'Imagen ilustrativa de mesada continua con bacha e iluminación natural',
    category: 'Mesadas y Baños',
    isProvisionalPhoto: true
  },
  {
    id: 'quincho-galeria',
    title: 'Revestimientos y alzadas continuas',
    specs: 'Vetas continuas y bloques arquitectónicos en piedra',
    image: '/assets/materiales/04-marmol.jpg',
    imageAlt: 'Imagen ilustrativa de revestimiento mural y mesada en piedra veteada',
    category: 'Revestimientos',
    isProvisionalPhoto: true
  }
];

export const GALERIA_COMPLETA: ObraItem[] = [
  ...OBRAS_DESTACADAS,
  {
    id: 'isla-calacatta-central',
    title: 'Espacios residenciales de gran escala',
    specs: 'Imágenes ilustrativas de referencia arquitectónica',
    image: '/assets/hero/hero-obra-principal.jpg',
    imageAlt: 'Imagen ilustrativa de ambiente de cocina con isla central en piedra',
    category: 'Cocinas e Islas',
    isProvisionalPhoto: true
  },
  {
    id: 'pileta-integrada-piedra',
    title: 'Piletas y mesadas monolíticas',
    specs: 'Imágenes ilustrativas de referencia en taller',
    image: '/assets/catalogos/02-piletas.jpg',
    imageAlt: 'Imagen ilustrativa de pileta y mesada continua en piedra',
    category: 'Piletas y Bachas',
    isProvisionalPhoto: true
  },
  {
    id: 'consola-recibidor-marmol',
    title: 'Mobiliario en piedra y hierro',
    specs: 'Imágenes ilustrativas de piezas de apoyo a medida',
    image: '/assets/catalogos/03-mesas-arrime.jpg',
    imageAlt: 'Imagen ilustrativa de mesa de arrime con tapa de piedra y base metálica',
    category: 'Mobiliario',
    isProvisionalPhoto: true
  }
];
