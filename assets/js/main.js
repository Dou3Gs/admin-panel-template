// Kcode Admin Panel - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeCharts();
    initializeSearch();
    initializeNotifications();
    initializeModals();
    initializeTooltips();
    applySidebarSetting();
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }
});

function applySidebarSetting() {
    const sidebar = document.getElementById('sidebar');
    const savedSettings = localStorage.getItem('userSettings');
    if (sidebar && savedSettings) {
        const settings = JSON.parse(savedSettings);
        const compact = settings.layout && settings.layout['Compact sidebar'];
        sidebar.classList.toggle('compact-sidebar', !!compact);
        sidebar.classList.remove('w-16'); // Clean up old class if present
    }
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    } else {
        html.classList.toggle('dark', systemPrefersDark);
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update charts if they exist
            updateChartsTheme();
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.classList.toggle('dark', e.matches);
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && 
                !sidebar.contains(e.target) && 
                !mobileMenuButton.contains(e.target)) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    }
}

// Charts Initialization
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#64748b'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#64748b'
                        }
                    }
                }
            }
        });
        
        // Store chart reference for theme updates
        window.revenueChart = revenueChart;
    }
    
    // Users Chart
    const usersCtx = document.getElementById('usersChart');
    if (usersCtx) {
        const usersChart = new Chart(usersCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#64748b'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#64748b'
                        }
                    }
                }
            }
        });
        
        // Store chart reference for theme updates
        window.usersChart = usersChart;
    }
}

// Update charts theme
function updateChartsTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#e2e8f0' : '#64748b';
    
    if (window.revenueChart) {
        window.revenueChart.options.scales.y.ticks.color = textColor;
        window.revenueChart.options.scales.x.ticks.color = textColor;
        window.revenueChart.update();
    }
    
    if (window.usersChart) {
        window.usersChart.options.scales.y.ticks.color = textColor;
        window.usersChart.options.scales.x.ticks.color = textColor;
        window.usersChart.update();
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Add search functionality here
            console.log('Searching for:', query);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Handle search submission
                console.log('Search submitted:', e.target.value);
            }
        });
    }
}

// Notification Service
class NotificationService {
    constructor() {
        this.settings = this.loadNotificationSettings();
        // If browser notifications are denied, force setting off and save
        if (typeof Notification !== 'undefined' && Notification.permission === 'denied' && this.settings.browser) {
            this.settings.browser = false;
            this.saveNotificationSettings();
        }
        this.notifications = [
            {
                id: 1,
                title: 'New User Registration',
                message: 'John Smith has joined the platform',
                type: 'info',
                time: new Date(Date.now() - 5 * 60 * 1000),
                read: false
            },
            {
                id: 2,
                title: 'System Update',
                message: 'Dashboard has been updated to version 2.1',
                type: 'success',
                time: new Date(Date.now() - 15 * 60 * 1000),
                read: false
            },
            {
                id: 3,
                title: 'Security Alert',
                message: 'Unusual login activity detected',
                type: 'error',
                time: new Date(Date.now() - 30 * 60 * 1000),
                read: true
            }
        ];
        this.init();
    }

    init() {
        this.createNotificationPanel();
        this.updateNotificationBadge();
        this.startSimulation();
        this.requestNotificationPermission();
    }

