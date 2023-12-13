package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "degree")
public class Degree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int degree_id;

    @Column(nullable = false, length = 255)
    private String degree_name;

    @ManyToMany
    @JoinTable(
            name = "course_degree",
            joinColumns = @JoinColumn(name = "degree_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}
