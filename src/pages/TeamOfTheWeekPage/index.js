// TeamOfTheWeekPage.js
import React, { useEffect, useState } from 'react';
import './index.css'; // Importa il tuo file CSS
import TeamOfTheWeekCard from '../../components/TeamOfTheWeekCard'; // Assicurati che il percorso sia corretto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';



const TeamOfTheWeekPage = () => {
  const [teamOfTheWeeks, setTeamOfTheWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    // Carica i dati da MongoDB o dalla tua API
    async function fetchTeamOfTheWeeks() {
      try {
        const response = await fetch('http://localhost:5000/team/teamOfTheWeeks');
        if (response.ok) {
          const data = await response.json();
          setTeamOfTheWeeks(data);
          // Imposta di default l'ultima settimana disponibile
          if (data.length > 0) {
            setSelectedWeek(data[data.length - 1].weekNumber);
            console.log(data);
          }
        } else {
          console.error('Errore nel recupero dei dati Team Of The Week');
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati Team Of The Week:', error);
      }
    }

    fetchTeamOfTheWeeks();
  }, []);

  return (
    <div className="team-of-the-week-page">
      <div className='title-header'>
        <h2 className='title-text'><FontAwesomeIcon icon={faAward} className="fa-icon2" />Team of The Week {selectedWeek}</h2>
      </div>
      <div className="week-selector">
        <label></label>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          {teamOfTheWeeks.map((week) => (
            <option key={week.weekNumber} value={week.weekNumber}>
              Team of the Week {week.weekNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="team-of-the-week-cards-container">
        {teamOfTheWeeks
          .filter((week) => week.weekNumber === selectedWeek)
          .map((week) => (
            <div key={week.weekNumber} className="team-of-the-week-container">
              {week.players.map((player) => (
                <TeamOfTheWeekCard
                  key={player.name}
                  role={player.role}
                  teamLogo={player.teamLogo}
                  playerAvatar={player.avatar}
                  playerName={player.name}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamOfTheWeekPage;
