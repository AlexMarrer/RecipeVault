# Phase 0 – Keycloak-Voraussetzungen (manuell)

**Status:** ⬜ offen · **Typ:** manuell (kein Code, macht der Student im Keycloak-Admin)

## Ziel & Anforderungen

Das Frontend meldet sich als eigener public Client `recipevault-frontend` an. Das Backend
liest die Rollen jedoch aus `resource_access.recipevault.roles` (Client `recipevault`, siehe
`AuthenticationRoleConverter` + `application.yaml`). Damit die Rollen im Token landen, müssen
die Test-User die **Client-Rollen des `recipevault`-Clients** besitzen – sonst kommt zwar ein
gültiges Token an, aber das Backend antwortet mit `403`.

Der Frontend-Client muss als public Client mit Authorization-Code-Flow + PKCE konfiguriert
sein und die richtigen Redirect-/Origin-Einträge für `http://localhost:4200` haben.

## Hinweise

- Public Client = kein Client-Secret (Standard für SPA).
- Web Origins muss gesetzt sein, sonst blockt Keycloak die Token-Requests per CORS.
