package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    @Column(nullable = false, unique = true)
    private String user_name;

    @Column(nullable = false, unique = true)
    private String user_email;

    @Column(nullable = false)
    private String user_password;

    @OneToMany(mappedBy = "user")
    private Set<Review> reviews = new HashSet<>();
}