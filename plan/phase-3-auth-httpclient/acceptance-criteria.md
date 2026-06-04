# Acceptance Criteria – Phase 3

- App kompiliert mit den neuen Providern (`ng build` grün).
- Keine hart codierten URLs im Code – alles über `environment`.
- Ein Request an `apiBaseUrl` trägt nach Login automatisch den `Authorization: Bearer`-Header
  (im Network-Tab prüfbar).
- Requests an Fremd-URLs (nicht `allowedUrls`) bekommen **kein** Token angehängt.
