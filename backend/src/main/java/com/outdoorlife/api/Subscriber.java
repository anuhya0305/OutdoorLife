package com.outdoorlife.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Subscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    @Column(unique = true, nullable = false, length = 200)
    public String email;
    public String createdAt;
}
