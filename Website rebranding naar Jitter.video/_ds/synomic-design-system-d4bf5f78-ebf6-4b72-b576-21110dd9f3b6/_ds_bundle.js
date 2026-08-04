/* @ds-bundle: {"format":4,"namespace":"SynomicDesignSystem_d4bf5f","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconTile","sourcePath":"components/core/IconTile.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"CTABanner","sourcePath":"components/marketing/CTABanner.jsx"},{"name":"FeatureCard","sourcePath":"components/marketing/FeatureCard.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"PartnerPill","sourcePath":"components/marketing/PartnerPill.jsx"},{"name":"ProjectCard","sourcePath":"components/marketing/ProjectCard.jsx"},{"name":"ScrollNetwork","sourcePath":"components/marketing/ScrollNetwork.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"PageHeader","sourcePath":"components/navigation/PageHeader.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"891719a6c279","components/core/Button.jsx":"97978b894a67","components/core/Card.jsx":"8b6b14902514","components/core/IconTile.jsx":"744c9d85f209","components/core/Stat.jsx":"8887ab88a2a2","components/core/Tag.jsx":"eaee79d3dc07","components/forms/Checkbox.jsx":"90b977f993c5","components/forms/Select.jsx":"6ca4704dcfaf","components/forms/TextField.jsx":"145524d98a9e","components/marketing/CTABanner.jsx":"9974417e36f6","components/marketing/FeatureCard.jsx":"483cb2e17033","components/marketing/Hero.jsx":"082032401f64","components/marketing/PartnerPill.jsx":"e380a55ab196","components/marketing/ProjectCard.jsx":"461b021f46a0","components/marketing/ScrollNetwork.jsx":"0c25bf4cbf8f","components/marketing/SectionHeading.jsx":"842e3507233b","components/navigation/Breadcrumb.jsx":"8eb290d472ea","components/navigation/Footer.jsx":"0b67be616852","components/navigation/NavBar.jsx":"0ec1c15faa3f","components/navigation/PageHeader.jsx":"5a3d6a21ef92","ui_kits/synomic-website/app.jsx":"c5825ce53ed9","ui_kits/synomic-website/screens.jsx":"cd0f3c26ea9b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SynomicDesignSystem_d4bf5f = window.SynomicDesignSystem_d4bf5f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — capsule with a pulsing dot.
 *
 * Used as the hero eyebrow ("Finance · IT · AI Automatisering") and the
 * "Klaar voor de volgende stap?" banner label.
 *
 * Lives on dark backdrops only. Reads cyan-on-cyan-tinted-translucent.
 */
