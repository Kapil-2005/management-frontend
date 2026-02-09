import API from '../api';

export const getRecords = () => API.get('/employees/');
export const createRecord = (data) => API.post('/employees/', data);
export const updateRecord = (id, data) => API.put(`/employees/${id}/`, data); // or patch if backend supports it
export const deleteRecord = (id) => API.delete(`/employees/${id}/`);
