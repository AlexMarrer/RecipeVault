# Phase 20 – Responsiveness (Mobile / Handy)

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 14b (Styling)

## Ausgangslage

Das Frontend hat aktuell **keine einzige `@media`-Query** – das Layout ist nur für Desktop
gebaut. `<meta name="viewport">` ist vorhanden (`index.html`), und viele Flex-Container nutzen
schon `flex-wrap` / `grid auto-fill`. Das größte Problem ist die **Navbar**, die auf dem Handy
nicht zusammenklappt. Daneben gibt es einige Stellen, die auf schmalen Breiten unschön umbrechen.

**Grundsatz (siehe `frontend/CLAUDE.md`):** Nur BEM-Klassen, keine Tag-Selektoren; Einheiten in
`rem` (px nur für Hairlines/Border/Shadow); Material liefert Funktion, eigene Styles bleiben BEM
auf `--mat-sys-*`-Variablen. Keine Magic Numbers → Breakpoints zentral als Konstante/Mixin.

## Ziel

Jede Seite ist auf einem Handy (~360 px) **ohne horizontales Scrollen** sauber benutzbar:
Navbar klappt zu einem Menü zusammen, Inhalte stapeln statt zu quetschen, Touch-Ziele groß genug.

## Umfang

### 1. Breakpoint-Fundament (zentral, keine Magic Numbers)

- Neues Sass-Partial `frontend/src/app/styles/_breakpoints.scss` mit Tokens + Mixin:
  - `$bp-mobile: 37.5rem` (≈ 600 px, Material „mobile"), optional `$bp-tablet: 56.25rem` (≈ 900 px).
  - `@mixin mobile { @media (max-width: $bp-mobile) { @content; } }` (analog `tablet`).
- Jede Komponente, die einen Breakpoint braucht, bindet das Partial per `@use` ein
  (Angular kompiliert Component-SCSS isoliert → Mixin aus `styles.scss` ist dort nicht sichtbar).

### 2. Navbar (Kern-Thema) – `components/navbar`

- Desktop bleibt wie bisher (Links horizontal in der `mat-toolbar`).
- Unter `$bp-mobile`: Links + Login/Logout in ein **Menü** auslagern.
  - Empfohlen: `mat-icon-button` mit `menu`-Icon als Trigger → `mat-menu` (Dropdown) mit denselben
    Routerlinks (`*appHasRole`-Sichtbarkeit bleibt erhalten). Alternative: `mat-sidenav`-Drawer.
  - Marke (`navbar__brand`) bleibt links sichtbar, Hamburger rechts.
- Aktiv-Zustand (`routerLinkActive`) und Rollen-Sichtbarkeit auch im Menü beibehalten.

### 3. Globale Shell – `app.scss` / `styles.scss`

- `.app__content`-Padding auf Handy reduzieren (z. B. `1.5rem` → `1rem`), `max-width` bleibt.
- Sicherstellen, dass nichts breiter als der Viewport wird (kein horizontales Scrollen).

### 4. Komponenten einzeln durchgehen (Feinschliff)

- **recipe-list** (`pages/recipe-list`): Grid-`minmax(16rem,…)` → auf Handy einspaltig sicherstellen
  (ggf. `minmax(14rem, 1fr)` oder `1fr` unter Breakpoint); Header (`space-between`) bei Bedarf stapeln.
- **recipe-detail** (`pages/recipe-detail`): `__header` (Titel + Aktionen `space-between`) unter
  Breakpoint zu `flex-direction: column` stapeln; `__image` `max-height` auf Handy verkleinern.
- **recipe-form** (`pages/recipe-form`): Zeilen wrappen bereits; `__actions` (`justify-end`) und
  `__block-head` (`space-between`) auf schmaler Breite prüfen/stapeln; Zutaten-/Step-Reihen testen.
- **recipe-filter** (`components/recipe-filter`): Felder auf Handy volle Breite (`flex: 1 1 100%`).
- **my-recipes / category-admin / ingredient-admin**: Header- und Listen-Reihen (`flex-wrap` vorhanden)
  auf Handy gegenchecken; Aktions-Buttons nicht abschneiden.
- **recipe-card**: bereits robust – nur gegenprüfen.
- **Dialoge** (`confirm-dialog`, `rating-form`, `category-quick-add`, `ingredient-quick-add`):
  `max-width` vorhanden; auf Handy `width: 100%` / Rand prüfen, Buttons nicht überlaufen.

### 5. Touch & Usability

- Interaktive Elemente (Buttons, Menü-Einträge) mind. ~2.75rem (44px) Touch-Höhe – Material liefert
  das meist; eigene Klick-Flächen (z. B. `recipe-card`) gegenchecken.

## Vorgehen / Test

- Test in DevTools Device-Toolbar bei **360 px, 414 px, 768 px** Breite.
- Kein horizontales Scrollen, Navbar-Menü funktioniert, alle Seiten bedienbar.
- `npm run build` + `npm run lint` grün; `anyComponentStyle`-Budget (<8 kB) eingehalten.

## Betroffene Dateien

- neu: `frontend/src/app/styles/_breakpoints.scss`
- `frontend/src/app/components/navbar/navbar.{html,scss,ts}` (Menü-Logik)
- `frontend/src/app/app.scss`, ggf. `frontend/src/styles.scss`
- SCSS in `pages/**` und `components/**` nach obiger Liste
