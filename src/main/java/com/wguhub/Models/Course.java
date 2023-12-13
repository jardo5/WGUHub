package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int course_id;

    @Column(nullable = false)
    private String course_code;

    @Column(nullable = false)
    private String course_name;

    @Column(columnDefinition = "TEXT")
    private String course_description;

    @Column(nullable = false)
    private Integer course_credits;

    @Column(nullable = false)
    private Integer course_degree;

    @ManyToMany(mappedBy = "courses")
    private Set<Degree> degrees = new HashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Review> reviews = new HashSet<>();
}