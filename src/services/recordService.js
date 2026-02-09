// LocalStorage-based service for offline/development mode
// No backend required - all data stored in browser localStorage

const STORAGE_KEY = 'hrms_employees';
const ATTENDANCE_KEY = 'hrms_attendance';

// Initialize with some sample data if empty
const initializeSampleData = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        const sampleEmployees = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Developer',
                status: 'Active',
                createdAt: new Date().toISOString(),
                attendanceHistory: {}
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'Designer',
                status: 'Active',
                createdAt: new Date().toISOString(),
                attendanceHistory: {}
            }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEmployees));
    }
};

// Get all employees
export const getRecords = () => {
    initializeSampleData();
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    // Simulate API response format
    return Promise.resolve({
        data: employees
    });
};

// Create new employee
export const createRecord = (employeeData) => {
    initializeSampleData();
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    const newEmployee = {
        ...employeeData,
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString(),
        attendanceHistory: {}
    };

    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

    return Promise.resolve({
        data: newEmployee
    });
};

// Update employee
export const updateRecord = (id, employeeData) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    const index = employees.findIndex(emp => emp.id === id || emp.id === parseInt(id));
    if (index !== -1) {
        employees[index] = {
            ...employees[index],
            ...employeeData,
            id: employees[index].id // Keep original ID
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

        return Promise.resolve({
            data: employees[index]
        });
    }

    return Promise.reject(new Error('Employee not found'));
};

// Delete employee
export const deleteRecord = (id) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    const filtered = employees.filter(emp => emp.id !== id && emp.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    return Promise.resolve({
        data: { message: 'Employee deleted successfully' }
    });
};

// Mark attendance
export const markAttendance = (employeeId, attendanceData) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    const employee = employees.find(emp => emp.id === employeeId || emp.id === parseInt(employeeId));
    if (employee) {
        if (!employee.attendanceHistory) {
            employee.attendanceHistory = {};
        }

        const date = attendanceData.date || new Date().toISOString().split('T')[0];
        employee.attendanceHistory[date] = attendanceData.status || 'Present';

        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

        return Promise.resolve({
            data: { message: 'Attendance marked successfully', employee }
        });
    }

    return Promise.reject(new Error('Employee not found'));
};

// Get attendance for a specific employee
export const getAttendance = (employeeId) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];

    const employee = employees.find(emp => emp.id === employeeId || emp.id === parseInt(employeeId));
    if (employee) {
        return Promise.resolve({
            data: employee.attendanceHistory || {}
        });
    }

    return Promise.reject(new Error('Employee not found'));
};

// Clear all data (for testing)
export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ATTENDANCE_KEY);
    return Promise.resolve({ data: { message: 'All data cleared' } });
};
