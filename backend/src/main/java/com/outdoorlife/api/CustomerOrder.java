package com.outdoorlife.api;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Entity
@Table(name = "orders")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    public String orderId;
    public String userId;
    // ponytail: address and line items stored as JSON snapshots, split into tables if they ever need querying
    @JdbcTypeCode(SqlTypes.JSON)
    public Map<String, Object> customer;
    @JdbcTypeCode(SqlTypes.JSON)
    public List<Map<String, Object>> items;
    public Double totalAmount;
    public Double discount;
    public String coupon;
    public String orderDate;
    public String paymentMethod;
    public String paymentStatus;
    public String orderStatus;
}
