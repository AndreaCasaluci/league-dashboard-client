// AddTOTW.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAward } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './index.css'; // Importa il tuo file CSS

const AddTOTW = () => {
    const [gk, setGK] = useState({ name: '', avatar: '' });
    const [dm, setDM] = useState({ name: '', avatar: '' });
    const [am, setAM] = useState({ name: '', avatar: '' });
    const [st, setST] = useState({ name: '', avatar: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Implementa la logica per aggiungere i nomi dei giocatori alla collezione "teamOfTheWeek"
        try {
            const response = await fetch('http://localhost:5000/team/addTOTW', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gk, dm, am, st }),
            });

            if (response.status === 200) {
                alert('TOTW Added successfully');
                // Aggiorna lo stato o esegui altre azioni se necessario
            } else {
                console.error('Errore durante l\'aggiunta dei giocatori alla squadra della settimana.');
                alert()
            }
        } catch (error) {
            console.error('Errore durante la richiesta al server:', error);
            alert("Error, something went wrong.");
        }

        // Resetta i campi del form dopo l'invio
        setGK({ name: '', avatar: '' });
        setDM({ name: '', avatar: '' });
        setAM({ name: '', avatar: '' });
        setST({ name: '', avatar: '' });
    };

    return (
        <div className="add-totw">
            <h3>
                <FontAwesomeIcon icon={faPlus} className="fa-icon" />
                <FontAwesomeIcon icon={faAward} className="fa-icon2" />
                Add Team of the Week
            </h3>
            <form onSubmit={handleSubmit} method="POST" action="/totw/addTOTW">
                <label htmlFor="gkName">GK Name:</label>
                <input
                    type="text"
                    id="gkName"
                    value={gk.name}
                    onChange={(e) => setGK({ ...gk, name: e.target.value })}
                />
                <label htmlFor="gkAvatar">GK Avatar:</label>
                <input
                    type="text"
                    id="gkAvatar"
                    value={gk.avatar}
                    onChange={(e) => setGK({ ...gk, avatar: e.target.value })}
                />

                <label htmlFor="dmName">DM Name:</label>
                <input
                    type="text"
                    id="dmName"
                    value={dm.name}
                    onChange={(e) => setDM({ ...dm, name: e.target.value })}
                />
                <label htmlFor="dmAvatar">DM Avatar:</label>
                <input
                    type="text"
                    id="dmAvatar"
                    value={dm.avatar}
                    onChange={(e) => setDM({ ...dm, avatar: e.target.value })}
                />

                <label htmlFor="amName">AM Name:</label>
                <input
                    type="text"
                    id="amName"
                    value={am.name}
                    onChange={(e) => setAM({ ...am, name: e.target.value })}
                />
                <label htmlFor="amAvatar">AM Avatar:</label>
                <input
                    type="text"
                    id="amAvatar"
                    value={am.avatar}
                    onChange={(e) => setAM({ ...am, avatar: e.target.value })}
                />

                <label htmlFor="stName">ST Name:</label>
                <input
                    type="text"
                    id="stName"
                    value={st.name}
                    onChange={(e) => setST({ ...st, name: e.target.value })}
                />
                <label htmlFor="stAvatar">ST Avatar:</label>
                <input
                    type="text"
                    id="stAvatar"
                    value={st.avatar}
                    onChange={(e) => setST({ ...st, avatar: e.target.value })}
                />

                {/* Altri campi del form, se necessario */}

                <button type="submit">Add Team of the Week</button>
            </form>
        </div>
    );
};

export default AddTOTW;
