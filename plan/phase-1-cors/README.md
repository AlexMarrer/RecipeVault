# Phase 1 – Backend: CORS

**Status:** ⬜ offen · **Typ:** Code (Backend) · **Blocker:** ja

## Ziel & Anforderungen

Ohne CORS verwirft der Browser jeden Request vom Angular-Dev-Server (`:4200`) zum Backend
(`:9090`), weil es sich um eine Cross-Origin-Anfrage handelt. Spring Security muss daher CORS
in der Security-Filter-Chain aktivieren (`.cors(...)`) und eine `CorsConfigurationSource`
bereitstellen.

Da die Authentifizierung über Bearer-Token im `Authorization`-Header läuft (keine Cookies),
genügt `allowCredentials=false`. Wichtig ist, dass der `Authorization`-Header erlaubt ist und
der Preflight (`OPTIONS`) durchgelassen wird. Die erlaubte Origin wird als Property
(`app.cors.allowed-origins`) gepflegt, damit der Port nicht hart codiert ist.

## Betroffene Dateien

- `backend/src/main/java/ch/uscata/alex/recipevault/security/SecurityConfig.java`
- `backend/src/main/resources/application.yaml`
