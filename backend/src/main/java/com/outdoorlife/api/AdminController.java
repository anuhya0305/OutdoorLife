package com.outdoorlife.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.util.StringUtils.hasText;

// Access to these endpoints (except /admin/login) is enforced in SecurityConfig.
@CrossOrigin
@RestController
public class AdminController {

    public record LoginRequest(String email, String password) {}

    private final ProductRepository products;
    private final OrderRepository orders;
    private final JwtEncoder jwt;
    private final String adminEmail;
    private final String adminPassword;

    public AdminController(ProductRepository products, OrderRepository orders, JwtEncoder jwt,
                           @Value("${ADMIN_EMAIL:admin@outdoorlife.com}") String adminEmail,
                           @Value("${ADMIN_PASSWORD}") String adminPassword) {
        this.products = products;
        this.orders = orders;
        this.jwt = jwt;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    // ponytail: single admin from env vars, move to an admins table if there are ever several
    @PostMapping("/admin/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        boolean valid = hasText(req.email()) && hasText(req.password())
                && req.email().trim().equalsIgnoreCase(adminEmail)
                && MessageDigest.isEqual(req.password().getBytes(StandardCharsets.UTF_8),
                                         adminPassword.getBytes(StandardCharsets.UTF_8));
        if (!valid) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid admin credentials"));
        }
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(adminEmail)
                .issuedAt(now)
                .expiresAt(now.plus(8, ChronoUnit.HOURS))
                .claim("scope", "ADMIN")
                .build();
        String token = jwt.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims))
                .getTokenValue();
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        if (!hasText(product.id)) {
            product.id = UUID.randomUUID().toString();
        }
        return ResponseEntity.status(201).body(products.save(product));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        if (!products.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        product.id = id;
        return ResponseEntity.ok(products.save(product));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        products.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/orders")
    public List<CustomerOrder> allOrders() {
        return orders.findAll(Sort.by("orderDate"));
    }
}
