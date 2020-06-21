import React from 'react';
import styles from './App.module.css';
import Document from './features/document/Document';
import Toolbox from './features/toolbox/Toolbox';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>My-note</h1>
      </div>
      <div className={styles.body}>
        <Toolbox />
        <Document />
      </div>
    </div>
  );
}

export default App;
