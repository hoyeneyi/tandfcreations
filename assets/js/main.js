// === Simple Lightbox using the <dialog> element ===
const dlg = document.getElementById('lightbox');
const dlgImg = document.getElementById('lightbox-img');

document.querySelectorAll('[data-lightbox="gallery"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    dlgImg.src = a.getAttribute('href');
    if (typeof dlg.showModal === 'function') dlg.showModal();
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
  try { dlg.close(); } catch (_) {}
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { try { dlg.close(); } catch (_) {} }
});

// Header shadow when scrolling
const hdr = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (!hdr) return;
  hdr.classList.toggle('stuck', (window.scrollY || document.documentElement.scrollTop) > 8);
});

// --- Minimal success message for Formspree (progressive enhancement) ---
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', () => {
    const msg = document.getElementById('form-msg');
    if (msg) msg.textContent = "Sending…";
    setTimeout(() => {
      if (msg && msg.textContent === "Sending…") {
        msg.textContent = "Thanks! We’ll reply within 1–2 business days.";
      }
    }, 900);
  });
}
/* ----- Simple fixed-height carousel (no layout shift) ----- */
(function(){
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  let index = 0;
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  document.getElementById('carousel-prev')?.addEventListener('click', () => go(index - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => go(index + 1));

  let timer = setInterval(() => go(index + 1), 4000);
  // pause on hover (optional)
  track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  track.parentElement.addEventListener('mouseleave', () => { timer = setInterval(() => go(index + 1), 4000); });
})();
