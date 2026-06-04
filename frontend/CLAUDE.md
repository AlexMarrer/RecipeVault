# RecipeVault Frontend – Coding-Konventionen

Angular 22 (Standalone) + SCSS. Diese Regeln gelten für **allen** neuen Frontend-Code.

## CSS / SCSS

- **Nur BEM-Klassen, keine Tag-Selektoren.** Niemals `div`, `p`, `button`, `ul` etc. direkt
  stylen. Jedes Element bekommt eine Klasse nach dem Schema `block__element--modifier`.
  - ✅ `.recipe-card`, `.recipe-card__title`, `.recipe-card__title--highlighted`
  - ❌ `.recipe-card h2`, `article > p`, `button.primary`
  - Ausnahme: globale Resets/Basistypografie in `styles.scss` (z. B. `*`, `body`, `html`).
- **Einheiten: immer `rem`.** Abstände, Schrift, Größen, Radius → `rem`.
  - `px` **nur** dort, wo es physisch fix sein muss: `box-shadow`, `border`-Breiten,
    `1px`-Hairlines, evtl. `outline`. Sonst nichts in `px`.
  - Für `0` reicht `0` (ohne Einheit).
- Keine ID-Selektoren (`#id`) zum Stylen.
- Verschachtelung flach halten; BEM macht tiefes Nesting überflüssig.

## TypeScript / Allgemein

- **`if`/`else`/`for`/`while` immer mit `{}`** – auch bei Einzeilern. Keine klammerlosen Bodies.
  - ✅ `if (loading) { return; }`
  - ❌ `if (loading) return;`
- **Keine Magic Strings / Magic Numbers.** Wiederkehrende Literale (Rollen, Routen,
  Storage-Keys, API-Pfade, Status) als `const` / `enum` definieren und referenzieren.
  - z. B. Rollen `'user' | 'chef' | 'admin'` als zentrale Konstante/Enum, nicht inline.
- **So wenige Kommentare wie möglich.** Code durch sprechende Namen selbsterklärend halten.
  Ein Kommentar nur, wenn das *Warum* nicht aus dem Code hervorgeht.

## Angular (Stil)

- **Signals** für State (`signal`, `computed`); `input()`/`output()` statt `@Input`/`@Output`.
- **`inject()`** statt Constructor-Injection.
- **Neue Control-Flow-Syntax** `@if` / `@for` / `@switch` statt `*ngIf` / `*ngFor`.
- **`ChangeDetectionStrategy.OnPush`** für alle Komponenten.
- Standalone-Komponenten (kein `NgModule`); Selektor-Präfix `app-`.

## Eckdaten (Kontext)

- Backend `:9090` · Keycloak `:8080` Realm `recipevault` · Frontend `:4200`
- Rollen klein: `user` / `chef` / `admin`
