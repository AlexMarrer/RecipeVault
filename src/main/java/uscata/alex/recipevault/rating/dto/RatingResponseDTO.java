package uscata.alex.recipevault.rating.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record RatingResponseDTO(

        Long id,
        Integer stars,
        String comment,
        UUID userId,
        Long recipeId,
        LocalDateTime createdAt

) {}
