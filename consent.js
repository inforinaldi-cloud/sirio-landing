// SIRIO AGENCY — banner cookie / consenso (GDPR)
// Blocca lo script di tracciamento GoHighLevel finché l'utente non acconsente.
(function () {
  var STORAGE_KEY = 'sirio-cookie-consent'; // valori: 'accepted' | 'rejected'
  var GHL_SRC = 'https://link.msgsndr.com/js/external-tracking.js';
  var GHL_TRACKING_ID = 'tk_feef9ed374574a6f938dd1af02a0d7c6';

  function loadTracking() {
    if (document.getElementById('ghl-external-tracking')) return;
    var s = document.createElement('script');
    s.id = 'ghl-external-tracking';
    s.src = GHL_SRC;
    s.setAttribute('data-tracking-id', GHL_TRACKING_ID);
    document.body.appendChild(s);
  }

  function save(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (e) {}
  }

  function removeBanner() {
    var b = document.getElementById('cookieBanner');
    if (b) b.remove();
  }

  function getLang() {
    var l = (document.documentElement.getAttribute('lang') || 'it').toLowerCase();
    return l.indexOf('en') === 0 ? 'en' : 'it';
  }

  // La pagina cookie sta sempre nella stessa cartella della pagina corrente
  // (cookie.html in root per le pagine IT, en/cookie.html per le pagine EN),
  // quindi il link relativo "cookie.html" è corretto in entrambi i casi.
  var TXT = {
    it: {
      label: 'Informativa cookie',
      text: 'Usiamo cookie e tecnologie di tracciamento a fini di analisi e marketing per capire da quale canale arrivi. ' +
        'Puoi accettarli o rifiutarli. Dettagli nella <a href="cookie.html">Cookie Policy</a>.',
      reject: 'Rifiuta',
      accept: 'Accetta'
    },
    en: {
      label: 'Cookie notice',
      text: 'We use cookies and tracking technologies for analytics and marketing to understand which channel you came from. ' +
        'You can accept or reject them. Details in the <a href="cookie.html">Cookie Policy</a>.',
      reject: 'Reject',
      accept: 'Accept'
    }
  };

  function showBanner() {
    var t = TXT[getLang()];
    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', t.label);
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p class="cookie-banner-text">' + t.text + '</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn-cookie btn-cookie-reject" id="cookieReject">' + t.reject + '</button>' +
          '<button type="button" class="btn-cookie btn-cookie-accept" id="cookieAccept">' + t.accept + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      save('accepted');
      removeBanner();
      loadTracking();
    });
    document.getElementById('cookieReject').addEventListener('click', function () {
      save('rejected');
      removeBanner();
    });
  }

  function init() {
    var choice = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (choice === 'accepted') { loadTracking(); return; }
    if (choice === 'rejected') { return; }
    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
