package com.app.controller;

import com.app.entity.Newsletter;
import com.app.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*")
public class NewsletterController {
    
    @Autowired
    private NewsletterService newsletterService;
    
    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        newsletterService.subscribe(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Subscribed successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Newsletter>> getAllSubscriptions() {
        List<Newsletter> subscriptions = newsletterService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }
}

