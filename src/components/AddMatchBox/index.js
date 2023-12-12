import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import actions from '../../actions';

const AddMatchBox = () => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [playersTeamA, setPlayersTeamA] = useState([]);
  const [playersTeamB, setPlayersTeamB] = useState([]);
  const [selectedPlayerTeamA, setSelectedPlayerTeamA] = useState(null);
  const [selectedPlayerTeamB, setSelectedPlayerTeamB] = useState(null);
  const [statsTeamA, setStatsTeamA] = useState({});
  const [statsTeamB, setStatsTeamB] = useState({});
  const [teams, setTeams] = useState([]);
  const [resultTeamA, setResultTeamA] = useState(0);
  const [resultTeamB, setResultTeamB] = useState(0);
  const [replay1, setReplay1] = useState('');
  const [penalty, setPenalty] = useState(false);


  const customStyles = {
    // Personalizza lo stile della tendina
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white', // Colore di sfondo scuro
      color: 'black', // Colore del testo bianco
    }),

    // Personalizza lo stile delle opzioni
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ccc' : 'white', // Colore di sfondo scuro quando selezionato
      color: 'black', // Colore del testo bianco
    }),

    // Personalizza lo stile dell'opzione selezionata
    singleValue: (provided) => ({
      ...provided,
      color: 'black', // Colore del testo bianco
    }),
  };


  useEffect(() => {
    actions.fetchTeams(setTeams);
  }, []);

  useEffect(() => {
    if (teamA) {
      console.log(teamA.value);
      actions.fetchPlayersByTeam(teamA, setPlayersTeamA, setStatsTeamA);
    }
  }, [teamA]);

  useEffect(() => {
    if (teamB) {
      console.log(teamB.value);
      actions.fetchPlayersByTeam(teamB, setPlayersTeamB, setStatsTeamB);
    }
  }, [teamB]);

  const handlePlayerSelect = (player, team) => {
    if (team === 'A') {
      setSelectedPlayerTeamA(player);
    } else {
      setSelectedPlayerTeamB(player);
    }
  };

  const handleStatsSubmit = (team, player, stats) => {
    if (team === 'A') {
      setStatsTeamA((prevStats) => {
        return {
          ...prevStats,
          [player.value]: { ...prevStats[player.value], ...stats },
        };
      });
    } else {
      setStatsTeamB((prevStats) => {
        return {
          ...prevStats,
          [player.value]: { ...prevStats[player.value], ...stats },
        };
      });
    }
  };

  const handleAddMatch = () => {

    if (teamA === '') {
      alert("Please select Team A");
      return;
    }

    if (teamB === '') {
      alert("Please select Team B");
      return;
    }

    if (teamA.value === teamB.value) {
      alert("Error: the match cannot be between the same team!");
      return;
    }

    if (resultTeamA < 0) {
      alert("Error: Team A Result can't be negative!");
      return;
    }

    if (resultTeamB < 0) {
      alert("Error: Team B Result can't be negative!");
      return;
    }
    if (Math.abs(resultTeamA - resultTeamB) > 10) {
      alert("Error: Mercy Rule hasn't been respected! The difference between results is higher than 10!");
      return;
    }


    if (replay1 === '') {
      alert("Error: replay link is required. Insert the link in Replay 1 box.");
      return;
    }
    if (replay1 != '' && (!replay1.startsWith("https://replay.thehax.pl/") && !replay1.startsWith("replay.thehax.pl/"))) {
      alert("Error: Replay must be uploaded here:\nhttps://replay.thehax.pl/upload\nAfter the upload, paste the link here.");
      return;
    }


    // Calcola il risultato del match
    const resultText = `[${teamA.label}] ${resultTeamA}:${resultTeamB} [${teamB.label}]`;

    // Crea l'oggetto con i dati da inviare al backend
    const matchData = {
      teamA: teamA.value,
      teamB: teamB.value,
      statsTeamA: statsTeamA,
      statsTeamB: statsTeamB,
      resultTeamA: resultTeamA,
      resultTeamB: resultTeamB,
      replay1: replay1,
      penalty: penalty,
    };

    /* console.log(matchData); */

    /*  let totGoalA = 0, totGoalB = 0, totAssistA = 0, totAssistB = 0, totCSA = 0, totCSB = 0;
     for (const playerName in statsTeamA) {
       console.log(playerName);
       const playerStats = statsTeamA[playerName];
       if (playerStats.goals) {
         if (playerStats.goals < 0) {
           alert("Error: " + playerName + " cannot have a negative goal number!");
           return;
         }
         totGoalA++;
       }
       if (playerStats.assists) {
         if (playerStats.assists < 0) {
           alert("Error: " + playerName + " cannot have a negative assist number!");
           return;
         }
         totAssistA++;
       }
       if (playerStats.cleansheet) {
         totCSA++;
       }
     }
 
     for (const playerName in statsTeamB) {
       const playerStats = statsTeamB[playerName];
       if (playerStats.goals) {
         if (playerStats.goals < 0) {
           alert("Error: " + playerName + " cannot have a negative goal number!");
           return;
         }
         totGoalB++;
       }
       if (playerStats.assists) {
         if (playerStats.goals < 0) {
           alert("Error: " + playerName + " cannot have a negative assist number!");
           return;
         }
         totAssistB++;
       }
       if (playerStats.cleansheet) totCSB++;
     }
 
     if (totGoalA > resultTeamA) {
       alert("Error: total goal scored from players (Team A) are higher than Team A score!");
       return;
     }
     if (totAssistA > resultTeamA) {
       alert("Error: total assist from players (Team A) are higher than Team A score!");
       return;
     }
     if (totAssistA > totGoalA) {
       alert("Error: total assist from players (Team A) are higher than total goals scored from players (Team A)!");
       return;
     }
     if (totGoalB > resultTeamB) {
       alert("Error: total goal scored from players (Team B) are higher than Team B score!");
       return;
     }
     if (totAssistB > resultTeamB) {
       alert("Error: total assist from players (Team B) are higher than Team B score!");
       return;
     }
     if (totAssistB > totGoalB) {
       alert("Error: total assist from players (Team B) are higher than total goals scored from players (Team B)!");
       return;
     } */

    /* if (totCSA > 1) {
      alert("Error: there is more than one cleansheet for players in Team A!");
      return;
    }
    if (totCSA === 1 && totGoalB > 0) {
      alert("Error: you selected a cleansheet for Team A but Team B scored " + totGoalB + " goal!");
      return;
    }
    if (totCSB > 1) {
      alert("Error: there is more than one cleansheet for players in Team B!");
      return;
    }
    if (totCSB === 1 && totGoalA > 0) {
      alert("Error: you selected a cleansheet for Team B but Team A scored " + totGoalA + " goal!");
      return;
    } */


    // Invia i dati delle statistiche e del risultato al backend per aggiungere il match al database
    fetch('https://competitivefutsal.it:8443/match/addMatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta dal server, ad esempio, mostra un messaggio di successo
        alert(data.message);
      })
      .catch((error) => {
        // Gestisci eventuali errori o risposte di errore dal server
        console.error('Errore durante la richiesta:', error);
        alert('Errore durante l\'aggiunta del match');
      });

    // Resetta gli stati per i prossimi inserimenti
    setTeamA('');
    setTeamB('');
    setPlayersTeamA([]);
    setPlayersTeamB([]);
    setSelectedPlayerTeamA(null);
    setSelectedPlayerTeamB(null);
    setStatsTeamA({});
    setStatsTeamB({});
    setResultTeamA(0);
    setResultTeamB(0);
    setReplay1('');
  };

  return (
    <div className="add-match-box">
      <h3><FontAwesomeIcon icon={faPlus} className='fa-icon' /><FontAwesomeIcon icon={faCalendarDays} className="fa-icon2" />Add Match</h3>
      <div className="team-box">
        <div className="team-a">
          <div>
            <label>Team A:</label>
            <Select
              value={teamA}
              options={teams}
              styles={customStyles} // Applica gli stili personalizzati alla select
              placeholder="Select a team"
              onChange={(selectedOption) => setTeamA(selectedOption)}
            />
          </div>
          {teamA && (
            <div>
              <label>Team A Players:</label>
              <ul className="player-list">
                {playersTeamA.map((player) => (
                  <li
                    key={player.value}
                    onClick={() => handlePlayerSelect(player, 'A')}
                    className={selectedPlayerTeamA === player ? 'selected' : ''}
                  >
                    {player.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPlayerTeamA && (
            <div>
              <h4>Stats for {selectedPlayerTeamA.label}</h4>
              {/* Form for setting player statistics for Team A */}
              <div>
                <label>Playtime (seconds):</label>
                <input
                  type="number"
                  value={statsTeamA[selectedPlayerTeamA.value]?.playtime || ''}
                  onChange={(e) => handleStatsSubmit('A', selectedPlayerTeamA, { playtime: e.target.value })}
                />
              </div>
              <div>
                <label>Goals:</label>
                <input
                  type="number"
                  value={statsTeamA[selectedPlayerTeamA.value]?.goals || ''}
                  onChange={(e) => handleStatsSubmit('A', selectedPlayerTeamA, { goals: e.target.value })}
                />
              </div>
              <div>
                <label>Assists:</label>
                <input
                  type="number"
                  value={statsTeamA[selectedPlayerTeamA.value]?.assists || ''}
                  onChange={(e) => handleStatsSubmit('A', selectedPlayerTeamA, { assists: e.target.value })}
                />
              </div>
              <div>
                <label>Cleansheet:</label>
                <input
                  type="number"
                  value={statsTeamA[selectedPlayerTeamA.value]?.cleansheet || ''}
                  onChange={(e) => handleStatsSubmit('A', selectedPlayerTeamA, { cleansheet: e.target.value })}
                />
              </div>
              {/* Add more statistic fields as needed */}
            </div>
          )}
        </div>
        <div className="team-b">
          <div>
            <label>Team B:</label>
            <Select
              value={teamB}
              styles={customStyles} // Applica gli stili personalizzati alla select
              onChange={(selectedOption) => setTeamB(selectedOption)}
              options={teams}
              placeholder="Select a team"
            />
          </div>
          {teamB && (
            <div>
              <label>Team B Players:</label>
              <ul className='player-list'>
                {playersTeamB.map((player) => (
                  <li
                    key={player.value}
                    onClick={() => handlePlayerSelect(player, 'B')}
                    className={selectedPlayerTeamB === player ? 'selected' : ''}
                  >
                    {player.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPlayerTeamB && (
            <div>
              <h4>Stats for {selectedPlayerTeamB.label}</h4>
              {/* Form for setting player statistics for Team B */}
              <div>
                <label>Playtime (seconds):</label>
                <input
                  type="number"
                  value={statsTeamB[selectedPlayerTeamB.value]?.playtime || ''}
                  onChange={(e) => handleStatsSubmit('B', selectedPlayerTeamB, { playtime: e.target.value })}
                />
              </div>
              <div>
                <label>Goals:</label>
                <input
                  type="number"
                  value={statsTeamB[selectedPlayerTeamB.value]?.goals || ''}
                  onChange={(e) => handleStatsSubmit('B', selectedPlayerTeamB, { goals: e.target.value })}
                />
              </div>
              <div>
                <label>Assists:</label>
                <input
                  type="number"
                  value={statsTeamB[selectedPlayerTeamB.value]?.assists || ''}
                  onChange={(e) => handleStatsSubmit('B', selectedPlayerTeamB, { assists: e.target.value })}
                />
              </div>
              <div>
                {/* <label>Cleansheet:</label>
                <select
                  value={statsTeamB[selectedPlayerTeamB.value]?.cleansheet || 'false'}
                  onChange={(e) => handleStatsSubmit('B', selectedPlayerTeamB, { cleansheet: e.target.value })}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select> */}
                <label>Cleansheet:</label>
                <input
                  type="number"
                  value={statsTeamB[selectedPlayerTeamB.value]?.cleansheet || ''}
                  onChange={(e) => handleStatsSubmit('B', selectedPlayerTeamB, { cleansheet: e.target.value })}
                />
              </div>
              {/* Add more statistic fields as needed */}
            </div>
          )}
        </div>
      </div>
      {/* ... Resto del codice rimane invariato ... */}
      <div>
        <div>
          <label>Score Team A:</label>
          <input
            type="number"
            value={resultTeamA}
            onChange={(e) => setResultTeamA(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Score Team B:</label>
          <input
            type="number"
            value={resultTeamB}
            onChange={(e) => setResultTeamB(parseInt(e.target.value))}
          />
        </div>
      </div>


      <div>
        <label>Replay Link:</label>
        <input
          type="text"
          value={replay1}
          onChange={(e) => setReplay1(e.target.value)}
        />
      </div>
      <div className="penalty-container">
        <label>Penalty (for Losing Team):</label>
        <div className='check-box'>
          <input
            type="checkbox"
            checked={penalty}
            onChange={(e) => setPenalty(e.target.checked)}
          />
        </div>
      </div>


      <button onClick={handleAddMatch}>Add Match</button>
    </div>
  );
};

export default AddMatchBox;
