package com.app.controller;

import com.app.entity.Client;
import com.app.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {
    
    @Autowired
    private ClientService clientService;
    
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }
    
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        Client created = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

