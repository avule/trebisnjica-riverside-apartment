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