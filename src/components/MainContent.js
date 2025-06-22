// src/components/MainContent.js
import React from 'react';
import './MainContent.css';
import ProfileManager from './ProfileManager'; // Re-using ProfileManager here

function MainContent({ user, onUpdateProfile }) {
    return (
        <main className="main-content-area">
            {/* Continue Learning Section */}
            <section className="section-card continue-learning">
                <div className="card-header">
                    <h2>Continue Learning</h2>
                    <span className="view-all-link">View All</span>
                </div>
                <div className="course-card">
                    <img src="https://placehold.co/100x100/AEC6CF/FFFFFF?text=React" alt="React Development" className="course-icon" />
                    <div className="course-details">
                        <h3>React Development</h3>
                        <p>Today's Challenge: Built a React Component</p>
                    </div>
                    <button className="continue-btn">Continue Learning</button>
                </div>
            </section>

            {/* Recent Achievements Section */}
            <section className="section-card recent-achievements">
                <div className="card-header">
                    <h2>Recent Achievements</h2>
                </div>
                <div className="achievements-grid">
                    {user.recentAchievements?.length > 0 ? (
                        user.recentAchievements.map((achievement, index) => (
                            <div key={index} className="achievement-item">
                                <span className="achievement-icon">{achievement.icon}</span>
                                <p>{achievement.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No recent achievements yet. Keep learning!</p>
                    )}
                </div>
            </section>

            {/* Recommended for You Section */}
            <section className="section-card recommended-for-you">
                <div className="card-header">
                    <h2>Recommended for You</h2>
                    <span className="view-all-link">View All</span>
                </div>
                <div className="recommended-grid">
                    {user.recommendedCourses?.length > 0 ? (
                        user.recommendedCourses.map((course, index) => (
                            <div key={index} className="recommended-item">
                                <h4>{course.title}</h4>
                                <p>{course.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No recommendations yet. Start a course to get personalized suggestions!</p>
                    )}
                </div>
            </section>

            {/* Technical Skills Section */}
            <section className="section-card technical-skills">
                <div className="card-header">
                    <h2>Technical Skills</h2>
                    <span className="view-all-link">View All</span>
                </div>
                {user.technicalSkills?.length > 0 ? (
                    user.technicalSkills.map((skillCategory, index) => (
                        <div key={index} className="skill-category-block">
                            <h3>{skillCategory.category}</h3>
                            <p className="category-description">{skillCategory.description}</p>
                            <div className="category-stats">
                                <span><span className="stat-num">{skillCategory.stats.learningPaths}</span> Learning Paths</span>
                                <span><span className="stat-num">{skillCategory.stats.lessons}</span> Lessons</span>
                                <span><span className="stat-num">{skillCategory.stats.projects}</span> Projects</span>
                                <span><span className="stat-num">{skillCategory.stats.students}</span> Students Enrolled</span>
                            </div>
                            <div className="course-list">
                                {skillCategory.courses.map((course, cIndex) => (
                                    <div key={cIndex} className="small-course-card">
                                        <p className={`difficulty-${course.difficulty.toLowerCase()}`}>{course.difficulty}</p>
                                        <h4>{course.title}</h4>
                                        <p>{course.lessons} Lessons - {course.projects} Projects</p>
                                        <button className="start-learning-btn">Start Learning</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No technical skills added yet. Explore courses to begin!</p>
                )}
            </section>

            {/* Including ProfileManager directly here for quick access as per earlier setup */}
            <section className="section-card profile-settings-card">
                <div className="card-header">
                    <h2>Profile & Settings</h2>
                </div>
                <ProfileManager user={user} onUpdateProfile={onUpdateProfile} />
            </section>
        </main>
    );
}

export default MainContent;
