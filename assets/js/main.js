// ===========================
//  SAP GRC ARA — main.js
// ===========================

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Accordion for Q&A items — click question to toggle answer
document.querySelectorAll('.qa-q').forEach(q => {
  q.style.cursor = 'pointer';
  const answer = q.nextElementSibling;
  // Collapse all by default for clean look
  // (remove the lines below to keep all expanded)
  // answer.style.display = 'none';

  q.addEventListener('click', () => {
    const isHidden = answer.style.display === 'none';
    answer.style.display = isHidden ? 'block' : 'none';
    q.style.opacity = isHidden ? '1' : '0.75';
  });
});

// Lightbox for images — click to enlarge
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  Object.assign(overlay.style, {
    display: 'none', position: 'fixed', inset: '0',
    background: 'rgba(0,0,0,0.88)', zIndex: '9999',
    alignItems: 'center', justifyContent: 'center',
    cursor: 'zoom-out', padding: '20px'
  });
  const bigImg = document.createElement('img');
  Object.assign(bigImg.style, {
    maxWidth: '90vw', maxHeight: '90vh',
    borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
  });
  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  document.querySelectorAll('.image-block img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
})();

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.toc-nav a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.background = a.getAttribute('href') === '#' + entry.target.id
          ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)';
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));
