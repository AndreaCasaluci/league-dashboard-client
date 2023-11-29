// Loading.js

import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const Loading = () => {
  return (
    <div style={styles.container}>
      {/* <p style={styles.text}>Loading...</p> */}
      <PuffLoader color="#38b6ab" />
      {/* Puoi aggiungere qui un indicatore di caricamento, ad esempio uno spinner */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Rende il componente a schermo intero
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  // Aggiungi stili per l'indicatore di caricamento se necessario
};

export default Loading;
