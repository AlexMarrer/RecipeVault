# Acceptance Criteria – Phase 5

- Jeder Service nutzt `HttpClient` und die `apiBaseUrl` aus `environment`.
- Methoden-Signaturen sind über die Modelle (Phase 4) typisiert (kein `any`).
- Endpoint-Pfade/Query-Params stimmen exakt mit dem Backend überein
  (`/me`, `?recipeId=`, Filter `title/categoryId/difficulty`).
- `ng build` kompiliert alle Services fehlerfrei.
