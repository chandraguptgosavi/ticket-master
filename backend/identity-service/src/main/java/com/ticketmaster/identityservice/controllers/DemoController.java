package com.ticketmaster.identityservice.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class DemoController {
    @GetMapping("/demo")
    public String getDemo() {
        return new String("Demo normal user ");
    }

    @GetMapping("/admin")
    public String getAdminDemo() {
        return new String("Demo admin user");
    }
}
