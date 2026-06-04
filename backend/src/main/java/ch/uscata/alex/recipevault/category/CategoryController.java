package ch.uscata.alex.recipevault.category;

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
import ch.uscata.alex.recipevault.category.dto.CategoryRequestDTO;
import ch.uscata.alex.recipevault.category.dto.CategoryResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category", description = "Verwaltung von Rezept-Kategorien")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Alle Kategorien auflisten")
    @ApiResponse(responseCode = "200", description = "Liste der Kategorien")
    public List<CategoryResponseDTO> list() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('user', 'chef', 'admin')")
    @Operation(summary = "Kategorie per ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Kategorie gefunden"),
            @ApiResponse(responseCode = "404", description = "Kategorie nicht gefunden")
    })
    public CategoryResponseDTO get(
            @Parameter(description = "Kategorie-ID") @PathVariable Long id) {
        return categoryService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('chef', 'admin')")
    @Operation(summary = "Neue Kategorie anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Angelegt"),
            @ApiResponse(responseCode = "400", description = "Ungueltige Eingabe"),
            @ApiResponse(responseCode = "409", description = "Name bereits vergeben")
    })
    public CategoryResponseDTO create(@Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('chef', 'admin')")
    @Operation(summary = "Kategorie aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Aktualisiert"),
            @ApiResponse(responseCode = "404", description = "Kategorie nicht gefunden"),
            @ApiResponse(responseCode = "409", description = "Name bereits vergeben")
    })
    public CategoryResponseDTO update(
            @Parameter(description = "Kategorie-ID") @PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "Kategorie loeschen", description = "Nur Admin.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Geloescht"),
            @ApiResponse(responseCode = "404", description = "Kategorie nicht gefunden")
    })
    public void delete(@Parameter(description = "Kategorie-ID") @PathVariable Long id) {
        categoryService.delete(id);
    }
}
