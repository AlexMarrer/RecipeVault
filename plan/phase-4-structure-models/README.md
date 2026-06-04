# Phase 4 – Ordnerstruktur + Modelle

**Status:** ⬜ offen · **Typ:** Code (Frontend) · **baut auf:** Phase 2

## Ziel & Anforderungen

Die Verzeichnisstruktur folgt der Projektdefinition (Kap. 5.2): klare Trennung von Pages,
Basiskomponenten, Services, Guards, Directives und Models. Die TypeScript-Interfaces spiegeln
exakt die Backend-DTOs, damit die Services typsicher arbeiten – inklusive der verschachtelten
Struktur (Recipe → Sections → Steps, Recipe → IngredientLines, Recipe → Categories) und der
separaten Request-Typen fürs Anlegen/Bearbeiten.

## Modell-Quellen (Backend-DTOs)

- `RecipeResponseDTO` / `RecipeRequestDTO` (inkl. innere Records Section/Step/IngredientLine)
- `CategoryResponseDTO`, `IngredientResponseDTO`, `RatingResponseDTO`
- `Difficulty` = `EASY | MEDIUM | HARD`

## Betroffene Dateien

- `frontend/src/app/{pages,components,service,guards,directives,models}/`
- `models/`: `difficulty.ts`, `category.ts`, `ingredient.ts`, `rating.ts`, `recipe.ts`
