# Checkliste – Phase 20 (Responsiveness)

- [x] `_breakpoints.scss` angelegt: `$bp-handset` (+`$bp-tablet`) + `@mixin handset`/`tablet`
      *(via `angular.json` → `stylePreprocessorOptions.includePaths` als `@use 'breakpoints'` nutzbar)*
- [x] **Navbar**: unter `$bp-tablet` (900px) Hamburger + `mat-menu` (Links + Login/Logout),
      Rollen-Sichtbarkeit (`*appHasRole`) und Aktiv-Zustand erhalten
      *(Tablet-Schwelle statt Handset, weil eingeloggt 4 Links + Username + Logout sonst überlaufen)*
- [x] `app.scss`: `.app__content`-Padding auf Handy reduziert, kein horizontales Scrollen
- [x] **recipe-list**: Grid auf Handy einspaltig, Header bricht sauber um
- [x] **recipe-detail**: `__header` stapelt (Titel/Aktionen), Bildhöhe auf Handy reduziert
- [x] **recipe-form**: `__actions` stapeln (column-reverse), Reihen wrappen bereits
- [x] **recipe-filter**: Felder + Button auf Handy volle Breite
- [x] **my-recipes / category-admin / ingredient-admin**: Header stapelt / Felder volle Breite
- [x] **Dialoge** (confirm, rating, quick-adds): bereits responsiv (`width:100%`+`max-width`) – geprüft, ok
- [x] Touch-Ziele ≥ ~2.75rem: Material-Buttons/Menü-Einträge liefern das
- [x] Getestet bei 375 px (mobil: Navbar→Menü, Filter voll, kein H-Scroll) und 1280 px (Desktop: Links sichtbar)
- [x] `npm run build` + `npm run lint` grün, Style-Budget (<8 kB) eingehalten
