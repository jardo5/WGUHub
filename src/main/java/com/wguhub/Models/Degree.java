package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(name = "degree_id", nullable = false)
    private int degreeId;

    @Column(name = "degree_name", nullable = false)
    private String degreeName;

    @ManyToMany
    @JoinTable(
            name = "course_degree",
            joinColumns = @JoinColumn(name = "degree_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonManagedReference
    private Set<Course> courses = new HashSet<>();
}
