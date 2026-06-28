(() => {
  const triggers = document.querySelectorAll('.mc-contact-trigger');
  if (!triggers.length) return;

  const phoneLocal = '0626163527';
  const phoneWhatsapp = '212626163527';
  const instaUrl =
    'https://www.instagram.com/mobimed_ma';

  const modal = document.createElement('div');
  modal.className = 'mc-contact-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="mc-contact-modal__backdrop" data-close></div>
    <div class="mc-contact-modal__panel" role="dialog" aria-modal="true" aria-labelledby="mc-contact-title">
      <button type="button" class="mc-contact-modal__close" aria-label="Fermer">&times;</button>
      <div class="mc-contact-modal__title" id="mc-contact-title">Contacter nous</div>
      <div class="mc-contact-modal__actions">
        <a class="mc-contact-modal__action" href="https://wa.me/${phoneWhatsapp}" target="_blank" rel="noopener">
          <svg class="mc-contact-modal__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#25D366" d="M20.52 3.48A11.83 11.83 0 0 0 12.02 0C5.4 0 .02 5.38.02 12a11.9 11.9 0 0 0 1.62 6L0 24l6.16-1.61A11.95 11.95 0 0 0 12.02 24C18.64 24 24 18.62 24 12c0-3.2-1.24-6.2-3.48-8.52ZM12.02 22a9.9 9.9 0 0 1-5.06-1.39l-.36-.21-3.66.96.98-3.57-.24-.37A9.9 9.9 0 0 1 2.02 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.06 2.94A9.93 9.93 0 0 1 22.02 12c0 5.52-4.48 10-10 10Zm5.79-7.43c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.6-.95-.85-1.6-1.9-1.79-2.22-.18-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.35.52 1.81.66.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
        <a class="mc-contact-modal__action" href="${instaUrl}" target="_blank" rel="noopener">
          <svg class="mc-contact-modal__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#E1306C" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.75 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
          </svg>
          <span>Instagram</span>
        </a>
      </div>
      <p class="mc-contact-modal__hint">Téléphone : ${phoneLocal}</p>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.mc-contact-modal__close');
  const backdrop = modal.querySelector('.mc-contact-modal__backdrop');

  const open = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mc-contact-open');
    closeBtn && closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mc-contact-open');
  };

  triggers.forEach((t) => t.addEventListener('click', open));
  closeBtn && closeBtn.addEventListener('click', close);
  backdrop && backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();

