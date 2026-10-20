const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

const technologyMenuToggle = document.querySelector('.technology-menu-toggle');

if (technologyMenuToggle) {
  const technologyDropdown = document.getElementById(technologyMenuToggle.getAttribute('aria-controls'));

  const closeTechnologyDropdown = returnFocus => {
    technologyMenuToggle.setAttribute('aria-expanded', 'false');
    technologyDropdown.hidden = true;
    if (returnFocus) technologyMenuToggle.focus();
  };

  technologyDropdown.querySelector('.technology-menu-back').addEventListener('click', () => {
    closeTechnologyDropdown(true);
  });

  technologyMenuToggle.addEventListener('click', () => {
    const isOpen = technologyMenuToggle.getAttribute('aria-expanded') === 'true';
    technologyMenuToggle.setAttribute('aria-expanded', String(!isOpen));
    technologyDropdown.hidden = isOpen;
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.technology-nav-item')) closeTechnologyDropdown(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && technologyMenuToggle.getAttribute('aria-expanded') === 'true') {
      closeTechnologyDropdown(true);
    }
  });
}

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    const select = document.querySelector('select[name="service"]');
    if (select) {
      const matchingOption = [...select.options].find(option => option.text === service);
      if (matchingOption) select.value = matchingOption.value;
    }
  });
});

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroSliderControls = document.querySelector('.hero-slider-controls');

if (heroSlides.length > 1 && heroSliderControls) {
  const slideButtons = [...heroSliderControls.querySelectorAll('[data-slide-to]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let slideTimer;

  const showSlide = index => {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlide);
    });
    slideButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === activeSlide) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  };

  const stopAutoPlay = () => {
    window.clearInterval(slideTimer);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    if (!reducedMotion && !document.hidden && !heroSliderControls.matches(':focus-within')) {
      slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 2000);
    }
  };

  heroSliderControls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.hasAttribute('data-slide-to')) {
      showSlide(Number(button.dataset.slideTo));
    } else {
      showSlide(activeSlide + Number(button.dataset.slideDirection));
    }
    startAutoPlay();
  });

  heroSliderControls.addEventListener('mouseenter', stopAutoPlay);
  heroSliderControls.addEventListener('mouseleave', startAutoPlay);
  heroSliderControls.addEventListener('focusin', stopAutoPlay);
  heroSliderControls.addEventListener('focusout', event => {
    if (!heroSliderControls.contains(event.relatedTarget)) startAutoPlay();
  });
  document.addEventListener('visibilitychange', startAutoPlay);
  startAutoPlay();
}

const clientSlider = document.querySelector('[data-client-slider]');

if (clientSlider) {
  const clientSlides = [...clientSlider.querySelectorAll('.client-slide')];
  const clientControls = clientSlider.querySelector('.client-slider-controls');
  const clientTrack = clientSlider.querySelector('.client-slider-track');

  if (clientSlides.length > 1 && clientControls && clientTrack) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeClientSlide = 0;
    let clientSlideTimer;

    const getVisibleSlideCount = () => {
      const slideWidth = clientSlides[0].getBoundingClientRect().width;
      const gap = Number.parseFloat(window.getComputedStyle(clientTrack).columnGap) || 0;
      return Math.max(1, Math.floor((clientSlider.clientWidth + gap) / (slideWidth + gap)));
    };

    const showClientSlide = index => {
      const lastStartIndex = Math.max(0, clientSlides.length - getVisibleSlideCount());
      const visibleSlideCount = getVisibleSlideCount();
      activeClientSlide = index < 0
        ? lastStartIndex
        : index > lastStartIndex
          ? 0
          : index;
      const slideOffset = clientSlides[activeClientSlide].offsetLeft - clientSlides[0].offsetLeft;
      clientTrack.style.transform = `translateX(-${slideOffset}px)`;
      clientSlides.forEach((slide, slideIndex) => {
        const isVisible = slideIndex >= activeClientSlide && slideIndex < activeClientSlide + visibleSlideCount;
        slide.setAttribute('aria-hidden', String(!isVisible));
      });
    };

    const stopClientAutoplay = () => {
      window.clearInterval(clientSlideTimer);
    };

    const startClientAutoplay = () => {
      stopClientAutoplay();
      if (!reducedMotion && !document.hidden && !clientSlider.matches(':hover, :focus-within')) {
        clientSlideTimer = window.setInterval(() => showClientSlide(activeClientSlide + 1), 5000);
      }
    };

    clientControls.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;

      showClientSlide(activeClientSlide + Number(button.dataset.clientDirection));
      startClientAutoplay();
    });

    clientSlider.addEventListener('mouseenter', stopClientAutoplay);
    clientSlider.addEventListener('mouseleave', startClientAutoplay);
    clientSlider.addEventListener('focusin', stopClientAutoplay);
    clientSlider.addEventListener('focusout', event => {
      if (!clientSlider.contains(event.relatedTarget)) startClientAutoplay();
    });
    document.addEventListener('visibilitychange', startClientAutoplay);
    window.addEventListener('resize', () => {
      const lastStartIndex = Math.max(0, clientSlides.length - getVisibleSlideCount());
      showClientSlide(Math.min(activeClientSlide, lastStartIndex));
    });
    showClientSlide(0);
    startClientAutoplay();
  }
}

document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  const serviceSelect = quoteForm.querySelector('select[name="service"]');
  const requestedService = new URLSearchParams(window.location.search).get('service');
  const requestedOption = [...serviceSelect.options].find(option => option.textContent.trim() === requestedService);
  if (requestedOption) serviceSelect.value = requestedOption.value;

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = `LiftX Infra enquiry: ${data.get('service')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company') || 'Not provided'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Service: ${data.get('service')}`,
      '',
      'Project details:',
      data.get('message')
    ].join('\n');

    const businessEmail = 'liftxinfra@gmail.com';

    window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}