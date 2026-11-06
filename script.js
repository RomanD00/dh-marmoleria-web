/**
 * ==========================================================================
 * DH MÁRMOLES — INTERACCIONES VANILLA JS
 * Funcionalidad minimalista, accesible y de alto rendimiento.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. HEADER STICKY CON EFECTO BACKDROP AL HACER SCROLL
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Chequeo inicial

  // --------------------------------------------------------------------------
  // 2. MENÚ MÓVIL (Toggle & Accesibilidad)
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-active');

      // Animación de la hamburguesa a X
      const bars = mobileToggle.querySelectorAll('.toggle-bar');
      if (!isExpanded) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-active')) {
          mainNav.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          const bars = mobileToggle.querySelectorAll('.toggle-bar');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. ACORDEÓN DE PREGUNTAS FRECUENTES (Accesible y Fluido)
  // --------------------------------------------------------------------------
  const accordion = document.getElementById('faqAccordion');

  if (accordion) {
    const faqItems = accordion.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Cierre de los demás ítems para mantener la estética minimalista
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherTrigger && otherPanel) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherPanel.classList.remove('is-open');
              otherPanel.setAttribute('hidden', '');
            }
          }
        });

        // Alternar el ítem actual
        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.classList.remove('is-open');
          panel.setAttribute('hidden', '');
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          panel.removeAttribute('hidden');
          // Forzar reflujo para activar la transición CSS grid
          void panel.offsetHeight;
          panel.classList.add('is-open');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. SCROLL SUAVE PARA ENLACES INTERNOS
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
