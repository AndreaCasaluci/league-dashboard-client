import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { AutoTextSize } from 'auto-text-size'
import StatsLeaderboardTeamNameLogo from '../../components/StatsLeaderboardTeamNameLogo';
import './index.css';
const GoalLeaderboard = ({ classifica }) => {
  // Clona l'array classifica
  var goalPerMatchLeaderboard = [...classifica];

  // Filtra e ordina il nuovo array
  goalPerMatchLeaderboard = goalPerMatchLeaderboard
    .filter((player) => player.matches !== 0 && player.goal > 0)
    .sort((a, b) => {
      if (b.matches > 0 && a.matches > 0) {
        return (b.goal / b.matches) - (a.goal / a.matches);
      } else return 0;
    });

  return (
    <div className='goal-leaderboard-container'>
      <div className='goal-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faFutbol} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Goal Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {classifica.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Goal</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {classifica.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.goal}</td>
                    <td>{player.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Goal Leaderboard at the moment.</p>
          )}
        </div>
      </div>
      <div className='goal-leaderboard'>
        <div className='title-header'>
          <div className='title-text'><FontAwesomeIcon icon={faFutbol} className="fa-icon2" /><AutoTextSize maxFontSizePx={26}>Goal Per Match Leaderboard</AutoTextSize></div>
        </div>
        <div className='table-container'>
          {goalPerMatchLeaderboard.length > 0 ? ( // Controlla se ci sono dati
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Goal per Match</th>
                </tr>
              </thead>
              <tbody>
                {goalPerMatchLeaderboard.map((player, index) => (
                  <tr key={index} className={index === 0 ? 'first-pos' : index === 1 ? 'second-pos' : index === 2 ? 'third-pos' : ''}>
                    <td>{index + 1}</td>
                    <td><b>{player.name}</b></td>
                    <td><StatsLeaderboardTeamNameLogo teamName={player.team} /></td>
                    <td>{player.matches !== 0 ? (player.goal / player.matches).toFixed(2) : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No data available for Goal Per Match Leaderboard at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalLeaderboard;
