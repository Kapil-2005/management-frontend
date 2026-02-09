import React from 'react';
import { Card } from '../components/ui';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpenseReport = () => {
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
                    <h1>Expense Report</h1>
                    <p className="text-muted">Financial overview for February 2026</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Download size={18} /> Export CSV
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card>
                    <h3>Total Expenses</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: '#ef4444' }}>$45,230</div>
                    <span className="text-muted">Compared to $42,100 last month</span>
                </Card>
                <Card>
                    <h3>Payroll</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>$32,500</div>
                    <span className="text-muted">72% of total expenses</span>
                </Card>
                <Card>
                    <h3>Operational</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>$8,450</div>
                    <span className="text-muted">Office, Utilities, etc.</span>
                </Card>
            </div>

            <Card>
                <h3>Recent Transactions</h3>
                <div style={{ marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Description</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>AWS Server Costs</td>
                                <td style={{ padding: '1rem' }}>Infrastructure</td>
                                <td style={{ padding: '1rem' }}>Feb 15, 2026</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>$1,240.00</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Office Supplies</td>
                                <td style={{ padding: '1rem' }}>Operational</td>
                                <td style={{ padding: '1rem' }}>Feb 14, 2026</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>$450.50</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Team Lunch</td>
                                <td style={{ padding: '1rem' }}>Refreshments</td>
                                <td style={{ padding: '1rem' }}>Feb 12, 2026</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>$320.00</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem' }}>Software Licenses</td>
                                <td style={{ padding: '1rem' }}>Software</td>
                                <td style={{ padding: '1rem' }}>Feb 10, 2026</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>$2,100.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ExpenseReport;
