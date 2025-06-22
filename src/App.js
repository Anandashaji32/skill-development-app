// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import ProfileManager from './components/ProfileManager';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState('login');

    // Check for token on component mount to maintain session
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you'd send this token to your backend to verify it
            // and fetch the actual user data. For this demo, we'll just simulate
            // a successful login and set dummy user data.
            setIsAuthenticated(true);
            setUser({
                email: 'user@example.com', // Replace with actual user email fetched from backend
                displayName: 'Logged In User', // Replace with actual display name from backend
                profilePicture: 'https://placehold.co/150x150/random/white?text=User',
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
                learningStreak: 47,
                learningProgress: {
                    categories: 5,
                    lessons: 12,
                    projects: 8420
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
                ],
                challengesCompleted: 15,
                currentStreak: 7,
                lastChallengeDate: new Date().toISOString().split('T')[0],
                badges: [
                    { id: 'streak-master', name: '7-Day Streak Master', icon: '🏆' },
                    { id: 'first-challenge', name: 'First Challenge Completed', icon: '🌟' }
                ],
                availableChallenges: [
                    { id: 'daily-react-component', type: 'daily', title: 'Build a Flexible React Component', objective: 'Create a reusable React component that takes props and renders dynamically.', instructions: '...', isCompleted: false },
                    { id: 'weekly-data-analysis', type: 'weekly', title: 'Perform Basic Data Analysis (Python)', objective: 'Use Python and Pandas to load a CSV file, calculate basic statistics, and visualize data.', instructions: '...', isCompleted: false }
                ]
            });
        }
    }, []); // Empty dependency array means this runs once on mount

    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        // You would typically fetch full user data from your backend here using the token
        // For now, we use the minimal data passed from AuthForm and fill with dummy data
        setUser({
            ...user, // Preserve existing dummy data if any
            ...userData, // Overwrite with actual email, display name from backend
            displayName: userData.displayName || userData.email.split('@')[0], // Fallback for display name
            profilePicture: user?.profilePicture || 'https://placehold.co/150x150/random/white?text=User',
            shortBio: user?.shortBio || 'A passionate learner on SkillForge.',
            githubLink: user?.githubLink || 'https://github.com/demouser',
            behanceLink: user?.behanceLink || '',
            personalWebsite: user?.personalWebsite || '',
            displayCompletedSkills: user?.displayCompletedSkills !== undefined ? user.displayCompletedSkills : true,
            displayCertificates: user?.displayCertificates !== undefined ? user.displayCertificates : false,
            resumeUrl: user?.resumeUrl || '',
            challengeReminders: user?.challengeReminders !== undefined ? user.challengeReminders : true,
            newContentAlerts: user?.newContentAlerts !== undefined ? user.newContentAlerts : true,
            communityActivity: user?.communityActivity !== undefined ? user.communityActivity : true,
            learningStreak: user?.learningStreak || 47,
            learningProgress: user?.learningProgress || { categories: 5, lessons: 12, projects: 8420 },
            recentAchievements: user?.recentAchievements || [{ name: "7-Day Streak Master", icon: "🔥" }, { name: "Community Helper", icon: "🤝" }],
            recommendedCourses: user?.recommendedCourses || [{ title: "Node.js Backend Development", description: "Build scalable server-side applications." }],
            technicalSkills: user?.technicalSkills || [{
                category: "Web Development",
                description: "Master the art of creating modern, responsive websites and web applications. Learn HTML, CSS, JavaScript, and popular frameworks to build dynamic user experiences.",
                stats: { learningPaths: 5, lessons: 47, projects: 12, students: 1234 },
                courses: [{ title: "HTML & CSS Foundations", difficulty: "Beginner", lessons: 12, projects: 3 }]
            }],
            challengesCompleted: user?.challengesCompleted || 15,
            currentStreak: user?.currentStreak || 7,
            lastChallengeDate: user?.lastChallengeDate || new Date().toISOString().split('T')[0],
            badges: user?.badges || [{ id: 'streak-master', name: '7-Day Streak Master', icon: '🏆' }, { id: 'first-challenge', name: 'First Challenge Completed', icon: '🌟' }],
            availableChallenges: user?.availableChallenges || [
                { id: 'daily-react-component', type: 'daily', title: 'Build a Flexible React Component', objective: 'Create a reusable React component that takes props and renders dynamically.', instructions: '...', isCompleted: false },
                { id: 'weekly-data-analysis', type: 'weekly', title: 'Perform Basic Data Analysis (Python)', objective: 'Use Python and Pandas to load a CSV file, calculate basic statistics, and visualize data.', instructions: '...', isCompleted: false }
            ]
        });
    };

    const handleSignup = (userData) => {
        setIsAuthenticated(true);
        // After signup, you might immediately log them in or redirect to login.
        // For simplicity, we simulate a login here with initial data.
        setUser({
            ...userData,
            displayName: userData.userName || userData.firstName + ' ' + userData.lastName,
            profilePicture: 'https://placehold.co/150x150/random/white?text=New+User',
            shortBio: 'New learner on SkillForge, ready to grow!',
            githubLink: '', behanceLink: '', personalWebsite: '',
            displayCompletedSkills: false, displayCertificates: false, resumeUrl: '',
            challengeReminders: true, newContentAlerts: true, communityActivity: true,
            challengesCompleted: 0, currentStreak: 0, lastChallengeDate: null, badges: [],
            availableChallenges: [
                { id: 'daily-react-component', type: 'daily', title: 'Build a Flexible React Component', objective: 'Create a reusable React component that takes props and renders dynamically.', instructions: '...', isCompleted: false },
                { id: 'weekly-data-analysis', type: 'weekly', title: 'Perform Basic Data Analysis (Python)', objective: 'Use Python and Pandas to load a CSV file, calculate basic statistics, and visualize data.', instructions: '...', isCompleted: false }
            ]
        });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token'); // NEW: Remove the JWT token from local storage
        alert('Logged out successfully!');
    };

    // Callback for Header to toggle AuthForm mode
    // This function's purpose is to set the authMode state in App.js
    const handleAuthToggle = (mode) => {
        setAuthMode(mode);
        setIsAuthenticated(false);
    };

    /**
     * Handles the completion of a challenge.
     * This is a client-side simulation. In a real app, this would update backend.
     * @param {string} challengeId - The ID of the completed challenge.
     */
    const handleChallengeCompletion = (challengeId) => { // <--- THIS FUNCTION MUST BE PRESENT AND CORRECT
        setUser(prevUser => {
            if (!prevUser) return prevUser;

            const updatedChallenges = prevUser.availableChallenges.map(challenge =>
                challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
            );

            const today = new Date().toISOString().split('T')[0];
            let newStreak = prevUser.currentStreak;
            // Check if last challenge was yesterday to continue streak
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

            if (prevUser.lastChallengeDate === yesterday) {
                newStreak += 1;
            } else if (prevUser.lastChallengeDate !== today) { // If not yesterday and not today, reset
                newStreak = 1;
            } else { // Already completed today, maintain streak
                newStreak = prevUser.currentStreak;
            }

            const updatedUser = {
                ...prevUser,
                availableChallenges: updatedChallenges,
                challengesCompleted: prevUser.challengesCompleted + 1,
                currentStreak: newStreak,
                lastChallengeDate: today,
                // Add a badge if 7-day streak is reached for the first time
                badges: newStreak === 7 && !prevUser.badges.some(b => b.id === 'streak-master')
                    ? [...prevUser.badges, { id: 'streak-master', name: '7-Day Streak Master', icon: '🏆' }]
                    : prevUser.badges,
            };

            alert(`Challenge "${challengeId}" completed! Streak: ${newStreak} days.`);
            return updatedUser;
        });
    };


    return (
        <div className={`App ${!isAuthenticated ? 'auth-background' : ''}`}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onAuthToggle={handleAuthToggle} />
            <main>
                {!isAuthenticated ? (
                    <AuthForm
                        onLogin={handleLogin}
                        onSignup={handleSignup}
                        mode={authMode}
                        setAuthMode={setAuthMode}
                    />
                ) : (
                    // Ensure user is not null before passing to Dashboard
                    user && <Dashboard
                        user={user}
                        onUpdateProfile={(updatedUser) => setUser(updatedUser)}
                        onChallengeCompletion={handleChallengeCompletion}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
