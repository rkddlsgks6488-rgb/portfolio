// ===========================
// Navigation scroll effect
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Navbar scroll style
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===========================
// Mobile hamburger menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksContainer.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// Reveal on scroll (Intersection Observer)
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger children
      const cards = entry.target.querySelectorAll('.reveal');
      if (cards.length > 0) {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, i * 100);
        });
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Also observe section containers for staggered children
document.querySelectorAll('.expertise-grid, .about-grid, .activities-grid, .contact-grid, .achievements-layout, .vision-layout').forEach(grid => {
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, i * 120);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  gridObserver.observe(grid);
});

// ===========================
// Counter animation
// ===========================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        animateCounter(num, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===========================
// Timeline interaction
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, idx) => {
  item.addEventListener('mouseenter', () => {
    timelineItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===========================
// Parallax mouse effect for hero orbs
// ===========================
const hero = document.querySelector('.hero');
const orbs = document.querySelectorAll('.hero-orb');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const strength = (i + 1) * 20;
      orb.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = '';
    });
  });
}

// ===========================
// Smooth scroll for all anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// Card tilt effect on hover
// ===========================
document.querySelectorAll('.expertise-card, .highlight-card, .activity-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 6;
    const tiltY = (x - 0.5) * -6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===========================
// Init
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial visible items
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
