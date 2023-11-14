// PlayersPage.js
import React, { useEffect, useState } from 'react';
import PlayerCard from '../../components/PlayerCard'; // Assicurati che il percorso sia corretto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faSearch } from '@fortawesome/free-solid-svg-icons';

import actions from '../../actions';

import './index.css'; // Importa il tuo file CSS se necessario

const PlayersPage = () => {
  const [players, setPlayers] = useState([]); // Assicurati di avere un array di giocatori
  const [searchTerm, setSearchTerm] = useState('');


  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {

    actions.fetchPlayers(setPlayers);

  }, []); // Assicurati di gestire correttamente l'effetto collaterale

  return (
    <div className="players-page">
      <div className='title-header'>
        <h2 className='title-text'><FontAwesomeIcon icon={faPersonRunning} className="fa-icon2" />CFL Players</h2>
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for a specific player..."
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="player-cards-container">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player._id} // Assicurati di avere un identificatore unico per ciascun giocatore
            playerName={player.name}
            team={player.team}
            goals={player.goal}
            assists={player.assist}
            cleansheets={player.cleansheet}
            playtime={player.playtime}
            cost={player.cost}
            teamLogoFileName={player.teamLogo}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
