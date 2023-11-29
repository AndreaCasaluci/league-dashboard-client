import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { AutoTextSize } from 'auto-text-size'
import StatsLeaderboardTeamNameLogo from '../../components/StatsLeaderboardTeamNameLogo';
import './index.css';
const AssistLeaderboard = ({ classifica }) => {
  // Clona l'array classifica
  const assistPerMatchLeaderboard = [...classifica];

  // Filtra e ordina il nuovo array
  assistPerMatchLeaderboard
    .filter((player) => player.matches !== 0)
    .sort((a, b) => {
      if (b.matches > 0 && a.matches > 0) {
        return (b.assist / b.matches) - (a.assist / a.matches);
      } else return 0;
    });

  return (
    <div className='assist-leaderboard-container'>
      <div className='assist-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faHandshake} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Assist Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {classifica.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Assist</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {classifica.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.assist}</td>
                    <td>{player.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Assist Leaderboard at the moment.</p>
          )}
        </div>
      </div>
      <div className='assist-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faHandshake} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Assist Per Match Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {assistPerMatchLeaderboard.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Assist per Match</th>
                </tr>
              </thead>
              <tbody>
                {assistPerMatchLeaderboard.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.matches !== 0 ? (player.assist / player.matches).toFixed(2) : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Assist Per Match Leaderboard at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistLeaderboard;
