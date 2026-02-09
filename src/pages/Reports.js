import React from 'react';
import { Card } from '../components/ui';

import { useNavigate } from 'react-router-dom';

const Reports = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in" style={{ padding: '2rem' }}>
            <h1>Reports</h1>
            <p className="text-muted">View and download your reports.</p>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
                <Card onClick={() => navigate('/reports/monthly')} style={{ cursor: 'pointer' }}>
                    <h3>Monthly Summary</h3>
                    <p>Overview of employee performance and attendance.</p>
                    {/* Add charts or data here later */}
                </Card>

                <Card onClick={() => navigate('/reports/expenses')} style={{ cursor: 'pointer' }}>
                    <h3>Expense Report</h3>
                    <p>Detailed breakdown of company expenses.</p>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
