// src/components/AuthForm.js
import React, { useState, useEffect } from 'react';
import './AuthForm.css';

// Destructure setAuthMode from props
function AuthForm({ onLogin, onSignup, mode, setAuthMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle forgot password form
    const [resetToken, setResetToken] = useState(''); // Stores the token from the URL for password reset
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false); // State to toggle reset password form


    // Effect to check URL for reset token on component mount
    useEffect(() => {
        const path = window.location.pathname;
        if (path.startsWith('/reset-password/')) {
            const token = path.split('/reset-password/')[1];
            if (token) {
                setResetToken(token);
                setShowResetPasswordForm(true); // Show reset password form if token is present
                setShowForgotPassword(false); // Hide forgot password form
            }
        }
    }, []); // Empty dependency array means this runs once on mount

    // Function to handle login submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic client-side validation
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        try {
            // Send login request to your Node.js backend
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json(); // Parse the JSON response from the server

            if (response.ok) { // Check if the response status is 200-299 (success)
                alert(data.message); // Display success message from backend
                localStorage.setItem('token', data.token); // Store the JWT token in local storage
                // Call the onLogin prop to update App.js state (isAuthenticated, user)
                onLogin({ email: data.user.email, displayName: data.user.email.split('@')[0] }); // Pass user data
            } else {
                alert('Login failed: ' + (data.message || 'Unknown error')); // Display error message from backend
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please check server connection and try again.');
        }
    };

    // Function to handle signup submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation for signup fields
        if (
            userName.trim() === '' ||
            email.trim() === '' ||
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            mobileNumber.trim() === '' ||
            password.trim() === '' ||
            confirmNewPassword.trim() === '' // Using confirmNewPassword state for consistent naming, matches frontend form
        ) {
            alert('Please fill in all required fields.');
            return;
        }
        if (password !== confirmNewPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (!/^\d{10}$/.test(mobileNumber)) { // Basic 10-digit number validation
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        try {
            // Send signup request to your Node.js backend
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Only sending email and password to backend as per current User model
                // If you extend User model to store all these, send them here:
                body: JSON.stringify({ email, password, userName, firstName, lastName, mobileNumber })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // After successful signup, switch to login form (or automatically log in)
                setAuthMode('login'); // Switch to login view
            } else {
                alert('Signup failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    // Function to handle "Forgot Password" request (sending email)
    const handleForgotPasswordRequest = async (e) => {
        e.preventDefault();

        if (!forgotPasswordEmail.trim()) {
            alert('Please enter your email address to reset your password.');
            return;
        }

        try {
            // Send request to backend to send password reset email
            const response = await fetch('http://localhost:5000/api/users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotPasswordEmail })
            });

            const data = await response.json();
            alert(data.message); // Display message (even if email not found, for security)
            if (response.ok) {
                setShowForgotPassword(false); // Hide forgot password form on success
                setForgotPasswordEmail(''); // Clear the email field
            }
        } catch (error) {
            console.error('Forgot password request error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    // Function to handle password reset submission
    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert('New password and confirm new password do not match.');
            return;
        }
        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters long.');
            return;
        }

        try {
            // Send password reset request to backend with token and new password
            const response = await fetch(`http://localhost:5000/api/users/reset-password/${resetToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Display success message
                setShowResetPasswordForm(false); // Hide reset form
                setResetToken(''); // Clear token
                setNewPassword(''); // Clear new password fields
                setConfirmNewPassword('');
                // Redirect to login page after successful reset
                window.history.pushState({}, '', '/'); // Change URL back to root
                setAuthMode('login'); // Switch to login view
            } else {
                alert('Password reset failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Reset password error:', error);
            alert('An error occurred during password reset. Please try again.');
        }
    };

    // NEW FUNCTION: Simulate Google Login
    const handleGoogleLogin = () => {
        alert('Simulating Google Login!');
        // In a real application, you would integrate Firebase Auth here
        // or redirect to Google's OAuth endpoint.
        // For now, we'll just simulate a successful login:
        onLogin({ email: 'google_user@example.com', displayName: 'Google User' });
    };


    return (
        <div className="auth-form-container">
            <div className="auth-card">
                {/* Conditionally render Forgot Password Form */}
                {showForgotPassword ? (
                    <div className="form-content">
                        <h2 className="auth-title">Forgot Password</h2>
                        <form onSubmit={handleForgotPasswordRequest}>
                            <div className="input-group">
                                <label htmlFor="forgotEmail">Email:</label>
                                <input
                                    type="email"
                                    id="forgotEmail"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <button type="submit" className="auth-button">Send Reset Link</button>
                        </form>
                        <p className="toggle-mode" onClick={() => setShowForgotPassword(false)}>
                            Back to Login
                        </p>
                    </div>
                ) : showResetPasswordForm ? (
                    /* Conditionally render Reset Password Form (shown when a token is in URL) */
                    <div className="form-content">
                        <h2 className="auth-title">Reset Password</h2>
                        <form onSubmit={handleResetPasswordSubmit}>
                            <div className="input-group">
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                            <button type="submit" className="auth-button">Reset Password</button>
                        </form>
                    </div>
                ) : (
                    /* Default Login/Signup Form */
                    <div className="form-content">
                        <h2 className="auth-title">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
                        <form onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit}>
                            {/* Signup specific fields */}
                            {mode === 'signup' && (
                                <>
                                    <div className="input-group">
                                        <label htmlFor="userName">User Name:</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Enter your user name"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-inline">
                                        <div className="input-group">
                                            <label htmlFor="firstName">First Name:</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="First Name"
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="lastName">Last Name:</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Last Name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="mobileNumber">Mobile Number:</label>
                                        <input
                                            type="tel"
                                            id="mobileNumber"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            placeholder="Enter your mobile number"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {/* Common fields */}
                            <div className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="input-group">
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
                            {/* Login specific options */}
                            {mode === 'login' && (
                                <div className="options-group">
                                    <label className="checkbox-container">
                                        <input type="checkbox" /> Remember me
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                                        Forgot password?
                                    </span>
                                </div>
                            )}
                            <button type="submit" className="auth-button">
                                {mode === 'login' ? 'Login' : 'Create Account'}
                            </button>
                        </form>
                        <div className="divider">- OR -</div>
                        {/* Add onClick handler for simulated Google Login */}
                        <button className="google-auth-button" onClick={handleGoogleLogin}>Sign in with Google</button>
                        {/* Use the setAuthMode prop here */}
                        <p className="toggle-mode" onClick={() => setAuthMode(mode === 'login' ? 'signup' : 'login')}>
                            {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthForm;
