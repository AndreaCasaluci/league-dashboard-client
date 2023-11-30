import React from 'react'
import './index.css'

const LeaderboardTeamNameLogo = (teamName) => {
    let tmpTeamName = teamName.teamName;
    let teamLogoFileName = tmpTeamName.replace(/\s/g, "_");
    const teamLogo = require(`/teamLogos/${teamLogoFileName}.png`);


    return (
        <div className='team-name-logo'>
            <div className='team-name'><img src={teamLogo} className='team-logo'></img><b>{teamName.teamName}</b></div>
        </div>
    )
}

export default LeaderboardTeamNameLogo