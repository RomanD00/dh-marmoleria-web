/**
 * ==========================================================================
 * DATOS DE CATÁLOGOS — DODERA HERMANOS MARMOLERÍA
 * Separa los datos de las tarjetas principales (Homepage) y el detalle
 * técnico de cada categoría (Materiales, Piletas y Bachas, Mesas de Arrime).
 * ==========================================================================
 */

import { CATALOGS_PUBLISHED, getWhatsAppUrl } from '../config/site';

/**
 * Flag de beta privada: las imágenes de las tarjetas de portada en 01 / Catálogos
 * representan modelos e instalaciones de referencia provisionales.
 */
export const CATALOGOS_HOME_MEDIA_IS_PROVISIONAL = true;

export interface CatalogHomeCard {
  num: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
  publishedHref: string;
  whatsappMessage: string;
  isWide?: boolean;
  isProvisionalPhoto?: boolean;
}

/**
 * Resuelve el destino de cada tarjeta de catálogo en la Homepage hacia su ruta definitiva.
 */
export function resolveCatalogCardHref(card: CatalogHomeCard): string {
  if (CATALOGS_PUBLISHED) {
    return card.publishedHref;
  }
  return card.href;
}

/**
 * Las 3 tarjetas principales aprobadas para la Homepage (Sección Catálogo)
 * Regla de diseño: en la homepage muestran únicamente número, título y botón circular.
 */
export const CATALOG_HOME_CARDS: CatalogHomeCard[] = [
  {
    num: '01',
    title: 'Materiales',
    image: '/assets/catalogos/01-materiales.jpg',
    imageAlt: 'Muestrario de materiales: mármol, granito, cuarzo y sinterizados',
    href: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Materiales.'),
    publishedHref: '/materiales',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Materiales.',
    isWide: false
  },
  {
    num: '02',
    title: 'Piletas',
    image: '/assets/catalogos/02-piletas.jpg',
    imageAlt: 'Pileta y bacha armada e integrada en mármol con escurridor acanalado',
    href: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Piletas.'),
    publishedHref: '/piletas-y-bachas',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Piletas.',
    isWide: false
  },
  {
    num: '03',
    title: 'Mesas de Arrime',
    image: '/assets/catalogos/03-mesas-arrime.jpg',
    imageAlt: 'Mesa de arrime de diseño con tapa maciza de mármol y base de hierro negro',
    href: getWhatsAppUrl('Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Mesas de Arrime.'),
    publishedHref: '/mesas-de-arrime',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera conocer el catálogo de Mesas de Arrime.',
    isWide: true
  }
];

