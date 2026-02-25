document.querySelectorAll('.amenity-card, .gallery-item, .about-content, .contact-wrapper')
  .forEach(el => el.classList.add('reveal'));

const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

const galleryImages = [...document.querySelectorAll('.gallery-item img')];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = galleryImages[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

galleryImages.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


lightboxPrev.addEventListener('click', () => navigate(-1));
lightboxNext.addEventListener('click', () => navigate(1));

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'Escape') closeLightbox();
});

const tabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'sve' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = today;
document.getElementById('checkout').min = today;

document.getElementById('checkin').addEventListener('change', (e) => {
  document.getElementById('checkout').min = e.target.value;
});

document.querySelector('.nav-close').addEventListener('click', () => {
  document.body.classList.remove('nav-open');
});