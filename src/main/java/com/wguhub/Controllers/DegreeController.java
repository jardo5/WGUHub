package com.wguhub.Controllers;

import com.wguhub.Repository.DegreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/api/degrees")
public class DegreeController {

    @Autowired
    private DegreeRepository degreeRepository;

}
