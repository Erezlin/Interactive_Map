package com.example.marketplace.Repository;

import com.example.marketplace.Object.Categories;
import com.example.marketplace.Object.Markers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface MarkersRepository extends JpaRepository<Markers, Integer> {
    ArrayList<Markers> findAllByStatus(Integer status);

}
