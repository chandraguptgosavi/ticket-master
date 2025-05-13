package com.ticketmaster.identityservice.controllers;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ticketmaster.identityservice.dtos.AuthRequest;
import com.ticketmaster.identityservice.dtos.AuthResponse;
import com.ticketmaster.identityservice.dtos.RegisterRequest;
import com.ticketmaster.identityservice.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private AuthService authService;

  @Autowired
  private Logger logger;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest dto) {
    try {
      authService.register(dto);
    } catch (Exception e) {
      logger.error("Registration failed for request: " + dto + " with error: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest dto) {
    AuthResponse response;
    try {
      response = authService.authenticate(dto);
    } catch (Exception e) {
      logger.error("Authentication failed for request: " + dto + " with error: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, e.getMessage()));
    }
    return ResponseEntity.ok(response);
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest req) {
    return ResponseEntity.ok().build();
  }
}
