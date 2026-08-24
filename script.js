// mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  // close mobile nav on plain link click (non-parent)
  navLinks.querySelectorAll('a:not(.nav-parent)').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  }));

  // dropdown: toggle on mobile tap of .nav-parent; hover handled by CSS on desktop
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const parent = item.querySelector('.nav-parent');
    parent.addEventListener('click', e => {
      // on desktop widths, let href work if dropdown already visible via hover
      if (window.innerWidth > 880) return;
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.has-dropdown').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // close dropdowns when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(i => i.classList.remove('open'));
    }
  });

  // faq accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // news carousel (simple highlight cycle)
  const newsCards = document.querySelectorAll('.news-card');
  let newsIndex = 0;
  function focusNews(i){
    newsCards.forEach((c,idx) => c.style.opacity = idx === i ? '1' : '0.55');
  }
  document.getElementById('newsNext').addEventListener('click', () => {
    newsIndex = (newsIndex + 1) % newsCards.length;
    focusNews(newsIndex);
  });
  document.getElementById('newsPrev').addEventListener('click', () => {
    newsIndex = (newsIndex - 1 + newsCards.length) % newsCards.length;
    focusNews(newsIndex);
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // stat counters — animate when section scrolls into view
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 1800; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * target;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach(animateCounter);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stats').forEach(el => statObserver.observe(el));

