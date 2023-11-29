import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import LeaderboardTeamNameLogo from '../../components/LeaderboardTeamNameLogo';

import './index.css';

const LeagueLeaderboard = ({ classifica }) => {
  return (
    <div className='league-leaderboard-page'>
      <div className='title-header'>
        <h2 className='title-text'><FontAwesomeIcon icon={faTrophy} className="fa-icon2" />League Leaderboard</h2>
      </div>
      <div className='table-container'>
        {classifica.length > 0 ? ( // Controlla se ci sono dati
          <>
            <table className='table-style'>
              <thead>
                <tr className='table-header'>
                  <th>Pos</th>
                  <th>Team</th>
                  <th>G</th>
                  <th>V</th>
                  <th>N</th>
                  <th>P</th>
                  <th>+/-</th>
                  <th>DR</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {classifica.map((squadra, index) =>
                (



                  <tr key={index} className={index < 1 ? 'top-teams' : index >= classifica.length - 1 ? 'last-row' : ''}>
                    <td><b>{index + 1}</b></td>
                    <td><b><LeaderboardTeamNameLogo teamName={squadra.team} /></b></td>
                    <td>{squadra.matches}</td>
                    <td>{squadra.win}</td>
                    <td>{squadra.draw}</td>
                    <td>{squadra.loss}</td>
                    <td>{squadra.scoredtaken}</td>
                    <td>{squadra.dr}</td>
                    <td><b>{squadra.points}</b></td>
                  </tr>
                )
                )}
              </tbody>
            </table>
            <div className='legend'><div className='green-block'></div><b>Qualified for Playoffs</b></div>
          </>
        ) : (
          <p className="no-data-message">No data available for League Leaderboard at the moment.</p>
        )}
      </div>
    </div >
  );
};

export default LeagueLeaderboard;
