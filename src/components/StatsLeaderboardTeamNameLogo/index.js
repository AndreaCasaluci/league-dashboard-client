import React from 'react'
import './index.css'

const StatsLeaderboardTeamNameLogo = (teamName) => {
    let tmpTeamName = teamName.teamName;
    let teamLogoFileName = tmpTeamName.replace(/\s/g, "_");
    /* const teamLogo = require(`/teamLogos/${teamLogoFileName}.png`); */


    return (
        <div className='stats-team-name-logo'>
            <img src={`https://competitivefutsal.it/teamLogos/${teamLogoFileName}.png`} className='team-logo2'></img>
            <div className='team-name2'>{teamName.teamName}</div>
        </div>
    )
}

export default StatsLeaderboardTeamNameLogo