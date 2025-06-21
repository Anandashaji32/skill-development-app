// src/components/Header.js
import React from 'react';
import './Header.css'; // We'll create this CSS file

function Header({ isAuthenticated, onLogout, onAuthToggle }) {
    return (
        <header className="app-header">
            <div className="logo">
                {/* Placeholder for SkillForge logo - can be an SVG, image, or styled text */}
                SkillForge
            </div>
            <nav className="main-nav">
                <a href="#home">HOME</a>
                <a href="#skills">SKILLS</a>
                <a href="#paths">PATHS</a>
                <a href="#resources">RESOURCES</a>
                <a href="#certifications">CERTIFICATIONS</a>
            </nav>
            <nav className="auth-nav">
                {isAuthenticated ? (
                    <button onClick={onLogout} className="auth-btn logout-btn">LOGOUT</button>
                ) : (
                    <>
                        {/* These buttons will toggle AuthForm between login/signup */}
                        <button onClick={() => onAuthToggle('login')} className="auth-btn">LOGIN</button>
                        <button onClick={() => onAuthToggle('signup')} className="auth-btn">SIGNUP</button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;