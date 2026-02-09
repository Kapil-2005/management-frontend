// Unified Storage Service - Uses both localStorage and sessionStorage
// All data persists locally - no backend required

const KEYS = {
    EMPLOYEES: 'hrms_employees',
    ATTENDANCE: 'hrms_attendance',
    USER_SESSION: 'hrms_user_session',
    AUTH_USER: 'hrms_auth_user',
    SETTINGS: 'hrms_settings',
    REPORTS: 'hrms_reports'
};

// ==================== HELPER FUNCTIONS ====================

const getFromStorage = (key, useSession = false) => {
    try {
        const storage = useSession ? sessionStorage : localStorage;
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error reading from storage (${key}):`, error);
        return null;
    }
};

const setToStorage = (key, value, useSession = false) => {
    try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to storage (${key}):`, error);
        return false;
    }
};

const removeFromStorage = (key, useSession = false) => {
    try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from storage (${key}):`, error);
        return false;
    }
};

// ==================== INITIALIZATION ====================

const initializeSampleData = () => {
    const employees = getFromStorage(KEYS.EMPLOYEES);

    if (!employees || employees.length === 0) {
        const today = new Date().toISOString().split('T')[0];
        const sampleEmployees = [
            {
                id: '1',
                name: 'Kapil Sharma',
                email: 'kapil@example.com',
                role: 'Manager',
                status: 'Active',
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                attendanceHistory: {
                    [today]: 'Present',
                    [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 'Present',
                    [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 'Work From Home',
                }
            },
            {
                id: '2',
                name: 'Priya Singh',
                email: 'priya@example.com',
                role: 'Developer',
                status: 'Active',
                createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                attendanceHistory: {
                    [today]: 'Present',
                    [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 'Present',
                }
            },
            {
                id: '3',
                name: 'Rahul Kumar',
                email: 'rahul@example.com',
                role: 'Designer',
                status: 'Active',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                attendanceHistory: {
                    [today]: 'Half Day',
                }
            }
        ];

        setToStorage(KEYS.EMPLOYEES, sampleEmployees);
    }
};

// Initialize on load
initializeSampleData();

// ==================== EMPLOYEE OPERATIONS ====================

export const getRecords = () => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    return Promise.resolve({ data: employees });
};

export const createRecord = (employeeData) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];

    const newEmployee = {
        ...employeeData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        attendanceHistory: {}
    };

    employees.push(newEmployee);
    setToStorage(KEYS.EMPLOYEES, employees);

    return Promise.resolve({ data: newEmployee });
};

export const updateRecord = (id, employeeData) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const index = employees.findIndex(emp => emp.id === id || emp.id === String(id));

    if (index !== -1) {
        employees[index] = {
            ...employees[index],
            ...employeeData,
            id: employees[index].id
        };
        setToStorage(KEYS.EMPLOYEES, employees);
        return Promise.resolve({ data: employees[index] });
    }

    return Promise.reject(new Error('Employee not found'));
};

export const deleteRecord = (id) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const filtered = employees.filter(emp => emp.id !== id && emp.id !== String(id));

    setToStorage(KEYS.EMPLOYEES, filtered);
    return Promise.resolve({ data: { message: 'Employee deleted successfully' } });
};

// ==================== ATTENDANCE OPERATIONS ====================

export const markAttendance = (employeeId, attendanceData) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const employee = employees.find(emp => emp.id === employeeId || emp.id === String(employeeId));

    if (employee) {
        if (!employee.attendanceHistory) {
            employee.attendanceHistory = {};
        }

        const date = attendanceData.date || new Date().toISOString().split('T')[0];
        employee.attendanceHistory[date] = attendanceData.status || 'Present';

        setToStorage(KEYS.EMPLOYEES, employees);
        return Promise.resolve({ data: { message: 'Attendance marked successfully', employee } });
    }

    return Promise.reject(new Error('Employee not found'));
};

export const getAttendance = (employeeId) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const employee = employees.find(emp => emp.id === employeeId || emp.id === String(employeeId));

    if (employee) {
        return Promise.resolve({ data: employee.attendanceHistory || {} });
    }

    return Promise.reject(new Error('Employee not found'));
};

export const getAllAttendance = () => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const attendanceData = employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        attendanceHistory: emp.attendanceHistory || {}
    }));

    return Promise.resolve({ data: attendanceData });
};

// ==================== SESSION MANAGEMENT ====================

export const setUserSession = (userData) => {
    setToStorage(KEYS.USER_SESSION, userData, true); // sessionStorage
    setToStorage(KEYS.AUTH_USER, userData); // localStorage for persistence
    return Promise.resolve({ data: userData });
};

export const getUserSession = () => {
    // Try sessionStorage first, fallback to localStorage
    let user = getFromStorage(KEYS.USER_SESSION, true);
    if (!user) {
        user = getFromStorage(KEYS.AUTH_USER);
        if (user) {
            setToStorage(KEYS.USER_SESSION, user, true);
        }
    }
    return Promise.resolve({ data: user });
};

export const clearUserSession = () => {
    removeFromStorage(KEYS.USER_SESSION, true);
    removeFromStorage(KEYS.AUTH_USER);
    return Promise.resolve({ data: { message: 'Session cleared' } });
};

// ==================== SETTINGS ====================

export const getSettings = () => {
    const settings = getFromStorage(KEYS.SETTINGS) || {
        theme: 'light',
        notifications: true,
        language: 'en'
    };
    return Promise.resolve({ data: settings });
};

export const updateSettings = (newSettings) => {
    const settings = getFromStorage(KEYS.SETTINGS) || {};
    const updated = { ...settings, ...newSettings };
    setToStorage(KEYS.SETTINGS, updated);
    return Promise.resolve({ data: updated });
};

// ==================== REPORTS ====================

export const generateMonthlyReport = (month, year) => {
    const employees = getFromStorage(KEYS.EMPLOYEES) || [];
    const report = {
        month,
        year,
        totalEmployees: employees.length,
        activeEmployees: employees.filter(e => e.status === 'Active').length,
        attendanceData: {},
        generatedAt: new Date().toISOString()
    };

    employees.forEach(emp => {
        const monthlyAttendance = Object.entries(emp.attendanceHistory || {})
            .filter(([date]) => {
                const d = new Date(date);
                return d.getMonth() === month && d.getFullYear() === year;
            });

        report.attendanceData[emp.id] = {
            name: emp.name,
            totalDays: monthlyAttendance.length,
            present: monthlyAttendance.filter(([, status]) => status === 'Present').length,
            absent: monthlyAttendance.filter(([, status]) => status === 'Absent').length,
            halfDay: monthlyAttendance.filter(([, status]) => status === 'Half Day').length,
            wfh: monthlyAttendance.filter(([, status]) => status === 'Work From Home').length
        };
    });

    return Promise.resolve({ data: report });
};

// ==================== UTILITY ====================

export const clearAllData = () => {
    Object.values(KEYS).forEach(key => {
        removeFromStorage(key);
        removeFromStorage(key, true);
    });
    return Promise.resolve({ data: { message: 'All data cleared successfully' } });
};

export const exportData = () => {
    const data = {
        employees: getFromStorage(KEYS.EMPLOYEES),
        settings: getFromStorage(KEYS.SETTINGS),
        exportedAt: new Date().toISOString()
    };
    return Promise.resolve({ data });
};

export const importData = (data) => {
    if (data.employees) {
        setToStorage(KEYS.EMPLOYEES, data.employees);
    }
    if (data.settings) {
        setToStorage(KEYS.SETTINGS, data.settings);
    }
    return Promise.resolve({ data: { message: 'Data imported successfully' } });
};
