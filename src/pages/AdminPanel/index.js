import React from 'react';
import AddPlayerBox from '../../components/AddPlayerBox';
import AddTeamBox from '../../components/AddTeamBox';
import './index.css';
import AddMatchBox from '../../components/AddMatchBox';
import AddTOTW from '../../components/AddTOTW';
import TransferPlayerBox from '../../components/TransferPlayer';
import ChangePlayerCostBox from '../../components/ChangePlayerCost';

const AdminPanel = () => {
    return (
        <div className="adm-container">
            <div className='adm-box'>
                <AddPlayerBox />
                <TransferPlayerBox />
                <ChangePlayerCostBox />
            </div>
            <div className='adm-box'>
                <AddMatchBox />
            </div>
            <div className='adm-box'>
                <AddTeamBox />
                <AddTOTW />
            </div>


        </div>
    )
}

export default AdminPanel;
