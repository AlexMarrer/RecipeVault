package uscata.alex.recipevault.recipe;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @GetMapping
    public String getUrAnus() {
        return "Uranus";
    }
}
