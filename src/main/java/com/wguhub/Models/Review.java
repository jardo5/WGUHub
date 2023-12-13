package com.wguhub.Models;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int review_id;

    @Column(nullable = false)
    private int course_id;

    @Column(nullable = false)
    private int user_id;

    @Column(nullable = false)
    private Integer review_rating;

    @Column(nullable = false)
    private Integer review_difficulty;

    @Column(nullable = false)
    private Integer review_workload;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String review_text;

    @Column(nullable = false)
    private Timestamp review_date;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

