package com.socialnetwork.project.repository;

import com.socialnetwork.project.dto.UserDTO;
import com.socialnetwork.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users WHERE username=:username", nativeQuery = true)
    Optional<User> findByUsername(@Param("username") String username);

    @Query(value = "SELECT * FROM users WHERE email=:email", nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM users WHERE phone=:phone", nativeQuery = true)
    Optional<User> findByPhone(@Param("phone") String phone);

    @Query(value = "SELECT * FROM users " +
            "WHERE LOWER(name) LIKE %:search% " +
            "OR LOWER(surname) LIKE %:search% " +
            "OR LOWER(username) LIKE %:search% " +
            "LIMIT 10",
            nativeQuery = true)
    List<User> searchUsers(@Param("search") String search);
}
