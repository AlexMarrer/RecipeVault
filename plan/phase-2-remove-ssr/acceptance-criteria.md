# Acceptance Criteria – Phase 2

- `npm run build` erzeugt nur ein Browser-Bundle, kein `server/`-Output.
- Keine SSR-Referenzen mehr in `package.json` und `angular.json` (Suche nach „ssr"/„server" leer).
- `ng serve` startet die App fehlerfrei auf `:4200`.
- Keine verwaisten Imports (`provideClientHydration`, `platform-server`) im Code.
