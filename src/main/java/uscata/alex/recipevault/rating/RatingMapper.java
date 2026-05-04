package uscata.alex.recipevault.rating;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import uscata.alex.recipevault.rating.dto.RatingRequestDTO;
import uscata.alex.recipevault.rating.dto.RatingResponseDTO;

@Mapper(componentModel = "spring")
public interface RatingMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "recipe", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Rating toEntity(RatingRequestDTO dto);

    @Mapping(target = "recipeId", source = "recipe.id")
    RatingResponseDTO toResponse(Rating entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "recipe", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void update(@MappingTarget Rating existing, RatingRequestDTO dto);
}
