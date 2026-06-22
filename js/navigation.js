/* =====================================================
   SHARED NAVIGATION & CURTAIN SCRIPTS
   ===================================================== */

// Curtain page loader
window.addEventListener('load', () => {
  const curtain = document.getElementById('curtain');
  const curtainLogo = document.getElementById('curtainLogo');
  if (!curtain) return;
  setTimeout(() => {
    if (curtainLogo) curtainLogo.classList.add('hide');
    curtain.classList.add('open');
    setTimeout(() => {
      curtain.remove();
      if (curtainLogo) curtainLogo.remove();
      // Execute page entrance animations if defined
      if (typeof initHeroEntrance === 'function') {
        initHeroEntrance();
      }
    }, 1000);
  }, 1400);
});

// Navbar scroll, active links and mobile menu triggers
(function() {
  const nav = document.getElementById('navPremium');
  if (!nav) return;
  const hamburger = document.getElementById('navHamburger');
  const closeBtn = document.getElementById('menuClose');
  const menu = document.getElementById('slideMenu');
  const overlay = document.getElementById('menuOverlay');

  // Scroll shrink & hide
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Shrink navbar
        if (scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        
        // Hide navbar on downscroll inside content, reveal on upscroll
        const heroEl = document.getElementById('heroNew') || document.querySelector('.page-hero');
        const heroHeight = heroEl ? heroEl.offsetHeight : 500;
        
        if (scrollY > heroHeight * 0.6 && scrollY > lastScroll) {
          nav.classList.add('hidden');
        } else if (scrollY < lastScroll || scrollY < heroHeight * 0.4) {
          nav.classList.remove('hidden');
        }
        
        lastScroll = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile menu open / close
  function openMenu() {
    if (menu) menu.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Active link highlighting
  // Normalize pathname to find correct filename (e.g. index.html)
  let currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Check if the current file matches the link's href
    if (linkHref === currentFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// GSAP animations for footer
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    const footerGrid = document.querySelector('.footer-grid');
    const footerBorder = document.querySelector('.footer-top-border');

    if (footerGrid) {
      // Check if scrollTrigger is available
      const stConfig = typeof ScrollTrigger !== 'undefined' ? {
        trigger: '#footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
      } : null;
      
      gsap.fromTo(footerGrid, 
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: stConfig
        }
      );
    }

    if (footerBorder) {
      gsap.to(footerBorder, {
        backgroundPosition: '200% 0%',
        duration: 8,
        ease: 'none',
        repeat: -1
      });
    }

    // Office card mouse interaction glow
    const footerCards = document.querySelectorAll('.footer-card');
    footerCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
});
