// Forms Page JavaScript

// Initialize forms page
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializeFormValidation();
    initializeFormSubmissions();
});

// Initialize all forms
function initializeForms() {
    // Add form styling and interactions
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-blue-500');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-blue-500');
        });
        
        // Add real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

// Initialize form validation
function initializeFormValidation() {
    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            checkPasswordStrength(this);
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });
}

// Initialize form submissions
function initializeFormSubmissions() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Basic validation
    if (!email || !password) {
        showFormError('Please fill in all required fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return;
    }
    
    // Simulate login process
    showFormLoading(e.target);
    
    setTimeout(() => {
        hideFormLoading(e.target);
        showFormSuccess('Login successful! Redirecting...');
        
        // In a real app, you would redirect here
        setTimeout(() => {
            if (typeof showNotification === 'function') {
                showNotification('Success', 'Welcome back!', 'success');
            }
        }, 1000);
    }, 2000);
}

// Handle registration form submission
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showFormError('Please fill in all required fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 8) {
        showFormError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showFormError('Passwords do not match');
        return;
    }
    
    // Simulate registration process
    showFormLoading(e.target);
    
    setTimeout(() => {
        hideFormLoading(e.target);
        showFormSuccess('Account created successfully!');
        
        // Reset form
        e.target.reset();
        
        if (typeof showNotification === 'function') {
            showNotification('Success', 'Welcome to Kcode Admin Panel!', 'success');
        }
    }, 2000);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation
    if (!fullName || !email || !subject || !message) {
        showFormError('Please fill in all required fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return;
    }
    
    if (message.length < 10) {
        showFormError('Message must be at least 10 characters long');
        return;
    }
    
    // Simulate contact form submission
    showFormLoading(e.target);
    
    setTimeout(() => {
        hideFormLoading(e.target);
        showFormSuccess('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
        
        if (typeof showNotification === 'function') {
            showNotification('Success', 'Your message has been sent!', 'success');
        }
    }, 2000);
}

// Handle settings form submission
function handleSettingsSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const displayName = formData.get('displayName');
    
    // Validation
    if (!displayName) {
        showFormError('Display name is required');
        return;
    }
    
    // Simulate settings update
    showFormLoading(e.target);
    
    setTimeout(() => {
        hideFormLoading(e.target);
        showFormSuccess('Settings updated successfully!');
        
        if (typeof showNotification === 'function') {
            showNotification('Success', 'Profile settings saved!', 'success');
        }
    }, 1500);
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('border-red-500', 'border-green-500');
    removeFieldError(field);
    
    // Validate based on field type
    if (field.type === 'email' && value) {
        if (!isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
        } else {
            field.classList.add('border-green-500');
        }
    }
    
    if (field.type === 'password' && value) {
        if (value.length < 8) {
            showFieldError(field, 'Password must be at least 8 characters');
        } else {
            field.classList.add('border-green-500');
        }
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
    }
}

// Check password strength
function checkPasswordStrength(passwordField) {
    const password = passwordField.value;
    const strengthIndicator = passwordField.parentElement.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength mt-1 text-xs';
        passwordField.parentElement.appendChild(indicator);
    }
    
    const indicator = passwordField.parentElement.querySelector('.password-strength');
    
    if (!password) {
        indicator.innerHTML = '';
        return;
    }
    
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    switch (strength) {
        case 0:
        case 1:
            feedback = '<span class="text-red-500">Very Weak</span>';
            break;
        case 2:
            feedback = '<span class="text-orange-500">Weak</span>';
            break;
        case 3:
            feedback = '<span class="text-yellow-500">Fair</span>';
            break;
        case 4:
            feedback = '<span class="text-blue-500">Good</span>';
            break;
        case 5:
            feedback = '<span class="text-green-500">Strong</span>';
            break;
    }
    
    indicator.innerHTML = `Password strength: ${feedback}`;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

// Remove field error
function removeFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Show form error
function showFormError(message) {
    if (typeof showNotification === 'function') {
        showNotification('Error', message, 'error');
    } else {
        alert(message);
    }
}

// Show form success
function showFormSuccess(message) {
    if (typeof showNotification === 'function') {
        showNotification('Success', message, 'success');
    } else {
        alert(message);
    }
}

// Show form loading
function showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
    }
}

// Hide form loading
function hideFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        
        // Restore original button text based on form type
        if (form.id === 'loginForm') {
            submitBtn.textContent = 'Sign In';
        } else if (form.id === 'registerForm') {
            submitBtn.textContent = 'Create Account';
        } else if (form.id === 'contactForm') {
            submitBtn.textContent = 'Send Message';
        } else if (form.id === 'settingsForm') {
            submitBtn.textContent = 'Save Changes';
        }
    }
}

// Auto-resize textareas
function initializeTextareaAutoResize() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Initialize textarea auto-resize
document.addEventListener('DOMContentLoaded', function() {
    initializeTextareaAutoResize();
});

// File upload preview (for profile photo)
function initializeFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = input.parentElement.querySelector('img');
                    if (preview) {
                        preview.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Initialize file upload functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFileUpload();
});

// Form reset functionality
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        
        // Clear validation states
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'border-green-500');
            removeFieldError(input);
        });
        
        // Clear password strength indicators
        const strengthIndicators = form.querySelectorAll('.password-strength');
        strengthIndicators.forEach(indicator => {
            indicator.innerHTML = '';
        });
    }
}

// Add reset buttons to forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const resetBtn = document.createElement('button');
            resetBtn.type = 'button';
            resetBtn.className = 'w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-2';
            resetBtn.textContent = 'Reset Form';
            resetBtn.onclick = () => resetForm(form.id);
            
            submitBtn.parentElement.appendChild(resetBtn);
        }
    });
}); 