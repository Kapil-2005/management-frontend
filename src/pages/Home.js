import React from 'react';
import { Link } from 'react-router-dom';
import {
    Shield,
    Zap,
    BarChart3,
    Globe,
    ArrowRight,
    Database,
    Lock
} from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="landing-page">
            <nav className="landing-nav animate-fade-in">
                <div className="logo">
                    <div className="logo-icon">E</div>
                    <span>Ethara AI</span>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content animate-fade-in">
                    <span className="badge-promo">Project Management Reimagined</span>
                    <h1>Empower Your Business with <span>Next-Gen</span> Solutions</h1>
                    <p>
                        Experience a robust project management system built with Firebase.
                        Real-time data, secure authentication, and a stunning UI to keep you productive.
                    </p>
                    <div className="hero-btns">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started Free <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn btn-outline btn-lg">
                            View Demo
                        </Link>
                    </div>
                </div>
                <div className="hero-image animate-fade-in">
                    {/* Glassy mockup representation */}
                    <div className="mockup-card glass">
                        <div className="mockup-header">
                            <div className="dots"><span /><span /><span /></div>
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-line w-full h-4"></div>
                            <div className="mockup-grid">
                                <div className="mockup-item"></div>
                                <div className="mockup-item"></div>
                                <div className="mockup-item"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <div className="section-header">
                    <h2>Core Features</h2>
                    <p>Everything you need to manage your data securely and efficiently.</p>
                </div>

                <div className="features-grid">
                    <FeatureCard
                        icon={<Shield className="text-blue-500" />}
                        title="Firebase Auth"
                        desc="Secure login and register with role-based access control."
                    />
                    <FeatureCard
                        icon={<Database className="text-pink-500" />}
                        title="Firestore CRUD"
                        desc="Real-time data management with Firestore's flexible database."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="text-purple-500" />}
                        title="Smart Analytics"
                        desc="Visual representation of your data with interactive charts."
                    />
                    <FeatureCard
                        icon={<Zap className="text-yellow-500" />}
                        title="Fast & Responsive"
                        desc="Optimized for every device, from mobile to ultra-wide desktops."
                    />
                    <FeatureCard
                        icon={<Lock className="text-green-500" />}
                        title="Secure Data"
                        desc="Firebase security rules implemented to protect your sensitive info."
                    />
                    <FeatureCard
                        icon={<Globe className="text-indigo-500" />}
                        title="Cloud Integration"
                        desc="Access your data from anywhere in the world, anytime."
                    />
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-info">
                        <h3>Ethara AI</h3>
                        <p>Building the future of digital management systems.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Product</h4>
                            <Link to="/">Features</Link>
                            <Link to="/">Security</Link>
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <Link to="/">About</Link>
                            <Link to="/">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Ethara AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="feature-card glass">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
);

export default Home;
