package com.ticketmaster.identityservice.services;

import com.ticketmaster.identityservice.models.User;
import com.ticketmaster.identityservice.repositories.UserRepository;
import com.ticketmaster.identityservice.security.JwtUtil;
import com.ticketmaster.identityservice.dtos.AuthRequest;
import com.ticketmaster.identityservice.dtos.AuthResponse;
import com.ticketmaster.identityservice.dtos.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Register a new user with role NORMAL.
     * 
     * @throws IllegalStateException if email is already taken.
     */
    @Transactional
    public void register(RegisterRequest dto) {
        userRepository.findByEmail(dto.email())
                .ifPresent(u -> {
                    throw new IllegalStateException("Email already in use: " + dto.email());
                });

        User user = User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .role(dto.role())
                .build();

        userRepository.save(user);
    }

    /**
     * Authenticate credentials and return a JWT.
     * 
     * @return AuthResponse containing the JWT token.
     * @throws BadCredentialsException if authentication fails.
     */
    public AuthResponse authenticate(AuthRequest dto) {
        // this will throw BadCredentialsException on failure
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token, null);
    }
}