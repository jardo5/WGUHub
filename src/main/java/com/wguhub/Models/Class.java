package com.wguhub.Models;

import lombok.Data;

@Data
public class Class {
    private int classId; //PK
    private String className;
    private String classDescription;
    private int classCredits;
    private String classCollege;
    private String classAssociatedDegrees;
}
