// src/App.js
import React, { useState } from 'react';
import './App.css'; // Your main app CSS
import AuthForm from './components/AuthForm';
import ProfileManager from './components/ProfileManager';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState('login'); // State to control login/signup form

    /**
     * Handles the login attempt.
     */
    const handleLogin = (credentials) => {
        console.log('Attempting login with:', credentials);
        setTimeout(() => {
            setIsAuthenticated(true);
            setUser({
                email: credentials.email,
                displayName: 'Demo User',
                profilePicture: 'https://placehold.co/150x150/random/white?text=User', // Placeholder user pic
                shortBio: 'A passionate learner on SkillForge.',
                githubLink: 'https://github.com/demouser',
                behanceLink: '',
                personalWebsite: '',
                displayCompletedSkills: true,
                displayCertificates: false,
                resumeUrl: '',
                challengeReminders: true,
                newContentAlerts: true,
                communityActivity: true,
                // Dashboard specific dummy data for initial render
                learningStreak: 47,
                learningProgress: {
                    categories: 5,
                    lessons: 12,
                    projects: 8420 // Assuming projects count is high
                },
                recentAchievements: [
                    { name: "7-Day Streak Master", icon: "🔥" },
                    { name: "Community Helper", icon: "🤝" },
                ],
                recommendedCourses: [
                    { title: "Node.js Backend Development", description: "Build scalable server-side applications." },
                    { title: "Machine Learning Basics", description: "Introduction to ML concepts and algorithms." },
                    { title: "Creative Problem Solving", description: "Develop innovative thinking skills." },
                ],
                technicalSkills: [
                    {
                        category: "Web Development",
                        description: "Master the art of creating modern, responsive websites and web applications. Learn HTML, CSS, JavaScript, and popular frameworks to build dynamic user experiences.",
                        stats: {
                            learningPaths: 5,
                            lessons: 47,
                            projects: 12,
                            students: 1234
                        },
                        courses: [
                            { title: "HTML & CSS Foundations", difficulty: "Beginner", lessons: 12, projects: 3 },
                            { title: "JavaScript Fundamentals", difficulty: "Intermediate", lessons: 18, projects: 5 },
                            { title: "React & Modern Frameworks", difficulty: "Advanced", lessons: 25, projects: 8 },
                        ]
                    }
                ]
            });
            alert('Login successful!');
        }, 1000);
    };

    /**
     * Handles the user registration (sign-up) attempt.
     */
    const handleSignup = (userData) => {
        console.log('Attempting signup with:', userData);
        setTimeout(() => {
            setIsAuthenticated(true);
            setUser({
                email: userData.email,
                displayName: userData.userName || userData.firstName + ' ' + userData.lastName, // Use userName or first+last name
                profilePicture: 'https://placehold.co/150x150/random/white?text=New+User', // Placeholder new user pic
                shortBio: 'New learner on SkillForge, ready to grow!',
                githubLink: '', behanceLink: '', personalWebsite: '',
                displayCompletedSkills: false, displayCertificates: false, resumeUrl: '',
                challengeReminders: true, newContentAlerts: true, communityActivity: true,
                // Dashboard specific dummy data for initial render
                learningStreak: 0,
                learningProgress: {
                    categories: 0,
                    lessons: 0,
                    projects: 0
                },
                recentAchievements: [],
                recommendedCourses: [],
                technicalSkills: []
            });
            alert('Signup successful!');
        }, 1000);
    };

    /**
     * Handles user logout.
     */
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        alert('Logged out successfully!');
    };

    // Callback for Header to toggle AuthForm mode
    const handleAuthToggle = (mode) => {
        setAuthMode(mode);
        setIsAuthenticated(false); // Ensure form is shown
    };

    return (
        <div className={`App ${!isAuthenticated ? 'auth-background' : ''}`}> {/* Apply background class conditionally */}
            {/* Always render the Header component */}
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onAuthToggle={handleAuthToggle} />

            <main>
                {!isAuthenticated ? (
                    <AuthForm onLogin={handleLogin} onSignup={handleSignup} mode={authMode} />
                ) : (
                    <Dashboard user={user} onUpdateProfile={(updatedUser) => setUser(updatedUser)} />
                )}
            </main>
        </div> // <<<--- THIS IS THE MISSING CLOSING </div>
    );
}

export default App;
