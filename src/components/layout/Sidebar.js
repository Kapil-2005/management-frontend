import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    UserCircle,
    X
} from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import './layout.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout, userData } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Users size={20} />, label: 'Management', path: '/records' },
        { icon: <UserCircle size={20} />, label: 'Profile', path: '/profile' },
        { icon: <FileText size={20} />, label: 'Reports', path: '/reports' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-area">
                        <div className="logo-icon">E</div>
                        <h2>Ethara AI</h2>
                    </div>
                    <button className="mobile-only close-sidebar" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => window.innerWidth < 768 && toggleSidebar()}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div
                        className="user-section"
                        onClick={() => navigate('/profile')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="user-avatar">
                            {userData?.name?.charAt(0) || <UserCircle />}
                        </div>
                        <div className="user-info">
                            <p className="user-name">{userData?.name || 'User'}</p>
                            <p className="user-role">{userData?.role || 'Member'}</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
