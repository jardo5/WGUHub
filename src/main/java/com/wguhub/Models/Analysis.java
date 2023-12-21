package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "analysis")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "analysis_id", nullable = false)
    private int analysisId;

    @Column(name = "analysis_rating", nullable = false)
    private Integer analysisRating;

    @Column(columnDefinition = "TEXT", name = "analysis_text", nullable = false)
    private String analysisText;

    @Column(name = "analysis_date", nullable = false)
    private Timestamp analysisDate;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}