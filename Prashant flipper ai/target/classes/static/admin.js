const API_BASE_URL = 'http://localhost:8080/api';

let projectCropper = null;
let clientCropper = null;
let currentCropType = null;
let currentImageFile = null;

document.addEventListener('DOMContentLoaded', function() {
    checkApiConnection();
    setupTabs();
    setupImageUploads();
    setupProjectForm();
    setupClientForm();
    setupCropModal();
    loadAllData();
});

function checkApiConnection() {
    fetch(`${API_BASE_URL}/health`)
        .then(response => {
            if (!response.ok) {
                showMessage('Warning: API connection issue detected', 'error');
            }
        })
        .catch(error => {
            showMessage('Cannot connect to backend API. Please ensure the server is running.', 'error');
        });
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${targetTab}Tab`).classList.add('active');
            
            if (targetTab === 'contacts') {
                loadContacts();
            } else if (targetTab === 'newsletters') {
                loadNewsletters();
            }
        });
    });
}

function setupImageUploads() {
    const projectFileInput = document.getElementById('projectImageFile');
    const clientFileInput = document.getElementById('clientImageFile');
    const projectCropBtn = document.getElementById('projectCropBtn');
    const clientCropBtn = document.getElementById('clientCropBtn');
    
    if (projectFileInput) {
        projectFileInput.addEventListener('change', function(e) {
            handleImageSelect(e.target.files[0], 'project');
        });
    }
    
    if (clientFileInput) {
        clientFileInput.addEventListener('change', function(e) {
            handleImageSelect(e.target.files[0], 'client');
        });
    }
    
    if (projectCropBtn) {
        projectCropBtn.addEventListener('click', function() {
            const previewImg = document.getElementById('projectImagePreviewImg');
            if (previewImg && previewImg.src) {
                showCropModal(previewImg.src);
                currentCropType = 'project';
            }
        });
    }
    
    if (clientCropBtn) {
        clientCropBtn.addEventListener('click', function() {
            const previewImg = document.getElementById('clientImagePreviewImg');
            if (previewImg && previewImg.src) {
                showCropModal(previewImg.src);
                currentCropType = 'client';
            }
        });
    }
}

function handleImageSelect(file, type) {
    if (!file || !file.type.startsWith('image/')) {
        showMessage('Please select a valid image file', 'error');
        return;
    }
    
    currentImageFile = file;
    currentCropType = type;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewId = type === 'project' ? 'projectImagePreviewImg' : 'clientImagePreviewImg';
        const previewContainerId = type === 'project' ? 'projectImagePreview' : 'clientImagePreview';
        
        const previewImg = document.getElementById(previewId);
        const previewContainer = document.getElementById(previewContainerId);
        
        previewImg.src = e.target.result;
        previewContainer.style.display = 'block';
        
        showCropModal(e.target.result);
    };
    reader.readAsDataURL(file);
}

function setupCropModal() {
    const modal = document.getElementById('cropModal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelCrop');
    const applyBtn = document.getElementById('applyCrop');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeCropModal();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeCropModal();
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyCrop();
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeCropModal();
        }
    });
}

function showCropModal(imageSrc) {
    const modal = document.getElementById('cropModal');
    const cropImage = document.getElementById('cropImage');
    
    cropImage.src = imageSrc;
    modal.style.display = 'block';
    
    setTimeout(() => {
        const aspectRatio = 450 / 350;
        
        if (currentCropType === 'project') {
            if (projectCropper) {
                projectCropper.destroy();
            }
            projectCropper = new Cropper(cropImage, {
                aspectRatio: aspectRatio,
                viewMode: 1,
                autoCropArea: 0.8,
                responsive: true,
                guides: true,
                center: true,
                background: true,
                modal: true,
                ready: function() {
                    this.cropper.setAspectRatio(aspectRatio);
                }
            });
        } else {
            if (clientCropper) {
                clientCropper.destroy();
            }
            const clientAspectRatio = 450 / 350;
            clientCropper = new Cropper(cropImage, {
                aspectRatio: clientAspectRatio,
                viewMode: 1,
                autoCropArea: 0.8,
                responsive: true,
                guides: true,
                center: true,
                background: true,
                modal: true,
                ready: function() {
                    this.cropper.setAspectRatio(clientAspectRatio);
                }
            });
        }
    }, 100);
}

function closeCropModal() {
    const modal = document.getElementById('cropModal');
    modal.style.display = 'none';
    
    if (projectCropper) {
        projectCropper.destroy();
        projectCropper = null;
    }
    if (clientCropper) {
        clientCropper.destroy();
        clientCropper = null;
    }
    
    currentCropType = null;
    currentImageFile = null;
}

function applyCrop() {
    let cropper = currentCropType === 'project' ? projectCropper : clientCropper;
    
    if (!cropper) {
        showMessage('Please wait for image to load', 'error');
        return;
    }
    
    const canvas = cropper.getCroppedCanvas({
        width: 450,
        height: 350,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    });
    
    if (!canvas) {
        showMessage('Error cropping image', 'error');
        return;
    }
    
    const croppedImageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    const hiddenInputId = currentCropType === 'project' ? 'projectImage' : 'clientImage';
    const previewImgId = currentCropType === 'project' ? 'projectImagePreviewImg' : 'clientImagePreviewImg';
    
    document.getElementById(hiddenInputId).value = croppedImageDataUrl;
    document.getElementById(previewImgId).src = croppedImageDataUrl;
    
    closeCropModal();
    showMessage('Image cropped successfully!', 'success');
}

function setupProjectForm() {
    const form = document.getElementById('projectForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectData = {
            name: document.getElementById('projectName').value.trim(),
            description: document.getElementById('projectDescription').value.trim(),
            imageUrl: document.getElementById('projectImage').value.trim()
        };
        
        if (!projectData.name || !projectData.description || !projectData.imageUrl) {
            showMessage('Please fill all fields and upload an image', 'error');
            return;
        }
        
        fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    let errorMessage = 'Failed to add project';
                    try {
                        const errorJson = JSON.parse(text);
                        errorMessage = errorJson.message || errorMessage;
                    } catch (e) {
                        errorMessage = text || errorMessage;
                    }
                    throw new Error(errorMessage);
                });
            }
        })
        .then(data => {
            showMessage('Project added successfully!', 'success');
            form.reset();
            document.getElementById('projectImagePreview').style.display = 'none';
            document.getElementById('projectImageFile').value = '';
            document.getElementById('projectImage').value = '';
            loadProjects();
        })
        .catch(error => {
            console.error('Error adding project:', error);
            showMessage(error.message || 'Error adding project. Please try again.', 'error');
        });
    });
}

function setupClientForm() {
    const form = document.getElementById('clientForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const clientData = {
            name: document.getElementById('clientName').value.trim(),
            description: document.getElementById('clientDescription').value.trim(),
            designation: document.getElementById('clientDesignation').value.trim(),
            imageUrl: document.getElementById('clientImage').value.trim()
        };
        
        if (!clientData.name || !clientData.description || !clientData.designation || !clientData.imageUrl) {
            showMessage('Please fill all fields and upload an image', 'error');
            return;
        }
        
        fetch(`${API_BASE_URL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    let errorMessage = 'Failed to add client';
                    try {
                        const errorJson = JSON.parse(text);
                        errorMessage = errorJson.message || errorMessage;
                    } catch (e) {
                        errorMessage = text || errorMessage;
                    }
                    throw new Error(errorMessage);
                });
            }
        })
        .then(data => {
            showMessage('Client added successfully!', 'success');
            form.reset();
            document.getElementById('clientImagePreview').style.display = 'none';
            document.getElementById('clientImageFile').value = '';
            document.getElementById('clientImage').value = '';
            loadClients();
        })
        .catch(error => {
            console.error('Error adding client:', error);
            showMessage(error.message || 'Error adding client. Please try again.', 'error');
        });
    });
}

