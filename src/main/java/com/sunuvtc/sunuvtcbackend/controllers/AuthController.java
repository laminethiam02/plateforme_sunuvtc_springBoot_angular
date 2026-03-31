package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.AuthRequest;
import com.sunuvtc.sunuvtcbackend.dtos.AuthResponse;
import com.sunuvtc.sunuvtcbackend.dtos.RegisterRequest;
import com.sunuvtc.sunuvtcbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        return authService.login(authRequest);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @GetMapping("/check-username/{username}")
    public boolean checkUsername(@PathVariable String username) {
        return authService.checkUsername(username);
    }

    @GetMapping("/check-email/{email}")
    public boolean checkEmail(@PathVariable String email) {
        return authService.checkEmail(email);
    }
}


