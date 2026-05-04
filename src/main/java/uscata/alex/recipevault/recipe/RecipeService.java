package uscata.alex.recipevault.recipe;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uscata.alex.recipevault.category.Category;
import uscata.alex.recipevault.category.CategoryRepository;
import uscata.alex.recipevault.common.NotFoundException;
import uscata.alex.recipevault.ingredient.Ingredient;
import uscata.alex.recipevault.ingredient.IngredientRepository;
import uscata.alex.recipevault.recipe.dto.RecipeRequestDTO;
import uscata.alex.recipevault.recipe.dto.RecipeResponseDTO;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepo;
    private final IngredientRepository ingredientRepo;
    private final CategoryRepository categoryRepo;
    private final RecipeMapper mapper;

    public List<RecipeResponseDTO> findAll() {
        return recipeRepo.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public RecipeResponseDTO findById(Long id) {
        return mapper.toResponse(findEntityById(id));
    }

    public List<RecipeResponseDTO> search(String title) {
        return recipeRepo.findByTitleContainingIgnoreCase(title).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<RecipeResponseDTO> findByAuthor(UUID authorId) {
        return recipeRepo.findByAuthorId(authorId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<RecipeResponseDTO> findByCategory(Long categoryId) {
        return recipeRepo.findByCategoriesId(categoryId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<RecipeResponseDTO> findByDifficulty(Difficulty difficulty) {
        return recipeRepo.findByDifficulty(difficulty).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public RecipeResponseDTO create(RecipeRequestDTO dto, UUID authorId) {
        Recipe recipe = mapper.toEntity(dto);
        recipe.setAuthorId(authorId);
        attachIngredients(recipe, dto);
        attachCategories(recipe, dto.categoryIds());
        return mapper.toResponse(recipeRepo.save(recipe));
    }

    @Transactional
    public RecipeResponseDTO update(Long id, RecipeRequestDTO dto) {
        Recipe existing = findEntityById(id);

        mapper.updateBaseFields(existing, dto);
        replaceSections(existing, dto);
        replaceIngredients(existing, dto);
        existing.setCategories(loadCategories(dto.categoryIds()));

        return mapper.toResponse(recipeRepo.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!recipeRepo.existsById(id)) {
            throw new NotFoundException("Rezept " + id + " nicht gefunden");
        }
        recipeRepo.deleteById(id);
    }

    public boolean isOwner(Long recipeId, Authentication auth) {
        if (auth == null || !(auth.getPrincipal() instanceof Jwt jwt)) {
            return false;
        }
        UUID userId = UUID.fromString(jwt.getSubject());
        return recipeRepo.findById(recipeId)
                .map(r -> r.getAuthorId().equals(userId))
                .orElse(false);
    }

    private Recipe findEntityById(Long id) {
        return recipeRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Rezept " + id + " nicht gefunden"));
    }

    private void attachIngredients(Recipe recipe, RecipeRequestDTO dto) {
        Map<Long, Ingredient> cache = loadIngredients(dto.ingredients());
        for (RecipeRequestDTO.IngredientLineRequest line : dto.ingredients()) {
            RecipeIngredient ri = mapper.toRecipeIngredient(line, cache.get(line.ingredientId()));
            ri.setRecipe(recipe);
            recipe.getIngredients().add(ri);
        }
    }

    private void replaceIngredients(Recipe recipe, RecipeRequestDTO dto) {
        recipe.getIngredients().clear();
        attachIngredients(recipe, dto);
    }

    private void attachCategories(Recipe recipe, Set<Long> categoryIds) {
        recipe.setCategories(loadCategories(categoryIds));
    }

    private void replaceSections(Recipe existing, RecipeRequestDTO dto) {
        existing.getSections().clear();
        Recipe template = mapper.toEntity(dto);
        for (RecipeSection section : template.getSections()) {
            section.setRecipe(existing);
            existing.getSections().add(section);
        }
    }

    private Map<Long, Ingredient> loadIngredients(List<RecipeRequestDTO.IngredientLineRequest> lines) {
        Set<Long> ids = lines.stream()
                .map(RecipeRequestDTO.IngredientLineRequest::ingredientId)
                .collect(Collectors.toSet());

        Map<Long, Ingredient> map = ingredientRepo.findAllById(ids).stream()
                .collect(Collectors.toMap(Ingredient::getId, Function.identity()));

        if (map.size() != ids.size()) {
            throw new NotFoundException("Eine oder mehrere Zutaten existieren nicht");
        }
        return map;
    }

    private Set<Category> loadCategories(Set<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new HashSet<>();
        }
        Set<Category> categories = new HashSet<>(categoryRepo.findAllById(ids));
        if (categories.size() != ids.size()) {
            throw new NotFoundException("Eine oder mehrere Kategorien existieren nicht");
        }
        return categories;
    }
}
