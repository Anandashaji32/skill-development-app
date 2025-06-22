// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Dashboard({ user, onUpdateProfile }) {
    return (
        <div className="dashboard-layout">
            <Sidebar user={user} />
            <MainContent user={user} onUpdateProfile={onUpdateProfile} />
        </div>
    );
}

export default Dashboard;
