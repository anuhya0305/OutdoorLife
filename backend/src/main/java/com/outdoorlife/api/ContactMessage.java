package com.outdoorlife.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    @Column(length = 100)
    public String name;
    @Column(length = 200)
    public String email;
    @Column(length = 2000)
    public String message;
    public String createdAt;
}
