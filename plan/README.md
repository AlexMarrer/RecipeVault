# RecipeVault – Frontend-Projektarbeit (Plan)

Plan für das Angular-Frontend zur RecipeVault-Projektarbeit (Angular 22 ↔ Spring Boot, Keycloak).
Jede Phase liegt in einem eigenen Ordner mit drei Dateien:

- `README.md` – Ziel & Anforderungen (ausführlicher)
- `checklist.md` – kurze To-dos zum Abhaken
- `acceptance-criteria.md` – woran man erkennt, dass die Phase fertig ist

**Ablauf:** Du sagst „mach Phase X" → ich arbeite die Checkliste ab und prüfe gegen die
Acceptance Criteria → Status hier aktualisieren.

Der Plan ist zweistufig: **Phasen 0–8** = lauffähiges, abgesichertes Grundgerüst (Smoke-Test).
**Phasen 9–16** = Ausbau zur vollständigen Anwendung bis zur Abgabe (deckt die Bewertungs-
Mindestanforderungen ab, siehe Matrix unten).

## Status – Teil A: Grund-Setup

| Phase | Thema | Status |
|------|-------|--------|
| [0](phase-0-keycloak/) | Keycloak-Voraussetzungen (manuell) | ⬜ offen (manuell durch Student) |
| [1](phase-1-cors/) | Backend: CORS | ✅ erledigt |
| [2](phase-2-remove-ssr/) | Frontend: SSR entfernen | ✅ erledigt |
| [3](phase-3-auth-httpclient/) | Frontend: Auth + HttpClient | ✅ erledigt |
| [4](phase-4-structure-models/) | Ordnerstruktur + Modelle | ✅ erledigt |
| [5](phase-5-services/) | Services (1 pro Controller) | ✅ erledigt |
| [6](phase-6-guards-directive/) | Guards + Directive | ✅ erledigt |
| [7](phase-7-e2e-smoke/) | End-to-End-Nachweis | 🟡 Code fertig, manueller Login-Test offen (braucht Phase 0) |
| [8](phase-8-verification/) | Verifikation (Build) | ✅ erledigt (Backend BUILD SUCCESS, Frontend SPA ohne SSR) |

## Status – Teil B: Anwendung & Abgabe

| Phase | Thema | Status |
|------|-------|--------|
| [9](phase-9-shared-components/) | Basis-Komponenten (StarRating, RecipeCard, ConfirmDialog) | ✅ erledigt (Build + Lint grün) |
| [10](phase-10-recipe-read/) | Rezepte lesen: Liste + Detailseite | ✅ erledigt (Build + Lint grün) |
| [11](phase-11-recipe-crud/) | Rezept-CRUD (anlegen/bearbeiten/löschen) + Meine Rezepte | ✅ erledigt (Build + Lint grün) |
| [12](phase-12-stammdaten-crud/) | Kategorien & Zutaten verwalten (CRUD) | ✅ erledigt (Build + Lint grün) |
| [13](phase-13-ratings/) | Bewertungen im Frontend (Rating-CRUD) | ✅ erledigt (Build + Lint grün) |
| [14](phase-14-navigation-roles/) | Navigation, Rollen-Sichtbarkeit, Routing-Feinschliff | ✅ erledigt (Build + Lint grün) |
| [14b](phase-14b-styling/) | **Styling & Design-System** (Material-Look + BEM-Tokens, Nachhol 9/10) | 🟡 Nachhol 9/10 erledigt, globaler Schliff offen |
| [15](phase-15-unit-tests/) | Unit Tests (Vitest: Service + Komponente) | ⬜ offen |
| [16](phase-16-doku-abgabe/) | Dokumentation & GitHub-Abgabe | ⬜ offen |

## Status – Teil C: Zusatz-Features Rezept-Editor

Neu beauftragt (2026-06-05). **Alle drei sind Frontend-only** — `defaultUnit` ist bereits
end-to-end vorhanden, Stammdaten-Create-Endpunkte existieren, und `sortOrder`/`stepNumber` werden
ohnehin aus dem Array-Index abgeleitet.

| Phase | Thema | Status |
|------|-------|--------|
| [17](phase-17-editor-dragdrop/) | Drag & Drop für Sektionen, Schritte, Zutaten (CDK) | ✅ erledigt (Build + Lint grün) |
| [18](phase-18-editor-inline-stammdaten/) | Zutaten & Kategorien inline im Rezept-Formular anlegen | ✅ erledigt (Build + Lint grün) |
| [19](phase-19-editor-default-einheit/) | Standard-Einheit der Zutat automatisch übernehmen | ✅ erledigt (Build + Lint grün) |

## Status – Teil D: Responsiveness

Neu beauftragt (2026-06-08). **Frontend-only.** Aktuell existiert **keine einzige `@media`-Query**;
das Layout ist nur für Desktop gebaut. Kernthema ist die Navbar (klappt auf dem Handy nicht zu).

| Phase | Thema | Status |
|------|-------|--------|
| [20](phase-20-responsiveness/) | Responsiveness (Mobile/Handy): Navbar-Menü, Breakpoints, Komponenten-Feinschliff | ✅ erledigt (Build + Lint grün, 375/1280 px geprüft) |

**Empfohlene Reihenfolge ab hier:** 14b (Styling) → **17 → 18 → 19** (Features) → **15** (Tests,
decken die neuen Editor-Features mit ab) → **16** (Doku/Abgabe). Die Feature-Phasen sind bewusst
höher nummeriert, laufen aber **vor** Tests/Doku, damit diese den finalen Stand abbilden.

**Status-Legende:** ⬜ offen · 🟡 in Arbeit · ✅ erledigt

## Abdeckung der Bewertungs-Mindestanforderungen

| Anforderung | Abgedeckt durch |
|-------------|-----------------|
| Angular-Frontend | Phase 1–8 (Grundgerüst) |
| ≥ 8 Komponenten | Navbar, RecipeList, Forbidden (vorhanden) + StarRating/RecipeCard/ConfirmDialog (9), RecipeDetail/RecipeFilter (10), RecipeForm/MyRecipes (11), CategoryAdmin/IngredientAdmin (12), RatingList/RatingForm (13) → **14** |
| Service-Anbindung an REST-Controller | Phase 5 (vorhanden), genutzt ab Phase 10 |
| CRUD im Frontend | Rezepte (11), Kategorien/Zutaten (12), Bewertungen (13) |
| OAuth2 + Keycloak | Phase 0 (manuell) + Phase 3 |
| ≥ 2 Rollen | `user` / `chef` / `admin` (3) |
| Rollenbasierte Freigabe (Pages/Teile) | `roleGuard` (6) + `*appHasRole` in 10/12/13/14 |
| Routing | Phase 7 + erweitert in 10/11/12/14 |
| Unit Tests (Vitest) | Phase 15 |
| Ablage GitHub | Phase 16 |
| Sauberes, konsistentes Design (fließt in „saubere Arbeitsweise") | Inline in 9–14 + gebündelt in Phase 14b |

## Eckdaten

- Backend `:9090` · Keycloak `:8080` Realm `recipevault` · Frontend `:4200`
- Recipe-IDs = `Long` · `authorId`/`userId` = `UUID` (Keycloak `sub`)
- Rollen klein geschrieben: `user` / `chef` / `admin`
- Rollen-Quelle im Token: `resource_access.recipevault.roles` (Client `recipevault`)

## Abhängigkeiten

Phase 1 & 2 sind die Blocker und voneinander unabhängig. 3→4→5→6→7 bauen aufeinander auf.
Phase 0 (Keycloak) muss vor Phase 7 (Login-Test) erledigt sein.
