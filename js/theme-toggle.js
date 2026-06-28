(() => {
  const STORAGE_KEY = 'mc-theme';
  const root = document.documentElement;
  const body = document.body;

  const getTheme = () =>
    root.classList.contains('mc-theme-dark') ? 'dark' : 'light';

  const updateButton = (btn) => {
    if (!btn) return;
    const dark = getTheme() === 'dark';
    btn.classList.toggle('is-dark', dark);
    btn.setAttribute(
      'aria-label',
      dark ? 'Activer le mode clair' : 'Activer le mode sombre'
    );
    btn.setAttribute('title', dark ? 'Mode clair' : 'Mode sombre');
  };

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    root.classList.toggle('mc-theme-dark', dark);
    body.classList.toggle('mc-theme-dark', dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (e) {
      /* ignore */
    }
    updateButton(document.querySelector('.mc-theme-toggle'));
  };

  const onToggleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  };

  const createToggle = () => {
    let btn = document.querySelector('.mc-theme-toggle');
    if (btn) {
      updateButton(btn);
      return btn;
    }

    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mc-theme-toggle';
    btn.setAttribute('aria-label', 'Changer le mode d\'affichage');
    btn.innerHTML =
      '<span class="mc-theme-toggle__icon mc-theme-toggle__icon--sun" aria-hidden="true">&#9728;</span>' +
      '<span class="mc-theme-toggle__icon mc-theme-toggle__icon--moon" aria-hidden="true">&#9790;</span>';
    btn.addEventListener('click', onToggleClick, true);

    const nav = document.getElementById('et-top-navigation');
    const mobileMenu = document.getElementById('et_mobile_nav_menu');
    if (nav && mobileMenu) {
      nav.insertBefore(btn, mobileMenu);
    } else {
      const header = document.getElementById('main-header');
      if (header) header.appendChild(btn);
      else document.body.appendChild(btn);
    }

    updateButton(btn);
    return btn;
  };

  const init = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') applyTheme('dark');
      else if (saved === 'light') applyTheme('light');
    } catch (e) {
      /* ignore */
    }
    createToggle();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init);
})();
