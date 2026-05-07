package ch.uscata.alex.recipevault.category;

import ch.uscata.alex.recipevault.category.dto.CategoryRequestDTO;
import ch.uscata.alex.recipevault.category.dto.CategoryResponseDTO;
import ch.uscata.alex.recipevault.common.ConflictException;
import ch.uscata.alex.recipevault.common.NotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willThrow;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private CategoryService categoryService;

    @MockitoBean
    private JwtDecoder jwtDecoder;

    private static final String ROLE_USER = "ROLE_user";
    private static final String ROLE_CHEF = "ROLE_chef";
    private static final String ROLE_ADMIN = "ROLE_admin";

    @Test
    void list_unauthenticated_returns401() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void list_asUser_returnsCategories() throws Exception {
        given(categoryService.findAll()).willReturn(List.of(
                new CategoryResponseDTO(1L, "Dessert"),
                new CategoryResponseDTO(2L, "Hauptgang")
        ));

        mockMvc.perform(get("/api/categories").with(jwtWithRole(ROLE_USER)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Dessert"));
    }

    @Test
    void getById_existing_returns200() throws Exception {
        given(categoryService.findById(1L))
                .willReturn(new CategoryResponseDTO(1L, "Dessert"));

        mockMvc.perform(get("/api/categories/1").with(jwtWithRole(ROLE_USER)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Dessert"));
    }

    @Test
    void getById_missing_returns404() throws Exception {
        given(categoryService.findById(99L))
                .willThrow(new NotFoundException("Kategorie 99 nicht gefunden"));

        mockMvc.perform(get("/api/categories/99").with(jwtWithRole(ROLE_USER)))
                .andExpect(status().isNotFound());
    }

    @Test
    void create_asUser_returns403() throws Exception {
        mockMvc.perform(post("/api/categories")
                        .with(jwtWithRole(ROLE_USER))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO("Dessert"))))
                .andExpect(status().isForbidden());
    }

    @Test
    void create_asChef_returns201() throws Exception {
        given(categoryService.create(any()))
                .willReturn(new CategoryResponseDTO(5L, "Dessert"));

        mockMvc.perform(post("/api/categories")
                        .with(jwtWithRole(ROLE_CHEF))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO("Dessert"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.name").value("Dessert"));
    }

    @Test
    void create_blankName_returns400() throws Exception {
        mockMvc.perform(post("/api/categories")
                        .with(jwtWithRole(ROLE_CHEF))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO(""))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_duplicateName_returns409() throws Exception {
        given(categoryService.create(any()))
                .willThrow(new ConflictException("Kategorie 'Dessert' existiert bereits"));

        mockMvc.perform(post("/api/categories")
                        .with(jwtWithRole(ROLE_CHEF))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO("Dessert"))))
                .andExpect(status().isConflict());
    }

    @Test
    void update_asChef_returns200() throws Exception {
        given(categoryService.update(eq(1L), any()))
                .willReturn(new CategoryResponseDTO(1L, "Dessert neu"));

        mockMvc.perform(put("/api/categories/1")
                        .with(jwtWithRole(ROLE_CHEF))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO("Dessert neu"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dessert neu"));
    }

    @Test
    void update_asUser_returns403() throws Exception {
        mockMvc.perform(put("/api/categories/1")
                        .with(jwtWithRole(ROLE_USER))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CategoryRequestDTO("X"))))
                .andExpect(status().isForbidden());
    }

    @Test
    void delete_asAdmin_returns204() throws Exception {
        doNothing().when(categoryService).delete(1L);

        mockMvc.perform(delete("/api/categories/1").with(jwtWithRole(ROLE_ADMIN)))
                .andExpect(status().isNoContent());

        verify(categoryService).delete(1L);
    }

    @Test
    void delete_asChef_returns403() throws Exception {
        mockMvc.perform(delete("/api/categories/1").with(jwtWithRole(ROLE_CHEF)))
                .andExpect(status().isForbidden());
    }

    @Test
    void delete_missing_returns404() throws Exception {
        willThrow(new NotFoundException("Kategorie 99 nicht gefunden"))
                .given(categoryService).delete(99L);

        mockMvc.perform(delete("/api/categories/99").with(jwtWithRole(ROLE_ADMIN)))
                .andExpect(status().isNotFound());
    }

    private static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor
    jwtWithRole(String role) {
        return jwt().authorities(new SimpleGrantedAuthority(role));
    }
}
