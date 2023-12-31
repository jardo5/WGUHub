package com.wguhub.Repository;

import com.wguhub.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserEmail(String email);


    Optional<User> findByUserName(String username);
}
