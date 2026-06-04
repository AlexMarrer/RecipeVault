package ch.uscata.alex.recipevault.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByAuthorId(UUID authorId);

    List<Recipe> findByTitleContainingIgnoreCase(String title);

    List<Recipe> findByCategoriesId(Long categoryId);

    List<Recipe> findByDifficulty(Difficulty difficulty);
}
