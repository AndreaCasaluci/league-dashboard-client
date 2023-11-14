const fetchPlayers = async (setPlayers) => {
    try {
        const response = await fetch('http://localhost:5000/player/players');
        if (response.ok) {
            const data = await response.json();
            setPlayers(data);
        } else {
            console.error('Errore nel recupero dei dati dei giocatori');
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati dei giocatori:', error);
    }
}

export default { fetchPlayers }