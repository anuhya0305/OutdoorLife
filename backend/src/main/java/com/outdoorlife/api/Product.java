package com.outdoorlife.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// ponytail: public fields, these entities are plain data with no invariants to guard
@Entity
public class Product {
    @Id
    public String id;
    public String name;
    @Column(length = 1000)
    public String description;
    public String category;
    public Integer price;
    public Integer oldPrice;
    public Double rating;
    public Integer stock;
    public Boolean featured;
    public Boolean deal;
    public Boolean bestSeller;
    public String image;
}
