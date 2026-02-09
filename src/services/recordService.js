// Record Service - Wrapper around storageService for backward compatibility
// All operations use localStorage/sessionStorage - no backend required

import * as storageService from './storageService';

// Re-export all storage service functions
export const getRecords = storageService.getRecords;
export const createRecord = storageService.createRecord;
export const updateRecord = storageService.updateRecord;
export const deleteRecord = storageService.deleteRecord;
export const markAttendance = storageService.markAttendance;
export const getAttendance = storageService.getAttendance;
export const getAllAttendance = storageService.getAllAttendance;

// Additional exports
export const generateMonthlyReport = storageService.generateMonthlyReport;
export const clearAllData = storageService.clearAllData;
export const exportData = storageService.exportData;
export const importData = storageService.importData;
