import React, { useState, useEffect } from 'react';
import LeagueLeaderboard from './LeagueLeaderboard';
import Navbar from './Navbar';
import GoalLeaderboard from './GoalLeaderboard';
import AssistLeaderboard from './AssistLeaderboard';
import CleansheetLeaderboard from './CleansheetLeaderboard';
import LoginModal from './LoginModal';
import AdminPanel from './AdminPanel';

import './App.css';
import './Navbar.css';

function App() {
  const [section, setSection] = useState('Home');
  const [leagueLeaderboardData, setLeagueLeaderboardData] = useState([]);
  const [goalLeaderboardData, setGoalLeaderboardData] = useState([]);
  const [assistLeaderboardData, setAssistLeaderboardData] = useState([]);
  const [cleansheetLeaderboardData, setCleansheetLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      // Effettua una richiesta al tuo backend per verificare le credenziali
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        // L'utente è autenticato con successo, puoi gestire la navigazione o lo stato dell'app qui.
        setIsLoggedIn(true); // Imposta lo stato di isLoggedIn a true
      } else {
        // L'autenticazione non è riuscita, puoi gestire gli errori qui.
        // Ad esempio, mostra un messaggio di errore all'utente.
        console.error('Login fallito');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        if (section === 'LeagueLeaderboard') {
          let url = "/leagueLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setLeagueLeaderboardData(data);
          }
        } 
        else if(section ==='GoalLeaderboard') {
          let url = "/goalLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setGoalLeaderboardData(data);
          }
        }
        else if(section ==='AssistLeaderboard') {
          let url = "/assistLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setAssistLeaderboardData(data);
          }
        }
        else if(section ==='CleansheetLeaderboard') {
          let url = "/cleansheetLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCleansheetLeaderboardData(data);
          }
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
      } finally {
        setLoading(false); // Imposta loading a false quando il caricamento è completo
      }
    }

    fetchData();
  }, [section]);


  return (
    <div className="App">
      <Navbar setSection={setSection} isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <div className="content">
        {section === 'LeagueLeaderboard' && loading ? (
          <p>Loading...</p>
        ) : section === 'LeagueLeaderboard' && !loading ? (
          <LeagueLeaderboard classifica={leagueLeaderboardData} />
        ) : null}

          {section === 'GoalLeaderboard' && loading ? (
          <p>Loading...</p>
        ) : section === 'GoalLeaderboard' && !loading ? (
          <GoalLeaderboard classifica={goalLeaderboardData} />
        ) : null}

        {section === 'AssistLeaderboard' && loading ? (
          <p>Loading...</p>
        ) : section === 'AssistLeaderboard' && !loading ? (
          <AssistLeaderboard classifica={assistLeaderboardData} />
        ) : null}

        {section === 'CleansheetLeaderboard' && loading ? (
          <p>Loading...</p>
        ) : section === 'CleansheetLeaderboard' && !loading ? (
          <CleansheetLeaderboard classifica={cleansheetLeaderboardData} />
        ) : null}

        {section === 'AdminPanel' && isLoggedIn ? <AdminPanel /> : null}
      </div>
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} handleLogin={handleLogin} />
    </div>
  );
}

export default App;