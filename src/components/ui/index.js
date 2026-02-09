import React from 'react';
import './ui.css';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button className={`btn btn-${variant} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <input className={`input-field ${error ? 'input-error' : ''}`} {...props} />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div className={`card-ui ${className}`} {...props}>
            {children}
        </div>
    );
};
