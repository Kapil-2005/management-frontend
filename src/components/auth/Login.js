import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card } from '../ui';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            toast.success("Welcome back!");
            navigate('/dashboard');
        } catch (error) {
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card animate-fade-in">
                <div className="auth-header">
                    <h2>Welcome Back 👋</h2>
                    <p>Enter your details to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                    </Button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
