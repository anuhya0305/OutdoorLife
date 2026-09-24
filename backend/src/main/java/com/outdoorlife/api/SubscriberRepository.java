package com.outdoorlife.api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriberRepository extends JpaRepository<Subscriber, String> {
    boolean existsByEmail(String email);
}
