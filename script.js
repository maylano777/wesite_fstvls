const hero = document.getElementById('beranda');
const slides = hero.querySelectorAll('.slide');
const titikWrap = document.getElementById('titik-wrap');
const JEDA = 5000; // 5 detik

let sekarang = 0;
let timer = null;

slides.forEach(function (_, i) {
  const t = document.createElement('button');
  t.className = 'titik';
  t.setAttribute('aria-label', 'Ke gambar ' + (i + 1));
  t.addEventListener('click', function () { tampil(i); ulang(); });
  titikWrap.appendChild(t);
});
const titik = titikWrap.querySelectorAll('.titik');

function tampil(n) {
  sekarang = (n + slides.length) % slides.length;
  slides.forEach(function (s, i) { s.classList.toggle('aktif', i === sekarang); });
  titik.forEach(function (t, i) { t.classList.toggle('aktif', i === sekarang); });
  hero.style.setProperty('--garis1', slides[sekarang].dataset.garis1);
  hero.style.setProperty('--garis2', slides[sekarang].dataset.garis2);
}

function mulai() { timer = setInterval(function () { tampil(sekarang + 1); }, JEDA); }
function ulang() { clearInterval(timer); mulai(); }

// Geser di layar sentuh
let awalX = 0;
hero.addEventListener('touchstart', function (e) { awalX = e.touches[0].clientX; }, { passive: true });
hero.addEventListener('touchend', function (e) {
  const selisih = e.changedTouches[0].clientX - awalX;
  if (Math.abs(selisih) > 50) { tampil(sekarang + (selisih < 0 ? 1 : -1)); ulang(); }
});

tampil(0);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) mulai();