function Badge({
  children,
  dot = true,
  style,
  ...rest
}) {
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--cyan-15)',
    border: '1px solid var(--cyan-35)',
    borderRadius: 'var(--radius-pill)',
    padding: 'var(--pad-pill)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-1)',
    fontWeight: 600,
    color: 'var(--color-cyan)',
    letterSpacing: 'var(--ls-wider)',
    textTransform: 'uppercase',
    ...style
  };
  const d = {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--color-cyan)',
    animation: 'synomic-pulse-dot 2s infinite'
  };
  return React.createElement('span', {
    className: 'syn-badge',
    style: wrap,
    ...rest
  }, dot ? React.createElement('span', {
    style: d,
    'aria-hidden': true
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — Synomic's two button shapes.
 *
 * Two variants:
 *   • primary  — solid cyan fill with cyan glow shadow, lifts -2px on hover.
 *                Used for the page's main CTA.
 *   • outline  — transparent with a 2px translucent-white border. Reads on
 *                dark backdrops only (hero, CTA banner). Border picks up
 *                cyan on hover.
 *
 * Both use the Syne display face at 600/700 — buttons look slightly typographic
 * because Syne reads more "brand" than DM Sans would.
 *
 * Sizes are intentionally not exposed — Synomic uses one button size for primary
 * CTAs and one for the smaller nav CTA / filter pills (see NavBar / Tag).
 */
function Button({
  variant = 'primary',
  as: Tag = 'a',
  href,
  type,
  disabled = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '.95rem',
    letterSpacing: '.02em',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? .55 : 1,
    transition: 'background var(--dur-fast), color var(--dur-fast), ' + 'border-color var(--dur-fast), transform var(--dur-fast), ' + 'box-shadow var(--dur-fast)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    border: 'none'
  };
  const variants = {
    primary: {
      ...base,
      padding: 'var(--pad-btn-primary)',
      background: 'var(--color-cyan)',
      color: 'var(--text-on-dark)',
      boxShadow: 'var(--shadow-cyan-rest)'
    },
    outline: {
      ...base,
      padding: 'var(--pad-btn-outline)',
      background: 'transparent',
      color: 'var(--text-on-dark)',
      border: '2px solid rgba(255,255,255,.35)'
    }
  };
  const props = {
    onClick: disabled ? undefined : onClick,
    style: {
      ...variants[variant],
      ...style
    },
    className: 'syn-btn syn-btn-' + variant,
    ...rest
  };
  if (Tag === 'a') props.href = href;else if (Tag === 'button') props.type = type || 'button';
  return React.createElement(Tag, props, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Card — the 16px-radius white card.
 *
 * Used everywhere: service tiles, project cards, kernwaarden, KVK info block,
 * form card.
 *
 * Variants:
 *   • default — 1px border, 16px radius, lifts -5px on hover with a gradient
 *               top-border accent that fades in. Used for service tiles.
 *   • light   — softer border, no gradient accent. Used for "Novictus-inspired"
 *               feature cards.
 *   • dark    — navy gradient background, reverses text colors. Used for stats
 *               panels inside light sections (e.g. over-ons KVK widget).
 *   • form    — larger 20px radius, deeper padding, navy shadow. Contact form.
 *
 * `interactive` toggles the hover lift + gradient bar (default true).
 */
function Card({
  variant = 'default',
  interactive,
  children,
  style,
  ...rest
}) {
  const wantInteractive = interactive ?? (variant === 'default' || variant === 'light');
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--pad-card)'
    },
    light: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--pad-card)'
    },
    dark: {
      background: 'linear-gradient(135deg, var(--color-navy), var(--color-navy-mid))',
      border: 'none',
      borderRadius: 'var(--radius-3xl)',
      padding: '48px 40px',
      color: 'var(--text-on-dark)'
    },
    form: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-3xl)',
      padding: 'var(--pad-card-form)',
      boxShadow: 'var(--shadow-md)'
    }
  };
  const s = {
    position: 'relative',
    overflow: 'hidden',
    transition: wantInteractive ? 'transform var(--dur-base), box-shadow var(--dur-base), border-color var(--dur-base)' : undefined,
    ...variants[variant],
    ...style
  };
  return React.createElement('div', {
    className: 'syn-card syn-card-' + variant + (wantInteractive ? ' is-interactive' : ''),
    style: s,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconTile.jsx
try { (() => {
/**
 * IconTile — the 54×54 cyan-tinted square that holds an emoji icon at the
 * top of a feature card. Smaller 44×44 variant is the .contact-detail-icon.
 */
function IconTile({
  children,
  size = 'md',
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      w: 44,
      r: 'var(--radius-md)',
      fs: '1.1rem'
    },
    md: {
      w: 54,
      r: 'var(--radius-xl)',
      fs: '1.4rem'
    }
  };
  const s = sizes[size];
  const wrap = {
    width: s.w,
    height: s.w,
    borderRadius: s.r,
    background: 'var(--cyan-10)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: s.fs,
    flexShrink: 0,
    ...style
  };
  return React.createElement('div', {
    className: 'syn-icontile',
    style: wrap,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
/**
 * Stat — the big-number + small-label pair Synomic uses inside dark panels
 * and the hero-stats strip.
 *
 * Two tones:
 *   • dark  — cyan number, translucent-white label (the over-ons KVK widget,
 *             hero stat strip).
 *   • light — navy number with optional cyan accent span, muted label
 *             (.stat-block on light sections).
 *
 * Optional `accent` slot wraps the trailing portion of the number in cyan
 * (e.g. "30<span>+</span>").
 */
function Stat({
  n,
  label,
  accent,
  tone = 'dark',
  size = 'md',
  style
}) {
  const sizes = {
    sm: {
      num: 'var(--fz-stat)',
      label: 'var(--fz-3)'
    },
    /* hero-stats */
    md: {
      num: '1.6rem',
      label: 'var(--fz-3)'
    },
    /* over-ons */
    lg: {
      num: 'var(--fz-stat-l)',
      label: 'var(--fz-4)'
    } /* stat-block */
  };
  const tones = {
    dark: {
      numColor: 'var(--color-cyan)',
      labelColor: 'var(--text-on-dark-low)'
    },
    light: {
      numColor: 'var(--text-strong)',
      labelColor: 'var(--text-muted)'
    }
  };
  const numStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: sizes[size].num,
    lineHeight: 1,
    color: tones[tone].numColor
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: sizes[size].label,
    color: tones[tone].labelColor,
    marginTop: 4
  };
  const accentStyle = {
    color: 'var(--color-cyan)'
  };
  return React.createElement('div', {
    className: 'syn-stat',
    style: style
  }, React.createElement('div', {
    style: numStyle
  }, n, accent ? React.createElement('span', {
    style: accentStyle
  }, accent) : null), React.createElement('div', {
    style: labelStyle
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Tag — small uppercase capsule.
 *
 * Always rendered with cyan tint background and cyan text, uppercase, .06em
 * tracking. Used everywhere the brand calls a categorical chip — service tags
 * on project cards, technology tags, "Dienst 01"-style numbering, hero badges.
 *
 * Optional `tone="muted"` swaps the cyan for muted neutrals — used for tech-stack
 * tags on the project card footer.
 */
function Tag({
  children,
  tone = 'cyan',
  style,
  ...rest
}) {
  const tones = {
    cyan: {
      background: 'var(--cyan-10)',
      color: 'var(--color-cyan)'
    },
    muted: {
      background: 'transparent',
      color: 'var(--text-muted)',
      padding: 0
    }
  };
  const s = {
    display: 'inline-block',
    padding: tone === 'muted' ? 0 : 'var(--pad-tag)',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-1)',
    fontWeight: 700,
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
    ...tones[tone],
    ...style
  };
  return React.createElement('span', {
    className: 'syn-tag',
    style: s,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox — Synomic uses native checkboxes with `accent-color: var(--color-cyan)`
 * and a long muted label beside them (the contact form privacy box pattern).
 */
function Checkbox({
  id,
  name,
  label,
  required,
  checked,
  defaultChecked,
  onChange,
  error,
  style,
  ...rest
}) {
  const row = {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    ...style
  };
  const box = {
    width: 18,
    height: 18,
    marginTop: 2,
    accentColor: 'var(--color-cyan)',
    cursor: 'pointer',
    flexShrink: 0
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '.88rem',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    lineHeight: 1.5
  };
  const reqStyle = {
    color: 'var(--color-cyan)'
  };
  const helperStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '.78rem',
    color: 'var(--status-error)',
    marginTop: 5,
    marginLeft: 30
  };
  return React.createElement('div', {
    className: 'syn-checkbox-wrap'
  }, React.createElement('div', {
    className: 'syn-checkbox',
    style: row
  }, React.createElement('input', {
    id,
    name,
    type: 'checkbox',
    checked,
    defaultChecked,
    onChange,
    required,
    style: box,
    ...rest
  }), React.createElement('label', {
    htmlFor: id,
    style: labelStyle
  }, label, required ? React.createElement('span', {
    style: reqStyle
  }, ' *') : null)), error ? React.createElement('div', {
    style: helperStyle
  }, error) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * Select — native <select> wrapped in Synomic's field shell. Shares the
 * focus / error treatment with TextField.
 */
function Select({
  id,
  name,
  label,
  required,
  options = [],
  placeholder = 'Selecteer…',
  value,
  defaultValue,
  onChange,
  error,
  style,
  ...rest
}) {
  const wrapStyle = {
    marginBottom: 22,
    ...style
  };
  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '.88rem',
    fontWeight: 600,
    color: 'var(--text-strong)',
    marginBottom: 8
  };
  const reqStyle = {
    color: 'var(--color-cyan)',
    marginLeft: 4
  };
  const fieldStyle = {
    width: '100%',
    padding: 'var(--pad-input)',
    border: '1.5px solid ' + (error ? 'var(--status-error)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: '.95rem',
    color: 'var(--text-body)',
    background: 'var(--surface-card)',
    outline: 'none',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
    appearance: 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--text-muted) 50%), linear-gradient(135deg, var(--text-muted) 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 13px) 50%',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat',
    paddingRight: 36
  };
  const helperStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '.78rem',
    color: 'var(--status-error)',
    marginTop: 5
  };
  return React.createElement('div', {
    className: 'syn-field',
    style: wrapStyle
  }, label ? React.createElement('label', {
    htmlFor: id,
    style: labelStyle
  }, label, required ? React.createElement('span', {
    style: reqStyle
  }, '*') : null) : null, React.createElement('select', {
    id,
    name,
    value,
    defaultValue,
    onChange,
    required,
    style: fieldStyle,
    ...rest
  }, placeholder ? React.createElement('option', {
    value: ''
  }, placeholder) : null, options.map(o => typeof o === 'string' ? React.createElement('option', {
    key: o,
    value: o
  }, o) : React.createElement('option', {
    key: o.value,
    value: o.value
  }, o.label))), error ? React.createElement('div', {
    style: helperStyle
  }, error) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
/**
 * TextField — Synomic's stock text input.
 *
 * Single component covers both `<input>` and `<textarea>` (set `multiline` to
 * render a textarea). The visual treatment is identical: 1.5px border that
 * highlights to cyan on focus with a soft cyan focus ring.
 *
 * `error` swaps the border for red + a red ring (validation state).
 *
 * Always renders inside a `<div class="syn-field">` wrapper that holds the
 * label, the field, and a `field-error` slot. The label uses a cyan asterisk
 * to mark "required" (matches the live site's `<span>*</span>`).
 */
function TextField({
  id,
  name,
  label,
  required,
  optional,
  placeholder,
  type = 'text',
  multiline,
  rows = 5,
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  maxLength,
  autoComplete,
  style,
  ...rest
}) {
  const wrapStyle = {
    marginBottom: 22,
    ...style
  };
  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '.88rem',
    fontWeight: 600,
    color: 'var(--text-strong)',
    marginBottom: 8
  };
  const reqStyle = {
    color: 'var(--color-cyan)',
    marginLeft: 4
  };
  const optStyle = {
    color: 'var(--text-muted)',
    fontWeight: 400,
    marginLeft: 6
  };
  const fieldStyle = {
    width: '100%',
    padding: 'var(--pad-input)',
    border: '1.5px solid ' + (error ? 'var(--status-error)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: '.95rem',
    color: 'var(--text-body)',
    background: 'var(--surface-card)',
    outline: 'none',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
    boxShadow: error ? 'var(--ring-error)' : 'none',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? 130 : undefined
  };
  const helperRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 8
  };
  const helperStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '.78rem',
    color: error ? 'var(--status-error)' : 'var(--text-muted)'
  };
  const FieldEl = multiline ? 'textarea' : 'input';
  const fieldProps = {
    id,
    name,
    placeholder,
    value,
    defaultValue,
    onChange,
    maxLength,
    autoComplete,
    required,
    style: fieldStyle,
    className: 'syn-field-control' + (error ? ' is-invalid' : ''),
    ...rest
  };
  if (!multiline) fieldProps.type = type;else fieldProps.rows = rows;
  return React.createElement('div', {
    className: 'syn-field',
    style: wrapStyle
  }, label ? React.createElement('label', {
    htmlFor: id,
    style: labelStyle
  }, label, required ? React.createElement('span', {
    style: reqStyle
  }, '*') : null, optional ? React.createElement('span', {
    style: optStyle
  }, '(optioneel)') : null) : null, React.createElement(FieldEl, fieldProps), error || helperText ? React.createElement('div', {
    style: helperRow
  }, React.createElement('span', {
    style: helperStyle
  }, error || helperText)) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CTABanner.jsx
try { (() => {
/**
 * CTABanner — the dark navy-gradient banner that closes most pages.
 *
 * Headline + primary cyan button sit on a 56px-padded navy gradient block
 * with a corner cyan radial glow.
 */
function CTABanner({
  eyebrow,
  title,
  cta = {
    href: 'contact.html',
    label: 'Start een gesprek →'
  },
  style
}) {
  const Button = window.SynomicDesignSystem_d4bf5f.Button;
  const wrap = {
    background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-mid) 100%)',
    borderRadius: 'var(--radius-3xl)',
    padding: '56px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
    flexWrap: 'wrap',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };
  const orb = {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--cyan-18) 0%, transparent 70%)',
    pointerEvents: 'none'
  };
  const eyeStyle = {
    color: 'var(--text-on-dark-low)',
    fontSize: 'var(--fz-3)',
    fontWeight: 700,
    letterSpacing: 'var(--ls-widest)',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'var(--font-body)'
  };
  const titleStyle = {
    color: 'var(--text-on-dark)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    lineHeight: 'var(--lh-display)',
    margin: 0
  };
  return React.createElement('div', {
    className: 'syn-cta-banner',
    style: wrap
  }, React.createElement('div', {
    style: orb,
    'aria-hidden': true
  }), React.createElement('div', {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, eyebrow ? React.createElement('p', {
    style: eyeStyle
  }, eyebrow) : null, title ? React.createElement('h2', {
    style: titleStyle
  }, title) : null), cta ? React.createElement(Button, {
    href: cta.href,
    style: {
      flexShrink: 0,
      position: 'relative',
      zIndex: 2
    }
  }, cta.label) : null);
}
Object.assign(__ds_scope, { CTABanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CTABanner.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FeatureCard.jsx
try { (() => {
/**
 * FeatureCard — a card that opens with a 54×54 cyan-tinted IconTile, then an
 * H3 title and a muted paragraph. The home-page "Wie zijn wij" tiles and the
 * "Kernwaarden" tiles are both this.
 *
 * Defaults to the `Card` interactive treatment — hover lift + gradient
 * top-border accent. Set `interactive={false}` if it sits inside a static
 * grid you don't want to animate.
 */
function FeatureCard({
  icon,
  title,
  children,
  href,
  interactive = true,
  style
}) {
  const Card = window.SynomicDesignSystem_d4bf5f.Card;
  const IconTile = window.SynomicDesignSystem_d4bf5f.IconTile;
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fz-h4)',
    color: 'var(--text-strong)',
    marginBottom: 10,
    marginTop: 20
  };
  const bodyStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-5)',
    color: 'var(--text-muted)',
    lineHeight: 'var(--lh-body-tight)'
  };
  const inner = React.createElement(React.Fragment, null, icon ? React.createElement(IconTile, null, icon) : null, title ? React.createElement('h3', {
    style: titleStyle
  }, title) : null, children ? React.createElement('p', {
    style: bodyStyle
  }, children) : null);
  if (href) {
    return React.createElement(Card, {
      interactive,
      style: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        ...style
      },
      as: 'a'
    }, React.createElement('a', {
      href,
      style: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
      }
    }, inner));
  }
  return React.createElement(Card, {
    interactive,
    style
  }, inner);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Hero.jsx
try { (() => {
/**
 * Hero — the homepage hero. Navy gradient, dot grid, badge → big H1 → lede →
 * two CTAs → optional below-the-fold stats strip.
 *
 * The H1 accepts a `cyanWord` for the cyan-tinted highlight word (matches the
 * live site's `<em>digitale groei</em>` pattern).
 */
function Hero({
  badge,
  title,
  cyanWord,
  intro,
  primary,
  secondary,
  stats,
  style
}) {
  const Badge = window.SynomicDesignSystem_d4bf5f.Badge;
  const Button = window.SynomicDesignSystem_d4bf5f.Button;
  const Stat = window.SynomicDesignSystem_d4bf5f.Stat;
  const wrap = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '100px var(--page-pad-x) 60px',
    background: 'var(--gradient-hero)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };
  const dots = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'var(--gradient-dotgrid-cyan)',
    backgroundSize: '48px 48px',
    pointerEvents: 'none'
  };
  const orbA = {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 520,
    height: 520,
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--cyan-18) 0%, transparent 70%)',
    pointerEvents: 'none'
  };
  const orbB = {
    position: 'absolute',
    bottom: -80,
    left: '10%',
    width: 360,
    height: 360,
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--cyan-10) 0%, transparent 70%)',
    pointerEvents: 'none'
  };
  const content = {
    maxWidth: 640,
    position: 'relative',
    zIndex: 2
  };
  const h1 = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fz-hero)',
    color: 'var(--text-on-dark)',
    marginTop: 28,
    marginBottom: 24,
    lineHeight: 'var(--lh-display)'
  };
  const accent = {
    color: 'var(--color-cyan)',
    fontStyle: 'normal'
  };
  const p = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-8)',
    color: 'var(--text-on-dark-mid)',
    maxWidth: 520,
    marginBottom: 40
  };
  const buttonRow = {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap'
  };
  const statsRow = {
    display: 'flex',
    gap: 48,
    marginTop: 64,
    paddingTop: 40,
    borderTop: 'var(--border-on-dark) 1px solid'
  };
  return React.createElement('section', {
    className: 'syn-hero',
    style: wrap
  }, React.createElement('div', {
    style: dots,
    'aria-hidden': true
  }), React.createElement('div', {
    style: orbA,
    'aria-hidden': true
  }), React.createElement('div', {
    style: orbB,
    'aria-hidden': true
  }), React.createElement('div', {
    style: content
  }, badge ? React.createElement(Badge, null, badge) : null, title ? React.createElement('h1', {
    style: h1
  }, title, cyanWord ? React.createElement(React.Fragment, null, ' ', React.createElement('em', {
    style: accent
  }, cyanWord)) : null) : null, intro ? React.createElement('p', {
    style: p
  }, intro) : null, primary || secondary ? React.createElement('div', {
    style: buttonRow
  }, primary ? React.createElement(Button, {
    href: primary.href
  }, primary.label) : null, secondary ? React.createElement(Button, {
    variant: 'outline',
    href: secondary.href
  }, secondary.label) : null) : null, stats && stats.length ? React.createElement('div', {
    style: statsRow
  }, ...stats.map((s, i) => React.createElement(Stat, {
    key: i,
    n: s.n,
    accent: s.accent,
    label: s.label,
    size: 'sm'
  }))) : null));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PartnerPill.jsx
try { (() => {
/**
 * PartnerPill — a horizontal anchor card with a 44×44 logo swatch on the left
 * and partner name + role on the right. Used in the "Technologieën & tools"
 * strip.
 */
function PartnerPill({
  logo,
  logoAlt,
  name,
  role,
  href,
  style
}) {
  const wrap = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    background: 'var(--surface-card)',
    border: '1px solid var(--border-soft)',
    borderRadius: 'var(--radius-xl)',
    padding: '14px 20px',
    flex: 1,
    minWidth: 180,
    maxWidth: 280,
    textDecoration: 'none',
    transition: 'transform var(--dur-fast), box-shadow var(--dur-fast)',
    ...style
  };
  const swatch = {
    width: 44,
    height: 44,
    minWidth: 44,
    borderRadius: 'var(--radius-md)',
    background: '#fff',
    border: '1px solid var(--border-soft)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const nameStyle = {
    fontWeight: 700,
    fontSize: 'var(--fz-5)',
    color: 'var(--text-strong)',
    fontFamily: 'var(--font-display)'
  };
  const roleStyle = {
    fontSize: 'var(--fz-1)',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-body)'
  };
  const inner = React.createElement(React.Fragment, null, React.createElement('div', {
    style: swatch
  }, typeof logo === 'string' ? React.createElement('img', {
    src: logo,
    alt: logoAlt || name,
    style: {
      width: 32,
      height: 32,
      objectFit: 'contain'
    }
  }) : logo), React.createElement('div', null, React.createElement('div', {
    style: nameStyle
  }, name), role ? React.createElement('div', {
    style: roleStyle
  }, role) : null));
  return href ? React.createElement('a', {
    href,
    style: wrap,
    className: 'syn-partner-pill'
  }, inner) : React.createElement('div', {
    style: wrap,
    className: 'syn-partner-pill'
  }, inner);
}
Object.assign(__ds_scope, { PartnerPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PartnerPill.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProjectCard.jsx
try { (() => {
/**
 * ProjectCard — case-study tile from the Projecten page.
 *
 * Top: 160-tall navy gradient block with a single large emoji icon.
 * Then: category tag, H3, body paragraph, and an inline tech-stack row
 * separated by · dots, all rendered with muted typography.
 */
function ProjectCard({
  icon,
  category,
  title,
  children,
  stack = [],
  style
}) {
  const Card = window.SynomicDesignSystem_d4bf5f.Card;
  const Tag = window.SynomicDesignSystem_d4bf5f.Tag;
  const tile = {
    background: 'var(--gradient-header)',
    borderRadius: 'var(--radius-md)',
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    marginBottom: 20
  };
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fz-h4)',
    marginBottom: 10,
    marginTop: 0,
    color: 'var(--text-strong)'
  };
  const bodyStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-5)',
    color: 'var(--text-muted)',
    lineHeight: 'var(--lh-body-tight)'
  };
  const stackRow = {
    marginTop: 20,
    paddingTop: 16,
    borderTop: '1px solid var(--border-default)',
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    fontFamily: 'var(--font-body)',
    fontSize: '.78rem',
    color: 'var(--text-muted)',
    alignItems: 'center'
  };
  const stackBits = [];
  stack.forEach((s, i) => {
    if (i > 0) stackBits.push(React.createElement('span', {
      key: 'd' + i,
      style: {
        color: 'var(--border-default)'
      }
    }, '·'));
    stackBits.push(React.createElement('span', {
      key: 's' + i
    }, s));
  });
  return React.createElement(Card, {
    style
  }, React.createElement('div', {
    style: tile,
    'aria-hidden': true
  }, icon), category ? React.createElement(Tag, {
    style: {
      marginBottom: 12,
      display: 'inline-block'
    }
  }, category) : null, title ? React.createElement('h3', {
    style: titleStyle
  }, title) : null, children ? React.createElement('p', {
    style: bodyStyle
  }, children) : null, stack.length ? React.createElement('div', {
    style: stackRow
  }, ...stackBits) : null);
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ScrollNetwork.jsx
try { (() => {
/**
 * ScrollNetwork — scroll-driven SVG network illustration.
 *
 * The network shows Synomic's working method visually: three pillars
 * (Finance · IT · AI) feed into a central Synomic hub, which in turn
 * produces three customer outcomes (Meetbare impact · Schaalbare groei ·
 * Slimmere processen).
 *
 * Visual treatment matches the brand on white: white surface, hairline
 * border, subtle cyan dot-grid + glow orbs. Cyan nodes, navy hub, navy
 * labels. No dark panel — the widget sits on the surrounding white section
 * as a normal Synomic card would.
 *
 * Motion:
 *   • All nodes are visible from progress 0 (faint at first).
 *   • Top nodes light up + edges to the hub draw in within the first 25%
 *     of scroll progress.
 *   • The hub then lights with a continuous pulsing halo.
 *   • Hub-to-outcome edges flow downward; outcome nodes slide UP into
 *     position from below as they activate (the "naar beneden" motion).
 *   • Once an edge is drawn, a small cyan spark continuously travels along
 *     it — keeps the diagram alive without the user needing to keep scrolling.
 *   • Animation completes by ~55% scroll progress — designed to feel compact.
 *
 * Interactions:
 *   • Hovering any node highlights it and the edges that touch it.
 *   • Bottom progress bar mirrors scroll position with a cyan gradient.
 *
 * Scroll-anchor resolution:
 *   Walks up the DOM looking for an ancestor with `data-scroll-anchor="1"`.
 *   Falls back to immediate parent. Set the anchor on the surrounding
 *   section so scroll progress is measured against the right element when
 *   the network sits inside a `position: sticky` wrapper.
 */
const SN_NODES = [{
  id: 'finance',
  x: 90,
  y: 92,
  r: 19,
  label: ['Finance'],
  lit: 0.00
}, {
  id: 'it',
  x: 240,
  y: 74,
  r: 19,
  label: ['IT'],
  lit: 0.03
}, {
  id: 'ai',
  x: 390,
  y: 92,
  r: 19,
  label: ['AI'],
  lit: 0.06
}, {
  id: 'hub',
  x: 240,
  y: 295,
  r: 32,
  label: ['Synomic'],
  lit: 0.18,
  central: true
}, {
  id: 'impact',
  x: 90,
  y: 478,
  r: 17,
  label: ['Meetbare', 'impact'],
  lit: 0.36,
  slideIn: true
}, {
  id: 'groei',
  x: 240,
  y: 496,
  r: 17,
  label: ['Schaalbare', 'groei'],
  lit: 0.42,
  slideIn: true
}, {
  id: 'proces',
  x: 390,
  y: 478,
  r: 17,
  label: ['Slimmere', 'processen'],
  lit: 0.48,
  slideIn: true
}];
const SN_EDGES = [{
  from: 'finance',
  to: 'hub',
  s: 0.04,
  e: 0.18
}, {
  from: 'it',
  to: 'hub',
  s: 0.07,
  e: 0.20
}, {
  from: 'ai',
  to: 'hub',
  s: 0.10,
  e: 0.22
}, {
  from: 'hub',
  to: 'impact',
  s: 0.26,
  e: 0.40
}, {
  from: 'hub',
  to: 'groei',
  s: 0.30,
  e: 0.44
}, {
  from: 'hub',
  to: 'proces',
  s: 0.34,
  e: 0.48
}];
function _snClamp(v) {
  return Math.max(0, Math.min(1, v));
}
function _snSmooth(v) {
  v = _snClamp(v);
  return v * v * (3 - 2 * v);
}
function _snEdgePath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const off = (b.x - a.x) * 0.07;
  return 'M ' + a.x + ' ' + a.y + ' Q ' + (mx + off) + ' ' + my + ' ' + b.x + ' ' + b.y;
}
function ScrollNetwork({
  height = 600,
  style
}) {
  const h = React.createElement;
  const wrapRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [hover, setHover] = React.useState(null);
  React.useEffect(() => {
    if (!wrapRef.current) return;
    let anchor = wrapRef.current.parentElement;
    let walk = anchor;
    while (walk) {
      if (walk.getAttribute && walk.getAttribute('data-scroll-anchor') === '1') {
        anchor = walk;
        break;
      }
      walk = walk.parentElement;
    }
    let raf = null;
    const update = () => {
      raf = null;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const startY = vh * 0.85;
      const endY = vh * 0.15;
      const total = rect.height + (startY - endY);
      const elapsed = startY - rect.top;
      setProgress(_snClamp(elapsed / total));
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const byId = {};
  SN_NODES.forEach(n => {
    byId[n.id] = n;
  });

  // Floor opacity 0.22 so the layout is immediately legible; brightens to 1.0.
  const nodeP = n => {
    const t = _snSmooth((progress - n.lit) / 0.10);
    return 0.22 + 0.78 * t;
  };
  // Bottom nodes slide UP from below — the "naar beneden" flow from Synomic.
  const slideY = n => {
    if (!n.slideIn) return 0;
    const t = _snSmooth((progress - n.lit + 0.04) / 0.10);
    return (1 - t) * 32;
  };
  const edgeP = e => _snSmooth((progress - e.s) / (e.e - e.s));

  // ---- background panel — light, sits on white sections ----
  const bg = h('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-3xl)',
      overflow: 'hidden'
    }
  }, h('div', {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(43,196,196,.16) 1px, transparent 1px)',
      backgroundSize: '22px 22px',
      opacity: 0.5
    }
  }), h('div', {
    style: {
      position: 'absolute',
      top: -60,
      right: -60,
      width: 260,
      height: 260,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(43,196,196,.18) 0%, transparent 70%)',
      pointerEvents: 'none'
    }
  }), h('div', {
    style: {
      position: 'absolute',
      bottom: -70,
      left: -50,
      width: 240,
      height: 240,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(43,196,196,.12) 0%, transparent 70%)',
      pointerEvents: 'none'
    }
  }));

  // ---- defs (gradients, glow, animations) ----
  const defs = h('defs', null, h('radialGradient', {
    id: 'sn-node-grad',
    cx: '50%',
    cy: '38%',
    r: '60%'
  }, h('stop', {
    offset: '0%',
    stopColor: '#A8F0F0',
    stopOpacity: '1'
  }), h('stop', {
    offset: '55%',
    stopColor: '#2BC4C4',
    stopOpacity: '1'
  }), h('stop', {
    offset: '100%',
    stopColor: '#1A9E9E',
    stopOpacity: '1'
  })), h('radialGradient', {
    id: 'sn-hub-grad',
    cx: '50%',
    cy: '38%',
    r: '65%'
  }, h('stop', {
    offset: '0%',
    stopColor: '#1A4D6E',
    stopOpacity: '1'
  }), h('stop', {
    offset: '60%',
    stopColor: '#1B3A5C',
    stopOpacity: '1'
  }), h('stop', {
    offset: '100%',
    stopColor: '#0E2136',
    stopOpacity: '1'
  })), h('filter', {
    id: 'sn-glow',
    x: '-50%',
    y: '-50%',
    width: '200%',
    height: '200%'
  }, h('feGaussianBlur', {
    stdDeviation: '2.4',
    result: 'blur'
  }), h('feMerge', null, h('feMergeNode', {
    in: 'blur'
  }), h('feMergeNode', {
    in: 'SourceGraphic'
  }))), h('filter', {
    id: 'sn-glow-strong',
    x: '-50%',
    y: '-50%',
    width: '200%',
    height: '200%'
  }, h('feGaussianBlur', {
    stdDeviation: '4',
    result: 'blur'
  }), h('feMerge', null, h('feMergeNode', {
    in: 'blur'
  }), h('feMergeNode', {
    in: 'SourceGraphic'
  }))));

  // ---- orbit rings around the hub ----
  const orbits = h('g', {
    opacity: 0.7
  }, h('animateTransform', {
    attributeName: 'transform',
    type: 'rotate',
    from: '0 240 295',
    to: '360 240 295',
    dur: '60s',
    repeatCount: 'indefinite'
  }), h('circle', {
    cx: 240,
    cy: 295,
    r: 64,
    fill: 'none',
    stroke: 'rgba(43,196,196,.45)',
    strokeWidth: 1,
    strokeDasharray: '2 6'
  }), h('circle', {
    cx: 240,
    cy: 295,
    r: 92,
    fill: 'none',
    stroke: 'rgba(43,196,196,.22)',
    strokeWidth: 1,
    strokeDasharray: '3 11'
  }));
  const orbitInner = h('g', {
    opacity: 0.6
  }, h('animateTransform', {
    attributeName: 'transform',
    type: 'rotate',
    from: '360 240 295',
    to: '0 240 295',
    dur: '40s',
    repeatCount: 'indefinite'
  }), h('circle', {
    cx: 240,
    cy: 295,
    r: 46,
    fill: 'none',
    stroke: 'rgba(43,196,196,.18)',
    strokeWidth: 1,
    strokeDasharray: '1 7'
  }));

  // ---- edges ----
  const edgeEls = SN_EDGES.map((e, i) => {
    const a = byId[e.from];
    const b = byId[e.to];
    // Bottom edges always render to the node's CURRENT (post-slide) position
    // so the connection feels physical, not "drawn in mid-air".
    const bX = b.x;
    const bY = b.y + slideY(b);
    const path = _snEdgePath({
      x: a.x,
      y: a.y
    }, {
      x: bX,
      y: bY
    });
    const len = Math.hypot(bX - a.x, bY - a.y) * 1.06;
    const p = edgeP(e);
    const hot = hover && (hover === e.from || hover === e.to);
    const fullyDrawn = p > 0.97;
    return h('g', {
      key: 'e' + i
    },
    // soft glow underlay
    h('path', {
      d: path,
      fill: 'none',
      stroke: hot ? 'rgba(43,196,196,.55)' : 'rgba(43,196,196,.32)',
      strokeWidth: 7,
      strokeLinecap: 'round',
      style: {
        filter: 'blur(4px)',
        opacity: p * 0.7,
        transition: 'stroke .25s'
      }
    }),
    // base "ghost" line — faint visible suggestion even before drawn
    h('path', {
      d: path,
      fill: 'none',
      stroke: 'rgba(27,58,92,.08)',
      strokeWidth: 1,
      strokeLinecap: 'round',
      strokeDasharray: '2 5'
    }),
    // sharp drawn line
    h('path', {
      d: path,
      fill: 'none',
      stroke: hot ? '#1A9E9E' : '#2BC4C4',
      strokeWidth: hot ? 2.2 : 1.6,
      strokeLinecap: 'round',
      strokeDasharray: len,
      strokeDashoffset: (1 - p) * len,
      style: {
        transition: 'stroke .25s, stroke-width .25s'
      }
    }),
    // traveling spark — only once edge is essentially drawn
    fullyDrawn ? h('circle', {
      key: 's' + i,
      r: 2.5,
      fill: '#2BC4C4',
      filter: 'url(#sn-glow-strong)'
    }, h('animateMotion', {
      dur: '3.0s',
      repeatCount: 'indefinite',
      path: path,
      begin: i * 0.5 + 's'
    }), h('animate', {
      attributeName: 'opacity',
      values: '0;1;1;0',
      keyTimes: '0;0.15;0.85;1',
      dur: '3.0s',
      repeatCount: 'indefinite',
      begin: i * 0.5 + 's'
    })) : null);
  });

  // ---- nodes ----
  const nodeEls = SN_NODES.map(n => {
    const op = nodeP(n);
    const dy = slideY(n);
    const hot = hover === n.id;
    const inner = [];
    if (n.central) {
      // pulsing cyan halo behind the navy hub
      inner.push(h('circle', {
        key: 'h1',
        cx: n.x,
        cy: n.y,
        r: n.r + 14,
        fill: 'rgba(43,196,196,.22)'
      }, h('animate', {
        attributeName: 'r',
        values: n.r + 10 + ';' + (n.r + 22) + ';' + (n.r + 10),
        dur: '2.8s',
        repeatCount: 'indefinite'
      }), h('animate', {
        attributeName: 'opacity',
        values: '.45;.12;.45',
        dur: '2.8s',
        repeatCount: 'indefinite'
      })));
      // cyan ring around the hub
      inner.push(h('circle', {
        key: 'h2',
        cx: n.x,
        cy: n.y,
        r: n.r + 4,
        fill: 'none',
        stroke: '#2BC4C4',
        strokeWidth: 1.5,
        opacity: 0.6
      }));
      // navy core
      inner.push(h('circle', {
        key: 'h3',
        cx: n.x,
        cy: n.y,
        r: n.r,
        fill: 'url(#sn-hub-grad)',
        filter: 'url(#sn-glow)'
      }));
      // central cyan dot
      inner.push(h('circle', {
        key: 'h4',
        cx: n.x,
        cy: n.y,
        r: n.r * 0.22,
        fill: '#2BC4C4'
      }));
    } else {
      // soft halo
      inner.push(h('circle', {
        key: 'a',
        cx: n.x,
        cy: n.y,
        r: n.r + 4,
        fill: 'rgba(43,196,196,.22)'
      }, h('animate', {
        attributeName: 'r',
        values: n.r + 2 + ';' + (n.r + 7) + ';' + (n.r + 2),
        dur: '3.4s',
        repeatCount: 'indefinite'
      }), h('animate', {
        attributeName: 'opacity',
        values: '.35;.1;.35',
        dur: '3.4s',
        repeatCount: 'indefinite'
      })));
      // cyan node
      inner.push(h('circle', {
        key: 'b',
        cx: n.x,
        cy: n.y,
        r: n.r,
        fill: 'url(#sn-node-grad)',
        filter: 'url(#sn-glow)'
      }));
      // inner highlight
      inner.push(h('circle', {
        key: 'c',
        cx: n.x,
        cy: n.y - n.r * 0.2,
        r: n.r * 0.32,
        fill: '#ffffff',
        opacity: 0.55
      }));
    }
    // label — multi-line via tspans, navy text on light surface
    const labelLines = n.label;
    const labelEl = h('text', {
      key: 't',
      x: n.x,
      y: n.y + n.r + 22,
      textAnchor: 'middle',
      fill: hot ? '#1A9E9E' : '#1B3A5C',
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 10.5,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        transition: 'fill .2s',
        pointerEvents: 'none'
      }
    }, ...labelLines.map((line, idx) => h('tspan', {
      key: idx,
      x: n.x,
      dy: idx === 0 ? 0 : '1.25em'
    }, line)));
    inner.push(labelEl);
    return h('g', {
      key: n.id,
      onMouseEnter: () => setHover(n.id),
      onMouseLeave: () => setHover(null),
      style: {
        opacity: op,
        transform: 'translateY(' + dy + 'px)' + (hot ? ' scale(1.10)' : ''),
        transformOrigin: n.x + 'px ' + n.y + 'px',
        transition: 'transform .25s, opacity .35s',
        cursor: 'pointer'
      }
    }, ...inner);
  });

  // ---- ambient floating particles ----
  const ambient = h('g', {
    opacity: 0.45
  }, [{
    x: 35,
    y: 180
  }, {
    x: 445,
    y: 220
  }, {
    x: 50,
    y: 360
  }, {
    x: 430,
    y: 360
  }, {
    x: 30,
    y: 250
  }, {
    x: 455,
    y: 130
  }].map((d, i) => h('circle', {
    key: 'p' + i,
    cx: d.x,
    cy: d.y,
    r: 1.6,
    fill: '#2BC4C4'
  }, h('animate', {
    attributeName: 'cy',
    values: d.y - 10 + ';' + (d.y + 10) + ';' + (d.y - 10),
    dur: 5 + i % 4 + 's',
    repeatCount: 'indefinite'
  }), h('animate', {
    attributeName: 'opacity',
    values: '.2;.8;.2',
    dur: 4 + i % 3 + 's',
    repeatCount: 'indefinite'
  }))));
  const svg = h('svg', {
    viewBox: '0 0 480 620',
    preserveAspectRatio: 'xMidYMid meet',
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'block',
      overflow: 'visible'
    }
  }, defs, ambient, orbits, orbitInner, ...edgeEls, ...nodeEls);

  // ---- caption (top) ----
  const caption = h('div', {
    style: {
      position: 'absolute',
      top: 22,
      left: 24,
      right: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }, h('span', null, 'Werkwijze · live'), h('span', {
    style: {
      color: 'var(--color-cyan)'
    }
  }, Math.round(progress * 100) + '%'));

  // ---- bottom progress bar ----
  const progressBar = h('div', {
    style: {
      position: 'absolute',
      bottom: 20,
      left: 24,
      right: 24,
      height: 2,
      background: 'rgba(27,58,92,.10)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, h('div', {
    style: {
      height: '100%',
      width: progress * 100 + '%',
      background: 'linear-gradient(90deg, transparent, #2BC4C4 30%, #1A9E9E)',
      boxShadow: '0 0 8px rgba(43,196,196,.4)',
      transition: 'width .12s linear'
    }
  }));
  return h('div', {
    ref: wrapRef,
    className: 'syn-scroll-network',
    style: {
      position: 'relative',
      width: '100%',
      height,
      ...style
    }
  }, bg, svg, caption, progressBar);
}
Object.assign(__ds_scope, { ScrollNetwork });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ScrollNetwork.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
/**
 * SectionHeading — Synomic's stock section opener.
 *
 * Renders three vertical pieces:
 *   1. .section-label  — small uppercase cyan label
 *   2. .section-title  — H2 (Syne, bold, navy)
 *   3. .section-sub    — supporting paragraph (muted)
 *
 * Pass `align="center"` to center all three (used on "Kernwaarden" /
 * "Specialisaties" / CTA blocks). Default is left-aligned.
 *
 * On a navy section, set `tone="dark"` to flip text colors.
 */
function SectionHeading({
  label,
  title,
  sub,
  align = 'start',
  tone = 'light',
  maxSubWidth = 540,
  style,
  children
}) {
  const wrap = {
    textAlign: align === 'center' ? 'center' : 'left',
    marginBottom: sub ? 48 : 24,
    ...style
  };
  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fz-1)',
    fontWeight: 700,
    letterSpacing: 'var(--ls-uppercase)',
    textTransform: 'uppercase',
    color: 'var(--color-cyan)',
    marginBottom: 12
  };
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fz-h2)',
    color: tone === 'dark' ? 'var(--text-on-dark)' : 'var(--text-strong)',
    marginBottom: 16,
    lineHeight: 'var(--lh-display)'
  };
  const subStyle = {
    fontSize: 'var(--fz-6)',
    fontFamily: 'var(--font-body)',
    color: tone === 'dark' ? 'var(--text-on-dark-mid)' : 'var(--text-muted)',
    maxWidth: maxSubWidth,
    margin: align === 'center' ? '0 auto' : undefined
  };
  return React.createElement('div', {
    className: 'syn-section-heading',
    style: wrap
  }, label ? React.createElement('div', {
    style: labelStyle
  }, label) : null, title ? React.createElement('h2', {
    style: titleStyle
  }, title) : null, sub ? React.createElement('p', {
    style: subStyle
  }, sub) : null, children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
/**
 * Breadcrumb — used inside the dark .page-header strip on inner pages.
 * Cyan link → translucent-white slash → current title in translucent-white.
 */
function Breadcrumb({
  items = [],
  style
}) {
  const wrap = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '.84rem',
    color: 'var(--text-on-dark-low)',
    marginBottom: 20,
    ...style
  };
  const linkStyle = {
    color: 'var(--color-cyan)',
    textDecoration: 'none'
  };
  const sepStyle = {
    color: 'rgba(255,255,255,.35)'
  };
  const out = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (it.href && !last) {
      out.push(React.createElement('a', {
        key: 'l' + i,
        href: it.href,
        style: linkStyle
      }, it.label));
    } else {
      out.push(React.createElement('span', {
        key: 'l' + i
      }, it.label));
    }
    if (!last) out.push(React.createElement('span', {
      key: 's' + i,
      style: sepStyle
    }, '/'));
  });
  return React.createElement('div', {
    className: 'syn-breadcrumb',
    style: wrap
  }, ...out);
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/**
 * Footer — three-column dark footer.
 *
 * Always rendered with logo+address on the left and 1–N link columns on the
 * right. Bottom strip shows copyright and a "Gebouwd met ♥ in Nederland" line.
 *
 * The wordmark inverts via `filter: brightness(0) invert(1)` — pass the
 * standard `assets/logo-white.png` (the inversion still works on dark navy
 * with the white logo).
 */
function Footer({
  logoSrc,
  brand = {
    name: 'Synomic',
    lines: ['Koornbeursweg 73', '8442 DJ Heerenveen', 'KVK: 94705569']
  },
  columns = [{
    title: 'Navigatie',
    links: [{
      href: 'index.html',
      label: 'Home'
    }, {
      href: 'over-ons.html',
      label: 'Over ons'
    }, {
      href: 'diensten.html',
      label: 'Diensten'
    }, {
      href: 'projecten.html',
      label: 'Projecten'
    }, {
      href: 'partners.html',
      label: 'Partners'
    }, {
      href: 'contact.html',
      label: 'Contact'
    }]
  }, {
    title: 'Diensten',
    links: [{
      href: 'diensten.html',
      label: 'Finance & Data'
    }, {
      href: 'diensten.html',
      label: 'IT Automatisering'
    }, {
      href: 'diensten.html',
      label: 'AI Toepassingen'
    }, {
      href: 'diensten.html',
      label: 'Procesoptimalisatie'
    }]
  }],
  copyright = '© 2025 Synomic – KVK 94705569. Alle rechten voorbehouden.',
  signoff = 'Gebouwd met ♥ in Nederland',
  style
}) {
  const wrap = {
    background: 'var(--surface-dark)',
    color: 'var(--text-on-dark-mid)',
    padding: '64px var(--page-pad-x) 36px',
    fontFamily: 'var(--font-body)',
    ...style
  };
  const top = {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr',
    gap: 48,
    paddingBottom: 48,
    borderBottom: 'var(--border-on-dark) 1px solid',
    marginBottom: 32
  };
  const brandLines = {
    fontSize: '.87rem',
    color: 'var(--text-on-dark-low)',
    lineHeight: 'var(--lh-loose)'
  };
  const brandName = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--text-on-dark)',
    marginBottom: 8,
    marginTop: 14
  };
  const colH = {
    fontFamily: 'var(--font-display)',
    fontSize: '.9rem',
    fontWeight: 700,
    color: 'var(--text-on-dark)',
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
    marginBottom: 18
  };
  const liStyle = {
    marginBottom: 10,
    listStyle: 'none'
  };
  const linkStyle = {
    fontSize: '.88rem',
    color: 'var(--text-on-dark-mid)',
    transition: 'color var(--dur-fast)'
  };
  const bottom = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '.82rem',
    flexWrap: 'wrap',
    gap: 12
  };
  return React.createElement('footer', {
    className: 'syn-footer',
    style: wrap
  }, React.createElement('div', {
    style: top
  }, React.createElement('div', {
    className: 'syn-footer-brand'
  }, logoSrc ? React.createElement('img', {
    src: logoSrc,
    alt: brand.name,
    style: {
      height: 34,
      filter: 'brightness(0) invert(1)'
    }
  }) : null, React.createElement('div', {
    style: brandName
  }, brand.name), React.createElement('div', {
    style: brandLines
  }, ...brand.lines.flatMap((l, i) => i === 0 ? [l] : [React.createElement('br', {
    key: i
  }), l]))), ...columns.map((col, i) => React.createElement('div', {
    key: i,
    className: 'syn-footer-col'
  }, React.createElement('h4', {
    style: colH
  }, col.title), React.createElement('ul', {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, ...col.links.map((l, j) => React.createElement('li', {
    key: j,
    style: liStyle
  }, React.createElement('a', {
    href: l.href,
    style: linkStyle
  }, l.label))))))), React.createElement('div', {
    style: bottom
  }, React.createElement('span', null, copyright), React.createElement('span', null, signoff)));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/**
 * NavBar — Synomic's top navigation.
 *
 * A 72px fixed bar with the logo on the left, an inline link list in the
 * middle, and the "Contact" CTA pill on the right. Two appearance modes:
 *
 *   • light  — translucent white, hairline border. Used on inner pages.
 *   • dark   — solid navy with white-translucent links. Used on the homepage
 *              so the bar reads against the hero gradient seamlessly.
 *
 * Pass `active` to mark which item is current; that item gets the cyan
 * accent underline drawn by `::after`.
 *
 * The component is presentation-only — it does NOT implement the hamburger /
 * scroll-shadow JS, because consumers may want to handle that. Add
 * `is-scrolled` to the root manually when you implement scroll behaviour.
 */
function NavBar({
  items = [{
    href: 'index.html',
    label: 'Home'
  }, {
    href: 'over-ons.html',
    label: 'Over ons'
  }, {
    href: 'diensten.html',
    label: 'Diensten'
  }, {
    href: 'projecten.html',
    label: 'Projecten'
  }, {
    href: 'partners.html',
    label: 'Partners'
  }],
  cta = {
    href: 'contact.html',
    label: 'Contact'
  },
  active = 'index.html',
  logoSrc,
  tone = 'light',
  style
}) {
  const isDark = tone === 'dark';
  const wrap = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--page-pad-x)',
    height: 72,
    background: isDark ? 'var(--color-navy)' : 'rgba(255,255,255,0.95)',
    backdropFilter: isDark ? undefined : 'blur(12px)',
    borderBottom: isDark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(221,227,236,.6)',
    boxShadow: 'var(--shadow-sm)',
    ...style
  };
  const linkColor = isDark ? 'rgba(255,255,255,.8)' : 'var(--text-strong)';
  const linkList = {
    display: 'flex',
    gap: 'var(--gap-nav)',
    listStyle: 'none',
    alignItems: 'center',
    margin: 0,
    padding: 0
  };
  const linkStyle = isActive => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '.95rem',
    color: isActive ? 'var(--color-cyan)' : linkColor,
    letterSpacing: '.02em',
    paddingBottom: 3,
    position: 'relative',
    borderBottom: isActive ? '2px solid var(--color-cyan)' : '2px solid transparent',
    transition: 'color var(--dur-fast)'
  });
  const ctaStyle = {
    background: 'var(--color-cyan)',
    color: 'var(--text-on-dark)',
    padding: 'var(--pad-btn-sm)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '.95rem',
    transition: 'background var(--dur-fast), transform var(--dur-fast)'
  };
  return React.createElement('nav', {
    className: 'syn-nav',
    style: wrap
  }, React.createElement('a', {
    className: 'syn-nav-logo',
    href: items[0].href,
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, logoSrc ? React.createElement('img', {
    src: logoSrc,
    alt: 'Synomic',
    style: {
      height: 38,
      display: 'block'
    }
  }) : React.createElement('span', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.4rem',
      color: isDark ? '#fff' : 'var(--color-navy)'
    }
  }, 'synomic')), React.createElement('ul', {
    className: 'syn-nav-links',
    style: linkList
  }, ...items.map(it => React.createElement('li', {
    key: it.href
  }, React.createElement('a', {
    href: it.href,
    style: linkStyle(it.href === active)
  }, it.label))), cta ? React.createElement('li', {
    key: '__cta'
  }, React.createElement('a', {
    href: cta.href,
    style: ctaStyle,
    className: 'syn-nav-cta'
  }, cta.label)) : null));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PageHeader.jsx
