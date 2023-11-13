// TeamOfTheWeekCard.js
import React from 'react';
import './TeamOfTheWeekCard.css'; // Importa il tuo file CSS

const TeamOfTheWeekCard = ({ role, teamLogo, playerAvatar, playerName }) => {
    
    /* console.log(teamLogoFileName);*/
    const teamLogoPath = require("./../../teamLogos/"+teamLogo); 
    console.log(teamLogoPath);

  return (
    <div className="team-of-the-week-card">
      <div className='top-role-logo'>
      <div className="top-left">{role}</div>
      <div className="top-right">
        <img src={teamLogoPath} alt="Team Logo" className="team-logo" />
      </div>
      </div>
      <div className="center">
        <div className="empty-circle">
          <div className="player-avatar">{playerAvatar}</div>
        </div>
      </div>
      <div className="bottom">{playerName}</div>
    </div>
  );
};

export default TeamOfTheWeekCard;
