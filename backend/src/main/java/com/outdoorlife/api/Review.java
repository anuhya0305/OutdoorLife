package com.outdoorlife.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    public String productId;
    @Column(length = 100)
    public String name;
    public Integer rating;
    @Column(length = 2000)
    public String comment;
    public String date;
}
