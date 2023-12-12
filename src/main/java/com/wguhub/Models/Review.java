package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    @Column(name = "review_rating")
    private int reviewRating;

    @Column(name = "review_difficulty")
    private int reviewDifficulty;

    @Column(name = "review_workload")
    private int reviewWorkload;

    @Column(name = "review_date_time")
    private Timestamp reviewDateTime;

    @Column(name = "review_description")
    private String reviewDescription;
}
