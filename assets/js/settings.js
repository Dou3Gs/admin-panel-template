// Settings Page JavaScript

// Initialize settings page
document.addEventListener('DOMContentLoaded', function() {
    initializeSettingsTabs();
    initializeSettingsForms();
    initializeSettingsSaves();
});

// Initialize settings tabs
function initializeSettingsTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
                t.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');
            });
            
            tab.classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
            tab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
            
            // Show target panel
            panels.forEach(panel => {
                panel.classList.add('hidden');
                panel.classList.remove('active');
            });
            
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                targetPanel.classList.add('active');
            }
        });
    });
}

// Initialize settings forms
function initializeSettingsForms() {
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Change Photo button logic
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');
    if (changePhotoBtn && profileImageInput && profileImage) {
        changePhotoBtn.addEventListener('click', () => {
            profileImageInput.click();
        });
        profileImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    profileImage.src = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Theme radio buttons
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', handleThemeChange);
    });
    
    // Layout checkboxes
    const layoutCheckboxes = document.querySelectorAll('#appearance input[type="checkbox"]');
    layoutCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleLayoutChange);
    });
    
    // Notification checkboxes
    const notificationCheckboxes = document.querySelectorAll('#notifications input[type="checkbox"]');
    notificationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleNotificationChange);
    });
}

// Initialize settings saves
function initializeSettingsSaves() {
    // Auto-save settings on change
    const settingsInputs = document.querySelectorAll('input, select, textarea');
    
    settingsInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveSettings();
        });
    });
}

// Handle profile form submission
function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const bio = formData.get('bio');
    const location = formData.get('location');
    
    // Validation
    if (!firstName || !lastName || !email) {
        showSettingsError('Please fill in all required fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showSettingsError('Please enter a valid email address');
        return;
    }
    
    // Simulate profile update
    showSettingsLoading(e.target);
    
    setTimeout(() => {
        hideSettingsLoading(e.target);
        showSettingsSuccess('Profile updated successfully!');
        
        // Update display name in navbar
        const navbarName = document.querySelector('.flex.items-center.space-x-3 span');
        if (navbarName) {
            navbarName.textContent = `${firstName} ${lastName}`;
        }
        
        if (typeof showNotification === 'function') {
            showNotification('Success', 'Profile settings saved!', 'success');
        }
    }, 1500);
}

// Handle theme change
function handleThemeChange(e) {
    const theme = e.target.value;
    
    // Apply theme
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'auto') {
        localStorage.removeItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
    
    // Update theme toggle button
    updateThemeToggleButton();
    
    showSettingsSuccess('Theme updated successfully!');
}

// Handle layout change
function handleLayoutChange(e) {
    const setting = e.target.closest('label').querySelector('span').textContent;
    const enabled = e.target.checked;
    // Apply layout setting
    if (setting.includes('Compact sidebar')) {
        // Toggle sidebar compact mode
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('compact-sidebar', enabled);
            sidebar.classList.remove('w-16'); // Remove any old class
        }
    }
    if (setting.includes('Enable animations')) {
        if (!enabled) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
    }
    showSettingsSuccess(`${setting} ${enabled ? 'enabled' : 'disabled'}!`);
}

// Handle notification change
function handleNotificationChange(e) {
    const setting = e.target.closest('label').querySelector('.font-medium').textContent;
    const enabled = e.target.checked;
    
    showSettingsSuccess(`${setting} notifications ${enabled ? 'enabled' : 'disabled'}!`);
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        theme: document.querySelector('input[name="theme"]:checked')?.value || 'dark',
        notifications: getNotificationSettings(),
        layout: getLayoutSettings()
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Get notification settings
function getNotificationSettings() {
    const notifications = {};
    const checkboxes = document.querySelectorAll('#notifications input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.closest('label');
        const setting = label.querySelector('.font-medium').textContent;
        notifications[setting] = checkbox.checked;
    });
    
    return notifications;
}

