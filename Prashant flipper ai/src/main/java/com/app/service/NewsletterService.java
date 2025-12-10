package com.app.service;

import com.app.entity.Newsletter;
import com.app.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterService {
    
    @Autowired
    private NewsletterRepository newsletterRepository;
    
    public Newsletter subscribe(String email) {
        Optional<Newsletter> existing = newsletterRepository.findByEmail(email);
        if (existing.isPresent()) {
            return existing.get();
        }
        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(email);
        return newsletterRepository.save(newsletter);
    }
    
    public List<Newsletter> getAllSubscriptions() {
        return newsletterRepository.findAllByOrderByCreatedAtDesc();
    }
}

