import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import LeagueLeaderboard from './LeagueLeaderboard';
import Navbar from './Navbar';
import GoalLeaderboard from './GoalLeaderboard';
import AssistLeaderboard from './AssistLeaderboard';
import CleansheetLeaderboard from './CleansheetLeaderboard';
import Login from './Login';
import AdminPanel from './AdminPanel';
import PlayersPage from './PlayersPage';

import './App.css';
import './Navbar.css';
import './AddPlayerBox.css';
import TeamsPage from './TeamsPage';
import TeamOfTheWeekPage from './TeamOfTheWeekPage';

function App() {
  const [section, setSection] = useState('Home');
  const [playersData, setPlayersData] = useState([]);
  const [leagueLeaderboardData, setLeagueLeaderboardData] = useState([]);
  const [goalLeaderboardData, setGoalLeaderboardData] = useState([]);
  const [assistLeaderboardData, setAssistLeaderboardData] = useState([]);
  const [cleansheetLeaderboardData, setCleansheetLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isLogged, setIsLogged] = useState(false);
  const [globalUsername, setGlobalUsername] = useState([]);



  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        if (section === 'Players') {
          let url = "http://localhost:5000/players";  // Assicurati di avere la route corretta nel tuo backend

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setPlayersData(data);
          }
        }
        else if (section === 'LeagueLeaderboard') {
          let url = "http://localhost:5000/leagueLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setLeagueLeaderboardData(data);
          }
        } 
        else if(section ==='GoalLeaderboard') {
          let url = "http://localhost:5000/goalLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setGoalLeaderboardData(data);
          }
        }
        else if(section ==='AssistLeaderboard') {
          let url = "http://localhost:5000/assistLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setAssistLeaderboardData(data);
          }
        }
        else if(section ==='CleansheetLeaderboard') {
          let url = "http://localhost:5000/cleansheetLeaderboard";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCleansheetLeaderboardData(data);
          }
        }
        else if(section==='AdminPanel'){
            if(!isLogged){
                setSection('Login'); 
                
            }
            else{
                // Do whatever Admin Panel is
            }
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
      } finally {
        console.log(section);
        setLoading(false);
      }
    }
    fetchData();
  }, [section, isLogged]);

  return (
    <div className="App">
      <Navbar setSection={setSection} />
      <div className="content">
        {section === 'Players' && loading ? (
          <p>Loading...</p>
        ) : section === 'Players' && !loading ? (
          <PlayersPage players={playersData} />
        ) : null}
        {section === 'Teams' && loading ? (
          <p>Loading...</p>
        ) : section === 'Teams' && !loading ? (
          <TeamsPage teams={playersData} />
        ) : null}
         {section === 'TOTW' && loading ? (
          <p>Loading...</p>
        ) : section === 'TOTW' && !loading ? (
          <TeamOfTheWeekPage/>
        ) : null}
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

        {section === 'Login' && (
            <Login setIsLogged={setIsLogged} setSection={setSection} setGlobalUsername={setGlobalUsername}/>
        )}

        {section === 'AdminPanel' && isLogged && (
          <>
          <div className='admin-header'><div className='hello-text'>Hello, {globalUsername}</div></div>
          <AdminPanel/>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
