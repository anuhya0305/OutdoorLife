package com.outdoorlife.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.util.StringUtils.hasText;

// ponytail: open CORS is fine while nothing uses cookies; restrict origins if auth moves to cookies
@CrossOrigin
@RestController
public class StoreController {

    private final ProductRepository products;
    private final ReviewRepository reviews;
    private final OrderRepository orders;
    private final ContactMessageRepository messages;
    private final SubscriberRepository subscribers;

    public StoreController(ProductRepository products, ReviewRepository reviews, OrderRepository orders,
                           ContactMessageRepository messages, SubscriberRepository subscribers) {
        this.products = products;
        this.reviews = reviews;
        this.orders = orders;
        this.messages = messages;
        this.subscribers = subscribers;
    }

    @GetMapping("/products")
    public List<Product> products() {
        return products.findAll();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> product(@PathVariable String id) {
        return ResponseEntity.of(products.findById(id));
    }

    @GetMapping("/reviews")
    public List<Review> reviews(@RequestParam(required = false) String productId) {
        return productId == null ? reviews.findAll() : reviews.findByProductId(productId);
    }

    @PostMapping("/reviews")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        if (!hasText(review.productId) || !hasText(review.name) || !hasText(review.comment)
                || review.rating == null || review.rating < 1 || review.rating > 5) {
            return badRequest("Name, comment and a 1-5 rating are required");
        }
        review.id = null;
        return ResponseEntity.status(201).body(reviews.save(review));
    }

    // ponytail: totals are trusted from the client; recompute server-side before taking real payments.
    // ponytail: no row locking, so two simultaneous orders can oversell; add @Version if that matters.
    @PostMapping("/orders")
    @Transactional
    public ResponseEntity<?> placeOrder(@RequestBody CustomerOrder order, @AuthenticationPrincipal Jwt user) {
        if (order.items == null || order.items.isEmpty()) {
            return badRequest("An order needs at least one item");
        }
        Map<String, Integer> wanted = new HashMap<>();
        for (Map<String, Object> item : order.items) {
            int quantity = item.get("quantity") instanceof Number n ? n.intValue() : 0;
            if (item.get("id") == null || quantity < 1) {
                return badRequest("Every item needs a product id and a quantity of at least 1");
            }
            wanted.merge(String.valueOf(item.get("id")), quantity, Integer::sum);
        }
        // Check every item before touching stock, so a failed order leaves stock unchanged.
        Map<Product, Integer> reserved = new HashMap<>();
        for (Map.Entry<String, Integer> e : wanted.entrySet()) {
            Product product = products.findById(e.getKey()).orElse(null);
            if (product == null) {
                return badRequest("A product in your cart no longer exists");
            }
            int stock = product.stock == null ? 0 : product.stock;
            if (stock < e.getValue()) {
                return ResponseEntity.status(409).body(Map.of("error",
                        product.name + " has only " + stock + " left in stock"));
            }
            reserved.put(product, e.getValue());
        }
        reserved.forEach((product, quantity) -> product.stock -= quantity);
        order.id = null;
        order.userId = user.getSubject();
        return ResponseEntity.status(201).body(orders.save(order));
    }

    @GetMapping("/orders")
    public List<CustomerOrder> myOrders(@AuthenticationPrincipal Jwt user) {
        return orders.findByUserIdOrderByOrderDateAsc(user.getSubject());
    }

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@RequestBody ContactMessage message) {
        if (!hasText(message.name) || !hasText(message.email) || !hasText(message.message)) {
            return badRequest("Name, email and message are required");
        }
        if (message.name.length() > 100 || message.email.length() > 200 || message.message.length() > 2000) {
            return badRequest("Message is too long");
        }
        message.id = null;
        message.createdAt = Instant.now().toString();
        return ResponseEntity.status(201).body(messages.save(message));
    }

    @PostMapping("/newsletter")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").trim().toLowerCase();
        if (!email.matches("[^@\\s]+@[^@\\s]+\\.[^@\\s]+") || email.length() > 200) {
            return badRequest("Enter a valid email address");
        }
        if (!subscribers.existsByEmail(email)) {
            Subscriber subscriber = new Subscriber();
            subscriber.email = email;
            subscriber.createdAt = Instant.now().toString();
            subscribers.save(subscriber);
        }
        return ResponseEntity.ok(Map.of("message", "Subscribed"));
    }

    private static ResponseEntity<Map<String, String>> badRequest(String error) {
        return ResponseEntity.badRequest().body(Map.of("error", error));
    }
}
