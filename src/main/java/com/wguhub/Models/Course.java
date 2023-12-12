package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    @Column(name = "course_code", nullable = false)
    private String courseCode; // FK

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "course_description")
    private String courseDescription;

    @Column(name = "course_credits")
    private int courseCredits;

    @Column(name = "course_college")
    private String courseCollege;

    @Column(name = "course_associated_degrees")
    private String courseAssociatedDegrees;
}
