package com.outdoorlife.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    public StoreController(ProductRepository products, ReviewRepository reviews, OrderRepository orders) {
        this.products = products;
        this.reviews = reviews;
        this.orders = orders;
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
            return ResponseEntity.badRequest().body(Map.of("error", "Name, comment and a 1-5 rating are required"));
        }
        review.id = null;
        return ResponseEntity.status(201).body(reviews.save(review));
    }

    // ponytail: userId is trusted from the client, add JWT auth when orders need real protection
    @PostMapping("/orders")
    public ResponseEntity<?> placeOrder(@RequestBody CustomerOrder order) {
        if (!hasText(order.userId) || order.items == null || order.items.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "An order needs a user and at least one item"));
        }
        order.id = null;
        return ResponseEntity.status(201).body(orders.save(order));
    }

    @GetMapping("/orders")
    public List<CustomerOrder> orders(@RequestParam String userId) {
        return orders.findByUserIdOrderByOrderDateAsc(userId);
    }
}
