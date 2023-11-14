import React from 'react';

const LeagueLeaderboard = ({ classifica }) => {
  return (
    <>
    <div className='section-title'>League Leaderboard</div>
    <div className='table-container'>
    {classifica.length > 0 ? ( // Controlla se ci sono dati
          <table>
          <thead>
            <tr>
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
            {classifica.map((squadra, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{squadra.team}</b></td>
                <td>{squadra.matches}</td>
                <td>{squadra.win}</td>
                <td>{squadra.draw}</td>
                <td>{squadra.loss}</td>
                <td>{squadra.scoredtaken}</td>
                <td>{squadra.dr}</td>
                <td>{squadra.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p className="no-data-message">No data available for League Leaderboard at the moment.</p>
        )}
    </div>
    </>
  );
};

export default LeagueLeaderboard;
