document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.querySelectorAll('.jsYear').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var cookie = document.getElementById('cookie');
  if (cookie && !localStorage.getItem('synomic-cookie')) {
    setTimeout(function () { cookie.classList.add('show'); }, 900);
  }
  document.querySelectorAll('[data-cookie]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      localStorage.setItem('synomic-cookie', btn.getAttribute('data-cookie'));
      if (cookie) cookie.classList.remove('show');
    });
  });

  // Contactgegevens staan niet leesbaar in de HTML: ze worden hier samengesteld,
  // zodat spambots ze niet uit de broncode kunnen halen.
  var M1 = 'bWFyaw==', M2 = 'c3lub21pYy5ubA==', T1 = 'KzMxNTEzMjAxMTUy';
  function mailAdres() { return atob(M1) + String.fromCharCode(64) + atob(M2); }
  function telNummer() { return atob(T1); }
  function telLeesbaar() {
    var t = telNummer();
    return '+31 ' + t.slice(3, 6) + ' ' + t.slice(6, 8) + ' ' + t.slice(8, 10) + ' ' + t.slice(10, 12);
  }
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    el.addEventListener('click', function () {
      var s = el.getAttribute('data-mail-subject');
      window.location.href = 'mailto:' + mailAdres() + (s ? '?subject=' + encodeURIComponent(s) : '');
    });
  });
  document.querySelectorAll('[data-tel]').forEach(function (el) {
    el.addEventListener('click', function () { window.location.href = 'tel:' + telNummer(); });
  });
  document.querySelectorAll('[data-tel-display]').forEach(function (el) { el.textContent = telLeesbaar(); });

  var form = document.getElementById('contactForm');
  if (form) {
    var started = Date.now();
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var status = document.getElementById('formStatus');
      if (form.querySelector('[name="_gotcha"]').value) return;
      if (Date.now() - started < 3000) { status.textContent = 'Even geduld, probeer het over een paar seconden opnieuw.'; return; }
      status.textContent = 'Bezig met versturen...';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (r.ok) { form.reset(); status.textContent = 'Dank u. Uw bericht is verstuurd, u krijgt binnen één werkdag antwoord.'; }
          else { status.textContent = 'Het versturen is niet gelukt. Gebruik de knop Stuur een mail, of bel tijdens kantooruren.'; }
        })
        .catch(function () { status.textContent = 'Het versturen is niet gelukt. Gebruik de knop Stuur een mail, of bel tijdens kantooruren.'; });
    });
  }
});