try { (() => {
/**
 * PageHeader — the dark navy strip with breadcrumb + page title that opens
 * every inner page on the site (over-ons, diensten, projecten, contact).
 *
 * Has a soft cyan radial glow in the bottom-right corner.
 *
 * The title accepts an optional `<em>cyan span</em>` — use the `cyanWord`
 * prop for that segment, or pass JSX into `title` directly.
 */
function PageHeader({
  title,
  cyanWord,
  breadcrumb,
  intro,
  style
}) {
  const wrap = {
    padding: '130px var(--page-pad-x) 60px',
    background: 'var(--gradient-header)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };
  const orb = {
    content: '""',
    position: 'absolute',
    bottom: -40,
    right: 0,
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--cyan-15) 0%, transparent 70%)',
    pointerEvents: 'none'
  };
  const h1 = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fz-h1)',
    color: 'var(--text-on-dark)',
    lineHeight: 'var(--lh-display)'
  };
  const accent = {
    color: 'var(--color-cyan)'
  };
  const p = {
    fontSize: 'var(--fz-7)',
    color: 'var(--text-on-dark-mid)',
    maxWidth: 560,
    marginTop: 14,
    fontFamily: 'var(--font-body)'
  };
  return React.createElement('div', {
    className: 'syn-page-header',
    style: wrap
  }, React.createElement('div', {
    style: orb,
    'aria-hidden': true
  }), breadcrumb ? React.createElement(window.SynomicDesignSystem_d4bf5f.Breadcrumb, {
    items: breadcrumb
  }) : null, React.createElement('h1', {
    style: h1
  }, title, cyanWord ? React.createElement(React.Fragment, null, ' ', React.createElement('span', {
    style: accent
  }, cyanWord)) : null), intro ? React.createElement('p', {
    style: p
  }, intro) : null);
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PageHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/synomic-website/app.jsx
try { (() => {
// Synomic website — top-level router.
// Reads window.location.hash and renders one of the screens defined in screens.jsx.

const {
  HomeScreen,
  AboutScreen,
  ServicesScreen,
  ProjectsScreen,
  ContactScreen,
  PartnersScreen
} = window.SynomicSiteScreens;
const ROUTES = {
  '#/home': HomeScreen,
  '#/over-ons': AboutScreen,
  '#/diensten': ServicesScreen,
  '#/projecten': ProjectsScreen,
  '#/contact': ContactScreen,
  '#/partners': PartnersScreen
};
function App() {
  const [route, setRoute] = React.useState(window.location.hash || '#/home');
  React.useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash || '#/home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const Screen = ROUTES[route] || HomeScreen;
  return /*#__PURE__*/React.createElement(Screen, null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/synomic-website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/synomic-website/screens.jsx
try { (() => {
// Synomic website — UI kit screens.
// Single file because screens aren't shared elsewhere; they're each a
// faithful (but presentational) recreation of one page of synomic.nl.
//
// All screens consume components from window.SynomicDesignSystem_d4bf5f.
// The router (App) lives in app.jsx.

const ns = window.SynomicDesignSystem_d4bf5f;
const {
  Hero,
  SectionHeading,
  FeatureCard,
  PartnerPill,
  ProjectCard,
  CTABanner,
  NavBar,
  Footer,
  PageHeader,
  Card,
  Button,
  Tag,
  IconTile,
  Stat,
  TextField,
  Select,
  Checkbox
} = ns;
const ASSET = p => '../../assets/' + p;
const NAV_ITEMS = [{
  href: '#/home',
  label: 'Home'
}, {
  href: '#/over-ons',
  label: 'Over ons'
}, {
  href: '#/diensten',
  label: 'Diensten'
}, {
  href: '#/projecten',
  label: 'Projecten'
}, {
  href: '#/partners',
  label: 'Partners'
}];
const NAV_CTA = {
  href: '#/contact',
  label: 'Contact'
};
const Section = ({
  children,
  alt,
  dark,
  style
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '80px 6vw',
    background: dark ? 'var(--surface-dark)' : alt ? 'var(--color-off-2)' : 'transparent',
    color: dark ? 'var(--text-on-dark)' : undefined,
    ...style
  }
}, children);

// ===== HOME =====
const HomeScreen = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
  tone: "dark",
  active: "#/home",
  logoSrc: ASSET('logo-white.png'),
  items: NAV_ITEMS,
  cta: NAV_CTA
}), /*#__PURE__*/React.createElement(Hero, {
  badge: "Finance \xB7 IT \xB7 AI Automatisering",
  title: "Slimme oplossingen voor",
  cyanWord: "digitale groei",
  intro: "Technologie die werkt voor mensen, niet andersom. Synomic automatiseert, verbindt en optimaliseert \u2014 zodat bedrijven kunnen groeien zonder te verzanden in complexiteit.",
  primary: {
    href: '#/diensten',
    label: 'Bekijk diensten'
  },
  secondary: {
    href: '#/contact',
    label: 'Neem contact op'
  }
}), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
  label: "Wie zijn wij",
  title: /*#__PURE__*/React.createElement(React.Fragment, null, "Verbinden van technologie", /*#__PURE__*/React.createElement("br", null), "en bedrijfsvoering"),
  sub: "Synomic combineert finance, IT en AI-automatisering om bedrijven effici\xEBnter te laten werken. Met een nuchtere Friese aanpak worden complexe vraagstukken vertaald naar praktische oplossingen die direct resultaat opleveren \u2014 zonder overbodige complexiteit.",
  maxSubWidth: 620
}), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'var(--text-muted)',
    marginTop: -24,
    marginBottom: 48,
    maxWidth: 680,
    fontFamily: 'var(--font-body)'
  }
}, "Achter de naam schuilt een heldere visie. ", /*#__PURE__*/React.createElement("strong", null, "Sync"), " staat voor synchronisatie: systemen, processen en mensen die naadloos samenwerken. ", /*#__PURE__*/React.createElement("strong", null, "Nomic"), " komt van economic \u2014 de economische waarde die vrijkomt wanneer een organisatie echt op orde is."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 'var(--gap-cards)'
  }
}, /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83D\uDCCA",
  title: "Finance & Data"
}, "Van finance rapportages tot dashboards: inzicht in de cijfers als fundament voor betere beslissingen."), /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\u2699\uFE0F",
  title: "IT & Automatisering"
}, "Processen stroomlijnen, systemen koppelen en handmatig werk elimineren \u2014 zodat het team zich focust op wat telt."), /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83E\uDD16",
  title: "AI Toepassingen"
}, "Praktische AI-implementaties die direct waarde leveren: van slimme analyses tot geautomatiseerde workflows."))), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '48px 6vw',
    background: 'var(--color-off-1)',
    borderTop: '1px solid var(--border-soft)',
    borderBottom: '1px solid var(--border-soft)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: '.75rem',
    fontWeight: 700,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)'
  }
}, "Technologie\xEBn & tools"), /*#__PURE__*/React.createElement("a", {
  href: "#/partners",
  style: {
    fontSize: '.88rem',
    fontWeight: 700,
    color: 'var(--color-navy)'
  }
}, "Bekijk alle partners \u2192")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(PartnerPill, {
  logo: ASSET('partners/claude.png'),
  name: "Claude AI",
  role: "Kunstmatige intelligentie",
  href: "#/partners"
}), /*#__PURE__*/React.createElement(PartnerPill, {
  logo: ASSET('partners/n8n.svg'),
  name: "n8n",
  role: "Workflow automatisering",
  href: "#/partners"
}), /*#__PURE__*/React.createElement(PartnerPill, {
  logo: ASSET('partners/moneybird.png'),
  name: "Moneybird",
  role: "Finance administratie",
  href: "#/partners"
}))), /*#__PURE__*/React.createElement(Section, {
  style: {
    padding: '0 6vw 80px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 80
  }
}, /*#__PURE__*/React.createElement(CTABanner, {
  eyebrow: "Klaar voor de volgende stap?",
  title: "Samen bouwen aan een digitale toekomst",
  cta: {
    href: '#/contact',
    label: 'Start een gesprek →'
  }
}))), /*#__PURE__*/React.createElement(Footer, {
  logoSrc: ASSET('logo-white.png')
}));

