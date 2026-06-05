# Phase 19 – Rezept-Editor: Default-Einheit automatisch übernehmen

**Ziel:** Wählt man in einer Zutaten-Zeile eine Zutat aus, die eine **Standard-Einheit**
(`defaultUnit`) hinterlegt hat, wird das Einheit-Feld automatisch damit vorbefüllt. Sonst müsste
man die Einheit jedes Mal erneut tippen — redundant.

## Hintergrund / Warum kein Backend-Change

`defaultUnit` ist bereits durchgängig vorhanden: Backend-Entity `Ingredient.defaultUnit`
(Spalte `default_unit`), `IngredientRequestDTO` / `IngredientResponseDTO`, sowie das Frontend-
Modell `Ingredient.defaultUnit`. Es fehlt nur die Verdrahtung im Formular.

## Anforderungen

- Bei Auswahl einer Zutat (`ingredientId` `valueChanges` bzw. `selectionChange`) die zugehörige
  `Ingredient` aus dem `ingredients()`-Signal nachschlagen.
- Hat sie eine nicht-leere `defaultUnit` **und** ist das Einheit-Feld der Zeile noch leer, wird die
  Einheit gesetzt.
- **Bereits vom Nutzer getippte Einheit nicht überschreiben** (nur befüllen, wenn leer) — verhindert
  ungewolltes Überschreiben beim Ändern der Zutat.
- Greift auch sinnvoll mit Phase 18: legt man inline eine Zutat **mit** Standard-Einheit an und sie
  wird ausgewählt, ist die Einheit sofort gesetzt.
- Keine Magic Strings; Logik kapseln (z. B. private Methode `applyDefaultUnit(lineIndex)`).

## Nicht-Ziele

- Keine Pflicht, die Default-Einheit zu verwenden — Nutzer kann sie weiterhin frei überschreiben.
