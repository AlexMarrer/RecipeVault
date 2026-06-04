# Acceptance Criteria – Phase 7

- Backend (:9090) + Keycloak (:8080) + `ng serve` (:4200) laufen.
- Aufruf `/recipes` ohne Login → Keycloak-Login erscheint.
- Nach Login zeigt die Navbar den Username, die Liste zeigt echte Rezept-Titel.
- Network-Tab: `GET /api/recipes` → `200`, mit Bearer-Header, ohne CORS-Fehler in der Konsole.
