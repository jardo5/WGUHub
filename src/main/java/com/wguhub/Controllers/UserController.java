package com.wguhub.Controllers;


import com.wguhub.Configurations.JwtUtil;
import com.wguhub.DTOs.UserLoginDTO;
import com.wguhub.Models.User;
import com.wguhub.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody UserLoginDTO userLoginDTO) {
        User authenticatedUser = userService.authenticateUser(userLoginDTO.getUsername(), userLoginDTO.getPassword());
        if (authenticatedUser != null) {
            String role = authenticatedUser.getUserRole();
            String token = jwtUtil.generateToken(userLoginDTO.getUsername(), role); // Use the autowired instance
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials or not an admin");
        }
    }

}
