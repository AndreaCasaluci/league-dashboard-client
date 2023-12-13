const fetchPlayers = async (setPlayers) => {
    try {
        const response = await fetch('https://competitivefutsal.it:8443/player/players');
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


const fetchData = async (section, isLogged, setPlayersData, setLeagueLeaderboardData, setGoalLeaderboardData, setAssistLeaderboardData, setCleansheetLeaderboardData, setSection, setLoading) => {
    try {
        if (section === 'Players') {
            let url = "https://competitivefutsal.it:8443/player/players";  // Assicurati di avere la route corretta nel tuo backend

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setPlayersData(data);
            }
        }
        else if (section === 'LeagueLeaderboard') {
            let url = "https://competitivefutsal.it:8443/leaderboard/league";

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setLeagueLeaderboardData(data);
            }
        }
        else if (section === 'GoalLeaderboard') {
            let url = "https://competitivefutsal.it:8443/leaderboard/goal";

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setGoalLeaderboardData(data);
            }
        }
        else if (section === 'AssistLeaderboard') {
            let url = "https://competitivefutsal.it:8443/leaderboard/assist";

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAssistLeaderboardData(data);
            }
        }
        else if (section === 'CleansheetLeaderboard') {
            let url = "https://competitivefutsal.it:8443/leaderboard/cleansheet";

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setCleansheetLeaderboardData(data);
            }
        }
        else if (section === 'AdminPanel') {
            if (!isLogged) {
                setSection('Login');

            }
            else {
                // Do whatever Admin Panel is
            }
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    } finally {
        setTimeout(() => { setLoading(false) }, 1000);
        /* setLoading(false); */
    }
}

const fetchTeams = async (setTeams) => {
    // Effettua una richiesta al backend per ottenere la lista delle squadre
    fetch('https://competitivefutsal.it:8443/team/teams')
        .then((response) => response.json())
        .then((data) => {
            // Rimuovi il team "Free Agent" dall'array data
            const filteredData = data.filter((team) => team !== 'Free Agent');

            // Mappa il risultato filtrato in oggetti da utilizzare con setTeams
            const teamsData = filteredData.map((team) => ({ value: team, label: team }));

            setTeams(teamsData);
        })
        .catch((error) => console.error('Errore nel recupero delle squadre:', error));
}

const fetchAllTeams = async (setTeams) => {
    // Effettua una richiesta al backend per ottenere la lista delle squadre
    fetch('https://competitivefutsal.it:8443/team/teams')
        .then((response) => response.json())
        .then((data) => {
            // Mappa il risultato filtrato in oggetti da utilizzare con setTeams
            const teamsData = data.map((team) => ({ value: team, label: team }));

            setTeams(teamsData);
        })
        .catch((error) => console.error('Errore nel recupero delle squadre:', error));
}

const fetchPlayersByTeam = async (teamX, setPlayersTeamX, setStatsTeamX) => {
    // Effettua una richiesta al backend per ottenere la lista dei giocatori del team A
    fetch(`https://competitivefutsal.it:8443/player/playersByTeam/${teamX.value}`)
        .then((response) => response.json())
        .then((data) => setPlayersTeamX(data.map((player) => ({ value: player, label: player }))))
        .catch((error) => console.error('Errore nel recupero dei giocatori:', error));

    // Inizializza le statistiche del team A quando selezioni un nuovo team
    setStatsTeamX({});
}

const fetchPlayersWithNoTeam = async (setPlayersWithoutTeam) => {
    fetch('https://competitivefutsal.it:8443/player/playersWithoutTeam')
        .then((response) => response.json())
        .then((data) => setPlayersWithoutTeam(data))
        .catch((error) => console.error('Errore nel recupero dei giocatori senza squadra:', error));
}


const fetchTOTW = async (setTeamOfTheWeeks, setSelectedWeek) => {
    try {
        const response = await fetch('https://competitivefutsal.it:8443/team/teamOfTheWeeks');
        if (response.ok) {
            const data = await response.json();
            setTeamOfTheWeeks(data);
            // Imposta di default l'ultima settimana disponibile
            if (data.length > 0) {
                setSelectedWeek(data[data.length - 1].weekNumber);
            }
        } else {
            console.error('Errore nel recupero dei dati Team Of The Week');
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati Team Of The Week:', error);
    }
}

const fetchMatchdays = async (setMatchdays, setMatchdayDates) => {
    try {
        const response = await fetch('https://competitivefutsal.it:8443/match/matchdays');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setMatchdays(data);
        } else {
            console.error('Errore nel recupero dei dati Matchdays');
        }

        const response2 = await fetch('https://competitivefutsal.it:8443/match/matchdayDates');
        if (response.ok) {
            const data2 = await response2.json();

            const matchdayDatesArray = new Array();
            for (let tmpMatchdayDate of data2) {
                matchdayDatesArray.push(tmpMatchdayDate.date);
            }
            console.log(matchdayDatesArray);
            setMatchdayDates(matchdayDatesArray);
        } else {
            console.error('Errore nel recupero dei dati MatchdayDates');
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati MatchdayDates:', error);
    }
}



export default { fetchPlayers, fetchData, fetchTeams, fetchPlayersByTeam, fetchPlayersWithNoTeam, fetchTOTW, fetchMatchdays, fetchAllTeams }