// PlayerCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faFutbol, faHandshake, faMitten, faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons'; // Sostituisci con le icone appropriate
import './index.css'; // Importa lo stile CSS

const PlayerCard = ({ playerName, team, goals, assists, cleansheets, playtime, cost, teamLogoFileName }) => {
  const teamLogoPath = require(`../../../../teamLogos/${teamLogoFileName}`);

  return (
    <div className="player-card">
      <div className='player-name'>
        <h3>
          {playerName}
          {teamLogoFileName && <img src={teamLogoPath} alt={`${team} Logo`} className="team-logo" />}
        </h3>
      </div>
      <div className="player-info">
        <div className='info-box'>
          <div className="info-item">
            <div className='info-item-container'>
              <FontAwesomeIcon icon={faUsers} className="info-icon" />
              <span className='team-name'>{team}</span>
            </div>
          </div>
          <div className='info-item-container'>
            <div className="info-item">
              <FontAwesomeIcon icon={faFutbol} className="info-icon" />
              <span>{goals}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faHandshake} className="info-icon" />
              <span>{assists}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faMitten} className="info-icon" />
              <span>{cleansheets}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faStopwatch} className="info-icon" />
              <span>{playtime}</span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faCoins} className="info-icon" />
              <span>{cost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
