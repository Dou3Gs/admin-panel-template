// Users Page JavaScript

// Sample user data
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
        joined: '2023-01-15',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-02-20',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'Moderator',
        status: 'Inactive',
        joined: '2023-03-10',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-04-05',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-05-12',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 6,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'Admin',
        status: 'Active',
        joined: '2023-06-18',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 7,
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        role: 'User',
        status: 'Inactive',
        joined: '2023-07-22',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        role: 'Moderator',
        status: 'Active',
        joined: '2023-08-30',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 9,
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-09-14',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 10,
        name: 'Amanda Martinez',
        email: 'amanda.martinez@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-10-08',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
];

let currentPage = 1;
let itemsPerPage = 10;
let filteredUsers = [...users];

// Initialize users page
document.addEventListener('DOMContentLoaded', function() {
    initializeUsersTable();
    initializeUserSearch();
    initializeAddUserModal();
    initializePagination();
});

// Initialize users table
function initializeUsersTable() {
    renderUsersTable();
}

// Render users table
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageUsers = filteredUsers.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageUsers.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <img class="h-10 w-10 rounded-full" src="${user.avatar}" alt="${user.name}">
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${user.name}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">ID: ${user.id}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">${user.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    user.role === 'Moderator' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }">
                    ${user.role}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                }">
                    ${user.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${formatDate(user.joined)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                    <button onclick="editUser(${user.id})" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" data-tooltip="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="viewUser(${user.id})" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" data-tooltip="View Profile">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" data-tooltip="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    updatePaginationInfo();
}

// Initialize user search
function initializeUserSearch() {
    const searchInput = document.getElementById('userSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterUsers(query);
        });
    }
}

// Filter users based on search query
function filterUsers(query) {
    if (query.trim() === '') {
        filteredUsers = [...users];
    } else {
        filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query) ||
            user.status.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    renderUsersTable();
    updatePaginationInfo();
}

// Initialize add user modal
function initializeAddUserModal() {
    const addUserBtn = document.getElementById('addUserBtn');
    const modal = document.getElementById('addUserModal');
    const form = document.getElementById('addUserForm');
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            addNewUser(form);
        });
    }
}

// Add new user
function addNewUser(form) {
    const formData = new FormData(form);
    const newUser = {
        id: users.length + 1,
        name: formData.get('fullName'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: 'Active',
        joined: new Date().toISOString().split('T')[0],
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&v=${Date.now()}`
    };
    
    users.unshift(newUser);
    filteredUsers = [...users];
    
    // Close modal
    document.getElementById('addUserModal').classList.add('hidden');
    form.reset();
    
    // Re-render table
    currentPage = 1;
    renderUsersTable();
    
    // Show success notification
    if (typeof showNotification === 'function') {
        showNotification('Success', 'User added successfully', 'success');
    }
}

// Initialize pagination
function initializePagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderUsersTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxPages = Math.ceil(filteredUsers.length / itemsPerPage);
            if (currentPage < maxPages) {
                currentPage++;
                renderUsersTable();
            }
        });
    }
}

// Update pagination info
function updatePaginationInfo() {
    const startRange = document.getElementById('startRange');
    const endRange = document.getElementById('endRange');
    const totalUsers = document.getElementById('totalUsers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length);
    const maxPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    if (startRange) startRange.textContent = startIndex;
    if (endRange) endRange.textContent = endIndex;
    if (totalUsers) totalUsers.textContent = filteredUsers.length;
    
    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.classList.toggle('opacity-50', currentPage === 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === maxPages;
        nextBtn.classList.toggle('opacity-50', currentPage === maxPages);
    }
}

// User actions
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        if (typeof showNotification === 'function') {
            showNotification('Info', `Edit user: ${user.name}`, 'info');
        }
        // In a real app, this would open an edit modal
        console.log('Edit user:', user);
    }
}

function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        if (typeof showNotification === 'function') {
            showNotification('Info', `View profile: ${user.name}`, 'info');
        }
        // In a real app, this would open a profile view
        console.log('View user:', user);
    }
}

function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            const userIndex = users.findIndex(u => u.id === userId);
            users.splice(userIndex, 1);
            filteredUsers = [...users];
            
            // Re-render table
            if (currentPage > Math.ceil(filteredUsers.length / itemsPerPage)) {
                currentPage = Math.ceil(filteredUsers.length / itemsPerPage);
            }
            renderUsersTable();
            
            if (typeof showNotification === 'function') {
                showNotification('Success', 'User deleted successfully', 'success');
            }
        }
    }
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export users data
function exportUsers(format = 'csv') {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined'];
    const data = filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.joined
    ]);
    
    if (format === 'csv') {
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
    }
    
    if (typeof showNotification === 'function') {
        showNotification('Success', 'Users exported successfully', 'success');
    }
}

// Bulk actions
function bulkDeleteUsers() {
    const selectedUsers = getSelectedUsers();
    if (selectedUsers.length === 0) {
        if (typeof showNotification === 'function') {
            showNotification('Warning', 'Please select users to delete', 'error');
        }
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
        selectedUsers.forEach(userId => {
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
            }
        });
        
        filteredUsers = [...users];
        renderUsersTable();
        
        if (typeof showNotification === 'function') {
            showNotification('Success', `${selectedUsers.length} users deleted successfully`, 'success');
        }
    }
}

function getSelectedUsers() {
    // This would get selected users from checkboxes
    // For now, return empty array
    return [];
} 