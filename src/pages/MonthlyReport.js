import React from 'react';
import { Card } from '../components/ui';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MonthlyReport = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/reports')}
                style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    color: 'var(--primary)'
                }}
            >
                <ArrowLeft size={18} /> Back to Reports
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Monthly Summary</h1>
                    <p className="text-muted">Performance and attendance for February 2026</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Download size={18} /> Export PDF
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card>
                    <h3>Total Working Hours</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>4,280 hrs</div>
                    <span className="text-success">+5% from last month</span>
                </Card>
                <Card>
                    <h3>Average Attendance</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>94.2%</div>
                    <span className="text-success">+1.2% from last month</span>
                </Card>
                <Card>
                    <h3>New Joinees</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>12</div>
                    <span className="text-muted">Across 3 departments</span>
                </Card>
            </div>

            <Card>
                <h3>Department Breakdown</h3>
                <div style={{ marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Department</th>
                                <th style={{ padding: '1rem' }}>Employees</th>
                                <th style={{ padding: '1rem' }}>Avg. Performance</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Engineering</td>
                                <td style={{ padding: '1rem' }}>24</td>
                                <td style={{ padding: '1rem' }}>92%</td>
                                <td style={{ padding: '1rem' }}><span className="badge badge-active">Excellent</span></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Design</td>
                                <td style={{ padding: '1rem' }}>8</td>
                                <td style={{ padding: '1rem' }}>88%</td>
                                <td style={{ padding: '1rem' }}><span className="badge badge-active">Good</span></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Marketing</td>
                                <td style={{ padding: '1rem' }}>12</td>
                                <td style={{ padding: '1rem' }}>85%</td>
                                <td style={{ padding: '1rem' }}><span className="badge badge-pending">Average</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default MonthlyReport;
