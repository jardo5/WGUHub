package com.wguhub.Models;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Review {
    private int reviewId; //PK
    private int classId; //FK reference to Class
    private int userId; //FK reference to User
    private int reviewRating;
    private int reviewDifficulty;
    private int reviewWorkload;
    private Timestamp reviewDateTime;
    private String reviewDescription;
}