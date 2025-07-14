// Tables Page JavaScript

// Sample table data
const tableData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', amount: 1250.00, date: '2023-12-01' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Pending', amount: 850.50, date: '2023-12-02' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', status: 'Completed', amount: 2100.00, date: '2023-12-03' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', status: 'Active', amount: 750.25, date: '2023-12-04' },
    { id: 5, name: 'David Brown', email: 'david.brown@example.com', status: 'Cancelled', amount: 1800.00, date: '2023-12-05' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', status: 'Active', amount: 950.75, date: '2023-12-06' },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@example.com', status: 'Pending', amount: 1200.00, date: '2023-12-07' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', status: 'Completed', amount: 1650.50, date: '2023-12-08' },
    { id: 9, name: 'James Wilson', email: 'james.wilson@example.com', status: 'Active', amount: 890.00, date: '2023-12-09' },
    { id: 10, name: 'Amanda Martinez', email: 'amanda.martinez@example.com', status: 'Pending', amount: 1100.25, date: '2023-12-10' },
    { id: 11, name: 'Michael Thompson', email: 'michael.thompson@example.com', status: 'Active', amount: 1350.00, date: '2023-12-11' },
    { id: 12, name: 'Jennifer Garcia', email: 'jennifer.garcia@example.com', status: 'Completed', amount: 2200.75, date: '2023-12-12' },
    { id: 13, name: 'Christopher Lee', email: 'christopher.lee@example.com', status: 'Cancelled', amount: 950.00, date: '2023-12-13' },
    { id: 14, name: 'Jessica Rodriguez', email: 'jessica.rodriguez@example.com', status: 'Active', amount: 1750.50, date: '2023-12-14' },
    { id: 15, name: 'Daniel Martinez', email: 'daniel.martinez@example.com', status: 'Pending', amount: 1400.25, date: '2023-12-15' },
    { id: 16, name: 'Ashley Hernandez', email: 'ashley.hernandez@example.com', status: 'Completed', amount: 1950.00, date: '2023-12-16' },
    { id: 17, name: 'Matthew Lopez', email: 'matthew.lopez@example.com', status: 'Active', amount: 1050.75, date: '2023-12-17' },
    { id: 18, name: 'Nicole Gonzalez', email: 'nicole.gonzalez@example.com', status: 'Pending', amount: 1600.00, date: '2023-12-18' },
    { id: 19, name: 'Andrew Perez', email: 'andrew.perez@example.com', status: 'Completed', amount: 2300.50, date: '2023-12-19' },
    { id: 20, name: 'Stephanie Torres', email: 'stephanie.torres@example.com', status: 'Active', amount: 1150.25, date: '2023-12-20' }
];

let currentTablePage = 1;
let tableItemsPerPage = 10;
let filteredTableData = [...tableData];
let currentSortColumn = '';
let currentSortDirection = 'asc';

// Initialize tables page
document.addEventListener('DOMContentLoaded', function() {
    initializeTable();
    initializeTableSearch();
    initializeTableFilters();
    initializeTableButtons();
    initializeTablePagination();
});

// Initialize table
function initializeTable() {
    renderTable();
}

// Render table
function renderTable() {
    const tbody = document.getElementById('dataTableBody');
    const startIndex = (currentTablePage - 1) * tableItemsPerPage;
    const endIndex = startIndex + tableItemsPerPage;
    const pageData = filteredTableData.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${item.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">${item.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${item.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    item.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }">
                    ${item.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$${item.amount.toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${formatDate(item.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                    <button onclick="viewItem(${item.id})" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" data-tooltip="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editItem(${item.id})" class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" data-tooltip="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteItem(${item.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" data-tooltip="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    updateTablePaginationInfo();
}

// Initialize table search
function initializeTableSearch() {
    const searchInput = document.getElementById('tableSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterTableData(query);
        });
    }
}

// Initialize table filters
function initializeTableFilters() {
    const statusFilter = document.getElementById('statusFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            const status = e.target.value;
            filterTableDataByStatus(status);
        });
    }
}

// Filter table data
function filterTableData(query) {
    if (query.trim() === '') {
        filteredTableData = [...tableData];
    } else {
        filteredTableData = tableData.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.id.toString().includes(query)
        );
    }
    
    currentTablePage = 1;
    renderTable();
    updateTablePaginationInfo();
}

// Filter table data by status
function filterTableDataByStatus(status) {
    if (status === '') {
        filteredTableData = [...tableData];
    } else {
        filteredTableData = tableData.filter(item => item.status === status);
    }
    
    currentTablePage = 1;
    renderTable();
    updateTablePaginationInfo();
}

// Initialize table buttons
function initializeTableButtons() {
    const exportBtn = document.getElementById('exportBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableData();
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshTableData();
        });
    }
}

