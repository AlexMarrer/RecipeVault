# RecipeVault – Grund-Setup (Plan)

Plan für das lauffähige, abgesicherte Grundgerüst (Angular 22 ↔ Spring Boot, Keycloak).
Jede Phase liegt in einem eigenen Ordner mit drei Dateien:

- `README.md` – Ziel & Anforderungen (ausführlicher)
- `checklist.md` – kurze To-dos zum Abhaken
- `acceptance-criteria.md` – woran man erkennt, dass die Phase fertig ist

**Ablauf:** Du sagst „mach Phase X" → ich arbeite die Checkliste ab und prüfe gegen die
Acceptance Criteria → Status hier aktualisieren.

## Status

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

**Status-Legende:** ⬜ offen · 🟡 in Arbeit · ✅ erledigt

## Eckdaten

- Backend `:9090` · Keycloak `:8080` Realm `recipevault` · Frontend `:4200`
- Recipe-IDs = `Long` · `authorId`/`userId` = `UUID` (Keycloak `sub`)
- Rollen klein geschrieben: `user` / `chef` / `admin`
- Rollen-Quelle im Token: `resource_access.recipevault.roles` (Client `recipevault`)

## Abhängigkeiten

Phase 1 & 2 sind die Blocker und voneinander unabhängig. 3→4→5→6→7 bauen aufeinander auf.
Phase 0 (Keycloak) muss vor Phase 7 (Login-Test) erledigt sein.
