package com.ticketmaster.identityservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ticketmaster.identityservice.models.User;
import com.ticketmaster.identityservice.repositories.UserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepo;

  @Override
  public UserDetails loadUserByUsername(String email) {
    User user = userRepo.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Not found"));
    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
  }
}
