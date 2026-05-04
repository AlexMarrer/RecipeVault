package uscata.alex.recipevault.recipe;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import uscata.alex.recipevault.category.Category;
import uscata.alex.recipevault.ingredient.Ingredient;
import uscata.alex.recipevault.rating.Rating;
import uscata.alex.recipevault.recipe.dto.RecipeRequestDTO;
import uscata.alex.recipevault.recipe.dto.RecipeResponseDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "authorId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "categories", ignore = true)
    Recipe toEntity(RecipeRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "authorId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "sections", ignore = true)
    void updateBaseFields(@MappingTarget Recipe existing, RecipeRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "recipe", ignore = true)
    RecipeSection toSection(RecipeRequestDTO.SectionRequest dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "section", ignore = true)
    RecipeStep toStep(RecipeRequestDTO.StepRequest dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "recipe", ignore = true)
    @Mapping(target = "amount", source = "line.amount")
    @Mapping(target = "unit", source = "line.unit")
    @Mapping(target = "ingredient", source = "ingredient")
    RecipeIngredient toRecipeIngredient(RecipeRequestDTO.IngredientLineRequest line,
                                        Ingredient ingredient);

    @AfterMapping
    default void wireSectionsAndSteps(@MappingTarget Recipe recipe) {
        if (recipe.getSections() != null) {
            for (RecipeSection section : recipe.getSections()) {
                section.setRecipe(recipe);
                if (section.getSteps() != null) {
                    for (RecipeStep step : section.getSteps()) {
                        step.setSection(section);
                    }
                }
            }
        }
    }

    @Mapping(target = "averageRating", expression = "java(averageStars(entity.getRatings()))")
    @Mapping(target = "ratingCount", expression = "java(entity.getRatings() == null ? 0 : entity.getRatings().size())")
    RecipeResponseDTO toResponse(Recipe entity);

    RecipeResponseDTO.SectionResponse toSectionResponse(RecipeSection section);

    RecipeResponseDTO.StepResponse toStepResponse(RecipeStep step);

    @Mapping(target = "ingredientId", source = "ingredient.id")
    @Mapping(target = "ingredientName", source = "ingredient.name")
    RecipeResponseDTO.IngredientLineResponse toIngredientLineResponse(RecipeIngredient ri);

    RecipeResponseDTO.CategoryRef toCategoryRef(Category category);

    default Double averageStars(List<Rating> ratings) {
        if (ratings == null || ratings.isEmpty()) {
            return null;
        }
        return ratings.stream().mapToInt(Rating::getStars).average().orElse(0.0);
    }
}
