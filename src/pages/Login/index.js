import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faLock } from '@fortawesome/free-solid-svg-icons';


import './index.css'; // Importa il file CSS per il tuo componente

const Login = ({ setIsLogged, setSection, setGlobalUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://competitivefutsal.it:5000/login', {
        username,
        password,
      });

      if (response.data.message === 'Autenticazione riuscita') {
        setIsLogged(true);
        setSection('AdminPanel');
        setGlobalUsername(username);
      } else {
        alert('Autenticazione fallita. Controlla le tue credenziali.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Credenziali non valide. Riprova.');
      } else {
        console.error('Errore durante l\'autenticazione:', error);
        alert('Errore durante l\'autenticazione. Riprova più tardi.');
      }
    }
  };


  return (
    <div className="login-container">
      <h2><FontAwesomeIcon icon={faScrewdriverWrench} className='fa-icon' />Admin Panel<FontAwesomeIcon icon={faLock} className='fa-icon2' /></h2>
      <div className="form-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
