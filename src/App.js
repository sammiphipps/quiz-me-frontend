import React from 'react';
import './App.css';

import QuizMePage from './components/QuizMePage'
function App() {
  return (
    <div className="App">
      <header>
        <h1>QuizMe</h1>
      </header>
      <main>
        <QuizMePage />
      </main>
    </div>
  );
}

export default App;
