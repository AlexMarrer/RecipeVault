package ch.uscata.alex.recipevault.recipe.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import ch.uscata.alex.recipevault.recipe.Difficulty;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record RecipeRequestDTO(

        @NotBlank
        @Size(max = 150)
        String title,

        @Size(max = 2000)
        String description,

        @NotNull
        @PositiveOrZero
        Integer prepTimeMinutes,

        @NotNull
        @PositiveOrZero
        Integer cookTimeMinutes,

        @NotNull
        @Min(1)
        Integer servings,

        @NotNull
        Difficulty difficulty,

        @Size(max = 500)
        String imageUrl,

        @NotEmpty
        @Valid
        List<SectionRequest> sections,

        @NotEmpty
        @Valid
        List<IngredientLineRequest> ingredients,

        Set<@NotNull Long> categoryIds

) {

    public record SectionRequest(

            @NotBlank
            @Size(max = 100)
            String title,

            @NotNull
            @PositiveOrZero
            Integer sortOrder,

            @NotEmpty
            @Valid
            List<StepRequest> steps

    ) {}

    public record StepRequest(

            @NotNull
            @Min(1)
            Integer stepNumber,

            @NotBlank
            @Size(max = 1000)
            String instruction

    ) {}

    public record IngredientLineRequest(

            @NotNull
            Long ingredientId,

            @NotNull
            @DecimalMin(value = "0.0", inclusive = false)
            BigDecimal amount,

            @NotBlank
            @Size(max = 20)
            String unit

    ) {}
}
