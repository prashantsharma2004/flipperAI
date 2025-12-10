package com.app.service;

import com.app.entity.Client;
import com.app.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;
    
    public List<Client> getAllClients() {
        return clientRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
}