// Initialize table pagination
function initializeTablePagination() {
    const prevBtn = document.getElementById('tablePrevPage');
    const nextBtn = document.getElementById('tableNextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentTablePage > 1) {
                currentTablePage--;
                renderTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxPages = Math.ceil(filteredTableData.length / tableItemsPerPage);
            if (currentTablePage < maxPages) {
                currentTablePage++;
                renderTable();
            }
        });
    }
}

// Update table pagination info
function updateTablePaginationInfo() {
    const startRange = document.getElementById('tableStartRange');
    const endRange = document.getElementById('tableEndRange');
    const totalItems = document.getElementById('tableTotalItems');
    const prevBtn = document.getElementById('tablePrevPage');
    const nextBtn = document.getElementById('tableNextPage');
    const paginationContainer = document.getElementById('tablePagination');
    
    const startIndex = (currentTablePage - 1) * tableItemsPerPage + 1;
    const endIndex = Math.min(currentTablePage * tableItemsPerPage, filteredTableData.length);
    const maxPages = Math.ceil(filteredTableData.length / tableItemsPerPage);
    
    if (startRange) startRange.textContent = startIndex;
    if (endRange) endRange.textContent = endIndex;
    if (totalItems) totalItems.textContent = filteredTableData.length;
    
    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentTablePage === 1;
        prevBtn.classList.toggle('opacity-50', currentTablePage === 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentTablePage === maxPages;
        nextBtn.classList.toggle('opacity-50', currentTablePage === maxPages);
    }
    
    // Generate pagination buttons
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentTablePage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(maxPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.className = `px-3 py-1 text-sm rounded transition-colors ${
                i === currentTablePage 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`;
            button.textContent = i;
            button.addEventListener('click', () => {
                currentTablePage = i;
                renderTable();
            });
            paginationContainer.appendChild(button);
        }
    }
}

// Sort table
function sortTable(column) {
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    filteredTableData.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];
        
        // Handle different data types
        if (column === 'amount') {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        } else if (column === 'date') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        } else {
            aValue = aValue.toString().toLowerCase();
            bValue = bValue.toString().toLowerCase();
        }
        
        if (currentSortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
    
    // Update sort indicators
    updateSortIndicators(column);
    
    renderTable();
}

// Update sort indicators
function updateSortIndicators(activeColumn) {
    const headers = document.querySelectorAll('th[onclick]');
    
    headers.forEach(header => {
        const icon = header.querySelector('i');
        const column = header.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        if (column === activeColumn) {
            icon.className = `fas fa-sort-${currentSortDirection === 'asc' ? 'up' : 'down'} ml-1 text-blue-500`;
        } else {
            icon.className = 'fas fa-sort ml-1 text-gray-400';
        }
    });
}

// Export table data
function exportTableData() {
    const headers = ['ID', 'Name', 'Email', 'Status', 'Amount', 'Date'];
    const data = filteredTableData.map(item => [
        item.id,
        item.name,
        item.email,
        item.status,
        `$${item.amount.toFixed(2)}`,
        formatDate(item.date)
    ]);
    
    const csvContent = [headers, ...data]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    if (typeof showNotification === 'function') {
        showNotification('Success', 'Table data exported successfully', 'success');
    }
}

// Refresh table data
function refreshTableData() {
    // Simulate loading
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        const originalText = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            // Reset filters
            document.getElementById('tableSearch').value = '';
            document.getElementById('statusFilter').value = '';
            
            // Reset data
            filteredTableData = [...tableData];
            currentTablePage = 1;
            currentSortColumn = '';
            currentSortDirection = 'asc';
            
            // Re-render
            renderTable();
            
            // Reset button
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
            
            if (typeof showNotification === 'function') {
                showNotification('Success', 'Table data refreshed', 'success');
            }
        }, 1000);
    }
}

// Table item actions
function viewItem(id) {
    const item = tableData.find(i => i.id === id);
    if (item) {
        if (typeof showNotification === 'function') {
            showNotification('Info', `View details for: ${item.name}`, 'info');
        }
        console.log('View item:', item);
    }
}

function editItem(id) {
    const item = tableData.find(i => i.id === id);
    if (item) {
        if (typeof showNotification === 'function') {
            showNotification('Info', `Edit item: ${item.name}`, 'info');
        }
        console.log('Edit item:', item);
    }
}

function deleteItem(id) {
    const item = tableData.find(i => i.id === id);
    if (item) {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            const itemIndex = tableData.findIndex(i => i.id === id);
            tableData.splice(itemIndex, 1);
            
            // Update filtered data
            const filteredIndex = filteredTableData.findIndex(i => i.id === id);
            if (filteredIndex !== -1) {
                filteredTableData.splice(filteredIndex, 1);
            }
            
            // Re-render table
            if (currentTablePage > Math.ceil(filteredTableData.length / tableItemsPerPage)) {
                currentTablePage = Math.ceil(filteredTableData.length / tableItemsPerPage);
            }
            renderTable();
            
            if (typeof showNotification === 'function') {
                showNotification('Success', 'Item deleted successfully', 'success');
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