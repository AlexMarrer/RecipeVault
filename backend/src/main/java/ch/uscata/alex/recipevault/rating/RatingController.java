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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ch.uscata.alex.recipevault.rating.dto.RatingRequestDTO;
import ch.uscata.alex.recipevault.rating.dto.RatingResponseDTO;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
@Tag(name = "Rating", description = "Bewertungen von Rezepten (Sterne + Kommentar)")
public class RatingController {

    private final RatingService ratingService;

    @GetMapping
    @Operation(summary = "Bewertungen auflisten",
            description = "Liefert alle Bewertungen. Optional gefiltert nach Rezept.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Liste der Bewertungen"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden (bei Filter)")
    })
    public List<RatingResponseDTO> list(
            @Parameter(description = "Optional: Filter nach Rezept-ID")
            @RequestParam(required = false) Long recipeId) {
        if (recipeId != null) {
            return ratingService.findByRecipe(recipeId);
        }
        return ratingService.findAll();
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Eigene Bewertungen des angemeldeten Benutzers")
    public List<RatingResponseDTO> myRatings(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ratingService.findByUser(userId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Bewertung per ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Bewertung gefunden"),
            @ApiResponse(responseCode = "404", description = "Bewertung nicht gefunden")
    })
    public RatingResponseDTO get(
            @Parameter(description = "Bewertungs-ID") @PathVariable Long id) {
        return ratingService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Bewertung anlegen",
            description = "Ein Benutzer kann pro Rezept nur eine Bewertung abgeben.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Bewertung angelegt"),
            @ApiResponse(responseCode = "400", description = "Ungueltige Eingabe (Stars 1-5)"),
            @ApiResponse(responseCode = "404", description = "Rezept nicht gefunden"),
            @ApiResponse(responseCode = "409", description = "Benutzer hat dieses Rezept bereits bewertet")
    })
    public RatingResponseDTO create(
            @Valid @RequestBody RatingRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ratingService.create(dto, userId);
    }

    @PutMapping("/{id}")
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

    @DeleteMapping("/{id}")
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
