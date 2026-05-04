package ch.uscata.alex.recipevault.ingredient.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record IngredientRequestDTO(

        @NotBlank
        @Size(max = 80)
        String name,

        @Size(max = 20)
        String defaultUnit

) {}
