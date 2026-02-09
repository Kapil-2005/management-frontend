import React from 'react';
import { Card } from '../components/ui';

const Settings = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '2rem' }}>
            <h1>Settings</h1>
            <p className="text-muted">Manage your application settings here.</p>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
                <Card>
                    <h3>Account Settings</h3>
                    <p>Update your password and account details.</p>
                    {/* Add form fields here later */}
                </Card>

                <Card>
                    <h3>Notification Preferences</h3>
                    <p>Choose what notifications you want to receive.</p>
                </Card>

                <Card>
                    <h3>Theme</h3>
                    <p>Toggle between Light and Dark mode.</p>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
