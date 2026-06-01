// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero micro animations
const motionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = Boolean(motionQuery && motionQuery.matches);
const gsapInstance = window.gsap;

if (!prefersReducedMotion && gsapInstance) {
  const heroItems = [
    document.querySelector('.hero-badge'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-subtitle'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-actions'),
    document.querySelector('.hero-visual')
  ].filter(Boolean);

  gsapInstance.from(heroItems, {
    autoAlpha: 0,
    y: 18,
    duration: 0.75,
    stagger: 0.1,
    ease: 'power3.out'
  });

  const dashboardCard = document.querySelector('.dashboard-card');

  if (dashboardCard) {
    gsapInstance.to(dashboardCard, {
      y: -8,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });
  }
}

// Scroll reveal animation
const scrollRevealTargets = document.querySelectorAll(
  '.service-card, .portfolio-card, .process-step, .contact-box'
);

if (!prefersReducedMotion && typeof IntersectionObserver !== 'undefined') {
  if (gsapInstance) {
    gsapInstance.set(scrollRevealTargets, { autoAlpha: 0, y: 20 });

    const gsapRevealObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

      if (!visibleEntries.length) {
        return;
      }

      const visibleTargets = visibleEntries.map(entry => {
        gsapRevealObserver.unobserve(entry.target);
        return entry.target;
      });

      gsapInstance.fromTo(
        visibleTargets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform'
        }
      );
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    scrollRevealTargets.forEach(el => {
      gsapRevealObserver.observe(el);
    });
  } else {
    const fallbackRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fallbackRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    scrollRevealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      fallbackRevealObserver.observe(el);
    });
  }
}
