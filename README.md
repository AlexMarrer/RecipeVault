# RecipeVault

Backend für eine digitale Rezeptsammlung — Modul 295 Kompetenznachweis.

Spring-Boot-REST-API für Rezepte, Zutaten, Kategorien und Bewertungen, abgesichert über Keycloak (OAuth2 / JWT) und persistiert in PostgreSQL.

- **Autor:** Alex Uscata (INA-23A)
- **Modul:** 295  Backend für Applikationen realisieren

---

## Voraussetzungen

| Komponente | Version | Hinweis                      |
|---|---|------------------------------|
| JDK | **25** | (Pflicht) siehe `pom.xml`    |
| Maven | 3.9+ | Wrapper liegt bei (`./mvnw`) |
| PostgreSQL | 14+ | Lokal, Port 5432             |
| Keycloak | 24+ | Lokal, Port 8080             |

---

## Konfiguration

Alle Einstellungen liegen in [`src/main/resources/application.yaml`](src/main/resources/application.yaml).

### PostgreSQL

| Einstellung | Wert |
|---|---|
| Host / Port | `localhost:5432` |
| Datenbank | `recipe-vault` |
| User | `postgres` (überschreibbar via `DB_USERNAME`) |
| Passwort | via `DB_PASSWORD` (Default vorhanden für lokale Entwicklung) |
| Schema-Generierung | `spring.jpa.hibernate.ddl-auto: update` (automatisch beim Start) |

**Datenbank vor dem ersten Start anlegen:**
```sql
CREATE DATABASE "recipe-vault";
```

### Keycloak

| Einstellung | Wert |
|---|---|
| Realm | `recipevault` |
| Client | `recipevault` |
| Issuer-URL | `http://localhost:8080/realms/recipevault` |
| Token-Format | JWT (Bearer) |
| Rollen-Claim | `resource_access.recipevault.roles` |

**Realm einrichten:**
1. In Keycloak Admin Console neuen Realm `recipevault` anlegen.
2. Client `recipevault` erstellen (Client-Type: OpenID Connect, Access-Type: confidential oder public je nach Bedarf).
3. Im Client unter *Roles* die folgenden Rollen anlegen:
   - `ROLE_user`: darf Rezepte lesen, eigene Bewertungen abgeben
   - `ROLE_chef`: alles was `user` darf, plus eigene Rezepte/Zutaten verwalten
   - `ROLE_admin`: voller Zugriff (inkl. Löschen von Kategorien/Zutaten, fremde Rezepte moderieren)
4. Mindestens einen User pro Rolle anlegen und die Rolle dem User zuweisen.

### Server

| Einstellung | Wert |
|---|---|
| Port | **9090** (vom Demoprojekt vorgegeben abweichend von Spring-Default 8080) |
| Swagger UI | `http://localhost:9090/swagger-ui/index.html` |
| OpenAPI-Spec | `http://localhost:9090/v3/api-docs` |

---

## Starten

```bash
# Build inkl. Tests
./mvnw clean verify

# Anwendung starten (lokal)
./mvnw spring-boot:run

# Optional: DB-Credentials über Umgebungsvariablen überschreiben
DB_USERNAME=postgres DB_PASSWORD=secret ./mvnw spring-boot:run
```

Nach dem Start:
1. JWT von Keycloak holen (Postman / cURL gegen `http://localhost:8080/realms/recipevault/protocol/openid-connect/token`).
2. In Swagger UI auf *Authorize* klicken, Token einfügen.
3. Endpoints unter `/api/...` aufrufen.

---

## API-Übersicht

| Controller | Basis-Pfad | Rollen |
|---|---|---|
| `RecipeController` | `/api/recipes` | Lesen: alle Schreiben: `chef`/`admin` (Owner-Check) |
| `IngredientController` | `/api/ingredients` | Lesen: alle Schreiben: `chef`/`admin` Löschen: `admin` |
| `CategoryController` | `/api/categories` | Lesen: alle Schreiben: `chef`/`admin` Löschen: `admin` |
| `RatingController` | `/api/ratings` (`/recipe/{recipeId}`, `/me`, `/{id}`) | Alle authentifizierten User · Owner-Check für Update/Delete |

Detailbeschreibung siehe Swagger UI nach dem Start.

---

## Testen

```bash
./mvnw test
```

Enthaltene Tests:
- `CategoryRepositoryTest` (`@DataJpaTest` + H2): 8 Tests, deckt alle CRUD-Operationen + Custom-Finder ab.
- `CategoryControllerTest` (`@SpringBootTest` + `MockMvc`): 13 Tests, prüft CRUD-Endpoints, Validierung, rollenbasierte Zugriffskontrolle (USER/CHEF/ADMIN), Fehlerstati 401/403/404/409.
- `RecipevaultApplicationTests`: Smoke-Test, prüft, dass der Spring-Context lädt.

Test-Profil: `application-test.yaml` (H2 in-memory, isolierte Issuer-URL).

---

## Projektstruktur

```
src/main/java/ch/uscata/alex/recipevault/
├── RecipevaultApplication.java
├── recipe/        # Recipe, RecipeSection, RecipeStep, RecipeIngredient + Controller/Service/Repo/Mapper/DTOs
├── category/      # Category + ...
├── ingredient/    # Ingredient + ...
├── rating/        # Rating + ...
├── security/      # SecurityConfig, AuthenticationRoleConverter, SwaggerConfig, Roles
└── common/        # NotFoundException, ConflictException
```

Architektur: Controller → Service → Repository → Entity, mit dedizierten DTOs (Java Records) und MapStruct-Mappern. `@PreAuthorize` auf jeder Controller-Methode.

---

Projekt im Rahmen des Modul-295-Kompetenznachweises.
