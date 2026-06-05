# Phase 14b – Styling & Design-System

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 9–14

## Ziel & Anforderungen

Bis hierher bekommt jede Komponente nur ihr funktionales, „inline" gebautes BEM-SCSS – es gibt
**noch kein durchgängiges Design**. Diese Phase macht aus den Einzelteilen einen abgestimmten
Look („wie aus einem Guss") und holt das Styling der früh gebauten Phasen nach.

**Grundsatz (siehe `frontend/CLAUDE.md`):** Material liefert **Funktion/Optik der Komponenten**
(`mat-toolbar`, `mat-card`, `matButton`, `mat-form-field`, `mat-icon`, `MatDialog`, Spinner),
**eigene Styles bleiben BEM** – aber auf den **Material-System-Variablen** statt hartkodierter
Farben (`--mat-sys-primary`, `--mat-sys-surface`, `--mat-sys-on-surface`, …). Theme ist
**cyan/orange** (`mat.theme()` in `styles.scss`).

## Umfang

- **Globale Basis** in `styles.scss`: Layout-Container (max-Breite, Seitenabstände), Spacing-/
  Radius-Skala als BEM-taugliche Basis; bestehende `mat.theme()`-Konfiguration beibehalten.
- **App-Shell**: Navbar → `mat-toolbar`, zentrierter Content-Bereich in `app.html`/`app.scss`.
- **Komponenten auf Material/Theme umstellen** (Material für Funktion, BEM für Eigenes):
  Karten → `mat-card`, Buttons → `matButton`, Filter → `mat-form-field` + `mat-select`,
  Lösch-Dialog → `MatDialog` oder bestehende `ConfirmDialog` an Theme angleichen.
- **Zustände**: Lade-Spinner (`mat-progress-spinner`), saubere Leer-/Fehlerzustände
  (optional `MatSnackBar` für Fehler).
- **Responsive**: Grid (Karten), Toolbar, Formulare auf kleinen Breiten.

## Nachhol (catch-up) – bereits gebaut, Styling angleichen

- **Phase 9**: StarRating, RecipeCard, ConfirmDialog – Farben/Abstände auf Theme-Variablen.
- **Phase 10**: RecipeList (Grid), RecipeFilter, RecipeDetail – hartkodierte Farben
  (`#2e7d32`, `#b00020`, `rgba(0,0,0,…)`) durch `--mat-sys-*` ersetzen, einheitliche Abstände.

## Betroffene Dateien

- `frontend/src/styles.scss`, `frontend/src/app/app.html`, `frontend/src/app/app.scss`
- alle `components/**` und `pages/**` (SCSS + ggf. Template-Umbau auf Material)
