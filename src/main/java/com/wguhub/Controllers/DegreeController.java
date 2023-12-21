package com.wguhub.Controllers;

import com.wguhub.Repository.DegreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/degrees")
public class DegreeController {

    @Autowired
    private DegreeRepository degreeRepository;


    @GetMapping("/names")
    public List<Map<String, Object>> getAllDegreeNames() {
        return degreeRepository.findAll().stream()
                .map(degree -> {
                    Map<String, Object> degreeMap = new HashMap<>();
                    degreeMap.put("degreeId", degree.getDegreeId());
                    degreeMap.put("degreeName", degree.getDegreeName());
                    return degreeMap;
                })
                .collect(Collectors.toList());
    }
}
