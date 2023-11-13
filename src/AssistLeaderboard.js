import React from 'react';

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
    <div className='leaderboard-container'>
      <div className='leaderboard'>
        <div className='section-title'>Assist Leaderboard</div>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{player.name}</b></td>
                <td>{player.team}</td>
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
      <div className='leaderboard'>
        <div className='section-title'>Assist per Match Leaderboard</div>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td><b>{player.name}</b></td>
                <td>{player.team}</td>
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
