// TeamOfTheWeekCard.js
import React from 'react';
import { AutoTextSize } from 'auto-text-size'
import './index.css'; // Importa il tuo file CSS

const TeamOfTheWeekCard = ({ role, teamLogo, playerAvatar, playerName }) => {

  /* console.log(teamLogoFileName);*/
  const teamLogoPath = require("/teamLogos/" + teamLogo);

  return (
    <div className="team-of-the-week-card">
      <div className='top-role-logo'>
        <div className="top-left">{role}</div>
        <div className="top-right">
          <img src={"https://competitivefutsal.it/teamLogos/" + teamLogo} alt="Team Logo" className="team-logo" />
        </div>
      </div>
      <div className="center">
        <div className="empty-circle">
          <div className="player-avatar">{playerAvatar}</div>
        </div>
      </div>
      <div className="bottom"><AutoTextSize maxFontSizePx={16}>{playerName}</AutoTextSize></div>
    </div>
  );
};

export default TeamOfTheWeekCard;
