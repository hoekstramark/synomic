# Synomic.nl  ·  nieuwe site

Alles in deze map hoort in de root van de repository `hoekstramark/synomic`.

## Wat er in zit

| Pad | Pagina |
| --- | --- |
| `index.html` | Home |
| `diensten/` | Dienstenoverzicht |
| `diensten/financieel-inzicht/` | Financieel inzicht en rapportage |
| `diensten/processen-automatiseren/` | Processen automatiseren |
| `diensten/ai-toepassingen/` | AI-toepassingen |
| `werkwijze/` | Werkwijze |
| `kennisbank/` | Kennisbank met twee artikelen |
| `over-synomic/` | Over Synomic |
| `projecten/` | Projecten |
| `software/` | Software en koppelingen (voorheen partners) |
| `contact/` | Contact met formulier |
| `privacy/` | Privacyverklaring |

Daarnaast: `style.css`, `app.js`, `assets/`, `sitemap.xml`, `robots.txt`.

## Redirects

De oude bestanden (`diensten.html` en de rest) staan er nog als vangnet met een
meta refresh en een canonical. Zet daarnaast een echte 301 op de server:
gebruik `.htaccess` bij Apache of `_redirects` bij Netlify en Cloudflare Pages.
Draait de site op GitHub Pages, dan doen de meta-refreshbestanden het werk.

## Nog aanleveren

1. Telefoonnummer en WhatsApp-nummer. Op `contact/index.html` staan die twee
   kanalen nu als niet-klikbaar blok met de tekst "volgt binnenkort". Zodra u de
   nummers aanlevert worden het links (`tel:` en `wa.me`).
2. Een agendalink, als u bezoekers zelf wilt laten inplannen.
3. Een portretfoto voor `over-synomic/` en het auteursblok in de kennisbank.

## Na livegang

1. Dien `https://synomic.nl/sitemap.xml` in bij Google Search Console en Bing
   Webmaster Tools.
2. Maak een Google Bedrijfsprofiel aan met exact hetzelfde adres, dezelfde
   bedrijfsnaam en hetzelfde telefoonnummer als op de site.
3. Controleer in Search Console of de oude URL's netjes doorverwijzen.
