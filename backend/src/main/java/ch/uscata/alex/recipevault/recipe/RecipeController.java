package ch.uscata.alex.recipevault.recipe;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ch.uscata.alex.recipevault.recipe.dto.RecipeRequestDTO;
import ch.uscata.alex.recipevault.recipe.dto.RecipeResponseDTO;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
@Tag(name = "Recipe", description = "Verwaltung von Rezepten inkl. Sektionen, Zutaten und Kategorien")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Rezepte auflisten",
            description = "Liefert alle Rezepte. Optional gefiltert nach Titel, Kategorie oder Schwierigkeitsgrad.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Liste der Rezepte"),
            @ApiResponse(responseCode = "401", description = "Nicht authentifiziert"),
            @ApiResponse(responseCode = "403", description = "Keine Berechtigung")
    })
    public List<RecipeResponseDTO> list(
            @Parameter(description = "Filter nach Titel (case-insensitive, contains)")
            @RequestParam(required = false) String title,
            @Parameter(description = "Filter nach Kategorie-ID")
            @RequestParam(required = false) Long categoryId,
            @Parameter(description = "Filter nach Schwierigkeitsgrad")
            @RequestParam(required = false) Difficulty difficulty
    ) {
        if (title != null && !title.isBlank()) {
            return recipeService.search(title);
        }
        if (categoryId != null) {
            return recipeService.findByCategory(categoryId);
        }
        if (difficulty != null) {
            return recipeService.findByDifficulty(difficulty);
        }
        return recipeService.findAll();
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Eigene Rezepte des angemeldeten Benutzers")
    public List<RecipeResponseDTO> myRecipes(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return recipeService.findByAuthor(userId);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Rezept per ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Rezept gefunden"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden")
    })
    public RecipeResponseDTO get(
            @Parameter(description = "Rezept-ID") @PathVariable Long id) {
        return recipeService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('chef', 'admin')")
    @Operation(summary = "Neues Rezept anlegen", description = "Nur fuer Rollen chef oder admin.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Rezept angelegt"),
            @ApiResponse(responseCode = "400", description = "Ungueltige Eingabe"),
            @ApiResponse(responseCode = "404", description = "Referenzierte Zutat oder Kategorie nicht gefunden")
    })
    public RecipeResponseDTO create(
            @Valid @RequestBody RecipeRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        UUID authorId = UUID.fromString(jwt.getSubject());
        return recipeService.create(dto, authorId);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin') or (hasRole('chef') and @recipeService.isOwner(#id, authentication))")
    @Operation(summary = "Rezept aktualisieren",
            description = "Admin darf alles. Chef nur eigene Rezepte.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Rezept aktualisiert"),
            @ApiResponse(responseCode = "403", description = "Keine Berechtigung (Chef ist nicht Eigentuemer)"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden")
    })
    public RecipeResponseDTO update(
            @Parameter(description = "Rezept-ID") @PathVariable Long id,
            @Valid @RequestBody RecipeRequestDTO dto
    ) {
        return recipeService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('admin') or (hasRole('chef') and @recipeService.isOwner(#id, authentication))")
    @Operation(summary = "Rezept loeschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Geloescht"),
            @ApiResponse(responseCode = "403", description = "Keine Berechtigung"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden")
    })
    public void delete(@Parameter(description = "Rezept-ID") @PathVariable Long id) {
        recipeService.delete(id);
    }
}
