package ch.uscata.alex.recipevault.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(

        @NotBlank
        @Size(max = 50)
        String name

) {}
