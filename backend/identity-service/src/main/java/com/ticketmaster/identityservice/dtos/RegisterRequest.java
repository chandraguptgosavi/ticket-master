package com.ticketmaster.identityservice.dtos;

import com.ticketmaster.identityservice.models.UserRole;

public record RegisterRequest(String name, String email, String password, UserRole role) {}
