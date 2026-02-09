import React, { useState } from 'react';
import { Card, Button } from '../ui';
import { X, Mail, Calendar } from 'lucide-react';
import './records.css';

const RecordDetails = ({ record, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    if (!record) return null;

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const attendanceHistory = record.attendanceHistory || {};

    let totalWorkingDays = 0;
    let totalPresent = 0;

    const calendarGrid = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i, 12, 0, 0); // Noon to avoid timezone shift
        const dateString = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        const status = attendanceHistory[dateString];

        if (!isWeekend) {
            totalWorkingDays++;
        }

        if (status === 'Present' || status === 'Work From Home') {
            totalPresent++;
        } else if (status === 'Half Day') {
            totalPresent += 0.5;
        }

        calendarGrid.push({
            day: i,
            date: dateString,
            isWeekend,
            status
        });
    }

    const attendancePercentage = totalWorkingDays > 0 ? Math.round((totalPresent / totalWorkingDays) * 100) : 0;

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="modal-overlay">
            <Card className="modal-content animate-fade-in" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="modal-header">
                    <h2>Employee Details</h2>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="employee-profile-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="avatar-large" style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>
                        {record.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>{record.name}</h2>
                        <p className="text-muted" style={{ margin: 0 }}>{record.role || 'Employee'}</p>
                        <span className={`badge badge-${record.status?.toLowerCase() || 'default'}`} style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                            {record.status || 'Active'}
                        </span>
                    </div>
                </div>

                <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr', gap: '2rem' }}>

                    {/* Left Column: Basic Info & Overall Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                <Mail size={16} /> {record.email}
                            </div>
                        </div>
                        <div>
                            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Joined Date</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                <Calendar size={16} />
                                {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>

                        <Card className="stat-box" style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc' }}>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Monthly Attendance</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{attendancePercentage}%</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                {totalPresent} / {totalWorkingDays} Working Days
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Calendar */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <button onClick={handlePrevMonth} className="btn-sm btn-outline">&lt;</button>
                            <h3 style={{ margin: 0 }}>{monthName} {year}</h3>
                            <button onClick={handleNextMonth} className="btn-sm btn-outline">&gt;</button>
                        </div>

                        <div className="calendar-grid">
                            {/* Weekday Headers */}
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="calendar-header">{day}</div>
                            ))}

                            {/* Empty cells for offset */}
                            {Array.from({ length: new Date(year, month, 1).getDay() }).map((_, i) => (
                                <div key={`empty-${i}`} className="calendar-day empty"></div>
                            ))}

                            {/* Days */}
                            {calendarGrid.map(day => {
                                let bgColor = 'white';
                                let textColor = 'inherit';
                                let borderColor = '#e2e8f0';

                                if (day.isWeekend) {
                                    bgColor = '#f1f5f9'; // Gray for off
                                    textColor = '#94a3b8';
                                } else if (day.status === 'Present') {
                                    bgColor = '#dcfce7'; // Light Green
                                    borderColor = '#22c55e';
                                    textColor = '#166534';
                                } else if (day.status === 'Work From Home') {
                                    bgColor = '#dbeafe'; // Blue
                                    borderColor = '#3b82f6';
                                    textColor = '#1e40af';
                                } else if (day.status === 'Half Day') {
                                    bgColor = '#fef3c7'; // Amber
                                    borderColor = '#f59e0b';
                                    textColor = '#92400e';
                                } else if (day.status === 'Sick Leave') {
                                    bgColor = '#f3e8ff'; // Purple
                                    borderColor = '#a855f7';
                                    textColor = '#6b21a8';
                                } else if (day.status === 'Paid Leave') {
                                    bgColor = '#ccfbf1'; // Teal
                                    borderColor = '#14b8a6';
                                    textColor = '#115e59';
                                } else if (day.status === 'Absent') {
                                    bgColor = '#fee2e2'; // Light Red
                                    borderColor = '#ef4444';
                                    textColor = '#991b1b';
                                }

                                return (
                                    <div
                                        key={day.day}
                                        className="calendar-day"
                                        style={{
                                            background: bgColor,
                                            color: textColor,
                                            border: `1px solid ${borderColor}`,
                                            fontWeight: day.status ? 'bold' : 'normal'
                                        }}
                                        title={day.isWeekend ? 'Weekend' : (day.status || 'No Record')}
                                    >
                                        {day.day}
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#dcfce7', border: '1px solid #22c55e' }}></div> Present
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#dbeafe', border: '1px solid #3b82f6' }}></div> WFH
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#fef3c7', border: '1px solid #f59e0b' }}></div> Half Day
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#f3e8ff', border: '1px solid #a855f7' }}></div> Sick
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#ccfbf1', border: '1px solid #14b8a6' }}></div> Paid
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#fee2e2', border: '1px solid #ef4444' }}></div> Absent
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#f1f5f9', border: '1px solid #e2e8f0' }}></div> Off Day
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <Button variant="outline" onClick={onClose} style={{ width: '100%' }}>Close</Button>
                </div>
            </Card>

            <style>{`
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 0.5rem;
                }
                .calendar-header {
                    text-align: center;
                    font-weight: bold;
                    font-size: 0.8rem;
                    color: #64748b;
                    padding: 0.5rem 0;
                }
                .calendar-day {
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    cursor: default;
                }
                .calendar-day.empty {
                    background: transparent;
                    border: none;
                }
                .btn-sm {
                    padding: 0.25rem 0.5rem;
                    font-size: 0.8rem;
                    border-radius: 4px;
                    border: 1px solid var(--border);
                    background: white;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default RecordDetails;
