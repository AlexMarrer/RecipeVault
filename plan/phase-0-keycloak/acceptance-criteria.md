# Acceptance Criteria – Phase 0

- Login über `recipevault-frontend` liefert ein gültiges JWT (im Browser prüfbar).
- Das Access-Token enthält `resource_access.recipevault.roles` mit der/den Rolle(n) des Users.
- Ein authentifizierter `GET :9090/api/recipes` mit diesem Token liefert `200` (nicht `403`).
