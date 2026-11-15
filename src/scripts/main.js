/**
 * ==========================================================================
 * DH MÁRMOLES — INTERACCIONES VANILLA JS
 * Funcionalidad minimalista, accesible y 100% compatible con CSP estricto
 * (script-src 'self' y style-src 'self' sin estilos ni scripts inline).
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /**
   * Construye una URL de WhatsApp codificada a partir del número configurado en el DOM.
   */
  const buildWhatsAppUrl = (whatsappNumber, message) => {
    const cleanNumber = String(whatsappNumber || '').replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

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
  // 2B. MENÚ DESPLEGABLE DE CATÁLOGOS (Mouse, Teclado & Dispositivos Táctiles)
  // --------------------------------------------------------------------------
  const catalogDropdownItem = document.getElementById('catalogDropdownItem');
  const catalogDropdownBtn = document.getElementById('catalogDropdownBtn');

  if (catalogDropdownItem && catalogDropdownBtn) {
    const dropdownLinks = Array.from(
      catalogDropdownItem.querySelectorAll('.nav-dropdown-link')
    );

    const openCatalogDropdown = () => {
      catalogDropdownItem.classList.add('is-open');
      catalogDropdownBtn.setAttribute('aria-expanded', 'true');
    };

    const closeCatalogDropdown = () => {
      catalogDropdownItem.classList.remove('is-open');
      catalogDropdownBtn.setAttribute('aria-expanded', 'false');
    };

    // Soporte Mouse en escritorio (sincroniza estado aria-expanded y clase .is-open)
    catalogDropdownItem.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse' && window.innerWidth > 768) {
        openCatalogDropdown();
      }
    });

    catalogDropdownItem.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse' && window.innerWidth > 768) {
        closeCatalogDropdown();
      }
    });

    // Soporte Click / Táctil / Teclado (Enter o Space disparan click en <button>)
    catalogDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = catalogDropdownItem.classList.contains('is-open');
      if (isOpen) {
        closeCatalogDropdown();
      } else {
        openCatalogDropdown();
      }
    });

    // Cerrar al seleccionar una opción del dropdown
    dropdownLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeCatalogDropdown();
      });
    });

    // Navegación accesible por teclado (ArrowDown, ArrowUp, Home, End, Escape)
    catalogDropdownItem.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (catalogDropdownItem.classList.contains('is-open')) {
          e.preventDefault();
          e.stopPropagation();
          closeCatalogDropdown();
          catalogDropdownBtn.focus();
        }
        return;
      }

      if (dropdownLinks.length === 0) return;
      const currentIndex = dropdownLinks.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!catalogDropdownItem.classList.contains('is-open')) {
          openCatalogDropdown();
        }
        const nextIndex = currentIndex < dropdownLinks.length - 1 ? currentIndex + 1 : 0;
        dropdownLinks[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!catalogDropdownItem.classList.contains('is-open')) {
          openCatalogDropdown();
        }
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : dropdownLinks.length - 1;
        dropdownLinks[prevIndex].focus();
      } else if (e.key === 'Home' && currentIndex !== -1) {
        e.preventDefault();
        dropdownLinks[0].focus();
      } else if (e.key === 'End' && currentIndex !== -1) {
        e.preventDefault();
        dropdownLinks[dropdownLinks.length - 1].focus();
      }
    });

    // Cerrar cuando el foco sale por completo del contenedor del dropdown (Tab)
    catalogDropdownItem.addEventListener('focusout', (e) => {
      if (!catalogDropdownItem.contains(e.relatedTarget)) {
        closeCatalogDropdown();
      }
    });

    // Cerrar al hacer clic o tocar fuera del dropdown
    document.addEventListener('click', (e) => {
      if (!catalogDropdownItem.contains(e.target)) {
        closeCatalogDropdown();
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
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const rawHref = this.getAttribute('href');
      if (!rawHref || rawHref === '#' || rawHref === '/#') return;

      if (rawHref.startsWith('/#') && window.location.pathname !== '/') {
        return;
      }

      const targetId = rawHref.startsWith('/#') ? rawHref.slice(1) : rawHref;
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

  // --------------------------------------------------------------------------
  // 5. FILTRO DE PILETAS Y BACHAS (Todas / Johnson / Neue — Clases CSS sin inline styles)
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-toggle-btn');
  const piletasGrid = document.getElementById('piletasCatalogGrid');

  if (filterButtons.length && piletasGrid) {
    const emptyState = document.getElementById('filterEmptyState');
    const liveStatus = document.getElementById('filterLiveStatus');
    const cards = Array.from(piletasGrid.querySelectorAll('.product-card'));

    const applyFilter = (targetBrand, clickedBtn) => {
      filterButtons.forEach((btn) => {
        const isPressed = btn === clickedBtn;
        btn.classList.toggle('active', isPressed);
        btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
      });

      let visibleCount = 0;

      cards.forEach((card) => {
        const cardBrand = card.getAttribute('data-brand');
        const isMatch = targetBrand === 'all' || cardBrand === targetBrand;

        if (isMatch) {
          card.classList.remove('is-filter-hidden');
          visibleCount++;
          requestAnimationFrame(() => {
            card.classList.remove('is-filter-fading');
          });
        } else {
          card.classList.add('is-filter-fading');
          setTimeout(() => {
            if (card.classList.contains('is-filter-fading')) {
              card.classList.add('is-filter-hidden');
            }
          }, 200);
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }

      if (liveStatus) {
        const labelEl = clickedBtn.querySelector('.filter-btn-text');
        const label = labelEl ? labelEl.textContent : targetBrand;
        liveStatus.textContent = `Filtro aplicado: ${label}. Mostrando ${visibleCount} modelo${visibleCount === 1 ? '' : 's'}.`;
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyFilter(btn.getAttribute('data-filter-target') || 'all', btn);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. APARICIÓN PROGRESIVA DE TARJETAS EN MESAS DE ARRIME
  // --------------------------------------------------------------------------
  const mesasCards = document.querySelectorAll('.mesa-card-reveal');

  if (mesasCards.length) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.12
        }
      );

      mesasCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.92) {
          card.classList.add('is-visible');
        } else {
          card.classList.add('will-animate');
          observer.observe(card);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. FORMULARIO DE CONTACTO HACIA WHATSAPP
  // --------------------------------------------------------------------------
  const contactoForm = document.getElementById('contactoWhatsappForm');

  if (contactoForm) {
    const whatsappNumber = contactoForm.dataset.whatsappNumber || '';
    const nombreInput = document.getElementById('contactoNombre');
    const descripcionInput = document.getElementById('contactoDescripcion');
    const nombreError = document.getElementById('contactoNombreError');
    const tipoError = document.getElementById('contactoTipoError');

    const perfilButtons = Array.from(contactoForm.querySelectorAll('[data-perfil]'));
    const tipoButtons = Array.from(contactoForm.querySelectorAll('[data-tipo]'));

    let selectedPerfil = contactoForm.dataset.defaultPerfil || 'Particular';
    let selectedTipo = '';

    const setGroupSelection = (buttons, activeBtn) => {
      buttons.forEach((btn) => {
        const isCurrent = btn === activeBtn;
        btn.classList.toggle('is-selected', isCurrent);
        btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });
    };

    const bindChoiceGroup = (buttons, onSelect) => {
      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          setGroupSelection(buttons, btn);
          onSelect(btn);
        });

        btn.addEventListener('keydown', (e) => {
          let targetIdx = -1;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            targetIdx = (idx + 1) % buttons.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            targetIdx = (idx - 1 + buttons.length) % buttons.length;
          }
          if (targetIdx !== -1) {
            e.preventDefault();
            const targetBtn = buttons[targetIdx];
            targetBtn.focus();
            setGroupSelection(buttons, targetBtn);
            onSelect(targetBtn);
          }
        });
      });
    };

    bindChoiceGroup(perfilButtons, (btn) => {
      selectedPerfil = btn.dataset.perfil || 'Particular';
    });

    bindChoiceGroup(tipoButtons, (btn) => {
      selectedTipo = btn.dataset.tipo || '';
      if (selectedTipo && tipoError) {
        tipoError.hidden = true;
      }
    });

    if (nombreInput) {
      nombreInput.addEventListener('input', () => {
        if (nombreInput.value.trim()) {
          nombreInput.classList.remove('is-invalid');
          nombreInput.removeAttribute('aria-invalid');
          if (nombreError) nombreError.hidden = true;
        }
      });
    }

    contactoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = nombreInput ? nombreInput.value.trim() : '';
      const descripcion = descripcionInput ? descripcionInput.value.trim() : '';

      let hasError = false;
      let firstInvalidEl = null;

      if (!nombre) {
        hasError = true;
        if (nombreInput) {
          nombreInput.classList.add('is-invalid');
          nombreInput.setAttribute('aria-invalid', 'true');
          firstInvalidEl = nombreInput;
        }
        if (nombreError) nombreError.hidden = false;
      } else if (nombreInput && nombreError) {
        nombreInput.classList.remove('is-invalid');
        nombreInput.removeAttribute('aria-invalid');
        nombreError.hidden = true;
      }

      if (!selectedTipo) {
        hasError = true;
        if (tipoError) tipoError.hidden = false;
        if (!firstInvalidEl && tipoButtons.length > 0) {
          firstInvalidEl = tipoButtons[0];
        }
      } else if (tipoError) {
        tipoError.hidden = true;
      }

      if (hasError) {
        if (firstInvalidEl) firstInvalidEl.focus();
        return;
      }

      const detallesTexto = descripcion || 'Sin detalles adicionales.';
      const mensaje = [
        'Hola! Quisiera consultar por un proyecto en DH Mármoles.',
        '',
        `Nombre: ${nombre}`,
        `Perfil: ${selectedPerfil}`,
        `Tipo de consulta: ${selectedTipo}`,
        `Detalles: ${detallesTexto}`
      ].join('\n');

      const whatsappUrl = buildWhatsAppUrl(whatsappNumber, mensaje);
      contactoForm.dataset.lastWhatsappUrl = whatsappUrl;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --------------------------------------------------------------------------
  // 8. CARRUSEL EDITORIAL DE INSTAGRAM (Flechas, Teclado, Swipe & Reduced Motion)
  // --------------------------------------------------------------------------
  const igTrack = document.getElementById('igCarouselTrack');
  const igPrevBtn = document.getElementById('igCarouselPrev');
  const igNextBtn = document.getElementById('igCarouselNext');

  if (igTrack) {
    const igCards = Array.from(igTrack.querySelectorAll('.instagram-post-card'));
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getScrollBehavior = () => (reducedMotionQuery.matches ? 'auto' : 'smooth');

    const getStepSize = () => {
      if (!igCards.length) return igTrack.clientWidth * 0.75;
      const cardRect = igCards[0].getBoundingClientRect();
      const styles = window.getComputedStyle(igTrack);
      const gap = parseFloat(styles.columnGap || styles.gap || '16') || 16;
      return cardRect.width + gap;
    };

    const updateCarouselControls = () => {
      const tolerance = 2;
      const maxScroll = Math.max(0, igTrack.scrollWidth - igTrack.clientWidth);
      if (igPrevBtn) {
        igPrevBtn.disabled = igTrack.scrollLeft <= tolerance;
      }
      if (igNextBtn) {
        igNextBtn.disabled = maxScroll <= tolerance || igTrack.scrollLeft >= maxScroll - tolerance;
      }
    };

    const scrollByStep = (direction) => {
      const step = getStepSize();
      igTrack.scrollBy({
        left: direction * step,
        behavior: getScrollBehavior()
      });
    };

    if (igPrevBtn) {
      igPrevBtn.addEventListener('click', () => scrollByStep(-1));
    }

    if (igNextBtn) {
      igNextBtn.addEventListener('click', () => scrollByStep(1));
    }

    let scrollRafId = 0;
    igTrack.addEventListener(
      'scroll',
      () => {
        if (scrollRafId) return;
        scrollRafId = requestAnimationFrame(() => {
          scrollRafId = 0;
          updateCarouselControls();
        });
      },
      { passive: true }
    );

    const focusAndRevealCard = (targetCard) => {
      if (!targetCard) return;
      targetCard.focus({ preventScroll: true });
      const cardLeft = targetCard.offsetLeft - igTrack.offsetLeft;
      const cardRight = cardLeft + targetCard.offsetWidth;
      const viewLeft = igTrack.scrollLeft;
      const viewRight = viewLeft + igTrack.clientWidth;

      if (cardLeft < viewLeft) {
        igTrack.scrollTo({ left: cardLeft, behavior: getScrollBehavior() });
      } else if (cardRight > viewRight) {
        igTrack.scrollTo({
          left: cardRight - igTrack.clientWidth,
          behavior: getScrollBehavior()
        });
      }
    };

    igTrack.addEventListener('keydown', (e) => {
      const activeIdx = igCards.indexOf(document.activeElement);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeIdx !== -1) {
          focusAndRevealCard(igCards[Math.min(activeIdx + 1, igCards.length - 1)]);
        } else {
          scrollByStep(1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeIdx !== -1) {
          focusAndRevealCard(igCards[Math.max(activeIdx - 1, 0)]);
        } else {
          scrollByStep(-1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (activeIdx !== -1 && igCards.length > 0) {
          focusAndRevealCard(igCards[0]);
        } else {
          igTrack.scrollTo({ left: 0, behavior: getScrollBehavior() });
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (activeIdx !== -1 && igCards.length > 0) {
          focusAndRevealCard(igCards[igCards.length - 1]);
        } else {
          igTrack.scrollTo({ left: igTrack.scrollWidth, behavior: getScrollBehavior() });
        }
      }
    });

    window.addEventListener('resize', updateCarouselControls, { passive: true });
    window.addEventListener('load', updateCarouselControls, { passive: true });
    updateCarouselControls();
  }
});
