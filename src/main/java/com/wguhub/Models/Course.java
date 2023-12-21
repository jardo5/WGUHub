package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
    @Column(name = "course_id", nullable = false)
    private int courseId;

    @Column(name = "course_code", nullable = false)
    private String courseCode;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "course_credits", nullable = false)
    private Integer courseCredits;

    @ManyToMany(mappedBy = "courses")
    @JsonBackReference
    @ToString.Exclude
    private Set<Degree> degrees = new HashSet<>();

    @OneToMany(mappedBy = "course")
    @JsonBackReference
    private Set<Review> reviews = new HashSet<>();
}