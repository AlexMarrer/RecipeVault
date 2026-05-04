package ch.uscata.alex.recipevault.ingredient;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ch.uscata.alex.recipevault.ingredient.dto.IngredientRequestDTO;
import ch.uscata.alex.recipevault.ingredient.dto.IngredientResponseDTO;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    @Mapping(target = "id", ignore = true)
    Ingredient toEntity(IngredientRequestDTO dto);

    IngredientResponseDTO toResponse(Ingredient entity);

    @Mapping(target = "id", ignore = true)
    void update(@MappingTarget Ingredient existing, IngredientRequestDTO dto);
}
