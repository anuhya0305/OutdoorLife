package com.outdoorlife.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class OutdoorLifeApplication {

    public static void main(String[] args) {
        SpringApplication.run(OutdoorLifeApplication.class, args);
    }

    @Bean
    CommandLineRunner seedProducts(ProductRepository products, ObjectMapper mapper) {
        return args -> {
            if (products.count() > 0) return;
            try (InputStream in = new ClassPathResource("products.json").getInputStream()) {
                products.saveAll(List.of(mapper.readValue(in, Product[].class)));
            }
        };
    }
}
