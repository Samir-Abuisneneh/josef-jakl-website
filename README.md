# Josef Jakl — web

Statická stránka, žádný build krok potřeba. Otevřete `index.html` v prohlížeči, nebo jej nahrajte na hosting (Netlify, GitHub Pages, apod.).

## Co doplnit

Vše se edituje v **`script.js`** nahoře v souboru:

- **`TRACKS`** — 15 skladeb. Pro každou doplňte `youtubeId` (část YouTube odkazu za `v=`, např. `dQw4w9WgXcQ`). Dokud je prázdné, zobrazí se "Video zatím není nahráno".
- **`CONTACT`** — telefon, e-mail, odkaz na Facebook a YouTube kanál.
- **`PHOTO_COUNT`** — zatím jen prázdné rámečky; skutečné fotky lze přidat úpravou `buildGallery()` v `script.js` (nahradit `photo-slot` divy za `<img>`).

Text životopisu je přímo v **`index.html`** v sekci `#zivotopis` (hledejte `[Sem doplňte...]`).

## Spuštění lokálně

```
npx serve .
```

nebo prostě dvojklik na `index.html`.
