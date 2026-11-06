/**
 * ==========================================================================
 * DH MÁRMOLES — INTERACCIONES VANILLA JS
 * Funcionalidad minimalista, accesible y 100% compatible con CSP estricto.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. HEADER STICKY CON EFECTO BACKDROP AL HACER SCROLL
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --------------------------------------------------------------------------
  // 2. MENÚ MÓVIL (Toggle & Accesibilidad por Teclado)
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    const closeMobileMenu = () => {
      mainNav.classList.remove('is-active');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileToggle.classList.toggle('is-active', !isExpanded);
      mainNav.classList.toggle('is-active', !isExpanded);
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-active')) {
          closeMobileMenu();
        }
      });
    });

    // Cerrar menú móvil con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
        closeMobileMenu();
        mobileToggle.focus();
      }
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
          void panel.offsetHeight;
          panel.classList.add('is-open');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. SCROLL SUAVE PARA ENLACES DE ANCLA INTERNA
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
