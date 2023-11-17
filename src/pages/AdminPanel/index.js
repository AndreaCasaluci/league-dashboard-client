import React from 'react';
import AddPlayerBox from '../../components/AddPlayerBox';
import AddTeamBox from '../../components/AddTeamBox';
import './index.css';
import AddMatchBox from '../../components/AddMatchBox';
import AddTOTW from '../../components/AddTOTW';

const AdminPanel = () => {
    return (
        <div className="container">
            <AddPlayerBox />
            <AddMatchBox />
            <AddTeamBox />
            <AddTOTW />
        </div>
    )
}

export default AdminPanel;
