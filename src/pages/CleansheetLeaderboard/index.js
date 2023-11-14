import React from 'react';

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
    <div className='leaderboard-container'>
      <div className='leaderboard'>
        <div className='section-title'>Cleansheet Leaderboard</div>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{player.name}</b></td>
                <td>{player.team}</td>
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
      <div className='leaderboard'>
        <div className='section-title'>Cleansheet per Match Leaderboard</div>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{player.name}</b></td>
                <td>{player.team}</td>
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
