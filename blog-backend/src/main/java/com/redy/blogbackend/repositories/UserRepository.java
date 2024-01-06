package com.redy.blogbackend.repositories;

import com.redy.blogbackend.controllers.dto.UserInfoResponse;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.entities.projections.ListUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u from User u ORDER BY u.id DESC")
    List<ListUser> listUsers();
}
