package ch.uscata.alex.recipevault.ingredient;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ch.uscata.alex.recipevault.ingredient.dto.IngredientRequestDTO;
import ch.uscata.alex.recipevault.ingredient.dto.IngredientResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
@RequiredArgsConstructor
@Tag(name = "Ingredient", description = "Verwaltung von Zutaten")
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Alle Zutaten auflisten")
    @ApiResponse(responseCode = "200", description = "Liste der Zutaten")
    public List<IngredientResponseDTO> list() {
        return ingredientService.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Zutat per ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Zutat gefunden"),
            @ApiResponse(responseCode = "404", description = "Zutat nicht gefunden")
    })
    public IngredientResponseDTO get(
            @Parameter(description = "Zutat-ID") @PathVariable Long id) {
        return ingredientService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('chef', 'admin')")
    @Operation(summary = "Neue Zutat anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Angelegt"),
            @ApiResponse(responseCode = "400", description = "Ungueltige Eingabe"),
            @ApiResponse(responseCode = "409", description = "Name bereits vergeben")
    })
    public IngredientResponseDTO create(@Valid @RequestBody IngredientRequestDTO dto) {
        return ingredientService.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('chef', 'admin')")
    @Operation(summary = "Zutat aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Aktualisiert"),
            @ApiResponse(responseCode = "404", description = "Zutat nicht gefunden"),
            @ApiResponse(responseCode = "409", description = "Name bereits vergeben")
    })
    public IngredientResponseDTO update(
            @Parameter(description = "Zutat-ID") @PathVariable Long id,
            @Valid @RequestBody IngredientRequestDTO dto) {
        return ingredientService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "Zutat loeschen", description = "Nur Admin.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Geloescht"),
            @ApiResponse(responseCode = "404", description = "Zutat nicht gefunden")
    })
    public void delete(@Parameter(description = "Zutat-ID") @PathVariable Long id) {
        ingredientService.delete(id);
    }
}
