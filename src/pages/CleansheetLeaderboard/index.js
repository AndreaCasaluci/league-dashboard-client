import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMitten } from '@fortawesome/free-solid-svg-icons';
import { AutoTextSize } from 'auto-text-size'
import StatsLeaderboardTeamNameLogo from '../../components/StatsLeaderboardTeamNameLogo';
import './index.css';

const CleansheetLeaderboard = ({ classifica }) => {
  // Clona l'array classifica
  const cleansheetPerMatchLeaderboard = [...classifica];

  // Filtra e ordina il nuovo array
  cleansheetPerMatchLeaderboard
    .filter((player) => player.matches !== 0)
    .sort((a, b) => {
      if (b.matches > 0 && a.matches > 0) {
        return (b.cleansheet / b.matches) - (a.cleansheet / a.matches);
      } else return 0;
    });

  return (
    <div className='cs-leaderboard-container'>
      <div className='cs-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faMitten} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Cleansheet Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {classifica.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Cleansheet</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {classifica.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.cleansheet}</td>
                    <td>{player.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Cleansheet Leaderboard at the moment.</p>
          )}
        </div>
      </div>
      <div className='cs-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faMitten} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Cleansheet Per Match Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {cleansheetPerMatchLeaderboard.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Cleansheet per Match</th>
                </tr>
              </thead>
              <tbody>
                {cleansheetPerMatchLeaderboard.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.matches !== 0 ? (player.cleansheet / player.matches).toFixed(2) : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Cleansheet Per Match Leaderboard at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CleansheetLeaderboard;
