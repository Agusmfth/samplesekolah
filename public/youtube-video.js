document.addEventListener('DOMContentLoaded', () => {
  const getVideoId = (value) => {
    if (!value) return '';
    try {
      const url = new URL(value);
      const host = url.hostname.replace(/^www\./, '').toLowerCase();
      if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || '';
      if (host !== 'youtube.com' && host !== 'm.youtube.com') return '';
      if (url.pathname === '/watch') return url.searchParams.get('v') || '';
      const parts = url.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(parts[0])) return parts[1] || '';
    } catch (_) {
      return '';
    }
    return '';
  };

  const addVideo = (url, target, className, title) => {
    const id = getVideoId(url);
    if (!id || !target || !/^[\w-]{6,20}$/.test(id)) return;
    const wrapper = document.createElement('div');
    wrapper.className = `youtube-video ${className}`;
    wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    target.appendChild(wrapper);
  };

  addVideo(window.youtubeProfileUrl, document.querySelector('#profil .two-col'), 'profile-video', 'Video profil sekolah');
  const articleCopy = document.querySelector('.article-copy');
  if (articleCopy) {
    const holder = document.createElement('div');
    articleCopy.prepend(holder);
    addVideo(window.youtubeArticleUrl, holder, 'article-video', 'Video kegiatan sekolah');
  }
});
