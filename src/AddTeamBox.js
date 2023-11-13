import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import axios from 'axios';

import './AddTeamBox.css';

const AddTeamBox = () => {
  const [teamName, setTeamName] = useState('');
  const [teamShortName, setTeamShortName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [logoFile, setLogoFile] = useState(null); // Aggiunto stato per il file del logo
  const [playersWithoutTeam, setPlayersWithoutTeam] = useState([]);
  const [shortNameError, setShortNameError] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');


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
    // Esegui una chiamata API per ottenere la lista di giocatori senza squadra dal tuo server
    // Aggiorna lo stato 'playersWithoutTeam' con i dati ricevuti

    // Esempio di chiamata API (assicurati di adattarla alle tue esigenze):
    fetch('http://localhost:5000/playersWithoutTeam')
      .then((response) => response.json())
      .then((data) => setPlayersWithoutTeam(data))
      .catch((error) => console.error('Errore nel recupero dei giocatori senza squadra:', error));
  }, []);

  
  const validateShortName = (shortName) => {
    // Verifica se lo shortname contiene solo caratteri alfabetici
    if (/^[a-zA-Z]+$/.test(shortName)) {
      setShortNameError('');
    } else {
      setShortNameError('Error: Team Short Name must contain only alphabetical characters!');
    }
  };


  const validateFileSize = (file) => {
    // Controlla se il file supera i 200KB (200 * 1024 bytes)
    if (file.size > 200000) {
      setFileSizeError('Error: Team Logo must be less than 200KB');
      return false;
    } else {
      setFileSizeError('');
      return true;
    }
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateFileSize(file)) {
        setLogoFile(file);
      }
      else{
        e.target.value = null;
        alert('Error: Team Logo must be less than 200KB');
      }
    }
  };


  /* const handleSubmit = async (e) => {
    e.preventDefault();

    // Creazione di un oggetto dati da inviare al server
    const data = {
      teamName,
      teamShortName,
      selectedPlayers,
      logoFile, // Aggiunto il file del logo ai dati da inviare
    };

    try {
      if (data.teamName === '' || data.teamName === undefined || data.teamName === null) {
        alert('Error: you must insert a Team Name!');
        return;
      }
      if (data.teamShortName === '' || data.teamShortName === undefined || data.teamShortName === null) {
        alert('Error: you must insert a Team Short Name!');
        return;
      } else if (data.teamShortName.length !== 3) {
        alert('Error: Team Short Name must be 3 characters long!');
        return;
      }
      if (!data.logoFile) {
        alert('Error: you must upload a team logo!');
        return;
      }

      if (shortNameError) {
        alert(shortNameError);
        return;
      }

      const response = await fetch('/addTeam', {
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
          console.error('Error while trying to add a team', response.status, response.statusText);
          alert('Error while trying to add a team');
        }
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }

    // Dopo l'invio dei dati, reimposta gli stati per i prossimi inserimenti
    setTeamName('');
    setTeamShortName('');
    setSelectedPlayers([]);
    setLogoFile(null); // Resetta il file del logo
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('teamName', teamName);
    formData.append('teamShortName', teamShortName);
    const selectedPlayersName=Array.from(selectedPlayers.map((player)=>(player.name)));
    formData.append('selectedPlayers', JSON.stringify(selectedPlayersName));
    formData.append('logoFile', logoFile);
    try {
      if (teamName === '' || teamShortName === '' || logoFile === null) {
        alert('Error: Please fill in all required fields.');
        return;
      }
  
      const response = await axios.post('/addTeam', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const tmpData = response.data;
      if (response.status === 200) {
        // Gestisci la risposta dal server, ad esempio, mostra un messaggio di successo
        alert(tmpData.message);
      } else {
        if (response.status === 201 || response.status === 500) alert(tmpData.message);
        else {
          // Gestisci eventuali errori o risposte di errore dal server
          console.error('Error while trying to add a team', response.status, response.statusText);
          alert('Error while trying to add a team');
        }
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  
    // Dopo l'invio dei dati, reimposta gli stati per i prossimi inserimenti
    setTeamName('');
    setTeamShortName('');
    setSelectedPlayers([]);
    setLogoFile(null); // Resetta il file del logo
  };
  


  return (
    <div className="add-team-box">
      <h3><FontAwesomeIcon icon={faPlus} className='fa-icon'/><FontAwesomeIcon icon={faPeopleGroup} className="fa-icon2"/>Add Team</h3>
      <form onSubmit={handleSubmit} method="POST" action="/addTeam" encType="multipart/form-data">
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <label htmlFor="teamShortName">Short Name:</label>
        <input
          type="text"
          id="teamShortName"
          value={teamShortName}
          onChange={(e) => {
            setTeamShortName(e.target.value);
            validateShortName(e.target.value);
          }}
        />

        {/* Aggiunto il campo per caricare il logo */}
        <label htmlFor="logoFile">Team Logo (max 200KB):</label>
        <input
          type="file"
          id="logoFile"
          name="logoFile"
          accept="image/png, image/jpeg"
          onChange={handleLogoChange}
        />

        <label htmlFor="selectedPlayers">Select Players:</label>
        <Select
          id="selectedPlayers"
          isMulti
          value={selectedPlayers}
          options={playersWithoutTeam.map((player) => ({ value: player, label: player, name: player }))}
          styles={customStyles} // Applica gli stili personalizzati alla select
          onChange={(selectedOptions) => setSelectedPlayers(selectedOptions)}
        />

        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default AddTeamBox;
