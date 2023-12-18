package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false)
    private int userId;

    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @JsonIgnore
    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @JsonIgnore
    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<Review> reviews = new HashSet<>();
}