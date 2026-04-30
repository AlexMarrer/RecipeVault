package uscata.alex.recipevault.recipe.dto;

import uscata.alex.recipevault.recipe.Difficulty;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record RecipeResponseDTO(

        Long id,
        String title,
        String description,
        Integer prepTimeMinutes,
        Integer cookTimeMinutes,
        Integer servings,
        Difficulty difficulty,
        String imageUrl,
        UUID authorId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<SectionResponse> sections,
        List<IngredientLineResponse> ingredients,
        Set<CategoryRef> categories,
        Double averageRating,
        Integer ratingCount

) {

    public record SectionResponse(
            Long id,
            String title,
            Integer sortOrder,
            List<StepResponse> steps
    ) {}

    public record StepResponse(
            Long id,
            Integer stepNumber,
            String instruction
    ) {}

    public record IngredientLineResponse(
            Long id,
            Long ingredientId,
            String ingredientName,
            BigDecimal amount,
            String unit
    ) {}

    public record CategoryRef(
            Long id,
            String name
    ) {}
}
