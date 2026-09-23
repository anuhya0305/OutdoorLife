package com.outdoorlife.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.springframework.util.StringUtils.hasText;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    public record RegisterRequest(String name, String email, String password) {}

    public record LoginRequest(String email, String password) {}

    private final UserRepository users;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository users) {
        this.users = users;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (!hasText(req.name()) || !hasText(req.email()) || !hasText(req.password())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name, email and password are required"));
        }
        String email = req.email().trim().toLowerCase();
        if (users.existsByEmail(email)) {
            return ResponseEntity.status(409).body(Map.of("error", "An account with this email already exists"));
        }
        AppUser user = new AppUser();
        user.name = req.name().trim();
        user.email = email;
        user.password = encoder.encode(req.password());
        return ResponseEntity.status(201).body(users.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (!hasText(req.email()) || !hasText(req.password())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
        return users.findByEmail(req.email().trim().toLowerCase())
                .filter(user -> encoder.matches(req.password(), user.password))
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid email or password")));
    }
}
