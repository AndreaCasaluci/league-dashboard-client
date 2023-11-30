import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

import actions from '../../actions';

import "./index.css";

const TransferPlayerBox = () => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const [teams, setTeams] = useState([]); // Stato per la lista delle squadre
    const [players, setPlayers] = useState([]);

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
        console.log(teams);
        actions.fetchPlayers(setPlayers);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creazione di un oggetto dati da inviare al server
        const data = {
            playerName: selectedPlayer.name,
            teamName: selectedTeam.name, // Assicurati che questo campo sia corretto
        };

        try {

            const response = await fetch('http://competitivefutsal.it:5000/player/transferPlayer', {
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
                    console.error('Error while trying to transfer a player', response.status, response.statusText);
                    alert('Error while trying to transfer a player')
                }

            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }

        // Dopo l'invio dei dati, puoi reimpostare gli stati per i prossimi inserimenti
        setSelectedPlayer('');
        setSelectedTeam('');
    };


    return (
        <div className="transfer-player-box">
            <h3><FontAwesomeIcon icon={faPlus} className='fa-icon' /><FontAwesomeIcon icon={faPersonRunning} className="fa-icon2" />Transfer Player</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="playerName">Player Name:</label>
                <Select
                    id="selectedPlayer"
                    className="select-field"
                    value={selectedPlayer}
                    options={players.map((player) => ({ value: player, label: player.name, name: player.name }))}
                    styles={customStyles} // Applica gli stili personalizzati alla select
                    onChange={(selectedOption) => setSelectedPlayer(selectedOption)}
                />

                <label htmlFor="selectedTeam">New Team:</label>
                <Select
                    id="selectedTeam"
                    className="select-field"
                    value={selectedTeam}
                    options={teams.map((team) => ({ value: team, label: team.value, name: team.value }))}
                    styles={customStyles} // Applica gli stili personalizzati alla select
                    onChange={(selectedOption) => setSelectedTeam(selectedOption)}
                />

                <button type="submit" className="submit-button">
                    Transfer Player
                </button>
            </form>
        </div>

    );
};

export default TransferPlayerBox;
