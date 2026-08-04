/* Synomic — site scripts */
(function () {
  'use strict';

  document.querySelectorAll('.jsYear').forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (e) { io.observe(e); });

  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Cookiemelding — Synomic plaatst zelf geen tracking cookies.
     De keuze wordt alleen lokaal onthouden, er gaat niets naar een server. */
  var COOKIE_KEY = 'synomic-cookiekeuze';
  var banner = document.getElementById('cookie');
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem(COOKIE_KEY); } catch (e) {}
    if (!stored) { setTimeout(function () { banner.classList.add('show'); }, 900); }
    banner.querySelectorAll('[data-cookie]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        try { localStorage.setItem(COOKIE_KEY, btn.getAttribute('data-cookie')); } catch (e) {}
        banner.classList.remove('show');
      });
    });
  }

  /* Projectfilter */
  var filters = document.getElementById('projectFilters');
  if (filters) {
    var fbtns = filters.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('#projectGrid .proj');
    fbtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        fbtns.forEach(function (b) {
          b.classList.remove('is-active', 'pill-navy');
          b.classList.add('pill-ghost');
        });
        btn.classList.add('is-active', 'pill-navy');
        btn.classList.remove('pill-ghost');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function (c) {
          c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  /* Contactformulier — Formspree, met validatie en bot-/misbruikbeveiliging */
  var form = document.getElementById('contactForm');
  if (!form) return;

  var ENDPOINT = 'https://formspree.io/f/xbdwaekq';
  var RATE_KEY = 'synomic_form_subs';
  var RATE_MAX = 3;
  var RATE_WINDOW = 15 * 60 * 1000;
  var loadedAt = Date.now();
  var sendError = document.getElementById('sendError');

  function mark(id, invalid) {
    var el = document.getElementById(id);
    if (el) { el.classList.toggle('is-invalid', !!invalid); }
  }
  function fail(text) {
    sendError.textContent = text;
    sendError.classList.add('show');
  }
  function recent() {
    var now = Date.now();
    try {
      return JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]').filter(function (t) { return now - t < RATE_WINDOW; });
    } catch (e) { return []; }
  }
  function succeed() {
    document.getElementById('formView').style.display = 'none';
    document.getElementById('successView').style.display = 'block';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendError.classList.remove('show');

    /* Honeypot: alleen bots vullen dit verborgen veld in — stil laten slagen */
    if (form.website && form.website.value) { succeed(); return; }

    /* Tijdcontrole: sneller dan 3 seconden is geen mens */
    if (Date.now() - loadedAt < 3000) {
      fail('Formulier te snel ingevuld. Probeer het opnieuw.');
      return;
    }

    var subs = recent();
    if (subs.length >= RATE_MAX) {
      fail('U heeft te veel berichten verstuurd. Probeer het over 15 minuten opnieuw.');
      return;
    }

    var naam = form.naam.value.trim();
    var email = form.email.value.trim();
    var onderwerp = form.onderwerp.value;
    var bericht = form.bericht.value.trim();

    mark('f-naam', naam.length < 2);
    mark('f-email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email));
    mark('f-onderwerp', !onderwerp);
    mark('f-bericht', bericht.length < 20);

    var privBox = document.getElementById('f-privacy');
    var privErr = document.getElementById('privacy-error');
    var privacyOk = form.privacy.checked;
    privBox.classList.toggle('is-invalid', !privacyOk);
    privErr.style.display = privacyOk ? 'none' : 'block';

    if (form.querySelector('.field.is-invalid') || !privacyOk) { return; }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Versturen…';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        naam: naam,
        bedrijf: form.bedrijf.value.trim(),
        email: email,
        telefoon: form.telefoon.value.trim(),
        onderwerp: onderwerp,
        bericht: bericht
      })
    }).then(function (response) {
      if (!response.ok) { throw new Error('http ' + response.status); }
      subs.push(Date.now());
      try { sessionStorage.setItem(RATE_KEY, JSON.stringify(subs)); } catch (e) {}
      succeed();
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Verstuur bericht';
      fail('Het bericht kon niet worden verzonden. Mail uw bericht naar info@synomic.nl, dan pakt Synomic het direct op.');
    });
  });
})();