function loadAllData() {
    loadProjects();
    loadClients();
}

function loadProjects() {
    fetch(`${API_BASE_URL}/projects`)
        .then(response => response.json())
        .then(projects => {
            const list = document.getElementById('projectsList');
            list.innerHTML = '';
            
            if (projects.length === 0) {
                list.innerHTML = '<div class="list-item"><p style="color: #666;">No projects added yet.</p></div>';
                return;
            }
            
            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div class="item-title">${project.name}</div>
                    <div class="item-text">${project.description}</div>
                    <img src="${project.imageUrl}" alt="${project.name}" class="item-image"
                         onerror="this.src='https://via.placeholder.com/100?text=Image'">
                `;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
        });
}

function loadClients() {
    fetch(`${API_BASE_URL}/clients`)
        .then(response => response.json())
        .then(clients => {
            const list = document.getElementById('clientsList');
            list.innerHTML = '';
            
            if (clients.length === 0) {
                list.innerHTML = '<div class="list-item"><p style="color: #666;">No clients added yet.</p></div>';
                return;
            }
            
            clients.forEach(client => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div class="item-title">${client.name}</div>
                    <div class="item-text"><strong>Designation:</strong> ${client.designation}</div>
                    <div class="item-text">${client.description}</div>
                    <img src="${client.imageUrl}" alt="${client.name}" class="item-image"
                         onerror="this.src='https://via.placeholder.com/100?text=Image'">
                `;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading clients:', error);
        });
}

function loadContacts() {
    fetch(`${API_BASE_URL}/contacts`)
        .then(response => response.json())
        .then(contacts => {
            const list = document.getElementById('contactsList');
            list.innerHTML = '';
            
            if (contacts.length === 0) {
                list.innerHTML = '<div class="list-item"><p style="color: #666;">No contact submissions yet.</p></div>';
                return;
            }
            
            contacts.forEach(contact => {
                const item = document.createElement('div');
                item.className = 'list-item contact-item';
                item.innerHTML = `
                    <div>
                        <div class="item-title">${contact.fullName}</div>
                        <div class="item-text"><strong>Email:</strong> ${contact.email}</div>
                    </div>
                    <div>
                        <div class="item-text"><strong>Mobile:</strong> ${contact.mobileNumber}</div>
                        <div class="item-text"><strong>City:</strong> ${contact.city}</div>
                    </div>
                `;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading contacts:', error);
            document.getElementById('contactsList').innerHTML = 
                '<div class="list-item"><p style="color: #d32f2f;">Error loading contacts.</p></div>';
        });
}

function loadNewsletters() {
    fetch(`${API_BASE_URL}/newsletter/all`)
        .then(response => response.json())
        .then(newsletters => {
            const list = document.getElementById('newslettersList');
            list.innerHTML = '';
            
            if (newsletters.length === 0) {
                list.innerHTML = '<div class="list-item"><p style="color: #666;">No newsletter subscriptions yet.</p></div>';
                return;
            }
            
            newsletters.forEach(newsletter => {
                const item = document.createElement('div');
                item.className = 'newsletter-item';
                item.textContent = newsletter.email;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading newsletters:', error);
            document.getElementById('newslettersList').innerHTML = 
                '<div class="list-item"><p style="color: #d32f2f;">Error loading newsletters.</p></div>';
        });
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const adminContainer = document.querySelector('.admin-container');
    if (adminContainer) {
        adminContainer.insertBefore(messageDiv, adminContainer.firstChild);
    }
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
