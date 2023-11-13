// TeamsPage.js
import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard'; // Assicurati che il percorso sia corretto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';

import './TeamsPage.css'; // Importa il tuo file CSS se necessario

const TeamsPage = () => {
  const [teams, setTeams] = useState([]); // Assicurati di avere un array di squadre
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('http://localhost:5000/teamsPage'); // Assicurati che l'endpoint del backend sia corretto
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          console.error('Errore nel recupero dei dati delle squadre');
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati delle squadre:', error);
      }
    }

    fetchTeams();
  }, []); // Assicurati di gestire correttamente l'effetto collaterale

  return (
    <div className="teams-page">
      <div className='title-header'>
        <h2 className='title-text'><FontAwesomeIcon icon={faUsers} className="fa-icon2"/>CFL Teams</h2>
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for a specific team..."
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="team-cards-container">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team._id} // Assicurati di avere un identificatore unico per ciascuna squadra
            teamName={team.name}
            shortName={team.shortName}
            players={team.players}
            foundationDate={team.foundationDate}
            totalCost={team.totalCost}
            logoFileName={team.logoFileName}
            leaderboardPosition={team.leaderboardPosition}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
