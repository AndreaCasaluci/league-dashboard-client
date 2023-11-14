import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import LeagueLeaderboard from './pages/LeagueLeaderboard';
import Navbar from './components/Navbar';
import GoalLeaderboard from './pages/GoalLeaderboard';
import AssistLeaderboard from './pages/AssistLeaderboard';
import CleansheetLeaderboard from './pages/CleansheetLeaderboard';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PlayersPage from './pages/PlayersPage';

import './App.css';
/* import './Navbar.css'; */
import './components/AddPlayerBox';
import TeamsPage from './pages/TeamsPage';
import TeamOfTheWeekPage from './pages/TeamOfTheWeekPage';
import LoaderExampleText from './components/Loader';

function App() {
  const [section, setSection] = useState('Home');
  const [playersData, setPlayersData] = useState([]);
  const [leagueLeaderboardData, setLeagueLeaderboardData] = useState([]);
  const [goalLeaderboardData, setGoalLeaderboardData] = useState([]);
  const [assistLeaderboardData, setAssistLeaderboardData] = useState([]);
  const [cleansheetLeaderboardData, setCleansheetLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [globalUsername, setGlobalUsername] = useState([]);



  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        if (section === 'Players') {
          let url = "http://localhost:5000/player/players";  // Assicurati di avere la route corretta nel tuo backend

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setPlayersData(data);
          }
        }
        else if (section === 'LeagueLeaderboard') {
          let url = "http://localhost:5000/leaderboard/league";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setLeagueLeaderboardData(data);
          }
        }
        else if (section === 'GoalLeaderboard') {
          let url = "http://localhost:5000/leaderboard/goal";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setGoalLeaderboardData(data);
          }
        }
        else if (section === 'AssistLeaderboard') {
          let url = "http://localhost:5000/leaderboard/assist";

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setAssistLeaderboardData(data);
          }
        }
        else if (section === 'CleansheetLeaderboard') {
          let url = "http://localhost:5000/leaderboard/cleansheet";

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
        console.log(section);
        setLoading(false);
      }
    }
    fetchData();
  }, [section, isLogged]);

  if (loading) {
    return (
      <div className="App">
        <Navbar setSection={setSection} />
        <div className="content">
          <LoaderExampleText></LoaderExampleText>
        </div>
      </div>
    )
  }
  else {
    switch (section) {
      case "Home":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
            </div>
          </div>
        )
      case "Players":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <PlayersPage players={playersData} />
            </div>
          </div>
        )
      case "Teams":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <TeamsPage teams={playersData} />
            </div>
          </div>
        )
      case "TOTW":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <TeamOfTheWeekPage />
            </div>
          </div>
        )
      case "LeagueLeaderboard":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <LeagueLeaderboard classifica={leagueLeaderboardData} />
            </div>
          </div>
        )
      case "GoalLeaderboard":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <GoalLeaderboard classifica={goalLeaderboardData} />
            </div>
          </div>
        )
      case "AssistLeaderboard":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <AssistLeaderboard classifica={assistLeaderboardData} />
            </div>
          </div>
        )
      case "CleansheetLeaderboard":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <CleansheetLeaderboard classifica={cleansheetLeaderboardData} />
            </div>
          </div>
        )
      case "Login":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <Login setIsLogged={setIsLogged} setSection={setSection} setGlobalUsername={setGlobalUsername} />
            </div>
          </div>
        )
      case "AdminPanel":
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
              <div className='admin-header'><div className='hello-text'>Hello, {globalUsername}</div></div>
              <AdminPanel />
            </div>
          </div>
        )
      default:
        return (
          <div className="App">
            <Navbar setSection={setSection} />
            <div className="content">
            </div>
          </div>
        )
    }
  }




}

export default App;
