package com.outdoorlife.api;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    private final UserRepository users = mock(UserRepository.class);
    private final AuthController auth = new AuthController(users, new NimbusJwtEncoder(new ImmutableSecret<>(
            new SecretKeySpec("test-secret-that-is-at-least-32-bytes-long".getBytes(StandardCharsets.UTF_8), "HmacSHA256"))));

    @Test
    void registerStoresHashAndLoginVerifiesIt() {
        when(users.save(any())).thenAnswer(inv -> {
            AppUser saved = inv.getArgument(0);
            saved.id = "user-1";
            return saved;
        });
        auth.register(new AuthController.RegisterRequest("Demo", "Demo@Example.com", "secret"));

        ArgumentCaptor<AppUser> saved = ArgumentCaptor.forClass(AppUser.class);
        verify(users).save(saved.capture());
        AppUser user = saved.getValue();
        assertEquals("demo@example.com", user.email);
        assertNotEquals("secret", user.password);
        assertTrue(new BCryptPasswordEncoder().matches("secret", user.password));

        when(users.findByEmail("demo@example.com")).thenReturn(Optional.of(user));
        var ok = auth.login(new AuthController.LoginRequest("demo@example.com", "secret"));
        assertEquals(200, ok.getStatusCode().value());
        assertNotNull(((AuthController.Session) ok.getBody()).token());
        assertEquals(401, auth.login(new AuthController.LoginRequest("demo@example.com", "wrong")).getStatusCode().value());
    }
}
