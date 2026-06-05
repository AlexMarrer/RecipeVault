# Phase 18 – Rezept-Editor: Inline-Anlage von Zutaten & Kategorien

**Ziel:** Während des Rezept-Erstellens/-Bearbeitens lassen sich **neue Zutaten** und **neue
Kategorien** direkt im selben Fenster anlegen, ohne auf die Admin-Seiten zu wechseln. Die neu
angelegte Stammdaten erscheinen sofort in den Selects und werden automatisch ausgewählt.

## Hintergrund / Warum kein Backend-Change

`IngredientService.create()` und `CategoryService.create()` existieren bereits und sprechen die
vorhandenen POST-Endpunkte an. Es ist reine Frontend-Arbeit: kleine Anlage-Dialoge + lokale
Aktualisierung der Signale `ingredients()` / `categories()`.

## Anforderungen

- **Quick-Add-Dialoge** via `MatDialog` (analog zum bestehenden `ConfirmDialog`-Muster):
  - `IngredientQuickAddDialog`: Felder **Name** (Pflicht) + **Standard-Einheit** (optional).
  - `CategoryQuickAddDialog`: Feld **Name** (Pflicht).
  - Beide validieren minimal (Name `required`, Längen wie in den Request-DTOs: Zutat-Name ≤ 80,
    Einheit ≤ 20, Kategorie-Name passend).
- **Auslöser** im Rezept-Formular:
  - Button „+ Neue Zutat" neben/oberhalb der Zutaten-Selects.
  - Button „+ Neue Kategorie" beim Kategorien-Select.
- **Ablauf nach Speichern im Dialog:**
  - Service-`create()` aufrufen → bei Erfolg Ergebnis in die jeweilige Liste (`signal`) einfügen
    (sortiert/angehängt) → den neuen Eintrag **automatisch auswählen**
    (Zutat: in der auslösenden Zeile; Kategorie: zur `categoryIds`-Auswahl hinzufügen).
  - Fehler (z. B. doppelter Name → 409) im Dialog anzeigen, Dialog bleibt offen.
- Rollen-Gating beachten: Anlegen ist eine chef/admin-Aktion (Formular ist ohnehin nur dort
  erreichbar) — keine zusätzliche Sichtbarkeitslogik nötig, aber Backend-403 sauber abfangen.
- Styling **BEM**, `rem`, Material-Form-Fields; neue Komponenten mit `OnPush`, `inject()`,
  Signals, neue Control-Flow-Syntax.

## Nebeneffekt (positiv)

Die zwei Quick-Add-Dialoge zählen als zusätzliche Komponenten Richtung Bewertungs-Mindestanzahl.
