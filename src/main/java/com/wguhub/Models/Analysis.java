package com.wguhub.Models;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Analysis {
    private int analysisId; //PK
    private int classId; //FK reference to Class
    private int sentimentScore;
    private String source;
    private String extractedText;
    private Timestamp analysisDateTime;
}
