import React from 'react';
import AddPlayerBox from './AddPlayerBox';
import AddTeamBox from './AddTeamBox';
import './AdminPanel.css';
import AddMatchBox from './AddMatchBox';

const AdminPanel = () => {
    return (
        <div className="container">
            <AddPlayerBox />
            <AddMatchBox />
            <AddTeamBox />
        </div>
    )
}

export default AdminPanel;
