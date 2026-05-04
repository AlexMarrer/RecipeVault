package ch.uscata.alex.recipevault.rating;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ch.uscata.alex.recipevault.common.ConflictException;
import ch.uscata.alex.recipevault.common.NotFoundException;
import ch.uscata.alex.recipevault.rating.dto.RatingRequestDTO;
import ch.uscata.alex.recipevault.rating.dto.RatingResponseDTO;
import ch.uscata.alex.recipevault.recipe.Recipe;
import ch.uscata.alex.recipevault.recipe.RecipeRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RatingService {

    private final RatingRepository ratingRepo;
    private final RecipeRepository recipeRepo;
    private final RatingMapper mapper;

    public List<RatingResponseDTO> findByRecipe(Long recipeId) {
        if (!recipeRepo.existsById(recipeId)) {
            throw new NotFoundException("Rezept " + recipeId + " nicht gefunden");
        }
        return ratingRepo.findByRecipeId(recipeId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public List<RatingResponseDTO> findByUser(UUID userId) {
        return ratingRepo.findByUserId(userId).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public RatingResponseDTO findById(Long id) {
        return mapper.toResponse(findEntityById(id));
    }

    @Transactional
    public RatingResponseDTO create(Long recipeId, RatingRequestDTO dto, UUID userId) {
        Recipe recipe = recipeRepo.findById(recipeId)
                .orElseThrow(() -> new NotFoundException("Rezept " + recipeId + " nicht gefunden"));

        if (ratingRepo.existsByRecipeIdAndUserId(recipeId, userId)) {
            throw new ConflictException("Du hast dieses Rezept bereits bewertet");
        }

        Rating rating = mapper.toEntity(dto);
        rating.setRecipe(recipe);
        rating.setUserId(userId);
        return mapper.toResponse(ratingRepo.save(rating));
    }

    @Transactional
    public RatingResponseDTO update(Long id, RatingRequestDTO dto) {
        Rating existing = findEntityById(id);
        mapper.update(existing, dto);
        return mapper.toResponse(ratingRepo.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!ratingRepo.existsById(id)) {
            throw new NotFoundException("Bewertung " + id + " nicht gefunden");
        }
        ratingRepo.deleteById(id);
    }

    public boolean isOwner(Long ratingId, Authentication auth) {
        if (auth == null || !(auth.getPrincipal() instanceof Jwt jwt)) {
            return false;
        }
        UUID userId = UUID.fromString(jwt.getSubject());
        return ratingRepo.findById(ratingId)
                .map(r -> r.getUserId().equals(userId))
                .orElse(false);
    }

    private Rating findEntityById(Long id) {
        return ratingRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Bewertung " + id + " nicht gefunden"));
    }
}
