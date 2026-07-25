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

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Informativa cookie');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p class="cookie-banner-text">Usiamo cookie e tecnologie di tracciamento a fini di analisi e marketing per capire da quale canale arrivi. ' +
        'Puoi accettarli o rifiutarli. Dettagli nella <a href="cookie.html">Cookie Policy</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn-cookie btn-cookie-reject" id="cookieReject">Rifiuta</button>' +
          '<button type="button" class="btn-cookie btn-cookie-accept" id="cookieAccept">Accetta</button>' +
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
