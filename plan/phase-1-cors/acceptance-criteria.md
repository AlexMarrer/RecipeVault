# Acceptance Criteria – Phase 1

- Preflight `OPTIONS /api/recipes` mit `Origin: http://localhost:4200` antwortet `200`
  und enthält `Access-Control-Allow-Origin: http://localhost:4200`.
- `Access-Control-Allow-Methods` enthält GET, POST, PUT, DELETE.
- `Access-Control-Allow-Headers` erlaubt `Authorization`.
- Backend startet weiterhin fehlerfrei (`mvnw` Build grün), Swagger-Whitelist unverändert.
