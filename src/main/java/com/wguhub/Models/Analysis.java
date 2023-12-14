package com.wguhub.Models;

import java.sql.Timestamp;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "analysis")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int analysis_id;

    @Column(nullable = false)
    private Integer analysis_rating;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String analysis_text;

    @Column(nullable = false)
    private Timestamp analysis_date;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}