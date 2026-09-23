package com.outdoorlife.api;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<CustomerOrder, String> {
    List<CustomerOrder> findByUserIdOrderByOrderDateAsc(String userId);
}