    loadNotificationSettings() {
        const saved = localStorage.getItem('notificationSettings');
        let settings = saved ? JSON.parse(saved) : {
            sound: true,
            browser: false,
            email: true,
            autoMarkRead: false
        };
        // If browser permission is denied, force browser setting off
        if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
            settings.browser = false;
        }
        return settings;
    }

    saveNotificationSettings() {
        localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    }

    async requestNotificationPermission() {
        if ('Notification' in window && this.settings.browser) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Browser notifications enabled');
            }
        }
    }

    addNotification(title, message, type = 'info') {
        const notification = {
            id: Date.now(),
            title,
            message,
            type,
            time: new Date(),
            read: false
        };

        this.notifications.unshift(notification);
        this.updateNotificationBadge();
        this.renderNotifications();
        this.playNotificationSound();
        this.showBrowserNotification(notification);
        this.showToastNotification(notification);
    }

    playNotificationSound() {
        if (this.settings.sound) {
            // Create a simple notification sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    }

    showBrowserNotification(notification) {
        // Only send browser notifications if setting is ON and permission is granted
        if (this.settings.browser && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'kcode-admin'
            });
        }
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 glass-card p-4 max-w-sm slide-in`;
        toast.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)} text-${this.getNotificationColor(notification.type)}"></i>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">${notification.title}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${notification.message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'fixed top-16 right-4 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50 hidden';
        panel.innerHTML = `
            <div class="p-4 border-b border-gray-200 dark:border-slate-700">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <div class="flex items-center space-x-2">
                        <button id="notificationSettings" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button id="markAllRead" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Mark all read
                        </button>
                    </div>
                </div>
            </div>
            <div id="notificationList" class="max-h-96 overflow-y-auto">
                <!-- Notifications will be populated here -->
            </div>
            <div class="p-4 border-t border-gray-200 dark:border-slate-700">
                <button id="viewAllNotifications" class="w-full text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    View all notifications
                </button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add event listeners
        document.getElementById('markAllRead').addEventListener('click', () => this.markAllRead());
        document.getElementById('viewAllNotifications').addEventListener('click', () => this.viewAll());
        document.getElementById('notificationSettings').addEventListener('click', () => this.showSettings());
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !e.target.closest('#notificationBtn')) {
                panel.classList.add('hidden');
            }
        });
        
        this.renderNotifications();
    }

    togglePanel() {
        const panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.renderNotifications();
            }
        }
    }

    renderNotifications() {
        const list = document.getElementById('notificationList');
        if (!list) return;
        
        if (this.notifications.length === 0) {
            list.innerHTML = `
                <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                    <i class="fas fa-bell-slash text-2xl mb-2"></i>
                    <p>No notifications</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = this.notifications
            .slice(0, 5)
            .map(notification => `
                <div class="p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}" 
                     onclick="notificationService.markRead(${notification.id})">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <i class="fas fa-${this.getNotificationIcon(notification.type)} text-${this.getNotificationColor(notification.type)}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">${notification.title}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${notification.message}</p>
                            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">${this.formatTime(notification.time)}</p>
                        </div>
                        ${!notification.read ? '<div class="w-2 h-2 bg-blue-500 rounded-full"></div>' : ''}
                    </div>
                </div>
            `).join('');
    }

    markRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateNotificationBadge();
            this.renderNotifications();
        }
    }

    markAllRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateNotificationBadge();
        this.renderNotifications();
    }

    viewAll() {
        this.showToastNotification({
            title: 'Info',
            message: 'Notifications page coming soon!',
            type: 'info'
        });
        document.getElementById('notificationPanel').classList.add('hidden');
    }

    async updateSetting(key, value) {
        if (key === 'browser') {
            if (value) {
                // Only request permission if not already granted/denied
                if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
                    const permission = await Notification.requestPermission();
                    if (permission === 'denied') {
                        this.settings.browser = false;
                        this.saveNotificationSettings();
                        this.showSettings('denied');
                        return;
                    }
                } else if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
                    this.settings.browser = false;
                    this.saveNotificationSettings();
                    this.showSettings('denied');
                    return;
                }
            } else {
                // User turned browser notifications off
                this.settings.browser = false;
                this.saveNotificationSettings();
                this.showSettings();
                return;
            }
        }
        this.settings[key] = value;
        this.saveNotificationSettings();
        this.showSettings();
    }

    showSettings(permissionStatus) {
        // Always reload the latest settings from localStorage and browser permission
        this.settings = this.loadNotificationSettings();
        let browserNote = '';
        let browserCheckboxAttrs = '';
        if (permissionStatus === 'denied' || (typeof Notification !== 'undefined' && Notification.permission === 'denied')) {
            browserNote = `<div class='mb-3 p-2 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs'>
                Browser notifications are blocked. To enable, change your browser settings for this site.</div>`;
            browserCheckboxAttrs = 'disabled';
        }
        const settings = `
            <div class="p-4">
                <h4 class="font-medium mb-4 text-gray-900 dark:text-white">Notification Settings</h4>
                ${browserNote}
                <div class="space-y-4">
                    <label class="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                        <input type="checkbox" ${this.settings.sound ? 'checked' : ''} onchange="notificationService.updateSetting('sound', this.checked)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <div class="ml-3">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Sound notifications</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Play sound when new notifications arrive</p>
                        </div>
                    </label>
                    <label class="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                        <input type="checkbox" ${this.settings.browser ? 'checked' : ''} ${browserCheckboxAttrs} onchange="notificationService.updateSetting('browser', this.checked)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <div class="ml-3">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Browser notifications</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Show native browser notifications</p>
                        </div>
                    </label>
                    <label class="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                        <input type="checkbox" ${this.settings.autoMarkRead ? 'checked' : ''} onchange="notificationService.updateSetting('autoMarkRead', this.checked)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <div class="ml-3">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Auto-mark as read</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Automatically mark notifications as read</p>
                        </div>
                    </label>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                    <button onclick="notificationService.renderNotifications()" class="w-full px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Back to Notifications
                    </button>
                </div>
            </div>
        `;
        // Replace notification list with settings
        const list = document.getElementById('notificationList');
        list.innerHTML = settings;
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.querySelector('#notificationBtn .absolute');
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    startSimulation() {
        // No-op: simulation removed
    }

    simulateNewNotification() {
        const types = ['info', 'success', 'warning', 'error'];
        const titles = [
            'New Message',
            'Task Completed',
            'System Alert',
            'User Activity',
            'Data Export'
        ];
        const messages = [
            'You have a new message from the support team',
            'Monthly report generation completed successfully',
            'System maintenance scheduled for tonight',
            'New user registration detected',
            'Data export completed successfully'
        ];
        
        const title = titles[Math.floor(Math.random() * titles.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        
        this.addNotification(title, message, type);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    getNotificationColor(type) {
        switch (type) {
            case 'success': return 'green-500';
            case 'error': return 'red-500';
            case 'warning': return 'yellow-500';
            default: return 'blue-500';
        }
    }

    formatTime(time) {
        const now = new Date();
        const diff = now - time;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
}

// Initialize notification service
let notificationService;

// Notifications
function initializeNotifications() {
    const notificationButton = document.getElementById('notificationBtn');
    
    if (notificationButton) {
        notificationService = new NotificationService();
        notificationButton.addEventListener('click', () => notificationService.togglePanel());
    }
}

// Modal Management
function initializeModals() {
    // Add modal functionality for buttons that need it
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
            }
        });
    });
    
    // Close modal functionality (event delegation)
    document.addEventListener('click', (e) => {
        // Find the closest .modal-close button
        const closeBtn = e.target.closest('.modal-close');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal, [id$=Modal]');
            if (modal) {
                modal.classList.add('hidden');
            }
        }
        // Close if clicking on modal backdrop
        if (e.target.classList.contains('modal-backdrop')) {
            const modal = e.target.closest('.modal, [id$=Modal]');
            if (modal) {
                modal.classList.add('hidden');
            }
        }
    });
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 10 + 'px';
            tooltip.id = 'tooltip';
            
            document.body.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.getElementById('tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Data loading simulation
function loadData() {
    // Simulate loading data
    const loadingElements = document.querySelectorAll('.loading-spinner');
    loadingElements.forEach(element => {
        element.style.display = 'inline-block';
    });
    
    setTimeout(() => {
        loadingElements.forEach(element => {
            element.style.display = 'none';
        });
        showNotification('Success', 'Data loaded successfully', 'success');
    }, 2000);
}

// Export functionality
function exportData(format = 'csv') {
    showNotification('Export', `Exporting data as ${format.toUpperCase()}...`, 'info');
    
    // Simulate export
    setTimeout(() => {
        showNotification('Success', 'Data exported successfully', 'success');
    }, 1500);
}

// Minimal user data for dashboard quick actions
window.dashboardUsers = window.dashboardUsers || [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joined: '2023-01-15'
  }
];

// Add event listeners for quick action buttons
document.addEventListener('DOMContentLoaded', function() {
    // Quick action buttons
    const addUserBtn = document.getElementById('addUserBtn');
    const exportBtn = document.getElementById('exportBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const addUserModal = document.getElementById('addUserModal');
    const addUserForm = document.getElementById('addUserForm');

    if (addUserBtn && addUserModal) {
        addUserBtn.addEventListener('click', () => {
            addUserModal.classList.remove('hidden');
        });
    }
    // Modal close logic (delegated)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.modal-close')) {
            const modal = e.target.closest('.modal, [id$=Modal]');
            if (modal) modal.classList.add('hidden');
        }
        if (e.target.classList.contains('modal-backdrop')) {
            const modal = e.target.closest('.modal, [id$=Modal]');
            if (modal) modal.classList.add('hidden');
        }
    });
    // Add user form logic
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(addUserForm);
            const newUser = {
                id: window.dashboardUsers.length + 1,
                name: formData.get('fullName'),
                email: formData.get('email'),
                role: formData.get('role'),
                status: 'Active',
                joined: new Date().toISOString().split('T')[0]
            };
            window.dashboardUsers.unshift(newUser);
            addUserModal.classList.add('hidden');
            addUserForm.reset();
            if (typeof showNotification === 'function') {
                showNotification('Success', 'User added successfully', 'success');
            }
        });
    }
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Export dashboardUsers as CSV
            const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined'];
            const data = window.dashboardUsers.map(user => [
                user.id, user.name, user.email, user.role, user.status, user.joined
            ]);
            const csvContent = [headers, ...data]
                .map(row => row.map(cell => `"${cell}"`).join(','))
                .join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.csv';
            a.click();
            window.URL.revokeObjectURL(url);
            if (typeof showNotification === 'function') {
                showNotification('Success', 'Users exported successfully', 'success');
            }
        });
    }
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search..."]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + D for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 

// Show notification toast (legacy function for compatibility)
function showNotification(title, message, type = 'info') {
    if (notificationService) {
        notificationService.addNotification(title, message, type);
    } else {
        // Fallback for when notification service is not available
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 glass-card p-4 max-w-sm slide-in`;
        toast.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-${type === 'success' ? 'check-circle text-green-500' : 
                                       type === 'error' ? 'exclamation-circle text-red-500' : 
                                       'info-circle text-blue-500'}"></i>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">${title}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
} 