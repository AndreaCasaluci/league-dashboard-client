import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCoins } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

import actions from '../../actions';

import "./index.css";

const ChangePlayerCostBox = () => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [cost, setCost] = useState(0);

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
        actions.fetchPlayers(setPlayers);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cost > 3 || cost < 0) {
            alert("Error: player cost must be between 0 and 3 coins!");
            return;
        }

        // Creazione di un oggetto dati da inviare al server
        const data = {
            playerName: selectedPlayer.name,
            cost: cost, // Assicurati che questo campo sia corretto
        };



        try {

            const response = await fetch('http://competitivefutsal.it:5000/player/changeCost', {
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
                    console.error('Error while trying to change Player Cost', response.status, response.statusText);
                    alert('Error while trying to change Player Cost')
                }

            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }

        // Dopo l'invio dei dati, puoi reimpostare gli stati per i prossimi inserimenti
        setSelectedPlayer('');
        setCost(0);
    };


    return (
        <div className="transfer-player-box">
            <h3><FontAwesomeIcon icon={faPlus} className='fa-icon' /><FontAwesomeIcon icon={faCoins} className="fa-icon2" />Change Cost</h3>
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

                <label htmlFor="cost">New Cost:</label>
                <input
                    type="number"
                    id="cost"
                    className="input-field"
                    value={cost}
                    onChange={(e) => setCost(parseFloat(e.target.value))}
                />

                <button type="submit" className="submit-button">
                    Change Cost
                </button>
            </form>
        </div>

    );
};

export default ChangePlayerCostBox;
