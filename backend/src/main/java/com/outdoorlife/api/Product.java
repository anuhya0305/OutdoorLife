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
    @Column(columnDefinition = "text")
    public String description;
    public String category;
    public Integer price;
    public Integer oldPrice;
    public Double rating;
    public Integer stock;
    public Boolean featured;
    public Boolean deal;
    public Boolean bestSeller;
    // Either a /images/... path or a base64 data URL uploaded from the admin panel.
    // ponytail: images live in the DB; move them to object storage (S3, Cloudinary) if uploads grow.
    @Column(columnDefinition = "text")
    public String image;
}
