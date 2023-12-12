package com.wguhub.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "analysis")
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int analysisId;

    @OneToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    private Course course;

    @Column(name = "sentiment_score")
    private int sentimentScore;

    @Column(name = "source")
    private String source;

    @Column(name = "extracted_text")
    private String extractedText;

    @Column(name = "analysis_date_time")
    private Timestamp analysisDateTime;
}
