package com.app.service;

import com.app.entity.Contact;
import com.app.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }
    
    public List<Contact> getAllContacts() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }
}

