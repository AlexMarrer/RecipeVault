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
| [9](phase-9-shared-components/) | Basis-Komponenten (StarRating, RecipeCard, ConfirmDialog) | ⬜ offen |
| [10](phase-10-recipe-read/) | Rezepte lesen: Liste + Detailseite | ⬜ offen |
| [11](phase-11-recipe-crud/) | Rezept-CRUD (anlegen/bearbeiten/löschen) + Meine Rezepte | ⬜ offen |
| [12](phase-12-stammdaten-crud/) | Kategorien & Zutaten verwalten (CRUD) | ⬜ offen |
| [13](phase-13-ratings/) | Bewertungen im Frontend (Rating-CRUD) | ⬜ offen |
| [14](phase-14-navigation-roles/) | Navigation, Rollen-Sichtbarkeit, Routing-Feinschliff | ⬜ offen |
| [15](phase-15-unit-tests/) | Unit Tests (Vitest: Service + Komponente) | ⬜ offen |
| [16](phase-16-doku-abgabe/) | Dokumentation & GitHub-Abgabe | ⬜ offen |

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

## Eckdaten

- Backend `:9090` · Keycloak `:8080` Realm `recipevault` · Frontend `:4200`
- Recipe-IDs = `Long` · `authorId`/`userId` = `UUID` (Keycloak `sub`)
- Rollen klein geschrieben: `user` / `chef` / `admin`
- Rollen-Quelle im Token: `resource_access.recipevault.roles` (Client `recipevault`)

## Abhängigkeiten

Phase 1 & 2 sind die Blocker und voneinander unabhängig. 3→4→5→6→7 bauen aufeinander auf.
Phase 0 (Keycloak) muss vor Phase 7 (Login-Test) erledigt sein.
