(function () {
  var galleries = document.querySelectorAll('.mc-gallery--lightbox');
  if (!galleries.length) return;

  var lightbox = document.createElement('div');
  lightbox.className = 'mc-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML =
    '<div class="mc-lightbox__backdrop" data-close></div>' +
    '<div class="mc-lightbox__panel" role="dialog" aria-modal="true" aria-labelledby="mc-lightbox-title">' +
    '<button type="button" class="mc-lightbox__close" aria-label="Fermer">&times;</button>' +
    '<div class="mc-lightbox__image-wrap">' +
    '<img class="mc-lightbox__image" src="" alt="">' +
    '</div>' +
    '<div class="mc-lightbox__content">' +
    '<h3 class="mc-lightbox__title" id="mc-lightbox-title"></h3>' +
    '<p class="mc-lightbox__desc"></p>' +
    '</div>' +
    '</div>';
  document.body.appendChild(lightbox);

  var img = lightbox.querySelector('.mc-lightbox__image');
  var titleEl = lightbox.querySelector('.mc-lightbox__title');
  var descEl = lightbox.querySelector('.mc-lightbox__desc');
  var closeBtn = lightbox.querySelector('.mc-lightbox__close');
  var backdrop = lightbox.querySelector('.mc-lightbox__backdrop');

  function open(card) {
    var image = card.querySelector('.mc-gallery__media img');
    var title = card.querySelector('.mc-gallery__title');
    var desc = card.querySelector('.mc-gallery__desc');
    if (!image || !title) return;

    img.src = image.src;
    img.alt = image.alt || title.textContent;
    titleEl.textContent = title.textContent;
    descEl.textContent = desc ? desc.textContent : '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mc-lightbox-open');
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mc-lightbox-open');
    img.removeAttribute('src');
  }

  galleries.forEach(function (gallery) {
    gallery.querySelectorAll('.mc-gallery__card').forEach(function (card) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      var title = card.querySelector('.mc-gallery__title');
      if (title) {
        card.setAttribute('aria-label', 'Agrandir : ' + title.textContent);
      }
      card.addEventListener('click', function () {
        open(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(card);
        }
      });
    });
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      close();
    }
  });
})();
