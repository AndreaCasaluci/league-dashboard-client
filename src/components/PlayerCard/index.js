// PlayerCard.js
import React from 'react';
import { AutoTextSize } from 'auto-text-size'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faFutbol, faHandshake, faMitten, faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons'; // Sostituisci con le icone appropriate
import './index.css'; // Importa lo stile CSS

const PlayerCard = ({ playerName, team, goals, assists, cleansheets, playtime, cost, teamLogoFileName }) => {
  const teamLogoPath = require(`../../../../teamLogos/${teamLogoFileName}`);

  return (
    <div className="player-card">
      <div className='top-row'>
        <div className='left-empty-box'></div>
        <div className='player-name'><AutoTextSize maxFontSizePx={18} className='player-name2'>{playerName}</AutoTextSize></div>
        <div className='right-logo-box'>{teamLogoFileName && <img src={teamLogoPath} alt={`${team} Logo`} className="team-logo" />}</div>
      </div>


      {/* <div className='player-name'>

        <h3>
          {playerName}
          {teamLogoFileName && <img src={teamLogoPath} alt={`${team} Logo`} className="team-logo" />}
        </h3>
      </div> */}
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
            {cost === 0 ?
              <div className="info-item">
                <FontAwesomeIcon icon={faCoins} className="info-icon" />
                <span>{cost}</span>
              </div>

              :

              cost === 1 ?
                <div className="info-item-cost1">
                  <FontAwesomeIcon icon={faCoins} className="info-icon" />
                  <span>{cost}</span>
                </div>

                :

                cost === 2 ?
                  <div className="info-item-cost2">
                    <FontAwesomeIcon icon={faCoins} className="info-icon" />
                    <span>{cost}</span>
                  </div>

                  :
                  <div className="info-item-cost3">
                    <FontAwesomeIcon icon={faCoins} className="info-icon" />
                    <span>{cost}</span>
                  </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
