import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button as UIButton, Input as UIInput, Card as UICard } from '../components/ui';
import { Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { userData, currentUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(userData?.name || currentUser?.displayName || '');

    const handleUpdate = () => {
        toast.success("Profile updated!");
        setEditing(false);
    };

    return (
        <div className="profile-container animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>My Profile</h1>
                <p>Manage your personal information and security settings.</p>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <UICard className="profile-header-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2.5rem' }}>
                    <div className="profile-avatar-large" style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        position: 'relative'
                    }}>
                        {userData?.name?.charAt(0) || 'U'}
                        <button style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            background: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: '50%',
                            padding: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Camera size={16} color="var(--primary)" />
                        </button>
                    </div>
                    <div>
                        <h2>{userData?.name || 'User'}</h2>
                        <p style={{ opacity: 0.6 }}>{userData?.email || currentUser?.email}</p>
                        <div style={{ marginTop: '0.5rem' }}>
                            <span className="badge badge-active">{userData?.role || 'User'}</span>
                        </div>
                    </div>
                </UICard>

                <UICard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3>Personal Information</h3>
                        {!editing ? (
                            <UIButton variant="outline" onClick={() => setEditing(true)}>Edit Profile</UIButton>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <UIButton variant="outline" onClick={() => setEditing(false)}>Cancel</UIButton>
                                <UIButton variant="primary" onClick={handleUpdate}>Save Changes</UIButton>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                        <UIInput
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!editing}
                        />
                        <UIInput
                            label="Email Address"
                            value={userData?.email || currentUser?.email}
                            disabled
                        />
                        <UIInput
                            label="Role"
                            value={userData?.role || 'User'}
                            disabled
                        />
                        <UIInput
                            label="Member Since"
                            value={userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                            disabled
                        />
                    </div>
                </UICard>

                <UICard>
                    <h3>Account Security</h3>
                    <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Ensure your account is using a strong password.
                    </p>
                    <UIButton variant="outline">Change Password</UIButton>
                </UICard>
            </div>
        </div>
    );
};

export default Profile;