// Get layout settings
function getLayoutSettings() {
    const layout = {};
    const checkboxes = document.querySelectorAll('#appearance input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.closest('label');
        const setting = label.querySelector('span').textContent;
        layout[setting] = checkbox.checked;
    });
    
    return layout;
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply theme
        const themeRadio = document.querySelector(`input[name="theme"][value="${settings.theme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }
        
        // Apply notification settings
        if (settings.notifications) {
            Object.entries(settings.notifications).forEach(([setting, enabled]) => {
                const checkbox = findNotificationCheckbox(setting);
                if (checkbox) {
                    checkbox.checked = enabled;
                }
            });
        }
        
        // Apply layout settings
        if (settings.layout) {
            Object.entries(settings.layout).forEach(([setting, enabled]) => {
                const checkbox = findLayoutCheckbox(setting);
                if (checkbox) {
                    checkbox.checked = enabled;
                }
                // Apply .no-animations if needed
                if (setting.includes('Enable animations')) {
                    if (!enabled) {
                        document.body.classList.add('no-animations');
                    } else {
                        document.body.classList.remove('no-animations');
                    }
                }
            });
        }
    }
}

// Find notification checkbox by setting name
function findNotificationCheckbox(setting) {
    const checkboxes = document.querySelectorAll('#notifications input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        const label = checkbox.closest('label');
        const settingName = label.querySelector('.font-medium').textContent;
        if (settingName === setting) {
            return checkbox;
        }
    }
    return null;
}

// Find layout checkbox by setting name
function findLayoutCheckbox(setting) {
    const checkboxes = document.querySelectorAll('#appearance input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        const label = checkbox.closest('label');
        const settingName = label.querySelector('span').textContent;
        if (settingName === setting) {
            return checkbox;
        }
    }
    return null;
}

// Update theme toggle button
function updateThemeToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const isDark = document.documentElement.classList.contains('dark');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (isDark) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }
}

// Show settings error
function showSettingsError(message) {
    if (typeof showNotification === 'function') {
        showNotification('Error', message, 'error');
    } else {
        alert(message);
    }
}

// Show settings success
function showSettingsSuccess(message) {
    if (typeof showNotification === 'function') {
        showNotification('Success', message, 'success');
    } else {
        alert(message);
    }
}

// Show settings loading
function showSettingsLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
    }
}

// Hide settings loading
function hideSettingsLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Changes';
    }
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export settings
function exportSettings() {
    const settings = {
        theme: document.querySelector('input[name="theme"]:checked')?.value || 'dark',
        notifications: getNotificationSettings(),
        layout: getLayoutSettings(),
        profile: getProfileData()
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kcode-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
    
    showSettingsSuccess('Settings exported successfully!');
}

// Get profile data
function getProfileData() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        const formData = new FormData(profileForm);
        return {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            bio: formData.get('bio'),
            location: formData.get('location')
        };
    }
    return {};
}

// Import settings
function importSettings(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            
            // Apply imported settings
            if (settings.theme) {
                const themeRadio = document.querySelector(`input[name="theme"][value="${settings.theme}"]`);
                if (themeRadio) {
                    themeRadio.checked = true;
                    handleThemeChange({ target: themeRadio });
                }
            }
            
            // Apply notification settings
            if (settings.notifications) {
                Object.entries(settings.notifications).forEach(([setting, enabled]) => {
                    const checkbox = findNotificationCheckbox(setting);
                    if (checkbox) {
                        checkbox.checked = enabled;
                    }
                });
            }
            
            // Apply layout settings
            if (settings.layout) {
                Object.entries(settings.layout).forEach(([setting, enabled]) => {
                    const checkbox = findLayoutCheckbox(setting);
                    if (checkbox) {
                        checkbox.checked = enabled;
                    }
                    // Apply .no-animations if needed
                    if (setting.includes('Enable animations')) {
                        if (!enabled) {
                            document.body.classList.add('no-animations');
                        } else {
                            document.body.classList.remove('no-animations');
                        }
                    }
                });
            }
            
            showSettingsSuccess('Settings imported successfully!');
        } catch (error) {
            showSettingsError('Invalid settings file');
        }
    };
    reader.readAsText(file);
}

// Load settings on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
});

// Add export/import buttons to advanced settings
document.addEventListener('DOMContentLoaded', function() {
    const advancedPanel = document.getElementById('advanced');
    if (advancedPanel) {
        const dataSection = advancedPanel.querySelector('h3:contains("Data & Privacy")');
        if (dataSection) {
            const container = dataSection.nextElementSibling;
            
            // Add export button
            const exportBtn = document.createElement('button');
            exportBtn.className = 'w-full text-left p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50';
            exportBtn.innerHTML = `
                <div class="font-medium text-gray-900 dark:text-white">Export settings</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Download your current settings</div>
            `;
            exportBtn.onclick = exportSettings;
            
            // Add import button
            const importBtn = document.createElement('button');
            importBtn.className = 'w-full text-left p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50';
            importBtn.innerHTML = `
                <div class="font-medium text-gray-900 dark:text-white">Import settings</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Upload previously exported settings</div>
            `;
            importBtn.onclick = () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    if (e.target.files[0]) {
                        importSettings(e.target.files[0]);
                    }
                };
                input.click();
            };
            
            container.appendChild(exportBtn);
            container.appendChild(importBtn);
        }
    }
}); 