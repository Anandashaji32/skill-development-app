// src/components/ProfileManager.js
import React, { useState, useEffect } from 'react';
import './ProfileManager.css'; // Import the CSS for ProfileManager

function ProfileManager({ user, onUpdateProfile }) {
    // State to toggle between displaying profile and editing profile
    const [isEditing, setIsEditing] = useState(false);

    // States for Public Profile fields
    const [displayName, setDisplayName] = useState(user.displayName || '');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || ''); // Placeholder for URL
    const [shortBio, setShortBio] = useState(user.shortBio || '');
    const [githubLink, setGithubLink] = useState(user.githubLink || '');
    const [behanceLink, setBehanceLink] = useState(user.behanceLink || '');
    const [personalWebsite, setPersonalWebsite] = useState(user.personalWebsite || '');
    const [displayCompletedSkills, setDisplayCompletedSkills] = useState(user.displayCompletedSkills || false);
    const [displayCertificates, setDisplayCertificates] = useState(user.displayCertificates || false);
    const [resumeUrl, setResumeUrl] = useState(user.resumeUrl || ''); // For external URL resume
    const [resumeFile, setResumeFile] = useState(null); // For file upload object

    // States for Private Settings (email and password change)
    const [newEmail, setNewEmail] = useState(user.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // States for Notification Preferences
    const [challengeReminders, setChallengeReminders] = useState(user.challengeReminders !== undefined ? user.challengeReminders : true);
    const [newContentAlerts, setNewContentAlerts] = useState(user.newContentAlerts !== undefined ? user.newContentAlerts : true);
    const [communityActivity, setCommunityActivity] = useState(user.communityActivity !== undefined ? user.communityActivity : true);

    // useEffect hook to update component state when 'user' prop changes
    // This ensures that if user data is loaded/updated from the parent (App.js),
    // the form fields reflect the latest data.
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setProfilePicture(user.profilePicture || '');
            setShortBio(user.shortBio || '');
            setGithubLink(user.githubLink || '');
            setBehanceLink(user.behanceLink || '');
            setPersonalWebsite(user.personalWebsite || '');
            setDisplayCompletedSkills(user.displayCompletedSkills || false);
            setDisplayCertificates(user.displayCertificates || false);
            setResumeUrl(user.resumeUrl || '');
            setNewEmail(user.email || '');
            setChallengeReminders(user.challengeReminders !== undefined ? user.challengeReminders : true);
            setNewContentAlerts(user.newContentAlerts !== undefined ? user.newContentAlerts : true);
            setCommunityActivity(user.communityActivity !== undefined ? user.communityActivity : true);
        }
    }, [user]); // Dependency array: this effect runs when 'user' prop changes

    /**
     * Handles saving the public profile changes.
     * In a real app, this would send data to a backend API.
     * @param {Event} event - The form submission event.
     */
    const handleSaveProfile = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Construct an object with the updated public profile data.
        // In a real app, 'profilePicture' and 'resumeFile' would require separate file upload logic
        // and then saving their URLs to the backend.
        const updatedProfile = {
            ...user, // Spread existing user data to retain unchanged fields
            displayName,
            profilePicture,
            shortBio,
            githubLink,
            behanceLink,
            personalWebsite,
            displayCompletedSkills,
            displayCertificates,
            resumeUrl: resumeFile ? 'UPLOADED_RESUME_URL_PLACEHOLDER' : resumeUrl, // Placeholder URL for uploaded resume
        };

        console.log('Saving public profile:', updatedProfile);
        onUpdateProfile(updatedProfile); // Call parent's update function to update global user state
        setIsEditing(false); // Exit editing mode
        alert('Profile updated successfully (client-side simulation)!');
    };

    /**
     * Handles changing the user's password.
     * In a real app, this would send current and new passwords to a secure backend endpoint.
     * @param {Event} event - The form submission event.
     */
    const handleChangePassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (newPassword.length < 6) { // Example client-side validation
            alert('Password must be at least 6 characters long.');
            return;
        }
        console.log('Changing password:', { currentPassword, newPassword });
        alert('Password change initiated (client-side simulation).');
        // Clear password fields after initiation
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    /**
     * Handles updating the user's email address.
     * In a real app, this often involves re-authentication or an email verification process.
     * @param {Event} event - The form submission event.
     */
    const handleUpdateEmail = (event) => {
        event.preventDefault();
        if (!newEmail.includes('@') || !newEmail.includes('.')) { // Simple email format validation
            alert('Please enter a valid email address.');
            return;
        }
        console.log('Updating email:', newEmail);
        alert('Email update initiated (client-side simulation).');
    };

    /**
     * Handles the account deletion process.
     * This is a critical action and requires robust backend implementation and confirmation.
     */
    const handleDeleteAccount = () => {
        // Using window.confirm for simplicity in demo; in a real app, use a custom modal for better UX.
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Account deletion requested.');
            alert('Account deletion process started (client-side simulation).');
            // In a real app:
            // 1. Make API call to backend to delete account.
            // 2. On success, call onLogout prop to clear session and redirect.
        }
    };

    return (
        <div className="profile-manager-container">
            <h3>Public Profile</h3>
            {!isEditing ? (
                // Display mode: show current profile information
                <div className="profile-display">
                    <div className="profile-header">
                        {/* Display profile picture; fallback to a placeholder if none is set */}
                        <img src={profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="profile-pic" />
                        <h4>{displayName || 'N/A'}</h4> {/* Display name or 'N/A' */}
                    </div>
                    <p><strong>Bio:</strong> {shortBio || 'Not provided'}</p>
                    {/* Conditionally render links only if they exist */}
                    {githubLink && <p><strong>GitHub:</strong> <a href={githubLink} target="_blank" rel="noopener noreferrer">{githubLink}</a></p>}
                    {behanceLink && <p><strong>Behance:</strong> <a href={behanceLink} target="_blank" rel="noopener noreferrer">{behanceLink}</a></p>}
                    {personalWebsite && <p><strong>Website:</strong> <a href={personalWebsite} target="_blank" rel="noopener noreferrer">{personalWebsite}</a></p>}
                    <p><strong>Display Completed Skills:</strong> {displayCompletedSkills ? 'Yes' : 'No'}</p>
                    <p><strong>Display Certificates:</strong> {displayCertificates ? 'Yes' : 'No'}</p>
                    {resumeUrl && <p><strong>Resume:</strong> <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
                    <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                </div>
            ) : (
                // Editing mode: show form to update profile information
                <form onSubmit={handleSaveProfile} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name:</label>
                        <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePicture">Profile Picture URL:</label>
                        <input type="text" id="profilePicture" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} placeholder="URL of your profile picture" />
                        {/* In a real app, you would integrate a file upload component here */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortBio">Short Bio:</label>
                        <textarea id="shortBio" value={shortBio} onChange={(e) => setShortBio(e.target.value)} rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="githubLink">GitHub Link:</label>
                        <input type="url" id="githubLink" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder="e.g., https://github.com/yourusername" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="behanceLink">Behance Link:</label>
                        <input type="url" id="behanceLink" value={behanceLink} onChange={(e) => setBehanceLink(e.target.value)} placeholder="e.g., https://www.behance.net/yourusername" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="personalWebsite">Personal Website:</label>
                        <input type="url" id="personalWebsite" value={personalWebsite} onChange={(e) => setPersonalWebsite(e.target.value)} placeholder="e.g., https://yourwebsite.com" />
                    </div>
                    {/* Checkboxes for public display options */}
                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="displaySkills" checked={displayCompletedSkills} onChange={(e) => setDisplayCompletedSkills(e.target.checked)} />
                        <label htmlFor="displaySkills">Display Completed Skills on Public Profile</label>
                    </div>
                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="displayCertificates" checked={displayCertificates} onChange={(e) => setDisplayCertificates(e.target.checked)} />
                        <label htmlFor="displayCertificates">Display Certificates on Public Profile</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="resumeUrl">Resume (External URL):</label>
                        <input type="url" id="resumeUrl" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="Link to your resume (e.g., Google Drive PDF)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resumeFile">Resume (Upload):</label>
                        <input type="file" id="resumeFile" onChange={(e) => setResumeFile(e.target.files[0])} accept=".pdf,.doc,.docx" />
                        {resumeFile && <p className="file-info">Selected: {resumeFile.name}</p>}
                        <small>Max file size: 5MB (example)</small>
                    </div>
                    <div className="button-group">
                        <button type="submit">Save Profile</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </form>
            )}

            <hr className="divider" /> {/* Visual separator */}

            <h3>Private Settings</h3>

            {/* Section for changing email address */}
            <div className="settings-section">
                <h4>Change Email Address</h4>
                <form onSubmit={handleUpdateEmail} className="private-setting-form">
                    <div className="form-group">
                        <label htmlFor="newEmail">New Email:</label>
                        <input type="email" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="setting-button">Update Email</button>
                </form>
            </div>

            {/* Section for changing password */}
            <div className="settings-section">
                <h4>Change Password</h4>
                <form onSubmit={handleChangePassword} className="private-setting-form">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="setting-button">Change Password</button>
                </form>
            </div>

            {/* Section for notification preferences */}
            <div className="settings-section">
                <h4>Notification Preferences</h4>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="challengeReminders" checked={challengeReminders} onChange={(e) => setChallengeReminders(e.target.checked)} />
                    <label htmlFor="challengeReminders">Challenge Reminders</label>
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="newContentAlerts" checked={newContentAlerts} onChange={(e) => setNewContentAlerts(e.target.checked)} />
                    <label htmlFor="newContentAlerts">New Content Alerts</label>
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="communityActivity" checked={communityActivity} onChange={(e) => setCommunityActivity(e.target.checked)} />
                    <label htmlFor="communityActivity">Community Activity</label>
                </div>
                <p><small>Changes to notification preferences are saved automatically (in a real app).</small></p>
            </div>

            <hr className="divider" /> {/* Visual separator */}

            {/* Section for account deletion */}
            <div className="settings-section">
                <h4>Account Deletion</h4>
                <button onClick={handleDeleteAccount} className="delete-account-button">Delete My Account</button>
                <p className="warning-text">Warning: This action is irreversible.</p>
            </div>
        </div>
    );
}

export default ProfileManager; // Export the ProfileManager component
