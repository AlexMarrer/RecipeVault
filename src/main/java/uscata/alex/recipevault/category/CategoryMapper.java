package uscata.alex.recipevault.category;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import uscata.alex.recipevault.category.dto.CategoryRequestDTO;
import uscata.alex.recipevault.category.dto.CategoryResponseDTO;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "recipes", ignore = true)
    Category toEntity(CategoryRequestDTO dto);

    CategoryResponseDTO toResponse(Category entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "recipes", ignore = true)
    void update(@MappingTarget Category existing, CategoryRequestDTO dto);
}
