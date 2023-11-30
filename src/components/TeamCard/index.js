// TeamCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUsers, faCalendarAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import './index.css'; // Importa il tuo file CSS

const TeamCard = ({ teamName, shortName, players, foundationDate, totalCost, logoFileName, leaderboardPosition }) => {
  const teamLogoPath = require(`/teamLogos/${logoFileName}`);
  const captainIconPath = require(`./captain_icon.png`);
  const date = new Date(foundationDate);
  let month = date.getMonth() + 1;
  const dateStr = date.getDate() + "/" + month + "/" + date.getFullYear();

  const isPlayerLenghtAboveZero = players.length > 0;

  return (
    <div className="team-card">
      <div className='short-name'>{shortName}</div>
      {/* <h3 className='team-title'>
        {teamName}
        <img src={teamLogoPath} alt={`${teamName} Logo`} className="team-logo" />
      </h3> */}
      <div className='team-name-container'>
        <div className='left-void-block'></div>
        <div className='team-name'><h3 className='team-title'>{teamName}</h3></div>
        <div className='team-logo-container'> <img src={`https://competitivefutsal.it/teamLogos/${logoFileName}`} alt={`${teamName} Logo`} className="team-logo" /></div>
      </div>
      <div className="team-info">
        <div className="info-box">
          <div className="info-item-container">
            <div className="info-item">
              <FontAwesomeIcon icon={faUsers} className="info-icon" />
              <span>{players.length}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faCoins} className="info-icon" />
              <span>{totalCost}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faTrophy} className="info-icon" />
              <span className="leaderboard-position">{leaderboardPosition + "°"}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
              <span>{dateStr}</span>
            </div>
          </div>
        </div>
      </div>

      {isPlayerLenghtAboveZero ? (<div className="players-list">
        <div className='players-title'><strong>Players:</strong></div>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {index === 0 ? (
                <>
                  {player}
                  <span className="captain-icon"><img src={captainIconPath} className='captain-icon'></img></span>
                </>
              ) : (
                player
              )}
            </li>
          ))}
        </ul>
      </div>) : null}
    </div>
  );
};

export default TeamCard;