// ===== OVER ONS =====
const AboutScreen = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
  active: "#/over-ons",
  logoSrc: ASSET('logo.png'),
  items: NAV_ITEMS,
  cta: NAV_CTA
}), /*#__PURE__*/React.createElement(PageHeader, {
  title: "Over",
  cyanWord: "Synomic",
  breadcrumb: [{
    href: '#/home',
    label: 'Home'
  }, {
    label: 'Over ons'
  }],
  intro: "Leer meer over de visie, aanpak en drijfveren achter Synomic."
}), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
  label: "Het verhaal",
  title: "Verbinden van werelden",
  sub: null,
  style: {
    marginBottom: 20
  }
}), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'var(--text-muted)',
    marginBottom: 20,
    fontFamily: 'var(--font-body)'
  }
}, "Synomic is opgericht vanuit de overtuiging dat de combinatie van financi\xEBle kennis, IT-expertise en AI-inzicht organisaties echt verder helpt. Niet met complexe theorie\xEBn, maar met praktische, meetbare resultaten."), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'var(--text-muted)',
    marginBottom: 32,
    fontFamily: 'var(--font-body)'
  }
}, "Synomic werkt nauw samen met opdrachtgevers \u2014 van startups tot gevestigde MKB-bedrijven \u2014 om processen slimmer in te richten, datagedreven beslissingen mogelijk te maken en technologie \xE9cht te laten werken voor de organisatie."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(Tag, null, "Finance"), /*#__PURE__*/React.createElement(Tag, null, "IT"), /*#__PURE__*/React.createElement(Tag, null, "AI"), /*#__PURE__*/React.createElement(Tag, null, "Automatisering"), /*#__PURE__*/React.createElement(Tag, null, "Data-analyse"))), /*#__PURE__*/React.createElement(Card, {
  variant: "dark"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: '2.8rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    color: 'var(--color-cyan)',
    marginBottom: 28
  }
}, "Synomic"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24
  }
}, /*#__PURE__*/React.createElement(Stat, {
  n: "ZZP & MKB",
  label: "Doelgroep"
}), /*#__PURE__*/React.createElement(Stat, {
  n: "30",
  accent: "+",
  label: "Projecten"
}), /*#__PURE__*/React.createElement(Stat, {
  n: "Nederland",
  label: "Gevestigd"
}), /*#__PURE__*/React.createElement(Stat, {
  n: "NL \xB7 BE \xB7 PL",
  label: "Actief in"
}))))), /*#__PURE__*/React.createElement(Section, {
  alt: true
}, /*#__PURE__*/React.createElement(SectionHeading, {
  label: "Waar Synomic voor staat",
  title: "Kernwaarden",
  sub: "Elke opdracht wordt uitgevoerd vanuit dezelfde principes.",
  align: "center"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: 'var(--gap-cards)'
  }
}, /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83C\uDFAF",
  title: "Resultaatgericht"
}, "Geen eindeloze analyses, maar concrete uitkomsten die direct waarde toevoegen aan de organisatie."), /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83D\uDD17",
  title: "Verbindend"
}, "Synomic brengt technologie en business samen. Jargon wordt vertaald naar begrijpelijke taal en haalbare stappen."), /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83D\uDCA1",
  title: "Innovatief"
}, "Synomic blijft continu op de hoogte van de nieuwste ontwikkelingen in AI en automatisering om de beste oplossingen te bieden."), /*#__PURE__*/React.createElement(FeatureCard, {
  icon: "\uD83E\uDD1D",
  title: "Betrokken"
}, "Het succes van de opdrachtgever staat centraal. Synomic investeert in een langdurige samenwerking en denkt proactief mee."))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center'
  }
}, /*#__PURE__*/React.createElement(SectionHeading, {
  label: "Bedrijfsgegevens",
  title: "Synomic",
  align: "center",
  sub: null
}), /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--color-off-2)',
    borderRadius: 'var(--radius-2xl)',
    padding: 36,
    marginTop: 32,
    textAlign: 'left'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20
  }
}, [['Bedrijfsnaam', 'Synomic'], ['KVK-nummer', '94705569'], ['Adres', /*#__PURE__*/React.createElement(React.Fragment, null, "Koornbeursweg 73", /*#__PURE__*/React.createElement("br", null), "8442 DJ Heerenveen")], ['Specialisaties', 'Finance, IT, AI']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
  key: i
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: '.78rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '.08em',
    marginBottom: 4,
    fontFamily: 'var(--font-body)'
  }
}, k), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 600,
    fontFamily: 'var(--font-body)'
  }
}, v))))))), /*#__PURE__*/React.createElement(Footer, {
  logoSrc: ASSET('logo-white.png')
}));

