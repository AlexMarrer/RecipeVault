package uscata.alex.recipevault.ingredient;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uscata.alex.recipevault.common.ConflictException;
import uscata.alex.recipevault.common.NotFoundException;
import uscata.alex.recipevault.ingredient.dto.IngredientRequestDTO;
import uscata.alex.recipevault.ingredient.dto.IngredientResponseDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IngredientService {

    private final IngredientRepository ingredientRepo;
    private final IngredientMapper mapper;

    public List<IngredientResponseDTO> findAll() {
        return ingredientRepo.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public IngredientResponseDTO findById(Long id) {
        return mapper.toResponse(findEntityById(id));
    }

    @Transactional
    public IngredientResponseDTO create(IngredientRequestDTO dto) {
        if (ingredientRepo.existsByNameIgnoreCase(dto.name())) {
            throw new ConflictException("Zutat '" + dto.name() + "' existiert bereits");
        }
        Ingredient entity = mapper.toEntity(dto);
        return mapper.toResponse(ingredientRepo.save(entity));
    }

    @Transactional
    public IngredientResponseDTO update(Long id, IngredientRequestDTO dto) {
        Ingredient existing = findEntityById(id);
        if (!existing.getName().equalsIgnoreCase(dto.name())
                && ingredientRepo.existsByNameIgnoreCase(dto.name())) {
            throw new ConflictException("Zutat '" + dto.name() + "' existiert bereits");
        }
        mapper.update(existing, dto);
        return mapper.toResponse(ingredientRepo.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!ingredientRepo.existsById(id)) {
            throw new NotFoundException("Zutat " + id + " nicht gefunden");
        }
        ingredientRepo.deleteById(id);
    }

    private Ingredient findEntityById(Long id) {
        return ingredientRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Zutat " + id + " nicht gefunden"));
    }
}
