package ch.uscata.alex.recipevault.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByRecipeId(Long recipeId);

    List<Rating> findByUserId(UUID userId);

    Optional<Rating> findByRecipeIdAndUserId(Long recipeId, UUID userId);

    boolean existsByRecipeIdAndUserId(Long recipeId, UUID userId);
}
