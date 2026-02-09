import React, { useState, useEffect } from 'react';
import { createRecord, updateRecord } from '../../services/recordService';
import { Card, Button, Input } from '../ui';
import { X, Save, Loader2, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const RecordForm = ({ currentRecord, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Employee',
        status: 'Active'
    });
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentRecord) {
            setFormData({
                name: currentRecord.name || '',
                email: currentRecord.email || '',
                role: currentRecord.role || 'Employee',
                status: currentRecord.status || 'Active'
            });

            const today = new Date().toISOString().split('T')[0];
            if (currentRecord.lastAttendanceDate === today) {
                setAttendanceStatus(currentRecord.lastAttendanceStatus);
            } else {
                setAttendanceStatus('');
            }
        }
    }, [currentRecord]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const today = new Date().toISOString().split('T')[0];

        try {
            if (currentRecord) {
                // Update existing
                const updates = { ...formData };
                const oldStatus = currentRecord.lastAttendanceDate === today ? currentRecord.lastAttendanceStatus : null;

                if (attendanceStatus && attendanceStatus !== oldStatus) {
                    updates.lastAttendanceDate = today;
                    updates.lastAttendanceStatus = attendanceStatus;
                    updates.attendanceHistory = { ...(currentRecord.attendanceHistory || {}), [today]: attendanceStatus };
                    updates.stats = { ...(currentRecord.stats || {}) };

                    const statKey = attendanceStatus.toLowerCase().replace(/\s+/g, '_');
                    updates.stats[statKey] = (updates.stats[statKey] || 0) + 1;

                    if (oldStatus) {
                        const oldStatKey = oldStatus.toLowerCase().replace(/\s+/g, '_');
                        updates.stats[oldStatKey] = Math.max(0, (updates.stats[oldStatKey] || 0) - 1);
                    }
                }

                await updateRecord(currentRecord.id, updates);
                toast.success("Record updated successfully");
            } else {
                // Create new
                const newRecord = {
                    ...formData,
                    stats: {},
                    attendanceHistory: {}
                };

                if (attendanceStatus) {
                    newRecord.lastAttendanceDate = today;
                    newRecord.lastAttendanceStatus = attendanceStatus;
                    newRecord.attendanceHistory[today] = attendanceStatus;
                    const statKey = attendanceStatus.toLowerCase().replace(/\s+/g, '_');
                    newRecord.stats[statKey] = 1;
                }

                await createRecord(newRecord);
                toast.success("Record added successfully");
            }
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.message || "An error occurred");
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <Card className="modal-content animate-fade-in">
                <div className="modal-header">
                    <h2>{currentRecord ? 'Edit Record' : 'Add New Record'}</h2>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name"
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email"
                        required
                    />

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Role</label>
                            <select
                                className="input-field"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Status</label>
                            <select
                                className="input-field"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} /> Mark Today's Attendance
                        </label>
                        <select
                            className="input-field"
                            value={attendanceStatus}
                            onChange={(e) => setAttendanceStatus(e.target.value)}
                            style={{
                                borderColor: attendanceStatus ? 'var(--primary)' : '',
                                background: attendanceStatus ? 'var(--bg-secondary)' : ''
                            }}
                        >
                            <option value="">Select Status (Not Marked)</option>
                            <option value="Present">Present</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Work From Home">Work From Home</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Paid Leave">Paid Leave</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> {currentRecord ? 'Update' : 'Save'}</>}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RecordForm;
