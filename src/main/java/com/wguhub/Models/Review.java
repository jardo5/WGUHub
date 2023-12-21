package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_rating", nullable = false)
    private Integer reviewRating;

    @Column(name = "review_difficulty", nullable = false)
    private Integer reviewDifficulty;

    @Column(name = "review_workload", nullable = false)
    private Integer reviewWorkload;

    @Column(name = "review_text", columnDefinition = "TEXT", nullable = false)
    private String reviewText;

    @Column(name = "review_date", nullable = false)
    private Timestamp reviewDate;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference
    private Course course;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}