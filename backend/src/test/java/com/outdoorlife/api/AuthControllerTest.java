package com.outdoorlife.api;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    private final UserRepository users = mock(UserRepository.class);
    private final AuthController auth = new AuthController(users);

    @Test
    void registerStoresHashAndLoginVerifiesIt() {
        when(users.save(any())).thenAnswer(inv -> inv.getArgument(0));
        auth.register(new AuthController.RegisterRequest("Demo", "Demo@Example.com", "secret"));

        ArgumentCaptor<AppUser> saved = ArgumentCaptor.forClass(AppUser.class);
        verify(users).save(saved.capture());
        AppUser user = saved.getValue();
        assertEquals("demo@example.com", user.email);
        assertNotEquals("secret", user.password);
        assertTrue(new BCryptPasswordEncoder().matches("secret", user.password));

        when(users.findByEmail("demo@example.com")).thenReturn(Optional.of(user));
        assertEquals(200, auth.login(new AuthController.LoginRequest("demo@example.com", "secret")).getStatusCode().value());
        assertEquals(401, auth.login(new AuthController.LoginRequest("demo@example.com", "wrong")).getStatusCode().value());
    }
}
