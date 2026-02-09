import React, { useState, useEffect } from 'react';
import { getRecords, deleteRecord } from '../../services/recordService';
import { Card, Button } from '../ui';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Filter,
    Calendar,
    User as UserIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import './records.css';

const RecordList = ({ onEdit, onAdd, onView }) => {
    const location = useLocation();
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDate, setFilterDate] = useState('All');

    useEffect(() => {
        if (location.state?.filterStatus) {
            setFilterStatus(location.state.filterStatus);
        }
        if (location.state?.filterDate) {
            setFilterDate(location.state.filterDate);
        }
    }, [location.state]);

    const fetchData = async () => {
        try {
            const response = await getRecords();
            setRecords(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch records");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5s for updates
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await deleteRecord(id);
                setRecords(prev => prev.filter(r => r.id !== id));
                toast.success("Record deleted successfully");
            } catch (error) {
                console.error(error);
                toast.error("Error deleting record");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Present': return { background: '#dcfce7', color: '#166534', borderColor: '#22c55e' };
            case 'Half Day': return { background: '#fef3c7', color: '#92400e', borderColor: '#f59e0b' };
            case 'Work From Home': return { background: '#dbeafe', color: '#1e40af', borderColor: '#3b82f6' };
            case 'Sick Leave': return { background: '#f3e8ff', color: '#6b21a8', borderColor: '#a855f7' };
            case 'Paid Leave': return { background: '#ccfbf1', color: '#115e59', borderColor: '#14b8a6' };
            case 'Absent': return { background: '#fee2e2', color: '#991b1b', borderColor: '#ef4444' };
            default: return { background: '#f1f5f9', color: '#64748b', borderColor: '#e2e8f0' };
        }
    };

    const filteredRecords = records.filter(record => {
        const matchesSearch = (record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.email?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFilter = filterStatus === 'All' || record.status === filterStatus;

        let matchesDate = true;
        if (filterDate === 'Today') {
            const today = new Date().toISOString().split('T')[0];
            matchesDate = record.createdAt && record.createdAt.startsWith(today);
        } else if (filterDate === 'Month') {
            const now = new Date();
            const yearMonth = now.toISOString().slice(0, 7); // YYYY-MM
            matchesDate = record.createdAt && record.createdAt.startsWith(yearMonth);
        }

        return matchesSearch && matchesFilter && matchesDate;
    });

    const isAttendanceMarkedToday = (record) => {
        const today = new Date().toISOString().split('T')[0];
        return record.lastAttendanceDate === today;
    };

    return (
        <div className="records-container animate-fade-in">
            <div className="records-header">
                <h1>Data Management</h1>
                <Button onClick={onAdd}>
                    <Plus size={20} /> Add New Record
                </Button>
            </div>

            <Card className="records-controls">
                <div className="search-box">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters-container" style={{ display: 'flex', gap: '1rem' }}>
                    <div className="filter-box">
                        <Calendar size={20} className="filter-icon" />
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        >
                            <option value="All">All Time</option>
                            <option value="Today">Today</option>
                            <option value="Month">This Month</option>
                        </select>
                    </div>

                    <div className="filter-box">
                        <Filter size={20} className="filter-icon" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </Card>

            <div className="records-table-container">
                {loading ? (
                    <div className="table-loading">Loading records...</div>
                ) : filteredRecords.length === 0 ? (
                    <div className="empty-state">
                        <UserIcon size={48} opacity={0.3} />
                        <p>No records found</p>
                    </div>
                ) : (
                    <table className="records-table">
                        <thead>
                            <tr>
                                <th>Record Name</th>
                                <th>Category / Role</th>
                                <th>Status</th>
                                <th>Attendance</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(record => (
                                <tr key={record.id} className="record-row">
                                    <td>
                                        <div
                                            className="record-name-cell"
                                            onClick={() => onView(record)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="avatar-small">
                                                {record.name?.charAt(0) || 'R'}
                                            </div>
                                            <div>
                                                <div className="font-bold">{record.name}</div>
                                                <div className="text-muted">{record.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{record.role || 'General'}</td>
                                    <td>
                                        <span className={`badge badge-${record.status?.toLowerCase() || 'default'}`}>
                                            {record.status || 'Active'}
                                        </span>
                                    </td>
                                    <td>
                                        {isAttendanceMarkedToday(record) ? (
                                            <span className="badge" style={getStatusStyle(record.lastAttendanceStatus)}>
                                                {record.lastAttendanceStatus}
                                            </span>
                                        ) : (
                                            <span className="text-muted text-sm">Not Marked</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="date-cell">
                                            <Calendar size={14} />
                                            {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-cell">
                                            <button className="icon-btn edit" onClick={() => onEdit(record)}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="icon-btn delete" onClick={() => handleDelete(record.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RecordList;
