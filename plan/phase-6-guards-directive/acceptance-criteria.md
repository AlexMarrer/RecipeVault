# Acceptance Criteria – Phase 6

- Aufruf einer geschützten Route ohne Login → Login-Flow statt Anzeige.
- Eingeloggter User ohne passende Rolle → Redirect auf `/403`.
- `*appHasRole`-Block ist nur für Inhaber der Rolle im DOM, sonst nicht gerendert.
- `ng build` kompiliert Guards + Directive fehlerfrei.
