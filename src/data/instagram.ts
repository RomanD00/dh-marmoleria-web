/**
 * ==========================================================================
 * PUBLICACIONES REALES DE INSTAGRAM — @dh.marmoleria
 * Fuente curada para el carrusel de la sección 05 en la homepage.
 *
 * CÓMO ACTUALIZAR EL CARRUSEL CON NUEVAS PUBLICACIONES:
 * 1. Guardá la imagen o miniatura del post/reel dentro de:
 *    public/assets/instagram/<archivo>.jpg
 *    (Usar imágenes locales evita que expiren las URLs firmadas del CDN de Instagram).
 * 2. Agregá un nuevo objeto al inicio o en la posición deseada de INSTAGRAM_POSTS con:
 *    - id: identificador único corto
 *    - shortcode: código de la publicación en Instagram
 *    - permalink: enlace completo real (/p/<codigo>/ o /reel/<codigo>/)
 *    - image: ruta local '/assets/instagram/<archivo>.jpg'
 *    - imageAlt: descripción precisa de la obra mostrada para accesibilidad
 *    - mediaType: 'image' | 'carousel' | 'reel'
 * ==========================================================================
 */

export interface InstagramPost {
  id: string;
  shortcode: string;
  permalink: string;
  image: string;
  imageAlt: string;
  mediaType: 'image' | 'carousel' | 'reel';
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-DdaCXNujhTD',
    shortcode: 'DdaCXNujhTD',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/DdaCXNujhTD/',
    image: '/assets/instagram/ig-01-DdaCXNujhTD.jpg',
    imageAlt:
      'Isla de cocina en piedra negra con bajada lateral en cascada, bacha integrada y mesada de apoyo a juego',
    mediaType: 'carousel'
  },
  {
    id: 'ig-DWMT9BQjndp',
    shortcode: 'DWMT9BQjndp',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/DWMT9BQjndp/',
    image: '/assets/instagram/ig-02-DWMT9BQjndp.jpg',
    imageAlt:
      'Mesada continua en piedra blanca instalada en cocina en L con bacha doble de acero inoxidable y sector bajo ventana',
    mediaType: 'carousel'
  },
  {
    id: 'ig-DfXAEmloKRe',
    shortcode: 'DfXAEmloKRe',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/DfXAEmloKRe/',
    image: '/assets/instagram/ig-03-DfXAEmloKRe.jpg',
    imageAlt:
      'Mesada de cocina en L en piedra negra pulida con zócalo perimetral y bacha simple de acero inoxidable',
    mediaType: 'carousel'
  },
  {
    id: 'ig-DfItmaljkvc',
    shortcode: 'DfItmaljkvc',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/DfItmaljkvc/',
    image: '/assets/instagram/ig-04-DfItmaljkvc.jpg',
    imageAlt:
      'Mesada en L en superficie blanca brillante con alzada sanitaria, bacha doble de acero y mobiliario en madera',
    mediaType: 'carousel'
  },
  {
    id: 'ig-DehcRdNlOVt',
    shortcode: 'DehcRdNlOVt',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/DehcRdNlOVt/',
    image: '/assets/instagram/ig-05-DehcRdNlOVt.jpg',
    imageAlt:
      'Mesada lineal blanca combinada con alzada veteada en tonos grises, bacha de acero y anafe negro empotrado',
    mediaType: 'carousel'
  },
  {
    id: 'ig-DeSB-5dubzQ',
    shortcode: 'DeSB-5dubzQ',
    permalink: 'https://www.instagram.com/dh.marmoleria/reel/DeSB-5dubzQ/',
    image: '/assets/instagram/ig-06-DeSB-5dubzQ.jpg',
    imageAlt:
      'Reel de obra terminada con isla central en piedra negra, barra elevada y anafe a gas de cuatro hornallas',
    mediaType: 'reel'
  },
  {
    id: 'ig-Dd9dCHWFK4P',
    shortcode: 'Dd9dCHWFK4P',
    permalink: 'https://www.instagram.com/dh.marmoleria/p/Dd9dCHWFK4P/',
    image: '/assets/instagram/ig-07-Dd9dCHWFK4P.jpg',
    imageAlt:
      'Cocina amplia con mesadas perimetrales en piedra oscura e isla central con barra desayunadora y anafe integrado',
    mediaType: 'carousel'
  },
  {
    id: 'ig-Ddodlk9uWxv',
    shortcode: 'Ddodlk9uWxv',
    permalink: 'https://www.instagram.com/dh.marmoleria/reel/Ddodlk9uWxv/',
    image: '/assets/instagram/ig-08-Ddodlk9uWxv.jpg',
    imageAlt:
      'Reel de instalación de isla en piedra negra con terminación en cascada y zócalo trasero a medida',
    mediaType: 'reel'
  }
];
