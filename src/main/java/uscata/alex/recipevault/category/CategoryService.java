package uscata.alex.recipevault.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uscata.alex.recipevault.category.dto.CategoryRequestDTO;
import uscata.alex.recipevault.category.dto.CategoryResponseDTO;
import uscata.alex.recipevault.common.ConflictException;
import uscata.alex.recipevault.common.NotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepo;
    private final CategoryMapper mapper;

    public List<CategoryResponseDTO> findAll() {
        return categoryRepo.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public CategoryResponseDTO findById(Long id) {
        return mapper.toResponse(findEntityById(id));
    }

    @Transactional
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        if (categoryRepo.existsByNameIgnoreCase(dto.name())) {
            throw new ConflictException("Kategorie '" + dto.name() + "' existiert bereits");
        }
        Category entity = mapper.toEntity(dto);
        return mapper.toResponse(categoryRepo.save(entity));
    }

    @Transactional
    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        Category existing = findEntityById(id);
        if (!existing.getName().equalsIgnoreCase(dto.name())
                && categoryRepo.existsByNameIgnoreCase(dto.name())) {
            throw new ConflictException("Kategorie '" + dto.name() + "' existiert bereits");
        }
        mapper.update(existing, dto);
        return mapper.toResponse(categoryRepo.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!categoryRepo.existsById(id)) {
            throw new NotFoundException("Kategorie " + id + " nicht gefunden");
        }
        categoryRepo.deleteById(id);
    }

    private Category findEntityById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Kategorie " + id + " nicht gefunden"));
    }
}
