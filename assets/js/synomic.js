/* ═══════════════════════════════════════════════════════════════════════
   SYNOMIC — motion engine
   Lenis (inertie) · GSAP + ScrollTrigger (reveals, pinning) · SplitType
   Canvas: chaos → orde ledger, node-netwerk
   Alles degradeert netjes zonder JS en respecteert prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) root.classList.add('no-motion');

  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  // Only now is it safe for CSS to hide the reveal targets: if a CDN is
  // blocked we never get here and the page renders fully visible.
  if (hasST && !REDUCED) root.classList.add('js-motion');

  var lenis = null;
  var scrollVelocity = 0;

  /* ── Smooth scroll ─────────────────────────────────────────────────── */

  function initScroll() {
    if (REDUCED || typeof window.Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', function (e) {
      scrollVelocity = e.velocity || 0;
      if (hasST) ScrollTrigger.update();
    });

    if (hasGsap) {
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Anchor links route through Lenis so they inherit the same easing.
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        ev.preventDefault();
        lenis.scrollTo(target, { offset: -90, duration: 1.4 });
      });
    });
  }

  /* ── Nav ───────────────────────────────────────────────────────────── */

  function initNav() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;

    var last = 0;
    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset;
      bar.classList.toggle('is-stuck', y > 30);
      // Hide going down, reveal going up — but never over the hero.
      bar.classList.toggle('is-hidden', y > 520 && y > last + 2);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var burger = document.querySelector('.nav__burger');
    var menu = document.querySelector('.menu');
    if (!burger || !menu) return;

    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) open ? lenis.stop() : lenis.start();
    };

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setMenu(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ── Marquees ──────────────────────────────────────────────────────── */
  /* One engine for the announcement ticker, the ledger data strips and the
     logo band. Content is cloned until it overflows twice, then translated
     with a wrapping modifier so the loop is genuinely seamless. Scroll
     velocity feeds into timeScale — the Spectral trick that makes the page
     feel physically connected to the wheel. */

  function buildMarquee(el) {
    var speed = parseFloat(el.dataset.speed || '60'); // px per second
    var dir = el.dataset.dir === 'right' ? 1 : -1;
    var set = el.firstElementChild;
    if (!set) return null;

    var need = Math.ceil((window.innerWidth * 2) / Math.max(set.offsetWidth, 1)) + 1;
    for (var i = 0; i < need; i++) {
      el.appendChild(set.cloneNode(true));
    }

    var w = set.offsetWidth;
    if (!w) return null;

    if (REDUCED || !hasGsap) return null;

    var wrap = gsap.utils.wrap(-w, 0);
    var x = dir < 0 ? 0 : -w;

    var tween = gsap.to(
      {},
      {
        duration: 1,
        repeat: -1,
        ease: 'none',
        onUpdate: function () {},
      }
    );
    tween.kill();

    // Hand-rolled ticker keeps velocity coupling exact.
    var state = { x: x };
    var render = function () {
      el.style.transform = 'translate3d(' + wrap(state.x) + 'px,0,0)';
    };
    render();

    var boost = 1;
    var tick = function (t, dt) {
      var extra = Math.min(Math.abs(scrollVelocity) * 0.11, 5.5);
      boost += (1 + extra - boost) * 0.08;
      state.x += (dir * speed * boost * dt) / 1000;
      render();
    };
    gsap.ticker.add(tick);

    return { el: el, width: w };
  }

  function initMarquees() {
    document
      .querySelectorAll('[data-marquee]')
      .forEach(function (el) {
        buildMarquee(el);
      });
  }

  /* ── Reveals ───────────────────────────────────────────────────────── */
  /* Text unmasks line by line from below its own baseline — the movement
     reads as the line arriving, not as a box fading in. */

  function splitLines(el) {
    if (typeof window.SplitType === 'undefined') return null;
    return new SplitType(el, {
      types: 'lines',
      lineClass: 'reveal-line',
    });
  }

  function initReveals() {
    if (REDUCED || !hasST) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.style.opacity = '1';
      });
      return;
    }

    // Line-masked headings
    document.querySelectorAll('[data-reveal="lines"]').forEach(function (el) {
      var split = splitLines(el);
      el.style.opacity = '1';
      var targets = split ? split.lines : [el];

      // Wrap each line so it can slide inside its own mask.
      targets.forEach(function (line) {
        var inner = document.createElement('span');
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });

      gsap.from(
        targets.map(function (l) {
          return l.firstElementChild;
        }),
        {
          yPercent: 112,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.085,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    // Blocks that lift into place
    document.querySelectorAll('[data-reveal="up"]').forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'expo.out',
          delay: parseFloat(el.dataset.delay || '0'),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    });

    // Staggered children (rows, cases, footer columns)
    document.querySelectorAll('[data-reveal="stagger"]').forEach(function (el) {
      // The wrapper carries the hiding rule; only its children animate.
      el.style.opacity = '1';
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'expo.out',
          stagger: 0.075,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    // Hairlines that draw themselves
    document.querySelectorAll('[data-reveal="rule"]').forEach(function (el) {
      el.style.opacity = '1';
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        }
      );
    });
  }

  /* ── Hero ──────────────────────────────────────────────────────────── */

  function initHero() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var mark = hero.querySelector('.hero__wordmark');

    if (!REDUCED && hasGsap) {
      var tl = gsap.timeline({ delay: 0.15 });

      // Intro: meta, then heading lines, then the wordmark letters.
      var heroLines = hero.querySelectorAll('[data-hero="lines"]');
      heroLines.forEach(function (el) {
        var split = splitLines(el);
        el.style.opacity = '1';
        var lines = split ? split.lines : [el];
        lines.forEach(function (line) {
          var inner = document.createElement('span');
          while (line.firstChild) inner.appendChild(line.firstChild);
          line.appendChild(inner);
        });
        tl.from(
          lines.map(function (l) {
            return l.firstElementChild;
          }),
          { yPercent: 115, duration: 1.25, ease: 'expo.out', stagger: 0.09 },
          0.1
        );
      });

      tl.fromTo(
        hero.querySelectorAll('[data-hero="fade"]'),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 },
        0.35
      );

      if (mark) {
        tl.fromTo(
          mark.querySelectorAll('span'),
          { yPercent: 118, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.055,
          },
          0.45
        );
      }
    }

    // Wordmark drifts up faster than the page — depth without parallax kitsch.
    if (!REDUCED && hasST && mark) {
      gsap.to(mark, {
        yPercent: -22,
        letterSpacing: '0.09em',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }
  }

  /* ── Hero canvas: chaos → orde ─────────────────────────────────────── */
  /* Loose ledger tokens — grootboeknummers, bedragen, IBAN-fragmenten —
     that settle into a right-aligned report grid. The brand story ("sync")
     told with the company's own data, not with a stock 3D render. */

  function initLedgerCanvas() {
    var canvas = document.querySelector('[data-canvas="ledger"]');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0;
    var H = 0;
    var tokens = [];
    var entry = 0;
    var scrollP = 0;
    var mouse = { x: -9999, y: -9999 };
    var startedAt = 0;

    var ACCOUNTS = ['4711.20', '1300.00', '8000.10', '4712.00', '1600.05',
      '4400.30', '2100.00', '8100.20', '4713.10', '1500.40', '7000.00', '4020.15'];
    var AMOUNTS = ['1.482,50', '820,05', '391,00', '17,40', '12.940,00',
      '2.317,85', '64,20', '5.109,60', '248,75', '9.640,10', '1.075,00', '33,90'];
    var REFS = ['F-2408', 'F-2409', 'F-2411', 'INK-771', 'INK-772',
      'DEC-041', 'MB-9920', 'EX-1183', 'TW-0447', 'BNK-208', 'OCR-63', 'API-19'];
    var STATES = ['GEBOEKT', 'MATCH', 'OK', 'GEBOEKT', 'OK', 'MATCH'];

    function layout() {
      var rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      tokens = [];
      var narrow = W < 900;
      // The report block lives in the right column on desktop.
      var bw = narrow ? W * 0.86 : W * 0.4;
      var bx = narrow ? W * 0.07 : W * 0.55;
      var rows = narrow ? 6 : 8;
      var rowH = Math.min(27, Math.max(19, H / (rows + 10)));
      // Sits below the hero's right-hand column so type never fights numbers.
      var by = narrow ? H * 0.2 : H * 0.5;

      // Column x-positions inside the block: ref | account | state | amount
      var cols = [0, bw * 0.27, bw * 0.55, bw];
      var aligns = ['left', 'left', 'left', 'right'];

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < 4; c++) {
          if (narrow && c === 2) continue; // drop the state column when tight
          var text =
            c === 0 ? REFS[(r * 3 + c) % REFS.length]
            : c === 1 ? ACCOUNTS[(r + c) % ACCOUNTS.length]
            : c === 2 ? STATES[r % STATES.length]
            : AMOUNTS[(r * 2 + c) % AMOUNTS.length];

          tokens.push({
            text: text,
            align: aligns[c],
            // ordered position
            ox: bx + cols[c],
            oy: by + r * rowH,
            // chaos position, biased to the same half so type stays readable
            cx: bx - bw * 0.35 + Math.random() * bw * 1.7,
            cy: H * 0.04 + Math.random() * H * 0.92,
            rot: (Math.random() - 0.5) * 0.85,
            // per-token drift so chaos never looks frozen
            ph: Math.random() * Math.PI * 2,
            amp: 4 + Math.random() * 12,
            // settle order: right column and later rows land last
            lag: (r / rows) * 0.42 + c * 0.06 + Math.random() * 0.1,
            cyan: c === 3 && r % 3 === 0,
            dim: c === 2,
            row: r,
            col: c,
            x: 0,
            y: 0,
          });
        }
      }
      // Row separators, drawn only once ordered.
      tokens.rows = rows;
      tokens.by = by;
      tokens.bx = bx;
      tokens.bw = bw;
      tokens.rowH = rowH;
    }

    function ease(t) {
      return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 4);
    }

    function draw(now) {
      if (!startedAt) startedAt = now;
      var t = (now - startedAt) / 1000;

      if (REDUCED) {
        entry = 1;
      } else {
        entry = Math.min((t - 0.45) / 2.3, 1);
        if (entry < 0) entry = 0;
      }

      ctx.clearRect(0, 0, W, H);

      var fade = 1 - scrollP * 0.88;
      if (fade <= 0.01) return;

      var drift = scrollP * 110;
      var fs = W < 900 ? 10.5 : 12;
      ctx.font = '400 ' + fs + 'px "Geist Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';

      // Settled hairlines: the report frame assembling itself
      var settled = ease((entry - 0.55) / 0.45);
      if (settled > 0.01) {
        ctx.strokeStyle = 'rgba(43,196,196,' + (0.16 * settled * fade).toFixed(3) + ')';
        ctx.lineWidth = 1;
        for (var r = 0; r <= tokens.rows; r++) {
          var ly = Math.round(tokens.by + r * tokens.rowH - tokens.rowH * 0.62) + drift + 0.5;
          var span = tokens.bw * settled;
          ctx.beginPath();
          ctx.moveTo(tokens.bx, ly);
          ctx.lineTo(tokens.bx + span, ly);
          ctx.stroke();
        }
      }

      for (var i = 0; i < tokens.length; i++) {
        var tk = tokens[i];
        var p = ease((entry - tk.lag) / (1 - tk.lag * 0.6));

        var wob = REDUCED ? 0 : (1 - p);
        var dx = Math.sin(t * 0.55 + tk.ph) * tk.amp * wob;
        var dy = Math.cos(t * 0.42 + tk.ph * 1.7) * tk.amp * 0.7 * wob;

        var x = tk.cx + (tk.ox - tk.cx) * p + dx;
        var y = tk.cy + (tk.oy - tk.cy) * p + dy + drift;

        // Pointer pushes tokens aside — small, but it makes the field feel alive.
        var mdx = x - mouse.x;
        var mdy = y - mouse.y;
        var d2 = mdx * mdx + mdy * mdy;
        if (d2 < 14000) {
          var f = (1 - d2 / 14000) * 16;
          var d = Math.sqrt(d2) || 1;
          x += (mdx / d) * f;
          y += (mdy / d) * f;
        }

        tk.x = x;
        tk.y = y;

        var alpha =
          (tk.cyan ? 0.85 : tk.dim ? 0.3 : 0.52) * (0.35 + p * 0.65) * fade;

        ctx.save();
        ctx.translate(x, y);
        if (wob > 0.001) ctx.rotate(tk.rot * wob);
        ctx.textAlign = p > 0.7 ? tk.align : 'left';
        ctx.fillStyle = tk.cyan
          ? 'rgba(43,196,196,' + alpha.toFixed(3) + ')'
          : 'rgba(167,192,205,' + alpha.toFixed(3) + ')';
        ctx.fillText(tk.text, 0, 0);
        ctx.restore();
      }
    }

    var raf = function (now) {
      draw(now);
      requestAnimationFrame(raf);
    };

    var ro = new ResizeObserver(layout);
    ro.observe(canvas);
    layout();
    requestAnimationFrame(raf);

    window.addEventListener(
      'pointermove',
      function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      },
      { passive: true }
    );
    window.addEventListener('pointerleave', function () {
      mouse.x = mouse.y = -9999;
    });

    if (hasST) {
      ScrollTrigger.create({
        trigger: canvas.closest('.hero') || canvas,
        start: 'top top',
        end: 'bottom top',
        onUpdate: function (self) {
          scrollP = self.progress;
        },
      });
    }
  }

  /* ── Node network (CTA / page headers) ─────────────────────────────── */
  /* The logo mark, unfolded: a hub with satellites and pulses running the
     edges. Same geometry as the wordmark's dot, so it reads as brand. */

  function initNetworks() {
    document.querySelectorAll('[data-canvas="net"]').forEach(function (canvas) {
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0;
      var H = 0;
      var nodes = [];
      var edges = [];
      var pulses = [];
      var t0 = 0;

      function layout() {
        var rect = canvas.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
      }

      function build() {
        nodes = [];
        edges = [];
        pulses = [];
        var count = Math.max(9, Math.min(20, Math.round(W / 120)));
        for (var i = 0; i < count; i++) {
          nodes.push({
            bx: Math.random() * W,
            by: Math.random() * H,
            r: i % 4 === 0 ? 4.5 : 2.5,
            ph: Math.random() * Math.PI * 2,
            amp: 8 + Math.random() * 18,
            hub: i % 4 === 0,
          });
        }
        // Connect each node to its two nearest neighbours: sparse, legible.
        nodes.forEach(function (n, i) {
          var d = nodes
            .map(function (m, j) {
              return { j: j, d: Math.hypot(m.bx - n.bx, m.by - n.by) };
            })
            .filter(function (o) {
              return o.j !== i;
            })
            .sort(function (a, b) {
              return a.d - b.d;
            });
          for (var k = 0; k < 2 && k < d.length; k++) {
            var a = Math.min(i, d[k].j);
            var b = Math.max(i, d[k].j);
            if (
              !edges.some(function (e) {
                return e.a === a && e.b === b;
              })
            )
              edges.push({ a: a, b: b });
          }
        });
        for (var p = 0; p < Math.min(5, edges.length); p++) {
          pulses.push({
            e: Math.floor(Math.random() * edges.length),
            t: Math.random(),
            v: 0.16 + Math.random() * 0.24,
          });
        }
      }

      function pos(n, time) {
        if (REDUCED) return { x: n.bx, y: n.by };
        return {
          x: n.bx + Math.sin(time * 0.22 + n.ph) * n.amp,
          y: n.by + Math.cos(time * 0.17 + n.ph * 1.4) * n.amp * 0.8,
        };
      }

      function draw(now) {
        if (!t0) t0 = now;
        var time = (now - t0) / 1000;
        ctx.clearRect(0, 0, W, H);

        var pts = nodes.map(function (n) {
          return pos(n, time);
        });

        ctx.lineWidth = 1;
        edges.forEach(function (e) {
          var a = pts[e.a];
          var b = pts[e.b];
          ctx.strokeStyle = 'rgba(167,192,205,0.13)';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });

        if (!REDUCED) {
          pulses.forEach(function (pl) {
            pl.t += pl.v * 0.016;
            if (pl.t > 1) {
              pl.t = 0;
              pl.e = Math.floor(Math.random() * edges.length);
            }
            var e = edges[pl.e];
            if (!e) return;
            var a = pts[e.a];
            var b = pts[e.b];
            var x = a.x + (b.x - a.x) * pl.t;
            var y = a.y + (b.y - a.y) * pl.t;
            var g = ctx.createRadialGradient(x, y, 0, x, y, 16);
            g.addColorStop(0, 'rgba(43,196,196,0.55)');
            g.addColorStop(1, 'rgba(43,196,196,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, 16, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        nodes.forEach(function (n, i) {
          var p = pts[i];
          ctx.fillStyle = n.hub
            ? 'rgba(43,196,196,0.75)'
            : 'rgba(167,192,205,0.35)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });

        requestAnimationFrame(draw);
      }

      new ResizeObserver(layout).observe(canvas);
      layout();
      requestAnimationFrame(draw);
    });
  }

  /* ── Pinned process rail ───────────────────────────────────────────── */

  function initProcess() {
    var rail = document.querySelector('.proc__rail i');
    var steps = document.querySelector('.proc__steps');
    if (!rail || !steps || REDUCED || !hasST) return;

    gsap.fromTo(
      rail,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: steps,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
      }
    );
  }

  /* ── Counters ──────────────────────────────────────────────────────── */

  function initCounters() {
    var nl = new Intl.NumberFormat('nl-NL');
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      if (isNaN(target)) return;
      if (REDUCED || !hasST) {
        el.textContent = nl.format(target);
        return;
      }
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () {
          el.textContent = nl.format(Math.round(obj.v));
        },
      });
    });
  }

  /* ── Cursor ────────────────────────────────────────────────────────── */

  function initCursor() {
    if (REDUCED || !window.matchMedia('(hover: hover)').matches || !hasGsap) return;

    var dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    var qx = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
    var qy = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });

    window.addEventListener(
      'pointermove',
      function (e) {
        dot.classList.add('is-on');
        qx(e.clientX);
        qy(e.clientY);
      },
      { passive: true }
    );

    document
      .querySelectorAll('a, button, .srow, .case, .art')
      .forEach(function (el) {
        el.addEventListener('pointerenter', function () {
          dot.classList.add('is-lg');
        });
        el.addEventListener('pointerleave', function () {
          dot.classList.remove('is-lg');
        });
      });
  }

  /* ── Contents rail ─────────────────────────────────────────────────── */
  /* Marks the section you are reading. Uses ScrollTrigger where available so
     it stays in step with Lenis, and falls back to IntersectionObserver. */

  function initToc() {
    var toc = document.querySelector('.toc');
    if (!toc) return;

    var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var map = links
      .map(function (a) {
        var sec = document.querySelector(a.getAttribute('href'));
        return sec ? { a: a, sec: sec } : null;
      })
      .filter(Boolean);

    var setActive = function (entry) {
      map.forEach(function (m) {
        m.a.classList.toggle('is-active', m === entry);
      });
    };
    if (map[0]) setActive(map[0]);

    if (hasST) {
      map.forEach(function (m) {
        ScrollTrigger.create({
          trigger: m.sec,
          start: 'top 35%',
          end: 'bottom 35%',
          onToggle: function (self) {
            if (self.isActive) setActive(m);
          },
        });
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var m = map.filter(function (x) {
            return x.sec === e.target;
          })[0];
          if (m) setActive(m);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    map.forEach(function (m) {
      io.observe(m.sec);
    });
  }

  /* ── FAQ ───────────────────────────────────────────────────────────── */
  /* <details> stays the source of truth — it works with no JS, is findable
     by in-page search and is announced correctly. We only add the height
     transition that <details> cannot do on its own. */

  function initFaq() {
    document.querySelectorAll('.faq details').forEach(function (d) {
      var body = d.querySelector('.faq__body');
      var summary = d.querySelector('summary');
      if (!body || !summary) return;

      if (REDUCED || !hasGsap) return;

      var anim = null;

      summary.addEventListener('click', function (e) {
        e.preventDefault();
        if (anim) anim.kill();

        if (d.open) {
          anim = gsap.to(body, {
            height: 0,
            duration: 0.45,
            ease: 'power3.inOut',
            onComplete: function () {
              d.open = false;
              gsap.set(body, { height: 'auto' });
              if (hasST) ScrollTrigger.refresh();
            },
          });
        } else {
          d.open = true;
          anim = gsap.fromTo(
            body,
            { height: 0 },
            {
              height: 'auto',
              duration: 0.55,
              ease: 'power3.out',
              onComplete: function () {
                if (hasST) ScrollTrigger.refresh();
              },
            }
          );
        }
      });
    });
  }

  /* ── Appointment form ──────────────────────────────────────────────── */
  /* The form posts to Formspree natively when this never runs, so a failed
     script costs the visitor nothing. With JS it submits over fetch, keeps
     the visitor on the page and reports field errors inline. */

  function initForm() {
    var form = document.querySelector('[data-form="afspraak"]');
    if (!form) return;

    var status = form.querySelector('.form__status');
    var submit = form.querySelector('button[type="submit"]');
    var sent = document.querySelector('[data-form-sent]');
    var MAILTO = 'mailto:mark@synomic.nl';

    var fieldOf = function (el) {
      return el.closest('.field') || el.closest('.check');
    };

    var setError = function (el, msg) {
      var wrap = fieldOf(el);
      if (!wrap) return;
      wrap.classList.toggle('is-invalid', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      var slot = wrap.querySelector('.field__err');
      if (slot) slot.textContent = msg || '';
    };

    var validate = function (el) {
      var v = (el.value || '').trim();

      if (el.type === 'checkbox') {
        return el.required && !el.checked
          ? 'Vink dit aan om te versturen'
          : '';
      }
      if (el.required && !v) return 'Dit veld is verplicht';
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        return 'Controleer het e-mailadres';
      }
      return '';
    };

    var controls = function () {
      return [].slice
        .call(form.elements)
        .filter(function (el) {
          return el.name && el.name.charAt(0) !== '_' && el.type !== 'submit';
        });
    };

    // Validate on blur, but clear an error as soon as it is corrected.
    controls().forEach(function (el) {
      var ev = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'blur';
      el.addEventListener(ev, function () {
        setError(el, validate(el));
      });
      el.addEventListener('input', function () {
        if (fieldOf(el) && fieldOf(el).classList.contains('is-invalid')) {
          setError(el, validate(el));
        }
      });
    });

    var say = function (msg) {
      if (!status) return;
      status.innerHTML = msg ? '<p>' + msg + '</p>' : '';
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      say('');

      var first = null;
      controls().forEach(function (el) {
        var msg = validate(el);
        setError(el, msg);
        if (msg && !first) first = el;
      });
      if (first) {
        first.focus();
        say('Er ontbreekt nog iets. De gemarkeerde velden hebben aandacht nodig.');
        return;
      }

      var action = form.getAttribute('action') || '';
      if (action.indexOf('VERVANG-DIT') !== -1) {
        say(
          'Het formulier is nog niet gekoppeld aan Formspree. Mail zolang naar ' +
            '<a href="' + MAILTO + '" style="color:var(--cyan)">mark@synomic.nl</a>.'
        );
        return;
      }

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = 'Versturen…';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          // Formspree answers JSON on both success and 4xx, but a proxy or an
          // outage can return HTML. Never let a parse failure look like a
          // network failure to the visitor.
          return res
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              return { ok: res.ok, data: data };
            });
        })
        .then(function (r) {
          if (r.ok) {
            if (sent) {
              form.hidden = true;
              sent.hidden = false;
              sent.setAttribute('tabindex', '-1');
              sent.focus();
              if (hasST) ScrollTrigger.refresh();
            }
            return;
          }
          // Formspree returns { errors: [{ field, message }] } on 4xx.
          var errs = (r.data && r.data.errors) || [];
          var handled = false;
          errs.forEach(function (err) {
            if (!err.field) return;
            var el = form.elements[err.field];
            if (el) {
              setError(el, err.message || 'Controleer dit veld');
              handled = true;
            }
          });
          say(
            handled
              ? 'Een paar velden zijn niet geaccepteerd. Kijk ze na en probeer het opnieuw.'
              : 'Versturen is niet gelukt. Probeer het opnieuw of mail naar ' +
                  '<a href="' + MAILTO + '" style="color:var(--cyan)">mark@synomic.nl</a>.'
          );
        })
        .catch(function () {
          say(
            'Er is geen verbinding met de server. Probeer het later opnieuw of mail ' +
              'naar <a href="' + MAILTO + '" style="color:var(--cyan)">mark@synomic.nl</a>.'
          );
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = label;
        });
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────────── */

  function boot() {
    initScroll();
    initNav();
    initMarquees();
    initHero();
    initLedgerCanvas();
    initNetworks();
    initReveals();
    initProcess();
    initCounters();
    initToc();
    initFaq();
    initForm();
    initCursor();

    // Fonts change line breaks, so recalculate once they land.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (hasST) ScrollTrigger.refresh();
      });
    }
    window.addEventListener('load', function () {
      if (hasST) ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
