package com.outdoorlife.api;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@Import(SecurityConfig.class)
@TestPropertySource(properties = {
        "ADMIN_PASSWORD=test-admin-password",
        "JWT_SECRET=test-secret-that-is-at-least-32-bytes-long"
})
class AdminSecurityTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    ProductRepository products;
    @MockitoBean
    ReviewRepository reviews;
    @MockitoBean
    OrderRepository orders;
    @MockitoBean
    UserRepository users;

    @Test
    void productWritesAndAllOrdersRequireAnAdminToken() throws Exception {
        when(products.save(any())).thenAnswer(inv -> inv.getArgument(0));
        String product = "{\"id\":\"99\",\"name\":\"Test Tent\"}";

        mvc.perform(get("/products")).andExpect(status().isOk());
        mvc.perform(post("/products").contentType(APPLICATION_JSON).content(product))
                .andExpect(status().isUnauthorized());
        mvc.perform(get("/admin/orders")).andExpect(status().isUnauthorized());
        mvc.perform(post("/admin/login").contentType(APPLICATION_JSON)
                        .content("{\"email\":\"admin@outdoorlife.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());

        String login = mvc.perform(post("/admin/login").contentType(APPLICATION_JSON)
                        .content("{\"email\":\"admin@outdoorlife.com\",\"password\":\"test-admin-password\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String token = JsonPath.read(login, "$.token");

        mvc.perform(post("/products").header("Authorization", "Bearer " + token)
                        .contentType(APPLICATION_JSON).content(product))
                .andExpect(status().isCreated());
        mvc.perform(get("/admin/orders").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}
