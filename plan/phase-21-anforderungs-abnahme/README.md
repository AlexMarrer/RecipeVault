# Phase 21 – Anforderungs-Abnahme (Requirements-Check)

**Status:** ⬜ offen · **Typ:** Verifikation/Abnahme · **baut auf:** Phase 1–20

## Ziel & Anforderungen

Bevor die Doku geschrieben wird, systematisch nachweisen, dass **jede** Bewertungs-
Mindestanforderung der Projektdefinition tatsächlich im Code erfüllt ist. Ergebnis ist eine
Nachweis-Matrix (Anforderung → konkrete Datei/Stelle als Beleg), die später 1:1 in die
Dokumentation übernommen werden kann. Es wird hier **kein Feature gebaut**, nur geprüft und
ggf. eine kleine Lücke geschlossen.

Prüfpunkte (aus dem Kompetenznachweis):

- **Angular-Frontend** vorhanden, baut (`ng build` grün).
- **≥ 8 Komponenten** – aktuell 9 Komponenten + 7 Pages = 16. Liste mit Pfaden festhalten.
- **Service-Anbindung** an alle REST-Controller über Frontend-Services (`src/app/service`).
- **CRUD im Frontend** für mind. eine Entität end-to-end (Rezepte: anlegen/lesen/ändern/löschen).
- **OAuth2 + Keycloak** Login funktioniert, Token wird an Backend gesendet (Interceptor).
- **≥ 2 Rollen** (`user` / `chef` / `admin`) – Rollenquelle im Token belegen.
- **Rollenbasierte Freigabe**: ganze Pages über `roleGuard`, Teile über `*appHasRole`.
- **Routing** in `app.routes.ts` inkl. Guards + benötigter Rollen.
- **Unit-Tests (Vitest)** grün (`npm test`).
- **GitHub-Ablage** vorhanden (Repo, `.git`).

## Betroffene Dateien

- `plan/phase-21-anforderungs-abnahme/` (Nachweis-Matrix als Ergebnis)
- nur lesend: `frontend/src/app/**`, `frontend/src/app/app.routes.ts`
