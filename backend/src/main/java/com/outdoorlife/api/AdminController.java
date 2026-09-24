package com.outdoorlife.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtEncoder;
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
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.UUID;

import static org.springframework.util.StringUtils.hasText;

// Access to everything here except /admin/login is enforced in SecurityConfig.
@CrossOrigin
@RestController
public class AdminController {

    public record LoginRequest(String email, String password) {}

    static final Set<String> ORDER_STATUSES = Set.of("Processing", "Shipped", "Delivered", "Cancelled");

    private final ProductRepository products;
    private final OrderRepository orders;
    private final UserRepository users;
    private final ContactMessageRepository messages;
    private final SubscriberRepository subscribers;
    private final JwtEncoder jwt;
    private final String adminEmail;
    private final String adminPassword;

    public AdminController(ProductRepository products, OrderRepository orders, UserRepository users,
                           ContactMessageRepository messages, SubscriberRepository subscribers, JwtEncoder jwt,
                           @Value("${ADMIN_EMAIL:admin@outdoorlife.com}") String adminEmail,
                           @Value("${ADMIN_PASSWORD}") String adminPassword) {
        this.products = products;
        this.orders = orders;
        this.users = users;
        this.messages = messages;
        this.subscribers = subscribers;
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
        return ResponseEntity.ok(Map.of("token", SecurityConfig.issueToken(jwt, adminEmail, "ADMIN", 8)));
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

    @PutMapping("/admin/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("orderStatus");
        if (!ORDER_STATUSES.contains(status)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Status must be one of " + ORDER_STATUSES));
        }
        return orders.findById(id)
                .<ResponseEntity<?>>map(order -> {
                    order.orderStatus = status;
                    return ResponseEntity.ok(orders.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ponytail: aggregates in memory, fine for a demo store; switch to SUM/COUNT queries at scale
    @GetMapping("/admin/stats")
    public Map<String, Object> stats() {
        List<CustomerOrder> all = orders.findAll(Sort.by(Sort.Direction.DESC, "orderDate"));
        double revenue = all.stream()
                .filter(o -> !"Cancelled".equals(o.orderStatus))
                .mapToDouble(o -> o.totalAmount == null ? 0 : o.totalAmount)
                .sum();
        Map<String, Long> byStatus = new TreeMap<>();
        all.forEach(o -> byStatus.merge(o.orderStatus == null ? "Processing" : o.orderStatus, 1L, Long::sum));
        return Map.of(
                "products", products.count(),
                "orders", all.size(),
                "customers", users.count(),
                "revenue", revenue,
                "subscribers", subscribers.count(),
                "ordersByStatus", byStatus,
                "recentOrders", all.subList(0, Math.min(5, all.size())));
    }

    @GetMapping("/admin/messages")
    public List<ContactMessage> contactMessages() {
        return messages.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
