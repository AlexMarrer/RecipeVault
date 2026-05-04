package ch.uscata.alex.recipevault.rating;

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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ch.uscata.alex.recipevault.rating.dto.RatingRequestDTO;
import ch.uscata.alex.recipevault.rating.dto.RatingResponseDTO;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = "Rating", description = "Bewertungen von Rezepten (Sterne + Kommentar)")
public class RatingController {

    private final RatingService ratingService;

    @PostMapping("/api/recipe/{recipeId}/rating")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Bewertung zu einem Rezept anlegen",
            description = "Ein Benutzer kann pro Rezept nur eine Bewertung abgeben.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Bewertung angelegt"),
            @ApiResponse(responseCode = "400", description = "Ungueltige Eingabe (Stars 1-5)"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden"),
            @ApiResponse(responseCode = "409", description = "Benutzer hat dieses Rezept bereits bewertet")
    })
    public RatingResponseDTO create(
            @Parameter(description = "Rezept-ID") @PathVariable Long recipeId,
            @Valid @RequestBody RatingRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ratingService.create(recipeId, dto, userId);
    }

    @GetMapping("/api/recipe/{recipeId}/rating")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Alle Bewertungen eines Rezepts auflisten")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Liste der Bewertungen"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden")
    })
    public List<RatingResponseDTO> listForRecipe(
            @Parameter(description = "Rezept-ID") @PathVariable Long recipeId) {
        return ratingService.findByRecipe(recipeId);
    }

    @GetMapping("/api/rating/me")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Eigene Bewertungen des angemeldeten Benutzers")
    public List<RatingResponseDTO> myRatings(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ratingService.findByUser(userId);
    }

    @GetMapping("/api/rating/{id}")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Bewertung per ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bewertung gefunden"),
            @ApiResponse(responseCode = "404", description = "Bewertung nicht gefunden")
    })
    public RatingResponseDTO get(
            @Parameter(description = "Bewertungs-ID") @PathVariable Long id) {
        return ratingService.findById(id);
    }

    @PutMapping("/api/rating/{id}")
    @PreAuthorize("hasRole('admin') or @ratingService.isOwner(#id, authentication)")
    @Operation(summary = "Bewertung aktualisieren",
            description = "Admin darf alles. Benutzer nur eigene Bewertungen.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Aktualisiert"),
            @ApiResponse(responseCode = "403", description = "Keine Berechtigung"),
            @ApiResponse(responseCode = "404", description = "Bewertung nicht gefunden")
    })
    public RatingResponseDTO update(
            @Parameter(description = "Bewertungs-ID") @PathVariable Long id,
            @Valid @RequestBody RatingRequestDTO dto) {
        return ratingService.update(id, dto);
    }

    @DeleteMapping("/api/rating/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('admin') or @ratingService.isOwner(#id, authentication)")
    @Operation(summary = "Bewertung loeschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Geloescht"),
            @ApiResponse(responseCode = "403", description = "Keine Berechtigung"),
            @ApiResponse(responseCode = "404", description = "Bewertung nicht gefunden")
    })
    public void delete(@Parameter(description = "Bewertungs-ID") @PathVariable Long id) {
        ratingService.delete(id);
    }
}
