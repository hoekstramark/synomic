# synomic.nl

Statische website. Geen build-stap, geen dependencies, geen `node_modules`:
wat in deze repository staat is letterlijk wat de bezoeker krijgt.

Gehost op Netlify, gekoppeld aan deze repository. Een push naar `main` is
binnen een minuut live.

## Bestanden

Alleen `site/` wordt gepubliceerd. Alles daarbuiten — deze readme, de
Netlify-configuratie en de broncode van de function — staat in de repo maar
niet online.

```
netlify.toml                                    Publicatiemap, headers, CSP en cachebeleid
netlify/functions/ticker.mjs                    Nieuws en rente voor de bovenbalk (/api/ticker)

site/
  index.html                                    Landingspagina
  diensten.html                                 Overzicht van de drie diensten
  diensten-financieel-inzicht.html              ┐
  diensten-processen-automatiseren.html         ├ dienstdetailpagina's
  diensten-ai-toepassingen.html                 ┘
  systemen.html                                 Software waar Synomic mee werkt
  kennisbank.html                               Artikeloverzicht
  kennisbank-*.html                             Artikelen
  over-synomic.html                             Over Synomic
  afspraak.html                                 Afspraakformulier (Formspree)
  privacy.html                                  Privacyverklaring
  404.html                                      Foutpagina (root-relatieve paden)
  _redirects                                    301's voor oude URL's
  sitemap.xml  robots.txt                       Vindbaarheid
  .well-known/security.txt                      Contact bij een gevonden kwetsbaarheid
  assets/css/synomic.css                        Het volledige designsysteem
  assets/js/synomic.js                          Alle eigen scripts
  assets/js/vendor/                             GSAP, ScrollTrigger, Lenis, SplitType
  assets/fonts/  assets/img/                    Lettertypen en afbeeldingen
```

`security.txt` verloopt op 14 september 2027. Zet de `Expires`-datum dan een
jaar verder; de wekelijkse beveiligingsscan waarschuwt een maand vooraf.

## Geen externe verzoeken

De site haalt niets bij derden op. Lettertypen en libraries staan op de eigen
server, er is geen analytics en er worden geen cookies geplaatst. Het enige
externe verkeer ontstaat wanneer een bezoeker zelf het afspraakformulier
verstuurt.

Dat is geen toevalligheid maar een uitgangspunt: het houdt de
privacyverklaring kort, maakt een cookiemelding overbodig en laat een strenge
Content-Security-Policy toe. Wie een script, lettertype of widget van een
externe partij toevoegt, haalt alle drie die eigenschappen onderuit. Host het
liever mee in `site/assets/`.

## Het designsysteem aanpassen

Alles begint bij de tokens boven in `site/assets/css/synomic.css`:

| Wat | Waar |
| --- | --- |
| Kleuren | `:root` — `--ink-*` (vlakken), `--paper*` (tekst), `--cyan*` (accent) |
| Typografie | `--sans`, `--mono`, en de `--fs-*` schaal met `clamp()` |
| Ritme | `--gutter`, `--maxw`, `--sec-y` |
| Beweging | `--ease-out`, `--ease-io`, `--dur-s/m/l` |

De maten schalen mee met het scherm via `clamp()`, dus er zijn geen aparte
mobiele waarden nodig. Breekpunten staan alleen waar de indeling echt
verandert.

Twee dingen om vast te houden:

- **Regellengte.** `ch` rekent met de breedte van het cijfer `0`, en dat is in
  Geist fors breder dan een gemiddelde letter. `52ch` levert ongeveer 74
  tekens per regel op, niet 52.
- **`hidden` werkt alleen door de regel bovenin.** De browser zet `hidden` op
  `display: none`, maar elke eigen `display`-regel wint daarvan. Daarom staat
  er `[hidden] { display: none !important; }` in de reset.

## Beweging

`site/assets/js/synomic.js` bevat losse functies die elk hun eigen element opzoeken
en niets doen als dat er niet is. Een pagina activeert dus alleen wat hij
gebruikt.

- **Lenis** verzorgt het scrollen met traagheid
- **GSAP + ScrollTrigger** doen de reveals, de sticky secties en de rails
- **SplitType** knipt koppen in regels voor de maskerende reveal
- Twee canvas-animaties: het ledgerraster in de hero en het node-netwerk in
  de paginakoppen en CTA's

Alles staat achter `prefers-reduced-motion`, en de reveals worden pas
verborgen nadat JavaScript heeft bevestigd dat het kan animeren — valt een
script uit, dan is de pagina gewoon volledig zichtbaar in plaats van blanco.

## Het formulier

`site/afspraak.html` post naar Formspree. Het endpoint staat in het
`action`-attribuut van het formulier; dat is de enige plek waar het voorkomt.

Zonder JavaScript post het formulier native naar Formspree en krijgt de
bezoeker de bedankpagina van Formspree. Met JavaScript gaat het over `fetch`,
blijft de bezoeker op de pagina en verschijnt het bevestigingspaneel.

Instellingen die in het Formspree-dashboard horen, niet in de code:

- **Allowed domains** op `synomic.nl`, zodat het endpoint niet elders bruikbaar is
- Het afleveradres van de inzendingen
- Een eventuele automatische ontvangstbevestiging

## Een artikel toevoegen

Kopieer een bestaande kennisbankpagina en vervang de inhoud. Let op vier
dingen:

1. `<title>`, `description` en `canonical` in de `<head>`
2. De inhoudsopgave in `.toc` moet verwijzen naar de `id`'s van de secties
3. Voeg de pagina toe aan `kennisbank.html` en aan `sitemap.xml`
4. Zet de leestijd op de gemeten lengte — reken ongeveer 200 woorden per
   minuut voor zakelijk Nederlands

## Oude URL's

`_redirects` vangt de pagina's op die bij eerdere versies van de site
bestonden. Hernoem je een pagina, voeg dan een regel toe in plaats van de
oude naam te laten verdwijnen.
