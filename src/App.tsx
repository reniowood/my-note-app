import React from 'react';
import styles from './App.module.css';
import Toolbox from './toolbox/Toolbox';
import DocumentFrame from './documentframe/DocumentFrame';

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
