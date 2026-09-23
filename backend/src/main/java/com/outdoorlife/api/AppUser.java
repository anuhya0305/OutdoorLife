package com.outdoorlife.api;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    public String name;
    @Column(unique = true, nullable = false)
    public String email;
    @JsonIgnore
    @Column(nullable = false)
    public String password;
}
