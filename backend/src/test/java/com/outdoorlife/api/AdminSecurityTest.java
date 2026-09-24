package com.outdoorlife.api;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
    @MockitoBean
    ContactMessageRepository messages;
    @MockitoBean
    SubscriberRepository subscribers;

    @Test
    void productWritesAndAdminPagesRequireAnAdminToken() throws Exception {
        when(products.save(any())).thenAnswer(inv -> inv.getArgument(0));
        String product = "{\"id\":\"99\",\"name\":\"Test Tent\"}";

        mvc.perform(get("/products")).andExpect(status().isOk());
        mvc.perform(post("/products").contentType(APPLICATION_JSON).content(product))
                .andExpect(status().isUnauthorized());
        mvc.perform(get("/admin/orders")).andExpect(status().isUnauthorized());
        mvc.perform(get("/admin/stats")).andExpect(status().isUnauthorized());
        mvc.perform(post("/admin/login").contentType(APPLICATION_JSON)
                        .content("{\"email\":\"admin@outdoorlife.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());

        String token = adminToken();
        mvc.perform(post("/products").header("Authorization", "Bearer " + token)
                        .contentType(APPLICATION_JSON).content(product))
                .andExpect(status().isCreated());
        mvc.perform(get("/admin/orders").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        mvc.perform(put("/admin/orders/o1/status").header("Authorization", "Bearer " + token)
                        .contentType(APPLICATION_JSON).content("{\"orderStatus\":\"Teleported\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void ordersBelongToTheTokenOwnerAndRespectStock() throws Exception {
        AppUser alice = new AppUser();
        alice.id = "alice-id";
        alice.email = "alice@example.com";
        alice.password = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode("pw");
        when(users.findByEmail("alice@example.com")).thenReturn(Optional.of(alice));
        Product tent = new Product();
        tent.id = "1";
        tent.name = "Tent";
        tent.stock = 5;
        when(products.findById("1")).thenReturn(Optional.of(tent));
        when(orders.save(any())).thenAnswer(inv -> inv.getArgument(0));

        // The body claims to be someone else; the server must use the token's user instead.
        String order = "{\"userId\":\"mallory\",\"items\":[{\"id\":\"1\",\"quantity\":2}]}";
        mvc.perform(post("/orders").contentType(APPLICATION_JSON).content(order))
                .andExpect(status().isUnauthorized());

        String login = mvc.perform(post("/auth/login").contentType(APPLICATION_JSON)
                        .content("{\"email\":\"alice@example.com\",\"password\":\"pw\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String token = JsonPath.read(login, "$.token");

        mvc.perform(post("/orders").header("Authorization", "Bearer " + token)
                        .contentType(APPLICATION_JSON).content(order))
                .andExpect(status().isCreated());
        ArgumentCaptor<CustomerOrder> saved = ArgumentCaptor.forClass(CustomerOrder.class);
        verify(orders).save(saved.capture());
        assertEquals("alice-id", saved.getValue().userId);
        assertEquals(3, tent.stock);

        mvc.perform(post("/orders").header("Authorization", "Bearer " + token)
                        .contentType(APPLICATION_JSON).content("{\"items\":[{\"id\":\"1\",\"quantity\":10}]}"))
                .andExpect(status().isConflict());
        assertEquals(3, tent.stock);

        mvc.perform(get("/admin/orders").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    private String adminToken() throws Exception {
        String login = mvc.perform(post("/admin/login").contentType(APPLICATION_JSON)
                        .content("{\"email\":\"admin@outdoorlife.com\",\"password\":\"test-admin-password\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return JsonPath.read(login, "$.token");
    }
}
