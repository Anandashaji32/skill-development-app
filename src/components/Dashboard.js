// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css'; // We'll create this CSS
import Sidebar from './Sidebar';       // We'll create this component
import MainContent from './MainContent'; // We'll create this component

function Dashboard({ user, onUpdateProfile }) {
    return (
        <div className="dashboard-layout">
            <Sidebar user={user} />
            <MainContent user={user} onUpdateProfile={onUpdateProfile} />
        </div>
    );
}

export default Dashboard;