(() => {
  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'ar,fr',
      autoDisplay: false
    }, 'google_translate_element');
  };

  let observer = null;

  const FLAGS = {
    fr: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"%3E%3Crect width="300" height="600" fill="%23002395"/%3E%3Crect x="300" width="300" height="600" fill="%23fff"/%3E%3Crect x="600" width="300" height="600" fill="%23ED2939"/%3E%3C/svg%3E',
    ar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"%3E%3Crect width="900" height="600" fill="%23006C35"/%3E%3Ctext x="450" y="350" fill="white" font-family="Arial" font-size="80" text-anchor="middle"%3Eلا إله إلا الله%3C/text%3E%3Ctext x="450" y="450" fill="white" font-family="Arial" font-size="80" text-anchor="middle"%3Eمحمد رسول الله%3C/text%3E%3C/svg%3E'
  };

  const customizeSelect = () => {
    const select = document.querySelector('.goog-te-combo');
    if (!select) return;

    if (observer) {
      observer.disconnect();
    }

    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.value === '' && opt.textContent !== 'Langue') {
        opt.textContent = 'Langue';
      } else if (opt.value === 'fr' && opt.textContent !== 'Fran\u00e7ais') {
        opt.textContent = 'Fran\u00e7ais';
      } else if (opt.value === 'ar' && opt.textContent !== '\u0627\u0644\u0639\u0631\u0628\u064a\u0629') {
        opt.textContent = '\u0627\u0644\u0639\u0631\u0628\u064a\u0629';
      }
    }

    updateFlag(select.value);

    const targetNode = document.getElementById('google_translate_element');
    if (targetNode && observer) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  };

  const updateFlag = (lang) => {
    const container = document.querySelector('.mc-translate-container');
    if (!container) return;
    let indicator = container.querySelector('.mc-flag-icon');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'mc-flag-icon';
      container.appendChild(indicator);
    }
    if (lang && FLAGS[lang]) {
      indicator.style.backgroundImage = 'url("' + FLAGS[lang] + '")';
      indicator.style.display = '';
    } else {
      indicator.style.display = 'none';
    }
  };

  const startObserver = () => {
    const targetNode = document.getElementById('google_translate_element');
    if (!targetNode) return;

    customizeSelect();

    observer = new MutationObserver(() => {
      customizeSelect();
    });

    observer.observe(targetNode, { childList: true, subtree: true });

    targetNode.addEventListener('change', (e) => {
      if (e.target && e.target.classList.contains('goog-te-combo')) {
        setTimeout(customizeSelect, 50);
      }
    }, true);
  };

  const init = () => {
    if (document.querySelector('.mc-translate-container')) return;

    const container = document.createElement('div');
    container.className = 'mc-translate-container';

    const element = document.createElement('div');
    element.id = 'google_translate_element';

    container.appendChild(element);

    const nav = document.getElementById('et-top-navigation');
    if (nav) {
      const mobileMenu = document.getElementById('et_mobile_nav_menu');
      if (mobileMenu) {
        nav.insertBefore(container, mobileMenu);
      } else {
        nav.appendChild(container);
      }
    } else {
      const header = document.getElementById('main-header');
      if (header) {
        header.appendChild(container);
      } else {
        document.body.appendChild(container);
      }
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    startObserver();

    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0 !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-banner { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-te-balloon-frame { display: none !important; }
    `;
    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
