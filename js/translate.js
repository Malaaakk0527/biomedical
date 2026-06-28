(() => {
  // Callback function for Google Translate
  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'ar,fr',
      autoDisplay: false
    }, 'google_translate_element');
  };

  let observer = null;

  const customizeSelect = () => {
    const select = document.querySelector('.goog-te-combo');
    if (!select) return;

    // Temporarily disconnect observer to avoid infinite loops during DOM modification
    if (observer) {
      observer.disconnect();
    }

    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.value === '') {
        if (opt.textContent !== 'FR') opt.textContent = 'FR';
      } else if (opt.value === 'fr') {
        if (opt.textContent !== 'FR') opt.textContent = 'FR';
      } else if (opt.value === 'ar') {
        if (opt.textContent !== 'AR') opt.textContent = 'AR';
      }
    }

    // Reconnect observer
    const targetNode = document.getElementById('google_translate_element');
    if (targetNode && observer) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  };

  const startObserver = () => {
    const targetNode = document.getElementById('google_translate_element');
    if (!targetNode) return;

    // Run once initially in case it's already rendered
    customizeSelect();

    observer = new MutationObserver(() => {
      customizeSelect();
    });

    observer.observe(targetNode, { childList: true, subtree: true });
    
    // Also watch for user selecting a language to re-run customization
    targetNode.addEventListener('change', (e) => {
      if (e.target && e.target.classList.contains('goog-te-combo')) {
        setTimeout(customizeSelect, 50);
      }
    }, true);
  };

  const init = () => {
    // Check if element already exists
    if (document.querySelector('.mc-translate-container')) return;

    // Create wrapper div
    const container = document.createElement('div');
    container.className = 'mc-translate-container';
    
    // Create inner element where google will render the select dropdown
    const element = document.createElement('div');
    element.id = 'google_translate_element';
    
    container.appendChild(element);

    // Find insertion points
    const nav = document.getElementById('et-top-navigation');
    const toggle = document.querySelector('.mc-theme-toggle');

    if (nav) {
      if (toggle) {
        // Insert right before the theme toggle
        nav.insertBefore(container, toggle);
      } else {
        const mobileMenu = document.getElementById('et_mobile_nav_menu');
        if (mobileMenu) {
          nav.insertBefore(container, mobileMenu);
        } else {
          nav.appendChild(container);
        }
      }
    } else {
      const header = document.getElementById('main-header');
      if (header) {
        header.appendChild(container);
      } else {
        document.body.appendChild(container);
      }
    }

    // Load Google Translate script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Start observing translation element for customization
    startObserver();

    // Watch for when Google Translate adds the bar at the top, and hide it
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