// ===== DIENSTEN =====
const DIENSTEN = [{
  n: '01',
  title: 'Finance & Data-analyse',
  icon: '📊',
  intro: 'Finance data is de ruggengraat van elke organisatie. Synomic structureert, visualiseert en vertaalt die data naar bruikbare inzichten voor management en bestuur.',
  items: ['Financiële dashboards & rapportages', 'Budgettering & forecasting', 'Business Intelligence (Power BI / Excel)', 'KPI-analyse & prestatiebeheer']
}, {
  n: '02',
  title: 'IT & Automatisering',
  icon: '⚙️',
  intro: 'Handmatige processen kosten tijd en geld. Synomic analyseert werkprocessen en implementeert slimme automatiseringen die direct resultaat opleveren.',
  items: ['Procesautomatisering (RPA / scripts)', 'Systeemintegraties & API-koppelingen', 'Cloud-migratie & infrastructuur', 'Softwareselectie & implementatiebegeleiding']
}, {
  n: '03',
  title: 'AI Toepassingen',
  icon: '🤖',
  intro: 'Kunstmatige intelligentie biedt enorme kansen, maar vraagt om een pragmatische aanpak. Synomic zet AI zinvol in — geen hype, maar concrete toepassingen die werken.',
  items: ['AI-strategie & implementatieadvies', 'Predictieve modellen & forecasting', 'Geautomatiseerde documentverwerking', 'LLM-integraties & chatbot-oplossingen']
}, {
  n: '04',
  title: 'Procesoptimalisatie',
  icon: '🔄',
  intro: 'Vaak zit verbetering al in de huidige processen, maar is die nog niet zichtbaar. Synomic brengt processen in kaart, identificeert knelpunten en implementeert verbeteringen.',
  items: ['Procesinventarisatie & -analyse (BPMN)', 'Lean / Six Sigma aanpak', 'Change management & adoptie', 'Continue verbetering & monitoring']
}];
const DienstRow = ({
  d,
  reverse
}) => {
  const visual = /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-hero)',
      borderRadius: 'var(--radius-3xl)',
      minHeight: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '5rem',
      color: '#fff'
    }
  }, d.icon);
  const text = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tag, {
    style: {
      marginBottom: 16
    }
  }, "Dienst ", d.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fz-h3-l)',
      fontWeight: 700,
      marginBottom: 16,
      marginTop: 0,
      color: 'var(--text-strong)'
    }
  }, d.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginBottom: 20,
      fontFamily: 'var(--font-body)'
    }
  }, d.intro), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 0,
      margin: 0
    }
  }, d.items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-cyan)',
      fontWeight: 700,
      marginTop: 1
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, it)))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 60,
      alignItems: 'center',
      marginBottom: 80
    }
  }, reverse ? /*#__PURE__*/React.createElement(React.Fragment, null, text, visual) : /*#__PURE__*/React.createElement(React.Fragment, null, visual, text));
};
const ServicesScreen = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
  active: "#/diensten",
  logoSrc: ASSET('logo.png'),
  items: NAV_ITEMS,
  cta: NAV_CTA
}), /*#__PURE__*/React.createElement(PageHeader, {
  title: "Wat ik voor u",
  cyanWord: "doe",
  breadcrumb: [{
    href: '#/home',
    label: 'Home'
  }, {
    label: 'Diensten'
  }],
  intro: "Een overzicht van diensten op het snijvlak van finance, IT en AI-automatisering."
}), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
  label: "Specialisaties",
  title: "Core Competencies",
  sub: "Iedere opdracht is uniek. De aanpak wordt afgestemd op de specifieke uitdaging, organisatie en doelstellingen.",
  align: "center",
  maxSubWidth: 580
}), DIENSTEN.map((d, i) => /*#__PURE__*/React.createElement(DienstRow, {
  key: i,
  d: d,
  reverse: i % 2 === 1
}))), /*#__PURE__*/React.createElement(Section, {
  alt: true
}, /*#__PURE__*/React.createElement(CTABanner, {
  eyebrow: "Samen starten",
  title: "Interesse in samenwerking?",
  cta: {
    href: '#/contact',
    label: 'Stuur een bericht →'
  }
})), /*#__PURE__*/React.createElement(Footer, {
  logoSrc: ASSET('logo-white.png')
}));

