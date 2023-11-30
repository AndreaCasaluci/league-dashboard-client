import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

import actions from '../../actions';

import "./index.css";

const AddPlayerBox = () => {
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [cost, setCost] = useState(0);

  const [teams, setTeams] = useState([]); // Stato per la lista delle squadre

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
    actions.fetchAllTeams(setTeams);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creazione di un oggetto dati da inviare al server
    const data = {
      playerName,
      teamName: selectedTeam.name, // Assicurati che questo campo sia corretto
      cost,
    };

    console.log(data);

    try {
      if (data.cost < 0) {
        alert("Error: Player Cost cannot be negative!");
        return;
      }
      else if (data.cost > 3) {
        alert("Error: Player Cost cannot be higher than 3!");
        return;
      }
      else if (data.playerName === '' || data.playerName === undefined || data.playerName === null) {
        alert("Error: you must insert a Player Name!");
        return;
      }
      else if (data.teamName === '' || data.teamName === undefined || data.teamName === null) {
        alert("Error: you must select a Team!");
        return;
      }
      const response = await fetch('https://competitivefutsal.it:8443/player/addPlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const tmpData = await response.json();
      if (response.status === 200) {
        // Gestisci la risposta dal server, ad esempio, mostra un messaggio di successo
        alert(tmpData.message);
      } else {
        if (response.status === 201 || response.status === 500) alert(tmpData.message);
        else {
          // Gestisci eventuali errori o risposte di errore dal server
          console.error('Error while trying to add a player', response.status, response.statusText);
          alert('Error while trying to add a player')
        }

      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }

    // Dopo l'invio dei dati, puoi reimpostare gli stati per i prossimi inserimenti
    setPlayerName('');
    setSelectedTeam('');
    setCost(0);
  };


  return (
    <div className="add-player-box">
      <h3><FontAwesomeIcon icon={faPlus} className='fa-icon' /><FontAwesomeIcon icon={faPersonRunning} className="fa-icon2" />Add Player</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Player Name:</label>
        <input
          type="text"
          id="playerName"
          className="input-field"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <label htmlFor="selectedTeam">Select Team:</label>
        <Select
          id="selectedTeam"
          className="select-field"
          value={selectedTeam}
          options={teams.map((team) => ({ value: team, label: team.value, name: team.value }))}
          styles={customStyles} // Applica gli stili personalizzati alla select
          onChange={(selectedOption) => setSelectedTeam(selectedOption)}
        />

        <label htmlFor="cost">Cost:</label>
        <input
          type="number"
          id="cost"
          className="input-field"
          value={cost}
          onChange={(e) => setCost(parseFloat(e.target.value))}
        />

        <button onClick={handleSubmit} type="submit" className="submit-button">
          Add Player
        </button>
      </form>
    </div>

  );
};

export default AddPlayerBox;
