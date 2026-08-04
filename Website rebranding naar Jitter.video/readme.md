# Synomic Website

Statische website voor synomic.nl. Geen build-stap: de bestanden in deze map zijn wat de bezoeker krijgt.

## Bestanden

```
index.html            Homepage
over-ons.html         Over ons
diensten.html         Diensten (ankers: #finance, #automatisering, #ai)
projecten.html        Projecten en cases, met filter
partners.html         Partners en platforms
contact.html          Contactformulier
privacy.html          Privacyverklaring
style.css             Alle opmaak
app.js                Alle scripts (menu, reveals, filter, cookiemelding, formulier)
logo.png              Logo voor lichte achtergrond
logo-white.png        Logo voor donkere achtergrond
partner-*.png/.svg    Logo's van de partners
sitemap.xml           Sitemap
robots.txt            Robots
```

## Publiceren via GitHub Pages

Alle bestanden staan in de root van de repository. Zet in de repo-instellingen Pages op branch `main`, map `/ (root)`. Na een push is de site binnen een minuut bijgewerkt.

## Contactformulier

Het formulier verstuurt naar Formspree endpoint `xbdwaekq` (zie `app.js`, constante `ENDPOINT`). Wilt u een ander adres of een andere dienst, pas dan alleen die constante aan.

Beveiliging van het formulier:

- **Honeypot** — verborgen veld `website`; ingevuld betekent bot, het bericht wordt niet verstuurd
- **Tijdcontrole** — verzending binnen 3 seconden na laden wordt geweigerd
- **Rate limiting** — maximaal 3 verzendingen per 15 minuten per browsersessie
- **Validatie** — naam, geldig e-mailadres, onderwerp, bericht van minimaal 20 tekens
- **Verplichte privacy-akkoordverklaring**

## Beveiliging van de site

Elke pagina bevat een Content-Security-Policy als meta-tag (GitHub Pages kan geen echte HTTP-headers meesturen):

- scripts alleen uit deze map — externe of geïnjecteerde scripts worden geblokkeerd
- afbeeldingen alleen uit deze map
- verbindingen alleen naar formspree.io
- `frame-ancestors 'none'` — de site kan niet in een iframe van derden worden getoond
- `object-src 'none'` en `base-uri 'self'`

Aanvullend: `X-Content-Type-Options: nosniff` en een strikt referrer-beleid.

Verhuist u naar hosting waar u wél headers kunt zetten (bijv. TransIP), zet de CSP dan als HTTP-header en voeg `Strict-Transport-Security` toe.

## Cookies

De site plaatst geen tracking cookies. De cookiemelding onthoudt de keuze in `localStorage` onder `synomic-cookiekeuze`; het formulier gebruikt `sessionStorage` voor de rate limiting. Er gaat geen enkel gegeven naar een derde partij behalve de formulierinzending naar Formspree en het laden van de lettertypen bij Google Fonts.

## Teksten aanpassen

Alle teksten staan direct in de HTML-bestanden. Contactgegevens en KVK-nummer staan in de footer van elke pagina en in `over-ons.html`.