// ===== PROJECTEN =====
const PROJECTS = [{
  cat: 'finance',
  tag: 'Finance',
  icon: '📊',
  title: 'Financieel dashboard MKB',
  desc: "Real-time Power BI dashboard gekoppeld aan boekhoudpakket. Management heeft nu altijd up-to-date inzicht in kasstromen, marges en KPI's.",
  stack: ['Power BI', 'Excel', 'API-koppeling']
}, {
  cat: 'it',
  tag: 'IT Automatisering',
  icon: '⚙️',
  title: 'Factuurverwerking geautomatiseerd',
  desc: 'Handmatige factuurverwerking geautomatiseerd met Python en OCR. Verwerkingstijd teruggebracht van 3 uur naar 10 minuten per dag.',
  stack: ['Python', 'OCR', 'RPA']
}, {
  cat: 'ai',
  tag: 'AI',
  icon: '🤖',
  title: 'AI-assistent voor klantenservice',
  desc: 'Geïmplementeerde AI-chatbot die 60% van terugkerende vragen zelfstandig beantwoordt, gekoppeld aan interne kennisbank.',
  stack: ['LLM', 'RAG', 'Integratie']
}, {
  cat: 'finance',
  tag: 'Finance',
  icon: '📈',
  title: 'Forecasting-model retail',
  desc: 'Machine learning model voor omzetvoorspelling met 94% nauwkeurigheid. Helpt bij inkoop- en personeelsplanning.',
  stack: ['Python', 'ML', 'Visualisatie']
}, {
  cat: 'it',
  tag: 'IT Automatisering',
  icon: '🔗',
  title: 'Systeemintegratie ERP & CRM',
  desc: 'Tweerichtingsintegratie tussen ERP en CRM opgezet. Dubbele invoer geëlimineerd, datakwaliteit verbeterd met 40%.',
  stack: ['REST API', 'Middleware', 'ERP/CRM']
}, {
  cat: 'ai',
  tag: 'AI',
  icon: '🔍',
  title: 'Slimme documentanalyse',
  desc: 'AI-gedreven tool voor het automatisch extraheren en samenvatten van contracten en rapporten — tijdsbesparing van 70%.',
  stack: ['NLP', 'Document AI', 'Python']
}];
const FilterBtn = ({
  active,
  onClick,
  children
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  style: {
    padding: '9px 22px',
    borderRadius: 'var(--radius-pill)',
    border: '1.5px solid var(--border-default)',
    background: active ? 'var(--color-navy)' : 'var(--surface-card)',
    color: active ? 'var(--text-on-dark)' : 'var(--text-strong)',
    fontFamily: 'var(--font-body)',
    fontSize: '.88rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderColor: active ? 'var(--color-navy)' : 'var(--border-default)',
    transition: 'background var(--dur-fast), color var(--dur-fast)'
  }
}, children);
const ProjectsScreen = () => {
  const [cat, setCat] = React.useState('all');
  const visible = PROJECTS.filter(p => cat === 'all' || p.cat === cat);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
    active: "#/projecten",
    logoSrc: ASSET('logo.png'),
    items: NAV_ITEMS,
    cta: NAV_CTA
  }), /*#__PURE__*/React.createElement(PageHeader, {
    title: "Projecten &",
    cyanWord: "Cases",
    breadcrumb: [{
      href: '#/home',
      label: 'Home'
    }, {
      label: 'Projecten'
    }],
    intro: "Een selectie van opdrachten en resultaten die laten zien wat Synomic voor de organisatie kan betekenen."
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(FilterBtn, {
    active: cat === 'all',
    onClick: () => setCat('all')
  }, "Alle projecten"), /*#__PURE__*/React.createElement(FilterBtn, {
    active: cat === 'finance',
    onClick: () => setCat('finance')
  }, "Finance"), /*#__PURE__*/React.createElement(FilterBtn, {
    active: cat === 'it',
    onClick: () => setCat('it')
  }, "IT & Automatisering"), /*#__PURE__*/React.createElement(FilterBtn, {
    active: cat === 'ai',
    onClick: () => setCat('ai')
  }, "AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
      gap: 'var(--gap-cards)'
    }
  }, visible.map((p, i) => /*#__PURE__*/React.createElement(ProjectCard, {
    key: i,
    icon: p.icon,
    category: p.tag,
    title: p.title,
    stack: p.stack
  }, p.desc)))), /*#__PURE__*/React.createElement(Section, {
    alt: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Uw project",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Wat kan Synomic", /*#__PURE__*/React.createElement("br", null), "voor organisaties betekenen?"),
    align: "center",
    sub: "Elk project begint met een gesprek. Beschrijf de uitdaging en ontdek wat mogelijk is."
  }), /*#__PURE__*/React.createElement(Button, {
    href: "#/contact"
  }, "Neem contact op \u2192"))), /*#__PURE__*/React.createElement(Footer, {
    logoSrc: ASSET('logo-white.png')
  }));
};

