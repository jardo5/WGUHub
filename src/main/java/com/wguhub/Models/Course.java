package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(nullable = false)
    private Integer course_credits;

    @ManyToMany(mappedBy = "courses")
    @JsonBackReference
    private Set<Degree> degrees = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @JsonBackReference
    private Set<Review> reviews = new HashSet<>();
}