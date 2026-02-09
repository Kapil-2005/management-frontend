import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Button } from '../ui';
import {
    Users,
    UserCheck,
    Clock,
    TrendingUp,
    Plus,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { getRecords } from '../../services/recordService';
import './dashboard.css';
import RecordForm from '../records/RecordForm';

const Dashboard = () => {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalEmployees: 0,
        activeUsers: 0,
        recordsToday: 0,
        growth: 0
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await getRecords();
                const records = response.data;

                const total = records.length;
                const active = records.filter(record => record.status === 'Active').length;

                // Calculate today's records
                const today = new Date().toISOString().split('T')[0];
                const createdToday = records.filter(record => {
                    const date = record.createdAt; // Assuming ISO string from backend
                    return date && date.startsWith(today);
                }).length;

                setStats({
                    totalEmployees: total,
                    activeUsers: active,
                    recordsToday: createdToday,
                    growth: total > 0 ? Math.round((createdToday / total) * 100) : 0
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="dashboard-container animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, {userData?.name || currentUser?.displayName || 'User'}! 👋</h1>
                    <p>Here's what's happening with your projects today.</p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    Add Record
                </Button>
            </header>

            <div className="stats-grid">
                <StatCard
                    title="Total Employees"
                    value={stats.totalEmployees}
                    icon={<Users className="text-blue-500" />}
                    trend="+5.2%"
                    onClick={() => navigate('/records')}
                />
                <StatCard
                    title="Active Users"
                    value={stats.activeUsers}
                    icon={<UserCheck className="text-green-500" />}
                    trend="+2.1%"
                    onClick={() => navigate('/records', { state: { filterStatus: 'Active' } })}
                />
                <StatCard
                    title="Records Today"
                    value={stats.recordsToday}
                    icon={<Clock className="text-purple-500" />}
                    trend="+12%"
                    onClick={() => navigate('/records', { state: { filterDate: 'Today' } })}
                />
                <StatCard
                    title="System Growth"
                    value={`${stats.growth}%`}
                    icon={<TrendingUp className="text-pink-500" />}
                    trend="+0.5%"
                    onClick={() => navigate('/reports/monthly')}
                />
            </div>

            <div className="dashboard-content-grid">
                <Card className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <ActionButton
                            icon={<Plus />}
                            label="New Entry"
                            color="#6366f1"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <ActionButton
                            icon={<Users />}
                            label="View Team"
                            color="#ec4899"
                            onClick={() => navigate('/records')}
                        />
                    </div>
                </Card>

                <Card className="recent-activity">
                    <div className="card-header">
                        <h3>Recent Activity</h3>
                        <Button variant="outline" className="btn-sm">View All</Button>
                    </div>
                    <div className="activity-list">
                        <ActivityItem text="New record added by John" time="2 mins ago" />
                        <ActivityItem text="Profile updated: Sarah Smith" time="1 hour ago" />
                        <ActivityItem text="Monthly report generated" time="3 hours ago" />
                    </div>
                </Card>
            </div >

            {isModalOpen && (
                <RecordForm
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div >
    );
};

const StatCard = ({ title, value, icon, trend, onClick }) => (
    <Card
        className="stat-card"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
    >
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <p className="stat-title">{title}</p>
            <h2 className="stat-value">{value}</h2>
            <span className="stat-trend">
                <ArrowRight size={12} />
            </span>
        </div>
    </Card>
);

const ActionButton = ({ icon, label, color, onClick }) => (
    <button className="action-btn" style={{ '--action-color': color }} onClick={onClick}>
        <div className="icon-wrapper">{icon}</div>
        <span>{label}</span>
    </button>
);

const ActivityItem = ({ text, time }) => (
    <div className="activity-item">
        <div className="activity-dot"></div>
        <div className="activity-details">
            <p>{text}</p>
            <span>{time}</span>
        </div>
    </div>
);

export default Dashboard;