// ===== CONTACT =====
const ContactScreen = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState({});
  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next = {};
    if (!f.get('naam') || f.get('naam').length < 2) next.naam = 'Naam invullen (minimaal 2 tekens).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.get('email') || '')) next.email = 'Geldig e-mailadres invullen.';
    if (!f.get('onderwerp')) next.onderwerp = 'Selecteer een onderwerp.';
    if (!f.get('bericht') || f.get('bericht').length < 20) next.bericht = 'Beschrijf de vraag (minimaal 20 tekens).';
    if (!f.get('privacy')) next.privacy = 'U dient akkoord te gaan met de privacyverklaring.';
    setErr(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
    active: "#/contact",
    logoSrc: ASSET('logo.png'),
    items: NAV_ITEMS,
    cta: null
  }), /*#__PURE__*/React.createElement(PageHeader, {
    title: "Neem",
    cyanWord: "contact op",
    breadcrumb: [{
      href: '#/home',
      label: 'Home'
    }, {
      label: 'Contact'
    }],
    intro: "Heeft u een vraag of wilt u een vrijblijvend gesprek? Berichten worden binnen 1 werkdag beantwoord."
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 60,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Bereikbaarheid",
    title: "Neem contact op",
    sub: "Iedere samenwerking begint met een goed gesprek. Beschrijf de uitdaging en Synomic denkt graag mee \u2014 geheel vrijblijvend."
  }), [{
    icon: '📍',
    title: 'Adres',
    body: 'Koornbeursweg 73, 8442 DJ Heerenveen'
  }, {
    icon: '💬',
    title: 'Contact',
    body: 'Via het contactformulier'
  }, {
    icon: '⏰',
    title: 'Reactietijd',
    body: 'Binnen 1 werkdag'
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    size: "sm"
  }, c.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '.9rem',
      marginBottom: 2,
      color: 'var(--text-strong)'
    }
  }, c.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)'
    }
  }, c.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: 24,
      background: 'var(--color-off-2)',
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '.9rem',
      marginBottom: 14,
      color: 'var(--text-strong)'
    }
  }, "Veilig en vertrouwd"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 0,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontSize: '.88rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-cyan)',
      fontSize: '1rem'
    }
  }, "\uD83D\uDD12"), " Uw gegevens worden nooit gedeeld met derden"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontSize: '.88rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-cyan)',
      fontSize: '1rem'
    }
  }, "\u2709\uFE0F"), " Versleuteld contactformulier")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    variant: "form",
    interactive: false
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: 20,
      background: 'var(--cyan-10)',
      border: '1.5px solid var(--color-cyan)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.5rem'
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--text-strong)'
    }
  }, "Bericht verzonden!"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)'
    }
  }, "Bedankt voor uw bericht. Ik neem zo snel mogelijk contact met u op, uiterlijk binnen 1 werkdag."))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: 6,
      fontSize: 'var(--fz-h3)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Stuur een bericht"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '.9rem',
      marginBottom: 28,
      fontFamily: 'var(--font-body)'
    }
  }, "Alle velden met ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-cyan)'
    }
  }, "*"), " zijn verplicht."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    id: "naam",
    name: "naam",
    label: "Naam",
    required: true,
    placeholder: "Jan de Vries",
    error: err.naam
  }), /*#__PURE__*/React.createElement(TextField, {
    id: "bedrijf",
    name: "bedrijf",
    label: "Bedrijf",
    optional: true,
    placeholder: "Bedrijfsnaam (optioneel)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    id: "email",
    name: "email",
    label: "E-mailadres",
    required: true,
    type: "email",
    placeholder: "jan@bedrijf.nl",
    autoComplete: "email",
    error: err.email
  }), /*#__PURE__*/React.createElement(TextField, {
    id: "telefoon",
    name: "telefoon",
    label: "Telefoonnummer",
    optional: true,
    type: "tel",
    placeholder: "+31 6 12345678"
  })), /*#__PURE__*/React.createElement(Select, {
    id: "onderwerp",
    name: "onderwerp",
    label: "Onderwerp",
    required: true,
    options: [{
      value: 'finance',
      label: 'Finance & Data-analyse'
    }, {
      value: 'it',
      label: 'IT & Automatisering'
    }, {
      value: 'ai',
      label: 'AI Toepassingen'
    }, {
      value: 'proces',
      label: 'Procesoptimalisatie'
    }, {
      value: 'anders',
      label: 'Overig'
    }],
    placeholder: "Selecteer een onderwerp...",
    error: err.onderwerp
  }), /*#__PURE__*/React.createElement(TextField, {
    id: "bericht",
    name: "bericht",
    label: "Bericht",
    required: true,
    multiline: true,
    placeholder: "Beschrijf kort de vraag of uitdaging...",
    error: err.bericht
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "privacy",
    name: "privacy",
    required: true,
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Ik ga akkoord met het verwerken van mijn gegevens voor het beantwoorden van mijn vraag. Synomic deelt uw gegevens nooit met derden."),
    error: err.privacy
  })), /*#__PURE__*/React.createElement(Button, {
    as: "button",
    type: "submit",
    style: {
      width: '100%',
      background: 'var(--color-navy)'
    }
  }, "Verstuur bericht"), /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '.78rem',
      color: 'var(--text-muted)',
      marginTop: 14,
      fontFamily: 'var(--font-body)'
    }
  }, "\uD83D\uDD12 Dit formulier is beveiligd. Uw gegevens worden vertrouwelijk behandeld.")))))), /*#__PURE__*/React.createElement(Footer, {
    logoSrc: ASSET('logo-white.png')
  }));
};

