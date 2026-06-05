# Acceptance Criteria – Phase 15

- `npm test` läuft fehlerfrei durch (Vitest), keine fehlschlagenden Specs.
- `RecipeService`-Test deckt **alle** öffentlichen Methoden ab und prüft die HTTP-Aufrufe
  (Pfad, Methode, Query-Params, Body) mit `HttpTestingController`.
- Komponenten-Test deckt **alle** Methoden der gewählten Komponente ab; der Service ist
  gemockt (keine echten HTTP-Aufrufe).
- Kein toter Starter-Test mehr in der Suite.
