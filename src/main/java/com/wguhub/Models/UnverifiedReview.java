package com.wguhub.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "unverified_review")
public class UnverifiedReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_rating")
    private Integer reviewRating;

    @Column(name = "review_difficulty")
    private Integer reviewDifficulty;

    @Column(name = "review_workload")
    private Integer reviewWorkload;

    @Column(name = "review_text", columnDefinition = "text")
    private String reviewText;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "token_creation_time")
    private LocalDateTime tokenCreationTime;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference
    private Course course;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}


