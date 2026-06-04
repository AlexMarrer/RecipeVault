package ch.uscata.alex.recipevault.category;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepo;

    @Test
    void create_persistsAndAssignsId() {
        Category c = new Category();
        c.setName("Dessert");

        Category saved = categoryRepo.save(c);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Dessert");
    }

    @Test
    void read_findById_returnsCategory() {
        Category c = new Category();
        c.setName("Hauptgang");
        Long id = categoryRepo.save(c).getId();

        Optional<Category> found = categoryRepo.findById(id);

        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Hauptgang");
    }

    @Test
    void read_findAll_returnsAllPersisted() {
        categoryRepo.save(makeCategory("Vorspeise"));
        categoryRepo.save(makeCategory("Suppe"));

        assertThat(categoryRepo.findAll()).hasSize(2);
    }

    @Test
    void update_changesName() {
        Category c = categoryRepo.save(makeCategory("alt"));

        c.setName("neu");
        categoryRepo.save(c);

        Category reloaded = categoryRepo.findById(c.getId()).orElseThrow();
        assertThat(reloaded.getName()).isEqualTo("neu");
    }

    @Test
    void delete_removesCategory() {
        Category c = categoryRepo.save(makeCategory("ToDelete"));
        Long id = c.getId();

        categoryRepo.deleteById(id);

        assertThat(categoryRepo.findById(id)).isEmpty();
    }

    @Test
    void findByNameIgnoreCase_matchesIrrespectiveOfCase() {
        categoryRepo.save(makeCategory("Pasta"));

        assertThat(categoryRepo.findByNameIgnoreCase("pasta")).isPresent();
        assertThat(categoryRepo.findByNameIgnoreCase("PASTA")).isPresent();
        assertThat(categoryRepo.findByNameIgnoreCase("PaStA")).isPresent();
    }

    @Test
    void findByNameIgnoreCase_returnsEmptyWhenMissing() {
        assertThat(categoryRepo.findByNameIgnoreCase("Nichtdrin")).isEmpty();
    }

    @Test
    void existsByNameIgnoreCase_trueWhenPresent_falseWhenMissing() {
        categoryRepo.save(makeCategory("Salat"));

        assertThat(categoryRepo.existsByNameIgnoreCase("salat")).isTrue();
        assertThat(categoryRepo.existsByNameIgnoreCase("SALAT")).isTrue();
        assertThat(categoryRepo.existsByNameIgnoreCase("xxx")).isFalse();
    }

    private static Category makeCategory(String name) {
        Category c = new Category();
        c.setName(name);
        return c;
    }
}
