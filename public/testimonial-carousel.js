document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.testimonial-list');
  if (!viewport) return;
  const slides = [...viewport.querySelectorAll('.testimonial-slide')];
  slides.forEach((slide) => {
    slide.classList.add('is-active');
    slide.setAttribute('aria-hidden', 'false');
  });
  if (slides.length < 2) return;

  viewport.classList.add('is-marquee');
  const track = document.createElement('div');
  track.className = 'testimonial-marquee-track';
  slides.forEach((slide) => track.appendChild(slide));
  slides.forEach((slide) => track.appendChild(slide.cloneNode(true)));
  viewport.replaceChildren(track);

  let offset = 0;
  let cycleWidth = 0;
  let lastTime = performance.now();
  const measure = () => {
    cycleWidth = track.children[slides.length]?.offsetLeft - track.children[0]?.offsetLeft || 0;
    offset %= cycleWidth || 1;
  };
  const animate = (time) => {
    const elapsed = Math.min(80, time - lastTime);
    lastTime = time;
    if (!cycleWidth) measure();
    offset += elapsed * 0.028;
    if (cycleWidth && offset >= cycleWidth) offset -= cycleWidth;
    track.style.transform = `translate3d(${-offset}px,0,0)`;
    requestAnimationFrame(animate);
  };
  window.addEventListener('resize', measure);
  requestAnimationFrame(animate);
});
