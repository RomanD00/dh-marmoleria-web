/**
 * ==========================================================================
 * DATOS DE PREGUNTAS FRECUENTES (FAQ) — DODERA HERMANOS MARMOLERÍA
 * Preguntas y respuestas verificadas para el acordeón y Schema.org FAQPage.
 * ==========================================================================
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'cotizacion',
    question: '¿Cómo puedo solicitar una cotización?',
    answer:
      'Podés enviarnos tus planos, croquis o medidas aproximadas por WhatsApp con el material de tu preferencia. Te enviamos una cotización detallada en menos de 24 a 48 hs hábiles, sin costo ni compromiso.'
  },
  {
    id: 'medicion-en-obra',
    question: '¿Hacen medición en obra?',
    answer:
      'Sí. Una vez aprobado el presupuesto y con los muebles base ya colocados a nivel, nuestro equipo técnico realiza el relevamiento milimétrico en obra para garantizar un encaje perfecto y definir detalles constructivos.'
  },
  {
    id: 'tiempos-de-entrega',
    question: '¿Cuáles son los tiempos de entrega?',
    answer:
      'Nuestros plazos habituales son ágiles y con entregas inmediatas según cronograma pactado, garantizando que tu obra continúe sin interrupciones ni demoras.'
  },
  {
    id: 'cuidados-material',
    question: '¿Qué cuidados requiere cada material?',
    answer:
      'El granito y el cuarzo se limpian fácilmente con agua tibia y jabón neutro. En mármoles recomendamos sellado periódico y evitar sustancias ácidas (limón, vinagre). En superficies sinterizadas la resistencia a manchas y calor directo es total.'
  }
];
