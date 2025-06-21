// src/components/AuthForm.js
import React, { useState, useEffect } from 'react'; // Added useEffect
import './AuthForm.css';

function AuthForm({ onLogin, onSignup, mode }) { // Added 'mode' prop
    const [isLogin, setIsLogin] = useState(mode === 'login'); // Initialize based on prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState(''); // New field for signup
    const [firstName, setFirstName] = useState(''); // New field for signup
    const [lastName, setLastName] = useState('');   // New field for signup
    const [mobileNumber, setMobileNumber] = useState(''); // New field for signup
    const [rememberMe, setRememberMe] = useState(false); // For login form

    // Update isLogin state when 'mode' prop changes
    useEffect(() => {
        setIsLogin(mode === 'login');
        // Clear form fields when mode changes
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUserName('');
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setRememberMe(false);
    }, [mode]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLogin) {
            if (email.trim() === '' || password.trim() === '') {
                alert('Please enter both email and password.');
                return;
            }
            // In a real app, 'rememberMe' state would be sent to backend
            onLogin({ email, password, rememberMe });
        } else {
            // Updated validation for signup fields
            if (
                userName.trim() === '' ||
                email.trim() === '' ||
                firstName.trim() === '' ||
                lastName.trim() === '' ||
                mobileNumber.trim() === '' ||
                password.trim() === '' ||
                confirmPassword.trim() === ''
            ) {
                alert('Please fill in all required fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            // Basic mobile number validation (optional, can be more robust)
            if (!/^\d{10}$/.test(mobileNumber)) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }
            onSignup({ userName, email, firstName, lastName, mobileNumber, password });
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="auth-title">{isLogin ? 'Login' : 'SIGNUP'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">{isLogin ? 'Email or Username:' : 'Email:'}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isLogin ? 'Enter your email or username' : 'Enter your email id'}
                        required
                    />
                </div>

                {!isLogin && (
                    <div className="form-group name-group">
                        <div className="input-half">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="input-half">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                )}

                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="tel" // Use type="tel" for phone numbers
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter with country code"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                )}

                {isLogin && (
                    <div className="form-options">
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <p className="forgot-password-link">
                            <a href="#forgot-password">Forgot password?</a>
                        </p>
                    </div>
                )}

                <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Create Account'}</button>

                {isLogin ? (
                    <p className="toggle-mode">
                        Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
                    </p>
                ) : (
                    <p className="toggle-mode">
                        Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                    </p>
                )}

                {isLogin && ( // Only show social login for login page
                    <div className="social-login-options">
                        <p className="or-divider">- OR -</p>
                        <button type="button" className="google-btn">Sign in with Google</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default AuthForm;