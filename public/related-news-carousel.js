document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.related-grid');
  if (!track) return;
  const items = [...track.querySelectorAll(':scope > a')];
  items.forEach((item, itemIndex) => {
    const content = item.querySelector('div');
    const description = window.relatedNewsDescriptions?.[itemIndex];
    if (!content || !description) return;
    const excerpt = document.createElement('p');
    excerpt.className = 'related-excerpt';
    excerpt.textContent = description;
    content.appendChild(excerpt);
  });
  if (items.length < 2) return;

  track.classList.add('is-marquee');
  const marqueeTrack = document.createElement('div');
  marqueeTrack.className = 'marquee-track';
  items.forEach((item) => marqueeTrack.appendChild(item));
  items.forEach((item) => marqueeTrack.appendChild(item.cloneNode(true)));
  track.replaceChildren(marqueeTrack);
  let offset = 0;
  let lastTime = performance.now();
  let cycleWidth = 0;
  const measure = () => {
    cycleWidth = marqueeTrack.children[items.length]?.offsetLeft - marqueeTrack.children[0]?.offsetLeft || 0;
    offset %= cycleWidth || 1;
  };
  const animate = (time) => {
    const elapsed = Math.min(80, time - lastTime);
    lastTime = time;
    if (!cycleWidth) measure();
    offset += elapsed * 0.035;
    if (cycleWidth && offset >= cycleWidth) offset -= cycleWidth;
    marqueeTrack.style.transform = `translate3d(${-offset}px,0,0)`;
    requestAnimationFrame(animate);
  };
  window.addEventListener('resize', measure);
  requestAnimationFrame(animate);
  return;

  const status = document.createElement('div');
  status.className = 'related-carousel-status';
  status.setAttribute('aria-live', 'polite');
  track.after(status);

  let index = 0;
  let timer;
  const visibleCount = () => window.innerWidth <= 640 ? 1 : 2;
  const maxIndex = () => Math.max(0, items.length - visibleCount());
  const update = () => {
    index = Math.min(index, maxIndex());
    track.scrollTo({ left: items[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    status.textContent = `${index + 1}-${Math.min(index + visibleCount(), items.length)} dari ${items.length} berita`;
  };
  const move = (direction) => {
    index = direction > 0 ? (index >= maxIndex() ? 0 : index + 1) : (index <= 0 ? maxIndex() : index - 1);
    update();
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && maxIndex() > 0) timer = setInterval(() => move(1), 3500);
  };

  track.addEventListener('focusin', stop);
  track.addEventListener('focusout', start);
  window.addEventListener('resize', () => { update(); start(); });
  update();
  start();
});
