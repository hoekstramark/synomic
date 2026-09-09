/**
 * Nieuws en cijfers voor de balk bovenaan de site.
 *
 * Draait op het domein van Synomic zelf. De browser van de bezoeker praat
 * dus alleen met synomic.nl: de CSP blijft `connect-src 'self'` en er gaat
 * geen IP-adres naar CBS of de ECB.
 *
 * Bronnen zijn bewust officieel en vrij herbruikbaar:
 *   CBS  — persberichten, CC BY 4.0
 *   ECB  — Data Portal, herbruikbaar met bronvermelding
 *
 * Het antwoord wordt een uur op het CDN vastgehouden, dus er gaat hooguit
 * één verzoek per uur naar buiten, ongeacht het aantal bezoekers.
 */

const CBS_FEED = 'https://www.cbs.nl/nl-nl/rss-feeds/alle-nieuwsberichten';
const ECB_MRR =
  'https://data-api.ecb.europa.eu/service/data/FM/D.U2.EUR.4F.KR.MRR_FR.LEV' +
  '?lastNObservations=1&format=jsondata';

const TIMEOUT_MS = 6000;

/* Alleen onderwerpen waar een ondernemer iets aan heeft. CBS publiceert ook
   over bevolkingsgroei en zorguitgaven; dat hoort hier niet. */
const RELEVANT =
  /\b(inflatie|prijz|prijsindex|omzet|afzetprijz|failliss|bedrijv|onderneme|mkb|detailhandel|horeca|industrie|bouw|export|import|handel|investeer|invester|krediet|lonen|loon|cao|belasting|economie|economisch|bbp|producent|consumptie|vacature|arbeidsmarkt)/i;

/** Haalt op met een harde tijdslimiet; een trage bron mag de balk niet ophouden. */
async function fetchWithTimeout(url, init = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'SynomicBot/1.0 (+https://synomic.nl)',
        ...(init.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decodeEntities(m[1]) : '';
}

/* CBS publiceert vaak een snelle raming en kort erna het definitieve cijfer.
   Die twee koppen lijken sterk op elkaar; één ervan is genoeg. */
function lijktOp(a, b) {
  const woorden = (t) =>
    new Set(
      t
        .toLowerCase()
        .replace(/[^a-z0-9\u00c0-\u017f ]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
  const A = woorden(a);
  const B = woorden(b);
  if (!A.size || !B.size) return false;
  let gedeeld = 0;
  for (const w of A) if (B.has(w)) gedeeld++;
  return gedeeld / Math.min(A.size, B.size) >= 0.6;
}

async function cbsHeadlines(limit = 6) {
  const res = await fetchWithTimeout(CBS_FEED);
  if (!res.ok) throw new Error(`CBS gaf ${res.status}`);
  const xml = await res.text();

  const items = [];
  for (const block of xml.split(/<item[\s>]/).slice(1)) {
    const title = tag(block, 'title');
    if (!title || !RELEVANT.test(title)) continue;
    if (items.some((i) => lijktOp(i.tekst, title))) continue;
    items.push({
      bron: 'CBS',
      tekst: title,
      url: tag(block, 'link') || 'https://www.cbs.nl/',
      datum: tag(block, 'pubDate'),
    });
    if (items.length >= limit) break;
  }
  return items;
}

async function ecbRate() {
  const res = await fetchWithTimeout(ECB_MRR, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`ECB gaf ${res.status}`);
  const data = await res.json();

  const series = Object.values(data?.dataSets?.[0]?.series ?? {})[0];
  const value = Object.values(series?.observations ?? {})[0]?.[0];
  if (typeof value !== 'number') throw new Error('ECB gaf geen waarde terug');

  return {
    bron: 'ECB',
    tekst: `Herfinancieringsrente ${value.toFixed(2).replace('.', ',')}%`,
    url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html',
  };
}

export default async () => {
  // Eén trage of stukke bron mag de andere niet meenemen.
  const [nieuws, rente] = await Promise.allSettled([cbsHeadlines(), ecbRate()]);

  const items = [];
  if (rente.status === 'fulfilled') items.push(rente.value);
  if (nieuws.status === 'fulfilled') items.push(...nieuws.value);

  const fouten = [nieuws, rente]
    .filter((r) => r.status === 'rejected')
    .map((r) => String(r.reason?.message ?? r.reason));

  const body = {
    bijgewerkt: new Date().toISOString(),
    items,
    ...(fouten.length ? { fouten } : {}),
  };

  // Leverde geen enkele bron iets op, dan geen leeg antwoord een uur lang
  // vastzetten — de pagina valt dan terug op de fiscale kalender.
  const cache = items.length
    ? 'public, max-age=300'
    : 'public, max-age=60, must-revalidate';
  // `durable` zet het antwoord in de gedeelde cache van Netlify in plaats van
  // alleen op het edge-knooppunt dat toevallig antwoordde. Zonder dat woord
  // draait de function per knooppunt opnieuw en ziet CBS alsnog verkeer.
  const cdn = items.length
    ? 'public, durable, max-age=3600, stale-while-revalidate=86400'
    : 'public, durable, max-age=60';

  return new Response(JSON.stringify(body), {
    status: items.length ? 200 : 503,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache,
      'Netlify-CDN-Cache-Control': cdn,
    },
  });
};

export const config = { path: '/api/ticker' };
