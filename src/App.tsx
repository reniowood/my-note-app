import React from 'react';
import './App.css';
import Document from './features/document/Document';
import Toolbox from './features/toolbox/Toolbox';

function App() {
  return (
    <div className="App">
      <h1>My-note</h1>
      <Toolbox />
      <Document />
    </div>
  );
}

export default App;
