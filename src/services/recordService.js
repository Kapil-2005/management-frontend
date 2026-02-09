import API from '../api';

// Employee CRUD
export const getRecords = () => API.get('/employees');
export const createRecord = (data) => API.post('/employees', data);
export const updateRecord = (id, data) => API.put(`/employees/${id}`, data);
export const deleteRecord = (id) => API.delete(`/employees/${id}`);

// Attendance
export const markAttendance = (employeeId, status, date) =>
    API.post('/attendance/mark', { employeeId, status, date });

export const getAttendance = (employeeId) =>
    API.get(`/attendance/${employeeId}`);

// Monthly Report
export const generateMonthlyReport = (month, year) =>
    API.get(`/attendance/report?month=${month}&year=${year}`); // We'll add this to backend next