export interface CatalogDetailItem {
  id: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  applications: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

/**
 * Catálogo detallado para la página /materiales
 * Datos técnicos verificados según briefing oficial de Dodera Hermanos.
 */
export const MATERIALES_ITEMS: CatalogDetailItem[] = [
  {
    id: 'marmol-natural',
    categoryTag: 'PIEDRA NATURAL SELECCIONADA',
    title: 'Mármol Natural',
    subtitle: 'Vetas únicas e irrepetibles para proyectos de carácter editorial.',
    description:
      'Cada placa de mármol natural es una pieza geológica irrepetible. Seleccionamos bloques nacionales e importados (Calacatta, Carrara, Marquina, Travertino) y realizamos despieces a medida cuidando la continuidad de la veta y los encuentros a inglete a 45°.',
    specs: [
      'Espesor estándar: 2 cm (faldones y regruesos a inglete a medida)',
      'Terminaciones: Pulido espejo, apomazado mate o cepillado',
      'Aplicaciones: Islas protagónicas, baños principales, revestimientos murales y mobiliario'
    ],
    applications: 'Baños de diseño, islas de cocina, revestimientos interiores y mesas.',
    image: '/assets/hero/hero-obra-principal.jpg',
    imageAlt: 'Isla central en Mármol Calacatta con encuentro a inglete a 45°',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar un proyecto en Mármol Natural.'
  },
  {
    id: 'granito-natural',
    categoryTag: 'ROCA ÍGNEA DE ALTA DUREZA',
    title: 'Granito Natural',
    subtitle: 'Piedra natural de 2 cm de espesor con máxima resistencia estructural.',
    description:
      'El granito natural ofrece una resistencia sobresaliente al calor, a la abrasión y al uso intensivo diario. Trabajamos variedades clásicas y exóticas (Negro Brasil, Gris Mara, Boreal, Taj Mahal) ideales tanto para interiores como para quinchos y galerías exteriores.',
    specs: [
      'Espesor estándar: Piedra natural maciza de 2 cm',
      'Terminaciones: Pulido brillante, leather (texturado mate) o flameado',
      'Resistencia: Alta tolerancia a temperatura, impacto y agentes climáticos'
    ],
    applications: 'Mesadas de cocina, quinchos, parrillas, escaleras y solias.',
    image: '/assets/obras/03-quincho-galeria.jpg',
    imageAlt: 'Mesada e isla de quincho realizada en Granito natural',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar un proyecto en Granito Natural.'
  },
  {
    id: 'cuarzo',
    categoryTag: 'SUPERFICIE DE CUARCITAS + RESINA',
    title: 'Cuarzo de Alta Gama',
    subtitle: 'Superficie compacta de nula porosidad, higiene superior y tonos homogéneos.',
    description:
      'Formulado mediante la combinación de cuarcitas naturales de alta pureza y resinas tecnológicas. Garantiza colores uniformes (blancos puros, cementicios y veteados sutiles) y una superficie no porosa que impide la absorción de líquidos y manchas domésticas.',
    specs: [
      'Composición: Combinación de cuarcitas seleccionadas + resina de alta resistencia',
      'Mantenimiento: Limpieza diaria sencilla con agua tibia y jabón neutro',
      'Higiene: Superficie bacteriostática de nula porosidad para uso gastronómico y residencial'
    ],
    applications: 'Mesadas de cocina, alzadas, islas, vanitorys y barras interiores.',
    image: '/assets/obras/02-bano-principal.jpg',
    imageAlt: 'Vanitory de baño principal ejecutado en Cuarzo con bacha integrada',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar un proyecto en Cuarzo.'
  },
  {
    id: 'sinterizados',
    categoryTag: 'PIEDRA DE INGENIERÍA ULTRACOMPACTA',
    title: 'Superficies Sinterizadas',
    subtitle: 'Material de ingeniería con resistencia total al calor directo, rayado y rayos UV.',
    description:
      'Las superficies sinterizadas reproducen en horas el proceso natural de formación de la piedra bajo presiones y temperaturas extremas. Permiten apoyar elementos calientes directamente sobre la mesada, no se alteran al sol y ofrecen formatos de gran escala.',
    specs: [
      'Espesores disponibles: 12 mm y 20 mm según requerimiento constructivo',
      'Prestaciones: Inalterable ante calor directo, manchas ácidas, heladas y rayos UV',
      'Versatilidad: Apto para mesadas, tapas de islas, fachadas y mobiliario exterior'
    ],
    applications: 'Cocinas gourmet, barras exteriores, revestimientos continuos y tapas de mesa.',
    image: '/assets/catalogos/01-materiales.jpg',
    imageAlt: 'Muestras de superficies sinterizadas, cuarzo, mármol y granito',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar un proyecto en Superficies Sinterizadas.'
  }
];

/**
 * Catálogo detallado para la página /piletas-y-bachas
 */
export const PILETAS_ITEMS: CatalogDetailItem[] = [
  {
    id: 'bachas-armadas',
    categoryTag: 'FABRICACIÓN MONOLÍTICA EN TALLER',
    title: 'Bachas Armadas a Medida',
    subtitle: 'Ejecutadas en el mismo material de tu mesada para una continuidad visual absoluta.',
    description:
      'Fabricamos en nuestro propio taller bachas y piletas integradas utilizando exactamente la misma placa de mármol, cuarzo, granito o sinterizado de la mesada. Diseñamos desagües ocultos con tapa en piedra, fondos inclinados y escurridores acanalados a medida.',
    specs: [
      'Materialidad: Mármol, cuarzo, granito o piedra sinterizada en continuidad con la mesada',
      'Detalles constructivos: Encuentros a 45°, tapa de desagüe removible en piedra o válvula vista',
      'Dimensiones: 100% personalizadas según el plano del mueble de cocina o vanitory'
    ],
    applications: 'Baños principales, toilettes de recepción e islas de cocina minimalistas.',
    image: '/assets/catalogos/02-piletas.jpg',
    imageAlt: 'Bacha armada a medida en mármol con grifería bronce',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar una Bacha Armada a medida.'
  },
  {
    id: 'piletas-acero-johnson',
    categoryTag: 'ACERO INOXIDABLE DE PRIMERA LÍNEA',
    title: 'Piletas de Acero Inoxidable — Línea Johnson',
    subtitle: 'Precisión en el traforo y colocación bajo mesada o al ras.',
    description:
      'Trabajamos la línea de piletas de acero inoxidable Johnson Acero (Luxor, Quadra, Curva y líneas simples o dobles). Realizamos el corte mecanizado exacto en taller y el pegado estructural bajo mesada con selladores específicos de alta adherencia.',
    specs: [
      'Material: Acero inoxidable AISI 304 de alta pureza y gran profundidad',
      'Colocación: Bajo mesada con canto pulido interno o encastre superior',
      'Accesorios compatibles: Dosificadores, tablas de corte y canastos escurridores'
    ],
    applications: 'Cocinas residenciales, lavaderos y espacios gastronómicos.',
    image: '/assets/obras/01-cocina-residencial.jpg',
    imageAlt: 'Cocina residencial con mesada e isla en piedra y pileta bajo mesada',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera consultar por Piletas de Acero Inoxidable línea Johnson.'
  },
  {
    id: 'piletas-acero-neue',
    categoryTag: 'DISEÑO CONTEMPORÁNEO',
    title: 'Piletas de Acero Inoxidable — Línea Neue',
    subtitle: 'Geometrías rectas y radio reducido para cocinas modernas.',
    description:
      'Proveemos e instalamos piletas de acero inoxidable de la línea Neue, reconocidas por su estética contemporánea, excelente capacidad volumétrica y óptima relación técnico-constructiva junto a mesadas de granito, cuarzo o sinterizados.',
    specs: [
      'Tipologías: Bachas simples profundas, dobles y piletas de lavadero',
      'Instalación: Entregadas listas y fijadas en taller o colocadas en obra',
      'Terminación de traforo: Cantos internos rectificados y pulidos a máquina'
    ],
    applications: 'Cocinas modernas, quinchos y lavaderos funcionales.',
    image: '/assets/taller/04-pulido.jpg',
    imageAlt: 'Terminación y pulido artesanal de bordes de pileta en taller',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera consultar por Piletas de Acero Inoxidable línea Neue.'
  }
];

/**
 * Catálogo detallado para la página /mesas-de-arrime
 */
export const MESAS_ITEMS: CatalogDetailItem[] = [
  {
    id: 'mesas-arrime-consolas',
    categoryTag: 'MOBILIARIO DE AUTOR EN PIEDRA Y HIERRO',
    title: 'Mesas de Arrime y Consolas',
    subtitle: 'Tapas de piedra natural seleccionada sobre bases de hierro de herrería fina.',
    description:
      'Diseñamos y fabricamos mesas de arrime, consolas de recibidor y mesas laterales combinando la nobleza de la piedra natural o sinterizada con estructuras de hierro esbeltas y sólidas. Cada pieza se produce a pedido eligiendo el corte exacto de la placa.',
    specs: [
      'Tapas: Mármol Calacatta, Carrara, Marquina, Travertino, Cuarzo o Sinterizado',
      'Bordes: Canto recto pulido, medio punto, biselado o faldón a inglete a 45°',
      'Base estructural: Hierro estructural soldado con costura invisible y pintura al horno'
    ],
    applications: 'Halls de acceso, livings, pasillos de distribución y estudios profesionales.',
    image: '/assets/catalogos/03-mesas-arrime.jpg',
    imageAlt: 'Mesa de arrime con tapa de mármol y estructura de hierro negro',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar una Mesa de Arrime a medida.'
  },
  {
    id: 'mesas-centro-auxiliares',
    categoryTag: 'DISEÑO A MEDIDA PARA INTERIORISMO',
    title: 'Mesas Bajas y Auxiliares a Medida',
    subtitle: 'Geometrías rectangulares, circulares u orgánicas según plano.',
    description:
      'Colaboramos con arquitectos, interioristas y clientes particulares para materializar mesas ratonas, mesas de apoyo y pedestales monolíticos en piedra. Asesoramos en la elección del espesor, el tratamiento superficial y los apoyos para proteger los pisos.',
    specs: [
      'Formatos: Rectangulares, cuadradas, redondas u ovaladas a medida',
      'Protección: Tratamiento hidrorrepelente y antimanchas aplicado en taller',
      'Entrega: Coordinación de envío y posicionamiento en CABA y GBA'
    ],
    applications: 'Estar principal, salas de reunión y dormitorios.',
    image: '/assets/arquitectos/planos-marmol.jpg',
    imageAlt: 'Bloque de mármol pulido y planos de diseño a medida',
    whatsappMessage: 'Hola Dodera Hermanos Marmolería, quisiera cotizar una Mesa Baja / Auxiliar en piedra a medida.'
  }
];
