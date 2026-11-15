/**
 * ==========================================================================
 * DATOS DE PREGUNTAS FRECUENTES (FAQ) — DODERA HERMANOS MARMOLERÍA
 * Preguntas y respuestas para el acordeón de FAQ.
 * Cuando se reemplacen los placeholders por contenido real definitivo,
 * cambiar FAQ_IS_PLACEHOLDER a false (y activar includeFaqSchema en index.astro)
 * para volver a emitir el marcado estructurado Schema.org FAQPage.
 * ==========================================================================
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_IS_PLACEHOLDER = true;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'pregunta-1',
    question: 'Pregunta 1',
    answer: 'Aquí irá la respuesta a la pregunta 1.'
  },
  {
    id: 'pregunta-2',
    question: 'Pregunta 2',
    answer: 'Aquí irá la respuesta a la pregunta 2.'
  },
  {
    id: 'pregunta-3',
    question: 'Pregunta 3',
    answer: 'Aquí irá la respuesta a la pregunta 3.'
  },
  {
    id: 'pregunta-4',
    question: 'Pregunta 4',
    answer: 'Aquí irá la respuesta a la pregunta 4.'
  }
];
