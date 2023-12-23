import React from 'react'
import './index.css'

const StatsLeaderboardTeamNameLogo = (teamName) => {
    let tmpTeamName = teamName.teamName;
    let teamLogoFileName = tmpTeamName.replace(/\s/g, "_");

    var teamToShortName = {
        "The Hive": "HIV",
        "Potatoes FC": "POT",
        "Free Agent": "F/A",
        "Atlamp": "ATL",
        "HaxLock All Stars": "HAS",
        "The Anbeliveball Turkishs": "TAT",
        "QS Assurdi": "QSA",
        "HaxPostoli FC": "HAP",
        "ADB": "ADB",
        "PastaMakers69": "PMA",
        "I Trapezi": "TRP",
        "Team Rocket": "TMR",
        "La Bocciofila": "BOC"
    }

    /* const teamLogo = require(`/teamLogos/${teamLogoFileName}.png`); */


    return (
        <div className='stats-team-name-logo'>
            <img src={`https://competitivefutsal.it/teamLogos/${teamLogoFileName}.png`} className='team-logo2'></img>
            {/* <div className='team-name2'>{teamName.teamName}</div> */}
            <div className='team-name2'>{teamToShortName[teamName.teamName]}</div>
        </div>
    )
}

export default StatsLeaderboardTeamNameLogo