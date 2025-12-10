const API_BASE_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', function() {
    checkApiConnection();
    loadProjects();
    loadClients();
    setupHeroForm();
    setupContactForm();
    setupNewsletterForm();
});

function checkApiConnection() {
    fetch(`${API_BASE_URL}/health`)
        .then(response => {
            if (!response.ok) {
                console.warn('API connection check failed');
            }
        })
        .catch(error => {
            console.error('Cannot connect to backend API. Make sure the server is running on port 8080.');
        });
}

function loadProjects() {
    fetch(`${API_BASE_URL}/projects`)
        .then(response => response.json())
        .then(projects => {
            const grid = document.getElementById('projectsGrid');
            grid.innerHTML = '';
            
            if (projects.length === 0) {
                grid.innerHTML = '<p style="text-align: center; color: #666;">No projects available yet.</p>';
                return;
            }
            
            projects.forEach(project => {
                const card = createProjectCard(project);
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            document.getElementById('projectsGrid').innerHTML = 
                '<p style="text-align: center; color: #d32f2f;">Error loading projects. Please try again later.</p>';
        });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.name}" class="project-image" 
             onerror="this.src='https://via.placeholder.com/400x250?text=Project+Image'">
        <div class="project-content">
            <h3 class="project-name">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <button class="btn-read-more">READ MORE</button>
        </div>
    `;
    
    return card;
}

function loadClients() {
    fetch(`${API_BASE_URL}/clients`)
        .then(response => response.json())
        .then(clients => {
            const grid = document.getElementById('clientsGrid');
            grid.innerHTML = '';
            
            if (clients.length === 0) {
                grid.innerHTML = '<p style="text-align: center; color: #666;">No clients available yet.</p>';
                return;
            }
            
            clients.forEach(client => {
                const card = createClientCard(client);
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading clients:', error);
            document.getElementById('clientsGrid').innerHTML = 
                '<p style="text-align: center; color: #d32f2f;">Error loading clients. Please try again later.</p>';
        });
}

function createClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    
    card.innerHTML = `
        <img src="${client.imageUrl}" alt="${client.name}" class="client-image"
             onerror="this.src='https://via.placeholder.com/120?text=Client'">
        <p class="client-description">${client.description}</p>
        <h3 class="client-name">${client.name}</h3>
        <p class="client-designation">${client.designation}</p>
    `;
    
    return card;
}

function setupHeroForm() {
    const form = document.getElementById('heroContactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: form.querySelector('input[type="text"]').value.trim(),
            email: form.querySelector('input[type="email"]').value.trim(),
            mobileNumber: form.querySelector('input[type="tel"]').value.trim(),
            city: 'Consultation Request'
        };
        
        fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(err.message || 'Failed to submit form');
                });
            }
        })
        .then(data => {
            alert('Thank you! We will contact you soon.');
            form.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            mobileNumber: document.getElementById('mobileNumber').value.trim(),
            city: document.getElementById('city').value.trim()
        };
        
        fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(err.message || 'Failed to submit form');
                });
            }
        })
        .then(data => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Thank you! Your message has been submitted successfully.';
            form.parentElement.insertBefore(messageDiv, form);
            form.reset();
            setTimeout(() => messageDiv.remove(), 5000);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message error';
            messageDiv.textContent = error.message || 'Error submitting form. Please try again.';
            form.parentElement.insertBefore(messageDiv, form);
            setTimeout(() => messageDiv.remove(), 5000);
        });
    });
}

function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value.trim();
        
        if (!email) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(err.message || 'Failed to subscribe');
                });
            }
        })
        .then(data => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Thank you for subscribing!';
            form.parentElement.insertBefore(messageDiv, form);
            form.reset();
            setTimeout(() => messageDiv.remove(), 5000);
        })
        .catch(error => {
            console.error('Error subscribing:', error);
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message error';
            messageDiv.textContent = error.message || 'Error subscribing. Please try again.';
            form.parentElement.insertBefore(messageDiv, form);
            setTimeout(() => messageDiv.remove(), 5000);
        });
    });
}


