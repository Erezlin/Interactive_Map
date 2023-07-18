package com.example.marketplace.Repository;

import com.example.marketplace.Object.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User deleteById(Long id);
    Optional<User> findById(Long id);
}
