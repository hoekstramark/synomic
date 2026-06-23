# Synomic Website – Installatie-instructies

## Bestanden in dit pakket

```
synomic-website/
├── index.html          → Homepagina
├── over-ons.html       → Over ons pagina
├── diensten.html       → Diensten pagina
├── projecten.html      → Projecten pagina
├── contact.html        → Contactpagina (beveiligd formulier)
├── style.css           → Globale opmaak
├── logo.png            → Uw logo
└── README.md           → Dit bestand
```

---

## Uploaden naar TransIP

1. **Log in op TransIP** → ga naar "Hosting" → kies uw domein
2. Ga naar **Bestandsbeheer** (of gebruik FTP)
3. Upload **alle bestanden** naar de map `public_html` (of `htdocs`)
4. Zorg dat `index.html` in de root staat
5. Klaar! Bezoek uw domein om de website te zien.

### Via FTP (bijv. FileZilla)
- Host: uw domeinnaam of FTP-host van TransIP
- Gebruikersnaam & wachtwoord: zie TransIP controlepaneel → FTP
- Upload alle bestanden naar `/public_html/`

---

## Contactformulier activeren

Het formulier bevat beveiligingen, maar heeft een e-mail service nodig om berichten echt te versturen.

### Optie 1: Formspree (gratis, aanbevolen)
1. Ga naar [formspree.io](https://formspree.io) en maak een gratis account
2. Maak een nieuw formulier aan → kopieer uw formulier-ID (bijv. `xpzgkdwl`)
3. Open `contact.html` en zoek de commentaarregel:
   ```
   // const response = await fetch('https://formspree.io/f/JOUW_FORMSPREE_ID', {
   ```
4. Vervang `JOUW_FORMSPREE_ID` door uw ID
5. Verwijder de `//` aan het begin van de regels
6. Verwijder of commentarieer de `simulatedSuccess`-regels

### Optie 2: EmailJS
- Gratis tot 200 e-mails/maand
- Zie documentatie op emailjs.com

### Optie 3: Eigen backend
- PHP mailer op uw hosting
- Koppel aan het fetch-endpoint in contact.html

---

## Beveiliging contactformulier

Het formulier bevat de volgende beveiligingen:
- **Honeypot veld** – verborgen veld dat bots invullen, mensen niet
- **Tijdcontrole** – formulier ingevuld in minder dan 3 seconden = waarschijnlijk bot
- **Rate limiting** – maximaal 3 verzendingen per 15 minuten per sessie
- **Input validatie** – alle velden worden gecontroleerd voor verzending
- **HTML-escaping** – voorkomt XSS-aanvallen
- **Privacy checkbox** – verplichte akkoordverklaring

---

## Teksten aanpassen

Alle teksten staan direct in de HTML-bestanden. U kunt ze eenvoudig aanpassen:
- **Uw naam/bio**: `over-ons.html`
- **Projecten**: `projecten.html` – pas bestaande projecten aan of voeg toe
- **Contactgegevens**: `contact.html` (e-mailadres, locatie)
- **Footer**: elke pagina bevat een footer – zoek naar `info@synomic.nl`

---

## Vragen?

Heeft u vragen over de website? Neem contact op via het contactformulier op de website.
