import React from 'react';
import styles from './App.module.css';
import Toolbox from './features/toolbox/Toolbox';
import DocumentFrame from './features/documentframe/DocumentFrame';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>My-note</h1>
      </div>
      <div className={styles.body}>
        <Toolbox />
        <DocumentFrame />
      </div>
    </div>
  );
}

export default App;
