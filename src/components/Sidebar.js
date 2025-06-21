// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // We'll create this CSS

function Sidebar({ user }) {
    // Dummy data for sidebar links/icons
    const mainNav = [
        { name: "Dashboard", icon: "🏠" },
        { name: "Browse All", icon: "📚" },
        { name: "Join Discussion", icon: "💬" },
        { name: "Resource Library", icon: "💡" },
        { name: "My Notes", icon: "📝" },
    ];

    const managementNav = [
        { name: "Organization Chart", icon: "📊" },
        { name: "Project Management", icon: "📈" },
        { name: "Certificates", icon: "📜" },
        { name: "Settings", icon: "⚙️" },
    ];

    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                {/* User profile section */}
                <img src={user.profilePicture || 'https://placehold.co/80x80/random/white?text=User'} alt="Profile" className="sidebar-profile-pic" />
                <div className="sidebar-user-info">
                    <h4>Welcome back,</h4>
                    <h3>{user.displayName || user.email.split('@')[0]}!</h3>
                </div>
            </div>

            <div className="sidebar-section learning-progress-summary">
                <p>Learning Progress</p>
                <div className="progress-stats">
                    <div className="stat-item">
                        <span className="stat-value">{user.learningProgress?.categories || 0}</span>
                        <span className="stat-label">Categories</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.learningProgress?.lessons || 0}</span>
                        <span className="stat-label">Lessons</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.learningProgress?.projects || 0}</span>
                        <span className="stat-label">Projects</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {mainNav.map(item => (
                        <li key={item.name}>
                            <a href={`#${item.name.toLowerCase().replace(/\s/g, '-')}`}>
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="nav-divider"></div> {/* Visual divider */}
                <ul>
                    {managementNav.map(item => (
                        <li key={item.name}>
                            <a href={`#${item.name.toLowerCase().replace(/\s/g, '-')}`}>
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Daily Streak Section */}
            <div className="sidebar-streak">
                <h4>🔥 {user.learningStreak || 0} Days Streak Master</h4>
                <p>Keep up the great work!</p>
            </div>
        </aside>
    );
}

export default Sidebar;