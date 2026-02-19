// ================================
// AUTOMATSKI DODAJ REVEAL KLASE
// ================================
document.querySelectorAll('.amenity-card, .gallery-item, .about-content, .contact-wrapper')
  .forEach(el => el.classList.add('reveal'));

// ================================
// NAVBAR: Scroll efekat + Mobilni meni
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');

// Mijenja izgled navbara kada korisnik skroluje
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Otvara/zatvara mobilni meni
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

// Zatvara meni kada klikneš na link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

// ================================
// SCROLL REVEAL ANIMACIJA
// ================================
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animira samo jednom
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ================================
// LIGHTBOX
// ================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

// Prikupi sve galerijske slike
const galleryImages = [...document.querySelectorAll('.gallery-item img')];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = galleryImages[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Blokira scroll ispod
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

// Klik na sliku otvara lightbox
galleryImages.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(index));
});

// Zatvaranje
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Navigacija
lightboxPrev.addEventListener('click', () => navigate(-1));
lightboxNext.addEventListener('click', () => navigate(1));

// Navigacija tipkovnicom
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'Escape') closeLightbox();
});