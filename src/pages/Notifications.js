import React from 'react';
import { Card } from '../components/ui';
import { Bell, Clock } from 'lucide-react';

const Notifications = () => {
    // Mock notifications
    const notifications = [
        { id: 1, title: 'New Employee Added', message: 'John Doe joined the team.', time: '2 mins ago', type: 'info' },
        { id: 2, title: 'Server Maintenance', message: 'Scheduled maintenance at midnight.', time: '1 hour ago', type: 'warning' },
        { id: 3, title: 'Task Completed', message: 'Website redesign task is complete.', time: '3 hours ago', type: 'success' },
    ];

    return (
        <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Bell size={32} className="text-primary" />
                <h1>Notifications</h1>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {notifications.map(notif => (
                    <Card key={notif.id} className="notification-card" style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                        <div className={`notification-icon ${notif.type}`}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{notif.title}</h3>
                                <span className="text-muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={12} /> {notif.time}
                                </span>
                            </div>
                            <p className="text-muted" style={{ margin: 0 }}>{notif.message}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