// ===== PARTNERS =====
const PartnersScreen = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NavBar, {
  active: "#/partners",
  logoSrc: ASSET('logo.png'),
  items: NAV_ITEMS,
  cta: NAV_CTA
}), /*#__PURE__*/React.createElement(PageHeader, {
  title: "Partners &",
  cyanWord: "tools",
  breadcrumb: [{
    href: '#/home',
    label: 'Home'
  }, {
    label: 'Partners'
  }],
  intro: "De gereedschapskist achter Synomic \u2014 partners en integraties die in opdrachten worden ingezet."
}), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
    gap: 'var(--gap-cards)'
  }
}, [{
  logo: ASSET('partners/claude.png'),
  name: 'Claude AI',
  role: 'Kunstmatige intelligentie',
  body: 'Synomic werkt met Claude voor doc-extractie, prompt-engineering en het bouwen van betrouwbare LLM-pipelines.'
}, {
  logo: ASSET('partners/n8n.svg'),
  name: 'n8n',
  role: 'Workflow automatisering',
  body: 'Synomic gebruikt n8n voor self-hosted automatiseringen die meerdere systemen aan elkaar knopen zonder vendor lock-in.'
}, {
  logo: ASSET('partners/moneybird.png'),
  name: 'Moneybird',
  role: 'Finance administratie',
  body: 'Synomic koppelt Moneybird aan dashboards en triggers in n8n zodat finance-data direct bruikbaar wordt.'
}].map((p, i) => /*#__PURE__*/React.createElement(Card, {
  key: i,
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 64,
    height: 64,
    borderRadius: 'var(--radius-md)',
    background: '#fff',
    border: '1px solid var(--border-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}, /*#__PURE__*/React.createElement("img", {
  src: p.logo,
  alt: p.name,
  style: {
    width: 42,
    height: 42,
    objectFit: 'contain'
  }
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--fz-h4)',
    fontWeight: 700,
    marginBottom: 4,
    color: 'var(--text-strong)'
  }
}, p.name), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: '.78rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '.08em',
    fontWeight: 600,
    fontFamily: 'var(--font-body)'
  }
}, p.role)), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'var(--text-muted)',
    fontSize: '.95rem',
    fontFamily: 'var(--font-body)'
  }
}, p.body))))), /*#__PURE__*/React.createElement(Footer, {
  logoSrc: ASSET('logo-white.png')
}));
window.SynomicSiteScreens = {
  HomeScreen,
  AboutScreen,
  ServicesScreen,
  ProjectsScreen,
  ContactScreen,
  PartnersScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/synomic-website/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.CTABanner = __ds_scope.CTABanner;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.PartnerPill = __ds_scope.PartnerPill;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ScrollNetwork = __ds_scope.ScrollNetwork;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.PageHeader = __ds_scope.PageHeader;

})();
