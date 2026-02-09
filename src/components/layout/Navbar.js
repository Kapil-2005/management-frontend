import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './layout.css';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar glass">
            <div className="navbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="navbar-search mobile-hide">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search anything..." />
                </div>
            </div>

            <div className="navbar-right">
                <button
                    className="nav-icon-btn"
                    onClick={() => navigate('/notifications')}
                >
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>
                <div className="divider"></div>
                <div
                    className="nav-user-profile"
                    onClick={() => navigate('/profile')}
                    style={{ cursor: 'pointer' }}
                >
                    <User size={20} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
