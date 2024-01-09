package com.example.csdf_el.repository;

import com.example.csdf_el.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public  interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String email);
}
